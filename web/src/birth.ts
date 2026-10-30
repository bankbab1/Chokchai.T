/** Birth date (17 Apr 1994). The age everywhere on the page is worked out from this, so it never needs editing. */
export const BIRTH = { year: 1994, month: 4, day: 17 };

export function ageToday(now = new Date()): number {
    let years = now.getFullYear() - BIRTH.year;
    const beforeBirthday = now.getMonth() + 1 < BIRTH.month || (now.getMonth() + 1 === BIRTH.month && now.getDate() < BIRTH.day);
    if (beforeBirthday) years--;
    return years;
}
