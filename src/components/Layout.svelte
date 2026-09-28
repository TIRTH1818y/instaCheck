<script>
    import Header from './Header.svelte';
    import Sidebar from './Sidebar.svelte';
    import MobileNav from './MobileNav.svelte';
    import { SvelteToast } from '@zerodevx/svelte-toast';

    const toastOptions = {
        duration: 8000
    };
</script>

<div class="app-layout">
    <SvelteToast options={toastOptions} />
    <Sidebar />
    <Header />

    <main class="main-content">
        <slot />
    </main>

    <MobileNav />
</div>

<style lang="scss">
    .app-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .main-content {
        margin-left: 260px;
        margin-top: 64px;
        padding: 2rem;
        min-height: calc(100vh - 64px);

        @media (max-width: 900px) {
            margin-left: 0;
            padding: 1.2rem;
            padding-bottom: 80px;
        }
    }
</style>
