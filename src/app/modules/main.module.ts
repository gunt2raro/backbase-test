
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { GlobalModule } from './global.module'
import { MainRoutes } from '../routes/main.routes'
import { DashboardComponent } from '../pages/dashboard/dashboard.component'
import { TransactionComponent } from '../components/dashboard/transaction/transaction.component'
import { TransactionsComponent } from '../components/dashboard/transactions/transactions.component'
import { TransactionFormComponent } from '../components/dashboard/transaction-form/transaction-form.component'

@NgModule({
	imports: [
		GlobalModule,
		RouterModule.forChild(MainRoutes)
	],
	declarations: [
		DashboardComponent,
		TransactionComponent,
		TransactionsComponent,
		TransactionFormComponent,
	],
	exports: [],
	providers: [],
	entryComponents: [],
})
export class MainModule { }
