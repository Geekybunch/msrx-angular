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
                path: 'create-disposary',
                loadChildren: () =>
                    import(
                        'app/modules/disposal/pages/create-disposary/create-disposary.module'
                    ).then((m) => m.CreateDisposaryModule),
            },
            {
                path: 'delivery-vehicles',
                loadChildren: () =>
                    import(
                        'app/modules/disposal/pages/dilevery-vehicles/dilevery-vehicles.module'
                    ).then((m) => m.DileveryVehiclesModule),
            },
            {
                path: 'past-deliveries',
                loadChildren: () =>
                    import(
                        'app/modules/disposal/pages/past-dileviries/past-dileviries.module'
                    ).then((m) => m.PastDileviriesModule),
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
export class DisposalRoutingModule {}
