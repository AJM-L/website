<script>
  import artData from '../../data/artData.js';

  /** @type {{ heading?: string }} */
  let { heading } = $props();
</script>

<section class="art-gallery">
  {#if heading}<h2>{heading}</h2>{/if}
  <div class="feed">
    {#each artData as piece}
      <div class="exhibit">
        <div class="painting">
          <img src={piece.image} alt={piece.title} loading="lazy" />
        </div>
        <div class="plaque">
          {#if piece.title}<p class="plaque-title">{piece.title}</p>{/if}
          {#if piece.date}<p class="plaque-line">{piece.date}</p>{/if}
          {#if piece.medium}<p class="plaque-line">{piece.medium}</p>{/if}
          {#if piece.dimensions && piece.dimensions !== 'N/A'}<p class="plaque-line">{piece.dimensions}</p>{/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .art-gallery {
    margin-bottom: 4rem;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 3rem;
    color: var(--text-h);
  }

  .feed {
    display: flex;
    flex-direction: column;
    gap: 30vh;
    align-items: center;
  }

  .exhibit {
    display: flex;
    align-items: flex-end;
    gap: 3rem;
  }

  .painting {
    flex-shrink: 0;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.12),
      0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .painting img {
    display: block;
    max-height: 85vh;
    max-width: calc(100vw - 2 * 2.5rem - 140px);
    border-radius:1px;
    width: auto;
    height: auto;
  }

  .plaque {
    flex-shrink: 0;
    width: 120px;
    padding-bottom: 2px;
  }

  .plaque-title {
    font-size: 12px;
    font-style: italic;
    font-weight: 500;
    color: var(--text-h);
    margin: 0 0 6px;
    line-height: 1.4;
  }

  .plaque-line {
    font-size: 10.5px;
    color: var(--text);
    opacity: 0.65;
    margin: 0 0 3px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .exhibit {
      flex-direction: column;
      align-items: flex-start;
      gap: 30rem;
    }

    .painting img {
      max-height: 70vh;
      max-width: calc(100vw - 2 * 1.25rem);
    }

    .plaque {
      width: auto;
    }
  }
</style>
