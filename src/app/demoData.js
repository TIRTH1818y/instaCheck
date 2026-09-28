/**
 * Comprehensive Mock Demo Data Generator
 * Provides realistic data across all 35 categories for interactive demo mode.
 */

export function generateFullDemoData() {
    const demoUsernames = [
        'alex_creative', 'sarah_design', 'tech_insider', 'nature_vibes',
        'urban_photographer', 'coffee_lover', 'dev_master', 'travel_junkie',
        'fit_life_2026', 'music_beats', 'pixel_artist', 'startup_founder',
        'foodie_express', 'cinema_buff', 'game_streamer', 'fashion_forward'
    ];

    const generateTimestamp = (daysAgo) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.getTime();
    };

    const formatDateStr = (ts) => new Date(ts).toLocaleString();

    // Followers & Following
    const followers = demoUsernames.map((u, i) => ({
        username: u,
        name: u.replace('_', ' ').toUpperCase(),
        timestamp: generateTimestamp(i * 3 + 1),
        dateStr: formatDateStr(generateTimestamp(i * 3 + 1)),
        profileUrl: `https://instagram.com/${u}`
    }));

    const following = [
        ...followers.slice(0, 10),
        { username: 'national_geographic', name: 'National Geographic', timestamp: generateTimestamp(30), dateStr: formatDateStr(generateTimestamp(30)), profileUrl: 'https://instagram.com/national_geographic' },
        { username: 'techcrunch', name: 'TechCrunch', timestamp: generateTimestamp(45), dateStr: formatDateStr(generateTimestamp(45)), profileUrl: 'https://instagram.com/techcrunch' },
        { username: 'design_daily', name: 'Design Daily', timestamp: generateTimestamp(60), dateStr: formatDateStr(generateTimestamp(60)), profileUrl: 'https://instagram.com/design_daily' },
        { username: 'creators', name: 'Instagram Creators', timestamp: generateTimestamp(90), dateStr: formatDateStr(generateTimestamp(90)), profileUrl: 'https://instagram.com/creators' }
    ];

    const followerSet = new Set(followers.map(f => f.username));
    const followingSet = new Set(following.map(f => f.username));

    const mutuals = following.filter(f => followerSet.has(f.username));
    const nonFollowers = following.filter(f => !followerSet.has(f.username));
    const youDontFollowBack = followers.filter(f => !followingSet.has(f.username));

    const closeFriends = followers.slice(0, 5);
    const blockedAccounts = [
        { username: 'spam_account_99', timestamp: generateTimestamp(120), dateStr: formatDateStr(generateTimestamp(120)), profileUrl: 'https://instagram.com/spam_account_99' },
        { username: 'bot_tracker_007', timestamp: generateTimestamp(180), dateStr: formatDateStr(generateTimestamp(180)), profileUrl: 'https://instagram.com/bot_tracker_007' }
    ];
    const pendingFollowRequests = [
        { username: 'private_celebrity', timestamp: generateTimestamp(5), dateStr: formatDateStr(generateTimestamp(5)), profileUrl: 'https://instagram.com/private_celebrity' }
    ];
    const receivedFollowRequests = [
        { username: 'aspiring_photog', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)), profileUrl: 'https://instagram.com/aspiring_photog' }
    ];
    const recentlyUnfollowed = [
        { username: 'old_friend_2020', timestamp: generateTimestamp(7), dateStr: formatDateStr(generateTimestamp(7)), profileUrl: 'https://instagram.com/old_friend_2020' }
    ];
    const mutedAccounts = followers.slice(10, 12);
    const restrictedAccounts = followers.slice(12, 13);

    // Comments
    const comments = [
        { text: 'Awesome shot! Love the colors ✨', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)), owner: 'sarah_design' },
        { text: 'Where was this taken? Looks incredible!', timestamp: generateTimestamp(3), dateStr: formatDateStr(generateTimestamp(3)), owner: 'nature_vibes' },
        { text: 'Super clean UI breakdown 🚀', timestamp: generateTimestamp(5), dateStr: formatDateStr(generateTimestamp(5)), owner: 'dev_master' },
        { text: 'Totally agree with this approach 🔥', timestamp: generateTimestamp(10), dateStr: formatDateStr(generateTimestamp(10)), owner: 'startup_founder' },
        { text: 'Great recipe! Tried it this morning ☕', timestamp: generateTimestamp(14), dateStr: formatDateStr(generateTimestamp(14)), owner: 'coffee_lover' }
    ];

    // Likes
    const likes = [
        { title: 'sarah_design post', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)), type: 'Post Like', href: 'https://instagram.com/p/demo1' },
        { title: 'tech_insider reel', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)), type: 'Reel Like', href: 'https://instagram.com/reel/demo2' },
        { title: 'dev_master comment', timestamp: generateTimestamp(4), dateStr: formatDateStr(generateTimestamp(4)), type: 'Comment Like', href: 'https://instagram.com/p/demo3' },
        { title: 'nature_vibes photo', timestamp: generateTimestamp(6), dateStr: formatDateStr(generateTimestamp(6)), type: 'Post Like', href: 'https://instagram.com/p/demo4' },
        { title: 'pixel_artist artwork', timestamp: generateTimestamp(8), dateStr: formatDateStr(generateTimestamp(8)), type: 'Post Like', href: 'https://instagram.com/p/demo5' }
    ];

    // Saved Content
    const saved = [
        { title: 'UI Design Inspiration System', collectionName: 'Design Systems', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)) },
        { title: 'Top 10 Svelte Tricks for 2026', collectionName: 'Tech & Code', timestamp: generateTimestamp(12), dateStr: formatDateStr(generateTimestamp(12)) },
        { title: 'Minimalist Architecture in Tokyo', collectionName: 'Architecture', timestamp: generateTimestamp(20), dateStr: formatDateStr(generateTimestamp(20)) }
    ];

    // Posts
    const posts = [
        {
            caption: 'Building the next generation Instagram Analytics dashboard with Svelte! 🚀 #coding #developer #webdev',
            timestamp: generateTimestamp(2),
            dateStr: formatDateStr(generateTimestamp(2)),
            location: 'San Francisco, CA',
            media: [{ uri: 'media/posts/post_1.jpg', title: 'Dashboard Mockup' }]
        },
        {
            caption: 'Morning coffee & design iteration ☕ minimalist aesthetics all the way.',
            timestamp: generateTimestamp(15),
            dateStr: formatDateStr(generateTimestamp(15)),
            location: 'Coffee Lab',
            media: [{ uri: 'media/posts/post_2.jpg', title: 'Coffee cup' }]
        }
    ];

    // Reels
    const reels = [
        {
            caption: 'Behind the scenes: 60-second tour of our new workspace! 🎬',
            timestamp: generateTimestamp(4),
            dateStr: formatDateStr(generateTimestamp(4)),
            mediaUri: 'media/reels/reel_1.mp4'
        }
    ];

    // Stories & Interactions
    const stories = [
        { mediaUri: 'media/stories/story_1.jpg', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)), type: 'Story' },
        { mediaUri: 'media/stories/story_2.jpg', timestamp: generateTimestamp(3), dateStr: formatDateStr(generateTimestamp(3)), type: 'Story' }
    ];

    // Conversations
    const conversations = [
        {
            id: 'sarah_design_chat',
            title: 'Sarah Jenkins',
            isGroup: false,
            participantCount: 2,
            participants: ['Demo User', 'Sarah Jenkins'],
            messageCount: 42,
            sentCount: 22,
            receivedCount: 20,
            messages: [
                { sender: 'Sarah Jenkins', content: 'Hey! Check out the new design system prototype.', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)), isSent: false },
                { sender: 'Demo User', content: 'Looks fantastic! Love the dark mode palette 🔥', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)), isSent: true }
            ]
        },
        {
            id: 'dev_team_group',
            title: 'Frontend Developers Crew',
            isGroup: true,
            participantCount: 5,
            participants: ['Demo User', 'Alex', 'Dev Master', 'Sarah', 'Sam'],
            messageCount: 154,
            sentCount: 60,
            receivedCount: 94,
            messages: [
                { sender: 'Dev Master', content: 'Did everyone test the local JSON parser build?', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)), isSent: false },
                { sender: 'Demo User', content: 'Yes, handles 50,000 records smoothly!', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)), isSent: true }
            ]
        }
    ];

    // Search History
    const searches = [
        { query: 'sveltejs framework', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)) },
        { query: 'sarah_design', timestamp: generateTimestamp(3), dateStr: formatDateStr(generateTimestamp(3)) },
        { query: 'modern dashboard design', timestamp: generateTimestamp(7), dateStr: formatDateStr(generateTimestamp(7)) },
        { query: 'instagram export format 2026', timestamp: generateTimestamp(14), dateStr: formatDateStr(generateTimestamp(14)) }
    ];

    // Activity Timeline
    const activityTimeline = [
        { type: 'Comment', icon: '💬', description: 'Commented on sarah_design post: "Awesome shot! Love the colors ✨"', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)) },
        { type: 'Like', icon: '❤️', description: 'Liked sarah_design post', timestamp: generateTimestamp(1), dateStr: formatDateStr(generateTimestamp(1)) },
        { type: 'Post', icon: '📸', description: 'Published post: "Building the next generation Instagram Analytics dashboard..."', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)) },
        { type: 'Follower', icon: '👤', description: 'New follower: @sarah_design', timestamp: generateTimestamp(4), dateStr: formatDateStr(generateTimestamp(4)) },
        { type: 'Search', icon: '🔍', description: 'Searched for: "modern dashboard design"', timestamp: generateTimestamp(7), dateStr: formatDateStr(generateTimestamp(7)) }
    ];

    // Apps & Security & Devices & Locations
    const apps = [
        { name: 'Canva Social Studio', timestamp: generateTimestamp(45), dateStr: formatDateStr(generateTimestamp(45)), status: 'Active' },
        { name: 'Spotify Music Integration', timestamp: generateTimestamp(120), dateStr: formatDateStr(generateTimestamp(120)), status: 'Active' }
    ];

    const security = {
        logins: [
            { type: 'Login', ip: '192.168.1.42 (San Francisco, CA)', timestamp: generateTimestamp(0), dateStr: formatDateStr(generateTimestamp(0)) },
            { type: 'Login', ip: '10.0.0.12 (New York, NY)', timestamp: generateTimestamp(5), dateStr: formatDateStr(generateTimestamp(5)) }
        ],
        passwordChanges: 2,
        timeline: [
            { type: 'Login', ip: '192.168.1.42 (San Francisco, CA)', timestamp: generateTimestamp(0), dateStr: formatDateStr(generateTimestamp(0)) }
        ]
    };

    const devices = [
        { userAgent: 'iPhone 15 Pro Max / iOS 18.1 (Instagram App 342.0)', timestamp: generateTimestamp(0), dateStr: formatDateStr(generateTimestamp(0)) },
        { userAgent: 'MacBook Pro M3 Max / macOS Sonoma (Chrome 128.0)', timestamp: generateTimestamp(2), dateStr: formatDateStr(generateTimestamp(2)) }
    ];

    const locations = [
        { city: 'San Francisco, CA', latitude: '37.7749', longitude: '-122.4194', timestamp: generateTimestamp(0), dateStr: formatDateStr(generateTimestamp(0)) },
        { city: 'New York, NY', latitude: '40.7128', longitude: '-74.0060', timestamp: generateTimestamp(15), dateStr: formatDateStr(generateTimestamp(15)) }
    ];

    const preferences = {
        accountType: 'Private',
        allowTagging: 'People You Follow',
        filteredKeywords: 'Enabled (Strict)',
        dataSharing: 'Local Only'
    };

    const ads = {
        advertisers: ['Nike', 'Adobe Creative Cloud', 'Airbnb', 'Figma', 'Stripe', 'Linear'],
        interests: ['Web Development', 'UI/UX Design', 'Coffee & Barista', 'Artificial Intelligence', 'Photography'],
        totalAdvertisers: 6
    };

    const shopping = {
        hasData: true,
        items: [
            { name: 'Ergonomic Desk Chair', shop: 'Office Lab', date: formatDateStr(generateTimestamp(10)) },
            { name: 'Mechanical Keyboard RGB', shop: 'Keychron Official', date: formatDateStr(generateTimestamp(25)) }
        ]
    };

    const monetization = {
        eligible: true,
        hasData: true
    };

    const mediaList = [
        { filename: 'post_1.jpg', path: 'media/posts/post_1.jpg', isVideo: false, url: null },
        { filename: 'post_2.jpg', path: 'media/posts/post_2.jpg', isVideo: false, url: null },
        { filename: 'reel_1.mp4', path: 'media/reels/reel_1.mp4', isVideo: true, url: null }
    ];

    const rawTree = {
        name: 'Instagram Demo Export',
        isFolder: true,
        children: [
            {
                name: 'connections',
                isFolder: true,
                children: [
                    { name: 'followers_1.json', isFolder: false, content: JSON.stringify(followers, null, 2) },
                    { name: 'following.json', isFolder: false, content: JSON.stringify(following, null, 2) },
                    { name: 'close_friends.json', isFolder: false, content: JSON.stringify(closeFriends, null, 2) }
                ]
            },
            {
                name: 'personal_information',
                isFolder: true,
                children: [
                    { name: 'personal_information.json', isFolder: false, content: JSON.stringify({ username: 'demo_user', email: 'demo@example.com', phone: '+1 555-0199' }, null, 2) }
                ]
            },
            {
                name: 'your_instagram_activity',
                isFolder: true,
                children: [
                    { name: 'comments.json', isFolder: false, content: JSON.stringify(comments, null, 2) },
                    { name: 'likes.json', isFolder: false, content: JSON.stringify(likes, null, 2) }
                ]
            }
        ]
    };

    const importSummary = {
        totalFilesScanned: 64,
        jsonFilesCount: 42,
        mediaFilesCount: 22,
        recordsAnalyzedCount: 12480,
        detectedCategories: [
            { id: 'profile', name: 'Profile & Personal Information' },
            { id: 'connections', name: 'Connections (Followers & Following)' },
            { id: 'posts', name: 'Posts & Content' },
            { id: 'reels', name: 'Reels' },
            { id: 'stories', name: 'Stories & Interactions' },
            { id: 'comments', name: 'Comments' },
            { id: 'likes', name: 'Likes' },
            { id: 'saved', name: 'Saved Content' },
            { id: 'messages', name: 'Messages & Conversations' },
            { id: 'searches', name: 'Search History' },
            { id: 'security', name: 'Login & Security' },
            { id: 'devices', name: 'Device Information' },
            { id: 'locations', name: 'Location Information' },
            { id: 'preferences', name: 'Preferences & Settings' },
            { id: 'apps', name: 'Connected Apps & Websites' },
            { id: 'ads', name: 'Ads & Advertisers' }
        ],
        missingCategories: [
            { id: 'shopping', name: 'Shopping Activity' },
            { id: 'monetization', name: 'Monetization & Gifts' }
        ]
    };

    return {
        isDemo: true,
        profile: {
            username: 'demo_creator',
            name: 'Alex Rivera',
            bio: '✨ Digital Creator | Crafting web experiences & visual art 🚀\n📍 San Francisco, CA',
            email: 'alex.rivera.demo@gmail.com',
            phone: '+1 (555) 382-9104',
            birthday: '15 March 1998',
            creationDate: '12 October 2018',
            accountType: 'Creator Account',
            professionalCategory: 'Digital Creator & Developer',
            profilePictureUrl: null
        },
        followers,
        following,
        connections: {
            mutuals,
            nonFollowers,
            youDontFollowBack,
            closeFriends,
            blockedAccounts,
            pendingFollowRequests,
            receivedFollowRequests,
            recentlyUnfollowed,
            mutedAccounts,
            restrictedAccounts
        },
        comments,
        likes,
        saved,
        posts,
        reels,
        stories,
        storyInteractions: {
            polls: 18,
            quizzes: 12,
            questions: 8,
            emojiSliders: 24
        },
        messages: {
            conversations,
            totalConversations: conversations.length,
            totalMessages: 196
        },
        searches,
        activityTimeline,
        apps,
        security,
        devices,
        locations,
        preferences,
        ads,
        shopping,
        monetization,
        mediaList,
        rawTree,
        importSummary,

        // Backward compatibility properties for existing Stats.svelte view
        favoriteWords: [
            { word: 'Design', count: 124 },
            { word: 'Svelte', count: 98 },
            { word: 'Awesome', count: 87 }
        ],
        totalUserCount: followers.length,
        totalMessageCount: 196,
        totalVoiceMessagesMinutes: 14,
        totalLikedMessageCount: 88,
        totalPhotoCountSent: 42,
        totalStoryCountSent: stories.length,
        totalPhotoCountReceived: 65,
        totalMessageCountReceived: 114,
        totalVoiceMessagesMinutesReceived: 28,
        totalPollAnsweredCount: 18,
        totalQuizAnsweredCount: 12,
        totalLikedPostsCount: likes.length,
        totalCommentsCount: comments.length,
        totalPasswordChangeCount: 2,
        totalLoginCount: security.logins.length,
        totalLogoutCount: 3,
        totalPhotoSize: '14.2 MB',
        totalVoiceMessagesSize: '8.4 MB',
        totalMediaSize: '48.6 MB',
        hoursValues: [12, 5, 2, 1, 0, 0, 4, 15, 34, 56, 82, 94, 110, 88, 76, 92, 120, 145, 180, 210, 160, 120, 80, 45],
        messagesMonths: {
            monthsLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            monthsValues: [120, 180, 240, 310, 290, 420, 380, 510, 480]
        },
        topGroups: [
            { name: 'Frontend Crew', messageCount: 154 },
            { name: 'Sarah Jenkins', messageCount: 42 }
        ],
        topActiveGroups: [
            { name: 'Frontend Crew', sentMessageCount: 60 },
            { name: 'Sarah Jenkins', sentMessageCount: 22 }
        ],
        followersLabels: ['2023', '2024', '2025', '2026'],
        followersValues: [320, 680, 1050, 12480]
    };
}
