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

    $: likes = $data?.likes || [];

    const columns = [
        { key: 'title', label: 'Liked Content' },
        { key: 'type', label: 'Category' },
        { key: 'dateStr', label: 'Timestamp' },
        { key: 'href', label: 'Link', type: 'link', labelKey: 'title' }
    ];
</script>

<div class="likes-page">
    <div class="header-box">
        <div>
            <h1 class="title">Liked Content</h1>
            <p class="desc">Every post, reel, and comment you have liked on Instagram.</p>
        </div>
        <div class="stat-badge">{likes.length.toLocaleString()} Total Likes</div>
    </div>

    {#if likes.length === 0}
        <EmptyState title="No Likes Found" message="Your export package does not contain like history." icon="❤️" />
    {:else}
        <DataTable items={likes} {columns} title="Likes Activity History" searchPlaceholder="Search liked content..." />
    {/if}
</div>

<style lang="scss">
    .likes-page {
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
</style>
