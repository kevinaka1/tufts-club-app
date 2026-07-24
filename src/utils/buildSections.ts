type WithStartDate = {
    startDate: Date;
};

export function buildSections<T extends WithStartDate>(events: T[]) {
    const sorted = [...events].sort(
        (a, b) => b.startDate.getTime() - a.startDate.getTime());

    const now = new Date();

    const isToday = (date: Date) =>
        date.toDateString() === now.toDateString();

    const isThisWeek = (date: Date) => {
        const week = new Date();
        week.setDate(now.getDate() + 7);
        return date > now && date <= week && !isToday(date);
    };

    return {
        todayEvents: sorted.filter(e => isToday(e.startDate)),
        thisWeekEvents: sorted.filter(e => isThisWeek(e.startDate)),
        laterEvents: sorted.filter(
            e => !isToday(e.startDate) && !isThisWeek(e.startDate)
        ),
    };
}