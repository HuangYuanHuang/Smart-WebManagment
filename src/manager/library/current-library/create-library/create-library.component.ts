import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef } from '@angular/material';
import { LibraryHistoryServiceProxy, CreateLibraryBackupHistoryDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.css']
})

export class CreateLibraryComponent extends AppComponentBase
  implements OnInit {
  saving = false;

  machine: CreateLibraryBackupHistoryDto = new CreateLibraryBackupHistoryDto();


  constructor(
    injector: Injector,
    private _machineProxy: LibraryHistoryServiceProxy,
    private _dialogRef: MatDialogRef<CreateLibraryComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }



  save(): void {
    this.saving = true;
    this.machine.userId = abp.session.userId;
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
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
