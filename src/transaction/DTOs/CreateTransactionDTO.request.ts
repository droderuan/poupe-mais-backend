export default interface CreateTransactionDTO {
  name: string;
  type: 'WITHDRAW' | 'ENTRANCE';
  description?: string;
  value: number;
  tag_id: string;
}
