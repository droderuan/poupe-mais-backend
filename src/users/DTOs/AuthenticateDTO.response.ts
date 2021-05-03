import { User } from '../Entities/user.entities';

export default interface AuthenticateDTO {
  user: User;
  token: string;
}
