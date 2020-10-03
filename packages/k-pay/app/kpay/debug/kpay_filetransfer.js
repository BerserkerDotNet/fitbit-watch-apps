/*
* K·Pay Integration Library - v3.0.0 - Copyright Kiezel 2020
* Last Modified: 2018-04-11
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

import * as fs from "fs";
import { inbox } from "file-transfer";
import * as kcm from '../../../common/kpay/kpay_common.js';
import * as kc from './kpay_core.js';

var ln = [ kcm.statusMessageFilename, kcm.purchaseMessageFilename ], sn = [], cn = [], rn = inbox.nextFile;

function un() {
    console.log("KPay_filetransfer - kpay_filetransfer initialize called!"), kc.useFileTransfer(), 
    inbox.addEventListener("newfile", dn);
}

function dn(n) {
    console.log("KPay_filetransfer - _onMessageFromCompanion()");
    var e = fn();
    void 0 !== e && kc.processMessageFromCompanion(fs.readFileSync(e, "cbor"));
}

inbox.nextFile = function() {
    if (sn.length > 0) return sn.pop();
    for (var n; n = rn(); ) {
        if (!(ln.indexOf(n) > -1)) return n;
        cn.push(n);
    }
};

function fn() {
    if (cn.length > 0) return cn.pop();
    for (var n; n = rn(); ) {
        if (ln.indexOf(n) > -1) return n;
        sn.push(n);
    }
}

un();

