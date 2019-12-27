import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.ProductInfoServiceProxy,
        ApiServiceProxies.MachinePartServiceProxy,
        ApiServiceProxies.OperationLogServiceProxy,
        ApiServiceProxies.LibraryHistoryServiceProxy,
        ApiServiceProxies.MaterialBackupServiceProxy,
        ApiServiceProxies.MaterialServiceProxy,

        ApiServiceProxies.CuttingDataBackupServiceProxy,
        ApiServiceProxies.CuttingDataServiceProxy,
        ApiServiceProxies.EdgeCuttingDataBackupServiceProxy,
        ApiServiceProxies.EdgeCuttingDataServiceProxy,
        ApiServiceProxies.PiercingDataBackupServiceProxy,
        ApiServiceProxies.PiercingDataServiceProxy,
        ApiServiceProxies.SlopeControlDataBackupServiceProxy,
        ApiServiceProxies.SlopeControlDataServiceProxy,

        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
