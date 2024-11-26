import { NavigatedData, Page } from '@nativescript/core';
import { StoreViewModel } from './store-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new StoreViewModel();
}