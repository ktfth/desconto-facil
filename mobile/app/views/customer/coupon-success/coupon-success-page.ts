import { NavigatedData, Page } from '@nativescript/core';
import { CouponSuccessViewModel } from './coupon-success-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = page.navigationContext;
    page.bindingContext = new CouponSuccessViewModel(context);
}