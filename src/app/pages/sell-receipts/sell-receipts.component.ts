import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-sell-receipts',
  templateUrl: './sell-receipts.component.html',
  styleUrls: ['./sell-receipts.component.scss']
})
export class SellReceiptsComponent implements OnInit {

  myDate = new Date();
  curDate;
  sellReceiptList;
  // dataSources:any;

  displayedColumns: string[] = ['recId', 'dateTime', 'cus_name', 'total', 'id', 'receptid'];
  dataSource = <any>[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatSort, { static: false }) sortpen: MatSort;

  @ViewChild('paginatorpen', { static: true }) paginatorpen: MatPaginator;

  constructor(private apiCall: ApicallService, private alart: AlartService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getReceiptlist();
  }

  getReceiptlist() {
    this.curDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.curDate);
    this.apiCall.get('sell/allByDate/' + this.curDate, result => {
      console.log(result);
      this.sellReceiptList = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;
    })
  }

  reqCancelReceipt(id){
    console.log(id);
    this.apiCall.put('sell/' + id, { status: 2}, 
    data => {
      this.getReceiptlist();
      this.alart.showNotification('success', id + ' Receipt successfully cancelled');
    })
  }

}
