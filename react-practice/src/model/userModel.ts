import { OrderBy, UserRole, UserStatus, UserType } from "../helpers/constants";

export interface IUsersResponseModel {
      userId: string;
      userName: string;
      staffId: number;
      clientId: number;
      clientName: string; //don't know why the F** it is here. if there is fullName
      fullName: string;
      userType: UserType;
      role: UserRole;
      email: string;
      departmentId: number;
      departmentName: string;
      createdBy: string;
      userStatus: number;
      passwordChangeDate: Date;
      accountCreatedDate: Date;
      emailConfirmed: boolean;
      expiryDate: Date;
      pwdExpiry: Date;
}

export interface IUsersResponse {
      totalPages: number;
      userData: IUsersResponseModel[];
}

export interface IUserRequestModel {
      userId?: string;
      fullName: string;
      userName: string;
      email: string;
      userType: UserType;
      clientId?: number;
      staffId?: number;
      userStatus: UserStatus;
      role: UserRole;
}

export interface IUser {
      userId?: string;
      fullName?: string;
}

export interface IUserSearchData {
      departmentId?: number,
      fullName?: string,
      userType?: UserType,
      pageNumber?: number | null,
      order?: OrderBy,
      sortBy?: string,
}