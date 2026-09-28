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

    $: security = $data?.security || { logins: [], passwordChanges: 0, timeline: [] };
    $: logins = security.logins || [];

    const columns = [
        { key: 'type', label: 'Security Event' },
        { key: 'ip', label: 'IP / Location Details' },
        { key: 'dateStr', label: 'Timestamp' }
    ];
</script>

<div class="security-page">
    <div class="header-box">
        <div>
            <h1 class="title">Login & Security Audit</h1>
            <p class="desc">Security logs including active login sessions, logouts, and password modifications.</p>
        </div>
        <div class="stat-badge">{logins.length} Security Log Records</div>
    </div>

    <div class="security-summary-cards">
        <div class="sec-card">
            <span class="sec-icon">🔑</span>
            <div class="sec-info">
                <span class="sec-val">{security.passwordChanges || 0}</span>
                <span class="sec-lbl">Password Changes</span>
            </div>
        </div>

        <div class="sec-card">
            <span class="sec-icon">📥</span>
            <div class="sec-info">
                <span class="sec-val">{logins.length}</span>
                <span class="sec-lbl">Login Logs</span>
            </div>
        </div>
    </div>

    {#if logins.length === 0}
        <EmptyState title="No Security Logs Found" message="Your export package does not contain login security records." icon="🔒" />
    {:else}
        <DataTable items={logins} {columns} title="Security Event Timeline" searchPlaceholder="Search login events or IPs..." />
    {/if}
</div>

<style lang="scss">
    .security-page {
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
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .security-summary-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .sec-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1.2rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        .sec-icon { font-size: 2rem; }
        .sec-info { display: flex; flex-direction: column; }
        .sec-val { font-size: 1.5rem; font-weight: 800; color: #ffffff; }
        .sec-lbl { font-size: 0.8rem; color: #94a3b8; }
    }
</style>
