<script>
    import { data, clearData, setDemoMode, currentTheme, privacyMasked } from '../app/store';
    import { navigate } from 'svelte-routing';

    function handleClear() {
        if (confirm('Are you sure you want to clear loaded Instagram data from local memory?')) {
            clearData();
            navigate('/import');
        }
    }

    function handleDemo() {
        setDemoMode();
        navigate('/dashboard');
    }

    function toggleTheme() {
        currentTheme.update((t) => (t === 'dark' ? 'light' : 'dark'));
    }

    function togglePrivacy() {
        privacyMasked.update((v) => !v);
    }
</script>

<div class="settings-page">
    <div class="header-box">
        <div>
            <h1 class="title">Application Settings</h1>
            <p class="desc">Manage local storage, data sessions, theme appearance, and privacy defaults.</p>
        </div>
    </div>

    <div class="settings-card">
        <h2>⚙️ Session & Data Controls</h2>

        <div class="setting-item">
            <div class="item-info">
                <span class="item-title">Current Active Data</span>
                <span class="item-sub">{$data ? ($data.isDemo ? '✨ Interactive Demo Mode' : `Loaded export for @${$data.profile?.username || 'user'}`) : 'No Data Loaded'}</span>
            </div>
            <div class="item-action">
                <button class="btn btn-demo" on:click={handleDemo}>✨ Load Demo Data</button>
                <button class="btn btn-danger" on:click={handleClear}>🗑️ Reset Data Session</button>
            </div>
        </div>

        <div class="setting-item">
            <div class="item-info">
                <span class="item-title">Sensitive Data Masking</span>
                <span class="item-sub">Default state for emails, phone numbers, and location coordinates.</span>
            </div>
            <div class="item-action">
                <button class="btn btn-toggle" on:click={togglePrivacy}>
                    {$privacyMasked ? '🔒 Masking Enabled' : '👁️ Masking Disabled'}
                </button>
            </div>
        </div>

        <div class="setting-item">
            <div class="item-info">
                <span class="item-title">Appearance Theme</span>
                <span class="item-sub">Switch between Dark Instagram aesthetic and Light mode.</span>
            </div>
            <div class="item-action">
                <button class="btn btn-toggle" on:click={toggleTheme}>
                    {$currentTheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .settings-page {
        max-width: 900px;
        margin: 0 auto;
    }

    .header-box {
        margin-bottom: 1.5rem;
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

    .settings-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 1.5rem;
        backdrop-filter: blur(12px);

        h2 { color: #ffffff; font-size: 1.3rem; margin-bottom: 1.5rem; }
    }

    .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.2rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);

        &:last-child {
            border-bottom: none;
        }

        @media (max-width: 600px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
    }

    .item-info {
        display: flex;
        flex-direction: column;
    }

    .item-title {
        color: #ffffff;
        font-size: 1rem;
        font-weight: 700;
    }

    .item-sub {
        color: #94a3b8;
        font-size: 0.82rem;
        margin-top: 0.2rem;
    }

    .item-action {
        display: flex;
        gap: 0.6rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.82rem;
        font-weight: 700;
        border: 1px solid rgba(255, 255, 255, 0.15);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .btn-demo {
        background: rgba(252, 176, 69, 0.15);
        color: #fcb045;
        border-color: rgba(252, 176, 69, 0.3);
    }

    .btn-danger {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
        border-color: rgba(239, 68, 68, 0.3);
    }

    .btn-toggle {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
    }
</style>
