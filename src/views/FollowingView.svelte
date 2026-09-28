<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import DataTable from '../components/DataTable.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: following = $data?.following || [];

    const columns = [
        { key: 'username', label: 'Following Username' },
        { key: 'dateStr', label: 'Follow Date' },
        { key: 'profileUrl', label: 'Profile Link', type: 'link', labelKey: 'username' }
    ];
</script>

<div class="following-page">
    <div class="header-box">
        <div>
            <h1 class="title">Following Directory</h1>
            <p class="desc">Complete list of Instagram accounts you follow.</p>
        </div>
        <div class="stat-badge">{following.length.toLocaleString()} Total Following</div>
    </div>

    <DataTable items={following} {columns} title="Accounts You Follow" searchPlaceholder="Search following..." />
</div>

<style lang="scss">
    .following-page {
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
