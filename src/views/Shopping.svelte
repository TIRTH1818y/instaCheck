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

    $: shopping = $data?.shopping || { hasData: false, items: [] };

    const columns = [
        { key: 'name', label: 'Product Name' },
        { key: 'shop', label: 'Shop Name' },
        { key: 'date', label: 'Interaction Date' }
    ];
</script>

<div class="shopping-page">
    <div class="header-box">
        <div>
            <h1 class="title">Shopping Activity</h1>
            <p class="desc">Products viewed, saved, or purchased through Instagram Shopping.</p>
        </div>
        <div class="stat-badge">{shopping.items.length} Products</div>
    </div>

    {#if !shopping.hasData || shopping.items.length === 0}
        <EmptyState title="No Shopping Data Found" message="No shopping data was included in this export." icon="🛍️" />
    {:else}
        <DataTable items={shopping.items} {columns} title="Shopping Interactions" searchPlaceholder="Search products or shops..." />
    {/if}
</div>

<style lang="scss">
    .shopping-page {
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
</style>
