import { Component, OnInit, OnDestroy } from '@angular/core';
import * as  moment from 'moment';

@Component({
  selector: 'app-cycle-result',
  templateUrl: './cycle-result.component.html',
  styleUrls: ['./cycle-result.component.scss']
})
export class CycleResultComponent implements OnInit, OnDestroy {


  dataNodes: CNCDataNode[] = [];
  clearInteral;
  constructor() { }

  ngOnInit() {
    this.clearInteral = setInterval(() => {
      const arr = [];
      let index = 0;
      for (let i = 0; i < this.dataNodes.length; i++) {
        const d = moment().diff(moment(moment().format("YYYY-MM-DD") + " " + this.dataNodes[i].time), 'seconds');
        if (d > 10) {
          arr[index++] = i;
        }
      }
      arr.forEach(d => this.dataNodes.splice(d, 1));
    }, 10000);
  }
  public setData(node: any) {
    var res = this.dataNodes.filter(d => d.id == node.data.fullNamespace);
    let model: CNCDataNode = null;
    if (res && res.length > 0) {
      model = res[0];
      model.time = node.time;
      model.nodes = node.data.value;
    } else {
      this.dataNodes.unshift(new CNCDataNode(node.time, node.data.fullNamespace, node.data.value));
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.clearInteral);
  }
  private nodeClick(node: CNCDataNode) {
    node.isActive = !node.isActive;
  }
  getString(obj: any) {
    return JSON.stringify(obj).replace('\r\n', '');
  }
  getIsActive() {
    var resActive = this.dataNodes.filter(d => d.isActive);
    return resActive && resActive.length > 0;
  }
}

class CNCDataNode {
  public fullNameSpace: string;
  public isActive = false;
  constructor(public time: string, public id: string, public nodes: any[]) {
    const arr = id.split('.');
    this.fullNameSpace = arr[arr.length - 1];
  }
  getColor() {
    return this.isActive ? 'primary' : '';

  }
}