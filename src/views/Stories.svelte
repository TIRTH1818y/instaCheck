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

    $: stories = $data?.stories || [];
    $: interactions = $data?.storyInteractions || { polls: 0, quizzes: 0, questions: 0, emojiSliders: 0 };
</script>

<div class="stories-page">
    <div class="header-box">
        <div>
            <h1 class="title">Stories & Interactions</h1>
            <p class="desc">Review published stories and sticker interactions (polls, quizzes, questions).</p>
        </div>
        <div class="stat-badge">{stories.length.toLocaleString()} Stories Sent</div>
    </div>

    <!-- STICKER INTERACTIONS SUMMARY -->
    <div class="interactions-grid">
        <div class="stat-card">
            <span class="icon">📊</span>
            <div class="info">
                <span class="val">{(interactions.polls || 0).toLocaleString()}</span>
                <span class="lbl">Poll Answers</span>
            </div>
        </div>

        <div class="stat-card">
            <span class="icon">💡</span>
            <div class="info">
                <span class="val">{(interactions.quizzes || 0).toLocaleString()}</span>
                <span class="lbl">Quiz Answers</span>
            </div>
        </div>

        <div class="stat-card">
            <span class="icon">❓</span>
            <div class="info">
                <span class="val">{(interactions.questions || 0).toLocaleString()}</span>
                <span class="lbl">Question Answers</span>
            </div>
        </div>

        <div class="stat-card">
            <span class="icon">😍</span>
            <div class="info">
                <span class="val">{(interactions.emojiSliders || 0).toLocaleString()}</span>
                <span class="lbl">Emoji Sliders</span>
            </div>
        </div>
    </div>

    {#if stories.length === 0}
        <EmptyState title="No Stories Found" message="Your export package does not contain published Story records." icon="⭕" />
    {:else}
        <div class="stories-grid">
            {#each stories as story}
                <div class="story-card">
                    {#if story.url}
                        <img src={story.url} alt="story preview" class="story-img" />
                    {:else}
                        <div class="story-placeholder">
                            <span>⭕</span>
                            <small>{story.mediaUri || 'Story File'}</small>
                        </div>
                    {/if}
                    <div class="story-footer">
                        <span class="story-date">{story.dateStr}</span>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .stories-page {
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
        background: linear-gradient(135deg, #e1306c, #fcb045);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .interactions-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;

        @media (max-width: 800px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .stat-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;

        .icon { font-size: 1.8rem; }
        .info { display: flex; flex-direction: column; }
        .val { font-size: 1.3rem; font-weight: 800; color: #ffffff; }
        .lbl { font-size: 0.75rem; color: #94a3b8; }
    }

    .stories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
    }

    .story-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        overflow: hidden;
        aspect-ratio: 9/16;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .story-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .story-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #64748b;
        padding: 1rem;
        text-align: center;
        span { font-size: 2.5rem; display: block; margin-bottom: 0.4rem; }
        small { font-size: 0.7rem; word-break: break-all; }
    }

    .story-footer {
        background: rgba(13, 14, 18, 0.85);
        padding: 0.5rem;
        text-align: center;
    }

    .story-date {
        font-size: 0.72rem;
        color: #e1306c;
        font-weight: 700;
    }
</style>
