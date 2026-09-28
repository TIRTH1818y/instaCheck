<script>
    import { data, restoreFromLocalStorage, setDemoMode, searchQuery } from '../app/store';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: activityTimeline = $data?.activityTimeline || [];
    let selectedType = 'all';

    $: filteredTimeline = activityTimeline.filter((act) => {
        const matchesType = selectedType === 'all' || act.type.toLowerCase() === selectedType.toLowerCase();
        const matchesQuery = !$searchQuery || act.description.toLowerCase().includes($searchQuery.toLowerCase());
        return matchesType && matchesQuery;
    });

    const typeOptions = ['all', 'Like', 'Comment', 'Follower', 'Post', 'Search'];
</script>

<div class="activity-page">
    <div class="header-box">
        <div>
            <h1 class="title">Activity Center Timeline</h1>
            <p class="desc">Unified chronological feed of all recorded actions across your Instagram export.</p>
        </div>
        <div class="stat-badge">{filteredTimeline.length.toLocaleString()} Activity Events</div>
    </div>

    <!-- TYPE FILTERS -->
    <div class="filters-bar">
        {#each typeOptions as type}
            <button
                class="filter-chip"
                class:active={selectedType === type}
                on:click={() => (selectedType = type)}
            >
                {type === 'all' ? 'All Activities' : type}
            </button>
        {/each}
    </div>

    {#if filteredTimeline.length === 0}
        <EmptyState title="No Activity Records" message="No activities match the current filter." icon="⏱️" />
    {:else}
        <div class="timeline-list">
            {#each filteredTimeline as event}
                <div class="timeline-item">
                    <div class="event-icon">{event.icon || '⏱️'}</div>
                    <div class="event-body">
                        <div class="event-type">{event.type}</div>
                        <div class="event-desc">{event.description}</div>
                        <div class="event-date">{event.dateStr}</div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .activity-page {
        max-width: 900px;
        margin: 0 auto;
    }

    .header-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .title {
        font-size: 2rem;
        color: #ffffff;
        margin-bottom: 0.3rem;
    }

    .desc {
        color: #94a3b8;
        font-size: 0.95rem;
    }

    .stat-badge {
        background: linear-gradient(135deg, #e1306c, #833ab4);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .filters-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }

    .filter-chip {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        padding: 0.45rem 0.9rem;
        border-radius: 20px;
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.15);
            color: #ffffff;
        }

        &.active {
            background: linear-gradient(135deg, #e1306c, #fd1d1d);
            color: #ffffff;
            border-color: transparent;
        }
    }

    .timeline-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .timeline-item {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1rem 1.2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        backdrop-filter: blur(12px);
    }

    .event-icon {
        font-size: 1.8rem;
    }

    .event-body {
        display: flex;
        flex-direction: column;
    }

    .event-type {
        font-size: 0.72rem;
        font-weight: 800;
        color: #e1306c;
        text-transform: uppercase;
    }

    .event-desc {
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0.2rem 0;
    }

    .event-date {
        color: #94a3b8;
        font-size: 0.78rem;
    }
</style>
