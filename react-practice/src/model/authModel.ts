export interface ILoginModel {
      email: string;
      password: string;
}

export interface IForgetPasswordModel {
      email: string;
}

export interface IResetPasswordModel {
      password: string | undefined;
      confirmPassword: string | undefined;
      id: string;
      token: string;
}

export interface IConfirmEmailModel {
      id: string;
      token: string;
}

export interface ITokenModel {
      accessToken: string;
      refreshToken: string;
}

export interface ILoginResponseModel {
      data: ITokenModel;
      success: boolean;
      message: string;
      errors: Array<string> | null;
}

export interface IChangePassword {
      oldPassword: string,
      password: string,
      confirmPassword: string
}

export interface IJwtModel {
      aud: string;
      exp: number;
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata": string;
      iss: string;
}