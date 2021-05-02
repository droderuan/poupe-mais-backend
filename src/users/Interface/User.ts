export default interface User {
  id: string;
  name: string;
  password: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
