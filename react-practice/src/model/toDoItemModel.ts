export interface IToDoItemSearch {
    ListId: number,
    PageNumber?: number | null,
    PageSize?: number | null,
}

export interface IToDoItemRequestModel {
    id?: number;
    listId: number;
    title: string;
    done: boolean;
}

export interface IToDoItemResponseModel {
    id: number;
    listId: number;
    title: string;
    done: boolean;
}

export interface IToDoItemResponse {
    totalPages: number;
    items: IToDoItemResponseModel[];
}

export interface IUpdateItemsDetailModel{
    id: number;
    listId: number;
    priority: number;
    note: string;
}