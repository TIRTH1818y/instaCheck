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

    $: posts = $data?.posts || [];
    $: mediaItems = posts.flatMap((p) =>
        (p.media || []).map((m) => ({
            filename: m.title || p.caption || 'Post Media',
            path: m.uri || 'media/posts/post.jpg',
            isVideo: false,
            url: m.url
        }))
    );
</script>

<div class="posts-page">
    <div class="header-box">
        <div>
            <h1 class="title">Published Posts</h1>
            <p class="desc">Photos and videos published to your Instagram feed.</p>
        </div>
        <div class="stat-badge">{posts.length.toLocaleString()} Posts</div>
    </div>

    {#if posts.length === 0}
        <EmptyState title="No Posts Found" message="Your export package does not contain published posts." icon="📸" />
    {:else}
        <div class="posts-list">
            {#each posts as post}
                <div class="post-card">
                    <div class="post-header">
                        <span class="post-date">{post.dateStr}</span>
                        {#if post.location && post.location !== 'Unknown'}
                            <span class="post-loc">📍 {post.location}</span>
                        {/if}
                    </div>

                    {#if post.caption}
                        <p class="post-caption">{post.caption}</p>
                    {/if}

                    {#if post.media && post.media.length > 0}
                        <div class="post-media-grid">
                            {#each post.media as item}
                                {#if item.url}
                                    <img src={item.url} alt="post media" class="post-img" />
                                {:else}
                                    <div class="media-placeholder-box">
                                        <span>📷</span>
                                        <small>{item.uri}</small>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .posts-page {
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
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .posts-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .post-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        backdrop-filter: blur(12px);
    }

    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.8rem;
    }

    .post-date {
        color: #e1306c;
        font-size: 0.82rem;
        font-weight: 700;
    }

    .post-loc {
        color: #94a3b8;
        font-size: 0.82rem;
    }

    .post-caption {
        color: #ffffff;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1rem;
        white-space: pre-line;
    }

    .post-media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.8rem;
    }

    .post-img {
        width: 100%;
        max-height: 350px;
        object-fit: cover;
        border-radius: 10px;
    }

    .media-placeholder-box {
        background: rgba(13, 14, 18, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 2rem 1rem;
        text-align: center;
        color: #64748b;
        span { font-size: 2rem; display: block; margin-bottom: 0.4rem; }
        small { font-size: 0.72rem; word-break: break-all; }
    }
</style>
