import { of } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { GlobalModule } from "src/app/modules/global.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Transaction } from "src/app/models/transaction.model";
import { TransactionsComponent } from "./transactions.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionService } from "src/app/services/transaction.service";
import { TransactionComponent } from "../transaction/transaction.component";
import * as transactionData from '../../../../assets/mock/transactions.json';

describe('TransactionsComponent', () => {
    
    let de: DebugElement
    let serviceMock: any
    let component: TransactionsComponent
    let fixture: ComponentFixture<TransactionsComponent>

	beforeEach(async () => {
        serviceMock = {
            currentTransactions: () => of(transactionData.data as Array<Transaction>),
            currentAccountBalance: () => of(5824.76)
        }
		await TestBed.configureTestingModule({
			imports: [
                GlobalModule,
				RouterTestingModule
			],
			declarations: [
                TransactionComponent,
                TransactionsComponent
            ],
            providers: [
                { privide: TransactionService, useValue: serviceMock }
            ]
		}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement

        fixture.detectChanges();
    })
    
	it('should create transactions', () => {
		expect(component).toBeTruthy();
    });

    it('should render transactions', (() => {
        expect(component.filterdTransactions)
            .toBeDefined()
        expect(component.filterdTransactions)
            .toEqual(transactionData.data as Array<Transaction>)
        expect(de.queryAll(By.css('Transaction')).length)
            .toBe(transactionData.data.length)
    }))

    it('should clear search box', () => {
        component.search.setValue("This is a test search")
        component.cleanSearchBox()
        expect(component.search.value).toBeFalsy()
        expect(component.filterdTransactions).toBe(component.transactions)
    })

    it('should sort transactions by amount ASC', () => {
        component.ASC = true
        const button = de.nativeElement.querySelector('#amount')
        button.click()
        expect(
            component
                .filterdTransactions
                .map(ft => Number(ft.transaction.amountCurrency.amount))
        )
        .toEqual([
            5000, 
            142.95,
            84.76,
            84.64,
            82.02,
            75.93,
            68.87,
            52.36,
            46.25,
            22.10,
            19.72,
        ])
    })

    it('should sort transactions by amount DESC', () => {
        component.ASC = false
        const button = de.nativeElement.querySelector('#amount')
        button.click()
        expect(
            component
                .filterdTransactions
                .map(ft => Number(ft.transaction.amountCurrency.amount))
        )
        .toEqual([
            19.72,
            22.10,
            46.25,
            52.36,
            68.87,
            75.93,
            82.02,
            84.64,
            84.76,
            142.95,
            5000, 
        ])
    })

    it('should sort transactions by beneficiary ASC', () => {
        component.ASC = true
        const button = de.nativeElement.querySelector('#beneficiary')
        button.click()
        expect(
            component
                .filterdTransactions
                .map(ft => ft.merchant.name)
        )
        .toEqual([
            "7-Eleven",
            "Amazon Online Store",
            "Backbase",
            "H&M Online Store",
            "Jerry Hildreth",
            "Lawrence Pearson",
            "Southern Electric Company",
            "Texaco",
            "The Tea Lounge",
            "The Tea Lounge",
            "Whole Foods",
        ])
    })

    it('should sort transactions by beneficiary DESC', () => {
        component.ASC = false
        const button = de.nativeElement.querySelector('#beneficiary')
        button.click()
        expect(
            component
                .filterdTransactions
                .map(ft => ft.merchant.name)
        )
        .toEqual([
            "Whole Foods",
            "The Tea Lounge",
            "The Tea Lounge",
            "Texaco",
            "Southern Electric Company",
            "Lawrence Pearson",
            "Jerry Hildreth",
            "H&M Online Store",
            "Backbase",
            "Amazon Online Store",
            "7-Eleven",
        ])
    })

    it('should sort transactions by date ASC', () => {
        component.ASC = true
        const button = de.nativeElement.querySelector('#date')
        button.click()
        expect(
            component
                .filterdTransactions
                .map(ft => new Date(ft.dates.valueDate))
        )
        .toEqual([
            new Date(1600493600000),
            new Date("2020-09-19"),
            new Date(1600387200000),
            new Date(1600370800000),
            new Date(1600300800000),
            new Date(1600214400000),
            new Date("2020-09-15"),
            new Date(1600041600000),
            new Date(1599955200000),
            new Date(1599868800000),
            new Date(1476721442000),
        ])
    })

    it('should sort transactions by date DESC', () => {
        component.ASC = false
        const button = de.nativeElement.querySelector('#date')
        button.click()
        expect(
            component
                .filterdTransactions
                .map(ft => new Date(ft.dates.valueDate))
        )
        .toEqual([
            new Date(1476721442000),
            new Date(1599868800000),
            new Date(1599955200000),
            new Date(1600041600000),
            new Date("2020-09-15"),
            new Date(1600214400000),
            new Date(1600300800000),
            new Date(1600370800000),
            new Date(1600387200000),
            new Date("2020-09-19"),
            new Date(1600493600000),
        ])
    })
})
    