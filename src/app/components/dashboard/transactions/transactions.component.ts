import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FormControl, Validators } from '@angular/forms';
import { FilterType } from 'src/app/enums/filter-type.enum';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@AutoUnsubscribe()
@Component({
    selector: 'Transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {

    public iconsFilter: Array<string> = [
        "fas fa-caret-up",
        "fas fa-caret-down",
    ]
    public search: FormControl
    public transactions: Array<Transaction>
    public filterdTransactions: Array<Transaction>

    public ASC: boolean = true
    public FilterType = FilterType
    public typeOfFilter: FilterType = FilterType.NONE

    private searchSub: Subscription
    private transactionsSub: Subscription

    constructor(
        private transactionService: TransactionService
    ) { }

    ngOnInit() {
        this.search = new FormControl(null)
        this.transactionsSub = this.transactionService
            .currentTransactions
            .subscribe(ctr => {
                this.transactions = ctr
                this.filterdTransactions = ctr
            })
        this.searchSub = this.search
            .valueChanges
            .subscribe(val => {
                if (val) {
                    this.filterdTransactions = this.transactions
                        .filter(transaction => (
                            transaction
                                .merchant
                                .name
                                .toLowerCase()
                                .includes(val)
                        ))
                } else {
                    this.filterdTransactions = this.transactions
                }
            })
    }

    showClean = () => this.search.value

    cleanSearchBox() {
        this.search.reset()
        this.filterdTransactions = this.transactions
    }

    chooseFilter(choosenFilter: FilterType) {
        if (this.typeOfFilter == choosenFilter) {
            this.ASC = !this.ASC
        }
        this.typeOfFilter = choosenFilter
        switch (choosenFilter) {
            case FilterType.DATE:
                this.filterdTransactions = this.sortByDate(
                    this.filterdTransactions,
                    this.ASC
                )
                break;
            case FilterType.BENEFICIARY:
                this.filterdTransactions = this.sortByBeneficiary(
                    this.filterdTransactions,
                    this.ASC
                )
                break;
            case FilterType.AMOUNT:
                this.filterdTransactions = this.sortByAmount(
                    this.filterdTransactions,
                    this.ASC
                )
                break;
        }
    }

    // sortByDate
    // will sort an array of transactions by
    // by date
    // @param filterdTransactions: Array of transactions
    // @param ASC: boolean
    // @returns an array of transactions
    sortByDate(
        filterdTransactions: Transaction[],
        ASC: boolean
    ): Transaction[] {
        return filterdTransactions
            .sort((a, b) => {
                const aT = new Date(a.dates.valueDate).getTime()
                const bT = new Date(b.dates.valueDate).getTime()
                return (
                    aT - bT
                ) * (ASC ? -1 : 1)
            })
    }

    // sortByAmount
    // will sort an array of transactions by
    // by amount
    // @param filterdTransactions: Array of transactions
    // @param ASC: boolean
    // @returns an array of transactions
    sortByAmount(
        filterdTransactions: Transaction[],
        ASC: boolean
    ): Transaction[] {
        return filterdTransactions
            .sort((a, b) => (
                a.transaction.amountCurrency.amount
                - b.transaction.amountCurrency.amount
            ) * (ASC ? -1 : 1))
    }

    // sortByBeneficiary
    // will sort an array of transactions by
    // by beneficiary
    // @param filterdTransactions: Array of transactions
    // @param ASC: boolean
    // @returns an array of transactions
    sortByBeneficiary(
        filterdTransactions: Transaction[],
        ASC: boolean
    ): Transaction[] {
        return filterdTransactions
            .sort((a, b) => (
                b.merchant.name.localeCompare(a.merchant.name)
            ) * (ASC ? -1 : 1))
    }

    ngOnDestroy() { }
}