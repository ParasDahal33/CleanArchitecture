// Loading status for API request/response to backend.
export enum Status {
      Idle,
      Pending,
      Loading,
      Succeeded,
      Failed,
}

// Status for adding, viewing or editing items on a table.
export enum FieldStatus {
      Idle,
      View,
      Edit,
      Add,
}

// To identify if searched data is showing or all data is showing
export enum ShowingDataType {
      Searched,
      All,
}

// for table sort
export enum OrderBy {
      Ascending,
      Descending,
}

export enum ClientStatus {
      Active,
      Discontinued,
      "On hold",
}

// in lowercase
// to make mapping easy
// [to check if browser url contain the value ]
export enum ClientType {
      local,
      international,
}

// NOTE: Make sure this enum matches the one in backend.
export enum StaffStatus {
      Active,
      Inactive,
      Resigned,
      NA,
}



//status for registered user.
export enum UserStatus {
      Active,
      Inactive,
}

export enum UserRole {
      Admin = "Admin",
      User = "User",
      Manager = "Manager",
}


export enum EmailConfirm {
      "true" = "confirmed",
      "false" = "not confirmed",
}



export enum RequestViaType {
      Phone = 'Phone',
      Viber = 'Viber',
      Email = 'Email',
      Other = 'Other',
}



export type COOKIES_TYPE = 'access_token' | 'refresh_token';