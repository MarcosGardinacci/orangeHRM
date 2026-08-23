export interface UserCredentials {
  username?: string;
  password?: string;
}

export interface ValidationMessages {
  requiredField: string;
  invalidCredentials: string;
}
