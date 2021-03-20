import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/mian.layout.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
	{
		path: 'dashboard',
		component: MainLayoutComponent,
		children: [{
			path: '',
			loadChildren: () =>
				import('./modules/main.module').then(m => m.MainModule)
		}],
	},
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	providers: [],
	exports: [RouterModule]
})
export class AppRoutingModule { }
