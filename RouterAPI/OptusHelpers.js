
//  Custom functions used in auth that were scraped from router client scripts
//     - unknown_hash(pwd,salt) -> returns salt+customPBKDF2(pwd + salt)
//     - The returned value is used as the salt/hash argument for a crypt(C) function
//     - Uses a non-standard Base64 character set, and a custom mapping table when encoding to Base64

function unknown_hash(pwd,salt)
{
    let r = X(pwd,salt);
    return r;
}


function X(e, t) {
    return function(e, t) {
        let i;
        const n = t.split("$");
        return n.length > 1 && (function(e) {
            if ("6" !== e[1])
                throw new Error("Got '${salt}' but only SHA512 ($6$) algorithm supported")
        }(n),
        i = parseInt(n[2].split("=")[1]),
        i ? (i < 1e3 && (i = 1e3),
        i > 999999999 && (i = 999999999),
        t = n[3] || t) : t = n[2] || t),
        function(e) {
            if (e.length < 8 || e.length > 16)
                throw new Error("Wrong salt length: '${salt.length}' bytes when 8 <= n <= 16 expected. Got salt '${salt}'.")
        }(t),
        function(e, t, i, n, a) {
            return e.length > 2 && (t = i ? "$6$rounds=" + i + "$" : "$6$"),
            t + n + "$" + a
        }(n, "$6$", i, t, function(e, t, i) { 
            // This is a base64 encoding functionwith a custom mapping table and a custom encoding scheme
            // Characters are processed out of order...unsure why? Obfuscation?
            let n, a = "";
            for (n = 0; n < e.length; n += 3) {
                let r, s;
                if (void 0 === t[n + 1])
                    r = e.charCodeAt(t[n]) & parseInt("00111111", 2),
                    s = (e.charCodeAt(t[n]) & parseInt("11000000", 2)) >>> 6,
                    a += i.charAt(r) + i.charAt(s);
                else {
                    let O, o;
                    r = e.charCodeAt(t[n]) & parseInt("00111111", 2),
                    s = (e.charCodeAt(t[n]) & parseInt("11000000", 2)) >>> 6 | (e.charCodeAt(t[n + 1]) & parseInt("00001111", 2)) << 2,
                    O = (e.charCodeAt(t[n + 1]) & parseInt("11110000", 2)) >> 4 | (e.charCodeAt(t[n + 2]) & parseInt("00000011", 2)) << 4,
                    o = (e.charCodeAt(t[n + 2]) & parseInt("11111100", 2)) >>> 2,
                    a += i.charAt(r) + i.charAt(s) + i.charAt(O) + i.charAt(o)
                }
            }
            return a
        }(function(e, t, i) { //e = "password", t = "salt", i = 5000
            // This appears to be a custom PBKDF2 like algorithm
            const n = function(e, t) {
                const i = T(e + t + e)
                  , n = e.length;
                let a, r = e + t + g(i, e.length);
                for (a = n; a > 0; a >>= 1)
                    r += 0 != (1 & a) ? i : e;
                return T(r)
            }(e, t);
            let a, r = "";
            for (a = 0; a < e.length; a++)
                r += e;
            const s = g(T(r), e.length);
            let O, o = "";
            for (O = 0; O < 16 + n.charCodeAt(0); O++)
                o += t;
            const l = g(T(o), t.length);
            let D, c = n, d = "";
            for (D = 0; D < i; D++)
                d = "",
                d += 1 & D ? s : c,
                D % 3 && (d += l),
                D % 7 && (d += s),
                d += 1 & D ? c : s,
                c = T(d);
            return c 
        }(e, t, i || 5e3), [42, 21, 0, 1, 43, 22, 23, 2, 44, 45, 24, 3, 4, 46, 25, 26, 5, 47, 48, 27, 6, 7, 49, 28, 29, 8, 50, 51, 30, 9, 10, 52, 31, 32, 11, 53, 54, 33, 12, 13, 55, 34, 35, 14, 56, 57, 36, 15, 16, 58, 37, 38, 17, 59, 60, 39, 18, 19, 61, 40, 41, 20, 62, 63], "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"))
    }(e, t)
}


