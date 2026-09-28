import { writable } from 'svelte/store';
import { generateFullDemoData } from './demoData';

const storedData = localStorage.getItem('instaddict_data') || localStorage.getItem('data') || null;
let dataValue = null;
try {
    dataValue = storedData ? JSON.parse(storedData) : null;
} catch (e) {
    console.warn('Could not parse stored data:', e);
}

export const loadTask = writable(null);
export const loadEstimatedTime = writable(null);
export const data = writable(dataValue);
export const privacyMasked = writable(true);
export const searchQuery = writable('');
export const currentTheme = writable(localStorage.getItem('instaddict_theme') || 'dark');

export const restoreFromLocalStorage = () => {
    if (dataValue) {
        data.set(dataValue);
        return true;
    }
    return false;
};

export const setDemoMode = () => {
    const demoData = generateFullDemoData();
    data.set(demoData);
    return demoData;
};

export const clearData = () => {
    data.set(null);
    localStorage.removeItem('instaddict_data');
    localStorage.removeItem('data');
};

data.subscribe((value) => {
    if (!value) {
        localStorage.removeItem('instaddict_data');
        localStorage.removeItem('data');
    } else if (!value.isDemo) {
        try {
            localStorage.setItem('instaddict_data', JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage payload too large, active session maintained in RAM.');
        }
    }
});

currentTheme.subscribe((theme) => {
    localStorage.setItem('instaddict_theme', theme);
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
    }
});
