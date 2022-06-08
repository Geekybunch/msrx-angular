import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
    getUser: any;
    constructor(private router: Router) {
        this.getUser = JSON.parse(localStorage.getItem('userData'));
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.checkEmployee();
    }

    checkEmployee(): boolean {
        if (this.getUser && this.getUser.onModel == 'Employee') {
            console.log('employee');
            return true;
        } else {
            console.log(this.getUser.onModel);

            if (this.getUser) {
                let role = this.getUser.onModel;
                let redirect = role.toLowerCase();
                this.router.navigateByUrl(`/${redirect}/dashboard`);
            }
            console.log('else');
            return false;
        }
    }
}
