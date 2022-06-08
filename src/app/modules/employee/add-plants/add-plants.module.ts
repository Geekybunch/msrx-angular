import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlantsComponent } from './add-plants.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FuseHighlightModule } from '@fuse/components/highlight';

const addPlantsRoutes: Route[] = [
    {
        path: '',
        component: AddPlantsComponent,
    },
];

@NgModule({
    declarations: [AddPlantsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(addPlantsRoutes),
        SharedModule,
        FuseHighlightModule,
    ],
})
export class AddPlantsModule {}
