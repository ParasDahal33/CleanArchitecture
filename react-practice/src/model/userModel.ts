import { OrderBy, UserRole, UserStatus } from "../helpers/constants";

export interface IUsersResponseModel {
      id: string;
      userName: string;
      fullName: string;
      role: UserRole;
      email: string;
      userStatus: number;
      passwordChangeDate: Date;
      accountCreatedDate: Date;
      emailConfirmed: boolean;
      expiryDate: Date;
      pwdExpiry: Date;
}

export interface IUsersResponse {
      totalPages: number;
      items: IUsersResponseModel[];
}

export interface IUserRequestModel {
      userId?: string;
      fullName: string;
      userName: string;
      email: string;
      clientId?: number;
      staffId?: number;
      userStatus: UserStatus;
      role: UserRole;
}

export interface IUser {
      id?: string;
      fullName?: string;
}

export interface IUserSearchData {
      fullName?: string,
      pageNumber?: number | null,
      order?: OrderBy,
      sortBy?: string,
}