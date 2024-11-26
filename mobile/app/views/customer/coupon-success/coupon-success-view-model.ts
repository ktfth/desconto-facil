import { Observable, Frame, Dialogs } from '@nativescript/core';

export class CouponSuccessViewModel extends Observable {
    private _couponName: string;
    private _code: string;
    private _discount: number;
    private _validUntil: Date;
    private _onComplete: Function;

    constructor(context: any) {
        super();
        
        const { couponData, onComplete } = context;
        this._couponName = couponData.name;
        this._code = couponData.code;
        this._discount = couponData.discount;
        this._validUntil = new Date(couponData.validUntil);
        this._onComplete = onComplete;
    }

    get couponName(): string {
        return this._couponName;
    }

    get code(): string {
        return this._code;
    }

    get discount(): number {
        return this._discount;
    }

    get validUntilFormatted(): string {
        return this._validUntil.toLocaleDateString('pt-BR');
    }

    onComplete() {
        // Show success message
        Dialogs.alert({
            title: "Cupom Salvo",
            message: "Seu cupom foi salvo com sucesso e está disponível na aba 'Meus Cupons'",
            okButtonText: "OK"
        }).then(() => {
            Frame.topmost().navigate({
              moduleName: "views/customer/customer-page",
              context: {
                  onComplete: () => {
                      Frame.topmost().navigate({
                          moduleName: "views/customer/customer-page",
                          clearHistory: true
                      });
                  }
              },
              clearHistory: true
          });
        });
    }
}