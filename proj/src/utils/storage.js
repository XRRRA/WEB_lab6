export function loadAppData() {
    try {
        const raw = localStorage.getItem("f1_app_data");
        if (!raw) return null;

        const data = JSON.parse(raw);
        return data;
    } catch (error) {
        console.error("Failed to parse localStorage f1_app_data:", error);
        return null;
    }
}

export function saveAppData(data) {
    try {
        localStorage.setItem("f1_app_data", JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
}

export function getInitialTheme() {
    try {
        const saved = loadAppData();
        if (saved?.theme) return saved.theme;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    } catch (error) {
        return 'light';
    }
}