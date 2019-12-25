import { Component, OnInit, Injector, Optional, Inject } from '@angular/core';
import { MachinePartServiceProxy, MachinePartDto } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})

export class EditDeviceComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  machine: MachinePartDto = new MachinePartDto();


  constructor(
    injector: Injector,
    private _machineProxy: MachinePartServiceProxy,
    private _dialogRef: MatDialogRef<EditDeviceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: string

  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._machineProxy.get(this._id).subscribe(d => this.machine = d);
  }



  save(): void {
    this.saving = true;
    this._machineProxy
      .update(this.machine)
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


