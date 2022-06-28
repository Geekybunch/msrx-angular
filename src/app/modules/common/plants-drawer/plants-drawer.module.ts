import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsDrawerComponent } from './plants-drawer.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [PlantsDrawerComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [PlantsDrawerComponent],
})
export class PlantsDrawerModule {}
