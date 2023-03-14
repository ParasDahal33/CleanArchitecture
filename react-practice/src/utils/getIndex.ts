
interface IGetIndex {
      currentPage: number,
      index: number,
}

function getIndex({ currentPage, index }: IGetIndex) {

      if (currentPage <= 1) return index+1;

      if (currentPage >= 2) return (10 * currentPage - 10) + index+1;
}

export default getIndex


