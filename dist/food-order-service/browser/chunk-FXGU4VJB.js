import {
  MatCard,
  MatCardContent,
  MatCardModule,
  MatCardTitle
} from "./chunk-IMEQX5MX.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel
} from "./chunk-GSLGT3UO.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-6UFAXN4M.js";
import {
  AuthService
} from "./chunk-VH2QCEZ2.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-TYRNABAI.js";
import "./chunk-634W5QSD.js";
import {
  CommonModule,
  Component,
  NgIf,
  NgModule,
  Router,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7P5DERJJ.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_mat_error_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Username is required. ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_mat_error_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Password is required. ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
var LoginComponent = class _LoginComponent {
  fb;
  auth;
  router;
  f;
  loading = false;
  errorMessage;
  constructor(fb, auth, router) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
  }
  ngOnInit() {
    this.f = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.f.invalid) {
      return;
    }
    this.loading = true;
    this.errorMessage = void 0;
    const { username, password } = this.f.value;
    this.auth.login(username, password).subscribe({
      next: (user) => {
        this.loading = false;
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = "Login failed. Please check credentials.";
        console.error("Login error:", err);
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: false, decls: 19, vars: 6, consts: [[1, "login-wrapper"], [3, "ngSubmit", "formGroup"], ["appearance", "fill", 1, "full-width"], ["matInput", "", "formControlName", "username", "autocomplete", "username"], [4, "ngIf"], ["matInput", "", "type", "password", "formControlName", "password", "autocomplete", "current-password"], ["class", "error-message", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 1, "full-width", 3, "disabled"], [1, "error-message"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-title");
      \u0275\u0275text(3, "Login");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "mat-card-content")(5, "form", 1);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_5_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(6, "mat-form-field", 2)(7, "mat-label");
      \u0275\u0275text(8, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "input", 3);
      \u0275\u0275template(10, LoginComponent_mat_error_10_Template, 2, 0, "mat-error", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-form-field", 2)(12, "mat-label");
      \u0275\u0275text(13, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "input", 5);
      \u0275\u0275template(15, LoginComponent_mat_error_15_Template, 2, 0, "mat-error", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, LoginComponent_div_16_Template, 2, 1, "div", 6);
      \u0275\u0275elementStart(17, "button", 7);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.f);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.f.controls["username"].invalid && ctx.f.controls["username"].touched);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.f.controls["password"].invalid && ctx.f.controls["password"].touched);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Logging in\u2026" : "Login", " ");
    }
  }, dependencies: [NgIf, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatInput, MatFormField, MatLabel, MatError, MatButton, MatCard, MatCardContent, MatCardTitle], styles: ["\n\n.login-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n.login-wrapper[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  padding: 16px;\n}\n.login-wrapper[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.login-wrapper[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: red;\n  margin: 8px 0;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: false, template: `<!-- <p>login works!</p> -->\r
\r
\r
<div class="login-wrapper">\r
  <mat-card>\r
    <mat-card-title>Login</mat-card-title>\r
    <mat-card-content>\r
      <form [formGroup]="f" (ngSubmit)="onSubmit()">\r
        <mat-form-field appearance="fill" class="full-width">\r
          <mat-label>Username</mat-label>\r
          <input matInput formControlName="username" autocomplete="username" />\r
          <mat-error *ngIf="f.controls['username'].invalid && f.controls['username'].touched">\r
            Username is required.\r
          </mat-error>\r
        </mat-form-field>\r
\r
        <mat-form-field appearance="fill" class="full-width">\r
          <mat-label>Password</mat-label>\r
          <input matInput type="password" formControlName="password" autocomplete="current-password" />\r
          <mat-error *ngIf="f.controls['password'].invalid && f.controls['password'].touched">\r
            Password is required.\r
          </mat-error>\r
        </mat-form-field>\r
\r
        <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>\r
\r
        <button mat-raised-button color="primary" class="full-width" [disabled]="loading">\r
          {{ loading ? 'Logging in\u2026' : 'Login' }}\r
        </button>\r
      </form>\r
    </mat-card-content>\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/app/features/auth/login/login.component.scss */\n.login-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n.login-wrapper mat-card {\n  width: 100%;\n  max-width: 400px;\n  padding: 16px;\n}\n.login-wrapper .full-width {\n  width: 100%;\n}\n.login-wrapper .error-message {\n  color: red;\n  margin: 8px 0;\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login/login.component.ts", lineNumber: 64 });
})();

// src/app/features/auth/auth.module.ts
var AuthModule = class _AuthModule {
  static \u0275fac = function AuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: "login", component: LoginComponent }
    ])
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        RouterModule.forChild([
          { path: "login", component: LoginComponent }
        ])
      ]
    }]
  }], null, null);
})();
export {
  AuthModule
};
//# sourceMappingURL=chunk-FXGU4VJB.js.map
