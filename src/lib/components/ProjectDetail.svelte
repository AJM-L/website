<script>
  import HeroSection from './sections/HeroSection.svelte';
  import TextSection from './sections/TextSection.svelte';
  import CodeSection from './sections/CodeSection.svelte';
  import GallerySection from './sections/GallerySection.svelte';
  import LinksSection from './sections/LinksSection.svelte';
  import ArtGallerySection from './sections/ArtGallerySection.svelte';

  /** @type {{ project: import('../data/projects.js').Project & { sections?: any[] }, onBack: () => void }} */
  let { project, onBack } = $props();

  // Convert hex number (0xe06050) to CSS hex string (#e06050)
  const accentCss = $derived('#' + project.color.toString(16).padStart(6, '0'));
</script>

<div class="detail" style="--project-accent: {accentCss}">
  <button class="back-btn" onclick={onBack}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
    Back
  </button>

  <header>
    <div class="header-text">
      <h1>{project.title}</h1>
      <p class="description">{project.description}</p>
    </div>
  </header>

  <div class="sections">
    {#each (project.sections ?? []) as section}
      {#if section.type === 'hero'}
        <HeroSection {...section} accent={accentCss} />
      {:else if section.type === 'text'}
        <TextSection {...section} />
      {:else if section.type === 'code'}
        <CodeSection {...section} />
      {:else if section.type === 'gallery'}
        <GallerySection {...section} />
      {:else if section.type === 'links'}
        <LinksSection {...section} />
      {:else if section.type === 'art-gallery'}
        <ArtGallerySection {...section} />
      {/if}
    {:else}
      <div class="placeholder">
        <p>Project detail page — content coming soon.</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .detail {
    width: min(1100px, calc(100% - 3rem));
    margin: 0 auto;
    padding: 3.25rem 0 5.5rem;
    position: relative;
  }

  .detail::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 320px;
    background:
      radial-gradient(circle at top left, color-mix(in srgb, var(--project-accent) 18%, transparent) 0%, transparent 55%),
      linear-gradient(180deg, color-mix(in srgb, var(--project-accent) 10%, transparent), transparent 72%);
    pointer-events: none;
    z-index: -1;
  }

  header, .back-btn, .sections {
    width: min(100%, 940px);
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: var(--text);
    font-family: var(--sans);
    font-size: 14px;
    cursor: pointer;
    padding: 6px 0;
    margin-bottom: 2.5rem;
    transition: color 0.2s;
  }
  .back-btn:hover { color: var(--text-h); }

  header {
    display: flex;
    margin-bottom: 3.5rem;
  }

  .header-text {
    flex: 1;
    padding: 0 0 1.5rem;
    border-bottom: 1px solid color-mix(in srgb, var(--project-accent) 20%, var(--border));
  }

  h1 {
    font-size: clamp(2.6rem, 6vw, 5rem);
    letter-spacing: -0.06em;
    margin: 0 0 1.25rem;
    color: var(--text-h);
    line-height: 0.92;
    max-width: 10ch;
  }

  .description {
    font-size: 1.18rem;
    line-height: 1.75;
    color: var(--text);
    max-width: 62ch;
  }

  .sections {
    display: grid;
    gap: 2.75rem;
  }

  .placeholder {
    border: 1px dashed var(--border);
    border-radius: 8px;
    padding: 3rem 2rem;
    text-align: center;
    color: var(--text);
  }

  @media (max-width: 768px) {
    .detail {
      width: calc(100% - 1.5rem);
      padding: 1.5rem 0 4rem;
    }

    .header-text {
      padding-bottom: 1.25rem;
    }

    h1 {
      max-width: none;
    }

    .description {
      font-size: 1.02rem;
    }
  }
</style>
