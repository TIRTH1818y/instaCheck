/**
 * Data Normalizer for Instagram Exports
 * Accepts raw file map { path: jsonStringOrParsedObject } and builds normalized InstagramData model.
 */

import { getMediaUrl } from './mediaExtractor';

export function normalizeInstagramData(rawFilesMap) {
    const getParsedJson = (filePathPattern) => {
        const matches = [];
        for (const [path, content] of Object.entries(rawFilesMap)) {
            if (typeof filePathPattern === 'string') {
                if (path === filePathPattern || path.endsWith(filePathPattern)) {
                    matches.push({ path, data: parseJsonSafely(content) });
                }
            } else if (filePathPattern instanceof RegExp) {
                if (filePathPattern.test(path)) {
                    matches.push({ path, data: parseJsonSafely(content) });
                }
            }
        }
        return matches;
    };

    // 1. PROFILE & PERSONAL INFO
    const profileInfo = extractProfileInfo(getParsedJson);

    // 2. FOLLOWERS (Merge followers_1.json, followers_2.json, etc.)
    const followers = extractFollowers(getParsedJson);

    // 3. FOLLOWING
    const following = extractFollowing(getParsedJson);

    // 4. CONNECTIONS ANALYSIS & SUB-LISTS
    const followerSet = new Set(followers.map((f) => f.username.toLowerCase()));
    const followingSet = new Set(following.map((f) => f.username.toLowerCase()));

    const mutuals = following.filter((f) => followerSet.has(f.username.toLowerCase()));
    const nonFollowers = following.filter((f) => !followerSet.has(f.username.toLowerCase()));
    const youDontFollowBack = followers.filter((f) => !followingSet.has(f.username.toLowerCase()));

    const closeFriends = extractUserList(getParsedJson, /close_friends/i, 'relationships_close_friends');
    const blockedAccounts = extractUserList(getParsedJson, /blocked_profiles|blocked/i, 'relationships_blocked_users');
    const pendingFollowRequests = extractUserList(getParsedJson, /pending_follow_requests/i, 'relationships_follow_requests_sent');
    const receivedFollowRequests = extractUserList(getParsedJson, /recent_follow_requests/i, 'relationships_follow_requests_received');
    const recentlyUnfollowed = extractUserList(getParsedJson, /recently_unfollowed_profiles/i, 'relationships_unfollowed_users');
    const mutedAccounts = extractUserList(getParsedJson, /muted_accounts|muted/i, 'relationships_muted_users');
    const restrictedAccounts = extractUserList(getParsedJson, /restricted_accounts|restricted/i, 'relationships_restricted_users');

    // 5. COMMENTS
    const comments = extractComments(getParsedJson);

    // 6. LIKES
    const likes = extractLikes(getParsedJson);

    // 7. SAVED CONTENT
    const saved = extractSaved(getParsedJson);

    // 8. POSTS
    const posts = extractPosts(getParsedJson);

    // 9. REELS
    const reels = extractReels(getParsedJson);

    // 10. STORIES & INTERACTIONS
    const storiesData = extractStories(getParsedJson);

    // 11. MESSAGES
    const messagesData = extractMessages(getParsedJson, profileInfo.username);

    // 12. SEARCH HISTORY
    const searches = extractSearches(getParsedJson);

    // 13. APPS & WEBSITES
    const apps = extractApps(getParsedJson);

    // 14. LOGIN & SECURITY
    const security = extractSecurity(getParsedJson);

    // 15. DEVICE INFORMATION
    const devices = extractDevices(getParsedJson);

    // 16. LOCATION INFORMATION
    const locations = extractLocations(getParsedJson);

    // 17. PREFERENCES
    const preferences = extractPreferences(getParsedJson);

    // 18. ADS INFORMATION
    const ads = extractAds(getParsedJson);

    // 19. SHOPPING
    const shopping = extractShopping(getParsedJson);

    // 20. MONETIZATION
    const monetization = extractMonetization(getParsedJson);

    // 21. MEDIA LIBRARY LISTING
    const mediaList = extractMediaLibrary(rawFilesMap);

    // 22. UNIFIED ACTIVITY TIMELINE
    const activityTimeline = buildActivityTimeline({
        likes,
        comments,
        followers,
        following,
        searches,
        posts,
        reels,
        stories: storiesData.stories,
        security: security.timeline,
        saved
    });

    // 23. DATA EXPLORER RAW TREE
    const rawTree = buildFileTree(rawFilesMap);

    // 24. LEGACY STATS PROPERTIES FOR CLASSIC OVERVIEW
    const hourCounts = new Array(24).fill(0);
    const monthCounts = new Map();

    messagesData.conversations.forEach((conv) => {
        conv.messages.forEach((msg) => {
            if (msg.timestamp) {
                const date = new Date(msg.timestamp);
                const h = date.getHours();
                if (!isNaN(h)) hourCounts[h] = (hourCounts[h] || 0) + 1;

                const mKey = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                monthCounts.set(mKey, (monthCounts.get(mKey) || 0) + 1);
            }
        });
    });

    const monthLabels = Array.from(monthCounts.keys());
    const monthValues = Array.from(monthCounts.values());

    const followersLabels = followers.map((f) => f.dateStr).slice(0, 20).reverse();
    const followersValues = followers.map((_, i) => i + 1).slice(0, 20).reverse();

    return {
        isDemo: false,
        profile: profileInfo,

        // Legacy top-level fields for Classic Stats view
        username: profileInfo.username,
        profilePicture: profileInfo.profilePictureUrl,
        favoriteWords: [
            { word: 'Instagram', count: likes.length },
            { word: 'Posts', count: posts.length }
        ],
        totalUserCount: followers.length || 0,
        totalMessageCount: messagesData.totalMessages || 0,
        totalVoiceMessagesMinutes: 0,
        totalLikedMessageCount: 0,
        totalPhotoCountSent: posts.length || 0,
        totalStoryCountSent: storiesData.stories.length || 0,
        totalPhotoCountReceived: 0,
        totalMessageCountReceived: 0,
        totalVoiceMessagesMinutesReceived: 0,
        totalPollAnsweredCount: storiesData.interactions.polls || 0,
        totalQuizAnsweredCount: storiesData.interactions.quizzes || 0,
        totalLikedPostsCount: likes.length || 0,
        totalCommentsCount: comments.length || 0,
        totalPasswordChangeCount: security.passwordChanges || 0,
        totalLoginCount: security.logins.length || 0,
        totalLogoutCount: 0,
        totalPhotoSize: `${posts.length * 2} MB`,
        totalVoiceMessagesSize: '0 B',
        totalMediaSize: `${mediaList.length * 3} MB`,
        hoursValues: hourCounts,
        messagesMonths: {
            monthsLabels: monthLabels.length ? monthLabels : ['Jan', 'Feb'],
            monthsValues: monthValues.length ? monthValues : [0, 0]
        },
        topGroups: messagesData.conversations.slice(0, 5).map((c) => ({ name: c.title, messageCount: c.messageCount })),
        topActiveGroups: messagesData.conversations.slice(0, 5).map((c) => ({ name: c.title, sentMessageCount: c.sentCount })),
        followersLabels: followersLabels.length ? followersLabels : ['2026'],
        followersValues: followersValues.length ? followersValues : [followers.length],

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
        stories: storiesData.stories,
        storyInteractions: storiesData.interactions,
        messages: messagesData,
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
        rawTree
    };
}

