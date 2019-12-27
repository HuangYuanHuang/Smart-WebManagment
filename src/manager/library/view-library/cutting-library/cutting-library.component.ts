import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-cutting-library',
  templateUrl: './cutting-library.component.html',
  styleUrls: ['./cutting-library.component.css']
})
export class CuttingLibraryComponent implements OnInit {
  displayedColumns: string[] = ['machiningKindName', 'materialThickness', 'materialName', 'gasName', 'nozzleKindName',
    'eNo', 'nozzleDiameter', 'feedrate', 'power', 'frequency', 'duty',
    'gasPressure', 'gasSettingTime', 'standardDisplacement', 'supple', 'edgeSlt', 'apprSlt',
    'pwrCtrl', 'standardDisplacement2', 'gapAxis', 'beamSpot', 'focalPosition', 'liftDistance', 'pbPower'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() { }

  ngOnInit() {
  }

  show(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }
}
