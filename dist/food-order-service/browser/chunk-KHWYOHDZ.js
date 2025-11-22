import {
  CartService,
  SharedModule
} from "./chunk-M2NR3MRF.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-IMEQX5MX.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-6UFAXN4M.js";
import {
  ProductService
} from "./chunk-62UH2FYO.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  DecimalPipe,
  EventEmitter,
  Input,
  NgForOf,
  NgIf,
  NgModule,
  Output,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7P5DERJJ.js";

// src/app/features/shop/product-card/product-card.component.ts
function ProductCardComponent_img_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.product.image, \u0275\u0275sanitizeUrl)("alt", ctx_r0.product.name);
  }
}
var ProductCardComponent = class _ProductCardComponent {
  product;
  add = new EventEmitter();
  onAddClick() {
    this.add.emit(this.product);
  }
  static \u0275fac = function ProductCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCardComponent, selectors: [["app-product-card"]], inputs: { product: "product" }, outputs: { add: "add" }, standalone: false, decls: 14, vars: 7, consts: [[1, "product-card"], ["mat-card-image", "", 3, "src", "alt", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-card-image", "", 3, "src", "alt"]], template: function ProductCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0);
      \u0275\u0275template(1, ProductCardComponent_img_1_Template, 1, 2, "img", 1);
      \u0275\u0275elementStart(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "mat-card-subtitle");
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-card-content")(9, "p");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-card-actions")(12, "button", 2);
      \u0275\u0275listener("click", function ProductCardComponent_Template_button_click_12_listener() {
        return ctx.onAddClick();
      });
      \u0275\u0275text(13, "Add to Cart");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.product.image);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.product.name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("\u20B9 ", \u0275\u0275pipeBind2(7, 4, ctx.product.price, "1.0-0"), "");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.product.description);
    }
  }, dependencies: [NgIf, MatButton, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle, DecimalPipe], styles: ["\n\n.product-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.product-card[_ngcontent-%COMP%]   mat-card-image[_ngcontent-%COMP%] {\n  max-height: 180px;\n  object-fit: cover;\n}\n.product-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.product-card[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=product-card.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductCardComponent, [{
    type: Component,
    args: [{ selector: "app-product-card", standalone: false, changeDetection: ChangeDetectionStrategy.OnPush, template: `<!-- <p>product-card works!</p> -->\r
\r
\r
<mat-card class="product-card">\r
  <img *ngIf="product.image" mat-card-image [src]="product.image" [alt]="product.name">\r
  <mat-card-header>\r
    <mat-card-title>{{ product.name }}</mat-card-title>\r
    <mat-card-subtitle>\u20B9 {{ product.price | number:'1.0-0' }}</mat-card-subtitle>\r
  </mat-card-header>\r
\r
  <mat-card-content>\r
    <p>{{ product.description }}</p>\r
  </mat-card-content>\r
\r
  <mat-card-actions>\r
    <button mat-raised-button color="primary" (click)="onAddClick()">Add to Cart</button>\r
  </mat-card-actions>\r
</mat-card>\r
`, styles: ["/* src/app/features/shop/product-card/product-card.component.scss */\n.product-card {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.product-card mat-card-image {\n  max-height: 180px;\n  object-fit: cover;\n}\n.product-card mat-card-content {\n  flex: 1;\n}\n.product-card mat-card-actions {\n  display: flex;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=product-card.component.css.map */\n"] }]
  }], null, { product: [{
    type: Input
  }], add: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCardComponent, { className: "ProductCardComponent", filePath: "src/app/features/shop/product-card/product-card.component.ts", lineNumber: 52 });
})();

// src/app/features/shop/shop-home/shop-home.component.ts
function ShopHomeComponent_app_product_card_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-product-card", 3);
    \u0275\u0275listener("add", function ShopHomeComponent_app_product_card_4_Template_app_product_card_add_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdd($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275property("product", p_r3);
  }
}
var ShopHomeComponent = class _ShopHomeComponent {
  productService;
  cart;
  products = [];
  loading = true;
  constructor(productService, cart) {
    this.productService = productService;
    this.cart = cart;
  }
  ngOnInit() {
    this.productService.list().subscribe({
      next: (p) => {
        this.products = p;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onAdd(item) {
    this.cart.add({ productId: item.id, name: item.name, price: item.price, qty: 1, image: item.image });
  }
  static \u0275fac = function ShopHomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopHomeComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CartService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShopHomeComponent, selectors: [["app-shop-home"]], standalone: false, decls: 5, vars: 1, consts: [[1, "shop"], [1, "products-grid"], [3, "product", "add", 4, "ngFor", "ngForOf"], [3, "add", "product"]], template: function ShopHomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2, "Menu");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1);
      \u0275\u0275template(4, ShopHomeComponent_app_product_card_4_Template, 1, 1, "app-product-card", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.products);
    }
  }, dependencies: [NgForOf, ProductCardComponent], styles: ["\n\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}\n/*# sourceMappingURL=shop-home.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopHomeComponent, [{
    type: Component,
    args: [{ selector: "app-shop-home", standalone: false, template: `
    <div class="shop">
      <h1>Menu</h1>
      <div class="products-grid">
        <app-product-card *ngFor="let p of products" [product]="p" (add)="onAdd($event)"></app-product-card>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;677c375fe3900a49485f6ac363bc52b691893a4171748d82f3aa1d7531853ae3;C:/Users/mansi.tripathi/Desktop/Mansi POC/food-order-service/src/app/features/shop/shop-home/shop-home.component.ts */\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}\n/*# sourceMappingURL=shop-home.component.css.map */\n"] }]
  }], () => [{ type: ProductService }, { type: CartService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShopHomeComponent, { className: "ShopHomeComponent", filePath: "src/app/features/shop/shop-home/shop-home.component.ts", lineNumber: 33 });
})();

// src/app/features/shop/shop.module.ts
var ShopModule = class _ShopModule {
  static \u0275fac = function ShopModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ShopModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: "", component: ShopHomeComponent }
    ])
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopModule, [{
    type: NgModule,
    args: [{
      declarations: [ShopHomeComponent, ProductCardComponent],
      imports: [
        CommonModule,
        SharedModule,
        MatCardModule,
        MatButtonModule,
        RouterModule.forChild([
          { path: "", component: ShopHomeComponent }
        ])
      ]
    }]
  }], null, null);
})();
export {
  ShopModule
};
//# sourceMappingURL=chunk-KHWYOHDZ.js.map
