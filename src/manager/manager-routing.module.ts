import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DevicesComponent } from './devices/devices.component';
import { HostMonitorComponent } from './monitor/host-monitor.component';
import { HistorysComponent } from './history/historys.component';
import { LayoutComponent } from 'layout/layout.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LayoutComponent,
                children: [
                    { path: 'product', component: ProductsComponent },
                    { path: 'device', component: DevicesComponent },
                    { path: 'monitor', component: HostMonitorComponent },
                    { path: 'history', component: HistorysComponent }

                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
