<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: prefs = $data?.preferences || {
        accountType: 'Public',
        allowTagging: 'Everyone',
        filteredKeywords: 'Enabled',
        dataSharing: 'Limited'
    };
</script>

<div class="preferences-page">
    <div class="header-box">
        <div>
            <h1 class="title">Account Preferences</h1>
            <p class="desc">Read-only visual representations of privacy, notification, and sharing settings extracted from data.</p>
        </div>
        <div class="read-only-badge">🔒 Read-Only Export Data</div>
    </div>

    <div class="prefs-grid">
        <div class="pref-card">
            <div class="pref-header">
                <span class="icon">👤</span>
                <span class="title">Account Type</span>
            </div>
            <div class="pref-status active">{prefs.accountType}</div>
            <p class="pref-desc">Current profile visibility setting.</p>
        </div>

        <div class="pref-card">
            <div class="pref-header">
                <span class="icon">🏷️</span>
                <span class="title">Tagging & Mentions</span>
            </div>
            <div class="pref-status active">{prefs.allowTagging}</div>
            <p class="pref-desc">Who can tag or mention your handle in posts.</p>
        </div>

        <div class="pref-card">
            <div class="pref-header">
                <span class="icon">🛡️</span>
                <span class="title">Comment Keyword Filters</span>
            </div>
            <div class="pref-status active">{prefs.filteredKeywords}</div>
            <p class="pref-desc">Automatic offensive comment filtering.</p>
        </div>

        <div class="pref-card">
            <div class="pref-header">
                <span class="icon">📊</span>
                <span class="title">Off-Meta Data Sharing</span>
            </div>
            <div class="pref-status">{prefs.dataSharing}</div>
            <p class="pref-desc">External data activity sharing preference.</p>
        </div>
    </div>
</div>

<style lang="scss">
    .preferences-page {
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

    .read-only-badge {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #cbd5e1;
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .prefs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.2rem;

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    }

    .pref-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        backdrop-filter: blur(12px);
    }

    .pref-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.8rem;

        .icon { font-size: 1.5rem; }
        .title { color: #ffffff; font-weight: 700; font-size: 1rem; }
    }

    .pref-status {
        display: inline-block;
        background: rgba(225, 48, 108, 0.15);
        color: #e1306c;
        border: 1px solid rgba(225, 48, 108, 0.3);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 0.6rem;

        &.active {
            background: rgba(34, 197, 94, 0.15);
            color: #4ade80;
            border-color: rgba(34, 197, 94, 0.3);
        }
    }

    .pref-desc {
        color: #94a3b8;
        font-size: 0.82rem;
        margin: 0;
    }
</style>
