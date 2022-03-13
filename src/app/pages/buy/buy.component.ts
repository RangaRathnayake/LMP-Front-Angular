import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  providers: [DatePipe],
})
export class BuyComponent implements OnInit {
  product;
  productList;

  cusId;
  creDate;
  qty;
  unitType;
  unitPrice;
  totalAmount;
  status;
  userId;
  myDate = new Date();
  allCustomers;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  selectedMob;

  selectedCus;

  constructor(
    private matDialog: MatDialog,
    private apiCall: ApicallService,
    private alart: AlartService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCus();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.getProducts();
  }

  change() {
    console.log(this.selectedMob);
  }

  loadCus() {
    this.apiCall.get('customer/all/', (result) => {
      this.allCustomers = result;
      this.allCustomers.forEach((element) => {
        this.options.push(element.mobile);
      });
      console.log('(-----------------)');
      console.log(this.options);
      console.log('(-----------------)');
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.selectedMob = filterValue;
    this.getCus(this.selectedMob);
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getCus(mob) {
    if (mob) {
      const cus = this.allCustomers.filter((cus) => cus.mobile == mob);
      this.selectedCus = cus[0];
      console.log(this.selectedCus);
    }
  }

  getProducts() {
    this.apiCall.get('product/all', (result) => {
      this.productList = result;
      console.log(this.productList);
      console.log('Products_done');
    });
  }

  public createCus() {
    this.matDialog.open(CustomerComponent, {
      width: '600px',
    });
  }

  calTotalAmount() {
    this.apiCall.get('product/' + this.product, (result) => {
      this.unitType = result.unit;
      this.totalAmount = this.unitType * this.unitPrice;

      console.log(result);
      console.log(this.totalAmount);
    });
  }

  save() {
    if (this.product && this.qty && this.unitPrice) {
      this.apiCall.post(
        'buy/save',
        {
          buy: {
            customer: this.selectedCus.id,
            //user: this.userId,
            user: '1',
            date: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
            product: this.product,
            qty: this.qty,
            //unit: this.unitType,
            unit: '1000',
            unitPrice: this.unitPrice,
            //total: this.totalAmount,
            total: '200',
            status: '1',
          },
        },
        (data) => {
          console.log(data);
          this.product = '';
          this.qty = '';
          this.unitPrice = '';
          this.totalAmount = '';
          //this.alart.showNotification('success', 'product save');
          //this.getProductList();
        }
      );
    } else {
      this.alart.showNotification('warning', 'check feilds');
    }
  }

  clear() {}
}
