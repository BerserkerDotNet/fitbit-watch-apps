/*
* K·Pay Integration Library - v1.3.3 - Copyright Kiezel 2019
* Last Modified: 2019-11-11
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

//import { localStorage } from "local-storage"
var localStorageModule = require('local-storage').localStorage;    //because normal import currently doesn't work on Android
import { device } from "peer";
import * as messaging from 'messaging';
import { outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as kcm from '../../../common/kpay/kpay_common.js';
import { me } from "companion";
import * as appClusterStorage from "app-cluster-storage";
var e = "fb1.3.3", n = 3e3, o = 5e3, t = 25e3, s = 1e4, a = 864e5, u = null, f = null, y = null, g = null, m = null, k = null, p = "kpay_nextRecheckTimeLocalstorageKey", K = "kpay__lastStatusResultLocalstorageKey", P = "kpay_flagsLocalstorageKey", h = "kpay_appIdLocalstorageKey", v = "kpay_randLocalstorageKey", S = "kpay_accountTokenLocalstorageKey", w = null, T = null, x = null, b = null, C = !1, _ = !1, R = 0, N = 0, I = 0, U = !1, D = !1, L = 0, O = null, W = null, E = function() {}, M = de, J = appClusterStorage.get("");

export function initialize() {
    console.log("KPay - initialize()"), messaging.peerSocket.addEventListener("open", G), 
    messaging.peerSocket.addEventListener("message", j), messaging.peerSocket.addEventListener("error", Q), 
    messaging.peerSocket.addEventListener("closed", V), setTimeout(ne, 6e4);
}

export function setEventHandler(e) {
    E = e;
}

export function setAccountTokenGenerator(e) {
    M = e;
}

export function startPurchase() {
    A(kcm.purchaseMessageFilename, {
        purchase: "start"
    });
}

export function cancelPurchase() {
    A(kcm.purchaseMessageFilename, {
        purchase: "cancel"
    });
}

function A(e, n, o, t) {
    var s = function() {
        o ? o() : console.log('KPay - Successfully sent kpay settings "' + e + '": ' + JSON.stringify(n));
    }, a = function(n) {
        t ? t() : console.log('KPay - Error sending kpay settings "' + e + '": ' + n);
    };
    if ((null == x || F()) && (console.log("KPay - sending message to watch using file transfer..."), 
    outbox.enqueue(e, cbor.encode(n)).then(s).catch(a)), null == x || q()) {
        console.log("KPay - sending message to watch using peersocket...");
        try {
            0 === messaging.peerSocket.readyState ? (messaging.peerSocket.send(n), s()) : a("PeerSocket closed");
        } catch (e) {
            a(e);
        }
    }
}

function F() {
    return !q();
}

function q() {
    return 0 == (64 & x);
}

function G() {
    console.log("KPay - Connection with watch opened..."), null !== pe() && "licensed" !== pe().status && ge();
}

function j(e) {
    var n = e.data;
    if (kcm.isKPayMessage(n)) if (console.log("KPay - Received msg from watch: " + JSON.stringify(n)), 
    z(n)) {
        if (console.log("KPay - Received GETSTATUS msg from watch..."), C && w === n.appId && T === n.random && x === n.flags) {
            var s = new Date().getTime();
            if (U && !D && s - I < t) return void console.log("KPay - Websocket connected and alive, no need to start new status request...");
            if (s - N < o) return void console.log("KPay - Status checks already running, no need to start new status request...");
        }
        w = n.appId, T = n.random, x = n.flags, null !== pe() && "unlicensed" !== pe().status && ge(), 
        X(), f && (clearTimeout(f), f = null), f = setTimeout($, 15e3);
    } else B(n) && (console.log("KPay - Received CANCELPURCHASE msg from watch..."), 
    C = !1, ge(), u && (clearTimeout(u), u = null), f && (clearTimeout(f), f = null), 
    U && fe());
}

function z(e) {
    return kcm.isKPayMessage(e) && 0 === e.type;
}

function B(e) {
    return kcm.isKPayMessage(e) && 3 === e.type;
}

function H(e) {
    return {
        isKpayMsg: !0,
        type: 1,
        serverResponse: e
    };
}

function Q(e) {
    console.log("KPay - Connection with watch error: " + e);
}

function V(e) {
    console.log("KPay - Connection with watch was closed: " + e);
}

function X() {
    console.log("KPay - _statusCheck()"), C = !0;
    var o = new Date().getTime(), t = M(), s = Pe(), a = "https://api.k-pay.io/api/v1/status?";
    a += "appid=" + encodeURIComponent(w), a += "&rand=" + encodeURIComponent(T), a += "&accounttoken=" + encodeURIComponent(t), 
    a += "&platform=" + encodeURIComponent(s), a += "&flags=" + encodeURIComponent(x), 
    a += "&nocache=" + encodeURIComponent(o), a += "&libv=" + encodeURIComponent(e), 
    console.log("KPay - Getting status from server at " + a), R = o, fetch(a).then(function(e) {
        return e.json();
    }).then(function(e) {
        console.log("KPay - Got response from server: " + JSON.stringify(e)), _ = !1, N = new Date().getTime(), 
        e && e.hasOwnProperty("status") ? Y(e) : console.log("KPay - Invalid KPay response received.");
    }).catch(function(e) {
        console.log("KPay - Status request failed: " + e), N = new Date().getTime(), _ || !C || null !== pe() && "licensed" === pe().status || (u && (clearTimeout(u), 
        u = null), u = setTimeout(X, n)), _ = !1;
    });
}

function Y(e) {
    "unlicensed" === e.status && (L = Number(e.paymentCode)), null === pe() || pe().status !== e.status || "unlicensed" === pe().status && (pe().purchaseStatus !== e.purchaseStatus || pe().paymentCode !== e.paymentCode || pe().checksum !== e.checksum) ? A(kcm.statusMessageFilename, H(e), function() {
        if (console.log("KPay - Status msg successfully sent to watch"), "licensed" === e.status) Z(7, null, !1); else if ("trial" === e.status) {
            var n = Math.round(new Date().getTime() / 1e3) + Number(e.trialDurationInSeconds), o = new Date();
            o.setTime(1e3 * n), Z(3, o, !1);
        } else if ("unlicensed" === e.status) {
            var t = Number(e.paymentCode), s = null == pe() || t !== pe().paymentCode;
            "waitForUser" == e.purchaseStatus ? Z(5, t, s) : "inProgress" == e.purchaseStatus && Z(6, t, s);
        }
        ke(e);
    }, function() {
        console.log("KPay - Status msg failed sending to watch");
    }) : console.log("KPay - No status change detected"), "licensed" === e.status || "trial" === e.status ? ("licensed" === e.status ? ee(e) : ce(), 
    C = !1, f && (clearTimeout(f), f = null), fe(), console.log("KPay - Licensed/trial status reached, no more action necesarry.")) : (ce(), 
    D || U ? D && (u && (clearTimeout(u), u = null), u = setTimeout(X, n)) : se());
}

function Z(e, n, o) {
    if (W !== e || o) {
        W = e, console.log("KPay - firing event callback for event " + e);
        try {
            E(e, n);
        } catch (e) {}
    }
}

function $() {
    console.log("KPay - _failSafeStatusCheck()");
    var e = new Date().getTime();
    C && (U && !D && e - I >= t || (!U || D) && e - N >= 15e3) && (null === pe() || "licensed" !== pe().status && "trial" !== pe().status) && (console.log("KPay - status checks have stopped for some reason, restarting..."), 
    u && (clearTimeout(u), u = null), u = setTimeout(X, 0)), f && (clearTimeout(f), 
    f = null), f = setTimeout($, 15e3);
}

function ee(e) {
    console.log("KPay - _setPeriodicRechecksForResponse()"), e && "licensed" === e.status && oe(86400 * e.validityPeriodInDays * 1e3, !1);
}

function ne() {
    var e = he(p, null);
    console.log("KPay - _checkForStoredRecheck(); nextRecheckTime from ls = " + e), 
    null !== e && oe(e - new Date().getTime(), !0);
}

function oe(e, n) {
    console.log("KPay - _scheduleRecheckWithTimeout(recheckTimeout = " + e + ", isStartupScheduling = " + n + ")"), 
    n || (ve(P, x), ve(h, w), ve(v, T)), e < 0 ? le() : te(e);
}

function te(e) {
    console.log("KPay - _storeScheduledRecheck(recheckTimeout = " + e + ")"), ce();
    var n = new Date(), o = e / 1e3;
    n.setSeconds(n.getSeconds() + o), ve(p, n.getTime()), console.log("KPay - Scheduling js status recheck for " + o + " seconds from now."), 
    y && (clearTimeout(y), y = null), y = setTimeout(le, e);
}

function ce() {
    console.log("KPay - _removeScheduledRecheck()"), y && (clearTimeout(y), y = null), 
    Se(p);
}

function le() {
    console.log("KPay - _performRecheck()"), x = he(P, x), w = he(h, w), T = he(v, T), 
    te(a), C || (console.log("KPay - Performing js fallback status recheck..."), _ = !0, 
    X());
}

function se() {
    if (console.log("KPay - _beginWebSocketChecks()"), !D && !U && null === O) {
        var n = M(), o = Pe(), s = {
            type: "register",
            purchaseCode: L,
            data: {
                appid: w,
                accounttoken: n,
                platform: o,
                flags: x,
                random: T,
                libv: e
            }
        }, a = "wss://socket.kiezelpay.com";
        console.log("KPay - Opening websocket connection to KPay..."), m && (clearTimeout(m), 
        m = null), m = setTimeout(function() {
            U || (console.log("KPay - Opening websocket failed, reverting to normal polling checks..."), 
            D = !0, X(), ie());
        }, 3e3);
        try {
            (O = new WebSocket(a)).onopen = function(e) {
                U = !0, D = !1, console.log("KPay - WebSocket connection opened..."), ue(O, s);
            }, O.onmessage = function(e) {
                if (U) {
                    I = new Date().getTime(), console.log("KPay - WebSocket message received: " + e.data);
                    var n = JSON.parse(e.data);
                    if (n && "registerReponse" == n.type && n.keepAliveTimeout) t = n.keepAliveTimeout, 
                    g && (clearTimeout(g), g = null), g = setTimeout(function() {
                        ae(O);
                    }, t); else if (n && "statusUpdate" == n.type) {
                        if (!n.data || !n.data.hasOwnProperty("status")) return void console.log("KPay - Invalid KPay response received: " + e.data);
                        Y(n.data);
                    } else console.log("KPay - Unknown KPay response received: " + e.data);
                } else try {
                    O.close(), console.log("KPay - Closing stray WebSocket...");
                } catch (e) {}
            }, O.onerror = function(e) {
                console.log("KPay - WebSocket error: " + e), U = !1, D = !0;
                try {
                    console.log("KPay - Closing websocket..."), O.close();
                } catch (e) {}
                O = null, ie(), console.log("KPay - Starting polling status checks..."), X();
            }, O.onclose = function(e) {
                if (U) {
                    if (U = !1, null !== O) {
                        console.log("KPay - Closing websocket...");
                        try {
                            console.log("KPay - Closing websocket..."), O.close();
                        } catch (e) {}
                    }
                    O = null, D = !0, ie(), console.log("KPay - WebSocket closed by server: " + e), 
                    console.log("KPay - Starting polling status checks..."), X();
                }
            };
        } catch (e) {
            console.log("KPay - Exception opening websocket: " + e);
        }
    }
}

function ae(e) {
    D || (ue(e, {
        type: "keepAlive"
    }), null !== g && (clearTimeout(g), g = null), g = setTimeout(function() {
        ae(e);
    }, t));
}

function ie() {
    k && (clearTimeout(k), k = null), console.log("KPay - Scheduling websocket retry..."), 
    k = setTimeout(function() {
        D = !1;
    }, s);
}

function ue(e, n) {
    try {
        if (1 === e.readyState) {
            var o = JSON.stringify(n);
            console.log("KPay - Sending webSocket message: " + o), e.send(o);
        } else console.log("KPay - Error sending webSocket message: readyState !== 1"), 
        re();
    } catch (e) {
        console.log("KPay - Error sending webSocket message: " + e), re();
    }
}

function re() {
    U = !1, D = !0;
    try {
        console.log("KPay - Closing websocket..."), O.close();
    } catch (e) {}
    O = null, ie(), console.log("KPay - Starting polling status checks..."), X();
}

function fe() {
    if (console.log("KPay - Cancelling websocket status checking..."), null !== m && (clearTimeout(m), 
    m = null), null !== g && (clearTimeout(g), g = null), U = !1, null !== O) try {
        O.close();
    } catch (e) {}
    O = null, C = !1;
}

function ye(e) {
    for (var n = [], i = 0; i < e.length; i += 2) n.push(parseInt(e.substr(i, 2), 16));
    return n;
}

function de() {
    var e = null;
    return me.permissions.granted("access_app_cluster_storage") && null !== J && (console.log("KPay - attempting to get stored accounttoken from app storage cluster..."), 
    e = J.getItem(S)), null !== e && void 0 !== e && "undefined" !== e || (console.log("KPay - attempting to get stored accounttoken from localstorage..."), 
    null !== (e = localStorageModule.getItem(S)) && void 0 !== e && "undefined" !== e || (console.log("KPay - generating new accounttoken..."), 
    e = Ke(), ve(S, e)), me.permissions.granted("access_app_cluster_storage") && null !== J && J.setItem(S, e)), 
    e;
}

function ge() {
    b = null, Se(K);
}

function ke(e) {
    b = e, ve(K, JSON.stringify(b));
}

function pe() {
    if (null === b) {
        var e = localStorageModule.getItem(K);
        null !== e && void 0 !== e && "undefined" !== e && (b = JSON.parse(e));
    }
    return b;
}

function Ke() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = 16 * Math.random() | 0;
        return ("x" == c ? r : 3 & r | 8).toString(16);
    });
}

function Pe() {
    return device.modelName.toLowerCase();
}

function he(e, n) {
    var o = localStorageModule.getItem(e);
    if (null !== o && void 0 !== o && "undefined" !== o && !isNaN(o)) {
        var t = Number(o);
        if (!isNaN(t)) return t;
    }
    return n;
}

function ve(e, n) {
    null !== n && void 0 !== n && localStorageModule.setItem(e, n.toString());
}

function Se(e) {
    localStorageModule.removeItem(e);
}