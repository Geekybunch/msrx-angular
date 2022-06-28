import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListingComponent } from './booking-listing.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddPrescriptionFormModule } from './add-prescription-form/add-prescription-form.module';

const routes: Route[] = [
    {
        path: '',
        component: BookingListingComponent,
    },
];

@NgModule({
    declarations: [BookingListingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        AddPrescriptionFormModule,
    ],
})
export class BookingListingModule {}
