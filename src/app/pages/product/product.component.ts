import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlartService } from 'app/service/alart.service';
import { ApicallService } from 'app/service/apicall.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  proNameE;
  proNameS;
  proCode;
  proUnitType;
  proUnitTypeList;
  quality;

  proId;

  productList;

  enabaledeactine: boolean = false;

  displayedColumns: string[] = ['name', 'quality', 'sinhala', 'code', 'unitType', 'id'];
  dataSource = <any>[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatSort, { static: false }) sortpen: MatSort;


  @ViewChild('paginatorpen', { static: true }) paginatorpen: MatPaginator;

  constructor(private apiCall: ApicallService, private alart: AlartService) { }

  ngOnInit(): void {
    this.getProductList();
    this.getUnitType();
  }

  getUnitType() {
    this.apiCall.get('unit/all', result => {
      this.proUnitTypeList = result;
      console.log(this.proUnitTypeList);
    })

  }

  save() {
    if (this.proNameE && this.proNameS && this.proCode && this.proUnitType && this.quality) {
      let obj = {
        product: {
          name: this.proNameE,
          quality: this.quality,
          sinhala: this.proNameS,
          code: this.proCode,
          unitType: '-',
          unit: this.proUnitType,
          status: '1'
        }
      }
      console.log(obj);
      this.apiCall.post('product/save', obj, data => {
        console.log(data);
        this.proNameE = "";
        this.proNameS = "";
        this.quality = "";
        this.proCode = "";
        this.proUnitType = "";
        this.alart.showNotification('success', 'product save');
        this.getProductList();
      })
    } else {
      this.alart.showNotification('warning', 'check feilds');
    }
  }

  getProductList() {
    this.apiCall.get('product/all', result => {
      this.productList = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;
    })
  }

  getProductData(id) {
    this.apiCall.get('product/' + id, result => {
      this.proNameE = result.name;
      this.proNameS = result.sinhala;
      this.quality = result.quality;
      this.proCode = result.code;
      this.proUnitType = result.unitType;

      console.log(result);
      this.enabaledeactine = true;
      this.proId = id;

    })
  }

  deactive() {
    this.apiCall.post('product/save', {
      product: {
        id: this.proId,
        status: 2
      }
    }, data => {
      console.log(data);
      this.proNameE = "";
      this.proNameS = "";
      this.quality = "";
      this.proCode = "";
      this.proUnitType = "";
      this.alart.showNotification('success', 'product deactive success');
      this.enabaledeactine = false;
      this.getProductList();
    })
  }

  clear() {
    this.proNameE = "";
    this.proNameS = "";
    this.quality = "";
    this.proCode = "";
    this.proUnitType = "";
  }


}
