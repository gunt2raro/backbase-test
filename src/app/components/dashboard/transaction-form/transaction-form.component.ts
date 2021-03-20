import { Subscription } from "rxjs";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Transaction } from "src/app/models/transaction.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TransactionService } from "src/app/services/transaction.service";

@AutoUnsubscribe()
@Component({
    selector: "TransactionForm",
    templateUrl: './transaction-form.component.html',
    styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnDestroy {

    public form: FormGroup
    public transaction: Transaction
    public accountBalance: number = 0
    public fromAccountDefault: string
    
    public reviewMode: boolean = false

    public accountBalanceSub: Subscription

    constructor(
        private formBuilder: FormBuilder,
        private transactionService: TransactionService,
    ) { }

    ngOnInit() {
        this.accountBalanceSub = this.transactionService
            .currentAccountBalance
            .subscribe(cab => {
                this.accountBalance = cab
                this.fromAccountDefault = `Free Checking(4692) - $ ${this.accountBalance}`
            })
        this.form = this.formBuilder.group({
            amount: [null, Validators.compose([
                Validators.required, 
                Validators.min(1),
                Validators.max(500)
            ])],
            toAccount: [
                'Southern Electric Company', 
                Validators.required
            ],
            fromAccount: [{ 
                value: this.fromAccountDefault, 
                disabled: true 
            }, Validators.required],
        })
    }

    submit() {
        if(this.form.valid) {
            this.reviewMode = true
            this.transaction = new Transaction()
            this.transaction = {
                categoryCode: "",
                dates: {
                    valueDate: new Date().getTime()
                },
                transaction: {
                    type: "Online Transfer",
                    creditDebitIndicator: "",
                    amountCurrency: {
                        amount: this.form
                            .controls
                            .amount
                            .value,
                        currencyCode: 'USD'
                    }
                },
                merchant: {
                    name: this.form
                        .controls
                        .toAccount
                        .value,
                    accountNumber: 'SI64397745065188826',
                }
            }
        }
    }

    cancel() {
        this.reviewMode = false
    }

    transfer() {
        if (this.form.valid) {
            this.transactionService
                .create(this.transaction)
            this.form.controls.amount.reset()
            this.form.controls.toAccount.reset()
            this.form
                .controls
                .fromAccount
                .setValue(this.fromAccountDefault)
            this.reviewMode = false
            this.transaction = null
        }
    }

    ngOnDestroy() {

    }
}