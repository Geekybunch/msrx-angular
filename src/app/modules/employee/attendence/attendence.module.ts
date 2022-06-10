import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceComponent } from './attendence.component';
import { Route, RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

const attendenceRoutes: Route[] = [
    {
        path: '',
        component: AttendenceComponent,
    },
];

@NgModule({
    declarations: [AttendenceComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(attendenceRoutes),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        SharedModule,
        NgApexchartsModule,
    ],
})
export class AttendenceModule {}
