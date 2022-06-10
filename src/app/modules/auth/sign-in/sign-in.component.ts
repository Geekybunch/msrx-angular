import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            // rememberMe: [''],
        });
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();

        this.showAlert = false;

        this._authService.signIn(this.signInForm.value).subscribe(
            (res) => {
                if (
                    res.data.user.modelId?.employer?.businessType ===
                    'Cultivator'
                ) {
                    this._router.navigateByUrl('cultivator/dashboard');
                }
                if (
                    res.data.user.modelId?.employer?.businessType === 'Tester'
                ) {
                    this._router.navigateByUrl('tester/dashboard');
                }
                if (res.data.user.onModel === 'Admin') {
                    this._router.navigateByUrl('admin/dashboard');
                }

                // const redirectURL =
                //     this._activatedRoute.snapshot.queryParamMap.get(
                //         'redirectURL'
                //     ) || '/signed-in-redirect';

                // this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Wrong email or password',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
}
