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
                path: 'product-listing',
                loadChildren: () =>
                    import(
                        'app/modules/employee/product-listing/product-listing.module'
                    ).then((m) => m.ProductListingModule),
            },
            {
                path: 'update-inventory',
                loadChildren: () =>
                    import(
                        'app/modules/employee/product-listing/product-listing.module'
                    ).then((m) => m.ProductListingModule),
            },
            {
                path: 'inventory-details',
                loadChildren: () =>
                    import(
                        'app/modules/employee/product-listing/product-listing.module'
                    ).then((m) => m.ProductListingModule),
            },
            {
                path: 'qr-scanner-layout',
                loadChildren: () =>
                    import(
                        'app/modules/common/qr-scanner-layout/qr-scanner-layout.module'
                    ).then((m) => m.QrScannerLayoutModule),
            },
            {
                path: 'add-manufactured-good',
                loadChildren: () =>
                    import(
                        'app/modules/manufacturer/add-manufacturer/add-manufacturer.module'
                    ).then((m) => m.AddManufacturerModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManufacturerRoutingModule {}
