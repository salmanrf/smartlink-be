import { LoginModel } from '../models/login.model';

export interface AuthorizedRequest extends Request {
  user: LoginModel;
}
