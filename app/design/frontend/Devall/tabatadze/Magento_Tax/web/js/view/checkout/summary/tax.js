/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */

define([
    'ko',
    'Magento_Checkout/js/view/summary/abstract-total',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/totals',
    'mage/translate',
    'underscore'
], function (ko, Component, quote, totals, $t, _) {
    'use strict';

    var isTaxDisplayedInGrandTotal = window.checkoutConfig.includeTaxInGrandTotal,
        isFullTaxSummaryDisplayed = window.checkoutConfig.isFullTaxSummaryDisplayed

    return Component.extend({
        defaults: {
            isTaxDisplayedInGrandTotal: isTaxDisplayedInGrandTotal,
            notCalculatedMessage: $t('Not yet calculated'),
            template: 'Magento_Tax/checkout/summary/tax'
        },
        totals: quote.getTotals(),
        isFullTaxSummaryDisplayed: isFullTaxSummaryDisplayed,

        /**
         * @return {Number}
         */
        getPureValue: function () {
            var amount = 0,
                taxTotal;

            if (this.totals()) {
                taxTotal = totals.getSegment('tax');

                if (taxTotal) {
                    amount = taxTotal.value;
                }
            }

            return amount;
        },

        /**
         * @return {*|Boolean}
         */
        isCalculated: function () {
            return this.totals() && this.isFullMode() && totals.getSegment('tax') != null;
        },

        /**
         * @return {*}
         */
        getValue: function () {
            var amount;

            if (!this.isCalculated()) {
                return this.notCalculatedMessage;
            }
            amount = totals.getSegment('tax').value;
            if(!amount) return 'Free';
            return this.getFormattedPrice(amount);
        }
    });
});
