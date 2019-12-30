import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Injector } from '@angular/core';
import { MaterialServiceProxy, MeterialGroupThicknessDto, ThicknessItem } from '@shared/service-proxies/service-proxies';
import { LibraryServiceProxy } from './library-proxy';
import { MatSelectChange } from '@angular/material';
import * as _ from 'lodash';
import { CuttingLibraryComponent } from './cutting-library/cutting-library.component';
import { PiercingLibraryComponent } from './piercing-library/piercing-library.component';
import { EdgeLibraryComponent } from './edge-library/edge-library.component';
import { SlopeLibraryComponent } from './slope-library/slope-library.component';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-view-library',
  templateUrl: './view-library.component.html',
  styleUrls: ['./view-library.component.css']
})
export class ViewLibraryComponent extends AppComponentBase implements OnInit {
  @ViewChild('cuttinglibrary', { static: true }) cuttinglibrary: CuttingLibraryComponent;
  @ViewChild('piercinglibrary', { static: true }) piercinglibrary: PiercingLibraryComponent;
  @ViewChild('edgelibrary', { static: true }) edgelibrary: EdgeLibraryComponent;
  @ViewChild('slopelibrary', { static: true }) slopelibrary: SlopeLibraryComponent;

  @Input('icon') icon = 'add';
  @Input('title') title = '备份';
  @Input('auth') auth = 'Web.Manager.Librarys.Record';
  @Output() libraryEvent: EventEmitter<any> = new EventEmitter<any>();
  private thickness: ThicknessItem[];
  private serviceProxy: LibraryServiceProxy;
  private selectedMeterial;
  private selectedThickness;
  private meterialNodes: MeterialGroupThicknessDto[];
  private commit: string;
  private skipCount = 0;
  private maxCount = 10;
  constructor(injector: Injector) {
    super(injector);

  }

  ngOnInit() {
  }
  opeartionClick() {
    this.libraryEvent.emit('');
  }
  ShowData(proxy: LibraryServiceProxy, commit: string) {
    this.commit = commit;
    this.serviceProxy = proxy;
    this.serviceProxy.getMaterialAll(true, commit, 0, 100).subscribe(d => {
      this.meterialNodes = d.items;
      if (this.meterialNodes.length > 0) {
        this.selectedMeterial = this.meterialNodes[0].code;
        this.materialChange(new MatSelectChange(null, this.selectedMeterial));
      }
    })
  }
  materialChange(selectChange: MatSelectChange) {
    var find = _.filter(this.meterialNodes, (s, d) => s.code == selectChange.value);
    if (find && find.length > 0) {
      this.thickness = find[0].thicknessNodes;
      if (this.thickness.length > 0) {
        this.selectedThickness = this.thickness[0].id;
        this.thicknessChange(new MatSelectChange(null, this.selectedThickness));

      }
    }

  }
  thicknessChange(selectChange: MatSelectChange) {
    var find = _.filter(this.thickness, (s, d) => s.id == selectChange.value);
    if (find && find.length > 0) {
      const id = find[0].id;
      this.serviceProxy.getCuttingAll(id, this.commit, this.skipCount, this.maxCount).subscribe(item => {
        this.cuttinglibrary.show(item.items);
      });
      this.serviceProxy.getEdgeAll(this.commit, id, this.skipCount, this.maxCount).subscribe(item => {
        this.edgelibrary.show(item.items);
      });
      this.serviceProxy.getPiercingAll(this.commit, id, this.skipCount, this.maxCount).subscribe(item => {
        this.piercinglibrary.show(item.items);
      });
      this.serviceProxy.getSlopeAll(this.commit, id, this.skipCount, this.maxCount).subscribe(item => {
        this.slopelibrary.show(item.items);
      })
    }
  }
}
