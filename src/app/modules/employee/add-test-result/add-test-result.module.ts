import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTestResultComponent } from './add-test-result.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [AddTestResultComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatFileUploadModule,
        MatToolbarModule,
    ],
})
export class AddTestResultModule {}
