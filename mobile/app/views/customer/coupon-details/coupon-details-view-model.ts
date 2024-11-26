import { Observable, Frame, Dialogs, Utils } from '@nativescript/core';

export class CouponDetailsViewModel extends Observable {
    private _name: string;
    private _description: string;
    private _code: string;
    private _discount: number;
    private _validUntil: Date;
    private _onSave: Function;
    private _isConfirmed: boolean = false;

    constructor(couponData: any) {
        super();
        
        this._name = couponData.name;
        this._description = couponData.description;
        this._code = couponData.code;
        this._discount = couponData.discount;
        this._validUntil = new Date(couponData.validUntil);
        this._onSave = couponData.onSave;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
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

    get isConfirmed(): boolean {
        return this._isConfirmed;
    }

    onCopyCode() {
        Utils.copyToClipboard(this._code);
        Dialogs.alert({
            title: "Copiado!",
            message: "Código copiado para a área de transferência",
            okButtonText: "OK"
        });
    }

    onSaveCoupon() {
        // Simula a verificação com o lojista
        Dialogs.prompt({
            title: "Confirmação do Lojista",
            message: "Digite o código de confirmação do lojista:",
            okButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            inputType: "text"
        }).then(r => {
            if (r.result && r.text) {
                // Simula validação do código (em produção, isso seria validado no backend)
                if (r.text === "LOJISTA123") { // Código de exemplo
                    this._isConfirmed = true;
                    this.showSuccessScreen();
                } else {
                    Dialogs.alert({
                        title: "Erro",
                        message: "Código de confirmação inválido",
                        okButtonText: "OK"
                    });
                }
            }
        });
    }

    private showSuccessScreen() {
        Frame.topmost().navigate({
            moduleName: "views/customer/coupon-success/coupon-success-page",
            context: {
                couponData: {
                    name: this._name,
                    code: this._code,
                    discount: this._discount,
                    validUntil: this._validUntil
                },
                onComplete: () => {
                    this._onSave();
                    Frame.topmost().navigate({
                        moduleName: "views/customer/customer-page",
                        clearHistory: true
                    });
                }
            }
        });
    }

    onBackTap() {
        Frame.topmost().goBack();
    }
}