import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "src/app/common/header/header.component";
import { MainLayoutComponent } from "./mian.layout.component";

describe('MainLayoutComponent', () => {
    
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
                HeaderComponent,
                MainLayoutComponent
			],
		}).compileComponents();
    });
    
	it('should create main layout', () => {
		const fixture = TestBed.createComponent(MainLayoutComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
})
    