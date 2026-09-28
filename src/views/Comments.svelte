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

    $: comments = $data?.comments || [];

    const columns = [
        { key: 'text', label: 'Comment Text' },
        { key: 'owner', label: 'Content Owner' },
        { key: 'dateStr', label: 'Date & Time' }
    ];
</script>

<div class="comments-page">
    <div class="header-box">
        <div>
            <h1 class="title">Comments Activity</h1>
            <p class="desc">Search and review every comment made across Instagram posts and reels.</p>
        </div>
        <div class="stat-badge">{comments.length.toLocaleString()} Total Comments</div>
    </div>

    {#if comments.length === 0}
        <EmptyState title="No Comments Found" message="Your export package does not contain comment history." icon="💬" />
    {:else}
        <DataTable items={comments} {columns} title="Comment Records" searchPlaceholder="Search comment text or owner..." />
    {/if}
</div>

<style lang="scss">
    .comments-page {
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
        background: linear-gradient(135deg, #833ab4, #e1306c);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(131, 58, 180, 0.3);
    }
</style>
