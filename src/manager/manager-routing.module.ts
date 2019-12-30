import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DevicesComponent } from './devices/devices.component';
import { HostMonitorComponent } from './monitor/host-monitor.component';
import { HistorysComponent } from './history/historys.component';
import { LayoutComponent } from 'layout/layout.component';
import { CurrentLibraryComponent } from './library/current-library/current-library.component';
import { HistoryLibraryComponent } from './library/history-library/history-library.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LayoutComponent,
                children: [
                    { path: 'product', component: ProductsComponent, data: { permission: 'Web.Manager.Products' }, canActivate: [AppRouteGuard] },
                    { path: 'device', component: DevicesComponent, data: { permission: 'Web.Manager.Devies' }, canActivate: [AppRouteGuard] },
                    { path: 'monitor', component: HostMonitorComponent, data: { permission: 'Web.Manager.Monitors' }, canActivate: [AppRouteGuard] },
                    { path: 'history', component: HistorysComponent, data: { permission: 'Web.Manager.Historys' }, canActivate: [AppRouteGuard] },
                    { path: 'library', component: CurrentLibraryComponent, data: { permission: 'Web.Manager.Librarys' }, canActivate: [AppRouteGuard] },
                    { path: 'library-record', component: HistoryLibraryComponent, data: { permission: 'Web.Manager.Records' }, canActivate: [AppRouteGuard] }


                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
