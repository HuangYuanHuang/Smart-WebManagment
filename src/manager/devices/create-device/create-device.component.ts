import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef } from '@angular/material';
import { MachinePartDto, MachinePartServiceProxy, CreateMachinePartDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { AppConsts } from '@shared/AppConsts';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})

export class CreateDeviceComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  uploader: FileUploader;

  machine: CreateMachinePartDto = new CreateMachinePartDto();


  constructor(
    injector: Injector,
    private _machineProxy: MachinePartServiceProxy,
    private _dialogRef: MatDialogRef<CreateDeviceComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: AppConsts.remoteServiceBaseUrl + '/Home/UploadImage',
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

  close(result: any): void {
    this._dialogRef.close(result);
  }
  onFileSelected() {
    this.machine.path = 'default';
  }
}
