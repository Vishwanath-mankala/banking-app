export class Transactions {
    constructor(
        public txnId :string,
        public type :string,
        public amount :number,
        public timestamp :Date,
        public status :string,
    ){ }
}
