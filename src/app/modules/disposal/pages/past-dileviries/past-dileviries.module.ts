import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastDileviriesComponent } from './past-dileviries.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

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
    ],
})
export class PastDileviriesModule {}
