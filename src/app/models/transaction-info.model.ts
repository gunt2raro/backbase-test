import { AmountCurrency } from "./amount-currency.model"

export class TransactionInfo {
    type: string
    creditDebitIndicator: string
    amountCurrency: AmountCurrency
}