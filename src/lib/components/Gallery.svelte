<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

  /** @type {{ projects: Array<{id: string, title: string, description: string, categories: string[], geometryType: string, color: number, texture?: string, modelType?: 'obj' | 'gltf', hasModel?: boolean, modelFile?: string, modelScale?: number, rotationAxes?: {x?: boolean, y?: boolean, z?: boolean}, initialRotation?: {x?: number, y?: number, z?: number}, transform?: {x?: number, y?: number, z?: number}}>, onSelect: (project: any) => void }} */
  let { projects, onSelect } = $props();

  let canvas;
  let container;
  let animationId;
  let virtualIndex = $state(0);
  let currentIndex = $derived(((virtualIndex % projects.length) + projects.length) % projects.length);
  let currentTitle = $derived(projects[currentIndex]?.title ?? '');
  let currentDescription = $derived(projects[currentIndex]?.description ?? '');

  // Circular carousel — items arc around the left side
  const RADIUS = 24;
  const ANGLE_STEP = 0.5; // radians between adjacent items

  // Static camera position
  const CAM_X = 3;
  const CAM_Y = 1.0;
  const CAM_Z = -5.5;

  /** @param {string} type */
  function createGeometry(type) {
    switch (type) {
      case 'icosahedron': return new THREE.IcosahedronGeometry(0.9, 0);
      case 'torus': return new THREE.TorusGeometry(0.7, 0.25, 16, 32);
      case 'torusKnot': return new THREE.TorusKnotGeometry(0.6, 0.2, 64, 16);
      case 'octahedron': return new THREE.OctahedronGeometry(0.9, 0);
      case 'dodecahedron': return new THREE.DodecahedronGeometry(0.85, 0);
      case 'cone': return new THREE.ConeGeometry(0.7, 1.4, 32);
      case 'cylinder': return new THREE.CylinderGeometry(0.5, 0.7, 1.2, 32);
      case 'sphere': return new THREE.SphereGeometry(0.85, 32, 32);
      default: return new THREE.BoxGeometry(1, 1, 1);
    }
  }

  // Scene state shared between onMount and $effect
  /** @type {THREE.Scene | null} */
  let scene = null;
  /** @type {(THREE.Mesh | THREE.Group)[]} */
  let meshes = [];
  /** @type {THREE.BufferGeometry[]} */
  let geos = [];
  /** @type {THREE.Material[]} */
  let mats = [];
  /** @type {THREE.Group[]} */
  let groups = [];
  /** @type {THREE.Texture[]} */
  let textures = [];
  let mounted = false;
  let buildVersion = 0;

  /** @param {string} id
   *  @param {string} [file]
   */
  async function loadGltfModel(id, file = 'model.glb') {
    const loader = new GLTFLoader();
    return loader.loadAsync(`/models/${id}/${file}`);
  }

  /** @param {string} id */
  async function loadObjModel(id) {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(`/models/${id}/`);
    const materials = await mtlLoader.loadAsync('model.mtl');
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(`/models/${id}/`);
    return objLoader.loadAsync('model.obj');
  }

  /** @param {typeof projects} projs */
  async function buildMeshes(projs) {
    if (!scene) return;
    const version = ++buildVersion;

    // Synchronously remove and dispose previous objects
    meshes.forEach(m => scene.remove(m));
    geos.forEach(g => g.dispose());
    mats.forEach(m => m.dispose());
    textures.forEach(t => t.dispose());
    groups.forEach(g => g.traverse(child => {
      if (/** @type {any} */ (child).isMesh) {
        /** @type {THREE.Mesh} */ (child).geometry?.dispose();
        const mat = /** @type {THREE.Mesh} */ (child).material;
        const ms = Array.isArray(mat) ? mat : [mat];
        ms.forEach(m => { if (/** @type {any} */ (m)?.map) /** @type {any} */ (m).map.dispose(); m?.dispose(); });
      }
    }));
    meshes = [];
    geos = [];
    mats = [];
    textures = [];
    groups = [];

    const loadPromises = projs.map(async (proj, i) => {
      /** @type {THREE.Mesh | THREE.Group} */
      let obj;

      if (proj.modelType === 'gltf') {
        try {
          const gltf = await loadGltfModel(proj.id, proj.modelFile);
          const group = gltf.scene;
          group.userData = { index: i, projectId: proj.id, slot: i, rotationAxes: proj.rotationAxes ?? {}, initialRotation: proj.initialRotation ?? {}, transform: proj.transform ?? {} };
          group.traverse(child => { child.userData = { ...group.userData }; });
          groups.push(group);
          obj = group;
        } catch (e) {
          console.warn(`[Gallery] Could not load GLTF for "${proj.id}", using placeholder.`, e);
        }
      } else if (proj.modelType === 'obj' || proj.hasModel) {
        try {
          const group = await loadObjModel(proj.id);
          // Set userData on group and all descendants so raycasting works recursively
          group.userData = { index: i, projectId: proj.id, slot: i, rotationAxes: proj.rotationAxes ?? {}, initialRotation: proj.initialRotation ?? {}, transform: proj.transform ?? {} };
          group.traverse(child => { child.userData = { ...group.userData }; });
          groups.push(group);
          obj = group;
        } catch (e) {
          console.warn(`[Gallery] Could not load model for "${proj.id}", using placeholder.`, e);
        }
      }

      if (!obj) {
        const geo = createGeometry(proj.geometryType);
        /** @type {THREE.MeshStandardMaterialParameters} */
        const matParams = { color: proj.color, roughness: 0.35, metalness: 0.15 };

        if (proj.texture) {
          const tex = new THREE.TextureLoader().load(proj.texture);
          tex.colorSpace = THREE.SRGBColorSpace;
          matParams.map = tex;
          textures.push(tex);
        }

        const mat = new THREE.MeshStandardMaterial(matParams);
        obj = new THREE.Mesh(geo, mat);
        obj.userData = { index: i, projectId: proj.id, slot: i, rotationAxes: proj.rotationAxes ?? {}, initialRotation: proj.initialRotation ?? {}, transform: proj.transform ?? {} };
        geos.push(geo);
        mats.push(mat);
      }

      const angle0 = i * ANGLE_STEP;
      obj.position.set(
        -RADIUS * Math.sin(angle0),
        0,
        RADIUS * (1 - Math.cos(angle0))
      );
      if (proj.modelScale != null) {
        obj.scale.setScalar(proj.modelScale);
      }
      return obj;
    });

    const objects = await Promise.all(loadPromises);

    // Discard stale results if buildMeshes was called again while loading
    if (version !== buildVersion) {
      objects.forEach(obj => {
        if (obj.isGroup) {
          obj.traverse(child => {
            if (/** @type {any} */ (child).isMesh) {
              /** @type {THREE.Mesh} */ (child).geometry?.dispose();
              const m = /** @type {THREE.Mesh} */ (child).material;
              const ms = Array.isArray(m) ? m : [m];
              ms.forEach(x => { if (/** @type {any} */ (x)?.map) /** @type {any} */ (x).map.dispose(); x?.dispose(); });
            }
          });
        }
      });
      return;
    }

    objects.forEach(obj => {
      scene.add(obj);
      meshes.push(obj);
    });
  }

  // Rebuild meshes and reset index when projects change
  $effect(() => {
    if (!mounted) return;
    virtualIndex = 0;
    buildMeshes(projects);
  });

  onMount(() => {
    scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Day/night transition state (0 = full day, 1 = full night)
    let transitionProgress = 0;
    let targetProgress = 0;
    targetProgress = document.documentElement.dataset.theme === 'dark' ? 1 : 0;
    transitionProgress = targetProgress; // snap to initial state, no animation on load

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // Sun light (replaces old dirLight)
    const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.0);
    sunLight.position.set(-7, 8, -4);
    scene.add(sunLight);

    // Moon light (starts below horizon)
    const moonLight = new THREE.DirectionalLight(0x8899ff, 0.0);
    moonLight.position.set(-3, -10, -4);
    scene.add(moonLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);

    // Moon mesh
    const moonGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xdde8ff, transparent: true, opacity: 0 });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(-4.5, -15, -6);
    scene.add(moonMesh);

    // Star particles
    const STAR_COUNT = 800;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 55 + Math.random() * 15;
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.22,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // MutationObserver to detect theme changes
    const themeObserver = new MutationObserver(() => {
      targetProgress = document.documentElement.dataset.theme === 'dark' ? 1 : 0;
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });

    buildMeshes(projects);
    camera.position.set(CAM_X, CAM_Y, CAM_Z);
    camera.lookAt(0, 0, 0);

    mounted = true;

    // Scroll handling
    let scrollCooldown = false;

    /** @param {WheelEvent} e */
    function onWheel(e) {
      e.preventDefault();
      if (scrollCooldown) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 10) return;
      if (delta > 0) {
        virtualIndex++;
      } else {
        virtualIndex--;
      }
      scrollCooldown = true;
      setTimeout(() => { scrollCooldown = false; }, 400);
    }

    // Touch handling
    let touchStartX = 0;
    let touchStartY = 0;

    /** @param {TouchEvent} e */
    function onTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    /** @param {TouchEvent} e */
    function onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) {
        virtualIndex++;
      } else {
        virtualIndex--;
      }
    }

    // Keyboard
    /** @param {KeyboardEvent} e */
    function onKeyDown(e) {
      if (e.key === 'ArrowRight') {
        virtualIndex++;
      } else if (e.key === 'ArrowLeft') {
        virtualIndex--;
      }
    }

    // Click / tap to select
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    /** @param {PointerEvent} e */
    function onPointerDown(e) {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    }

    /** @param {PointerEvent} e */
    function onPointerUp(e) {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 5) return;

      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(meshes, true);
      if (hits.length > 0) {
        const hitIndex = hits[0].object.userData.index;
        if (hitIndex === currentIndex) {
          onSelect(projects[currentIndex]);
        } else {
          virtualIndex = hits[0].object.userData.slot;
        }
      }
    }

    // Resize
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    // Animation loop
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Camera is static — items move to their relative positions
      const n = meshes.length;
      const time = performance.now() * 0.001;
      meshes.forEach((mesh, i) => {
        const k = Math.round((virtualIndex - i) / n);
        const slot = k * n + i;
        mesh.userData.slot = slot;

        // Target position on circular arc (offset from center item)
        const offset = slot - virtualIndex;
        const angle = offset * ANGLE_STEP;
        const targetX = -RADIUS * Math.sin(angle);
        const targetZ = RADIUS * (1 - Math.cos(angle));

        // Lerp mesh toward target (with optional per-model position offset)
        const tf = mesh.userData.transform;
        mesh.position.x += (targetX + (tf.x ?? 0) - mesh.position.x) * 0.06;
        mesh.position.y += ((tf.y ?? 0) - mesh.position.y) * 0.06;
        mesh.position.z += (targetZ + (tf.z ?? 0) - mesh.position.z) * 0.06;

        const isCurrent = i === currentIndex;
        const speed = isCurrent ? 0.6 : 0.3;
        const axes = mesh.userData.rotationAxes ?? {};
        const init = mesh.userData.initialRotation ?? {};
        mesh.rotation.x = (init.x ?? 0) + (axes.x !== false ? Math.sin(time * speed + i) * 0.3 : 0);
        mesh.rotation.y = (init.y ?? 0) + (axes.y !== false ? time * speed * 0.5 + i * 0.5 : 0);
        mesh.rotation.z = (init.z ?? 0) + (axes.z === true ? Math.sin(time * speed * 0.7 + i) * 0.2 : 0);
      });

      // Advance day/night transition
      if (Math.abs(transitionProgress - targetProgress) > 0.0005) {
        transitionProgress = transitionProgress + (targetProgress - transitionProgress) * 0.018;
      }
      const t = transitionProgress;

      // Sun: arc from right (-7, 8, -4) down to left (7, -10, 4)
      sunLight.position.set(
        -7 + 14 * t,
        8  - 18 * t,
        -4 + 8  * t,
      );
      sunLight.intensity = 1.0 - t;

      // Moon: arc from (-4, -15, -6) up to (-3, 7, -4)
      moonLight.position.set(
        -4 + 1  * t,
        -15 + 22 * t,
        -6  + 2  * t,
      );
      moonLight.intensity = t * 0.65;
      moonMesh.position.copy(moonLight.position).multiplyScalar(1.5);
      moonMat.opacity = t;

      // Ambient: warm white → cool dim blue
      ambient.color.setRGB(
        1.0  + (0.2  - 1.0) * t,
        1.0  + (0.27 - 1.0) * t,
        1.0  + (0.4  - 1.0) * t,
      );
      ambient.intensity = 0.6 + (0.35 - 0.6) * t;

      // Stars and background tied to sun's horizon crossing
      // sunY goes from 8 (day) to -10 (night); horizon is 0
      // fade from sunY=2 (approaching) to sunY=-2 (just below)
      const sunY = sunLight.position.y;
      const skyT = Math.max(0, Math.min(1, (1 - sunY) / 4));
      starMat.opacity = skyT;

      // Background: transparent → dark blue-black
      renderer.setClearColor(0x080b14, skyT);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      mounted = false;
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      geos.forEach(g => g.dispose());
      mats.forEach(m => m.dispose());
      textures.forEach(t => t.dispose());
      groups.forEach(g => g.traverse(child => {
        if (/** @type {any} */ (child).isMesh) {
          /** @type {THREE.Mesh} */ (child).geometry?.dispose();
          const mat = /** @type {THREE.Mesh} */ (child).material;
          const ms = Array.isArray(mat) ? mat : [mat];
          ms.forEach(m => { if (/** @type {any} */ (m)?.map) /** @type {any} */ (m).map.dispose(); m?.dispose(); });
        }
      }));
      themeObserver.disconnect();
      starGeo.dispose();
      starMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      renderer.dispose();
    };
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div class="gallery" bind:this={container}>
  <canvas bind:this={canvas}></canvas>
  <div class="desc-overlay">
    <p class="project-desc">{currentDescription}</p>
  </div>
  <div class="title-overlay">
    <h1 class="project-title">{currentTitle}</h1>
  </div>
</div>

<style>
  .gallery {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .desc-overlay {
    position: absolute;
    top: 1rem;
    left: 40px;
    right: 40px;
    pointer-events: none;
    max-width: 560px;
  }

  .project-desc {
    font-family: var(--sans);
    font-size: 14px;
    color: var(--text);
    text-align: left;
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 768px) {
    .desc-overlay {
      left: 0;
      right: 0;
      top: auto;
      bottom: calc(3rem + 60px);
      transform: none;
      max-width: none;
      text-align: center;
      display: flex;
      justify-content: center;
    }

    .project-desc {
      text-align: center;
      max-width: 49rem;
      margin: 0 1rem;
    }
  }

  .title-overlay {
    position: absolute;
    bottom: 3rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .project-title {
    font-family: var(--heading);
    font-size: 36px;
    font-weight: 500;
    color: var(--text-h);
    letter-spacing: -0.5px;
    margin: 10px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .project-title {
      font-size: 24px;
    }
  }
</style>
