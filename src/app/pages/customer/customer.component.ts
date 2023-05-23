import { Component, OnInit } from '@angular/core';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [DatePipe]
})
export class CustomerComponent implements OnInit {

  cusName;
  mob_no;
  address;
  myDate = new Date();

  constructor(private apiCall: ApicallService, private alart: AlartService,private datePipe: DatePipe) { }

  
  ngOnInit(): void {
  }

  save(){
    if (this.cusName && this.mob_no && this.address) {
      this.apiCall.post('customer/save', {
        customer: {
          name: this.cusName,
          mobile: this.mob_no,
          address: this.address,
          create_date: this.datePipe.transform(this.myDate, 'yyyy-MM-dd'),
        }
      }, data => {
        console.log(data);
        this.cusName = "";
        this.mob_no = "";
        this.address = "";
        this.alart.showNotification('success', 'customer save');
        window.location.reload();
      })
    } else {
      this.alart.showNotification('warning', 'check feilds');
    }
  }

}