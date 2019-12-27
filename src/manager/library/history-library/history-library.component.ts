

import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OperationLogDto, OperationLogServiceProxy, OperationLogDtoPagedResultDto, LibraryHistoryServiceProxy, LibraryBackupHistoryDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';




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
    private _proxy: LibraryHistoryServiceProxy
  ) {
    super(injector);
  }

  list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._proxy
      .getAll( request.maxResultCount,request.skipCount)
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

  delete(role: LibraryBackupHistoryDto): void {

  }

}