// HELPER FUNCTIONS

function parseJsonSafely(content) {
    if (typeof content === 'object' && content !== null) return content;
    if (typeof content !== 'string') return null;
    try {
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
}

function decodeText(text) {
    if (!text || typeof text !== 'string') return text || '';
    try {
        return decodeURIComponent(escape(text));
    } catch (e) {
        return text;
    }
}

function formatDate(tsMsOrSec) {
    if (!tsMsOrSec) return 'Unknown Date';
    const ts = tsMsOrSec > 1e11 ? tsMsOrSec : tsMsOrSec * 1000;
    const d = new Date(ts);
    return isNaN(d.getTime()) ? 'Unknown Date' : d.toLocaleString();
}

function extractProfileInfo(getParsedJson) {
    const matches = getParsedJson(/personal_information|account_information/i);
    let username = 'User';
    let name = '';
    let bio = '';
    let email = '';
    let phone = '';
    let birthday = '';
    let creationDate = '';
    let accountType = 'Personal';
    let professionalCategory = '';
    let profilePictureUrl = null;

    matches.forEach(({ data }) => {
        if (!data) return;

        if (data.profile_user) {
            const userObj = Array.isArray(data.profile_user) ? data.profile_user[0] : data.profile_user;
            if (userObj.string_map_data) {
                username = userObj.string_map_data.Username?.value || username;
                name = decodeText(userObj.string_map_data.Name?.value) || name;
                bio = decodeText(userObj.string_map_data.Bio?.value) || bio;
                email = userObj.string_map_data.Email?.value || email;
                phone = userObj.string_map_data['Phone Number']?.value || phone;
                birthday = userObj.string_map_data['Date of birth']?.value || birthday;
                accountType = userObj.string_map_data['Account Type']?.value || accountType;
                professionalCategory = userObj.string_map_data['Category']?.value || professionalCategory;
            }
        }

        if (data.profile_account_insights) {
            creationDate = formatDate(data.profile_account_insights[0]?.string_map_data?.['Date Joined']?.timestamp);
        }

        // Alternative keys
        if (data.username) username = data.username;
        if (data.email) email = data.email;
        if (data.phone_number) phone = data.phone_number;
        if (data.name) name = decodeText(data.name);
        if (data.biography) bio = decodeText(data.biography);
    });

    // Profile photo scan
    const photoMatches = getParsedJson(/profile_photos/i);
    photoMatches.forEach(({ data }) => {
        if (data && data.ig_profile_picture && data.ig_profile_picture[0]) {
            const uri = data.ig_profile_picture[0].uri;
            profilePictureUrl = getMediaUrl(uri);
        }
    });

    return {
        username,
        name: name || username,
        bio,
        email,
        phone,
        birthday,
        creationDate: creationDate || 'N/A',
        accountType,
        professionalCategory,
        profilePictureUrl
    };
}

function extractFollowers(getParsedJson) {
    const matches = getParsedJson(/followers(_\d+)?\.json$/i);
    const list = [];
    const seen = new Set();

    matches.forEach(({ data }) => {
        if (!data) return;

        let rawArr = [];
        if (Array.isArray(data)) rawArr = data;
        else if (data.relationships_followers) rawArr = data.relationships_followers;
        else if (data.followers) rawArr = data.followers;

        rawArr.forEach((item) => {
            let uName = '';
            let ts = 0;

            if (item.string_list_data && item.string_list_data[0]) {
                uName = item.string_list_data[0].value || item.title || '';
                ts = item.string_list_data[0].timestamp || 0;
            } else if (typeof item === 'string') {
                uName = item;
            } else if (item.value) {
                uName = item.value;
                ts = item.timestamp || 0;
            } else if (item.title) {
                uName = item.title;
            }

            if (uName && !seen.has(uName.toLowerCase())) {
                seen.add(uName.toLowerCase());
                list.push({
                    username: uName,
                    name: uName,
                    timestamp: ts,
                    dateStr: formatDate(ts),
                    profileUrl: `https://instagram.com/${uName}`
                });
            }
        });
    });

    return list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

function extractFollowing(getParsedJson) {
    const matches = getParsedJson(/following(_\d+)?\.json$/i);
    const list = [];
    const seen = new Set();

    matches.forEach(({ data }) => {
        if (!data) return;

        let rawArr = [];
        if (Array.isArray(data)) rawArr = data;
        else if (data.relationships_following) rawArr = data.relationships_following;

        rawArr.forEach((item) => {
            let uName = '';
            let ts = 0;

            if (item.string_list_data && item.string_list_data[0]) {
                uName = item.string_list_data[0].value || item.title || '';
                ts = item.string_list_data[0].timestamp || 0;
            } else if (item.title) {
                uName = item.title;
            } else if (typeof item === 'string') {
                uName = item;
            }

            if (uName && !seen.has(uName.toLowerCase())) {
                seen.add(uName.toLowerCase());
                list.push({
                    username: uName,
                    name: uName,
                    timestamp: ts,
                    dateStr: formatDate(ts),
                    profileUrl: `https://instagram.com/${uName}`
                });
            }
        });
    });

    return list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

function extractUserList(getParsedJson, regex, apiKey) {
    const matches = getParsedJson(regex);
    const list = [];
    const seen = new Set();

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (apiKey && data[apiKey]) arr = data[apiKey];
        else {
            const firstKey = Object.keys(data)[0];
            if (Array.isArray(data[firstKey])) arr = data[firstKey];
        }

        arr.forEach((item) => {
            let uName = '';
            let ts = 0;
            if (item.string_list_data && item.string_list_data[0]) {
                uName = item.string_list_data[0].value || item.title || '';
                ts = item.string_list_data[0].timestamp || 0;
            } else if (item.title) {
                uName = item.title;
            } else if (item.value) {
                uName = item.value;
            } else if (typeof item === 'string') {
                uName = item;
            }

            if (uName && !seen.has(uName.toLowerCase())) {
                seen.add(uName.toLowerCase());
                list.push({
                    username: uName,
                    timestamp: ts,
                    dateStr: formatDate(ts),
                    profileUrl: `https://instagram.com/${uName}`
                });
            }
        });
    });

    return list;
}

function extractComments(getParsedJson) {
    const matches = getParsedJson(/post_comments|comments(_\d+)?\.json$/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data.comments_media_comments) arr = data.comments_media_comments;

        arr.forEach((item) => {
            let commentText = '';
            let ts = 0;
            let owner = '';

            if (item.string_map_data) {
                commentText = decodeText(item.string_map_data.Comment?.value) || '';
                ts = item.string_map_data.Comment?.timestamp || 0;
                owner = item.string_map_data['Media Owner']?.value || '';
            } else if (item.comment) {
                commentText = decodeText(item.comment);
                ts = item.timestamp || 0;
            }

            if (commentText) {
                list.push({
                    text: commentText,
                    timestamp: ts,
                    dateStr: formatDate(ts),
                    owner: owner || 'Instagram Content'
                });
            }
        });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
}

function extractLikes(getParsedJson) {
    const matches = getParsedJson(/liked_posts|liked_comments|likes(_\d+)?\.json$/i);
    const list = [];

    matches.forEach(({ data, path }) => {
        if (!data) return;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data.likes_media_likes) arr = data.likes_media_likes;
        else if (data.likes_comment_likes) arr = data.likes_comment_likes;

        const isCommentLike = path.includes('comment');

        arr.forEach((item) => {
            let title = decodeText(item.title) || 'Liked Content';
            let ts = 0;
            let href = '';

            if (item.string_list_data && item.string_list_data[0]) {
                ts = item.string_list_data[0].timestamp || 0;
                href = item.string_list_data[0].href || '';
            }

            list.push({
                title,
                timestamp: ts,
                dateStr: formatDate(ts),
                type: isCommentLike ? 'Comment Like' : 'Post Like',
                href
            });
        });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
}

function extractSaved(getParsedJson) {
    const matches = getParsedJson(/saved/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data.saved_saved_media) arr = data.saved_saved_media;

        arr.forEach((item) => {
            let title = decodeText(item.title) || 'Saved Item';
            let ts = 0;
            let collectionName = 'General';

            if (item.string_map_data) {
                const map = item.string_map_data;
                ts = map['Saved on']?.timestamp || 0;
                collectionName = map['Collection Name']?.value || 'General';
            }

            list.push({
                title,
                collectionName,
                timestamp: ts,
                dateStr: formatDate(ts),
                mediaUrl: getMediaUrl(title)
            });
        });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
}

function extractPosts(getParsedJson) {
    const matches = getParsedJson(/your_posts|posts_\d+\.json$/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data || !Array.isArray(data)) return;

        data.forEach((post) => {
            let caption = decodeText(post.title) || '';
            let ts = post.creation_timestamp || 0;
            const mediaArr = post.media || [];

            const mediaFormatted = mediaArr.map((m) => ({
                uri: m.uri,
                url: getMediaUrl(m.uri),
                title: decodeText(m.title) || ''
            }));

            list.push({
                caption,
                timestamp: ts,
                dateStr: formatDate(ts),
                media: mediaFormatted,
                location: post.location || 'Unknown'
            });
        });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
}

function extractReels(getParsedJson) {
    const matches = getParsedJson(/reels/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = Array.isArray(data) ? data : data.ig_reels || [];

        arr.forEach((reel) => {
            let caption = decodeText(reel.title) || '';
            let ts = reel.creation_timestamp || 0;
            let uri = reel.media ? reel.media.uri : '';

            list.push({
                caption,
                timestamp: ts,
                dateStr: formatDate(ts),
                mediaUri: uri,
                url: getMediaUrl(uri)
            });
        });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
}

function extractStories(getParsedJson) {
    const storiesMatches = getParsedJson(/stories/i);
    const stories = [];

    storiesMatches.forEach(({ data }) => {
        if (!data) return;
        let arr = Array.isArray(data) ? data : data.ig_stories || [];

        arr.forEach((story) => {
            let ts = story.creation_timestamp || 0;
            let uri = story.uri || (story.media ? story.media.uri : '');

            stories.push({
                mediaUri: uri,
                url: getMediaUrl(uri),
                timestamp: ts,
                dateStr: formatDate(ts),
                type: 'Story'
            });
        });
    });

    // Story interactions (Polls, Quizzes, Questions)
    let polls = 0;
    let quizzes = 0;
    let questions = 0;
    let emojiSliders = 0;

    const pollsMatches = getParsedJson(/polls/i);
    pollsMatches.forEach(({ data }) => {
        polls += data?.story_activities_polls?.length || 0;
    });

    const quizMatches = getParsedJson(/quizzes/i);
    quizMatches.forEach(({ data }) => {
        quizzes += data?.story_activities_quizzes?.length || 0;
    });

    const questionMatches = getParsedJson(/questions/i);
    questionMatches.forEach(({ data }) => {
        questions += data?.story_activities_questions?.length || 0;
    });

    const sliderMatches = getParsedJson(/emoji_sliders/i);
    sliderMatches.forEach(({ data }) => {
        emojiSliders += data?.story_activities_emoji_sliders?.length || 0;
    });

    return {
        stories: stories.sort((a, b) => b.timestamp - a.timestamp),
        interactions: {
            polls,
            quizzes,
            questions,
            emojiSliders
        }
    };
}

function extractMessages(getParsedJson, accountUsername) {
    const matches = getParsedJson(/message_\d+\.json$/i);
    const conversationMap = new Map();

    matches.forEach(({ data, path }) => {
        if (!data || !data.participants || !data.messages) return;

        const parts = path.split('/');
        const convFolder = parts[parts.length - 2] || 'conv';
        const title = decodeText(data.title) || 'Conversation';
        const isGroup = data.participants.length > 2;

        if (!conversationMap.has(convFolder)) {
            conversationMap.set(convFolder, {
                id: convFolder,
                title,
                isGroup,
                participantCount: data.participants.length,
                participants: data.participants.map((p) => decodeText(p.name)),
                messageCount: 0,
                sentCount: 0,
                receivedCount: 0,
                messages: []
            });
        }

        const conv = conversationMap.get(convFolder);
        conv.messageCount += data.messages.length;

        data.messages.forEach((msg) => {
            const sender = decodeText(msg.sender_name);
            const content = decodeText(msg.content) || (msg.photos ? '[Photo]' : msg.audio_files ? '[Voice Note]' : '[Attachment]');
            const ts = msg.timestamp_ms || 0;
            const isSent = accountUsername ? sender === accountUsername : false;

            if (isSent) conv.sentCount++;
            else conv.receivedCount++;

            let mediaUrl = null;
            if (msg.photos && msg.photos[0]) {
                mediaUrl = getMediaUrl(msg.photos[0].uri);
            }

            conv.messages.push({
                sender,
                content,
                timestamp: ts,
                dateStr: formatDate(ts),
                isSent,
                mediaUrl
            });
        });
    });

    const conversations = Array.from(conversationMap.values()).map((c) => {
        c.messages.sort((a, b) => b.timestamp - a.timestamp);
        return c;
    }).sort((a, b) => b.messageCount - a.messageCount);

    const totalMessages = conversations.reduce((acc, c) => acc + c.messageCount, 0);

    return {
        conversations,
        totalConversations: conversations.length,
        totalMessages
    };
}

function extractSearches(getParsedJson) {
    const matches = getParsedJson(/searches|search/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = Array.isArray(data) ? data : data.searches_user || [];

        arr.forEach((item) => {
            let query = '';
            let ts = 0;

            if (item.string_map_data) {
                query = decodeText(item.string_map_data.Search?.value) || '';
                ts = item.string_map_data.Search?.timestamp || 0;
            } else if (item.search) {
                query = decodeText(item.search);
                ts = item.timestamp || 0;
            }

            if (query) {
                list.push({
                    query,
                    timestamp: ts,
                    dateStr: formatDate(ts)
                });
            }
        });
    });

    return list.sort((a, b) => b.timestamp - a.timestamp);
}

function extractApps(getParsedJson) {
    const matches = getParsedJson(/apps_and_websites/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = data.apps_and_websites_off_of_instagram || Array.isArray(data) ? data : [];

        arr.forEach((app) => {
            let name = decodeText(app.name || app.title) || 'Connected App';
            let ts = app.timestamp || 0;

            list.push({
                name,
                timestamp: ts,
                dateStr: formatDate(ts),
                status: 'Active'
            });
        });
    });

    return list;
}

function extractSecurity(getParsedJson) {
    const loginMatches = getParsedJson(/login_activity/i);
    const logins = [];

    loginMatches.forEach(({ data }) => {
        if (!data) return;
        let arr = data.account_history_login_history || [];
        arr.forEach((l) => {
            let ts = l.string_map_data?.Time?.timestamp || 0;
            let ip = l.string_map_data?.['IP Address']?.value || 'Protected';

            logins.push({
                type: 'Login',
                ip,
                timestamp: ts,
                dateStr: formatDate(ts)
            });
        });
    });

    const passMatches = getParsedJson(/password_change/i);
    let passwordChanges = 0;
    passMatches.forEach(({ data }) => {
        passwordChanges += data?.account_history_password_change_history?.length || 0;
    });

    return {
        logins: logins.sort((a, b) => b.timestamp - a.timestamp),
        passwordChanges,
        timeline: logins
    };
}

function extractDevices(getParsedJson) {
    const matches = getParsedJson(/device_information|devices/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = data.devices_devices || (Array.isArray(data) ? data : []);

        arr.forEach((dev) => {
            let userAgent = dev.string_map_data?.['User Agent']?.value || 'Mobile Device';
            let ts = dev.string_map_data?.['Last Login']?.timestamp || 0;

            list.push({
                userAgent,
                timestamp: ts,
                dateStr: formatDate(ts)
            });
        });
    });

    return list;
}

