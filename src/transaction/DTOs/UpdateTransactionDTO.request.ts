export default interface CreateTransactionDTO {
  transaction_id: string;
  name: string;
  type: 'WITHDRAW' | 'ENTRANCE';
  description?: string;
  value: number;
  tag_id: string;
}
