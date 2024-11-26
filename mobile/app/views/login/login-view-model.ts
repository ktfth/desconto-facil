import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';

export class LoginViewModel extends Observable {
    constructor() {
        super();
    }

    onStoreLogin() {
        Frame.topmost().navigate({
            moduleName: "views/store/store-page",
            clearHistory: true
        });
    }

    onCustomerLogin() {
        Frame.topmost().navigate({
            moduleName: "views/customer/customer-page",
            clearHistory: true
        });
    }
}