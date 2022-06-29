import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    ActivatedRoute,
    NavigationStart,
    Router,
    Event,
    NavigationEnd,
} from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonPlantDetailI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { BusinessTypeEnums, QRType } from 'app/shared/shared.enums';
import { genereateQRCode } from 'app/shared/shared.utils';
import { cloneDeep } from 'lodash';
import { AddProcessedResultComponent } from '../add-processed-result/add-processed-result.component';
import { AddTestResultComponent } from '../add-test-result/add-test-result.component';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddManufacturerComponent } from 'app/modules/manufacturer/add-manufacturer/add-manufacturer.component';

@Component({
    selector: 'app-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss'],
})
export class TestDetailsComponent implements OnInit, OnDestroy {
    plantID: string;
    plantResponse: any;
    viewDetails: any;
    showNext = false;
    userInfo: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private router: Router,
        private matDialog: MatDialog,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {
        this.commonService.$testPantID.subscribe((res: string) => {
            this.plantID = res;
        });
        this.userInfo = this.authService.userRole;
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((qParams) => {
            if (qParams.plantID) {
                this.plantID = this.plantID || qParams.plantID;
            }
            this.showNext = qParams.showNext;
            this.getPlantDetails();
        });
    }
    ngOnDestroy(): void {
        this.getPlantDetails();
    }

    getPlantDetails() {
        return this.commonService.getCommonPlantDetails(this.plantID).subscribe(
            (res) => {
                console.log(res);
                this.plantResponse = res.data.plant;
            },
            (err: any) => {
                this.router.navigate(['/'], {
                    replaceUrl: true,
                });
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-red'],
                });

                console.log(err);
            }
        );
    }
    openTestResultDialog(plantData: any) {
        if (this.userInfo.modelId.employer.businessType === 'Tester') {
            let EditPlant = this.matDialog.open(AddTestResultComponent, {
                autoFocus: false,
                data: {
                    plantData: cloneDeep(plantData),
                },
            });
            EditPlant.afterClosed().subscribe((result) => {
                this.getPlantDetails();
            });
        } else if (
            this.userInfo.modelId.employer.businessType === 'Processor'
        ) {
            let EditPlant = this.matDialog.open(AddProcessedResultComponent, {
                autoFocus: false,
                data: {
                    plantData: cloneDeep(plantData),
                },
            });
            EditPlant.afterClosed().subscribe((result) => {
                this.getPlantDetails();
            });
        }
    }
    async downloadQrCode() {
        const qr = genereateQRCode(QRType.PLANT, this.plantID);

        try {
            // const res = await this.savePicture(qr.toDataURL());
            // alert(`QR Downloaded! ${res.filepath}`);
            // this.toastr.show(`QR Downloaded! ${res.filepath}`);
            this.openProtoViewer(qr.toDataURL());
        } catch (e) {
            // `e` may be a string or Error object
        }
    }
    openProtoViewer(arg0: any) {
        throw new Error('Method not implemented.');
    }
    private async savePicture(base64Data: string) {
        await Filesystem.requestPermissions();
        const filePath = 'mmsrx';
        try {
            await Filesystem.mkdir({
                path: filePath,
                directory: Directory.ExternalStorage,
            });
        } catch (error) {
            console.error('Error in creating directory', error);
        }

        const fileName = `${filePath}/Batch #${this.plantResponse.batchNumber}.png`;
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.ExternalStorage,
        });
        return {
            filepath: fileName,
            webviewPath: savedFile.uri,
        };
    }
}
