<script>
    import { Router, Route } from 'svelte-routing';
    import Layout from './components/Layout.svelte';

    import ImportView from './views/Import.svelte';
    import DashboardView from './views/Dashboard.svelte';
    import ProfileView from './views/Profile.svelte';
    import ConnectionsView from './views/Connections.svelte';
    import FollowersView from './views/FollowersView.svelte';
    import FollowingView from './views/FollowingView.svelte';
    import CommentsView from './views/Comments.svelte';
    import LikesView from './views/Likes.svelte';
    import SavedView from './views/Saved.svelte';
    import PostsView from './views/Posts.svelte';
    import ReelsView from './views/Reels.svelte';
    import StoriesView from './views/Stories.svelte';
    import MediaLibraryView from './views/MediaLibrary.svelte';
    import MessagesView from './views/Messages.svelte';
    import SearchHistoryView from './views/SearchHistory.svelte';
    import ActivityCenterView from './views/ActivityCenter.svelte';
    import AppsWebsitesView from './views/AppsWebsites.svelte';
    import SecurityView from './views/Security.svelte';
    import DevicesView from './views/Devices.svelte';
    import LocationsView from './views/Locations.svelte';
    import PreferencesView from './views/Preferences.svelte';
    import AdsInformationView from './views/AdsInformation.svelte';
    import ShoppingView from './views/Shopping.svelte';
    import MonetizationView from './views/Monetization.svelte';
    import PrivacyCenterView from './views/PrivacyCenter.svelte';
    import DataExplorerView from './views/DataExplorer.svelte';
    import ReportsView from './views/Reports.svelte';
    import SettingsView from './views/Settings.svelte';
    import StatsView from './views/Stats.svelte';
    import ExportGuideView from './views/ExportGuideView.svelte';
</script>

<svelte:head>
    <title>Instagram Data Analyzer | Instaddict</title>
</svelte:head>

<Router>
    <Layout>
        <Route path="/" component={ImportView} />
        <Route path="/import" component={ImportView} />
        <Route path="/dashboard" component={DashboardView} />
        <Route path="/profile" component={ProfileView} />
        <Route path="/connections" component={ConnectionsView} />
        <Route path="/followers" component={FollowersView} />
        <Route path="/following" component={FollowingView} />
        <Route path="/comments" component={CommentsView} />
        <Route path="/likes" component={LikesView} />
        <Route path="/saved" component={SavedView} />
        <Route path="/posts" component={PostsView} />
        <Route path="/reels" component={ReelsView} />
        <Route path="/stories" component={StoriesView} />
        <Route path="/media" component={MediaLibraryView} />
        <Route path="/messages" component={MessagesView} />
        <Route path="/search-history" component={SearchHistoryView} />
        <Route path="/activity" component={ActivityCenterView} />
        <Route path="/apps-websites" component={AppsWebsitesView} />
        <Route path="/security" component={SecurityView} />
        <Route path="/devices" component={DevicesView} />
        <Route path="/locations" component={LocationsView} />
        <Route path="/preferences" component={PreferencesView} />
        <Route path="/ads" component={AdsInformationView} />
        <Route path="/shopping" component={ShoppingView} />
        <Route path="/monetization" component={MonetizationView} />
        <Route path="/privacy" component={PrivacyCenterView} />
        <Route path="/data-explorer" component={DataExplorerView} />
        <Route path="/reports" component={ReportsView} />
        <Route path="/settings" component={SettingsView} />
        <Route path="/stats" component={StatsView} />
        <Route path="/stats/demo" component={StatsView} />
        <Route path="/export-guide" component={ExportGuideView} />
    </Layout>
</Router>
