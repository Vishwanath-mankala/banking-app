import { Transactions } from './transactions';

export class Account {
  constructor(
    public _id: string,
    public accountNumber: string,
    public userId: string,
    public type: string,
    public balance: number,
    public status: string,
    public transaction_s: [Transactions],
    public deposit_amount: number,
    public withdraw_amount: number,
    public transfer_amount: number,
    public toAccountId: string
  ) {}
}
