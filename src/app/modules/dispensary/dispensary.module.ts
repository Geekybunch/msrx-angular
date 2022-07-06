import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensaryRoutingModule } from './dispensary-routing.module';
import { GiveDosageFormModule } from './pages/give-dosage-form/give-dosage-form.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, DispensaryRoutingModule, GiveDosageFormModule],
})
export class DispensaryModule {}
