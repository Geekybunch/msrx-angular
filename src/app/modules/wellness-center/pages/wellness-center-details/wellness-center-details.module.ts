import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellnessCenterDetailsComponent } from './wellness-center-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [WellnessCenterDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: WellnessCenterDetailsComponent,
            },
        ]),
        SharedModule,
    ],
})
export class WellnessCenterDetailsModule {}
