import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  RoleServiceProxy,
  RoleDto,

  PermissionDto,
  CreateRoleDto,
  PermissionDtoListResultDto
} from '@shared/service-proxies/service-proxies';
import { PermissionTreeComponent } from '../permission-tree/permission-tree.component';

@Component({
  templateUrl: 'create-role-dialog.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
  ]
})
export class CreateRoleDialogComponent extends AppComponentBase
  implements OnInit {
  @ViewChild('permissionTree', { static: true }) permissionTree: PermissionTreeComponent;
  saving = false;
  role: RoleDto = new RoleDto();
  grantedPermissionNames: string[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    private _dialogRef: MatDialogRef<CreateRoleDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getAllPermissions()
      .subscribe((result: PermissionDtoListResultDto) => {
        this.permissionTree.show(result.items);
      });
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _.forEach(this.permissionTree.getCheckListSelection(), function (value, key) {
      if (value && value.key != '') {
        permissions.push(value.key);
      }
    });
    return permissions;
  }

  save(): void {
    this.saving = true;

    this.role.grantedPermissions = this.getCheckedPermissions();
    const role_ = new CreateRoleDto();
    role_.init(this.role);

    this._roleService
      .create(role_)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
