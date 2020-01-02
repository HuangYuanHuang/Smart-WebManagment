
import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef } from '@angular/material';
import { LibraryHistoryServiceProxy, CreateLibraryBackupHistoryDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { AppConsts } from '@shared/AppConsts';


@Component({
  selector: 'app-import-library',
  templateUrl: './import-library.component.html',
  styleUrls: ['./import-library.component.css']
})

export class ImportLibraryComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  isFile = false;
  uploader: FileUploader;

  machine: CreateLibraryBackupHistoryDto = new CreateLibraryBackupHistoryDto();


  constructor(
    injector: Injector,
    private http: HttpClient,
    private _machineProxy: LibraryHistoryServiceProxy,
    private _dialogRef: MatDialogRef<ImportLibraryComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: AppConsts.remoteServiceBaseUrl + '/laser/ImportJson',
      headers: [{ name: 'contentType', value: 'multipart/form-data' }]
    });
    this.uploader.response.subscribe((res: any) => {
      if (!res && res.length <= 0) {
        this.notify.error('遇到错误，导入失败!');
        this.saving = false;
        return;
      }
      var obj = JSON.parse(res);

      if (obj.result.status == 200) {
        this.notify.info(this.l('ImportSuccessfully'));
        this.close(true);
        return;
      }
      this.notify.error(obj.result.detail);
      this.saving = false;

    });
  }



  save(): void {
    this.saving = true;
    const descprition = encodeURIComponent(this.machine.description);
    const url = AppConsts.remoteServiceBaseUrl + `/laser/ImportJson?userId=${abp.session.userId}&tag=${encodeURIComponent(this.machine.tag)}&descprition= ${descprition}`;
    this.uploader.setOptions({ url: url });
    this.uploader.uploadAll();
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
  onFileSelected() {
    this.isFile = true;
  }
}
