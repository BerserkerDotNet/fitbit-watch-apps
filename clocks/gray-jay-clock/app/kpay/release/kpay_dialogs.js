/*
* K·Pay Integration Library - v1.3.3 - Copyright Kiezel 2019
* Last Modified: 2019-11-04
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

var C=null,O=null,K=null,R=null,T=null,N=null,U=null,q=null;function F(){me.permissions.granted("access_internet")||z(gettext("InternetRequired")),kc.kp8(B,j,Q)}function B(n){n&&kcfg.KPAY_SHOW_PAID_APP_POPUP&&Y()}function H(n){return document.getElementById(n)}function J(n,t){n&&(n.style.display=t?"inline":"none")}function Y(){var n=H("paidAppPopup");H("btnPaidAppOk").onclick=function(t){J(n,!1)},H("btnPaidAppAlreadyPaid").onclick=function(t){var e=H("alreadyPaidPopup");H("btnAlreadyPaidOk").onclick=function(n){J(e,!1)},J(e,!0),J(n,!1)},J(n,!0)}function j(n,t){switch(n){case 5:G(gettext("PurchaseStarted"),t);break;case 6:G(gettext("CompletePurchase"),t);break;case 7:L()}}function z(n){C||(C=H("kpay_errorDialog"),O=H("kpay_errorMessage")),O.text=n,V(),J(C,!0),X()}function G(n,t){K||(K=H("kpay_trialEndedDialog"),R=H("kpay_trialEndedMessage"),T=H("kpay_trialEndedCode")),T.text=Z(t),R.text=n,V(),J(K,!0),X()}function L(){q||(q=H("kpay_purchaseSuccessDialog")),V(),J(q,!0),K&&J(K,!1),X("celebration-long"),setTimeout(Q,5e3)}function Q(){W(),C&&J(C,!1),K&&J(K,!1),q&&J(q,!1)}function V(){N||(N=H("kpay_timeInDialog"),U=function(){var n=new Date,t=("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2);N.text=t},clock.addEventListener("tick",function(){N&&"inline"==N.style.display&&U()})),N&&(U(),J(N,!0))}function W(){N&&J(N,!1)}function X(n){display.poke(),vibration.start(n||"nudge-max")}function Z(n){for(var t="";n>0;)t=String.fromCharCode(16+n%10)+t,n=n/10|0;return t}F();