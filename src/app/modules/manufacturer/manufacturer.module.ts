import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { AddManufacturerModule } from './add-manufacturer/add-manufacturer.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, ManufacturerRoutingModule, AddManufacturerModule],
})
export class ManufacturerModule {}
