import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { MatDialog } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { th } from 'date-fns/locale';
import { AuthService } from 'app/core/auth/auth.service';
import {
    cultivatorNavigation,
    defaultNavigation,
    disposalNavigation,
    distributorNavigation,
    manufacturerNavigation,
    processorNavigation,
    TesterNavigation,
} from 'app/mock-api/common/navigation/data';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    public userDetails: any;
    public role: any;
    scanQRForm: FormGroup;
    plantId: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('scanQRCodeDialog') scanQRCodeDialog: TemplateRef<any>;
    @ViewChild('myInput')
    myInputVariable: ElementRef;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private dialog: MatDialog,
        private router: Router,
        private authService: AuthService,
        private commonService: CommonService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.scanQRForm = new FormGroup({
            planId: new FormControl(null, Validators.required),
        });
        this.role = this.authService.userRole;

        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
                if (this.role.onModel === 'Admin') {
                    this.navigation.compact = defaultNavigation;
                } else if (
                    this.role.modelId.employer?.businessType === 'Tester'
                ) {
                    this.navigation.compact = TesterNavigation;
                } else if (
                    this.role.modelId.employer.businessType === 'Processor'
                ) {
                    this.navigation.compact = processorNavigation;
                } else if (
                    this.role.modelId.employer.businessType === 'Manufacturer'
                ) {
                    this.navigation.compact = manufacturerNavigation;
                } else if (
                    this.role.modelId.employer.businessType === 'Disposer'
                ) {
                    this.navigation.compact = disposalNavigation;
                } else if (
                    this.role.modelId.employer.businessType === 'Distributor'
                ) {
                    this.navigation.compact = distributorNavigation;
                }
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
    openDialog() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    matClose() {
        this.dialog.closeAll();
    }
    plantDetails() {
        if (this.scanQRForm.invalid) {
            return;
        }

        this.commonService.$testPantID.next(this.scanQRForm.value.planId);
        if (this.role.modelId.employer?.businessType === 'Tester') {
            this.router.navigate(['/tester/test-details'], {
                queryParams: {
                    plantID: this.scanQRForm.value.planId,
                },
                replaceUrl: true,
            });
        } else if (this.role.modelId.employer?.businessType === 'Processor') {
            this.router.navigate(['/processor/test-details'], {
                queryParams: {
                    plantID: this.scanQRForm.value.planId,
                },
                replaceUrl: true,
            });
        }

        this.dialog.closeAll();
    }
}
