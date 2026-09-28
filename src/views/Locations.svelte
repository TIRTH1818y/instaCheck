<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import SensitiveField from '../components/SensitiveField.svelte';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: locations = $data?.locations || [];
</script>

<div class="locations-page">
    <div class="header-box">
        <div>
            <h1 class="title">Location History</h1>
            <p class="desc">Geographical coordinates and location records associated with your account.</p>
        </div>
        <div class="stat-badge">{locations.length} Location Records</div>
    </div>

    {#if locations.length === 0}
        <EmptyState title="No Location Records Found" message="Your export package does not contain location logs." icon="📍" />
    {:else}
        <div class="locations-list">
            {#each locations as loc}
                <div class="location-card">
                    <div class="loc-header">
                        <span class="loc-city">📍 {loc.city || 'Location Record'}</span>
                        <span class="loc-date">{loc.dateStr}</span>
                    </div>

                    <div class="coords-box">
                        <SensitiveField
                            label="Precise Coordinates"
                            value={loc.latitude && loc.longitude ? `${loc.latitude}, ${loc.longitude}` : ''}
                            type="location"
                        />
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .locations-page {
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

    .locations-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .location-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        backdrop-filter: blur(12px);
    }

    .loc-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.8rem;
    }

    .loc-city {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ffffff;
    }

    .loc-date {
        font-size: 0.8rem;
        color: #94a3b8;
    }
</style>
