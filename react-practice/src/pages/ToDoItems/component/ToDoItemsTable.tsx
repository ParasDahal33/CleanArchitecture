import { ReactElement } from "react";
import { IToDoItemResponseModel, IToDoItemSearch } from "../../../model/toDoItemModel";
import useTodoItemApiRequest from "../../../hooks/toDoItems/todoItemsApiRequest";
import { useURLQuery } from "../../../hooks/common/useURLQuery";




interface IToDoItemTable{
    openEditModal: (user: IToDoItemResponseModel) => void;
    openViewModal: (user: IToDoItemResponseModel) => void; 
}

export default function ToDoItemsTable({openEditModal, openViewModal}:IToDoItemTable): ReactElement{
   const {
    toDoItemInfo: { toDoItems, error, status, showingResultOf},
    deleteToDoItemHandler,
    } = useTodoItemApiRequest();
    const { currentPageNumber, changeURLQuery, changeURLPageNumber, clearURLQuery } =
            useURLQuery<IToDoItemSearch>();

        
        
    return(
        <main>
            <Table>
                <TableHead>
                    <tr>
                    <th scope="col" className="text-start">
                        User Role
                    </th>

                    <th scope="col">Status</th>

                    <th scope="col">Email confirmed</th>

                    <th scope="col">Action</th>
                    </tr>
                </TableHead>


                
            </Table>
        </main>
    ) 

}
