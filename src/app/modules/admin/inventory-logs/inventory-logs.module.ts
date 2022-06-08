import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryLogsComponent } from './inventory-logs.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

const InventoryLogsRoutes: Route[] = [
    {
        path: '',
        component: InventoryLogsComponent,
    },
];

@NgModule({
    declarations: [InventoryLogsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(InventoryLogsRoutes),
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSidenavModule,
        MatButtonModule,
    ],
})
export class InventoryLogsModule {}
