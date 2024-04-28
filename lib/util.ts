export const cls = (...classNames: string[]) => classNames.join(" ");

export function formatToTimeAgo(data: string) {
  const minuteInMs = 1000 * 60;
  const hourInMs = minuteInMs * 60;
  const dayInMs = hourInMs * 24;

  const time = new Date(data).getTime();
  const now = new Date().getTime();
  const diffMs = now - time;

  const formatter = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  // 일
  if (diffMs >= dayInMs) {
    const diffDays = Math.round(diffMs / dayInMs);
    return formatter.format(-diffDays, "day");
  }

  // 시간
  else if (diffMs >= hourInMs) {
    const diffHours = Math.round(diffMs / hourInMs);
    return formatter.format(-diffHours, "hour");
  }
  
  // 분
  else if (diffMs >= minuteInMs) {
    const diffMinutes = Math.round(diffMs / minuteInMs);
    return formatter.format(-diffMinutes, "minute");
  }

  // 초
  else {
    const diffSeconds = Math.round(diffMs / 1000);
    return formatter.format(-diffSeconds, "second");
  }
}