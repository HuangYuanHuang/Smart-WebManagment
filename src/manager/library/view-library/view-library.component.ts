import { Component, OnInit } from '@angular/core';
import { MaterialServiceProxy, MeterialGroupThicknessDto, ThicknessItem } from '@shared/service-proxies/service-proxies';
import { LibraryServiceProxy } from './library-proxy';
import { MatSelectChange } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-library',
  templateUrl: './view-library.component.html',
  styleUrls: ['./view-library.component.css']
})
export class ViewLibraryComponent implements OnInit {
  private thickness: ThicknessItem[];
  private serviceProxy: LibraryServiceProxy;
  private selectedMeterial;
  private selectedThickness;
  private meterialNodes: MeterialGroupThicknessDto[];
  constructor() { }

  ngOnInit() {

  }

  ShowData(proxy: LibraryServiceProxy, commit: string) {
    this.serviceProxy = proxy;
    this.serviceProxy.getMaterialAll(true, commit, 0, 100).subscribe(d => {
      this.meterialNodes = d.items;
      if (this.meterialNodes.length > 0) {
        this.selectedMeterial = this.meterialNodes[0].code;
        this.materialChange(new MatSelectChange(null, this.selectedMeterial));
        this.thicknessChange(new MatSelectChange(null,this.selectedThickness));
      }
    })
  }
  materialChange(selectChange: MatSelectChange) {
    var find = _.filter(this.meterialNodes, (s, d) => s.code == selectChange.value);
    if (find && find.length > 0) {
      this.thickness = find[0].thicknessNodes;
      if (this.thickness.length > 0) {
        this.selectedThickness = this.thickness[0].id;

      }
    }

  }
  thicknessChange(selectChange: MatSelectChange) {
    var find = _.filter(this.thickness, (s, d) => s.id == selectChange.value);
    if (find && find.length > 0) {
    
    }
  }
}
