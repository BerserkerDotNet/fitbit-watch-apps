/*
* K·Pay Integration Library - v1.3.3 - Copyright Kiezel 2019
* Last Modified: 2019-12-20
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO 
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE 
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT 
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS" 
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, 
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL 
* NECESSARY SERVICING, REPAIR OR CORRECTION.
* 
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN 
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY 
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE 
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, 
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR 
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY 
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

/*****************************************************************************************/
/*                 GENERATED CODE BELOW THIS LINE - DO NOT MODIFY!                       */
/*****************************************************************************************/

import document from "document";
import { vibration } from "haptics";
import { display } from "display";
import clock from "clock";
import { me } from "appbit";
import { gettext } from "i18n";
import * as kc from './kpay_core.js';
import * as kcfg from '../kpay_config.js';
import * as kcm from '../../../common/kpay/kpay_common.js';

var F = null, x = null, R = null, T = null, z = null, $ = null, nn = null, I = null, O = null, L = null, en = !1, an = !1;

function N() {
    console.log("KPay_dialogs - kpay_dialogs initialize called!"), display.addEventListener("change", ln), 
    me.permissions.granted("access_internet") || (console.log("KPay - ERROR: internet permission not enabled!"), 
    B(gettext("InternetRequired"))), kc.kp8(U, H, j);
}

function U(n) {
    console.log("KPay_dialogs - _mainLibInitialized()"), n && kcfg.KPAY_SHOW_PAID_APP_POPUP && (console.log("KPay_dialogs - Fresh install detected; showing paid app popup..."), 
    G());
}

function J(n) {
    return document.getElementById(n);
}

function q(n, e) {
    n && (n.style.display = e ? "inline" : "none");
}

function G() {
    on(), $ = J("paidAppPopup"), J("btnPaidAppOk").onclick = function(n) {
        q($, !1), tn();
    }, J("btnPaidAppAlreadyPaid").onclick = function(n) {
        nn = J("alreadyPaidPopup"), J("btnAlreadyPaidOk").onclick = function(n) {
            q(nn, !1), tn();
        }, q(nn, !0), q($, !1);
    }, q($, !0);
}

function H(n, e) {
    switch (console.log("KPay_dialogs - _handleEvent(e == " + n + ", extraData == " + e + ")"), 
    n) {
      case 5:
        W(gettext("PurchaseStarted"), e);
        break;

      case 6:
        W(gettext("CompletePurchase"), e);
        break;

      case 7:
        Y();
    }
}

function B(n) {
    on(), console.log("KPay_dialogs - _showError() - message == " + n), F || (F = J("kpay_errorDialog"), 
    x = J("kpay_errorMessage")), x.text = n, Q(), q(F, !0), X();
}

function W(n, e) {
    q(nn, !1), q($, !1), on(), console.log("KPay_dialogs - _showTrialEnded() - message == " + n + "; code == " + e), 
    R || (R = J("kpay_trialEndedDialog"), T = J("kpay_trialEndedMessage"), z = J("kpay_trialEndedCode")), 
    z.text = Z(e), T.text = n, Q(), q(R, !0), X();
}

function Y() {
    on(), console.log("KPay_dialogs - _showPurchaseSuccess()"), L || (L = J("kpay_purchaseSuccessDialog")), 
    Q(), q(L, !0), R && q(R, !1), X("celebration-long"), setTimeout(j, 5e3);
}

function j() {
    console.log("KPay_dialogs - _hideAlert()"), V(), F && q(F, !1), R && q(R, !1), L && q(L, !1), 
    tn();
}

function Q() {
    I || (I = J("kpay_timeInDialog"), O = function() {
        var n = new Date(), e = ("0" + n.getHours()).slice(-2) + ":" + ("0" + n.getMinutes()).slice(-2);
        I.text = e;
    }, clock.addEventListener("tick", function() {
        I && "inline" == I.style.display && O();
    })), I && (O(), q(I, !0));
}

function V() {
    I && q(I, !1);
}

function X(n) {
    display.poke(), vibration.start(n || "nudge-max");
}

function Z(n) {
    for (var e = ""; n > 0; ) e = String.fromCharCode(16 + n % 10) + e, n = n / 10 | 0;
    return e;
}

function on() {
    an || (en = display.aodAllowed, an = !0, en && me.permissions.granted("access_aod") && (console.log("KPay_dialogs - Setting display.aodAllowed to false"), 
    display.aodAllowed = !1));
}

function tn() {
    an = !1, en && me.permissions.granted("access_aod") && (console.log("KPay_dialogs - Setting display.aodAllowed to true"), 
    display.aodAllowed = !0);
}

function ln() {
    an && me.permissions.granted("access_aod") && display.aodAllowed && (console.error("ERROR: you are not allowed to set `display.aodAllowed` to `true` while K-Pay is showing dialogs!"), 
    display.aodAllowed = !1);
}

N();

