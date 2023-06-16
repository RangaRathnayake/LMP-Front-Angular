import { Component, OnInit, ViewChild } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buy-receipts',
  templateUrl: './buy-receipts.component.html',
  styleUrls: ['./buy-receipts.component.scss']
})
export class BuyReceiptsComponent implements OnInit {

  buyReceiptList;

  displayedColumns: string[] = ['name', 'utype.name', 'id'];
  dataSource = <any>[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatSort, { static: false }) sortpen: MatSort;

  @ViewChild('paginatorpen', { static: true }) paginatorpen: MatPaginator;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.getusetlist();
  }

  getusetlist() {
    this.apiCall.get('user/get', result => {
      console.log('---------------');
      console.log(result);
      console.log('---------------');
      this.buyReceiptList = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;
    })
  }

}
