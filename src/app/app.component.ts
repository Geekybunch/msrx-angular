import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import {
    cultivatorNavigation,
    dispensaryNavigation,
    disposalNavigation,
    distributorNavigation,
    manufacturerNavigation,
    processorNavigation,
    TesterNavigation,
    wellnessCenterNavigation,
} from './mock-api/common/navigation/data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private authService: AuthService) {
        this.alterNavigation();
    }

    alterNavigation() {
        if (!this.authService.isAdmin()) {
            let idx = -1;
            idx = cultivatorNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                cultivatorNavigation.splice(idx, 1);
            }
            idx = TesterNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                TesterNavigation.splice(idx, 1);
            }
            idx = manufacturerNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                manufacturerNavigation.splice(idx, 1);
            }
            idx = processorNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                processorNavigation.splice(idx, 1);
            }
            idx = disposalNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                disposalNavigation.splice(idx, 1);
            }
            idx = distributorNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                distributorNavigation.splice(idx, 1);
            }
            idx = dispensaryNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                dispensaryNavigation.splice(idx, 1);
            }
            idx = wellnessCenterNavigation.findIndex(
                (o: any) => o.title === 'Employee'
            );
            if (idx !== -1) {
                wellnessCenterNavigation.splice(idx, 1);
            }
        }
    }
}
