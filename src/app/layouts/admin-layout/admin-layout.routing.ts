import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { UserlistComponent } from 'app/pages/userlist/userlist.component';
import { ProductComponent } from 'app/pages/product/product.component';
import { BuyComponent } from 'app/pages/buy/buy.component';
import { SellComponent } from 'app/pages/sell/sell.component';
import { BuyReceiptsComponent } from 'app/pages/buy-receipts/buy-receipts.component';
import { SellReceiptsComponent } from 'app/pages/sell-receipts/sell-receipts.component';
import { ReportDashboardComponent } from 'app/pages/report-dashboard/report-dashboard.component';
import { DailyReportComponent } from 'app/pages/daily-report/daily-report.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'userlist', component: UserlistComponent },
    { path: 'product', component: ProductComponent },
    { path: 'buy', component: BuyComponent },
    { path: 'sell', component: SellComponent },
    { path: 'buyReceipts', component: BuyReceiptsComponent },
    { path: 'sellReceipts', component: SellReceiptsComponent },
    { path: 'reportDashboard', component: ReportDashboardComponent },
    { path: 'dailyReport', component: DailyReportComponent },
   
];
