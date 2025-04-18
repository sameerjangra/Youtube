// Convert large numbers to YouTube-like format (e.g., 1.3K, 2M)
export const formatViews = (views) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views.toString();
};

// Convert published date to "time ago" format (e.g., 2 days ago, 1 month ago)
export const formatTimeAgo = (publishedAt) => {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    const timeFormats = [
        { unit: "year", seconds: 31_536_000 },
        { unit: "month", seconds: 2_592_000 },
        { unit: "week", seconds: 604_800 },
        { unit: "day", seconds: 86_400 },
        { unit: "hour", seconds: 3_600 },
        { unit: "minute", seconds: 60 }
    ];

    for (const { unit, seconds } of timeFormats) {
        const count = Math.floor(diffInSeconds / seconds);
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
};
