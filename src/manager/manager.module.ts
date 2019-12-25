import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalrServcieProxyService } from '@shared/helpers/SignalrServcieProxyService';
import { HostMonitorComponent } from './monitor/host-monitor.component';
import { CycleListComponent } from './monitor/cycle-list/cycle-list.component';
import { CycleResultComponent } from './monitor/cycle-result/cycle-result.component';
import { ProgramResovleComponent } from './monitor/program-resovle/program-resovle.component';
import { ReadWriterComponent } from './monitor/read-writer/read-writer.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DevicesComponent } from './devices/devices.component';
import { CreateDeviceComponent } from './devices/create-device/create-device.component';
import { EditDeviceComponent } from './devices/edit-device/edit-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { AbpModule } from '@abp/abp.module';
import { MomentModule } from 'ngx-moment';
import { FileUploadModule } from 'ng2-file-upload';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManagerRoutingModule } from './manager-routing.module';
import { HistorysComponent } from './history/historys.component';
import { AppLayoutModule } from 'layout/layout.module';


@NgModule({
  declarations: [
    HostMonitorComponent,
    CycleListComponent,
    CycleResultComponent,
    ProgramResovleComponent,
    ReadWriterComponent,

    ProductsComponent,
    CreateProductComponent,
    EditProductComponent,

    DevicesComponent,
    CreateDeviceComponent,
    EditDeviceComponent,

    HistorysComponent,
  ],
  providers: [SignalrServcieProxyService],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    AppLayoutModule,
    ManagerRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MomentModule,
    FileUploadModule
  ],
  entryComponents: [

    CreateProductComponent,
    EditProductComponent,

    CreateDeviceComponent,
    EditDeviceComponent
  ]
})
export class ManagerModule { }
