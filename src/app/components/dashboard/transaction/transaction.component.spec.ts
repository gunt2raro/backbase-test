import { DebugElement } from "@angular/core"
import { GlobalModule } from "src/app/modules/global.module"
import { Transaction } from "src/app/models/transaction.model"
import { TransactionComponent } from "./transaction.component"
import { ComponentFixture, TestBed } from "@angular/core/testing"

describe('TransactionComponent', () => {
    
    let de: DebugElement
    let component: TransactionComponent
    let fixture: ComponentFixture<TransactionComponent>
    let transactionMock: Transaction

    beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
                GlobalModule,
			],
			declarations: [
                TransactionComponent,
            ],
		}).compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement
        transactionMock = new Transaction()
        transactionMock = {
            "categoryCode": "#12a580",
            "dates": {
                "valueDate": 1600387200000
            },
            "transaction": {
                "amountCurrency": {
                "amount": 82.02,
                "currencyCode": "EUR"
                },
                "type": "Card Payment",
                "creditDebitIndicator": "DBIT"
            },
            "merchant": {
                "name": "The Tea Lounge",
                "accountNumber": "SI64397745065188826"
            }
        }
        component.transaction = transactionMock
        fixture.detectChanges();
    })

	it('should create transaction', () => {
		expect(component).toBeTruthy();
    });

    it('should render merchant name', (() => {
        expect(
            de.nativeElement
                .querySelector('.content .title')
                .textContent
        ).toContain(transactionMock.merchant.name)
    }))

    it('should render transaction type', (() => {
        expect(
            de.nativeElement
                .querySelector('.content .sub-title')
                .textContent
        ).toContain(
            transactionMock
                .transaction
                .type
        )
    }))

    it('should render amount', (() => {
        expect(
            de.nativeElement
                .querySelector('.amount')
                .textContent
        ).toContain(
            transactionMock
                .transaction
                .amountCurrency
                .amount
        )
    }))

    it('should render date', (() => {
        expect(
            de.nativeElement
                .querySelector('.date')
                .textContent
        ).toContain( 'Sep 17' )
    }))
})