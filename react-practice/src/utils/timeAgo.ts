export const timeAgo = (dateString: string): string => {
      const date = new Date(dateString);
      const nowDate = new Date()
      const seconds = Math.floor((+nowDate - +date) / 1000);

      const intervals: { label: string; seconds: number }[] = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
      ];

      for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count >= 1) {
                  return count + " " + interval.label + (count === 1 ? "" : "s") + " ago";
            }
      }

      return "a few seconds ago";
}