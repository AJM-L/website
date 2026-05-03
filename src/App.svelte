<script>
  import { projects } from './lib/data/projects.js';
  import BottomBar from './lib/components/BottomBar.svelte';
  import ThemeToggle from './lib/components/ThemeToggle.svelte';
  import Gallery from './lib/components/Gallery.svelte';
  import ProjectDetail from './lib/components/ProjectDetail.svelte';

  let view = $state('gallery');
  let selectedProject = $state(null);

  function selectProject(project) {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
      return;
    }
    selectedProject = project;
    view = 'detail';
  }

  function goBack() {
    view = 'gallery';
    selectedProject = null;
  }
</script>

<div class="main-area" class:scrollable={view === 'detail'}>
  {#if view === 'gallery'}
    <Gallery {projects} onSelect={selectProject} />
  {:else if view === 'detail' && selectedProject}
    <ProjectDetail project={selectedProject} onBack={goBack} />
    <BottomBar />
  {/if}
</div>

<div class="bottom-area">
  <ThemeToggle />
  {#if view === 'gallery'}
    <BottomBar />
  {/if}
</div>
