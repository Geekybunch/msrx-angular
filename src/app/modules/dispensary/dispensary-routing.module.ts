import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import(
                        'app/modules/employee/dashboard/dashboard.module'
                    ).then((m) => m.DashboardModule),
            },
            {
                path: 'dispensary-center-detail',
                loadChildren: () =>
                    import(
                        'app/modules/dispensary/pages/business-profile/business-profile.module'
                    ).then((m) => m.BusinessProfileModule),
            },
            {
                path: 'update-dispensary-profile',
                loadChildren: () =>
                    import(
                        'app/modules/dispensary/pages/update-profile/update-profile.module'
                    ).then((m) => m.UpdateProfileModule),
            },
            {
                path: 'dosage-history',
                loadChildren: () =>
                    import(
                        'app/modules/dispensary/pages/dosage-history/dosage-history.module'
                    ).then((m) => m.DosageHistoryModule),
            },
            {
                path: 'inventory-details',
                loadChildren: () =>
                    import(
                        'app/modules/employee/product-listing/product-listing.module'
                    ).then((m) => m.ProductListingModule),
            },
            {
                path: 'attendence',
                loadChildren: () =>
                    import(
                        'app/modules/employee/attendence/attendence.module'
                    ).then((m) => m.AttendenceModule),
            },
            {
                path: 'employees',
                loadChildren: () =>
                    import(
                        'app/modules/employee/employees/employees.module'
                    ).then((m) => m.EmployeesModule),
            },
            {
                path: 'test-details',
                loadChildren: () =>
                    import(
                        'app/modules/employee/test-details/test-details.module'
                    ).then((m) => m.TestDetailsModule),
            },
            {
                path: 'qr-scanner-layout',
                loadChildren: () =>
                    import(
                        'app/modules/common/qr-scanner-layout/qr-scanner-layout.module'
                    ).then((m) => m.QrScannerLayoutModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DispensaryRoutingModule {}
