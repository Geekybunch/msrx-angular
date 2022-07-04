import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';
import { InventoryService } from 'app/core/inventory/inventory.service';
import { PrescriptionI } from 'app/core/wellness/wellness.interface';

@Component({
    selector: 'app-prescription-details',
    templateUrl: './prescription-details.component.html',
    styleUrls: ['./prescription-details.component.scss'],
})
export class PrescriptionDetailsComponent implements OnInit {
    prescription: PrescriptionI;
    patientID: string;
    prescriptionNull: any;

    plantResponse;
    constructor(
        private inventoryService: InventoryService,
        private commonService: CommonService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((qParams) => {
            if (qParams.patientId) {
                this.patientID = this.patientID || qParams.patientId;
            }
            console.log(this.patientID);
        });
        this.getPrescriptionbyPatient();
    }

    getPrescriptionbyPatient() {
        this.commonService
            .getValidPrescription(this.patientID)
            .subscribe((res) => {
                console.log(res);
                this.prescription = res?.data?.prescription;
                if (!this.prescription) {
                    this.prescriptionNull = '  "Prescription" not found...!';
                }
                console.log(this.prescription);
                // this.bookingID = this.prescription.booking._id;
                // this.patientID = this.prescription.booking.patient._id;
                // this.qrBase64 = genereateQRCode(
                //     QRType.PATIENT,
                //     this.patientID
                // ).toDataURL();
            });
    }
}
