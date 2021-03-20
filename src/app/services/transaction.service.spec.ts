import { Transaction } from "../models/transaction.model";
import { TransactionService } from "./transaction.service";

describe('TransactionService', () => {

    it('should create transaction', () => {
        const service: TransactionService = new TransactionService()
        const transaction: Transaction = {
            categoryCode: "",
            dates: {
                valueDate: new Date().getTime()
            },
            transaction: {
                type: "Online Transfer",
                creditDebitIndicator: "",
                amountCurrency: {
                    amount: 50,
                    currencyCode: 'USD'
                }
            },
            merchant: {
                name: "Southern Electric Company",
                accountNumber: 'SI64397745065188826',
            }
        }
        service.create(transaction)
        service.currentTransactions.subscribe(ct => {
            expect(ct.length).toBe(12)
        })
        service.currentAccountBalance.subscribe(cb => {
            expect(cb).toBe(5824.76 - 50)
        })
    })

    it('should reduce balance amount', () => {
        const service: TransactionService = new TransactionService()
        const transaction: Transaction = {
            categoryCode: "",
            dates: {
                valueDate: new Date().getTime()
            },
            transaction: {
                type: "Online Transfer",
                creditDebitIndicator: "",
                amountCurrency: {
                    amount: 50,
                    currencyCode: 'USD'
                }
            },
            merchant: {
                name: "Southern Electric Company",
                accountNumber: 'SI64397745065188826',
            }
        }
        service.create(transaction)
        service.currentAccountBalance.subscribe(cb => {
            expect(cb).toBe(5824.76 - 50)
        })
    })

    it('should add on top new transaction', () => {
        const service: TransactionService = new TransactionService()
        const transaction: Transaction = {
            categoryCode: "",
            dates: {
                valueDate: new Date().getTime()
            },
            transaction: {
                type: "Online Transfer",
                creditDebitIndicator: "",
                amountCurrency: {
                    amount: 50,
                    currencyCode: 'USD'
                }
            },
            merchant: {
                name: "Southern Electric Company",
                accountNumber: 'SI64397745065188826',
            }
        }
        service.create(transaction)
        service.currentTransactions.subscribe(ct => {
            expect(ct[0]).toEqual(transaction)
        })
    })
})