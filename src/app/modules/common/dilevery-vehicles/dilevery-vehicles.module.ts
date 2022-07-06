import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DileveryVehiclesComponent } from './dilevery-vehicles.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddDileveryVehiclesModule } from './add-dilevery-vehicles/add-dilevery-vehicles.module';
import { DeliveriesDrawerModule } from '../deliveries-drawer/deliveries-drawer.module';
const DileveryVehiclesRoutes: Route[] = [
    {
        path: '',
        component: DileveryVehiclesComponent,
    },
];

@NgModule({
    declarations: [DileveryVehiclesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(DileveryVehiclesRoutes),
        SharedModule,
        AddDileveryVehiclesModule,
        DeliveriesDrawerModule,
    ],
})
export class DileveryVehiclesModule {}
