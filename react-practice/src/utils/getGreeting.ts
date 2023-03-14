/**
 * @function getGreeting
 *
 * @returns greeting message according to time
 */
function getGreeting(): string {
      const nowTime: number = new Date().getHours();

      // 5:00 a.m. to 12:00pm
      if (nowTime >= 5 && nowTime < 12) return "Morning";
      // 12:00 p.m. to 6:00 p.m
      else if (nowTime >= 12 && nowTime < 18) return "Afternoon";
      else return "Evening";
}

export default getGreeting;
