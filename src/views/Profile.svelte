<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import SensitiveField from '../components/SensitiveField.svelte';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: profile = $data?.profile || {};
</script>

<div class="profile-page">
    {#if !profile || !profile.username}
        <EmptyState title="Profile Information Missing" message="Could not find personal account info in this export." />
    {:else}
        <div class="profile-card-container">
            <div class="profile-header">
                {#if profile.profilePictureUrl}
                    <img src={profile.profilePictureUrl} alt={profile.username} class="avatar" />
                {:else}
                    <div class="avatar-placeholder">{profile.username[0].toUpperCase()}</div>
                {/if}

                <div class="header-info">
                    <h1 class="profile-name">{profile.name || profile.username}</h1>
                    <span class="profile-username">@{profile.username}</span>
                    <span class="account-badge">{profile.accountType || 'Personal Account'}</span>
                </div>
            </div>

            {#if profile.bio}
                <div class="bio-section">
                    <div class="section-title">BIOGRAPHY</div>
                    <p class="bio-text">{profile.bio}</p>
                </div>
            {/if}

            <div class="info-grid">
                <div class="grid-item">
                    <span class="item-label">Account Joined</span>
                    <span class="item-value">{profile.creationDate || 'N/A'}</span>
                </div>
                <div class="grid-item">
                    <span class="item-label">Category</span>
                    <span class="item-value">{profile.professionalCategory || 'General'}</span>
                </div>
            </div>

            <h3 class="sub-title">🔒 Sensitive Personal Information</h3>
            <p class="privacy-note">Protected by local data masking. Click reveal to view full details.</p>

            <SensitiveField label="Email Address" value={profile.email} type="email" />
            <SensitiveField label="Phone Number" value={profile.phone} type="phone" />
            <SensitiveField label="Date of Birth" value={profile.birthday} type="text" />
        </div>
    {/if}
</div>

<style lang="scss">
    .profile-page {
        max-width: 800px;
        margin: 0 auto;
    }

    .profile-card-container {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 2rem;
        backdrop-filter: blur(16px);
    }

    .profile-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #e1306c;
        box-shadow: 0 4px 20px rgba(225, 48, 108, 0.4);
    }

    .avatar-placeholder {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: 800;
        color: #ffffff;
    }

    .header-info {
        display: flex;
        flex-direction: column;
    }

    .profile-name {
        color: #ffffff;
        font-size: 1.8rem;
        margin: 0;
    }

    .profile-username {
        color: #e1306c;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.4rem;
    }

    .account-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #cbd5e1;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        font-size: 0.78rem;
        width: fit-content;
    }

    .bio-section {
        background: rgba(13, 14, 18, 0.6);
        border-radius: 12px;
        padding: 1rem 1.2rem;
        margin-bottom: 1.5rem;
    }

    .section-title {
        font-size: 0.72rem;
        font-weight: 800;
        color: #94a3b8;
        letter-spacing: 0.08em;
        margin-bottom: 0.4rem;
    }

    .bio-text {
        color: #ffffff;
        font-size: 0.95rem;
        line-height: 1.5;
        white-space: pre-line;
        margin: 0;
    }

    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .grid-item {
        background: rgba(13, 14, 18, 0.5);
        border-radius: 12px;
        padding: 0.9rem;
        display: flex;
        flex-direction: column;

        .item-label {
            font-size: 0.75rem;
            color: #94a3b8;
            text-transform: uppercase;
        }

        .item-value {
            font-size: 1.05rem;
            font-weight: 700;
            color: #ffffff;
            margin-top: 0.2rem;
        }
    }

    .sub-title {
        color: #ffffff;
        font-size: 1.2rem;
        margin-bottom: 0.3rem;
    }

    .privacy-note {
        color: #94a3b8;
        font-size: 0.85rem;
        margin-bottom: 1.2rem;
    }
</style>
