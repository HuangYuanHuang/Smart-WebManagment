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
// ColumnArray.Add("ENo", new ColumnItemModel() { Title = "E编号", Key = "ENo" });
// ColumnArray.Add("MachiningKindName", new ColumnItemModel() { Title = "加工类型", Key = "MachiningKindName", ItemEnum = ColumnItemTypeEnum.Combox, ValueConstraint = false, SelectPropName = "MachiningKindCode" });
// ColumnArray.Add("MaterialName", new ColumnItemModel() { Title = "材料类型", Key = "MaterialName", ItemEnum = ColumnItemTypeEnum.ReadOnly });
// ColumnArray.Add("MaterialThickness", new ColumnItemModel() { Title = "材料厚度", Key = "MaterialThickness", ItemEnum = ColumnItemTypeEnum.ReadOnly });
// ColumnArray.Add("FocalPosition", new ColumnItemModel() { Title = "焦点位置", Key = "FocalPosition" });
// ColumnArray.Add("BeamSpot", new ColumnItemModel() { Title = "焦斑直径", Key = "BeamSpot" });
// ColumnArray.Add("LiftDistance", new ColumnItemModel() { Title = "蛙跳高度", Key = "LiftDistance" });
// ColumnArray.Add("NozzleKindName", new ColumnItemModel() { Title = "割嘴类型", Key = "NozzleKindName", ItemEnum = ColumnItemTypeEnum.Combox, ValueConstraint = false, SelectPropName = "NozzleKindCode" });
// ColumnArray.Add("NozzleDiameter", new ColumnItemModel() { Title = "割嘴内径", Key = "NozzleDiameter" });
// ColumnArray.Add("Feedrate", new ColumnItemModel() { Title = "速度", Key = "Feedrate" });
// ColumnArray.Add("Power", new ColumnItemModel() { Title = "功率", Key = "Power" });
// ColumnArray.Add("Frequency", new ColumnItemModel() { Title = "频率", Key = "Frequency" });
// ColumnArray.Add("Duty", new ColumnItemModel() { Title = "占空比", Key = "Duty" });
// ColumnArray.Add("GasPressure", new ColumnItemModel() { Title = "辅助气体压力", Key = "GasPressure" });
// ColumnArray.Add("GasName", new ColumnItemModel() { Title = "辅助气体种类", Key = "GasName", ItemEnum = ColumnItemTypeEnum.Combox, ValueConstraint = false, SelectPropName = "GasCode" });
// ColumnArray.Add("GasSettingTime", new ColumnItemModel() { Title = "辅助气体时间", Key = "GasSettingTime" });
// ColumnArray.Add("StandardDisplacement", new ColumnItemModel() { Title = "基准偏移量", Key = "StandardDisplacement" });
// ColumnArray.Add("Supple", new ColumnItemModel() { Title = "补偿量", Key = "Supple" });
// ColumnArray.Add("EdgeSlt", new ColumnItemModel() { Title = "尖角", Key = "EdgeSlt" });
// ColumnArray.Add("ApprSlt", new ColumnItemModel() { Title = "起始", Key = "ApprSlt" });
// ColumnArray.Add("PwrCtrl", new ColumnItemModel() { Title = "功率控制", Key = "PwrCtrl" });
// ColumnArray.Add("Angle", new ColumnItemModel() { Title = "判定角度", Key = "Angle" });
// ColumnArray.Add("RecoveryDistance", new ColumnItemModel() { Title = "复归距离", Key = "RecoveryDistance" });
// ColumnArray.Add("RecoveryFeedrate", new ColumnItemModel() { Title = "复归速度", Key = "RecoveryFeedrate" });
// ColumnArray.Add("RecoveryFrequency", new ColumnItemModel() { Title = "复归频率", Key = "RecoveryFrequency" });
// ColumnArray.Add("RecoveryDuty", new ColumnItemModel() { Title = "复归占空比", Key = "RecoveryDuty" });
// ColumnArray.Add("StepFrequency", new ColumnItemModel() { Title = "步进频率", Key = "StepFrequency" });
// ColumnArray.Add("StepDuty", new ColumnItemModel() { Title = "步进占空比", Key = "StepDuty" });
// ColumnArray.Add("StepTime", new ColumnItemModel() { Title = "步进时间", Key = "StepTime" });
// ColumnArray.Add("StepQuantity", new ColumnItemModel() { Title = "步进次数", Key = "StepQuantity" });
// ColumnArray.Add("PiercingTime", new ColumnItemModel() { Title = "穿孔时间", Key = "PiercingTime" });
// ColumnArray.Add("StandardDisplacement2", new ColumnItemModel() { Title = "基准偏移量2", Key = "StandardDisplacement2" });
// ColumnArray.Add("GapAxis", new ColumnItemModel() { Title = "间隙轴", Key = "GapAxis" });
// ColumnArray.Add("PbPower", new ColumnItemModel() { Title = "谷底功率", Key = "PbPower" });
// ColumnArray.Add("Gap", new ColumnItemModel() { Title = "间隙", Key = "Gap" });