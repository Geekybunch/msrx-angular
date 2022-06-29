import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddTestResultModule } from './add-test-result/add-test-result.module';
import { AddProcessedResultModule } from './add-processed-result/add-processed-result.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        AddTestResultModule,
        AddProcessedResultModule,
    ],
})
export class EmployeeModule {}
