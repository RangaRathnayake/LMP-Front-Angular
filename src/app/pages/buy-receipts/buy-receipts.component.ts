import { Component, OnInit, ViewChild } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-buy-receipts',
  templateUrl: './buy-receipts.component.html',
  styleUrls: ['./buy-receipts.component.scss']
})

export class BuyReceiptsComponent implements OnInit {

  myDate = new Date();
  curDate;
  buyReceiptList;
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
    this.apiCall.get('buy/allByDate/' + this.curDate, result => {
      console.log(result);
      this.buyReceiptList = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;
    })
  }

}
