import { Component, Input, OnInit } from "@angular/core";
import { Transaction } from "src/app/models/transaction.model";

@Component({
    selector: 'Transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
 
    @Input('transaction')
    public transaction: Transaction
    
    public imgPath: string
    public borderStyle: string

    ngOnInit() {
        this.borderStyle = `10px solid ${this.transaction.categoryCode}`;
        this.imgPath = '/assets/icons/' + this.transaction
            .merchant
            .name
            .toLowerCase()
            .split(" ")
            .join("-") + '.png' 
    }
}