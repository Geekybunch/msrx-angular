import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const patientsRoutes: Route[] = [
    {
        path: '',
        component: PatientsComponent,
    },
];

@NgModule({
    declarations: [PatientsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(patientsRoutes),
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class PatientsModule {}
