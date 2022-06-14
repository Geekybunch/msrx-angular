import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddManufacturerModule } from './add-manufacturer/add-manufacturer.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, EmployeeRoutingModule, AddManufacturerModule],
})
export class EmployeeModule {}
