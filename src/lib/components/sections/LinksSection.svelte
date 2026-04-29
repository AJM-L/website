<script>
  /** @type {{ items: Array<{ label: string, href: string, description?: string }>, heading?: string }} */
  let { items, heading } = $props();
</script>

<section class="links-section">
  {#if heading}<h2>{heading}</h2>{/if}
  <ul>
    {#each items as link}
      <li>
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>
        {#if link.description}<span class="desc">{link.description}</span>{/if}
      </li>
    {/each}
  </ul>
</section>

<style>
  .links-section {
    margin: 0;
    padding-top: 1.1rem;
    border-top: 1px solid color-mix(in srgb, var(--text) 18%, var(--border));
  }

  h2 {
    font-size: clamp(1.4rem, 2vw, 1.9rem);
    font-weight: 500;
    margin: 0 0 1rem;
    color: var(--text-h);
    letter-spacing: -0.03em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0.65rem 0;
    border-bottom: 1px solid color-mix(in srgb, var(--text) 12%, var(--border));
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 15px;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    transition: opacity 0.15s;
  }

  a:hover {
    opacity: 0.75;
  }

  .desc {
    font-size: 14px;
    color: var(--text);
  }

  @media (max-width: 768px) {
    .links-section {
      padding-top: 0.9rem;
    }
  }
</style>
