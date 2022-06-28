import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerLayoutComponent } from './qr-scanner-layout.component';
import { Route, RouterModule } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { MatSelectModule } from '@angular/material/select';

const routes: Route[] = [
    {
        path: '',
        component: QrScannerLayoutComponent,
    },
];

@NgModule({
    declarations: [QrScannerLayoutComponent],
    imports: [CommonModule, MatSelectModule, RouterModule.forChild(routes)],
    providers: [BarcodeScanner],
})
export class QrScannerLayoutModule {}
