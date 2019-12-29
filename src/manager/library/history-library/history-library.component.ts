

import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { LibraryHistoryServiceProxy, LibraryBackupHistoryDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ListLibraryComponent } from './list-library/list-library.component';
import { HttpClient } from '@angular/common/http';
import { AppConsts } from '@shared/AppConsts';
import { ImportLibraryComponent } from './import-library/import-library.component';



@Component({
  selector: 'app-history-library',
  templateUrl: './history-library.component.html',
  styleUrls: ['./history-library.component.css'],
  animations: [appModuleAnimation()]

})
export class HistoryLibraryComponent extends PagedListingComponentBase<LibraryBackupHistoryDto> {
  historyNodes: LibraryBackupHistoryDto[] = [];

  constructor(
    injector: Injector,
    private _proxy: LibraryHistoryServiceProxy,
    private _dialog: MatDialog,
    private http: HttpClient

  ) {
    super(injector);

  }

  list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._proxy
      .getAll(request.maxResultCount, request.skipCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result) => {
        this.historyNodes = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  viewLibrary(role: LibraryBackupHistoryDto) {
    this._dialog.open(ListLibraryComponent, {
      data: role.id
    });
  }
  delete(role: LibraryBackupHistoryDto): void {

  }
  libraryEvent(obj: LibraryBackupHistoryDto) {
    abp.message.confirm(
      this.l(`确定还原工艺数据至【${obj.id}】 节点吗?`),
      (result: boolean) => {
        if (result) {
          this._proxy
            .recordLibrary(obj.id)
            .subscribe(() => {
              this.notify.info(this.l('RecordSuccessfully'));
            });
        }
      }
    );
  }
  import() {
    const dialog = this._dialog.open(ImportLibraryComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }
  share(role: LibraryBackupHistoryDto) {
    abp.message.confirm(
      this.l(`确定从服务器导出【${role.id}】 节点工艺数据吗?`),
      (result: boolean) => {
        if (result) {
          this.notify.info('服务器正在生成数据，稍后会自动下载');
          const url = `${AppConsts.remoteServiceBaseUrl}/laser/export/${role.id}`;
          this.http.post(url, null,
            { responseType: 'blob', observe: 'response' }).subscribe(data => {
              const link = document.createElement('a');
              const blob = new Blob([data.body], { type: 'application/x-javascript' });
              let fileName = role.id + '.json';

              link.setAttribute('href', window.URL.createObjectURL(blob));
              link.setAttribute('download', fileName);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });

        }
      }
    );
  }

}
