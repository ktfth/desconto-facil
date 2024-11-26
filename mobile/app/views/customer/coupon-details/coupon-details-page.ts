import { NavigatedData, Page } from '@nativescript/core';
import { CouponDetailsViewModel } from './coupon-details-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const couponData = page.navigationContext;
    page.bindingContext = new CouponDetailsViewModel(couponData);
}