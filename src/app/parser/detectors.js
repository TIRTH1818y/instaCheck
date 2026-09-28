/**
 * Instagram Export Category Detectors & File Mapper
 * Flexible scanner for any Instagram ZIP, directory, or array of JSON files.
 */

export const CATEGORY_DEFINITIONS = [
    {
        id: 'profile',
        name: 'Profile & Personal Information',
        patterns: [
            /personal_information/i,
            /account_information/i,
            /profile_changes/i,
            /signup_details/i
        ]
    },
    {
        id: 'connections',
        name: 'Connections (Followers & Following)',
        patterns: [
            /connections/i,
            /followers/i,
            /following/i,
            /close_friends/i,
            /blocked/i,
            /pending_follow_requests/i,
            /recent_follow_requests/i,
            /recently_unfollowed/i
        ]
    },
    {
        id: 'posts',
        name: 'Posts & Content',
        patterns: [
            /content\/posts/i,
            /your_instagram_activity\/content/i,
            /media\/posts/i,
            /posts_\d+\.json$/i
        ]
    },
    {
        id: 'reels',
        name: 'Reels',
        patterns: [
            /reels/i
        ]
    },
    {
        id: 'stories',
        name: 'Stories & Interactions',
        patterns: [
            /stories/i,
            /story_interactions/i,
            /polls/i,
            /quizzes/i,
            /questions/i,
            /emoji_sliders/i
        ]
    },
    {
        id: 'comments',
        name: 'Comments',
        patterns: [
            /comments/i,
            /post_comments/i
        ]
    },
    {
        id: 'likes',
        name: 'Likes',
        patterns: [
            /likes/i,
            /liked_posts/i,
            /liked_comments/i
        ]
    },
    {
        id: 'saved',
        name: 'Saved Content',
        patterns: [
            /saved/i,
            /saved_posts/i,
            /saved_collections/i
        ]
    },
    {
        id: 'messages',
        name: 'Messages & Conversations',
        patterns: [
            /messages/i,
            /inbox/i,
            /message_\d+\.json$/i
        ]
    },
    {
        id: 'searches',
        name: 'Search History',
        patterns: [
            /search/i,
            /searches/i
        ]
    },
    {
        id: 'security',
        name: 'Login & Security',
        patterns: [
            /security_and_login_information/i,
            /login_activity/i,
            /logout_activity/i,
            /password_change/i
        ]
    },
    {
        id: 'devices',
        name: 'Device Information',
        patterns: [
            /device_information/i,
            /devices/i,
            /camera_information/i
        ]
    },
    {
        id: 'locations',
        name: 'Location Information',
        patterns: [
            /location/i,
            /last_known_location/i
        ]
    },
    {
        id: 'preferences',
        name: 'Preferences & Settings',
        patterns: [
            /preferences/i,
            /account_preferences/i
        ]
    },
    {
        id: 'apps',
        name: 'Connected Apps & Websites',
        patterns: [
            /apps_and_websites/i
        ]
    },
    {
        id: 'ads',
        name: 'Ads & Advertisers',
        patterns: [
            /ads_information/i,
            /ad_preferences/i,
            /advertisers/i
        ]
    },
    {
        id: 'shopping',
        name: 'Shopping Activity',
        patterns: [
            /shopping/i
        ]
    },
    {
        id: 'monetization',
        name: 'Monetization & Gifts',
        patterns: [
            /monetization/i,
            /gifts/i
        ]
    }
];

export function scanCategories(filePaths) {
    const detectedMap = new Map();
    const missing = [];

    CATEGORY_DEFINITIONS.forEach((cat) => {
        const matches = filePaths.filter((path) =>
            cat.patterns.some((pattern) => pattern.test(path))
        );
        if (matches.length > 0) {
            detectedMap.set(cat.id, {
                id: cat.id,
                name: cat.name,
                matchCount: matches.length,
                files: matches
            });
        } else {
            missing.push({
                id: cat.id,
                name: cat.name
            });
        }
    });

    return {
        detected: Array.from(detectedMap.values()),
        missing
    };
}
