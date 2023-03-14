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

// NOTE: Make sure this enum matches the one in backend.
export enum StaffWhereaboutType {
      Late,
      Leave,
      Field,
      WorkFromHome,
      Others
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

export enum UserType {
      Client,
      Staff,
}

export enum EmailConfirm {
      "true" = "confirmed",
      "false" = "not confirmed",
}

export enum BloodGroup {
      "A+ve" = "A+ve",
      "A-ve" = "A-ve",
      "B+ve" = "B+ve",
      "B-ve" = "B-ve",
      "O+ve" = "O+ve",
      "O-ve" = "O-ve",
      "AB+ve" = "AB+ve",
      "AB-ve" = "AB-ve",
}

export enum RequestViaType {
      Phone = 'Phone',
      Viber = 'Viber',
      Email = 'Email',
      Other = 'Other',
}


//Leave application
export enum LeaveCause {
      Casual,
      Sick,
      Compensation,
      Compassionate,
      Other,
}

export enum LeaveType {
      "Full Day",
      "First Half",
      "Second Half",
}

export type COOKIES_TYPE = 'access_token' | 'refresh_token';