var O, o = 0;
function T(e) {
    return function(e) {
        let t, i = "";
        for (t = 0; t < 32 * e.length; t += 8)
            i += String.fromCharCode(e[t >> 5] >>> 24 - t % 32 & 255);
        return i
    }(function(e, t) {
        null == O && (O = new Array(new D(1116352408,-685199838),new D(1899447441,602891725),new D(-1245643825,-330482897),new D(-373957723,-2121671748),new D(961987163,-213338824),new D(1508970993,-1241133031),new D(-1841331548,-1357295717),new D(-1424204075,-630357736),new D(-670586216,-1560083902),new D(310598401,1164996542),new D(607225278,1323610764),new D(1426881987,-704662302),new D(1925078388,-226784913),new D(-2132889090,991336113),new D(-1680079193,633803317),new D(-1046744716,-815192428),new D(-459576895,-1628353838),new D(-272742522,944711139),new D(264347078,-1953704523),new D(604807628,2007800933),new D(770255983,1495990901),new D(1249150122,1856431235),new D(1555081692,-1119749164),new D(1996064986,-2096016459),new D(-1740746414,-295247957),new D(-1473132947,766784016),new D(-1341970488,-1728372417),new D(-1084653625,-1091629340),new D(-958395405,1034457026),new D(-710438585,-1828018395),new D(113926993,-536640913),new D(338241895,168717936),new D(666307205,1188179964),new D(773529912,1546045734),new D(1294757372,1522805485),new D(1396182291,-1651133473),new D(1695183700,-1951439906),new D(1986661051,1014477480),new D(-2117940946,1206759142),new D(-1838011259,344077627),new D(-1564481375,1290863460),new D(-1474664885,-1136513023),new D(-1035236496,-789014639),new D(-949202525,106217008),new D(-778901479,-688958952),new D(-694614492,1432725776),new D(-200395387,1467031594),new D(275423344,851169720),new D(430227734,-1194143544),new D(506948616,1363258195),new D(659060556,-544281703),new D(883997877,-509917016),new D(958139571,-976659869),new D(1322822218,-482243893),new D(1537002063,2003034995),new D(1747873779,-692930397),new D(1955562222,1575990012),new D(2024104815,1125592928),new D(-2067236844,-1578062990),new D(-1933114872,442776044),new D(-1866530822,593698344),new D(-1538233109,-561857047),new D(-1090935817,-1295615723),new D(-965641998,-479046869),new D(-903397682,-366583396),new D(-779700025,566280711),new D(-354779690,-840897762),new D(-176337025,-294727304),new D(116418474,1914138554),new D(174292421,-1563912026),new D(289380356,-1090974290),new D(460393269,320620315),new D(685471733,587496836),new D(852142971,1086792851),new D(1017036298,365543100),new D(1126000580,-1676669620),new D(1288033470,-885112138),new D(1501505948,-60457430),new D(1607167915,987167468),new D(1816402316,1246189591)));
        const i = new Array(new D(1779033703,-205731576),new D(-1150833019,-2067093701),new D(1013904242,-23791573),new D(-1521486534,1595750129),new D(1359893119,-1377402159),new D(-1694144372,725511199),new D(528734635,-79577749),new D(1541459225,327033209))
          , n = new D(0,0)
          , a = new D(0,0)
          , r = new D(0,0)
          , s = new D(0,0)
          , o = new D(0,0)
          , l = new D(0,0)
          , T = new D(0,0)
          , g = new D(0,0)
          , f = new D(0,0)
          , A = new D(0,0)
          , v = new D(0,0)
          , I = new D(0,0)
          , S = new D(0,0)
          , b = new D(0,0)
          , P = new D(0,0)
          , L = new D(0,0)
          , R = new D(0,0);
        let N, z;
        const y = new Array(80);
        for (z = 0; z < 80; z++)
            y[z] = new D(0,0);
        for (e[t >> 5] |= 128 << 24 - (31 & t),
        e[31 + (t + 128 >> 10 << 5)] = t,
        z = 0; z < e.length; z += 32) {
            for (c(r, i[0]),
            c(s, i[1]),
            c(o, i[2]),
            c(l, i[3]),
            c(T, i[4]),
            c(g, i[5]),
            c(f, i[6]),
            c(A, i[7]),
            N = 0; N < 16; N++)
                y[N].h = e[z + 2 * N],
                y[N].l = e[z + 2 * N + 1];
            for (N = 16; N < 80; N++)
                d(P, y[N - 2], 19),
                u(L, y[N - 2], 29),
                p(R, y[N - 2], 6),
                I.l = P.l ^ L.l ^ R.l,
                I.h = P.h ^ L.h ^ R.h,
                d(P, y[N - 15], 1),
                d(L, y[N - 15], 8),
                p(R, y[N - 15], 7),
                v.l = P.l ^ L.l ^ R.l,
                v.h = P.h ^ L.h ^ R.h,
                m(y[N], I, y[N - 7], v, y[N - 16]);
            for (N = 0; N < 80; N++)
                S.l = T.l & g.l ^ ~T.l & f.l,
                S.h = T.h & g.h ^ ~T.h & f.h,
                d(P, T, 14),
                d(L, T, 18),
                u(R, T, 9),
                I.l = P.l ^ L.l ^ R.l,
                I.h = P.h ^ L.h ^ R.h,
                d(P, r, 28),
                u(L, r, 2),
                u(R, r, 7),
                v.l = P.l ^ L.l ^ R.l,
                v.h = P.h ^ L.h ^ R.h,
                b.l = r.l & s.l ^ r.l & o.l ^ s.l & o.l,
                b.h = r.h & s.h ^ r.h & o.h ^ s.h & o.h,
                E(n, A, I, S, O[N], y[N]),
                h(a, v, b),
                c(A, f),
                c(f, g),
                c(g, T),
                h(T, l, n),
                c(l, o),
                c(o, s),
                c(s, r),
                h(r, n, a);
            h(i[0], i[0], r),
            h(i[1], i[1], s),
            h(i[2], i[2], o),
            h(i[3], i[3], l),
            h(i[4], i[4], T),
            h(i[5], i[5], g),
            h(i[6], i[6], f),
            h(i[7], i[7], A)
        }
        const M = new Array(16);
        for (z = 0; z < 8; z++)
            M[2 * z] = i[z].h,
            M[2 * z + 1] = i[z].l;
        return M
    }(function(e) {
        const t = Array(e.length >> 2);
        let i, n;
        for (i = 0; i < t.length; i++)
            t[i] = 0;
        for (n = 0; n < 8 * e.length; n += 8)
            t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << 24 - n % 32;
        return t
    }(e), 8 * e.length))
}

