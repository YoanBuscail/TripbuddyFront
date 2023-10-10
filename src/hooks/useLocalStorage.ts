export const useLocalStorage = () => {
    const get = (key: string) => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn(`Error getting localStorage item ${key}:`, error);
            return null;
        }
    };

    const set = (key: string, value: any) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    return { get, set };
};