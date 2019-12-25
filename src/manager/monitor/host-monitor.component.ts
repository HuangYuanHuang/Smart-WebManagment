import { Component, OnInit, ViewChild, OnDestroy, Injector } from '@angular/core';
import { AppConsts } from '../../shared/AppConsts';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { CycleResultComponent } from './cycle-result/cycle-result.component';
import { ReadWriterComponent } from './read-writer/read-writer.component';
import { ProgramResovleComponent } from './program-resovle/program-resovle.component';
import { SignalrServcieProxyService } from '@shared/helpers/SignalrServcieProxyService';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';

@Component({
  selector: 'app-host-monitor',
  templateUrl: './host-monitor.component.html',
  styleUrls: ['./host-monitor.component.scss'],
  animations: [appModuleAnimation()]

})
export class HostMonitorComponent extends AppComponentBase implements OnInit, OnDestroy {

  @ViewChild('cycleList', { static: true }) cycleList: CycleListComponent;
  @ViewChild('cycleResult', { static: true }) cycleResult: CycleResultComponent;
  @ViewChild('readWriter', { static: true }) readWriter: ReadWriterComponent;
  @ViewChild('programResovle', { static: true }) programResovle: ProgramResovleComponent;

  errNodes: any[] = [];
  getCncError: any;
  getCncData: any;
  getCncReadWriter: any;
  getCncProgram: any;
  constructor(private serviceProxy: SignalrServcieProxyService, injector: Injector) {
    super(injector);
    this.getCncError = (s) => {
      if (this.errNodes.length > 20) {
        this.errNodes = [];
      }
      abp.notify.error(s, this.getCurrentTime());
      //this.errNodes.unshift({ time: this.getCurrentTime(), text: s });
    };
    this.getCncData = (d) => {
      this.cycleResult.setData(d);
    };
    this.getCncReadWriter = (d) => {
      this.readWriter.setData(d);
    };
    this.getCncProgram = (d) => {
      this.programResovle.setData(d);
    }
    abp.event.on(AppConsts.abpEvent.GetCncErrorEvent, this.getCncError);
    abp.event.on(AppConsts.abpEvent.GetCNCDataEvent, this.getCncData);
    abp.event.on(AppConsts.abpEvent.GetReadWriter, this.getCncReadWriter);
    abp.event.on(AppConsts.abpEvent.GetProgram, this.getCncProgram);
    SignalRAspNetCoreHelper.initSignalR(() => {
      serviceProxy.initCncSignalr();

    })
    SignalRAspNetCoreHelper.initSignalR(() => {
      abp.signalr.startConnection('/hubs-cncClientHub', (connection) => {

        connection.on('GetCncEvent', (message) => {
          // console.log(message);
          this.cycleList.setData(message);
        });

      })
    });

  }
  ngOnInit() {
    console.log(AppConsts.remoteServiceBaseUrl);


  }
  getCurrentTime() {
    return new Date().toTimeString();
  }
  removeAll() {
    this.errNodes = [];
  }
  ngOnDestroy(): void {
    abp.event.off(AppConsts.abpEvent.GetCncErrorEvent, this.getCncError);
    abp.event.off(AppConsts.abpEvent.GetCNCDataEvent, this.getCncData);
    abp.event.off(AppConsts.abpEvent.GetReadWriter, this.getCncReadWriter);
    abp.event.off(AppConsts.abpEvent.GetProgram, this.getCncProgram);

  }
}
