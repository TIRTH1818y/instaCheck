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

    $: devices = $data?.devices || [];

    const columns = [
        { key: 'userAgent', label: 'Device / Operating System / Browser' },
        { key: 'dateStr', label: 'Last Logged Activity' }
    ];
</script>

<div class="devices-page">
    <div class="header-box">
        <div>
            <h1 class="title">Device History</h1>
            <p class="desc">Hardware devices, browsers, and mobile operating systems recorded during sessions.</p>
        </div>
        <div class="stat-badge">{devices.length} Devices Tracked</div>
    </div>

    {#if devices.length === 0}
        <EmptyState title="No Device Records" message="Your export package does not contain device history." icon="📱" />
    {:else}
        <DataTable items={devices} {columns} title="Registered Devices" searchPlaceholder="Search device models..." />
    {/if}
</div>

<style lang="scss">
    .devices-page {
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
