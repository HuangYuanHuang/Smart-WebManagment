
import { Component, OnInit, Injector, Optional, Inject } from '@angular/core';
import { MachinePartServiceProxy, MachinePartDto, ProductInfoServiceProxy, ProductInfoDto } from '@shared/service-proxies/service-proxies';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  machine: ProductInfoDto = new ProductInfoDto();


  constructor(
    injector: Injector,
    private _machineProxy: ProductInfoServiceProxy,
    private _dialogRef: MatDialogRef<EditProductComponent>,
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


