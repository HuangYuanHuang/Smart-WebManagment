

import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OperationLogDto, OperationLogServiceProxy, OperationLogDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material';

import * as moment from 'moment';


class PagedOperationLogInfoRequestDto extends PagedRequestDto {
  public module: string = '';
  public date: string = '';
  public method: string = '';
  public page: string = '';
  public userId: number = 0;
}

@Component({
  selector: 'app-historys',
  templateUrl: './historys.component.html',
  styleUrls: ['./historys.component.css'],
  animations: [appModuleAnimation()]

})
export class HistorysComponent extends PagedListingComponentBase<OperationLogDto> {
  historyNodes: OperationLogDto[] = [];

  query: PagedOperationLogInfoRequestDto;
  constructor(
    injector: Injector,
    private _proxy: OperationLogServiceProxy
  ) {
    super(injector);
    this.query = new PagedOperationLogInfoRequestDto();
  }

  list(
    request: PagedOperationLogInfoRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    console.log(this.query);
    this._proxy
      .getAll(this.query.module, this.query.page, this.query.method, this.query.date, this.query.userId, request.skipCount, request.maxResultCount)
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
  dateChange(data: MatDatepickerInputEvent<Date>) {
    if (data.value) {
      this.query.date = moment(data.value).format('YYYY-MM-DD');

    } else {
      this.query.date = '';
    }

  }
  delete(role: OperationLogDto): void {

  }

}
