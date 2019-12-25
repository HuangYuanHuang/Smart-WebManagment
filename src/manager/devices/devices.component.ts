import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { MachinePartDto, MachinePartServiceProxy, MachinePartDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { AppConsts } from '@shared/AppConsts';


class PagedMachinePartRequestDto extends PagedRequestDto {
  deviceId: string;
}
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  animations: [appModuleAnimation()],

  styleUrls: ['./devices.component.css']
})
export class DevicesComponent extends PagedListingComponentBase<MachinePartDto> {
  machinNodes: MachinePartDto[] = [];

  keyword = '';

  constructor(
    injector: Injector,
    private _machineService: MachinePartServiceProxy,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  list(
    request: PagedMachinePartRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    request.deviceId = this.keyword;

    this._machineService
      .getAll(request.deviceId, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: MachinePartDtoPagedResultDto) => {
        this.machinNodes = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  getDownUrl(machine: MachinePartDto) {
    return AppConsts.remoteServiceBaseUrl + machine.path;
  }
  delete(role: MachinePartDto): void {
    abp.message.confirm(
      this.l('MachinePartDeleteWarningMessage', role.name),
      (result: boolean) => {
        if (result) {
          this._machineService
            .delete(role.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }

  createMachine(): void {
    this.showCreateOrEditRoleDialog();
  }

  editMachine(machine: MachinePartDto): void {
    this.showCreateOrEditRoleDialog(machine.id);
  }

  showCreateOrEditRoleDialog(id?: string): void {
    let createOrEditRoleDialog;
    if (id === undefined || id.length <= 0) {
      createOrEditRoleDialog = this._dialog.open(CreateDeviceComponent);
    } else {
      createOrEditRoleDialog = this._dialog.open(EditDeviceComponent, {
        data: id
      });
    }

    createOrEditRoleDialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }
}
