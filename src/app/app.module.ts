import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './common/header/header.component';
import { MainLayoutComponent } from './layouts/main/mian.layout.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MainLayoutComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
