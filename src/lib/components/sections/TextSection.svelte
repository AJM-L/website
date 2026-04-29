<script>
  /** @type {{ heading?: string, body: string }} */
  let { heading, body } = $props();
</script>

<section class:text-section={true} class:no-rule={!heading || heading === 'About The Project'}>
  {#if heading}<h2>{heading}</h2>{/if}
  <p>{body}</p>
</section>

<style>
  .text-section {
    margin: 0;
    padding-top: 1.1rem;
    border-top: 1px solid color-mix(in srgb, var(--text) 18%, var(--border));
  }

  .text-section.no-rule {
    padding-top: 0;
    border-top: none;
  }

  h2 {
    font-size: clamp(1.4rem, 2vw, 1.9rem);
    font-weight: 500;
    margin: 0 0 1rem;
    color: var(--text-h);
    letter-spacing: -0.03em;
    line-height: 1;
  }

  p {
    font-size: 1rem;
    line-height: 1.85;
    color: var(--text);
    white-space: pre-wrap;
    max-width: 68ch;
  }

  @media (max-width: 768px) {
    .text-section {
      padding-top: 0.9rem;
    }

    h2 {
      font-size: 1.3rem;
    }
  }
</style>
