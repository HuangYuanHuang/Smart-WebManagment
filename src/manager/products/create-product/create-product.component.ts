
import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef } from '@angular/material';
import { MachinePartDto, MachinePartServiceProxy, CreateMachinePartDto, ProductInfoServiceProxy, CreateProductInfoDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  machine: CreateProductInfoDto = new CreateProductInfoDto();
  uploader: FileUploader;

  constructor(
    injector: Injector,
    private _machineProxy: ProductInfoServiceProxy,
    private _dialogRef: MatDialogRef<CreateProductComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: AppConsts.remoteServiceBaseUrl + '/Home/UploadDocument',
      headers: [{ name: 'contentType', value: 'multipart/form-data' }]
    });



    this.uploader.response.subscribe(res => {
      var obj = JSON.parse(res);
      this.machine.path = obj.result.name;
      this._machineProxy
        .create(this.machine)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.close(true);
        });
    });
  }



  save(): void {
    this.uploader.uploadAll();
    this.saving = true;

  }
  onFileSelected() {
    this.machine.path = 'default';
  }
  close(result: any): void {
    this._dialogRef.close(result);
  }
}
