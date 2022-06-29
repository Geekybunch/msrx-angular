import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDrawerComponent } from './product-drawer.component';
import { SharedModule } from 'app/shared/shared.module';
import { PlantsDrawerModule } from '../plants-drawer/plants-drawer.module';

@NgModule({
    declarations: [ProductDrawerComponent],
    imports: [CommonModule, SharedModule, PlantsDrawerModule],
    exports: [ProductDrawerComponent],
})
export class ProductDrawerModule {}
