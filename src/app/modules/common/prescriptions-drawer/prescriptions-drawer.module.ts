import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionsDrawerComponent } from './prescriptions-drawer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [PrescriptionsDrawerComponent],
    imports: [CommonModule, SharedModule],
    exports: [PrescriptionsDrawerComponent],
})
export class PrescriptionsDrawerModule {}
