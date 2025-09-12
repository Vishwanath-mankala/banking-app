import { Transactions } from "./transactions";

export class Account {
    constructor(public accountNumber:string,
        public userId:string,
        public type:string,
        public balance : number,
        public status:string,
        public transaction_s : [Transactions]
    ){ }
}
