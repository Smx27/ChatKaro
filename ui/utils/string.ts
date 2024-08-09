export const StringExtension = {
    isEmptyOrNull: (s: string) => {
        return s === null || s.trim() === '';
    },
};