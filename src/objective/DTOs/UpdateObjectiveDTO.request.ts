export default interface CreateObjectiveDTO {
  name?: string;
  quantity?: number;
  userId: string;
  objectiveId: string;
  already_placed?: number;
}
