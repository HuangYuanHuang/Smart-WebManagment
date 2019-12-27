import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-piercing-library',
  templateUrl: './piercing-library.component.html',
  styleUrls: ['./piercing-library.component.css']
})
export class PiercingLibraryComponent implements OnInit {
  displayedColumns: string[] = ['machiningKindName', 'materialThickness',
    'materialName', 'gasName',
    'nozzleKindName', 'eNo',
    'nozzleDiameter', 'feedrate',
    'power', 'frequency',
    'duty', 'stepFrequency',
    'stepDuty', 'stepTime',
    'stepQuantity', 'piercingTime',
    'gasPressure', 'gasSettingTime',
    'standardDisplacement', 'standardDisplacement2',
    'gapAxis', 'beamSpot',
    'focalPosition', 'liftDistance', 'pbPower'];
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
