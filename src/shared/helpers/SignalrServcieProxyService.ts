import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../AppConsts';

@Injectable({

  providedIn: 'root'

})
export class SignalrServcieProxyService {
  constructor() {

  }

  public initCncSignalr() {
    abp.signalr.startConnection('/hubs-cncHub?webGroup=web', (connection) => {
      connection.on('GetCNCData', (message: any) => {
        abp.event.trigger(AppConsts.abpEvent.GetCNCDataEvent, message);
      });
      connection.on('GetReadWriter', (message: any) => {
        abp.event.trigger(AppConsts.abpEvent.GetReadWriter, message);
      });
      connection.on('GetProgram', (message: any) => {
        abp.event.trigger(AppConsts.abpEvent.GetProgram, message);
      });
      connection.on('GetError', (message: string) => {
        abp.event.trigger(AppConsts.abpEvent.GetCncErrorEvent, message);
      });
    }).then((connection) => {
    });

  }

}
