import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsComponent } from './plants.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

const plantsRoutes: Route[] = [
    {
        path: '',
        component: PlantsComponent,
    },
];

@NgModule({
    declarations: [PlantsComponent],
    imports: [
        RouterModule.forChild(plantsRoutes),
        MatPaginatorModule,
        CommonModule,
        MatTableModule,
        MatBadgeModule,
        MatButtonModule,
    ],
})
export class PlantsModule {}
