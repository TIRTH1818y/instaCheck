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

    $: reels = $data?.reels || [];
</script>

<div class="reels-page">
    <div class="header-box">
        <div>
            <h1 class="title">Reels Activity</h1>
            <p class="desc">Short-form videos published to your Instagram Reels feed.</p>
        </div>
        <div class="stat-badge">{reels.length.toLocaleString()} Reels</div>
    </div>

    {#if reels.length === 0}
        <EmptyState title="No Reels Found" message="Your export package does not contain Reels activity." icon="🎬" />
    {:else}
        <div class="reels-grid">
            {#each reels as reel}
                <div class="reel-card">
                    <div class="reel-media-box">
                        {#if reel.url}
                            <video src={reel.url} controls class="reel-video"><track kind="captions" /></video>
                        {:else}
                            <div class="reel-placeholder">
                                <span>🎬</span>
                                <small>{reel.mediaUri || 'Reel video'}</small>
                            </div>
                        {/if}
                    </div>
                    <div class="reel-details">
                        <span class="reel-date">{reel.dateStr}</span>
                        {#if reel.caption}
                            <p class="reel-caption">{reel.caption}</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .reels-page {
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
        background: linear-gradient(135deg, #833ab4, #fd1d1d);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(131, 58, 180, 0.3);
    }

    .reels-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.2rem;
    }

    .reel-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .reel-media-box {
        aspect-ratio: 9/16;
        background: rgba(13, 14, 18, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;

        .reel-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .reel-placeholder {
        text-align: center;
        color: #64748b;
        padding: 1rem;
        span { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
        small { font-size: 0.72rem; word-break: break-all; }
    }

    .reel-details {
        padding: 0.9rem;
    }

    .reel-date {
        font-size: 0.75rem;
        color: #e1306c;
        font-weight: 700;
    }

    .reel-caption {
        color: #ffffff;
        font-size: 0.85rem;
        margin-top: 0.4rem;
        line-height: 1.4;
    }
</style>
