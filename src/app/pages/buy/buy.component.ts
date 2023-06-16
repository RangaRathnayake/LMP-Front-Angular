import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  providers: [DatePipe],
})
export class BuyComponent implements OnInit {

  displayedColumns: string[] = ['product', 'qty', 'unitPrice', 'subTotal', 'columndelete'];

  product;
  productList;
  filterProduct;

  cusId;
  creDate;
  qty;
  clearQty;
  wastage = 0;
  checkboxValue;
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

  buyItems = [];
  dataSource: any;

  reportPath = environment.reportPath;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private matDialog: MatDialog,
    private apiCall: ApicallService,
    private alart: AlartService,
    private datePipe: DatePipe
  ) { }

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
      console.log(result);
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

  getProdName(productId) {
    console.log(productId);
    let findedData = this.productList.find(i => i.id === productId);
    if (typeof findedData === 'undefined') {
      return null;
    }
    console.log(findedData.name);
    this.filterProduct = findedData;
    return findedData;
  }

  add() {
    if(this.wastage === null){
      this.wastage = 0;
      this.clearQty = this.qty;
    }
    else{
      this.clearQty = this.qty - this.wastage;
    }
    this.getProdName(this.product);
    var item = {
      unitPrice: this.unitPrice,
      qty: this.clearQty,
      subTotal: Number(this.unitPrice) * Number(this.clearQty),
      product: this.product,
      productName: this.filterProduct.name + ' | ' + this.filterProduct.quality,
      wastages: this.wastage
    }

    this.buyItems.push(item);
    console.log(this.buyItems);

    let sum: number = 0;
    this.buyItems.forEach(a => sum += a.subTotal);
    this.totalAmount = sum;

    this.dataSource = new MatTableDataSource(this.buyItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.qty = '';
    this.unitPrice = '';
    this.clearQty = '';
    this.wastage = 0;
    this.checkboxValue = false;
  }

  save() {
    if (this.selectedCus) {
      let userD = JSON.parse(localStorage.getItem('user'));;
      this.userId = userD.id;
      let buy = {
        customer: this.selectedCus.id,
        cusName: this.selectedCus.name,
        user: this.userId,
        date: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        product: this.product,
        buyItems: this.buyItems,
        total: this.totalAmount,
        status: '1',
        receiptNo: 0
      }
      this.apiCall.post(
        'buy/save',
        {
          buy:buy
        },
        (data) => {
          console.log(data);
          buy.receiptNo = data.id;
          this.buyItems = [];
          this.dataSource = [];
          this.product = '';
          this.qty = '';
          this.unitPrice = '';
          this.totalAmount = '';
          this.selectedCus = '';
          window.location.href= this.reportPath + 'buy_copy?data=' + JSON.stringify(buy);
          // this.alart.showNotification('success', 'product save');
          //this.getProductList();
        }
      );
    } else {
      this.alart.showNotification('warning', 'Select Customer');
    }
  }

  clear() {

  }

  delete(elm) {
    console.log(elm);
    this.dataSource.data = this.dataSource.data.filter(i => i !== elm)
    this.buyItems = this.dataSource.data;
    let sum: number = 0;
    this.buyItems.forEach(a => sum += a.subTotal);
    this.totalAmount = sum;
  }

}
