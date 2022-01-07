import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
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

  


  constructor(private matDialog: MatDialog, private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    //this.getCus('');
    this.searchCus.valueChanges.pipe().subscribe(mobile => {
      startWith(''),
      this.getCus(mobile)
    })
    this.getProducts();
  }

  cus_list: any[] = []
  searchCus = new FormControl()

  getCus(mobile) {
    console.log(mobile);
    this.apiCall.get('customer/mobile/' + mobile, result => {
      this.cus_list = result;
      console.log(result);
      console.log("xxxxxxx");
    })

  }

  getProducts() {
    this.apiCall.get('product/all', result => {
      this.productList = result;
      console.log(this.productList);
      console.log("Products_done");
    })

  }

  public createCus() {
    this.matDialog.open(CustomerComponent, {
      width: '600px',
    });
  }

  save(){

  }

  clear(){

  }

}
