

import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
  public type: string = '';
}

@Component({
  selector: 'app-historys',
  templateUrl: './historys.component.html',
  styleUrls: ['./historys.component.css'],
  animations: [appModuleAnimation(), trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),],


})
export class HistorysComponent extends PagedListingComponentBase<OperationLogDto> {
  historyNodes: OperationLogDto[] = [];
  columnsToDisplay = ['serviceName', 'moduleName', 'pageName', 'methodName', 'userId', 'executionDuration', 'creationTime'];
  expandedElement: OperationLogDto | null;
  query: PagedOperationLogInfoRequestDto;
  constructor(
    injector: Injector,
    private _proxy: OperationLogServiceProxy
  ) {
    super(injector);
    this.query = new PagedOperationLogInfoRequestDto();
  }
  getDescription(data: string) {
    if (data && data.length > 200) {
      return data.substring(0, 200)+".....";
    }
    return data;
  }
  list(
    request: PagedOperationLogInfoRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._proxy
      .getAll(this.query.type, this.query.module, this.query.page, this.query.method, this.query.date, this.query.userId, request.skipCount, request.maxResultCount)
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
