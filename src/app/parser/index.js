/**
 * Main Instagram Parser Entry Point
 * Handles ZIP archives (via fflate unzipSync / unzip), extracted folders, and individual JSON files.
 */

import { unzipSync } from 'fflate';
import { scanCategories } from './detectors';
import { registerMediaBlob, clearMediaBlobs } from './mediaExtractor';
import { normalizeInstagramData } from './normalizer';
import { loadTask } from '../store';

export async function processInstagramExport(input) {
    loadTask.set('Scanning Instagram export files...');
    clearMediaBlobs();

    const rawFilesMap = {};
    const filePaths = [];
    let jsonCount = 0;
    let mediaCount = 0;
    let totalRecordsCount = 0;
    let isHtmlFormat = false;

    // Case 1: Input is a File object representing a .ZIP package
    if (input instanceof File && input.name.endsWith('.zip')) {
        loadTask.set('Decompressing ZIP archive...');
        const arrayBuffer = await input.arrayBuffer();
        const unzipped = unzipSync(new Uint8Array(arrayBuffer));

        const entries = Object.entries(unzipped);
        const total = entries.length;

        for (let i = 0; i < total; i++) {
            const [path, bytes] = entries[i];
            const name = path.replace(/^\/+/, '');
            if (!name || name.endsWith('/')) continue; // skip directory entries

            filePaths.push(name);

            if (name === 'index.html' || name.endsWith('.html')) {
                isHtmlFormat = true;
            }

            if (/\.(jpg|jpeg|png|webp|gif|mp4|webm|mov|m4a|mp3)$/i.test(name)) {
                mediaCount++;
                const blob = new Blob([bytes]);
                registerMediaBlob(name, blob);
            } else if (/\.json$/i.test(name)) {
                jsonCount++;
                try {
                    const text = new TextDecoder('utf-8').decode(bytes);
                    rawFilesMap[name] = text;
                    totalRecordsCount += countRecordsInJson(text);
                } catch (e) {
                    console.warn('Could not decode JSON file:', name, e);
                }
            }

            if (i % 50 === 0) {
                loadTask.set(`Processing archive... ${Math.round((i / total) * 100)}%`);
            }
        }
    } 
    // Case 2: Input is an unzipped map object { [path]: Uint8Array }
    else if (typeof input === 'object' && input !== null && !(input instanceof File) && !Array.isArray(input) && !(input instanceof FileList)) {
        const entries = Object.entries(input);
        const total = entries.length;

        for (let i = 0; i < total; i++) {
            const [path, bytes] = entries[i];
            const name = path.replace(/^\/+/, '');
            if (!name || name.endsWith('/')) continue;

            filePaths.push(name);

            if (name === 'index.html' || name.endsWith('.html')) {
                isHtmlFormat = true;
            }

            if (/\.(jpg|jpeg|png|webp|gif|mp4|webm|mov|m4a|mp3)$/i.test(name)) {
                mediaCount++;
                const blob = bytes instanceof Blob ? bytes : new Blob([bytes]);
                registerMediaBlob(name, blob);
            } else if (/\.json$/i.test(name)) {
                jsonCount++;
                const text = typeof bytes === 'string' ? bytes : new TextDecoder('utf-8').decode(bytes);
                rawFilesMap[name] = text;
                totalRecordsCount += countRecordsInJson(text);
            }
        }
    } 
    // Case 3: Input is FileList or Array of HTML5 File objects (Extracted Folder / JSON Selection)
    else {
        const filesArray = Array.from(input);
        const total = filesArray.length;

        for (let i = 0; i < total; i++) {
            const file = filesArray[i];
            const name = (file.webkitRelativePath || file.name).replace(/^\/+/, '');
            filePaths.push(name);

            if (name === 'index.html' || name.endsWith('.html')) {
                isHtmlFormat = true;
            }

            if (/\.(jpg|jpeg|png|webp|gif|mp4|webm|mov|m4a|mp3)$/i.test(name)) {
                mediaCount++;
                registerMediaBlob(name, file);
            } else if (/\.json$/i.test(name)) {
                jsonCount++;
                const text = await readFileAsText(file);
                if (text) {
                    rawFilesMap[name] = text;
                    totalRecordsCount += countRecordsInJson(text);
                }
            }

            if (i % 20 === 0) {
                loadTask.set(`Processing directory... ${Math.round((i / total) * 100)}%`);
            }
        }
    }

    if (isHtmlFormat && jsonCount === 0) {
        loadTask.set(null);
        throw new Error('HTML format detected! Instagram exports must be requested in JSON format. Please re-request your data package on Instagram selecting "JSON".');
    }

    if (jsonCount === 0) {
        loadTask.set(null);
        throw new Error('No JSON files detected in the uploaded package. Please verify that you selected an official Instagram JSON data export.');
    }

    loadTask.set('Detecting Instagram categories...');
    const categoryScan = scanCategories(filePaths);

    loadTask.set('Normalizing Instagram data model...');
    const normalizedData = normalizeInstagramData(rawFilesMap);

    const importSummary = {
        totalFilesScanned: filePaths.length,
        jsonFilesCount: jsonCount,
        mediaFilesCount: mediaCount,
        recordsAnalyzedCount: totalRecordsCount,
        detectedCategories: categoryScan.detected,
        missingCategories: categoryScan.missing
    };

    normalizedData.importSummary = importSummary;

    loadTask.set(null);
    return {
        data: normalizedData,
        summary: importSummary
    };
}

function readFileAsText(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsText(file);
    });
}

function countRecordsInJson(text) {
    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed.length;
        if (typeof parsed === 'object' && parsed !== null) {
            let count = 0;
            Object.values(parsed).forEach((val) => {
                if (Array.isArray(val)) count += val.length;
                else if (typeof val === 'object' && val !== null) count += 1;
            });
            return count || 1;
        }
        return 1;
    } catch (e) {
        return 0;
    }
}
