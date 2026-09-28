<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: monetization = $data?.monetization || { eligible: false, hasData: false };
</script>

<div class="monetization-page">
    <div class="header-box">
        <div>
            <h1 class="title">Monetization & Gifts</h1>
            <p class="desc">Creator monetization eligibility, insights, and gifts activity.</p>
        </div>
        <div class="stat-badge">{monetization.eligible ? 'Eligible' : 'Standard'}</div>
    </div>

    {#if !monetization.hasData}
        <EmptyState title="No Monetization Data Found" message="Your export package does not contain creator monetization records." icon="💎" />
    {:else}
        <div class="mon-card">
            <h2>💎 Creator Status</h2>
            <p>Monetization Status: <strong>{monetization.eligible ? 'Eligible for Creator Tools' : 'Standard Account'}</strong></p>
        </div>
    {/if}
</div>

<style lang="scss">
    .monetization-page {
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
        background: linear-gradient(135deg, #833ab4, #e1306c);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(131, 58, 180, 0.3);
    }

    .mon-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.5rem;
        color: #ffffff;
    }
</style>
