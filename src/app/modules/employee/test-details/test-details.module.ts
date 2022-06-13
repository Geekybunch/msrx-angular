import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDetailsComponent } from './test-details.component';
import { Route, RouterModule } from '@angular/router';

const testDetailsRoutes: Route[] = [
    {
        path: ':id',
        component: TestDetailsComponent,
    },
];

@NgModule({
    declarations: [TestDetailsComponent],
    imports: [CommonModule, RouterModule.forChild(testDetailsRoutes)],
})
export class TestDetailsModule {}
