import { User } from '../Entities/user.entitie';

export default interface AuthenticateDTO {
  user: User;
  token: string;
}
