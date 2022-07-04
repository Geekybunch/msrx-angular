import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DosageHistoryComponent } from './dosage-history.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PrescriptionsDrawerModule } from 'app/modules/common/prescriptions-drawer/prescriptions-drawer.module';

@NgModule({
    declarations: [DosageHistoryComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DosageHistoryComponent,
            },
        ]),
        SharedModule,
        PrescriptionsDrawerModule,
    ],
})
export class DosageHistoryModule {}
