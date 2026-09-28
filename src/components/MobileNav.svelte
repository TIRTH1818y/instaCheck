<script>
    import { link } from 'svelte-routing';

    const mobileItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/connections', label: 'Connections', icon: '👥' },
        { path: '/posts', label: 'Content', icon: '📸' },
        { path: '/activity', label: 'Activity', icon: '⏱️' },
        { path: '/data-explorer', label: 'Explorer', icon: '🗂️' }
    ];
</script>

<div class="mobile-bottom-nav">
    {#each mobileItems as item}
        <a href={item.path} use:link class="mobile-item">
            <span class="mobile-icon">{item.icon}</span>
            <span class="mobile-label">{item.label}</span>
        </a>
    {/each}
</div>

<style lang="scss">
    .mobile-bottom-nav {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: rgba(13, 14, 18, 0.95);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        z-index: 100;

        @media (max-width: 900px) {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }

    .mobile-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #94a3b8 !important;
        font-size: 0.72rem;
        font-weight: 600;

        &:hover {
            color: #e1306c !important;
        }
    }

    .mobile-icon {
        font-size: 1.2rem;
    }
</style>
