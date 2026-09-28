<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import JsonTree from '../components/JsonTree.svelte';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: rawTree = $data?.rawTree || null;
</script>

<div class="data-explorer-page">
    <div class="header-box">
        <div>
            <h1 class="title">Generic JSON Data Explorer</h1>
            <p class="desc">Browse, inspect, search, and copy raw exported Instagram JSON files and future schema updates.</p>
        </div>
        <div class="stat-badge">Raw File Inspector</div>
    </div>

    {#if !rawTree}
        <EmptyState title="No Export Tree Available" message="Import an Instagram export package to explore raw JSON files." icon="🗂️" />
    {:else}
        <JsonTree node={rawTree} />
    {/if}
</div>

<style lang="scss">
    .data-explorer-page {
        max-width: 1400px;
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
</style>
