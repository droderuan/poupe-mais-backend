export default interface CreateUserDTO {
  id: string;
  name: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
