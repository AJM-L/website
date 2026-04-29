<script>
  /** @type {{ image?: string, alt?: string, accent?: string }} */
  let { image, alt = '', accent = '#aa3bff' } = $props();
</script>

{#if image}
  <div class="hero" style="--project-accent: {accent}">
    <img src={image} alt={alt} />
  </div>
{/if}

<style>
  .hero {
    width: 100%;
    margin: 0 0 0.25rem;
  }

  img {
    width: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    max-height: 560px;
    border: 1px solid var(--border);
  }
</style>
