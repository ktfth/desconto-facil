import { Frame, Observable } from '@nativescript/core';

export class StoreViewModel extends Observable {
    private _coupons: Array<any>;

    constructor() {
        super();
        
        // Sample data
        this._coupons = [];

        this._fetchData().then((data) => {
            console.log("fetching data...");
      
            this._coupons = data.map((coupon: ApiResponse): Coupon => {
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
            });
      
            this.notifyPropertyChange("coupons", this._coupons);
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

    get coupons(): Array<any> {
        return this._coupons;
    }

    onCreateCoupon() {
        Frame.topmost().navigate({
            moduleName: "views/store/create-coupon/create-coupon-page"
        });
    }

    onBackTap() {
        Frame.topmost().navigate({
            moduleName: "views/login/login-page",
            clearHistory: true
        });
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