function extractLocations(getParsedJson) {
    const matches = getParsedJson(/last_known_location|location/i);
    const list = [];

    matches.forEach(({ data }) => {
        if (!data) return;
        let arr = data.account_history_location || (Array.isArray(data) ? data : []);

        arr.forEach((loc) => {
            let latitude = loc.string_map_data?.Latitude?.value || '';
            let longitude = loc.string_map_data?.Longitude?.value || '';
            let city = loc.string_map_data?.City?.value || 'Location Record';
            let ts = loc.string_map_data?.['Time']?.timestamp || 0;

            list.push({
                city,
                latitude,
                longitude,
                timestamp: ts,
                dateStr: formatDate(ts)
            });
        });
    });

    return list;
}

function extractPreferences(getParsedJson) {
    const matches = getParsedJson(/preferences/i);
    const prefs = {
        accountType: 'Public',
        allowTagging: 'Everyone',
        filteredKeywords: 'Enabled',
        dataSharing: 'Limited'
    };
    return prefs;
}

function extractAds(getParsedJson) {
    const matches = getParsedJson(/ads_information|advertisers|ad_preferences/i);
    const advertisers = [];
    const interests = [];

    matches.forEach(({ data }) => {
        if (!data) return;

        if (data.ig_custom_audiences) {
            data.ig_custom_audiences.forEach((item) => {
                advertisers.push(decodeText(item.advertiser_name));
            });
        }

        if (data.topics) {
            data.topics.forEach((t) => interests.push(decodeText(t.title)));
        }
    });

    return {
        advertisers: Array.from(new Set(advertisers)),
        interests: Array.from(new Set(interests)),
        totalAdvertisers: advertisers.length
    };
}

