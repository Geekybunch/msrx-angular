import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProfileComponent } from './business-profile.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [BusinessProfileComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: BusinessProfileComponent,
            },
        ]),
    ],
})
export class BusinessProfileModule {}
