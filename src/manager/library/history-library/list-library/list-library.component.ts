import { Component, OnInit, Injector, Optional, Inject, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LibraryHistoryServiceProxy, CreateLibraryBackupHistoryDto, MaterialBackupServiceProxy, CuttingDataBackupServiceProxy, EdgeCuttingDataBackupServiceProxy, PiercingDataBackupServiceProxy, SlopeControlDataBackupServiceProxy, MeterialGroupThicknessDtoPagedResultDto, CuttingDataDtoPagedResultDto, EdgeCuttingDataDtoPagedResultDto, PiercingDataDtoPagedResultDto, SlopeControlDataDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { ViewLibraryComponent } from 'manager/library/view-library/view-library.component';
import { Observable } from 'rxjs';
import { LibraryServiceProxy } from 'manager/library/view-library/library-proxy';


@Component({
  selector: 'app-list-library',
  templateUrl: './list-library.component.html',
  styleUrls: ['./list-library.component.css']
})

export class ListLibraryComponent extends AppComponentBase implements OnInit, LibraryServiceProxy {
  @ViewChild('viewlibrary', { static: true }) viewLibrary: ViewLibraryComponent;

  saving = false;
  constructor(
    injector: Injector,
    private materialProxy: MaterialBackupServiceProxy,
    private cuttingDataProxy: CuttingDataBackupServiceProxy,
    private edgeDataProxy: EdgeCuttingDataBackupServiceProxy,
    private piercingProxy: PiercingDataBackupServiceProxy,
    private slopeProxy: SlopeControlDataBackupServiceProxy,
    private _machineProxy: LibraryHistoryServiceProxy,
    private _dialogRef: MatDialogRef<ListLibraryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: string

  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.viewLibrary.ShowData(this, this._id);

  }
  libraryEvent(obj: any) {
    abp.message.confirm(
      this.l(`确定还原工艺数据至【${this._id}】 节点吗?`),
      (result: boolean) => {
        if (result) {
          this.save();
        }
      }
    );
  }
  getMaterialAll(isCheckSon: boolean, commitId: string, skipCount: number, maxResultCount: number)
    : Observable<MeterialGroupThicknessDtoPagedResultDto> {
    return this.materialProxy.getMaterialAll(isCheckSon, commitId, skipCount, maxResultCount);
  }
  getCuttingAll(machiningDataGroupId: string, commitId: string, skipCount: number, maxResultCount: number)
    : Observable<CuttingDataDtoPagedResultDto> {
    return this.cuttingDataProxy.getAll(machiningDataGroupId, commitId, skipCount, maxResultCount);
  }
  getEdgeAll(commitId: string, machiningDataGroupId: string, skipCount: number, maxResultCount: number)
    : Observable<EdgeCuttingDataDtoPagedResultDto> {
    return this.edgeDataProxy.getAll(commitId, machiningDataGroupId, skipCount, maxResultCount);
  }
  getPiercingAll(commitId: string, machiningDataGroupId: string, skipCount: number, maxResultCount: number)
    : Observable<PiercingDataDtoPagedResultDto> {
    return this.piercingProxy.getAll(commitId, machiningDataGroupId, skipCount, maxResultCount);
  }
  getSlopeAll(commitId: string, machiningDataGroupId: string, skipCount: number, maxResultCount: number)
    : Observable<SlopeControlDataDtoPagedResultDto> {
    return this.slopeProxy.getAll(commitId, machiningDataGroupId, skipCount, maxResultCount);

  }

  save(): void {
    this.saving = true;
    this._machineProxy
      .recordLibrary(this._id)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('RecordSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

}
