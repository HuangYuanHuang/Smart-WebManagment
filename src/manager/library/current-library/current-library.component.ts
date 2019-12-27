import { Component, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LibraryServiceProxy } from '../view-library/library-proxy';
import { Observable } from "rxjs";
import {
  MeterialGroupThicknessDtoPagedResultDto, MaterialServiceProxy,
  CuttingDataServiceProxy, EdgeCuttingDataServiceProxy,
  PiercingDataServiceProxy, SlopeControlDataServiceProxy,
  CuttingDataDtoPagedResultDto, EdgeCuttingDataDtoPagedResultDto, PiercingDataDtoPagedResultDto, SlopeControlDataDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { ViewLibraryComponent } from '../view-library/view-library.component';

@Component({
  selector: 'app-current-library',
  templateUrl: './current-library.component.html',
  styleUrls: ['./current-library.component.css'],
  animations: [appModuleAnimation()]

})
export class CurrentLibraryComponent implements OnInit, LibraryServiceProxy {
  @ViewChild('viewlibrary', { static: true }) viewLibrary: ViewLibraryComponent;

  constructor(private materialProxy: MaterialServiceProxy,
    private cuttingDataProxy: CuttingDataServiceProxy,
    private edgeDataProxy: EdgeCuttingDataServiceProxy,
    private piercingProxy: PiercingDataServiceProxy,
    private slopeProxy: SlopeControlDataServiceProxy
  ) { }

  ngOnInit() {
    this.viewLibrary.ShowData(this, '');
  }
  refresh() {
    this.viewLibrary.ShowData(this, '');
  }
  getMaterialAll(isCheckSon: boolean, commitId: string, skipCount: number, maxResultCount: number)
    : Observable<MeterialGroupThicknessDtoPagedResultDto> {
    return this.materialProxy.getMaterialAll(isCheckSon, commitId, skipCount, maxResultCount);
  }
  getCuttingAll(machiningDataGroupId: number, commitId: string, skipCount: number, maxResultCount: number)
    : Observable<CuttingDataDtoPagedResultDto> {
    return this.cuttingDataProxy.getAll(machiningDataGroupId, commitId, skipCount, maxResultCount);
  }
  getEdgeAll(commitId: string, machiningDataGroupId: number, skipCount: number, maxResultCount: number)
    : Observable<EdgeCuttingDataDtoPagedResultDto> {
    return this.edgeDataProxy.getAll(commitId, machiningDataGroupId, skipCount, maxResultCount);
  }
  getPiercingAll(commitId: string, machiningDataGroupId: number, skipCount: number, maxResultCount: number)
    : Observable<PiercingDataDtoPagedResultDto> {
    return this.piercingProxy.getAll(commitId, machiningDataGroupId, skipCount, maxResultCount);
  }
  getSlopeAll(commitId: string, machiningDataGroupId: number, skipCount: number, maxResultCount: number)
    : Observable<SlopeControlDataDtoPagedResultDto> {
    return this.slopeProxy.getAll(commitId, machiningDataGroupId, skipCount, maxResultCount);

  }
}
