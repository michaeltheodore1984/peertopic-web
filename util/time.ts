export function formatDateStampUTC(ts: number): string {
    const date = new Date(ts);

    const year = date.getUTCFullYear();
    const monthIndex = date.getUTCMonth(); // 0-11
    const day = date.getUTCDate();
    const dayIndex = date.getUTCDay();    // 0-6, Sun = 0

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthName = months[monthIndex];
    const weekdayName = weekdays[dayIndex];

    return `${weekdayName}, ${monthName} ${day} ${year}`;
}

export function formatTimestampUTC(ts: number) {
    const date = new Date(ts);
    const h = date.getUTCHours();
    const m = String(date.getUTCMinutes()).padStart(2, "0");
    const a = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return `${h12}:${m} ${a}`;
}