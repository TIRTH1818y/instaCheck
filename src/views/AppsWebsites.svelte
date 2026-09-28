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

    $: apps = $data?.apps || [];

    const columns = [
        { key: 'name', label: 'App / Website Name' },
        { key: 'dateStr', label: 'Connection Date' },
        { key: 'status', label: 'Permission Status' }
    ];
</script>

<div class="apps-page">
    <div class="header-box">
        <div>
            <h1 class="title">Connected Apps & Websites</h1>
            <p class="desc">Privacy Audit: Third-party applications and web services linked off of Instagram.</p>
        </div>
        <div class="stat-badge">{apps.length} Connected Apps</div>
    </div>

    {#if apps.length === 0}
        <EmptyState title="No Connected Apps Found" message="Your export package does not contain off-Instagram app integrations." icon="🌐" />
    {:else}
        <DataTable items={apps} {columns} title="Privacy Audit - Third Party Integrations" searchPlaceholder="Search connected apps..." />
    {/if}
</div>

<style lang="scss">
    .apps-page {
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
        background: linear-gradient(135deg, #833ab4, #e1306c);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(131, 58, 180, 0.3);
    }
</style>
