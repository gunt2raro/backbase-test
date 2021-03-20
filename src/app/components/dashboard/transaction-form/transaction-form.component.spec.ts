import { of } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { GlobalModule } from "src/app/modules/global.module";
import { Transaction } from "src/app/models/transaction.model";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionFormComponent } from "./transaction-form.component";
import { TransactionService } from "src/app/services/transaction.service";
import * as transactionData from '../../../../assets/mock/transactions.json';

describe('TransactionFormComponent', () => {
    
    let de: DebugElement
    let serviceMock: any
    let component: TransactionFormComponent
    let fixture: ComponentFixture<TransactionFormComponent>

	beforeEach(async () => {
        serviceMock = {
            currentTransactions: () => of(transactionData.data as Array<Transaction>),
            currentAccountBalance: () => of(5824.76)
        }
		await TestBed.configureTestingModule({
			imports: [
                GlobalModule,
            ],
			declarations: [
				TransactionFormComponent
			],
            providers: [
                FormBuilder,
                { privide: TransactionService, useValue: serviceMock }
            ]
		}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionFormComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement

        fixture.detectChanges();
    })
    
	it("should create transaction form", () => {
		expect(component).toBeTruthy();
    });

    it("should be a valid form", () => {
        component.form.controls.toAccount.setValue("Southern Electric Company")
        component.form.controls.amount.setValue(50)
        expect(component.form.valid).toBeTrue()
    })

    it("should be an invalid amount", () => {
        component.form.controls.amount.setValue(501)
        expect(component.form.controls.amount.valid).toBeFalse()
    })

    it("should be an invalid form", () => {
        component.form.controls.toAccount.setValue(null)
        component.form.controls.amount.setValue(50)
        expect(component.form.valid).toBeFalse()
    })
    
    it("should show review", (() => {
        component.form.controls.toAccount.setValue("Southern Electric Company")
        component.form.controls.amount.setValue(50)
        const button = de.nativeElement.querySelector('#submitBtn')
        button.click()
        fixture.detectChanges();
        expect(component.reviewMode).toBeTrue()
        expect(button.nativeElement).toBeFalsy()
        expect(de.nativeElement.querySelector('form')).toBeFalsy()
        expect(de.nativeElement.querySelector('.review')).toBeTruthy()
        expect(component.transaction).toBeDefined()
    }))

    it('should do transaction after review', (() => {
        component.reviewMode = true
        fixture.detectChanges();
        component.form.controls.toAccount.setValue("Southern Electric Company")
        component.form.controls.amount.setValue(50)
        component.transaction = new Transaction()
        component.transaction = {
            categoryCode: "",
            dates: {
                valueDate: new Date().getTime()
            },
            transaction: {
                type: "Online Transfer",
                creditDebitIndicator: "",
                amountCurrency: {
                    amount: component.form
                        .controls
                        .amount
                        .value,
                    currencyCode: 'USD'
                }
            },
            merchant: {
                name: component.form
                    .controls
                    .toAccount
                    .value,
                accountNumber: 'SI64397745065188826',
            }
        }
        const button = de.nativeElement.querySelector('#transactionBtn')
        button.click()
        fixture.detectChanges();
        expect(component.reviewMode).toBeFalse()
        expect(de.nativeElement.querySelector('.review')).toBeFalsy()
        expect(de.nativeElement.querySelector('form')).toBeTruthy()
    }))
})