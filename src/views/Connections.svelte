<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import DataTable from '../components/DataTable.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    let activeTab = 'mutuals'; // 'followers' | 'following' | 'mutuals' | 'nonFollowers' | 'dontFollowBack' | 'closeFriends' | 'blocked' | 'pending' | 'unfollowed'

    $: followers = $data?.followers || [];
    $: following = $data?.following || [];
    $: mutuals = $data?.connections?.mutuals || [];
    $: nonFollowers = $data?.connections?.nonFollowers || [];
    $: dontFollowBack = $data?.connections?.youDontFollowBack || [];
    $: closeFriends = $data?.connections?.closeFriends || [];
    $: blocked = $data?.connections?.blockedAccounts || [];
    $: pending = $data?.connections?.pendingFollowRequests || [];
    $: unfollowed = $data?.connections?.recentlyUnfollowed || [];

    $: activeList = 
        activeTab === 'followers' ? followers :
        activeTab === 'following' ? following :
        activeTab === 'mutuals' ? mutuals :
        activeTab === 'nonFollowers' ? nonFollowers :
        activeTab === 'dontFollowBack' ? dontFollowBack :
        activeTab === 'closeFriends' ? closeFriends :
        activeTab === 'blocked' ? blocked :
        activeTab === 'pending' ? pending : unfollowed;

    $: activeTitle = 
        activeTab === 'followers' ? 'All Followers' :
        activeTab === 'following' ? 'All Following' :
        activeTab === 'mutuals' ? 'Mutual Connections' :
        activeTab === 'nonFollowers' ? 'People Not Following You Back' :
        activeTab === 'dontFollowBack' ? "People You Don't Follow Back" :
        activeTab === 'closeFriends' ? 'Close Friends' :
        activeTab === 'blocked' ? 'Blocked Accounts' :
        activeTab === 'pending' ? 'Pending Follow Requests' : 'Recently Unfollowed';

    const columns = [
        { key: 'username', label: 'Username' },
        { key: 'dateStr', label: 'Date Added' },
        { key: 'profileUrl', label: 'Instagram Link', type: 'link', labelKey: 'username' }
    ];
</script>

<div class="connections-page">
    <div class="page-header">
        <h1 class="page-title">Connections Manager</h1>
        <p class="page-desc">Analyze followers, following, mutuals, non-followers, and requests in one unified view.</p>
    </div>

    <!-- TABS NAVIGATION -->
    <div class="tabs-container">
        <button class="tab-btn" class:active={activeTab === 'mutuals'} on:click={() => (activeTab = 'mutuals')}>
            🤝 Mutuals ({mutuals.length})
        </button>
        <button class="tab-btn warning" class:active={activeTab === 'nonFollowers'} on:click={() => (activeTab = 'nonFollowers')}>
            🚫 Don't Follow Back ({nonFollowers.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'dontFollowBack'} on:click={() => (activeTab = 'dontFollowBack')}>
            ↩️ You Don't Follow Back ({dontFollowBack.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'followers'} on:click={() => (activeTab = 'followers')}>
            📥 Followers ({followers.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'following'} on:click={() => (activeTab = 'following')}>
            📤 Following ({following.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'closeFriends'} on:click={() => (activeTab = 'closeFriends')}>
            ⭐ Close Friends ({closeFriends.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'blocked'} on:click={() => (activeTab = 'blocked')}>
            🛑 Blocked ({blocked.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'pending'} on:click={() => (activeTab = 'pending')}>
            ⏳ Pending Requests ({pending.length})
        </button>
        <button class="tab-btn" class:active={activeTab === 'unfollowed'} on:click={() => (activeTab = 'unfollowed')}>
            💔 Recently Unfollowed ({unfollowed.length})
        </button>
    </div>

    <!-- DATA TABLE -->
    <DataTable items={activeList} {columns} title={activeTitle} searchPlaceholder="Filter connections..." />
</div>

<style lang="scss">
    .connections-page {
        max-width: 1200px;
        margin: 0 auto;
    }

    .page-header {
        margin-bottom: 1.5rem;
    }

    .page-title {
        font-size: 2rem;
        color: #ffffff;
        margin-bottom: 0.3rem;
    }

    .page-desc {
        color: #94a3b8;
        font-size: 0.95rem;
    }

    .tabs-container {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }

    .tab-btn {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #cbd5e1;
        padding: 0.55rem 1rem;
        border-radius: 10px;
        font-size: 0.85rem;
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
            box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
        }

        &.warning.active {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
    }
</style>
