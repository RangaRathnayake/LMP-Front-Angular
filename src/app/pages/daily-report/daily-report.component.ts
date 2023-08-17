import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {

  reportPath = environment.reportPath;

  myDate = new Date();
  curDate;
  buyReceiptList;

  selectedType = 'buy';
  startdate;
  endDate;

  displayedColumns: string[] = ['recId', 'dateTime', 'cus_name', 'total'];
  dataSource = <any>[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatSort, { static: false }) sortpen: MatSort;

  @ViewChild('paginatorpen', { static: true }) paginatorpen: MatPaginator;

  constructor(private apiCall: ApicallService, private alart: AlartService, private datePipe: DatePipe) { }

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

  onRadioChange(event: any) {
    this.selectedType = event.value;
  }

  loadBuyReport() {
    if (this.selectedType == 'sell') {
      let obj = {
        'StartDate': this.startdate,
        'EndDate': this.endDate
      }
      window.location.href = this.reportPath + 'daily_sell_report.html?data=' + JSON.stringify(obj);
    } else if (this.selectedType == 'buy') {
      let obj = {
        'StartDate': this.startdate,
        'EndDate': this.endDate
      }
      window.location.href= this.reportPath + 'daily_buy_report.html?data=' + JSON.stringify(obj);
    }

  }

}
