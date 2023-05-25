import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyReceiptsComponent } from './buy-receipts.component';

describe('BuyReceiptsComponent', () => {
  let component: BuyReceiptsComponent;
  let fixture: ComponentFixture<BuyReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
