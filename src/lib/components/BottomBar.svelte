<script>
  const links = [
    { label: 'Resume', href: '/Resume/AJ_Matheson-Lieber_2026.pdf' },
    { label: 'Contact', href: 'mailto:amatheson53@students.claremontmckenna.edu' },
    { label: 'GitHub', href: 'https://github.com/ajm-l' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajmathesonlieber' },
  ];
</script>

<footer class="bottom-bar">
  {#each links as link, i}
    {#if i > 0}
      <span class="separator">&middot;</span>
    {/if}
    <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
  {/each}
</footer>

<style>
  .bottom-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 1rem 1.25rem;
  }

  a {
    color: var(--text);
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 0.3px;
    transition: color 0.2s;
  }

  a:hover {
    color: var(--text-h);
  }

  .separator {
    font-size: 14px;
    user-select: none;
  }

  @media (max-width: 768px) {
    .bottom-bar {
      padding: 0.75rem 56px 0.75rem 1rem;
      justify-content: flex-start;
      background-color: transparent;
    }
    a {
      font-size: 13px;
    }
  }
</style>
