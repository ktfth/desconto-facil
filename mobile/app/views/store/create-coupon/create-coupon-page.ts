import { NavigatedData, Page } from '@nativescript/core';
import { CreateCouponViewModel } from './create-coupon-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new CreateCouponViewModel();
}