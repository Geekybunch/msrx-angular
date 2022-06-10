/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'admin.dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'dashboard',
        link: '/admin/dashboard',
    },
    {
        id: 'admin.plants',
        title: 'Plants',
        type: 'basic',
        icon: 'yard',
        link: '/admin/plants',
    },
    {
        id: 'admin.products',
        title: 'Products',
        type: 'basic',
        icon: 'add_shopping_cart',
        link: '/admin/products',
    },
    {
        id: 'admin.businesses',
        title: 'Businesses',
        type: 'basic',
        icon: 'add_business',
        link: '/admin/businesses',
    },
    {
        id: 'admin.patients',
        title: 'Patients',
        type: 'basic',
        icon: 'medication',
        link: '/admin/patients',
    },
    {
        id: 'admin.deliveries',
        title: 'Deliveries',
        type: 'basic',
        icon: 'delivery_dining',
        link: '/admin/deliveries',
    },
    {
        id: 'admin.employees',
        title: 'Employee',
        type: 'basic',
        icon: 'people_alt',
        link: '/admin/employees',
    },
    {
        id: 'admin.inventory-logs',
        title: 'Inventory Logs',
        type: 'basic',
        icon: 'assignment',
        link: '/admin/inventory-logs',
    },
    {
        id: 'logout',
        title: 'Logout',
        type: 'basic',
        icon: 'heroicons_outline:logout',
        link: '/sign-out',
    },
    // {
    //     id: 'dashboard',
    //     title: 'Dashboard',
    //     type: 'basic',
    //     icon: 'dashboard',
    //     link: 'dashboard',
    // },
    // {
    //     id: 'plants',
    //     title: 'Plants',
    //     type: 'basic',
    //     icon: 'yard',
    //     link: 'plants',
    // },
    // {
    //     id: 'products',
    //     title: 'Products',
    //     type: 'basic',
    //     icon: 'add_shopping_cart',
    //     link: 'products',
    // },
    // {
    //     id: 'businesses',
    //     title: 'Businesses',
    //     type: 'basic',
    //     icon: 'add_business',
    //     link: 'businesses',
    // },
    // {
    //     id: 'patients',
    //     title: 'Patients',
    //     type: 'basic',
    //     icon: 'medication',
    //     link: 'patients',
    // },
    // {
    //     id: 'deliveries',
    //     title: 'Deliveries',
    //     type: 'basic',
    //     icon: 'delivery_dining',
    //     link: 'deliveries',
    // },
    // {
    //     id: 'employees',
    //     title: 'Employee',
    //     type: 'basic',
    //     icon: 'people_alt',
    //     link: 'employees',
    // },
    // {
    //     id: 'inventory-logs',
    //     title: 'Inventory Logs',
    //     type: 'basic',
    //     icon: 'assignment',
    //     link: 'inventory-logs',
    // },
    // {
    //     id: 'logout',
    //     title: 'Logout',
    //     type: 'basic',
    //     icon: 'heroicons_outline:logout',
    //     link: '/sign-out',
    // },
];
export const employeeNavigation: FuseNavigationItem[] = [
    {
        id: 'cultivator.dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'dashboard',
        link: '/cultivator/dashboard',
    },
    {
        id: 'cultivator.plants',
        title: 'Plants',
        type: 'basic',
        icon: 'yard',
        link: '/cultivator/plants',
    },
    {
        id: 'cultivator.addplants',
        title: 'Add Plants',
        type: 'basic',
        icon: 'add_box',
        link: '/cultivator/add-plants',
    },
    {
        id: 'cultivator.attendence',
        title: 'Attendence',
        type: 'basic',
        icon: 'event_available',
        link: '/cultivator/attendence',
    },

    {
        id: 'cultivator.employees',
        title: 'Employee',
        type: 'basic',
        icon: 'people_alt',
        link: '/cultivator/employees',
    },
    {
        id: 'logout',
        title: 'Logout',
        type: 'basic',
        icon: 'heroicons_outline:logout',
        link: '/sign-out',
    },
];
export const TesterNavigation: FuseNavigationItem[] = [
    {
        id: 'tester.dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'dashboard',
        link: '/tester/dashboard',
    },
    {
        id: 'tester.plants',
        title: 'Tests',
        type: 'basic',
        icon: 'yard',
        link: '/tester/plants',
    },

    {
        id: 'tester.attendence',
        title: 'Attendence',
        type: 'basic',
        icon: 'event_available',
        link: '/tester/attendence',
    },

    {
        id: 'tester.employees',
        title: 'Employee',
        type: 'basic',
        icon: 'people_alt',
        link: '/tester/employees',
    },
    {
        id: 'logout',
        title: 'Logout',
        type: 'basic',
        icon: 'heroicons_outline:logout',
        link: '/sign-out',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
