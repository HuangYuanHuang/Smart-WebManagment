

import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OperationLogDto, OperationLogServiceProxy, OperationLogDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';




class PagedOperationLogInfoRequestDto extends PagedRequestDto {
  module: string;
  date: string;
  method: string;
  page: string;
  userId: number;
}

@Component({
  selector: 'app-historys',
  templateUrl: './historys.component.html',
  styleUrls: ['./historys.component.css'],
  animations: [appModuleAnimation()]

})
export class HistorysComponent extends PagedListingComponentBase<OperationLogDto> {
  historyNodes: OperationLogDto[] = [];

  keyword = '';

  constructor(
    injector: Injector,
    private _proxy: OperationLogServiceProxy
  ) {
    super(injector);
  }

  list(
    request: PagedOperationLogInfoRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

    request.module = this.keyword;

    this._proxy
      .getAll(request.module, request.page, request.method, request.date, request.userId, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: OperationLogDtoPagedResultDto) => {
        this.historyNodes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: OperationLogDto): void {

  }

}
