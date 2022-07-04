import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile.component';
import { RouterModule } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [UpdateProfileComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: UpdateProfileComponent,
            },
        ]),
        SharedModule,
        NgxMaterialTimepickerModule.setLocale('de-DE'),
    ],
})
export class UpdateProfileModule {}
