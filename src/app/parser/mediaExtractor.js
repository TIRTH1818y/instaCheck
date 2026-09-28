/**
 * Media Extractor & Object URL manager
 * Safely extracts blob references and creates Object URLs for images and videos.
 */

const mediaBlobMap = new Map();

export function registerMediaBlob(filename, blob) {
    if (!filename || !blob) return null;
    const cleanPath = filename.replace(/^\/+/, '');
    if (mediaBlobMap.has(cleanPath)) {
        return mediaBlobMap.get(cleanPath).url;
    }

    const mimeType = getMimeType(cleanPath);
    const typedBlob = blob.type ? blob : new Blob([blob], { type: mimeType });
    const url = URL.createObjectURL(typedBlob);

    mediaBlobMap.set(cleanPath, {
        url,
        size: blob.size || 0,
        type: mimeType
    });

    return url;
}

export function getMediaUrl(filename) {
    if (!filename) return null;
    const cleanPath = filename.replace(/^\/+/, '');
    const entry = mediaBlobMap.get(cleanPath);
    if (entry) return entry.url;
    
    // Fallback search by basename
    const baseName = cleanPath.split('/').pop();
    for (const [key, value] of mediaBlobMap.entries()) {
        if (key.endsWith(baseName)) {
            return value.url;
        }
    }
    return null;
}

export function clearMediaBlobs() {
    for (const entry of mediaBlobMap.values()) {
        if (entry.url && entry.url.startsWith('blob:')) {
            try {
                URL.revokeObjectURL(entry.url);
            } catch (e) {
                // Ignore
            }
        }
    }
    mediaBlobMap.clear();
}

function getMimeType(filepath) {
    const ext = filepath.split('.').pop().toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        case 'gif':
            return 'image/gif';
        case 'mp4':
            return 'video/mp4';
        case 'webm':
            return 'video/webm';
        case 'mov':
            return 'video/quicktime';
        case 'm4a':
        case 'mp3':
            return 'audio/mpeg';
        default:
            return 'application/octet-stream';
    }
}
