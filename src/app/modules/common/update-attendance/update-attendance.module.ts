import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAttendanceComponent } from './update-attendance.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [UpdateAttendanceComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: UpdateAttendanceComponent,
            },
        ]),
        SharedModule,
    ],
})
export class UpdateAttendanceModule {}
