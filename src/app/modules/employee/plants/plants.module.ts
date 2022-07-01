import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsComponent } from './plants.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { PlantsDrawerModule } from 'app/modules/common/plants-drawer/plants-drawer.module';

const plantsdRoutes: Route[] = [
    {
        path: '',
        component: PlantsComponent,
    },
];

@NgModule({
    declarations: [PlantsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(plantsdRoutes),
        SharedModule,
        PlantsDrawerModule,
    ],
})
export class PlantsModule {}
