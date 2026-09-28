<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import DataTable from '../components/DataTable.svelte';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: searches = $data?.searches || [];

    const columns = [
        { key: 'query', label: 'Search Query' },
        { key: 'dateStr', label: 'Date & Time' }
    ];
</script>

<div class="search-history-page">
    <div class="header-box">
        <div>
            <h1 class="title">Search History</h1>
            <p class="desc">Log of Instagram search queries executed by your account.</p>
        </div>
        <div class="stat-badge">{searches.length.toLocaleString()} Searches</div>
    </div>

    {#if searches.length === 0}
        <EmptyState title="No Search History Found" message="Your export package does not contain search history." icon="🔍" />
    {:else}
        <!-- SEARCH CLOUD -->
        <div class="cloud-card">
            <h3>🌩️ Popular Search Queries</h3>
            <div class="cloud-tags">
                {#each searches.slice(0, 15) as s}
                    <span class="cloud-tag">{s.query}</span>
                {/each}
            </div>
        </div>

        <DataTable items={searches} {columns} title="Search History Records" searchPlaceholder="Search search queries..." />
    {/if}
</div>

<style lang="scss">
    .search-history-page {
        max-width: 1100px;
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
        background: linear-gradient(135deg, #fcb045, #fd1d1d);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(252, 176, 69, 0.3);
    }

    .cloud-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(12px);

        h3 {
            color: #ffffff;
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
        }
    }

    .cloud-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }

    .cloud-tag {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #f1f5f9;
        padding: 0.35rem 0.8rem;
        border-radius: 20px;
        font-size: 0.82rem;
        font-weight: 600;
    }
</style>
