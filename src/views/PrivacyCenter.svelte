<script>
    import { data, privacyMasked, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: hasProfile = !!($data?.profile?.username);
    $: hasApps = ($data?.apps?.length || 0) > 0;
    $: hasSecurity = ($data?.security?.logins?.length || 0) > 0;
    $: hasDevices = ($data?.devices?.length || 0) > 0;
    $: hasLocations = ($data?.locations?.length || 0) > 0;
    $: hasAds = ($data?.ads?.advertisers?.length || 0) > 0;

    function togglePrivacyMask() {
        privacyMasked.update((v) => !v);
    }
</script>

<div class="privacy-page">
    <div class="header-box">
        <div>
            <h1 class="title">Privacy Center & Audit</h1>
            <p class="desc">Local data privacy checklist and sensitive value protection controls.</p>
        </div>
        <button class="mask-toggle-btn" class:active={$privacyMasked} on:click={togglePrivacyMask}>
            {$privacyMasked ? '🔒 Sensitive Data Masked' : '👁️ Sensitive Data Revealed'}
        </button>
    </div>

    <!-- PRIVACY CHECKLIST -->
    <div class="checklist-card">
        <h2>🛡️ Export Data Privacy Checklist</h2>
        <div class="checklist-grid">
            <div class="check-item" class:detected={hasProfile}>
                <span class="check-icon">{hasProfile ? '✓' : '—'}</span>
                <div class="check-info">
                    <span class="check-title">Personal Profile Information</span>
                    <span class="check-sub">{hasProfile ? 'Detected & Protected' : 'Not Included'}</span>
                </div>
            </div>

            <div class="check-item" class:detected={hasApps}>
                <span class="check-icon">{hasApps ? '✓' : '—'}</span>
                <div class="check-info">
                    <span class="check-title">Connected Off-Instagram Apps</span>
                    <span class="check-sub">{hasApps ? `${$data.apps.length} Apps Detected` : 'Not Included'}</span>
                </div>
            </div>

            <div class="check-item" class:detected={hasSecurity}>
                <span class="check-icon">{hasSecurity ? '✓' : '—'}</span>
                <div class="check-info">
                    <span class="check-title">Login Activity & IPs</span>
                    <span class="check-sub">{hasSecurity ? 'Detected' : 'Not Included'}</span>
                </div>
            </div>

            <div class="check-item" class:detected={hasDevices}>
                <span class="check-icon">{hasDevices ? '✓' : '—'}</span>
                <div class="check-info">
                    <span class="check-title">Device & User-Agent Information</span>
                    <span class="check-sub">{hasDevices ? 'Detected' : 'Not Included'}</span>
                </div>
            </div>

            <div class="check-item" class:detected={hasLocations}>
                <span class="check-icon">{hasLocations ? '✓' : '—'}</span>
                <div class="check-info">
                    <span class="check-title">Geographical Location Logs</span>
                    <span class="check-sub">{hasLocations ? 'Detected & Masked' : 'Not Included'}</span>
                </div>
            </div>

            <div class="check-item" class:detected={hasAds}>
                <span class="check-icon">{hasAds ? '✓' : '—'}</span>
                <div class="check-info">
                    <span class="check-title">Advertiser Targeting Data</span>
                    <span class="check-sub">{hasAds ? 'Detected' : 'Not Included'}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- LOCAL GUARANTEE -->
    <div class="guarantee-card">
        <span class="g-icon">🔒</span>
        <div class="g-content">
            <h3>100% Local Browser Guarantee</h3>
            <p>Your Instagram export data is processed strictly in your web browser memory. No data is ever uploaded to any remote server or third party.</p>
        </div>
    </div>
</div>

<style lang="scss">
    .privacy-page {
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

    .mask-toggle-btn {
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.88rem;
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        cursor: pointer;
        transition: all 0.2s ease;

        &.active {
            background: rgba(34, 197, 94, 0.15);
            border-color: rgba(34, 197, 94, 0.3);
            color: #4ade80;
        }
    }

    .checklist-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(12px);

        h2 {
            color: #ffffff;
            font-size: 1.3rem;
            margin-bottom: 1.2rem;
        }
    }

    .checklist-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    }

    .check-item {
        background: rgba(13, 14, 18, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;

        .check-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(148, 163, 184, 0.15);
            color: #94a3b8;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
        }

        &.detected {
            .check-icon {
                background: rgba(34, 197, 94, 0.2);
                color: #4ade80;
            }
        }
    }

    .check-info {
        display: flex;
        flex-direction: column;

        .check-title {
            color: #ffffff;
            font-size: 0.9rem;
            font-weight: 700;
        }

        .check-sub {
            color: #94a3b8;
            font-size: 0.75rem;
        }
    }

    .guarantee-card {
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05));
        border: 1px solid rgba(34, 197, 94, 0.25);
        border-radius: 16px;
        padding: 1.2rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.2rem;

        .g-icon { font-size: 2.2rem; }
        .g-content {
            h3 { color: #4ade80; font-size: 1.1rem; margin-bottom: 0.2rem; }
            p { color: #cbd5e1; font-size: 0.88rem; margin: 0; line-height: 1.5; }
        }
    }
</style>
