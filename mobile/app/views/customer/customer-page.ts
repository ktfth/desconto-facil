import { NavigatedData, Page } from '@nativescript/core';
import { CustomerViewModel } from './customer-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new CustomerViewModel();
    }
}