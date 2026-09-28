<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import { onMount } from 'svelte';
    import { navigate, link } from 'svelte-routing';
    import Chart from 'svelte-frappe-charts';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) {
                setDemoMode();
            }
        }
    });

    $: followersCount = $data?.followers?.length || 0;
    $: followingCount = $data?.following?.length || 0;
    $: postsCount = $data?.posts?.length || 0;
    $: reelsCount = $data?.reels?.length || 0;
    $: storiesCount = $data?.stories?.length || 0;
    $: likesCount = $data?.likes?.length || 0;
    $: commentsCount = $data?.comments?.length || 0;
    $: savedCount = $data?.saved?.length || 0;
    $: messagesCount = $data?.messages?.totalMessages || 0;
    $: searchesCount = $data?.searches?.length || 0;

    $: mutualsCount = $data?.connections?.mutuals?.length || 0;
    $: nonFollowersCount = $data?.connections?.nonFollowers?.length || 0;
    $: pendingRequestsCount = $data?.connections?.pendingFollowRequests?.length || 0;

    // Charts data
    const hoursLabels = new Array(24).fill(0).map((_, i) => (i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`));
    $: hoursValues = $data?.hoursValues || new Array(24).fill(0);

    $: monthlyLabels = $data?.messagesMonths?.monthsLabels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    $: monthlyValues = $data?.messagesMonths?.monthsValues || [10, 20, 30, 40, 50, 60];

    $: followerLabels = $data?.followersLabels || ['Initial', 'Current'];
    $: followerValues = $data?.followersValues || [0, followersCount];
</script>

<div class="dashboard-page">
    <!-- HERO SUMMARY CARD -->
    <div class="summary-hero">
        <div class="hero-header">
            <span class="badge">DASHBOARD OVERVIEW</span>
            {#if $data && $data.isDemo}
                <span class="demo-tag">DEMO MODE</span>
            {/if}
        </div>
        <h1 class="hero-title">Your Instagram in Numbers</h1>
        <p class="hero-subtitle">Real metrics extracted directly from your account activity data export.</p>

        <div class="hero-stats-grid">
            <div class="hero-stat">
                <span class="stat-value">{followersCount.toLocaleString()}</span>
                <span class="stat-label">Followers</span>
            </div>
            <div class="hero-stat">
                <span class="stat-value">{followingCount.toLocaleString()}</span>
                <span class="stat-label">Following</span>
            </div>
            <div class="hero-stat">
                <span class="stat-value">{postsCount.toLocaleString()}</span>
                <span class="stat-label">Posts</span>
            </div>
            <div class="hero-stat">
                <span class="stat-value">{reelsCount.toLocaleString()}</span>
                <span class="stat-label">Reels</span>
            </div>
            <div class="hero-stat">
                <span class="stat-value">{commentsCount.toLocaleString()}</span>
                <span class="stat-label">Comments</span>
            </div>
            <div class="hero-stat">
                <span class="stat-value">{likesCount.toLocaleString()}</span>
                <span class="stat-label">Likes</span>
            </div>
        </div>
    </div>

    <!-- TOP CARDS GRID -->
    <div class="cards-grid">
        <a href="/followers" use:link class="dash-card">
            <div class="card-icon">👥</div>
            <div class="card-info">
                <span class="card-val">{followersCount.toLocaleString()}</span>
                <span class="card-lbl">Followers</span>
            </div>
        </a>

        <a href="/following" use:link class="dash-card">
            <div class="card-icon">📤</div>
            <div class="card-info">
                <span class="card-val">{followingCount.toLocaleString()}</span>
                <span class="card-lbl">Following</span>
            </div>
        </a>

        <a href="/connections" use:link class="dash-card highlight">
            <div class="card-icon">🤝</div>
            <div class="card-info">
                <span class="card-val">{mutualsCount.toLocaleString()}</span>
                <span class="card-lbl">Mutual Connections</span>
            </div>
        </a>

        <a href="/connections" use:link class="dash-card warning">
            <div class="card-icon">🚫</div>
            <div class="card-info">
                <span class="card-val">{nonFollowersCount.toLocaleString()}</span>
                <span class="card-lbl">Not Following Back</span>
            </div>
        </a>

        <a href="/posts" use:link class="dash-card">
            <div class="card-icon">📸</div>
            <div class="card-info">
                <span class="card-val">{postsCount.toLocaleString()}</span>
                <span class="card-lbl">Posts</span>
            </div>
        </a>

        <a href="/reels" use:link class="dash-card">
            <div class="card-icon">🎬</div>
            <div class="card-info">
                <span class="card-val">{reelsCount.toLocaleString()}</span>
                <span class="card-lbl">Reels</span>
            </div>
        </a>

        <a href="/stories" use:link class="dash-card">
            <div class="card-icon">⭕</div>
            <div class="card-info">
                <span class="card-val">{storiesCount.toLocaleString()}</span>
                <span class="card-lbl">Stories</span>
            </div>
        </a>

        <a href="/likes" use:link class="dash-card">
            <div class="card-icon">❤️</div>
            <div class="card-info">
                <span class="card-val">{likesCount.toLocaleString()}</span>
                <span class="card-lbl">Likes</span>
            </div>
        </a>

        <a href="/comments" use:link class="dash-card">
            <div class="card-icon">💬</div>
            <div class="card-info">
                <span class="card-val">{commentsCount.toLocaleString()}</span>
                <span class="card-lbl">Comments</span>
            </div>
        </a>

        <a href="/saved" use:link class="dash-card">
            <div class="card-icon">🔖</div>
            <div class="card-info">
                <span class="card-val">{savedCount.toLocaleString()}</span>
                <span class="card-lbl">Saved Items</span>
            </div>
        </a>

        <a href="/messages" use:link class="dash-card">
            <div class="card-icon">✈️</div>
            <div class="card-info">
                <span class="card-val">{messagesCount.toLocaleString()}</span>
                <span class="card-lbl">Messages</span>
            </div>
        </a>

        <a href="/search-history" use:link class="dash-card">
            <div class="card-icon">🔍</div>
            <div class="card-info">
                <span class="card-val">{searchesCount.toLocaleString()}</span>
                <span class="card-lbl">Searches</span>
            </div>
        </a>
    </div>

    <!-- CHARTS GRID -->
    <div class="charts-grid">
        <div class="chart-card">
            <h3>📈 Follower Growth Trend</h3>
            <Chart
                data={{
                    labels: followerLabels,
                    datasets: [{ name: 'Followers', values: followerValues }]
                }}
                type="line"
            />
        </div>

        <div class="chart-card">
            <h3>🕒 Peak Activity Hours</h3>
            <Chart
                data={{
                    labels: hoursLabels,
                    datasets: [{ name: 'Activity', values: hoursValues }]
                }}
                type="bar"
            />
        </div>

        <div class="chart-card span-full">
            <h3>📅 Monthly Instagram Moments</h3>
            <Chart
                data={{
                    labels: monthlyLabels,
                    datasets: [{ name: 'Monthly Interactions', values: monthlyValues }]
                }}
                type="line"
            />
        </div>
    </div>
</div>

<style lang="scss">
    .dashboard-page {
        max-width: 1300px;
        margin: 0 auto;
    }

    .summary-hero {
        background: linear-gradient(135deg, rgba(131, 58, 180, 0.2), rgba(225, 48, 108, 0.2), rgba(252, 176, 69, 0.15));
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 2rem;
        backdrop-filter: blur(16px);
    }

    .hero-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.8rem;
    }

    .badge {
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: #e1306c;
        background: rgba(225, 48, 108, 0.15);
        padding: 0.3rem 0.7rem;
        border-radius: 6px;
    }

    .demo-tag {
        font-size: 0.75rem;
        font-weight: 800;
        color: #fcb045;
        background: rgba(252, 176, 69, 0.15);
        border: 1px solid rgba(252, 176, 69, 0.4);
        padding: 0.3rem 0.7rem;
        border-radius: 6px;
    }

    .hero-title {
        font-size: 2.2rem;
        color: #ffffff;
        margin-bottom: 0.3rem;
    }

    .hero-subtitle {
        color: #cbd5e1;
        font-size: 0.95rem;
        margin-bottom: 1.8rem;
    }

    .hero-stats-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;

        @media (max-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .hero-stat {
        background: rgba(13, 14, 18, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1rem;
        text-align: center;

        .stat-value {
            display: block;
            font-size: 1.6rem;
            font-weight: 800;
            color: #ffffff;
        }

        .stat-label {
            font-size: 0.75rem;
            color: #94a3b8;
            text-transform: uppercase;
        }
    }

    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .dash-card {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1.1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none !important;
        transition: all 0.2s ease;

        &:hover {
            transform: translateY(-3px);
            background: rgba(225, 48, 108, 0.12);
            border-color: rgba(225, 48, 108, 0.4);
        }

        &.highlight {
            background: rgba(34, 197, 94, 0.1);
            border-color: rgba(34, 197, 94, 0.3);
        }

        &.warning {
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.3);
        }
    }

    .card-icon {
        font-size: 1.8rem;
    }

    .card-info {
        display: flex;
        flex-direction: column;
    }

    .card-val {
        font-size: 1.3rem;
        font-weight: 800;
        color: #ffffff;
    }

    .card-lbl {
        font-size: 0.78rem;
        color: #94a3b8;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.2rem;

        @media (max-width: 900px) {
            grid-template-columns: 1fr;
        }
    }

    .chart-card {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        backdrop-filter: blur(12px);

        h3 {
            color: #ffffff;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        &.span-full {
            grid-column: 1 / -1;
        }
    }
</style>
