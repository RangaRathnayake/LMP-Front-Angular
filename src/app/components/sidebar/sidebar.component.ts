import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'app/service/apicall.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/product', title: 'Product', icon: 'inventory', class: '' },
  { path: '/buy', title: 'Buy', icon: 'arrow_forward', class: '' },
  // { path: '/buyReceipts', title: 'Buy Receipt', icon: 'arrow_forward', class: '' },
  { path: '/sell', title: 'Sell', icon: 'arrow_back', class: '' },
  // { path: '/sellReceipts', title: 'Sell Receipt', icon: 'arrow_back', class: '' },
  { path: '/userlist', title: 'Users', icon: 'group_add', class: '' },
  { path: '/icons', title: 'Reports', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/users', title: 'Users',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private apiCall: ApicallService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getPrivilages();
  }

  getPrivilages() {

    const user = this.apiCall.logedUser();
    if (user) {
      const ar = [];
      this.apiCall.get('user/privilage/' + user.utype.id, (data) => {
        data.privilages.forEach(element => {
          const obj = { path: element.link, title: element.string, icon: element.icon, class: '' };
          ar.push(obj);
          ROUTES = ar;
          this.menuItems = ROUTES.filter(menuItem => menuItem);
        });
      })
    }

  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logOut() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

}
