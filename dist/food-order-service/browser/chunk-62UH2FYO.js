import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7P5DERJJ.js";

// src/app/services/product.service.ts
var ProductService = class _ProductService {
  http;
  base = "/api/products";
  constructor(http) {
    this.http = http;
  }
  list() {
    return this.http.get(this.base);
  }
  get(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  // admin operations
  create(p) {
    return this.http.post(this.base, p);
  }
  update(id, p) {
    return this.http.put(`${this.base}/${id}`, p);
  }
  delete(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ProductService
};
//# sourceMappingURL=chunk-62UH2FYO.js.map
