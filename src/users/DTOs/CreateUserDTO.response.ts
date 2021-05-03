export default interface CreateUserDTO {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
