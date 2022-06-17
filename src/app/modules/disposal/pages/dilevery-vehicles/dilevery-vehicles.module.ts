import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DileveryVehiclesComponent } from './dilevery-vehicles.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
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
    ],
})
export class DileveryVehiclesModule {}
