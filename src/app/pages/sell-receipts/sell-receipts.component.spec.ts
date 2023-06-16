import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellReceiptsComponent } from './sell-receipts.component';

describe('SellReceiptsComponent', () => {
  let component: SellReceiptsComponent;
  let fixture: ComponentFixture<SellReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
