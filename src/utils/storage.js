// Key under which we store everything in localStorage
const STORAGE_KEY = 'f1_app_data';

export function loadAppData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to parse localStorage data:', error);
        return null;
    }
}

export function saveAppData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
    }
}

export function getInitialTheme() {
    try {
        const saved = loadAppData();
        if (saved?.theme) {
            return saved.theme;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    } catch (error) {
        return 'light';
    }
}
