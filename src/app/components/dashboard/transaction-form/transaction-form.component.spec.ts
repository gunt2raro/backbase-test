import { FormBuilder } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { GlobalModule } from "src/app/modules/global.module";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TransactionFormComponent } from "./transaction-form.component";
import { TransactionService } from "src/app/services/transaction.service";

describe('TransactionFormComponent', () => {
    
    let de: DebugElement
    let serviceMock: any
    let component: TransactionFormComponent
    let fixture: ComponentFixture<TransactionFormComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
                GlobalModule,
            ],
			declarations: [
				TransactionFormComponent
			],
            providers: [
                FormBuilder,
                TransactionService
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

    it("shoudl be an invalid form", () => {
        component.form.controls.toAccount.setValue(null)
        component.form.controls.amount.setValue(50)
        expect(component.form.valid).toBeFalse()
    })
    
    it("should show review", (() => {
        component.form.controls.toAccount.setValue("Southern Electric Company")
        component.form.controls.amount.setValue(50)
        const button = de.nativeElement.querySelector('#submitBtn')
        button.click()
        expect(component.reviewMode).toBeTrue()
        expect(button.nativeElement).toBeFalsy()
    }))
})