function D(e, t) {
    this.h = e,
    this.l = t
}

function c(e, t) {
    e.h = t.h,
    e.l = t.l
}

function d(e, t, i) {
    e.l = t.l >>> i | t.h << 32 - i,
    e.h = t.h >>> i | t.l << 32 - i
}

function u(e, t, i) {
    e.l = t.h >>> i | t.l << 32 - i,
    e.h = t.l >>> i | t.h << 32 - i
}

function p(e, t, i) {
    e.l = t.l >>> i | t.h << 32 - i,
    e.h = t.h >>> i
}

function m(e, t, i, n, a) {
    const r = (65535 & t.l) + (65535 & i.l) + (65535 & n.l) + (65535 & a.l)
      , s = (t.l >>> 16) + (i.l >>> 16) + (n.l >>> 16) + (a.l >>> 16) + (r >>> 16)
      , O = (65535 & t.h) + (65535 & i.h) + (65535 & n.h) + (65535 & a.h) + (s >>> 16)
      , o = (t.h >>> 16) + (i.h >>> 16) + (n.h >>> 16) + (a.h >>> 16) + (O >>> 16);
    e.l = 65535 & r | s << 16,
    e.h = 65535 & O | o << 16
}

function E(e, t, i, n, a, r) {
    const s = (65535 & t.l) + (65535 & i.l) + (65535 & n.l) + (65535 & a.l) + (65535 & r.l)
      , O = (t.l >>> 16) + (i.l >>> 16) + (n.l >>> 16) + (a.l >>> 16) + (r.l >>> 16) + (s >>> 16)
      , o = (65535 & t.h) + (65535 & i.h) + (65535 & n.h) + (65535 & a.h) + (65535 & r.h) + (O >>> 16)
      , l = (t.h >>> 16) + (i.h >>> 16) + (n.h >>> 16) + (a.h >>> 16) + (r.h >>> 16) + (o >>> 16);
    e.l = 65535 & s | O << 16,
    e.h = 65535 & o | l << 16
}

function h(e, t, i) {
    const n = (65535 & t.l) + (65535 & i.l)
      , a = (t.l >>> 16) + (i.l >>> 16) + (n >>> 16)
      , r = (65535 & t.h) + (65535 & i.h) + (a >>> 16)
      , s = (t.h >>> 16) + (i.h >>> 16) + (r >>> 16);
    e.l = 65535 & n | a << 16,
    e.h = 65535 & r | s << 16
}

function g(e, t) {
    let i, n = "";
    for (i = 0; i < Math.floor(t / 64); i++)
        n += e;
    return n += e.substr(0, t % 64),
    n
}



function lpad(e, t, i) {
    i = i || 2;
    let n = e.toString();
    for (; n.length < i; )
          n = t + n;
      return n
  }



module.exports = {
 hash_function : unknown_hash,
 lpad: lpad
}