export default interface UpdateUserDTO {
  name: string;
  last_name: string;
  phone: string;
  password?: string;
  confirm_password?: string;
  userId: string;
  subscription: string;
}
