<script>
    import { link } from 'svelte-routing';
    import { data } from '../app/store';

    export const activePath = '';

    const navSections = [
        {
            title: 'OVERVIEW',
            items: [
                { path: '/dashboard', label: 'Dashboard', icon: '📊' },
                { path: '/stats', label: 'Classic Overview', icon: '⚡' }
            ]
        },
        {
            title: 'ACCOUNT',
            items: [
                { path: '/profile', label: 'Profile & Info', icon: '👤' },
                { path: '/connections', label: 'Connections', icon: '👥' },
                { path: '/followers', label: 'Followers', icon: '📥' },
                { path: '/following', label: 'Following', icon: '📤' }
            ]
        },
        {
            title: 'CONTENT',
            items: [
                { path: '/posts', label: 'Posts', icon: '📸' },
                { path: '/reels', label: 'Reels', icon: '🎬' },
                { path: '/stories', label: 'Stories', icon: '⭕' },
                { path: '/media', label: 'Media Library', icon: '🖼️' },
                { path: '/saved', label: 'Saved Content', icon: '🔖' }
            ]
        },
        {
            title: 'ACTIVITY',
            items: [
                { path: '/likes', label: 'Likes', icon: '❤️' },
                { path: '/comments', label: 'Comments', icon: '💬' },
                { path: '/messages', label: 'Messages', icon: '✈️' },
                { path: '/search-history', label: 'Search History', icon: '🔍' },
                { path: '/activity', label: 'Activity Timeline', icon: '⏱️' }
            ]
        },
        {
            title: 'PRIVACY & SECURITY',
            items: [
                { path: '/apps-websites', label: 'Apps & Websites', icon: '🌐' },
                { path: '/security', label: 'Login & Security', icon: '🔒' },
                { path: '/devices', label: 'Devices', icon: '📱' },
                { path: '/locations', label: 'Locations', icon: '📍' },
                { path: '/privacy', label: 'Privacy Center', icon: '🛡️' },
                { path: '/preferences', label: 'Preferences', icon: '⚙️' }
            ]
        },
        {
            title: 'INSIGHTS',
            items: [
                { path: '/ads', label: 'Ads Information', icon: '📢' },
                { path: '/shopping', label: 'Shopping', icon: '🛍️' },
                { path: '/monetization', label: 'Monetization', icon: '💎' }
            ]
        },
        {
            title: 'TOOLS',
            items: [
                { path: '/export-guide', label: 'Export Guide', icon: '📖' },
                { path: '/data-explorer', label: 'Data Explorer', icon: '🗂️' },
                { path: '/reports', label: 'Export Reports', icon: '📄' },
                { path: '/settings', label: 'Settings', icon: '🔧' },
                { path: '/import', label: 'Import New File', icon: '📁' }
            ]
        }
    ];
</script>

<aside class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-brand">
            <span class="tag">#</span>
            <div class="brand-text">
                <span class="brand-title">Instaddict</span>
                <span class="brand-sub">Instagram Analyzer</span>
            </div>
        </div>
        {#if $data && $data.isDemo}
            <div class="demo-badge">
                <span>✨ DEMO MODE</span>
            </div>
        {/if}
    </div>

    <nav class="sidebar-nav">
        {#each navSections as section}
            <div class="nav-section">
                <div class="section-title">{section.title}</div>
                {#each section.items as item}
                    <a href={item.path} use:link class="nav-item">
                        <span class="nav-icon">{item.icon}</span>
                        <span class="nav-label">{item.label}</span>
                    </a>
                {/each}
            </div>
        {/each}
    </nav>
</aside>

<style lang="scss">
    .sidebar {
        width: 260px;
        background: rgba(13, 14, 18, 0.95);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        z-index: 90;
        backdrop-filter: blur(20px);
    }

    .sidebar-header {
        padding: 1.2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
    }

    .brand-text {
        display: flex;
        flex-direction: column;
    }

    .brand-title {
        font-family: 'Outfit', sans-serif;
        font-weight: 800;
        font-size: 1.2rem;
        background: linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .brand-sub {
        font-size: 0.75rem;
        color: #94a3b8;
    }

    .demo-badge {
        margin-top: 0.8rem;
        padding: 0.25rem 0.6rem;
        background: rgba(252, 176, 69, 0.15);
        border: 1px solid rgba(252, 176, 69, 0.4);
        border-radius: 6px;
        color: #fcb045;
        font-size: 0.7rem;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.05em;
    }

    .sidebar-nav {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 0.8rem;
    }

    .nav-section {
        margin-bottom: 1.2rem;
    }

    .section-title {
        font-size: 0.68rem;
        font-weight: 800;
        color: #64748b;
        letter-spacing: 0.08em;
        padding: 0.4rem 0.6rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.5rem 0.7rem;
        color: #cbd5e1 !important;
        border-radius: 8px;
        font-size: 0.88rem;
        font-weight: 500;
        transition: all 0.2s ease;
        margin-bottom: 2px;

        &:hover {
            background: rgba(225, 48, 108, 0.12);
            color: #ffffff !important;
            transform: translateX(3px);
        }
    }

    .nav-icon {
        font-size: 1rem;
    }

    @media (max-width: 900px) {
        .sidebar {
            display: none;
        }
    }
</style>
