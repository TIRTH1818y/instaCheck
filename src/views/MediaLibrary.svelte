<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import MediaGrid from '../components/MediaGrid.svelte';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: mediaList = $data?.mediaList || [];
</script>

<div class="media-library-page">
    <div class="header-box">
        <div>
            <h1 class="title">Media Library</h1>
            <p class="desc">Browse all local photo and video assets extracted from your Instagram package.</p>
        </div>
        <div class="stat-badge">{mediaList.length.toLocaleString()} Media Files</div>
    </div>

    {#if mediaList.length === 0}
        <EmptyState title="No Media Files Found" message="Your import package does not contain raw media files." icon="🖼️" />
    {:else}
        <MediaGrid items={mediaList} />
    {/if}
</div>

<style lang="scss">
    .media-library-page {
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
        background: linear-gradient(135deg, #e1306c, #833ab4);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }
</style>
