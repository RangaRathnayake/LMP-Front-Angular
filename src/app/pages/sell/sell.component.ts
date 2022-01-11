import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {



  


  displayedColumns: string[] = [ 'unitPrice', 'qty', 'subTotal', 'product'];


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

  cusid;

  sellItems = [];
  dataSource :any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


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

  add(){

   var item ={
      
      unitPrice: this.unitPrice,
      qty: this.qty,
      subTotal: Number(this.unitPrice) * Number(this.qty),
      product: this.product
    }

    this.sellItems.push(item);
    console.log(this.sellItems);
    //this.dataSource=this.sellItems;
   
    this.dataSource = new MatTableDataSource(this.sellItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  save(){

    this.apiCall.post('sell/save', {

      sell:{
        customer: 1,
        date: "2022-12-12T00:40:32.000Z",
        total: 500,
        status: 1,
        sellItems: this.sellItems
           
    }

    }, data => {
      console.log(data);
    })

  }

  clear(){

  }

}
