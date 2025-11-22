import {
  v4_default
} from "./chunk-634W5QSD.js";
import {
  BehaviorSubject,
  Injectable,
  of,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-7P5DERJJ.js";

// src/app/services/auth.service.ts
var LS_KEY = "fos_user";
var AuthService = class _AuthService {
  _user$ = new BehaviorSubject(this.loadUser());
  user$ = this._user$.asObservable();
  get token() {
    return this._user$.value?.token;
  }
  loadUser() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw)
      return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  save(user) {
    if (user)
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    else
      localStorage.removeItem(LS_KEY);
    this._user$.next(user);
  }
  login(username, password) {
    const user = {
      id: v4_default(),
      username,
      name: username,
      token: "mock-jwt-" + Math.random().toString(36).slice(2)
    };
    this.save(user);
    return of(user);
  }
  logout() {
    this.save(null);
  }
  isLoggedIn() {
    return !!this._user$.value;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-VH2QCEZ2.js.map
