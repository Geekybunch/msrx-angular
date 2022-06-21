/* eslint-disable @typescript-eslint/naming-convention */
import { EventEmitter, Injectable } from '@angular/core';

export enum CUSTOM_EVENTS {
  HANDLER_QR
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventMap = new Map<CUSTOM_EVENTS, EventEmitter<any>>();

  constructor() { }

  getEvent(event: CUSTOM_EVENTS) {
    if (!this.eventMap.has(event)) {
      this.eventMap.set(event, new EventEmitter());
    }
    return this.eventMap.get(event);
  }

  subscribeEvent(event: CUSTOM_EVENTS) {
    return this.getEvent(event);
  }

  publishEvent(event: CUSTOM_EVENTS, data: any) {
    this.getEvent(event).emit(data);
  }
}
