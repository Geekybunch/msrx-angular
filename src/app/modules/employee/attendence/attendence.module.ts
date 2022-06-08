import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceComponent } from './attendence.component';
import { Route, RouterModule } from '@angular/router';

const attendenceRoutes: Route[] = [
    {
        path: '',
        component: AttendenceComponent,
    },
];

@NgModule({
    declarations: [AttendenceComponent],
    imports: [CommonModule, RouterModule.forChild(attendenceRoutes)],
})
export class AttendenceModule {}
