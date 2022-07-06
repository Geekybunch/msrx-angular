import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesDrawerComponent } from './deliveries-drawer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [DeliveriesDrawerComponent],
    imports: [CommonModule, SharedModule],
    exports: [DeliveriesDrawerComponent],
})
export class DeliveriesDrawerModule {}
