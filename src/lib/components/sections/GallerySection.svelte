<script>
  /** @type {{ images: string[], heading?: string, captions?: string[], emptyMessage?: string }} */
  let { images, heading, captions = [], emptyMessage = 'Add images to this gallery to display them here.' } = $props();
</script>

<section class="gallery-section">
  {#if heading}<h2>{heading}</h2>{/if}
  {#if images.length > 0}
    <div class="grid" style="--cols: {Math.min(images.length, 3)}">
      {#each images as src, i}
        <figure>
          <img src={src} alt={captions[i] ?? ''} loading="lazy" />
          {#if captions[i]}<figcaption>{captions[i]}</figcaption>{/if}
        </figure>
      {/each}
    </div>
  {:else}
    <div class="empty-state">
      <p>{emptyMessage}</p>
    </div>
  {/if}
</section>

<style>
  .gallery-section {
    margin: 0;
    padding-top: 1.1rem;
    border-top: 1px solid color-mix(in srgb, var(--text) 18%, var(--border));
  }

  h2 {
    font-size: clamp(1.4rem, 2vw, 1.9rem);
    font-weight: 500;
    margin: 0 0 1.2rem;
    color: var(--text-h);
    letter-spacing: -0.03em;
    line-height: 1;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), 1fr);
    gap: 1rem;
  }

  .empty-state {
    border: 1px dashed color-mix(in srgb, var(--text) 22%, var(--border));
    border-radius: 20px;
    padding: 1.25rem 1.35rem;
    background: color-mix(in srgb, var(--background) 82%, var(--project-accent) 18%);
    max-width: 68ch;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.7;
    color: var(--text);
  }

  figure {
    margin: 0;
    display: grid;
    gap: 0.7rem;
  }

  img {
    width: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    border: 1px solid var(--border);
  }

  figcaption {
    padding: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text);
  }

  @media (max-width: 768px) {
    .gallery-section {
      padding-top: 0.9rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
