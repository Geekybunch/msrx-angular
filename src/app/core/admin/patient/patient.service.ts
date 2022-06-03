import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {}
    getPatientDetails(payload: any) {
        return this.http.get<any>(adminUrls.patients + payload);
    }
    prescription(id: number) {
        return this.http.get<any>(
            adminUrls.patients + '/' + id + '/prescription'
        );
    }
}
