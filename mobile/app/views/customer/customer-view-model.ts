import { Frame, Observable } from "@nativescript/core";

export class CustomerViewModel extends Observable {
  private _availableCoupons: Array<any>;
  private _usedCoupons: Array<any>;

  constructor() {
    super();

    this._availableCoupons = [];
    this._usedCoupons = [];

    this._fetchData().then((data) => {
      console.log("fetching data...");

      this._availableCoupons = data.map((coupon: ApiResponse): Coupon => {
        return {
          name: coupon.couponCode,
          description: `${coupon.discount}% off em produtos de ${coupon.couponCode}`,
          code: coupon.couponCode,
          validUntil: coupon.validUntil,
          discount: coupon.discount,
          obtainedAt: coupon.obtainedAt,
          status: coupon.redeemed
            ? "Usado"
            : coupon.validUntil < new Date().toISOString()
            ? "Expirado"
            : "Ativo"
        };
      }).filter((coupon: Coupon) => coupon.status === "Ativo");

      this.notifyPropertyChange("availableCoupons", this._availableCoupons);

      this._usedCoupons = data.map((coupon: ApiResponse): Coupon => {
        return {
          name: coupon.couponCode,
          description: `${coupon.discount}% off em produtos de ${coupon.couponCode}`,
          code: coupon.couponCode,
          validUntil: coupon.validUntil,
          discount: coupon.discount,
          obtainedAt: (new Date(coupon.obtainedAt)).toLocaleDateString('pt-BR'),
          status: coupon.redeemed
            ? "Usado"
            : coupon.validUntil < new Date().toISOString()
            ? "Expirado"
            : "Ativo"
        };
      }).filter((coupon: Coupon) => coupon.status !== "Ativo");

      this.notifyPropertyChange("usedCoupons", this._usedCoupons);
    });
  }

  get availableCoupons(): Array<any> {
    return this._availableCoupons;
  }

  get usedCoupons(): Array<any> {
    return this._usedCoupons;
  }

  onGetCoupon(args) {
    const coupon = args.object.bindingContext;
    Frame.topmost().navigate({
      moduleName: "views/customer/coupon-details/coupon-details-page",
      context: {
        ...coupon,
        onSave: () => {
          // Add the coupon to used coupons
          this._usedCoupons.unshift({
            name: coupon.name,
            code: coupon.code,
            status: "Ativo",
            discount: coupon.discount,
            obtainedAt: new Date().toLocaleDateString("pt-BR"),
            validUntil: coupon.validUntil
          });

          // Remove from available coupons
          const index = this._availableCoupons.indexOf(coupon);
          if (index > -1) {
            this._availableCoupons.splice(index, 1);
          }

          // Notify of changes
          this.notifyPropertyChange("usedCoupons", this._usedCoupons);
          this.notifyPropertyChange("availableCoupons", this._availableCoupons);
        }
      }
    });
  }

  onBackTap() {
    Frame.topmost().navigate({
      moduleName: "views/login/login-page",
      clearHistory: true
    });
  }

  async _fetchData() {
    const url = "https://desconto-facil.deno.dev/list-coupons?storeId=store123";

    try {
      // Perform the fetch request
      const response = await fetch(url);

      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();

      return data.coupons;
    } catch (error: any) {
      console.error(error);
    }
  }
}

interface Coupon {
  name: string;
  description: string;
  code: string;
  discount: number;
  validUntil: string;
  available?: number;
  status?: string;
  obtainedAt?: string;
}

interface ApiResponse {
  name: string;
  couponCode: string;
  discount: number;
  validUntil: string;
  redeemed: boolean;
  obtainedAt: string;
}
