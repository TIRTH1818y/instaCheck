<script>
    import { link, navigate } from 'svelte-routing';
    import { data, privacyMasked, setDemoMode, currentTheme, searchQuery } from '../app/store';

    let localSearch = '';

    function handleSearchKeydown(e) {
        if (e.key === 'Enter' && localSearch.trim()) {
            searchQuery.set(localSearch);
            navigate('/activity');
        }
    }

    function togglePrivacy() {
        privacyMasked.update((v) => !v);
    }

    function triggerDemo() {
        setDemoMode();
        navigate('/dashboard');
    }

    function toggleTheme() {
        currentTheme.update((t) => (t === 'dark' ? 'light' : 'dark'));
    }
</script>

<header class="app-header">
    <div class="header-container">
        <!-- BRAND -->
        <div class="brand-group" on:click={() => navigate('/dashboard')}>
            <span class="tag">#</span>
            <div class="brand-text">
                <span class="app-title">Instagram Data Analyzer</span>
                <span class="app-sub">by Instaddict</span>
            </div>
        </div>

        <!-- SEARCH BAR -->
        <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
                type="text"
                placeholder="Search across posts, comments, users, messages..."
                bind:value={localSearch}
                on:keydown={handleSearchKeydown}
            />
        </div>

        <!-- ACTIONS -->
        <div class="header-actions">
            <button class="header-btn demo-btn" on:click={triggerDemo}>
                ✨ Demo Mode
            </button>

            <button
                class="header-btn privacy-btn"
                class:active={$privacyMasked}
                on:click={togglePrivacy}
                title="Toggle sensitive data masking"
            >
                {$privacyMasked ? '🔒 Privacy On' : '👁️ Privacy Off'}
            </button>

            <button
                class="header-btn theme-btn"
                on:click={toggleTheme}
                title="Toggle Theme"
            >
                {$currentTheme === 'dark' ? '🌙' : '☀️'}
            </button>

            <a href="/import" use:link class="header-btn import-btn">
                📁 Import
            </a>
        </div>
    </div>
</header>

<style lang="scss">
    .app-header {
        position: fixed;
        top: 0;
        left: 260px;
        right: 0;
        height: 64px;
        background: rgba(13, 14, 18, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        z-index: 80;
        display: flex;
        align-items: center;

        @media (max-width: 900px) {
            left: 0;
        }
    }

    .header-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .brand-group {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        cursor: pointer;
    }

    .brand-text {
        display: flex;
        flex-direction: column;
    }

    .app-title {
        font-family: 'Outfit', sans-serif;
        font-weight: 800;
        font-size: 1.15rem;
        background: linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .app-sub {
        font-size: 0.72rem;
        color: #94a3b8;
    }

    .search-box {
        flex: 1;
        max-width: 450px;
        position: relative;
        display: flex;
        align-items: center;

        @media (max-width: 768px) {
            display: none;
        }

        .search-icon {
            position: absolute;
            left: 12px;
            font-size: 0.9rem;
            color: #64748b;
        }

        input {
            width: 100%;
            background: rgba(22, 25, 34, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 0.45rem 1rem 0.45rem 2.2rem;
            color: #ffffff;
            font-size: 0.85rem;
            outline: none;
            transition: all 0.2s ease;

            &:focus {
                border-color: #e1306c;
                box-shadow: 0 0 15px rgba(225, 48, 108, 0.2);
            }
        }
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .header-btn {
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 700;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.08);
        color: #f1f5f9 !important;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;

        &:hover {
            background: rgba(225, 48, 108, 0.2);
            border-color: rgba(225, 48, 108, 0.4);
        }
    }

    .demo-btn {
        background: rgba(252, 176, 69, 0.15);
        border-color: rgba(252, 176, 69, 0.3);
        color: #fcb045 !important;
    }

    .privacy-btn.active {
        background: rgba(34, 197, 94, 0.15);
        border-color: rgba(34, 197, 94, 0.3);
        color: #4ade80 !important;
    }

    .import-btn {
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        border: none;
    }
</style>
