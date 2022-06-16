import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProcessedResultComponent } from './add-processed-result.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [AddProcessedResultComponent],
    imports: [CommonModule, SharedModule],
})
export class AddProcessedResultModule {}
