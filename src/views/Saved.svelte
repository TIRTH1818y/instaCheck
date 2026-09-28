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

    $: saved = $data?.saved || [];

    const columns = [
        { key: 'title', label: 'Saved Item' },
        { key: 'collectionName', label: 'Collection' },
        { key: 'dateStr', label: 'Saved Date' }
    ];
</script>

<div class="saved-page">
    <div class="header-box">
        <div>
            <h1 class="title">Saved Content</h1>
            <p class="desc">Bookmarks and saved post collections from your account.</p>
        </div>
        <div class="stat-badge">{saved.length.toLocaleString()} Saved Items</div>
    </div>

    {#if saved.length === 0}
        <EmptyState title="No Saved Content Found" message="Your export package does not contain saved content items." icon="🔖" />
    {:else}
        <DataTable items={saved} {columns} title="Saved Collections" searchPlaceholder="Search saved posts or collections..." />
    {/if}
</div>

<style lang="scss">
    .saved-page {
        max-width: 1200px;
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
</style>
