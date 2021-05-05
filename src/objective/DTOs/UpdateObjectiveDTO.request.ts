export default interface CreateObjectiveDTO {
  name?: string;
  quantity?: number;
  userId: string;
  objective_id: string;
  already_placed?: number;
}
