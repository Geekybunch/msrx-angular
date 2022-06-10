/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private http: HttpClient) {}
}
