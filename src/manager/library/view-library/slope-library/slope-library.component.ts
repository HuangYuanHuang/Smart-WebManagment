import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-slope-library',
  templateUrl: './slope-library.component.html',
  styleUrls: ['./slope-library.component.css']
})
export class SlopeLibraryComponent implements OnInit {

  displayedColumns: string[] = ['machiningKindName', 'materialThickness', 'materialName', 'nozzleKindName',
    'eNo', 'nozzleDiameter', 'feedrate',
    'power', 'frequency', 'duty', 'standardDisplacement',
    'supple', 'edgeSlt', 'apprSlt',
    'pwrCtrl', 'standardDisplacement2', 'gapAxis',
    'beamSpot', 'focalPosition', 'liftDistance', 'pbPower'];
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
