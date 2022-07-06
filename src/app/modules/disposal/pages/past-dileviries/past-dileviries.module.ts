import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastDileviriesComponent } from './past-dileviries.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DeliveriesDrawerModule } from 'app/modules/common/deliveries-drawer/deliveries-drawer.module';

const PastDileviriesRoutes: Route[] = [
    {
        path: '',
        component: PastDileviriesComponent,
    },
];

@NgModule({
    declarations: [PastDileviriesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(PastDileviriesRoutes),
        SharedModule,
        DeliveriesDrawerModule,
    ],
})
export class PastDileviriesModule {}
