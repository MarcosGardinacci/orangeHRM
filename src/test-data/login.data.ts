import { UserCredentials } from '../models/auth.model';

export const LOGIN_DATA = {
  validUser: {
    username: 'Admin',
    password: 'admin123',
  } as Required<UserCredentials>,

  invalidPasswordUser: {
    username: 'Admin',
    password: 'WrongPassword123!',
  } as Required<UserCredentials>,

  nonExistentUser: {
    username: 'NonExistentUser_OrangeQA',
    password: 'admin123',
  } as Required<UserCredentials>,

  emptyUsernameUser: {
    username: '',
    password: 'admin123',
  } as UserCredentials,

  emptyPasswordUser: {
    username: 'Admin',
    password: '',
  } as UserCredentials,

  emptyCredentialsUser: {
    username: '',
    password: '',
  } as UserCredentials,
};
