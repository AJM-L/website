<script>
  /** @type {{ snippet: string, language?: string, heading?: string }} */
  let { snippet, language = '', heading } = $props();
</script>

<section class="code-section">
  {#if heading}<h2>{heading}</h2>{/if}
  <pre><code class="language-{language}">{snippet}</code></pre>
</section>

<style>
  .code-section {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 0.75rem;
    color: var(--text-h);
  }

  pre {
    background: var(--accent-bg);
    border: 1px solid var(--accent-border);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    margin: 0;
  }

  code {
    font-family: var(--mono);
    font-size: 13.5px;
    line-height: 1.65;
    color: var(--text-h);
  }
</style>
