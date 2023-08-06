import { ReactElement } from "react";
import { IBrandResponseModel, IBrandSearchData } from "../../../model/brandModel";
import brandApiRequest from "../../../hooks/brand/brandApiRequest";
import { useURLQuery } from "../../../hooks/common/useURLQuery";
import { SortingTH, Table, TableBody, TableHead } from "../../../components/table/Table";
import { ShowingDataType, Status } from "../../../helpers/constants";
import getIndex from "../../../utils/getIndex";
import { TableButtonGroup } from "../../../components/buttons/Buttons";
import NoDataMessage from "../../../components/NoDataMessage";
import NoSearchedDataMessage from "../../../components/error/NoSearchedDataMessage";
import Pagination from "../../../components/pagination/Pagination";
import WentWrongMessage from "../../../components/error/WentWrongMessage";
import Spinner from "../../../components/Spinner";


interface IBrandTable {
    openEditModal: (brand: IBrandResponseModel) => void;
}

export default function BrandTable({openEditModal}: IBrandTable): ReactElement{
    const{
        brandInfo: {brands, error, status, showingResultOf},
        deleteBrandHandler,
    } = brandApiRequest();

    const { currentPageNumber, changeURLQuery, changeURLPageNumber, clearURLQuery } =
            useURLQuery<IBrandSearchData>();

      const handlerSort = ({ target: { id } }: any) => {
            changeURLQuery({ sortBy: id });
      };


      return (
        <main>
              <Table>
                    <TableHead>
                          <tr>
                                <SortingTH isCentered handlerSort={handlerSort} name="index" title="#" />

                                <SortingTH
                                      className="text-start"
                                      handlerSort={handlerSort}
                                      name="name"
                                      title="BrandName"
                                />

                               
                          </tr>
                    </TableHead>

                    <TableBody isStatusSucceed={status === Status.Succeeded}>
                          {brands.items.map((brand: IBrandResponseModel, index: number) => {
                                //ToDo Avoid displaying one's own information.
                                return (
                                       (
                                            <tr key={brand.id}>
                                                  <th scope="row">
                                                        {getIndex({
                                                              currentPage: currentPageNumber,
                                                              index,
                                                        })}
                                                  </th>

                                                  <td className="text-start">{brand.name}</td>


                                                  <td>
                                                        <TableButtonGroup
                                                              onDeleteClick={() =>
                                                                    deleteBrandHandler(brand.id)
                                                              }
                                                              onEditClick={() => {
                                                                    openEditModal(brand);
                                                              }}
                                                        />
                                                  </td>
                                            </tr>
                                      )
                                );
                          })}
                    </TableBody>
              </Table>

              <NoDataMessage
                    message="User"
                    isStatusSucceed={status === Status.Succeeded}
                    haveData={showingResultOf === ShowingDataType.All && !brands.items.length}
              />

              <NoSearchedDataMessage
                    actionHandler={clearURLQuery}
                    isStatusSucceed={status === Status.Succeeded}
                    toShow={showingResultOf === ShowingDataType.Searched && !brands.items.length}
              />

              <Pagination
                    totalPages={brands.totalPages}
                    currentPage={currentPageNumber}
                    onPageChange={changeURLPageNumber}
                    onNextClick={() => changeURLPageNumber(currentPageNumber + 1)}
                    onPreviousClick={() => changeURLPageNumber(currentPageNumber - 1)}
                    isStatusSucceed={status === Status.Succeeded}
                    haveData={brands.items !== null && brands.items.length > 0}
              />

              <WentWrongMessage isFailed={status === Status.Failed} errorMessage={error} />

              <Spinner
                    isLoading={status === Status.Loading || status === Status.Pending}
                    text="Loading..."
                    size="5em"
              />
        </main>
  );

}