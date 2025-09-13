export class Loan {
    constructor (
        public _id: string,
        public userId: string,
        public loanType: string,
        public amount: number,
        public tenureMonths: number,
        public interestRate: number,
        public status: string
    ){ }
}