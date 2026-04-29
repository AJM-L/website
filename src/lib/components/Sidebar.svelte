<script>
  /** @type {{ activeFilters: Set<string>, onToggle: (category: string) => void }} */
  let { activeFilters, onToggle } = $props();

  const categories = ['Technical', 'Design', 'Art'];
</script>

<nav class="sidebar">
  {#each categories as category}
    <button
      class="filter-btn"
      class:active={activeFilters.has(category)}
      onclick={() => onToggle(category)}
    >
      <span>{category}</span>
    </button>
  {/each}
</nav>

<style>
  /*
   * The nav is sized to (container-height × container-width) and rotated -90deg
   * around its center. Because the center is the pivot, the rotated element
   * fills the sidebar column exactly: visually 200px wide × full-height tall.
   * container-type: size on .sidebar-area makes cqh/cqw units work.
   */
  .sidebar {
    display: flex;
    flex-direction: row;
    gap: 0;
    padding: 10px;
    width: 100cqh;
    height: 100cqw;
    transform: rotate(-90deg);
    flex-shrink: 0;
    
    
  }
  /* Each button is itself a flex container so ::before/span/::after are flex items.
     Inactive: compact, brackets tight to text.
     Active: fills remaining space, brackets pushed to edges via space-between. */
  .filter-btn {
    display: flex;
    align-items: left;
    justify-content: center;
    gap: 3px;
    flex: 0 0 auto;
    background: none;
    border: none;
    color: var(--text);
    font-family: var(--sans);
    font-size: 15px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0;
    white-space: nowrap;
    transition: color 0.2s;
    padding-right: 10px;
  }

  .filter-btn::before { content: "["; }
  .filter-btn::after  { content: "]"; }

  .filter-btn:hover {
    color: var(--text-h);
  }

  .filter-btn.active {
    color: var(--text-h);
    flex: 1 1 auto;
    justify-content: space-between;
    padding-right: 10px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .sidebar {
      width: auto;
      height: auto;
      transform: none;
      flex-direction: row;
      padding: 0.75rem 1rem;
      gap: 6px;
      overflow-x: auto;
      border: none;
    }
    .filter-btn {
      font-size: 13px;
      padding: 6px 10px;
    }
    .filter-btn.active {
      flex: 0 0 auto;
      justify-content: space-between;
      padding: 6px 18px;
      min-width: 7rem;
      color: var(--accent);
    }
  }
</style>
