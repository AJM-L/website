<script>
  import { projects } from './lib/data/projects.js';
  import Sidebar from './lib/components/Sidebar.svelte';
  import BottomBar from './lib/components/BottomBar.svelte';
  import ThemeToggle from './lib/components/ThemeToggle.svelte';
  import Gallery from './lib/components/Gallery.svelte';
  import ProjectDetail from './lib/components/ProjectDetail.svelte';

  let view = $state('gallery');
  let selectedProject = $state(null);
  let activeFilters = $state(new Set(['Technical', 'Design', 'Art']));

  let filteredProjects = $derived(
    projects.filter(p => p.categories.some(c => activeFilters.has(c)))
  );

  function toggleFilter(category) {
    const next = new Set(activeFilters);
    if (next.has(category)) {
      if (next.size > 1) next.delete(category);
    } else {
      next.add(category);
    }
    activeFilters = next;
  }

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

{#if view === 'gallery'}
<div class="sidebar-area">
  <Sidebar {activeFilters} onToggle={toggleFilter} />
</div>
{/if}

<div class="main-area" class:scrollable={view === 'detail'}>
  {#if view === 'gallery'}
    <Gallery projects={filteredProjects} onSelect={selectProject} />
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
