<script>
    import { blur } from 'svelte/transition';
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import generateDemoData from '../app/demo';
    import Chart from 'svelte-frappe-charts';
    import Modal from '../components/Modal.svelte';
    import { getContext, onMount, onDestroy } from 'svelte';
    import SvelteTooltip from 'svelte-tooltip';
    import { toast } from '@zerodevx/svelte-toast';
    import { navigate } from 'svelte-routing';

    import ProfileCard from '../components/ProfileCard.svelte';
    import Card from '../components/Card.svelte';
    import FunFact from '../components/FunFact.svelte';
    import EmptyState from '../components/EmptyState.svelte';

    let timeout;

    onMount(() => {
        if (window.location.href.includes('/demo')) {
            const demoData = generateDemoData();
            data.set(demoData);
        } else if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) {
                setDemoMode();
            }
        }

        toast.push('Classic Overview loaded!', {
            theme: {
                '--toastBackground': '#48BB78',
                '--toastProgressBackground': '#2F855A'
            }
        });
    });

    onDestroy(() => timeout && clearTimeout(timeout));

    const modalContext = getContext('simple-modal');
    const open = modalContext ? modalContext.open : null;

    const showModal = (message) => {
        if (open) open(Modal, { message });
    };

    const hoursLabels = new Array(24).fill(0).map((v, i) => i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i-12}pm`);

    // Reactive safe field bindings to prevent JS errors if fields are missing
    $: username = $data?.profile?.username || $data?.username || 'User';
    $: profilePic = $data?.profile?.profilePictureUrl || $data?.profilePicture || null;
    $: totalUserCount = $data?.totalUserCount || $data?.followers?.length || 0;
    $: totalMessageCount = $data?.totalMessageCount || $data?.messages?.totalMessages || 0;
    $: totalMessageCountReceived = $data?.totalMessageCountReceived || 0;
    $: totalVoiceMessagesMinutes = $data?.totalVoiceMessagesMinutes || 0;
    $: totalVoiceMessagesMinutesReceived = $data?.totalVoiceMessagesMinutesReceived || 0;

    $: totalLikedMessageCount = $data?.totalLikedMessageCount || 0;
    $: totalLikedPostsCount = $data?.totalLikedPostsCount || $data?.likes?.length || 0;
    $: totalCommentsCount = $data?.totalCommentsCount || $data?.comments?.length || 0;
    $: totalPhotoCountSent = $data?.totalPhotoCountSent || $data?.posts?.length || 0;
    $: totalPhotoCountReceived = $data?.totalPhotoCountReceived || 0;

    $: favoriteWords = ($data?.favoriteWords && $data.favoriteWords.length >= 2)
        ? $data.favoriteWords
        : [{ word: 'Instagram', count: 0 }, { word: 'Data', count: 0 }];

    $: hoursValues = ($data?.hoursValues && $data.hoursValues.length === 24)
        ? $data.hoursValues
        : new Array(24).fill(0);

    $: peakHourIndex = hoursValues.indexOf(Math.max(...hoursValues));
    $: favoriteHourLabel = hoursLabels[peakHourIndex >= 0 ? peakHourIndex : 0];

    $: topGroups = $data?.topGroups || [];
    $: topActiveGroups = $data?.topActiveGroups || [];

    $: messagesMonths = ($data?.messagesMonths && $data.messagesMonths.monthsLabels)
        ? $data.messagesMonths
        : { monthsLabels: ['Jan', 'Feb'], monthsValues: [0, 0] };

    $: peakMonthIndex = messagesMonths.monthsValues ? messagesMonths.monthsValues.indexOf(Math.max(...messagesMonths.monthsValues)) : 0;
    $: favoriteMonthLabel = messagesMonths.monthsLabels[peakMonthIndex >= 0 ? peakMonthIndex : 0] || 'N/A';

    $: followersLabels = ($data?.followersLabels && $data.followersLabels.length)
        ? $data.followersLabels
        : ['Initial', 'Current'];

    $: followersValues = ($data?.followersValues && $data.followersValues.length)
        ? $data.followersValues
        : [0, $data?.followers?.length || 0];

    $: totalStoryCountSent = $data?.totalStoryCountSent || $data?.stories?.length || 0;
    $: totalQuizAnsweredCount = $data?.totalQuizAnsweredCount || $data?.storyInteractions?.quizzes || 0;
    $: totalPollAnsweredCount = $data?.totalPollAnsweredCount || $data?.storyInteractions?.polls || 0;

    $: totalPhotoSize = $data?.totalPhotoSize || '0 MB';
    $: totalVoiceMessagesSize = $data?.totalVoiceMessagesSize || '0 MB';
    $: totalMediaSize = $data?.totalMediaSize || '0 MB';

    $: totalPasswordChangeCount = $data?.totalPasswordChangeCount || $data?.security?.passwordChanges || 0;
    $: totalLoginCount = $data?.totalLoginCount || $data?.security?.logins?.length || 0;
    $: totalLogoutCount = $data?.totalLogoutCount || 0;
</script>

<div class="statistics" transition:blur>
    {#if !$data}
        <EmptyState title="No Data Available" message="Please import an Instagram data package or enable Demo Mode." icon="⚡" />
    {:else}
        <div class="cards">
            <Card name="profile" title="About you">
                <ProfileCard
                    name={username}
                    profilePicture={profilePic}
                />
            </Card>

            <Card name="first" title="Social Interactions">
                <FunFact
                    svg="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    content="You talked to % distinct persons"
                    count="{totalUserCount}"
                    explanation="Well, you know a lot of people!"
                />
                <FunFact
                    svg="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    content="You sent % messages"
                    count="{totalMessageCount}"
                    explanation="and you received {totalMessageCountReceived.toLocaleString('en-US')} messages!"
                />
                <FunFact
                    svg="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    content="You recorded % min of voice messages"
                    explanation="and you received {totalVoiceMessagesMinutesReceived.toLocaleString('en-US')} min of voice messages!"
                    count="{totalVoiceMessagesMinutes}"
                />
            </Card>

            <Card name="second" title="Messages types">
                <FunFact
                    svg="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    content="You liked % messages"
                    count="{totalLikedMessageCount}"
                />
                <FunFact
                    svg="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    content="You liked % posts"
                    count="{totalLikedPostsCount}"
                />
                <FunFact
                    svg="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    content="You made % comments"
                    count="{totalCommentsCount}"
                />
                <FunFact svg="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    <h3 slot="content">Your favorite words are
                        <span class="text-discord"><SvelteTooltip tip="Used {favoriteWords[0].count.toLocaleString('en-US')} times" bottom color="#000000"><span class="text-discord">{favoriteWords[0].word}</span></SvelteTooltip></span> and
                        <span class="text-discord"><SvelteTooltip tip="Used {favoriteWords[1].count.toLocaleString('en-US')} times" bottom color="#000000">{favoriteWords[1].word}</SvelteTooltip></span>
                    </h3>
                </FunFact>
                <FunFact
                    content="You sent % photos"
                    explanation="and you received {totalPhotoCountReceived.toLocaleString('en-US')} photos!"
                    count="{totalPhotoCountSent}"
                >
                    <svg slot="icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </FunFact>
            </Card>

            <Card name="hours" title="Your Instagram Hours">
                <p>{favoriteHourLabel} is definitely your favorite hour to chat with your friends!</p>
                <Chart data={{
                    labels: hoursLabels,
                    datasets: [
                        {
                            name: 'messages',
                            values: hoursValues
                        }
                    ]
                }}
                axisOptions="{{
                    xAxisMode: 'tick'
                }}"
                type="bar" />
            </Card>

            <Card name="top-users" title="Top Users/Groups">
                {#if topGroups && topGroups.length > 0}
                    <p>Groups, sorted by the <b>received</b> messages count ⬇️</p>
                    <Chart data={{
                        labels: topGroups.map((group) => group.name),
                        datasets: [
                            {
                                name: 'messages',
                                values: topGroups.map((group) => group.messageCount)
                            }
                        ]
                    }} maxSlices={7} type="donut" />
                {/if}

                {#if topActiveGroups && topActiveGroups.length > 0}
                    <p>Groups, sorted by the <b>sent</b> messages count ⬆️</p>
                    <Chart data={{
                        labels: topActiveGroups.map((group) => group.name),
                        datasets: [
                            {
                                name: 'messages',
                                values: topActiveGroups.map((group) => group.sentMessageCount)
                            }
                        ]
                    }} maxSlices={7} type="donut" />
                {/if}
            </Card>

            <Card name="months" title="Your Instagram Moments">
                <p>You were the most active on Instagram on {favoriteMonthLabel}!</p>
                <Chart data={{
                    labels: messagesMonths.monthsLabels,
                    datasets: [
                        {
                            name: 'messages',
                            values: messagesMonths.monthsValues
                        }
                    ]
                }} axisOptions="{{
                    xAxisMode: 'tick'
                }}" 
                lineOptions="{{
                    dotSize: 4
                }}" type="line" />
            </Card>

            <Card name="followers" title="Your Instagram Followers">
                <p>{followersValues[followersValues.length-1] || 0} users are currently following you!</p>
                <Chart data={{
                    labels: followersLabels,
                    datasets: [
                        {
                            name: 'followers',
                            values: followersValues
                        }
                    ]
                }} axisOptions="{{
                    xAxisMode: 'tick',
                    xIsSeries: true
                }}"
                lineOptions="{{
                    dotSize: 4,
                    hideDots: true,
                    spline: true
                }}" type="line" />
            </Card>

            <Card name="activities" title="Story Activities">
                <FunFact
                    svg="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    content="You posted % stories"
                    count="{totalStoryCountSent}"
                />
                <FunFact
                    svg="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    content="You answered % quizzes"
                    count="{totalQuizAnsweredCount}"
                />
                <FunFact
                    svg="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    content="You answered % polls"
                    count="{totalPollAnsweredCount}"
                />
            </Card>

            <Card name="ecology" title="Ecology">
                <FunFact
                    svg="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    content="You sent % of photos"
                    count="{totalPhotoSize}"
                />
                <FunFact
                    svg="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    content="You sent % of voice messages"
                    count="{totalVoiceMessagesSize}"
                />
                <FunFact
                    svg="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    content="You posted % of stories/posts"
                    count="{totalMediaSize}"
                />
            </Card>

            <Card name="security" title="Security">
                <FunFact
                    svg="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    content="% password changes"
                    count="{totalPasswordChangeCount}"
                />
                <FunFact
                    svg="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    content="% logins"
                    count="{totalLoginCount}"
                />
                <FunFact
                    svg="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    content="% logouts"
                    count="{totalLogoutCount}"
                />
            </Card>
        </div>
    {/if}
</div>

<style>
    .statistics {
        margin-top: 0;
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
        color: white;
        padding: 0;
    }

    .cards {
        display: grid;
        grid-gap: 20px;
    }

    h3 {
        margin-left: 10px;
    }

    @media (min-width: 600px) {
        .cards {
            grid-template-columns: repeat(11, 1fr);
        }
        
        .cards :global(.card.activities) {
            grid-column: 1 / 6;
        }
        
        .cards :global(.card.security) {
            grid-column: 6 / 11;
        }
    }
</style>
