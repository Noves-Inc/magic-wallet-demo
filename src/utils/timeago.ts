import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

const plural = (amount: number) => (amount > 1 ? 's' : '');

const checkDiff = (diff: number, amount: number) => {
  if (diff === amount) {
    return null;
  }
  const rest = diff % amount;
  if (rest === 0) {
    return null;
  }

  return rest;
};

export const timeago = (timestamp: number, noUtc?: boolean): string => {
  const date = dayjs(timestamp);

  const formatedDate = noUtc ? "" : date.utc().format('(MMM/D/YYYY HH:mm:ss A +UTC)');

  const minsDiff = dayjs(Date.now()).diff(date, 'minutes');
  const hoursDiff = dayjs(Date.now()).diff(date, 'hours');
  const daysDiff = dayjs(Date.now()).diff(date, 'days');
  const monthsDiff = dayjs(Date.now()).diff(date, 'months');
  const yearsDiff = dayjs(Date.now()).diff(date, 'years');

  const defaultDate = `${date.fromNow()} ${formatedDate}`;

  if (yearsDiff >= 1) {
    const rest = checkDiff(monthsDiff, 12);
    if (!rest) return defaultDate;

    return `${yearsDiff} year${plural(yearsDiff)} ${rest} month${plural(rest)} ago ${formatedDate}`;
  }

  if (monthsDiff >= 1) {
    const rest = checkDiff(daysDiff, 30);
    if (!rest) return defaultDate;

    return `${monthsDiff} month${plural(monthsDiff)} ${rest} day${plural(
      rest
    )} ago ${formatedDate}`;
  }

  if (daysDiff >= 1) {
    const rest = checkDiff(hoursDiff, 24);
    if (!rest) return defaultDate;

    return `${daysDiff} day${plural(daysDiff)} ${rest} hour${plural(rest)} ago ${formatedDate}`;
  }

  if (hoursDiff >= 1) {
    const rest = checkDiff(minsDiff, 60);
    if (!rest) return defaultDate;

    return `${hoursDiff} hour${plural(hoursDiff)} ${rest} min${plural(rest)} ago ${formatedDate}`;
  }

  return defaultDate;
};
