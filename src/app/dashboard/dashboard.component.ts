import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myDate = new Date();
  curDate;
  productList;
  productCount = 0;
  buyProductCount = 0;
  sellProductCount = 0;
  revenue = 0;

  constructor(private apiCall: ApicallService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getProductList();
    this.getBuyReceiptlist();
    this.getSellReceiptlist();
  }

  getProductList() {
    this.apiCall.get('product/all', result => {
      this.productList = result;
      this.productCount = this.productList.length;
      console.log(this.productCount);
    })
  }

  getBuyReceiptlist() {
    this.curDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.curDate);
    this.apiCall.get('buy/allByDate/' + this.curDate, result => {
      this.buyProductCount = result.length;
      console.log(this.buyProductCount);
    })
  }

  getSellReceiptlist() {
    this.curDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.curDate);
    this.apiCall.get('sell/allByDate/' + this.curDate, result => {
      this.sellProductCount = result.length;
      console.log(this.sellProductCount);
    })
  }

}
