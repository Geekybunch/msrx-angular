import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanMorePlantsComponent } from './scan-more-plants.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ScanMorePlantsComponent],
    imports: [CommonModule, SharedModule],
})
export class ScanMorePlantsModule {}
