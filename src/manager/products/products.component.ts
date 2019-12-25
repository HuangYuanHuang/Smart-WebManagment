import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ProductInfoDto, ProductInfoServiceProxy, ProductInfoDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AppConsts } from '@shared/AppConsts';


class PagedProductInfoRequestDto extends PagedRequestDto {
  deviceId: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [appModuleAnimation()]

})
export class ProductsComponent extends PagedListingComponentBase<ProductInfoDto> {
  productNodes: ProductInfoDto[] = [];

  keyword = '';

  constructor(
    injector: Injector,
    private _productProxy: ProductInfoServiceProxy,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  list(
    request: PagedProductInfoRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    request.deviceId = this.keyword;

    this._productProxy
      .getAll(request.deviceId, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ProductInfoDtoPagedResultDto) => {
        this.productNodes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: ProductInfoDto): void {
    abp.message.confirm(
      this.l('ProductInfoDeleteWarningMessage', role.name),
      (result: boolean) => {
        if (result) {
          this._productProxy
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
  getDownUrl(machine: ProductInfoDto) {
    return AppConsts.remoteServiceBaseUrl + machine.path;
  }
  createProduct(): void {
    this.showCreateOrEditRoleDialog();
  }

  editProduct(machine: ProductInfoDto): void {
    this.showCreateOrEditRoleDialog(machine.id);
  }

  showCreateOrEditRoleDialog(id?: string): void {
    let createOrEditRoleDialog;
    if (id === undefined || id.length <= 0) {
      createOrEditRoleDialog = this._dialog.open(CreateProductComponent);
    } else {
      createOrEditRoleDialog = this._dialog.open(EditProductComponent, {
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
