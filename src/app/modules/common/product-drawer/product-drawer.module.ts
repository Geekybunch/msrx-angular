import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDrawerComponent } from './product-drawer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ProductDrawerComponent],
    imports: [CommonModule, SharedModule],
    exports: [ProductDrawerComponent],
})
export class ProductDrawerModule {}
