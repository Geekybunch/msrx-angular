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
                path: 'add-distribution',
                loadChildren: () =>
                    import(
                        'app/modules/distributor/pages/add-distribution/add-distribution.module'
                    ).then((m) => m.AddDistributionModule),
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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DistributorRoutingModule {}