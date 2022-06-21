import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerLayoutComponent } from './qr-scanner-layout.component';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

const routes: Route[] = [
    {
        path: '',
        component: QrScannerLayoutComponent,
    },
];

@NgModule({
    declarations: [QrScannerLayoutComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [BarcodeScanner],
})
export class QrScannerLayoutModule {}
