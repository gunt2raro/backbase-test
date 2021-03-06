import { TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { GlobalModule } from "src/app/modules/global.module";
import { RouterTestingModule } from "@angular/router/testing";
import { TransactionService } from "src/app/services/transaction.service";
import { TransactionsComponent } from "src/app/components/dashboard/transactions/transactions.component";
import { TransactionFormComponent } from "src/app/components/dashboard/transaction-form/transaction-form.component";

describe('DashboardComponent', () => {
    
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
                GlobalModule,
                RouterTestingModule,
			],
			declarations: [
                DashboardComponent,
                TransactionsComponent,
                TransactionFormComponent,
            ],
            providers: [
                TransactionService
            ]
		}).compileComponents();
    });
    
	it('should create dashboard', () => {
		const fixture = TestBed.createComponent(DashboardComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
})