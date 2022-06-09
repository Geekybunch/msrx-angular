import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlantsComponent } from './add-plants.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class AddPlantsModule {}
