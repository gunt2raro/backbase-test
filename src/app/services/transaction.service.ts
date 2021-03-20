import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Transaction } from "../models/transaction.model";
import * as transactionData from '../../assets/mock/transactions.json';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private transactions: BehaviorSubject<Array<Transaction>> = new BehaviorSubject(JSON.parse(JSON.stringify(transactionData.data)) as Array<Transaction>)
    public currentTransactions = this.transactions.asObservable()

    private accountBalance: BehaviorSubject<number> = new BehaviorSubject(5824.76)
    public currentAccountBalance = this.accountBalance.asObservable()

    // create
    // will add the new transaction on top 
    // of all the transactions
    // then updates the current transactions array
    // then updates the current account balance
    // @param transaction: Transaction model
    // @returns none
    create(transaction: Transaction) {
        const trans = this.transactions.value
        trans.unshift(transaction)
        this.transactions.next(trans)
        this.accountBalance.next(
            this.accountBalance.value 
            - transaction
                .transaction
                .amountCurrency
                .amount
        )
    }

    // getAccountBalance
    // will return the current account balance value
    // @params none
    // @returns a number
    getAccountBalance(): number {
        return this.accountBalance.value
    }

    // setTransactions
    // will update the whole current transactions array
    // @param transactions: Array of Transactions
    // @returns none 
    setTransactions(transactions: Transaction[]) {
        this.transactions.next(transactions)
    }
}