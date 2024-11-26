import { Observable, Frame } from '@nativescript/core';

export class StoreViewModel extends Observable {
    private _coupons: Array<any>;

    constructor() {
        super();
        
        // Sample data
        this._coupons = [
            {
                name: "Desconto Verão",
                description: "15% off em produtos de verão",
                discount: 15,
                status: "Ativo",
                code: "VERAO15",
                validUntil: "2024-12-31",
                available: 100
            },
            {
                name: "Black Friday",
                description: "30% em toda loja",
                discount: 30,
                status: "Expirado",
                code: "BLACK30",
                validUntil: "2023-11-24",
                available: 0
            }
        ];
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