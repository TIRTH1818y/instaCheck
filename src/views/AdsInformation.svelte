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

    $: ads = $data?.ads || { advertisers: [], interests: [], totalAdvertisers: 0 };
    $: advertisers = (ads.advertisers || []).map((a) => ({ name: a, category: 'Targeted Advertiser' }));
    $: interests = (ads.interests || []).map((i) => ({ topic: i, category: 'Ad Interest Topic' }));

    const advColumns = [{ key: 'name', label: 'Advertiser Name' }, { key: 'category', label: 'Type' }];
    const intColumns = [{ key: 'topic', label: 'Interest Category Topic' }, { key: 'category', label: 'Source' }];
</script>

<div class="ads-page">
    <div class="header-box">
        <div>
            <h1 class="title">Ads & Targeting Information</h1>
            <p class="desc">This information comes directly from your Instagram export to show who targeted your profile.</p>
        </div>
        <div class="stat-badge">{ads.totalAdvertisers || advertisers.length} Advertisers</div>
    </div>

    {#if advertisers.length === 0 && interests.length === 0}
        <EmptyState title="No Ad Targeting Data Found" message="Your export package does not contain advertiser targeting information." icon="📢" />
    {:else}
        {#if advertisers.length > 0}
            <DataTable items={advertisers} columns={advColumns} title="Advertisers Who Saved or Targeted Your Info" searchPlaceholder="Search advertisers..." />
        {/if}

        {#if interests.length > 0}
            <DataTable items={interests} columns={intColumns} title="Inferred Ad Interest Categories" searchPlaceholder="Search ad interest topics..." />
        {/if}
    {/if}
</div>

<style lang="scss">
    .ads-page {
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
</style>
