import { Observable, Frame, Dialogs } from '@nativescript/core';

export class CreateCouponViewModel extends Observable {
    private _name: string = "";
    private _description: string = "";
    private _discount: number = 0;
    private _quantity: number = 0;
    private _validUntil: Date = new Date();
    private _code: string = "";

    constructor() {
        super();
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange('name', value);
        }
    }

    get description(): string {
        return this._description;
    }
    set description(value: string) {
        if (this._description !== value) {
            this._description = value;
            this.notifyPropertyChange('description', value);
        }
    }

    get discount(): number {
        return this._discount;
    }
    set discount(value: number) {
        if (this._discount !== value) {
            this._discount = value;
            this.notifyPropertyChange('discount', value);
        }
    }

    get quantity(): number {
        return this._quantity;
    }
    set quantity(value: number) {
        if (this._quantity !== value) {
            this._quantity = value;
            this.notifyPropertyChange('quantity', value);
        }
    }

    get validUntil(): Date {
        return this._validUntil;
    }
    set validUntil(value: Date) {
        if (this._validUntil !== value) {
            this._validUntil = value;
            this.notifyPropertyChange('validUntil', value);
        }
    }

    get code(): string {
        return this._code;
    }
    set code(value: string) {
        if (this._code !== value) {
            this._code = value;
            this.notifyPropertyChange('code', value);
        }
    }

    generateCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.code = code;
    }

    createCoupon() {
        // Validate fields
        if (!this.name || !this.description || !this.discount || !this.quantity || !this.code) {
            Dialogs.alert({
                title: "Erro",
                message: "Por favor, preencha todos os campos",
                okButtonText: "OK"
            });
            return;
        }

        // Create coupon object
        const newCoupon = {
            name: this.name,
            description: this.description,
            discount: this.discount,
            quantity: this.quantity,
            validUntil: this.validUntil,
            code: this.code,
            status: "Ativo"
        };

        // Show success message
        Dialogs.alert({
            title: "Sucesso",
            message: "Cupom criado com sucesso!",
            okButtonText: "OK"
        }).then(() => {
            // Navigate back to store page
            Frame.topmost().goBack();
        });
    }

    onBackTap() {
        Frame.topmost().goBack();
    }
}