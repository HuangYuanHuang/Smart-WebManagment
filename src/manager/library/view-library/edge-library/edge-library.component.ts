import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-edge-library',
  templateUrl: './edge-library.component.html',
  styleUrls: ['./edge-library.component.css']
})
export class EdgeLibraryComponent implements OnInit {
  displayedColumns: string[] = ['machiningKindName', 'materialThickness', 
  'materialName', 'gasName', 
  'nozzleKindName',  'eNo', 
  'nozzleDiameter','angle',
  'power', 'frequency', 
  'duty', 'gasPressure', 
  'piercingTime', 'recoveryDistance', 'recoveryFrequency',
  'recoveryFeedrate', 'recoveryDuty', 
  'gap','gapAxis', 
  'beamSpot', 'focalPosition', 
  'liftDistance', 'pbPower'];
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
