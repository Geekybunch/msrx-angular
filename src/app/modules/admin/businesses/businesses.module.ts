import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessesComponent } from './businesses.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

const businessRoutes: Route[] = [
    {
        path: '',
        component: BusinessesComponent,
    },
];

@NgModule({
    declarations: [BusinessesComponent],
    imports: [
        RouterModule.forChild(businessRoutes),
        MatPaginatorModule,
        CommonModule,
        MatTableModule,
        MatBadgeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatMenuModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class BusinessesModule {}
