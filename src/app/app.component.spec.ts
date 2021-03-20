import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AppComponent', () => {

    let de: DebugElement
    let component: AppComponent
	let fixture: ComponentFixture<AppComponent>
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AppComponent
			],
		}).compileComponents();
	});

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement

        fixture.detectChanges();
    })

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