function extractShopping(getParsedJson) {
    const matches = getParsedJson(/shopping/i);
    return {
        hasData: matches.length > 0,
        items: []
    };
}

function extractMonetization(getParsedJson) {
    const matches = getParsedJson(/monetization|gifts/i);
    return {
        eligible: false,
        hasData: matches.length > 0
    };
}

function extractMediaLibrary(rawFilesMap) {
    const mediaFiles = [];
    for (const [path] of Object.entries(rawFilesMap)) {
        if (/\.(jpg|jpeg|png|webp|gif|mp4|webm|mov)$/i.test(path)) {
            const ext = path.split('.').pop().toLowerCase();
            const isVideo = ['mp4', 'webm', 'mov'].includes(ext);
            mediaFiles.push({
                filename: path.split('/').pop(),
                path,
                isVideo,
                url: getMediaUrl(path)
            });
        }
    }
    return mediaFiles;
}

function buildActivityTimeline(sources) {
    const timeline = [];

    sources.likes.forEach((item) => {
        timeline.push({
            type: 'Like',
            icon: '❤️',
            description: `Liked content: ${item.title}`,
            timestamp: item.timestamp,
            dateStr: item.dateStr
        });
    });

    sources.comments.forEach((item) => {
        timeline.push({
            type: 'Comment',
            icon: '💬',
            description: `Commented: "${item.text}"`,
            timestamp: item.timestamp,
            dateStr: item.dateStr
        });
    });

    sources.followers.forEach((item) => {
        if (item.timestamp) {
            timeline.push({
                type: 'Follower',
                icon: '👤',
                description: `New follower: @${item.username}`,
                timestamp: item.timestamp,
                dateStr: item.dateStr
            });
        }
    });

    sources.posts.forEach((item) => {
        if (item.timestamp) {
            timeline.push({
                type: 'Post',
                icon: '📸',
                description: `Published post: "${item.caption || 'Photo/Video'}"`,
                timestamp: item.timestamp,
                dateStr: item.dateStr
            });
        }
    });

    sources.searches.forEach((item) => {
        if (item.timestamp) {
            timeline.push({
                type: 'Search',
                icon: '🔍',
                description: `Searched for: "${item.query}"`,
                timestamp: item.timestamp,
                dateStr: item.dateStr
            });
        }
    });

    return timeline.sort((a, b) => b.timestamp - a.timestamp);
}

function buildFileTree(rawFilesMap) {
    const root = { name: 'Instagram Export', isFolder: true, children: [] };

    for (const [path, content] of Object.entries(rawFilesMap)) {
        const parts = path.split('/').filter(Boolean);
        let current = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            let existing = current.children.find((c) => c.name === part);

            if (!existing) {
                existing = {
                    name: part,
                    path,
                    isFolder: !isLast,
                    content: isLast ? content : null,
                    children: []
                };
                current.children.push(existing);
            }
            current = existing;
        });
    }

    return root;
}
