import { User } from 'src/app/models/user';
export interface AdminModel {
  isLoading: boolean;
  currentUser: string;
  companyName: string;
  userProfile?: User;
}
