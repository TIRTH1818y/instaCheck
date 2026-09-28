<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import DataTable from '../components/DataTable.svelte';
    import Chart from 'svelte-frappe-charts';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: followers = $data?.followers || [];

    const columns = [
        { key: 'username', label: 'Follower Username' },
        { key: 'dateStr', label: 'Follow Date' },
        { key: 'profileUrl', label: 'Profile Link', type: 'link', labelKey: 'username' }
    ];

    $: followerLabels = $data?.followersLabels || ['Initial', 'Current'];
    $: followerValues = $data?.followersValues || [0, followers.length];
</script>

<div class="followers-page">
    <div class="header-box">
        <div>
            <h1 class="title">Followers List & Analytics</h1>
            <p class="desc">Automatically merged across all followers JSON files (e.g. followers_1.json, followers_2.json).</p>
        </div>
        <div class="stat-badge">{followers.length.toLocaleString()} Total Followers</div>
    </div>

    {#if followerValues && followerValues.length > 0}
        <div class="chart-card">
            <h3>📈 Followers Growth Over Time</h3>
            <Chart
                data={{
                    labels: followerLabels,
                    datasets: [{ name: 'Followers', values: followerValues }]
                }}
                type="line"
            />
        </div>
    {/if}

    <DataTable items={followers} {columns} title="Followers Directory" searchPlaceholder="Search followers..." />
</div>

<style lang="scss">
    .followers-page {
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
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .chart-card {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(12px);

        h3 {
            color: #ffffff;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }
    }
</style>
