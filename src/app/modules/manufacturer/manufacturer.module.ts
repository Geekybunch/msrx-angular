import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { AddManufacturerModule } from './add-manufacturer/add-manufacturer.module';
import { ScanMorePlantsModule } from '../common/scan-more-plants/scan-more-plants.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ManufacturerRoutingModule,
        AddManufacturerModule,
        ScanMorePlantsModule,
    ],
})
export class ManufacturerModule {}
