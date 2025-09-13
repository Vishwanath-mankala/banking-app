export class Repayments {
    constructor(
        public loanId:string,
        public dueDate:Date,
        public amount:number,
        public paid:boolean,
        public paidDate:Date,
    ){  }
}
