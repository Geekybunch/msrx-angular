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
export class AdminGuard implements CanActivate {
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
        if (this.getUser && this.getUser.onModel == 'Admin') {
            console.log('Admin');
            return true;
        } else {
            console.log(this.getUser.onModel);
            if (this.getUser) {
                let role = this.getUser.onModel;
                let redirect =
                    role.toLowerCase() == 'employee'
                        ? 'cultivator'
                        : role.toLowerCase();

                this.router.navigateByUrl(`/${redirect}/dashboard`);
            }
            return false;
        }
    }
}
