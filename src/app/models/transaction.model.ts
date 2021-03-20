import { Merchant } from "./merchant.model"
import { TransactionDate } from "./transaction-date.model"
import { TransactionInfo } from "./transaction-info.model"

export class Transaction {
    merchant: Merchant
    categoryCode: string
    dates: TransactionDate
    transaction: TransactionInfo
}