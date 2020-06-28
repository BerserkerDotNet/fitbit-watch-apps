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

import * as kc from './kpay_core.js';
import * as Crypto from "crypto";

var KPAY_SECRET = [180, 135, 137, 96, 77, 103, 144, 181, 4, 69, 123, 82, 44, 146, 43, 208];
function yn(){kc.kp10(mn)}function kn(n){return new Uint8Array([255&n,(65280&n)>>8,(16711680&n)>>16,(4278190080&n)>>24])}function mn(n,t,e,u){var o=n.serverResponse,r=0,i="trial"===o.status,l="licensed"===o.status;i?r=1:l&&(r=2);var a=new ArrayBuffer(i?29:25),d=new Uint8Array(a),rb=kn(t),fb=kn(e),tb=null;i&&(tb=kn(Number(o.trialDurationInSeconds)));var c=0;
	d[c++] = KPAY_SECRET[8];
	d[c++] = KPAY_SECRET[15];
	d[c++] = KPAY_SECRET[3];
	d[c++] = rb[2];
	d[c++] = KPAY_SECRET[12];
	d[c++] = KPAY_SECRET[6];
	d[c++] = KPAY_SECRET[9];
	d[c++] = KPAY_SECRET[2];
	if (i) {
		d[c++] = tb[3];
	}
	d[c++] = KPAY_SECRET[11];
	d[c++] = KPAY_SECRET[13];
	d[c++] = KPAY_SECRET[5];
	d[c++] = fb[0];
	d[c++] = KPAY_SECRET[0];
	d[c++] = r;
	d[c++] = rb[0];
	d[c++] = KPAY_SECRET[7];
	d[c++] = rb[1];
	d[c++] = KPAY_SECRET[10];
	if (i) {
		d[c++] = tb[0];
	}
	d[c++] = fb[1];
	d[c++] = fb[3];
	d[c++] = fb[2];
	d[c++] = KPAY_SECRET[14];
	d[c++] = KPAY_SECRET[4];
	if (i) {
		d[c++] = tb[1];
	}
	d[c++] = KPAY_SECRET[1];
	if (i) {
		d[c++] = tb[2];
	}
	d[c++] = rb[3];
Crypto.subtle.digest("SHA-256",a).then(function(n){var t=Array.prototype.map.call(new Uint8Array(n),function(n){return("00"+n.toString(16)).slice(-2)}).join("");u(t===o.checksum)})}yn();