function changeDateFormat(date: string): string {
      return new Date(date.toString()).toDateString();
}

// since we needs date but in string
//so here date is not converted to type Date
//returns YYYY-MM-DD
export function changeDateFormatYMD(date: string): string {
      if (date === '') return '';

      return new Date(date).toISOString().split('T')[0].split('T')[0];
}


export default changeDateFormat;
