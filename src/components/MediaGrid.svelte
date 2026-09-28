<script>
    export let items = []; // [{ filename, path, isVideo, url }]

    let viewMode = 'grid'; // 'grid' | 'list'
    let filterType = 'all'; // 'all' | 'image' | 'video'
    let selectedMedia = null;

    $: filteredItems = items.filter((item) => {
        if (filterType === 'image') return !item.isVideo;
        if (filterType === 'video') return item.isVideo;
        return true;
    });

    function openModal(item) {
        selectedMedia = item;
    }

    function closeModal() {
        selectedMedia = null;
    }
</script>

<div class="media-grid-container">
    <div class="media-controls">
        <div class="control-group">
            <button
                class="filter-btn"
                class:active={filterType === 'all'}
                on:click={() => (filterType = 'all')}
            >
                All Media ({items.length})
            </button>
            <button
                class="filter-btn"
                class:active={filterType === 'image'}
                on:click={() => (filterType = 'image')}
            >
                🖼️ Photos ({items.filter((i) => !i.isVideo).length})
            </button>
            <button
                class="filter-btn"
                class:active={filterType === 'video'}
                on:click={() => (filterType = 'video')}
            >
                🎬 Videos ({items.filter((i) => i.isVideo).length})
            </button>
        </div>

        <div class="control-group">
            <button
                class="view-btn"
                class:active={viewMode === 'grid'}
                on:click={() => (viewMode = 'grid')}
            >
                ▦ Grid
            </button>
            <button
                class="view-btn"
                class:active={viewMode === 'list'}
                on:click={() => (viewMode = 'list')}
            >
                ≡ List
            </button>
        </div>
    </div>

    {#if filteredItems.length === 0}
        <div class="no-media">No media files match the selected filter.</div>
    {:else if viewMode === 'grid'}
        <div class="media-grid">
            {#each filteredItems as item}
                <div class="media-card" on:click={() => openModal(item)}>
                    {#if item.url}
                        {#if item.isVideo}
                            <video src={item.url} class="media-preview" muted preload="metadata"><track kind="captions" /></video>
                            <span class="video-tag">🎬 Video</span>
                        {:else}
                            <img src={item.url} alt={item.filename} class="media-preview" />
                        {/if}
                    {:else}
                        <div class="media-placeholder">
                            <span>{item.isVideo ? '🎥' : '🖼️'}</span>
                            <small>{item.filename}</small>
                        </div>
                    {/if}
                    <div class="media-overlay">
                        <span class="media-name">{item.filename}</span>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="media-list">
            {#each filteredItems as item}
                <div class="list-item" on:click={() => openModal(item)}>
                    <div class="list-thumb">
                        {#if item.url}
                            {#if item.isVideo}
                                <video src={item.url} class="thumb-media" muted><track kind="captions" /></video>
                            {:else}
                                <img src={item.url} alt={item.filename} class="thumb-media" />
                            {/if}
                        {:else}
                            <span>{item.isVideo ? '🎥' : '🖼️'}</span>
                        {/if}
                    </div>
                    <div class="list-details">
                        <div class="list-filename">{item.filename}</div>
                        <div class="list-path">{item.path}</div>
                    </div>
                    <div class="list-type">{item.isVideo ? 'Video' : 'Photo'}</div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- LIGHTBOX MODAL -->
    {#if selectedMedia}
        <div class="lightbox-modal" on:click={closeModal}>
            <div class="lightbox-content" on:click|stopPropagation>
                <button class="close-btn" on:click={closeModal}>✕</button>
                {#if selectedMedia.url}
                    {#if selectedMedia.isVideo}
                        <video src={selectedMedia.url} controls autoplay class="lightbox-media"><track kind="captions" /></video>
                    {:else}
                        <img src={selectedMedia.url} alt={selectedMedia.filename} class="lightbox-media" />
                    {/if}
                {:else}
                    <div class="lightbox-no-preview">
                        <span>{selectedMedia.isVideo ? '🎥' : '🖼️'}</span>
                        <p>Direct blob URL not loaded into memory.</p>
                        <code>{selectedMedia.path}</code>
                    </div>
                {/if}
                <div class="lightbox-info">
                    <strong>{selectedMedia.filename}</strong>
                    <small>{selectedMedia.path}</small>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .media-grid-container {
        margin-bottom: 2rem;
    }

    .media-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.2rem;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .control-group {
        display: flex;
        gap: 0.5rem;
    }

    .filter-btn, .view-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #cbd5e1;
        padding: 0.45rem 0.85rem;
        border-radius: 8px;
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.15);
            color: #ffffff;
        }

        &.active {
            background: linear-gradient(135deg, #e1306c, #fd1d1d);
            color: #ffffff;
            border-color: transparent;
        }
    }

    .no-media {
        text-align: center;
        padding: 3rem;
        color: #64748b;
        background: rgba(22, 25, 34, 0.5);
        border-radius: 12px;
    }

    .media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
    }

    .media-card {
        position: relative;
        aspect-ratio: 1;
        border-radius: 12px;
        overflow: hidden;
        background: rgba(13, 14, 18, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 25px rgba(225, 48, 108, 0.25);

            .media-overlay {
                opacity: 1;
            }
        }
    }

    .media-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .video-tag {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.7);
        color: #ffffff;
        padding: 0.2rem 0.5rem;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 700;
    }

    .media-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #64748b;
        padding: 0.5rem;
        text-align: center;
        font-size: 1.5rem;

        small {
            font-size: 0.7rem;
            word-break: break-all;
            margin-top: 0.4rem;
        }
    }

    .media-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        opacity: 0;
        transition: opacity 0.2s ease;
        display: flex;
        align-items: flex-end;
        padding: 0.8rem;
    }

    .media-name {
        color: #ffffff;
        font-size: 0.78rem;
        font-weight: 600;
        word-break: break-all;
    }

    .media-list {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .list-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 0.6rem 1rem;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.12);
        }
    }

    .list-thumb {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        overflow: hidden;
        background: rgba(13, 14, 18, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .thumb-media {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .list-details {
        flex: 1;
    }

    .list-filename {
        color: #ffffff;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .list-path {
        color: #64748b;
        font-size: 0.75rem;
        font-family: monospace;
    }

    .list-type {
        color: #e1306c;
        font-size: 0.8rem;
        font-weight: 700;
    }

    /* LIGHTBOX MODAL */
    .lightbox-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(16px);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    .lightbox-content {
        position: relative;
        max-width: 800px;
        max-height: 90vh;
        background: #12141a;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .close-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(0, 0, 0, 0.7);
        border: none;
        color: #ffffff;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        font-size: 1rem;
    }

    .lightbox-media {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        background: #000;
    }

    .lightbox-no-preview {
        padding: 4rem;
        text-align: center;
        color: #94a3b8;
        span { font-size: 3rem; }
    }

    .lightbox-info {
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        strong { color: #ffffff; font-size: 1rem; }
        small { color: #94a3b8; font-family: monospace; }
    }
</style>
