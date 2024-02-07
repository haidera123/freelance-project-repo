/*
 accounting.js v0.4.2
 Copyright 2014 Open Exchange Rates

 Freely distributable under the MIT license.
 Portions of accounting.js are inspired or borrowed from underscore.js

 Full details and documentation:
 http://openexchangerates.github.io/accounting.js/
 VERSION: 1.19.1
 DATE: 2017-01-17
 UPDATES AND DOCS AT: http://greensock.com

 Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin

 @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 This work is subject to the terms at http://greensock.com/standard-license or for
 Club GreenSock members, the software agreement that was issued with your membership.

 @author: Jack Doyle, jack@greensock.com
 VERSION: 0.15.0
 DATE: 2017-01-17
 UPDATES AND DOCS AT: http://greensock.com

 Requires TweenLite and CSSPlugin version 1.17.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).

 @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 This work is subject to the terms at http://greensock.com/standard-license or for
 Club GreenSock members, the software agreement that was issued with your membership.

 @author: Jack Doyle, jack@greensock.com
 VERSION: 0.11.0
 DATE: 2017-01-17
 UPDATES AND DOCS AT: http://greensock.com

 @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 ThrowPropsPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 This work is subject to the software agreement that was issued with your membership.

 @author: Jack Doyle, jack@greensock.com
*/
(function (w, z) {
  function e(a) {
    return !!("" === a || (a && a.charCodeAt && a.substr));
  }
  function L(a) {
    return r ? r(a) : "[object Array]" === N.call(a);
  }
  function q(a) {
    return a && "[object Object]" === N.call(a);
  }
  function x(a, b) {
    var c;
    a = a || {};
    b = b || {};
    for (c in b) b.hasOwnProperty(c) && null == a[c] && (a[c] = b[c]);
    return a;
  }
  function J(a, b, f) {
    var c = [],
      h;
    if (!a) return c;
    if (t && a.map === t) return a.map(b, f);
    var p = 0;
    for (h = a.length; p < h; p++) c[p] = b.call(f, a[p], p, a);
    return c;
  }
  function B(a, b) {
    a = Math.round(Math.abs(a));
    return isNaN(a) ? b : a;
  }
  function F(a) {
    var b = d.settings.currency.format;
    "function" === typeof a && (a = a());
    return e(a) && a.match("%v")
      ? { pos: a, neg: a.replace("-", "").replace("%v", "-%v"), zero: a }
      : a && a.pos && a.pos.match("%v")
      ? a
      : e(b)
      ? (d.settings.currency.format = {
          pos: b,
          neg: b.replace("%v", "-%v"),
          zero: b,
        })
      : b;
  }
  var d = {
      version: "0.4.2",
      settings: {
        currency: {
          symbol: "$",
          format: "%s%v",
          decimal: ".",
          thousand: ",",
          precision: 2,
          grouping: 3,
        },
        number: { precision: 0, grouping: 3, thousand: ",", decimal: "." },
      },
    },
    t = Array.prototype.map,
    r = Array.isArray,
    N = Object.prototype.toString,
    C =
      (d.unformat =
      d.parse =
        function (a, b) {
          if (L(a))
            return J(a, function (a) {
              return C(a, b);
            });
          a = a || 0;
          if ("number" === typeof a) return a;
          b = b || d.settings.number.decimal;
          var f = new RegExp("[^0-9-" + b + "]", ["g"]);
          a = parseFloat(
            ("" + a)
              .replace(/\((?=\d+)(.*)\)/, "-$1")
              .replace(f, "")
              .replace(b, ".")
          );
          return isNaN(a) ? 0 : a;
        }),
    b = (d.toFixed = function (a, b) {
      b = B(b, d.settings.number.precision);
      a = Number(d.unformat(a) + "e" + b);
      return Number(Math.round(a) + "e-" + b).toFixed(b);
    }),
    a =
      (d.formatNumber =
      d.format =
        function (f, p, h, m) {
          if (L(f))
            return J(f, function (b) {
              return a(b, p, h, m);
            });
          f = C(f);
          var c = x(
              q(p) ? p : { precision: p, thousand: h, decimal: m },
              d.settings.number
            ),
            r = B(c.precision),
            ha = 0 > f ? "-" : "",
            y = parseInt(b(Math.abs(f || 0), r), 10) + "",
            t = 3 < y.length ? y.length % 3 : 0;
          return (
            ha +
            (t ? y.substr(0, t) + c.thousand : "") +
            y.substr(t).replace(/(\d{3})(?=\d)/g, "$1" + c.thousand) +
            (r ? c.decimal + b(Math.abs(f), r).split(".")[1] : "")
          );
        }),
    f = (d.formatMoney = function (b, p, h, m, u, r) {
      if (L(b))
        return J(b, function (a) {
          return f(a, p, h, m, u, r);
        });
      b = C(b);
      var c = x(
          q(p)
            ? p
            : { symbol: p, precision: h, thousand: m, decimal: u, format: r },
          d.settings.currency
        ),
        K = F(c.format);
      return (0 < b ? K.pos : 0 > b ? K.neg : K.zero)
        .replace("%s", c.symbol)
        .replace("%v", a(Math.abs(b), B(c.precision), c.thousand, c.decimal));
    });
  d.formatColumn = function (b, f, h, m, u, r) {
    if (!b || !L(b)) return [];
    var c = x(
        q(f)
          ? f
          : { symbol: f, precision: h, thousand: m, decimal: u, format: r },
        d.settings.currency
      ),
      p = F(c.format),
      K = p.pos.indexOf("%s") < p.pos.indexOf("%v") ? !0 : !1,
      t = 0;
    b = J(b, function (b, f) {
      if (L(b)) return d.formatColumn(b, c);
      b = C(b);
      b = (0 < b ? p.pos : 0 > b ? p.neg : p.zero)
        .replace("%s", c.symbol)
        .replace("%v", a(Math.abs(b), B(c.precision), c.thousand, c.decimal));
      b.length > t && (t = b.length);
      return b;
    });
    return J(b, function (a, b) {
      return e(a) && a.length < t
        ? K
          ? a.replace(c.symbol, c.symbol + Array(t - a.length + 1).join(" "))
          : Array(t - a.length + 1).join(" ") + a
        : a;
    });
  };
  "undefined" !== typeof exports
    ? ("undefined" !== typeof module &&
        module.exports &&
        (exports = module.exports = d),
      (exports.accounting = d))
    : "function" === typeof define && define.amd
    ? define([], function () {
        return d;
      })
    : ((d.noConflict = (function (a) {
        return function () {
          w.accounting = a;
          d.noConflict = z;
          return d;
        };
      })(w.accounting)),
      (w.accounting = d));
})(this);
var _gsScope =
  "undefined" !== typeof module &&
  module.exports &&
  "undefined" !== typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  _gsScope._gsDefine(
    "TweenMax",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (w, z, e) {
      var L = function (b) {
          var a = [],
            f = b.length,
            c;
          for (c = 0; c !== f; a.push(b[c++]));
          return a;
        },
        q = function (b, a, f) {
          var c = b.cycle,
            p;
          for (p in c) {
            var h = c[p];
            b[p] = "function" === typeof h ? h(f, a[f]) : h[f % h.length];
          }
          delete b.cycle;
        },
        x = function (b, a, f) {
          e.call(this, b, a, f);
          this._cycle = 0;
          this._yoyo = !0 === this.vars.yoyo;
          this._repeat = this.vars.repeat || 0;
          this._repeatDelay = this.vars.repeatDelay || 0;
          this._dirty = !0;
          this.render = x.prototype.render;
        },
        J = e._internals,
        B = J.isSelector,
        F = J.isArray,
        d = (x.prototype = e.to({}, 0.1, {})),
        t = [];
      x.version = "1.19.1";
      d.constructor = x;
      d.kill()._gc = !1;
      x.killTweensOf = x.killDelayedCallsTo = e.killTweensOf;
      x.getTweensOf = e.getTweensOf;
      x.lagSmoothing = e.lagSmoothing;
      x.ticker = e.ticker;
      x.render = e.render;
      d.invalidate = function () {
        this._yoyo = !0 === this.vars.yoyo;
        this._repeat = this.vars.repeat || 0;
        this._repeatDelay = this.vars.repeatDelay || 0;
        this._uncache(!0);
        return e.prototype.invalidate.call(this);
      };
      d.updateTo = function (b, a) {
        var f = this.ratio,
          c = this.vars.immediateRender || b.immediateRender,
          p;
        a &&
          this._startTime < this._timeline._time &&
          ((this._startTime = this._timeline._time),
          this._uncache(!1),
          this._gc
            ? this._enabled(!0, !1)
            : this._timeline.insert(this, this._startTime - this._delay));
        for (p in b) this.vars[p] = b[p];
        if (this._initted || c)
          if (a) (this._initted = !1), c && this.render(0, !0, !0);
          else if (
            (this._gc && this._enabled(!0, !1),
            this._notifyPluginsOfEnabled &&
              this._firstPT &&
              e._onPluginEvent("_onDisable", this),
            0.998 < this._time / this._duration)
          )
            (b = this._totalTime),
              this.render(0, !0, !1),
              (this._initted = !1),
              this.render(b, !0, !1);
          else if (((this._initted = !1), this._init(), 0 < this._time || c))
            for (b = 1 / (1 - f), a = this._firstPT; a; )
              (f = a.s + a.c), (a.c *= b), (a.s = f - a.c), (a = a._next);
        return this;
      };
      d.render = function (b, a, f) {
        this._initted ||
          (0 === this._duration && this.vars.repeat && this.invalidate());
        var c = this._dirty ? this.totalDuration() : this._totalDuration,
          p = this._time,
          h = this._totalTime,
          m = this._cycle,
          d = this._duration,
          r = this._rawPrevTime,
          t;
        if (b >= c - 1e-7 && 0 <= b) {
          this._totalTime = c;
          this._cycle = this._repeat;
          this._yoyo && 0 !== (this._cycle & 1)
            ? ((this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0))
            : ((this._time = d),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1));
          if (!this._reversed) {
            var y = !0;
            var e = "onComplete";
            f = f || this._timeline.autoRemoveChildren;
          }
          0 !== d ||
            (!this._initted && this.vars.lazy && !f) ||
            (this._startTime === this._timeline._duration && (b = 0),
            (0 > r ||
              (0 >= b && -1e-7 <= b) ||
              (1e-10 === r && "isPause" !== this.data)) &&
              r !== b &&
              ((f = !0), 1e-10 < r && (e = "onReverseComplete")),
            (this._rawPrevTime = t = !a || b || r === b ? b : 1e-10));
        } else if (1e-7 > b) {
          this._totalTime = this._time = this._cycle = 0;
          this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
          if (0 !== h || (0 === d && 0 < r))
            (e = "onReverseComplete"), (y = this._reversed);
          0 > b &&
            ((this._active = !1),
            0 !== d ||
              (!this._initted && this.vars.lazy && !f) ||
              (0 <= r && (f = !0),
              (this._rawPrevTime = t = !a || b || r === b ? b : 1e-10)));
          this._initted || (f = !0);
        } else if (
          ((this._totalTime = this._time = b),
          0 !== this._repeat &&
            ((c = d + this._repeatDelay),
            (this._cycle = (this._totalTime / c) >> 0),
            0 !== this._cycle &&
              this._cycle === this._totalTime / c &&
              h <= b &&
              this._cycle--,
            (this._time = this._totalTime - this._cycle * c),
            this._yoyo &&
              0 !== (this._cycle & 1) &&
              (this._time = d - this._time),
            this._time > d
              ? (this._time = d)
              : 0 > this._time && (this._time = 0)),
          this._easeType)
        ) {
          c = this._time / d;
          var q = this._easeType;
          var H = this._easePower;
          if (1 === q || (3 === q && 0.5 <= c)) c = 1 - c;
          3 === q && (c *= 2);
          1 === H
            ? (c *= c)
            : 2 === H
            ? (c *= c * c)
            : 3 === H
            ? (c *= c * c * c)
            : 4 === H && (c *= c * c * c * c);
          this.ratio =
            1 === q
              ? 1 - c
              : 2 === q
              ? c
              : 0.5 > this._time / d
              ? c / 2
              : 1 - c / 2;
        } else this.ratio = this._ease.getRatio(this._time / d);
        if (p !== this._time || f || m !== this._cycle) {
          if (!this._initted) {
            this._init();
            if (!this._initted || this._gc) return;
            if (
              !f &&
              this._firstPT &&
              ((!1 !== this.vars.lazy && this._duration) ||
                (this.vars.lazy && !this._duration))
            ) {
              this._time = p;
              this._totalTime = h;
              this._rawPrevTime = r;
              this._cycle = m;
              J.lazyTweens.push(this);
              this._lazy = [b, a];
              return;
            }
            this._time && !y
              ? (this.ratio = this._ease.getRatio(this._time / d))
              : y &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          !1 !== this._lazy && (this._lazy = !1);
          !this._active &&
            !this._paused &&
            this._time !== p &&
            0 <= b &&
            (this._active = !0);
          0 === h &&
            (2 === this._initted && 0 < b && this._init(),
            this._startAt &&
              (0 <= b ? this._startAt.render(b, a, f) : e || (e = "_dummyGS")),
            !this.vars.onStart ||
              (0 === this._totalTime && 0 !== d) ||
              a ||
              this._callback("onStart"));
          for (p = this._firstPT; p; ) {
            if (p.f) p.t[p.p](p.c * this.ratio + p.s);
            else p.t[p.p] = p.c * this.ratio + p.s;
            p = p._next;
          }
          this._onUpdate &&
            (0 > b &&
              this._startAt &&
              this._startTime &&
              this._startAt.render(b, a, f),
            a || ((this._totalTime !== h || e) && this._callback("onUpdate")));
          this._cycle !== m &&
            (a ||
              this._gc ||
              (this.vars.onRepeat && this._callback("onRepeat")));
          !e ||
            (this._gc && !f) ||
            (0 > b &&
              this._startAt &&
              !this._onUpdate &&
              this._startTime &&
              this._startAt.render(b, a, f),
            y &&
              (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
              (this._active = !1)),
            !a && this.vars[e] && this._callback(e),
            0 === d &&
              1e-10 === this._rawPrevTime &&
              1e-10 !== t &&
              (this._rawPrevTime = 0));
        } else
          h !== this._totalTime &&
            this._onUpdate &&
            (a || this._callback("onUpdate"));
      };
      x.to = function (b, a, f) {
        return new x(b, a, f);
      };
      x.from = function (b, a, f) {
        f.runBackwards = !0;
        f.immediateRender = 0 != f.immediateRender;
        return new x(b, a, f);
      };
      x.fromTo = function (b, a, f, c) {
        c.startAt = f;
        c.immediateRender = 0 != c.immediateRender && 0 != f.immediateRender;
        return new x(b, a, c);
      };
      x.staggerTo = x.allTo = function (b, a, f, c, p, h, m) {
        c = c || 0;
        var d = 0,
          r = [],
          ha = function () {
            f.onComplete &&
              f.onComplete.apply(f.onCompleteScope || this, arguments);
            p.apply(m || f.callbackScope || this, h || t);
          },
          y = f.cycle,
          N = f.startAt && f.startAt.cycle,
          C,
          H;
        F(b) ||
          ("string" === typeof b && (b = e.selector(b) || b),
          B(b) && (b = L(b)));
        b = b || [];
        0 > c && ((b = L(b)), b.reverse(), (c *= -1));
        var w = b.length - 1;
        for (C = 0; C <= w; C++) {
          var A = {};
          for (H in f) A[H] = f[H];
          y &&
            (q(A, b, C),
            null != A.duration && ((a = A.duration), delete A.duration));
          if (N) {
            N = A.startAt = {};
            for (H in f.startAt) N[H] = f.startAt[H];
            q(A.startAt, b, C);
          }
          A.delay = d + (A.delay || 0);
          C === w && p && (A.onComplete = ha);
          r[C] = new x(b[C], a, A);
          d += c;
        }
        return r;
      };
      x.staggerFrom = x.allFrom = function (b, a, f, c, p, h, m) {
        f.runBackwards = !0;
        f.immediateRender = 0 != f.immediateRender;
        return x.staggerTo(b, a, f, c, p, h, m);
      };
      x.staggerFromTo = x.allFromTo = function (b, a, f, c, p, h, m, d) {
        c.startAt = f;
        c.immediateRender = 0 != c.immediateRender && 0 != f.immediateRender;
        return x.staggerTo(b, a, c, p, h, m, d);
      };
      x.delayedCall = function (b, a, f, c, p) {
        return new x(a, 0, {
          delay: b,
          onComplete: a,
          onCompleteParams: f,
          callbackScope: c,
          onReverseComplete: a,
          onReverseCompleteParams: f,
          immediateRender: !1,
          useFrames: p,
          overwrite: 0,
        });
      };
      x.set = function (b, a) {
        return new x(b, 0, a);
      };
      x.isTweening = function (b) {
        return 0 < e.getTweensOf(b, !0).length;
      };
      var r = function (b, a) {
          var f = [],
            c = 0;
          for (b = b._first; b; )
            b instanceof e
              ? (f[c++] = b)
              : (a && (f[c++] = b), (f = f.concat(r(b, a))), (c = f.length)),
              (b = b._next);
          return f;
        },
        N = (x.getAllTweens = function (b) {
          return r(w._rootTimeline, b).concat(r(w._rootFramesTimeline, b));
        });
      x.killAll = function (b, a, f, c) {
        null == a && (a = !0);
        null == f && (f = !0);
        var p = N(0 != c),
          h = p.length;
        c = a && f && c;
        var m, d;
        for (d = 0; d < h; d++) {
          var r = p[d];
          if (
            c ||
            r instanceof z ||
            ((m = r.target === r.vars.onComplete) && f) ||
            (a && !m)
          )
            b
              ? r.totalTime(r._reversed ? 0 : r.totalDuration())
              : r._enabled(!1, !1);
        }
      };
      x.killChildTweensOf = function (b, a) {
        if (null != b) {
          var f = J.tweenLookup,
            c,
            p;
          "string" === typeof b && (b = e.selector(b) || b);
          B(b) && (b = L(b));
          if (F(b)) for (f = b.length; -1 < --f; ) x.killChildTweensOf(b[f], a);
          else {
            var h = [];
            for (p in f)
              for (c = f[p].target.parentNode; c; )
                c === b && (h = h.concat(f[p].tweens)), (c = c.parentNode);
            b = h.length;
            for (f = 0; f < b; f++)
              a && h[f].totalTime(h[f].totalDuration()), h[f]._enabled(!1, !1);
          }
        }
      };
      var C = function (b, a, f, c) {
        a = !1 !== a;
        f = !1 !== f;
        c = !1 !== c;
        var p = N(c);
        c = a && f && c;
        for (var h = p.length, m, d; -1 < --h; )
          (d = p[h]),
            (c ||
              d instanceof z ||
              ((m = d.target === d.vars.onComplete) && f) ||
              (a && !m)) &&
              d.paused(b);
      };
      x.pauseAll = function (b, a, f) {
        C(!0, b, a, f);
      };
      x.resumeAll = function (b, a, f) {
        C(!1, b, a, f);
      };
      x.globalTimeScale = function (b) {
        var a = w._rootTimeline,
          f = e.ticker.time;
        if (!arguments.length) return a._timeScale;
        b = b || 1e-10;
        a._startTime = f - ((f - a._startTime) * a._timeScale) / b;
        a = w._rootFramesTimeline;
        f = e.ticker.frame;
        a._startTime = f - ((f - a._startTime) * a._timeScale) / b;
        return (a._timeScale = w._rootTimeline._timeScale = b);
      };
      d.progress = function (b, a) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && 0 !== (this._cycle & 1) ? 1 - b : b) +
                this._cycle * (this._duration + this._repeatDelay),
              a
            )
          : this._time / this.duration();
      };
      d.totalProgress = function (b, a) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * b, a)
          : this._totalTime / this.totalDuration();
      };
      d.time = function (b, a) {
        if (!arguments.length) return this._time;
        this._dirty && this.totalDuration();
        b > this._duration && (b = this._duration);
        this._yoyo && 0 !== (this._cycle & 1)
          ? (b =
              this._duration -
              b +
              this._cycle * (this._duration + this._repeatDelay))
          : 0 !== this._repeat &&
            (b += this._cycle * (this._duration + this._repeatDelay));
        return this.totalTime(b, a);
      };
      d.duration = function (b) {
        return arguments.length
          ? w.prototype.duration.call(this, b)
          : this._duration;
      };
      d.totalDuration = function (b) {
        return arguments.length
          ? -1 === this._repeat
            ? this
            : this.duration(
                (b - this._repeat * this._repeatDelay) / (this._repeat + 1)
              )
          : (this._dirty &&
              ((this._totalDuration =
                -1 === this._repeat
                  ? 999999999999
                  : this._duration * (this._repeat + 1) +
                    this._repeatDelay * this._repeat),
              (this._dirty = !1)),
            this._totalDuration);
      };
      d.repeat = function (b) {
        if (!arguments.length) return this._repeat;
        this._repeat = b;
        return this._uncache(!0);
      };
      d.repeatDelay = function (b) {
        if (!arguments.length) return this._repeatDelay;
        this._repeatDelay = b;
        return this._uncache(!0);
      };
      d.yoyo = function (b) {
        if (!arguments.length) return this._yoyo;
        this._yoyo = b;
        return this;
      };
      return x;
    },
    !0
  );
  _gsScope._gsDefine(
    "TimelineLite",
    ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function (w, z, e) {
      var L = function (a) {
          z.call(this, a);
          this._labels = {};
          this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren;
          this.smoothChildTiming = !0 === this.vars.smoothChildTiming;
          this._sortChildren = !0;
          this._onUpdate = this.vars.onUpdate;
          a = this.vars;
          var b;
          for (b in a) {
            var c = a[b];
            B(c) &&
              -1 !== c.join("").indexOf("{self}") &&
              (a[b] = this._swapSelfInParams(c));
          }
          B(a.tweens) && this.add(a.tweens, 0, a.align, a.stagger);
        },
        q = e._internals,
        x = (L._internals = {}),
        J = q.isSelector,
        B = q.isArray,
        F = q.lazyTweens,
        d = q.lazyRender,
        t = _gsScope._gsDefine.globals,
        r = function (a) {
          var b = {},
            c;
          for (c in a) b[c] = a[c];
          return b;
        },
        N = function (a, b, c) {
          var f = a.cycle,
            h;
          for (h in f) {
            var m = f[h];
            a[h] = "function" === typeof m ? m(c, b[c]) : m[c % m.length];
          }
          delete a.cycle;
        },
        C = (x.pauseCallback = function () {}),
        b = function (a) {
          var b = [],
            c = a.length,
            p;
          for (p = 0; p !== c; b.push(a[p++]));
          return b;
        };
      q = L.prototype = new z();
      L.version = "1.19.1";
      q.constructor = L;
      q.kill()._gc = q._forcingPlayhead = q._hasPause = !1;
      q.to = function (a, b, c, p) {
        var f = (c.repeat && t.TweenMax) || e;
        return b ? this.add(new f(a, b, c), p) : this.set(a, c, p);
      };
      q.from = function (a, b, c, p) {
        return this.add(((c.repeat && t.TweenMax) || e).from(a, b, c), p);
      };
      q.fromTo = function (a, b, c, p, h) {
        var f = (p.repeat && t.TweenMax) || e;
        return b ? this.add(f.fromTo(a, b, c, p), h) : this.set(a, p, h);
      };
      q.staggerTo = function (a, f, c, p, h, m, d, t) {
        m = new L({
          onComplete: m,
          onCompleteParams: d,
          callbackScope: t,
          smoothChildTiming: this.smoothChildTiming,
        });
        d = c.cycle;
        var u;
        "string" === typeof a && (a = e.selector(a) || a);
        a = a || [];
        J(a) && (a = b(a));
        p = p || 0;
        0 > p && ((a = b(a)), a.reverse(), (p *= -1));
        for (u = 0; u < a.length; u++)
          (t = r(c)),
            t.startAt &&
              ((t.startAt = r(t.startAt)),
              t.startAt.cycle && N(t.startAt, a, u)),
            d &&
              (N(t, a, u),
              null != t.duration && ((f = t.duration), delete t.duration)),
            m.to(a[u], f, t, u * p);
        return this.add(m, h);
      };
      q.staggerFrom = function (a, b, c, p, h, m, d, r) {
        c.immediateRender = 0 != c.immediateRender;
        c.runBackwards = !0;
        return this.staggerTo(a, b, c, p, h, m, d, r);
      };
      q.staggerFromTo = function (a, b, c, p, h, m, d, r, t) {
        p.startAt = c;
        p.immediateRender = 0 != p.immediateRender && 0 != c.immediateRender;
        return this.staggerTo(a, b, p, h, m, d, r, t);
      };
      q.call = function (a, b, c, p) {
        return this.add(e.delayedCall(0, a, b, c), p);
      };
      q.set = function (a, b, c) {
        c = this._parseTimeOrLabel(c, 0, !0);
        null == b.immediateRender &&
          (b.immediateRender = c === this._time && !this._paused);
        return this.add(new e(a, 0, b), c);
      };
      L.exportRoot = function (a, b) {
        a = a || {};
        null == a.smoothChildTiming && (a.smoothChildTiming = !0);
        a = new L(a);
        var c = a._timeline,
          f;
        null == b && (b = !0);
        c._remove(a, !0);
        a._startTime = 0;
        a._rawPrevTime = a._time = a._totalTime = c._time;
        for (f = c._first; f; ) {
          var h = f._next;
          (b && f instanceof e && f.target === f.vars.onComplete) ||
            a.add(f, f._startTime - f._delay);
          f = h;
        }
        c.add(a, 0);
        return a;
      };
      q.add = function (a, b, c, p) {
        var f, m;
        "number" !== typeof b && (b = this._parseTimeOrLabel(b, 0, !0, a));
        if (!(a instanceof w)) {
          if (a instanceof Array || (a && a.push && B(a))) {
            c = c || "normal";
            p = p || 0;
            var d = a.length;
            for (f = 0; f < d; f++)
              B((m = a[f])) && (m = new L({ tweens: m })),
                this.add(m, b),
                "string" !== typeof m &&
                  "function" !== typeof m &&
                  ("sequence" === c
                    ? (b = m._startTime + m.totalDuration() / m._timeScale)
                    : "start" === c && (m._startTime -= m.delay())),
                (b += p);
            return this._uncache(!0);
          }
          if ("string" === typeof a) return this.addLabel(a, b);
          if ("function" === typeof a) a = e.delayedCall(0, a);
          else
            throw (
              "Cannot add " +
              a +
              " into the timeline; it is not a tween, timeline, function, or string."
            );
        }
        z.prototype.add.call(this, a, b);
        if (
          (this._gc || this._time === this._duration) &&
          !this._paused &&
          this._duration < this.duration()
        )
          for (c = this, a = c.rawTime() > a._startTime; c._timeline; )
            a && c._timeline.smoothChildTiming
              ? c.totalTime(c._totalTime, !0)
              : c._gc && c._enabled(!0, !1),
              (c = c._timeline);
        return this;
      };
      q.remove = function (a) {
        if (a instanceof w) {
          this._remove(a, !1);
          var b = (a._timeline = a.vars.useFrames
            ? w._rootFramesTimeline
            : w._rootTimeline);
          a._startTime =
            (a._paused ? a._pauseTime : b._time) -
            (a._reversed ? a.totalDuration() - a._totalTime : a._totalTime) /
              a._timeScale;
          return this;
        }
        if (a instanceof Array || (a && a.push && B(a))) {
          for (b = a.length; -1 < --b; ) this.remove(a[b]);
          return this;
        }
        return "string" === typeof a ? this.removeLabel(a) : this.kill(null, a);
      };
      q._remove = function (a, b) {
        z.prototype._remove.call(this, a, b);
        this._last
          ? this._time > this.duration() &&
            ((this._time = this._duration),
            (this._totalTime = this._totalDuration))
          : (this._time =
              this._totalTime =
              this._duration =
              this._totalDuration =
                0);
        return this;
      };
      q.append = function (a, b) {
        return this.add(a, this._parseTimeOrLabel(null, b, !0, a));
      };
      q.insert = q.insertMultiple = function (a, b, c, p) {
        return this.add(a, b || 0, c, p);
      };
      q.appendMultiple = function (a, b, c, p) {
        return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, p);
      };
      q.addLabel = function (a, b) {
        this._labels[a] = this._parseTimeOrLabel(b);
        return this;
      };
      q.addPause = function (a, b, c, p) {
        c = e.delayedCall(0, C, c, p || this);
        c.vars.onComplete = c.vars.onReverseComplete = b;
        c.data = "isPause";
        this._hasPause = !0;
        return this.add(c, a);
      };
      q.removeLabel = function (a) {
        delete this._labels[a];
        return this;
      };
      q.getLabelTime = function (a) {
        return null != this._labels[a] ? this._labels[a] : -1;
      };
      q._parseTimeOrLabel = function (a, b, c, p) {
        var f;
        if (p instanceof w && p.timeline === this) this.remove(p);
        else if (p && (p instanceof Array || (p.push && B(p))))
          for (f = p.length; -1 < --f; )
            p[f] instanceof w && p[f].timeline === this && this.remove(p[f]);
        if ("string" === typeof b)
          return this._parseTimeOrLabel(
            b,
            c && "number" === typeof a && null == this._labels[b]
              ? a - this.duration()
              : 0,
            c
          );
        b = b || 0;
        if ("string" !== typeof a || (!isNaN(a) && null == this._labels[a]))
          null == a && (a = this.duration());
        else {
          f = a.indexOf("\x3d");
          if (-1 === f)
            return null == this._labels[a]
              ? c
                ? (this._labels[a] = this.duration() + b)
                : b
              : this._labels[a] + b;
          b = parseInt(a.charAt(f - 1) + "1", 10) * Number(a.substr(f + 1));
          a =
            1 < f
              ? this._parseTimeOrLabel(a.substr(0, f - 1), 0, c)
              : this.duration();
        }
        return Number(a) + b;
      };
      q.seek = function (a, b) {
        return this.totalTime(
          "number" === typeof a ? a : this._parseTimeOrLabel(a),
          !1 !== b
        );
      };
      q.stop = function () {
        return this.paused(!0);
      };
      q.gotoAndPlay = function (a, b) {
        return this.play(a, b);
      };
      q.gotoAndStop = function (a, b) {
        return this.pause(a, b);
      };
      q.render = function (a, b, c) {
        this._gc && this._enabled(!0, !1);
        var f = this._dirty ? this.totalDuration() : this._totalDuration,
          h = this._time,
          m = this._startTime,
          r = this._timeScale,
          t = this._paused,
          e,
          y;
        if (a >= f - 1e-7 && 0 <= a) {
          this._totalTime = this._time = f;
          if (!this._reversed && !this._hasPausedChild()) {
            var q = !0;
            var C = "onComplete";
            var H = !!this._timeline.autoRemoveChildren;
            0 === this._duration &&
              ((0 >= a && -1e-7 <= a) ||
                0 > this._rawPrevTime ||
                1e-10 === this._rawPrevTime) &&
              this._rawPrevTime !== a &&
              this._first &&
              ((H = !0),
              1e-10 < this._rawPrevTime && (C = "onReverseComplete"));
          }
          this._rawPrevTime =
            this._duration || !b || a || this._rawPrevTime === a ? a : 1e-10;
          a = f + 1e-4;
        } else if (1e-7 > a) {
          this._totalTime = this._time = 0;
          if (
            0 !== h ||
            (0 === this._duration &&
              1e-10 !== this._rawPrevTime &&
              (0 < this._rawPrevTime || (0 > a && 0 <= this._rawPrevTime)))
          )
            (C = "onReverseComplete"), (q = this._reversed);
          if (0 > a)
            (this._active = !1),
              this._timeline.autoRemoveChildren && this._reversed
                ? ((H = q = !0), (C = "onReverseComplete"))
                : 0 <= this._rawPrevTime && this._first && (H = !0),
              (this._rawPrevTime = a);
          else {
            this._rawPrevTime =
              this._duration || !b || a || this._rawPrevTime === a ? a : 1e-10;
            if (0 === a && q)
              for (e = this._first; e && 0 === e._startTime; )
                e._duration || (q = !1), (e = e._next);
            a = 0;
            this._initted || (H = !0);
          }
        } else {
          if (this._hasPause && !this._forcingPlayhead && !b) {
            if (a >= h)
              for (e = this._first; e && e._startTime <= a && !y; )
                e._duration ||
                  "isPause" !== e.data ||
                  e.ratio ||
                  (0 === e._startTime && 0 === this._rawPrevTime) ||
                  (y = e),
                  (e = e._next);
            else
              for (e = this._last; e && e._startTime >= a && !y; )
                e._duration ||
                  ("isPause" === e.data && 0 < e._rawPrevTime && (y = e)),
                  (e = e._prev);
            y &&
              ((this._time = a = y._startTime),
              (this._totalTime =
                a + this._cycle * (this._totalDuration + this._repeatDelay)));
          }
          this._totalTime = this._time = this._rawPrevTime = a;
        }
        if ((this._time !== h && this._first) || c || H || y) {
          this._initted || (this._initted = !0);
          !this._active &&
            !this._paused &&
            this._time !== h &&
            0 < a &&
            (this._active = !0);
          0 === h &&
            this.vars.onStart &&
            ((0 === this._time && this._duration) ||
              b ||
              this._callback("onStart"));
          var N = this._time;
          if (N >= h)
            for (e = this._first; e; ) {
              H = e._next;
              if (N !== this._time || (this._paused && !t)) break;
              else if (e._active || (e._startTime <= N && !e._paused && !e._gc))
                y === e && this.pause(),
                  e._reversed
                    ? e.render(
                        (e._dirty ? e.totalDuration() : e._totalDuration) -
                          (a - e._startTime) * e._timeScale,
                        b,
                        c
                      )
                    : e.render((a - e._startTime) * e._timeScale, b, c);
              e = H;
            }
          else
            for (e = this._last; e; ) {
              H = e._prev;
              if (N !== this._time || (this._paused && !t)) break;
              else if (
                e._active ||
                (e._startTime <= h && !e._paused && !e._gc)
              ) {
                if (y === e) {
                  for (y = e._prev; y && y.endTime() > this._time; )
                    y.render(
                      y._reversed
                        ? y.totalDuration() - (a - y._startTime) * y._timeScale
                        : (a - y._startTime) * y._timeScale,
                      b,
                      c
                    ),
                      (y = y._prev);
                  y = null;
                  this.pause();
                }
                e._reversed
                  ? e.render(
                      (e._dirty ? e.totalDuration() : e._totalDuration) -
                        (a - e._startTime) * e._timeScale,
                      b,
                      c
                    )
                  : e.render((a - e._startTime) * e._timeScale, b, c);
              }
              e = H;
            }
          this._onUpdate && !b && (F.length && d(), this._callback("onUpdate"));
          !C ||
            this._gc ||
            (m !== this._startTime && r === this._timeScale) ||
            !(0 === this._time || f >= this.totalDuration()) ||
            (q &&
              (F.length && d(),
              this._timeline.autoRemoveChildren && this._enabled(!1, !1),
              (this._active = !1)),
            !b && this.vars[C] && this._callback(C));
        }
      };
      q._hasPausedChild = function () {
        for (var a = this._first; a; ) {
          if (a._paused || (a instanceof L && a._hasPausedChild())) return !0;
          a = a._next;
        }
        return !1;
      };
      q.getChildren = function (a, b, c, p) {
        p = p || -9999999999;
        for (var f = [], m = this._first, d = 0; m; )
          m._startTime < p ||
            (m instanceof e
              ? !1 !== b && (f[d++] = m)
              : (!1 !== c && (f[d++] = m),
                !1 !== a &&
                  ((f = f.concat(m.getChildren(!0, b, c))), (d = f.length)))),
            (m = m._next);
        return f;
      };
      q.getTweensOf = function (a, b) {
        var c = this._gc,
          f = [],
          h = 0,
          m;
        c && this._enabled(!0, !0);
        a = e.getTweensOf(a);
        for (m = a.length; -1 < --m; )
          if (a[m].timeline === this || (b && this._contains(a[m])))
            f[h++] = a[m];
        c && this._enabled(!1, !0);
        return f;
      };
      q.recent = function () {
        return this._recent;
      };
      q._contains = function (a) {
        for (a = a.timeline; a; ) {
          if (a === this) return !0;
          a = a.timeline;
        }
        return !1;
      };
      q.shiftChildren = function (a, b, c) {
        c = c || 0;
        for (var f = this._first, h = this._labels, m; f; )
          f._startTime >= c && (f._startTime += a), (f = f._next);
        if (b) for (m in h) h[m] >= c && (h[m] += a);
        return this._uncache(!0);
      };
      q._kill = function (a, b) {
        if (!a && !b) return this._enabled(!1, !1);
        for (
          var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1),
            f = c.length,
            h = !1;
          -1 < --f;

        )
          c[f]._kill(a, b) && (h = !0);
        return h;
      };
      q.clear = function (a) {
        var b = this.getChildren(!1, !0, !0),
          c = b.length;
        for (this._time = this._totalTime = 0; -1 < --c; )
          b[c]._enabled(!1, !1);
        !1 !== a && (this._labels = {});
        return this._uncache(!0);
      };
      q.invalidate = function () {
        for (var a = this._first; a; ) a.invalidate(), (a = a._next);
        return w.prototype.invalidate.call(this);
      };
      q._enabled = function (a, b) {
        if (a === this._gc)
          for (var c = this._first; c; ) c._enabled(a, !0), (c = c._next);
        return z.prototype._enabled.call(this, a, b);
      };
      q.totalTime = function (a, b, c) {
        this._forcingPlayhead = !0;
        var f = w.prototype.totalTime.apply(this, arguments);
        this._forcingPlayhead = !1;
        return f;
      };
      q.duration = function (a) {
        if (!arguments.length)
          return this._dirty && this.totalDuration(), this._duration;
        0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a);
        return this;
      };
      q.totalDuration = function (a) {
        if (!arguments.length) {
          if (this._dirty) {
            for (var b = 0, c = this._last, d = 999999999999, h; c; )
              (h = c._prev),
                c._dirty && c.totalDuration(),
                c._startTime > d && this._sortChildren && !c._paused
                  ? this.add(c, c._startTime - c._delay)
                  : (d = c._startTime),
                0 > c._startTime &&
                  !c._paused &&
                  ((b -= c._startTime),
                  this._timeline.smoothChildTiming &&
                    (this._startTime += c._startTime / this._timeScale),
                  this.shiftChildren(-c._startTime, !1, -9999999999),
                  (d = 0)),
                (c = c._startTime + c._totalDuration / c._timeScale),
                c > b && (b = c),
                (c = h);
            this._duration = this._totalDuration = b;
            this._dirty = !1;
          }
          return this._totalDuration;
        }
        return a && this.totalDuration()
          ? this.timeScale(this._totalDuration / a)
          : this;
      };
      q.paused = function (a) {
        if (!a)
          for (var b = this._first, c = this._time; b; )
            b._startTime === c && "isPause" === b.data && (b._rawPrevTime = 0),
              (b = b._next);
        return w.prototype.paused.apply(this, arguments);
      };
      q.usesFrames = function () {
        for (var a = this._timeline; a._timeline; ) a = a._timeline;
        return a === w._rootFramesTimeline;
      };
      q.rawTime = function (a) {
        return a &&
          (this._paused ||
            (this._repeat && 0 < this.time() && 1 > this.totalProgress()))
          ? this._totalTime % (this._duration + this._repeatDelay)
          : this._paused
          ? this._totalTime
          : (this._timeline.rawTime(a) - this._startTime) * this._timeScale;
      };
      return L;
    },
    !0
  );
  _gsScope._gsDefine(
    "TimelineMax",
    ["TimelineLite", "TweenLite", "easing.Ease"],
    function (w, z, e) {
      var L = function (d) {
          w.call(this, d);
          this._repeat = this.vars.repeat || 0;
          this._repeatDelay = this.vars.repeatDelay || 0;
          this._cycle = 0;
          this._yoyo = !0 === this.vars.yoyo;
          this._dirty = !0;
        },
        q = z._internals,
        x = q.lazyTweens,
        J = q.lazyRender,
        B = _gsScope._gsDefine.globals,
        F = new e(null, null, 1, 0);
      e = L.prototype = new w();
      e.constructor = L;
      e.kill()._gc = !1;
      L.version = "1.19.1";
      e.invalidate = function () {
        this._yoyo = !0 === this.vars.yoyo;
        this._repeat = this.vars.repeat || 0;
        this._repeatDelay = this.vars.repeatDelay || 0;
        this._uncache(!0);
        return w.prototype.invalidate.call(this);
      };
      e.addCallback = function (d, e, r, q) {
        return this.add(z.delayedCall(0, d, r, q), e);
      };
      e.removeCallback = function (d, e) {
        if (d)
          if (null == e) this._kill(null, d);
          else {
            d = this.getTweensOf(d, !1);
            var r = d.length;
            for (e = this._parseTimeOrLabel(e); -1 < --r; )
              d[r]._startTime === e && d[r]._enabled(!1, !1);
          }
        return this;
      };
      e.removePause = function (d) {
        return this.removeCallback(w._internals.pauseCallback, d);
      };
      e.tweenTo = function (d, e) {
        e = e || {};
        var r = { ease: F, useFrames: this.usesFrames(), immediateRender: !1 },
          t = (e.repeat && B.TweenMax) || z,
          q;
        for (q in e) r[q] = e[q];
        r.time = this._parseTimeOrLabel(d);
        var b =
          Math.abs(Number(r.time) - this._time) / this._timeScale || 0.001;
        var a = new t(this, b, r);
        r.onStart = function () {
          a.target.paused(!0);
          a.vars.time !== a.target.time() &&
            b === a.duration() &&
            a.duration(
              Math.abs(a.vars.time - a.target.time()) / a.target._timeScale
            );
          e.onStart &&
            e.onStart.apply(
              e.onStartScope || e.callbackScope || a,
              e.onStartParams || []
            );
        };
        return a;
      };
      e.tweenFromTo = function (d, e, r) {
        r = r || {};
        d = this._parseTimeOrLabel(d);
        r.startAt = {
          onComplete: this.seek,
          onCompleteParams: [d],
          callbackScope: this,
        };
        r.immediateRender = !1 !== r.immediateRender;
        e = this.tweenTo(e, r);
        return e.duration(Math.abs(e.vars.time - d) / this._timeScale || 0.001);
      };
      e.render = function (d, e, r) {
        this._gc && this._enabled(!0, !1);
        var t = this._dirty ? this.totalDuration() : this._totalDuration,
          q = this._duration,
          b = this._time,
          a = this._totalTime,
          f = this._startTime,
          c = this._timeScale,
          p = this._rawPrevTime,
          h = this._paused,
          m = this._cycle,
          u,
          K;
        if (d >= t - 1e-7 && 0 <= d) {
          this._locked || ((this._totalTime = t), (this._cycle = this._repeat));
          if (!this._reversed && !this._hasPausedChild()) {
            var w = !0;
            var y = "onComplete";
            var U = !!this._timeline.autoRemoveChildren;
            0 === this._duration &&
              ((0 >= d && -1e-7 <= d) || 0 > p || 1e-10 === p) &&
              p !== d &&
              this._first &&
              ((U = !0), 1e-10 < p && (y = "onReverseComplete"));
          }
          this._rawPrevTime =
            this._duration || !e || d || this._rawPrevTime === d ? d : 1e-10;
          this._yoyo && 0 !== (this._cycle & 1)
            ? (this._time = d = 0)
            : ((this._time = q), (d = q + 1e-4));
        } else if (1e-7 > d) {
          this._locked || (this._totalTime = this._cycle = 0);
          this._time = 0;
          if (
            0 !== b ||
            (0 === q &&
              1e-10 !== p &&
              (0 < p || (0 > d && 0 <= p)) &&
              !this._locked)
          )
            (y = "onReverseComplete"), (w = this._reversed);
          if (0 > d)
            (this._active = !1),
              this._timeline.autoRemoveChildren && this._reversed
                ? ((U = w = !0), (y = "onReverseComplete"))
                : 0 <= p && this._first && (U = !0),
              (this._rawPrevTime = d);
          else {
            this._rawPrevTime =
              q || !e || d || this._rawPrevTime === d ? d : 1e-10;
            if (0 === d && w)
              for (u = this._first; u && 0 === u._startTime; )
                u._duration || (w = !1), (u = u._next);
            d = 0;
            this._initted || (U = !0);
          }
        } else if (
          (0 === q && 0 > p && (U = !0),
          (this._time = this._rawPrevTime = d),
          this._locked ||
            ((this._totalTime = d),
            0 !== this._repeat &&
              ((u = q + this._repeatDelay),
              (this._cycle = (this._totalTime / u) >> 0),
              0 !== this._cycle &&
                this._cycle === this._totalTime / u &&
                a <= d &&
                this._cycle--,
              (this._time = this._totalTime - this._cycle * u),
              this._yoyo &&
                0 !== (this._cycle & 1) &&
                (this._time = q - this._time),
              this._time > q
                ? ((this._time = q), (d = q + 1e-4))
                : 0 > this._time
                ? (this._time = d = 0)
                : (d = this._time))),
          this._hasPause && !this._forcingPlayhead && !e && d < q)
        ) {
          d = this._time;
          if (d >= b || (this._repeat && m !== this._cycle))
            for (u = this._first; u && u._startTime <= d && !K; )
              u._duration ||
                "isPause" !== u.data ||
                u.ratio ||
                (0 === u._startTime && 0 === this._rawPrevTime) ||
                (K = u),
                (u = u._next);
          else
            for (u = this._last; u && u._startTime >= d && !K; )
              u._duration ||
                ("isPause" === u.data && 0 < u._rawPrevTime && (K = u)),
                (u = u._prev);
          K &&
            ((this._time = d = K._startTime),
            (this._totalTime =
              d + this._cycle * (this._totalDuration + this._repeatDelay)));
        }
        if (this._cycle !== m && !this._locked) {
          u = this._yoyo && 0 !== (m & 1);
          var z = u === (this._yoyo && 0 !== (this._cycle & 1)),
            H = this._totalTime,
            sa = this._cycle,
            A = this._rawPrevTime,
            S = this._time;
          this._totalTime = m * q;
          this._cycle < m ? (u = !u) : (this._totalTime += q);
          this._time = b;
          this._rawPrevTime = 0 === q ? p - 1e-4 : p;
          this._cycle = m;
          this._locked = !0;
          b = u ? 0 : q;
          this.render(b, e, 0 === q);
          e ||
            this._gc ||
            !this.vars.onRepeat ||
            ((this._cycle = sa),
            (this._locked = !1),
            this._callback("onRepeat"));
          if (b !== this._time) return;
          z &&
            ((this._cycle = m),
            (this._locked = !0),
            (b = u ? q + 1e-4 : -1e-4),
            this.render(b, !0, !1));
          this._locked = !1;
          if (this._paused && !h) return;
          this._time = S;
          this._totalTime = H;
          this._cycle = sa;
          this._rawPrevTime = A;
        }
        if ((this._time !== b && this._first) || r || U || K) {
          this._initted || (this._initted = !0);
          !this._active &&
            !this._paused &&
            this._totalTime !== a &&
            0 < d &&
            (this._active = !0);
          0 === a &&
            this.vars.onStart &&
            ((0 === this._totalTime && this._totalDuration) ||
              e ||
              this._callback("onStart"));
          a = this._time;
          if (a >= b)
            for (u = this._first; u; ) {
              q = u._next;
              if (a !== this._time || (this._paused && !h)) break;
              else if (
                u._active ||
                (u._startTime <= this._time && !u._paused && !u._gc)
              )
                K === u && this.pause(),
                  u._reversed
                    ? u.render(
                        (u._dirty ? u.totalDuration() : u._totalDuration) -
                          (d - u._startTime) * u._timeScale,
                        e,
                        r
                      )
                    : u.render((d - u._startTime) * u._timeScale, e, r);
              u = q;
            }
          else
            for (u = this._last; u; ) {
              q = u._prev;
              if (a !== this._time || (this._paused && !h)) break;
              else if (
                u._active ||
                (u._startTime <= b && !u._paused && !u._gc)
              ) {
                if (K === u) {
                  for (K = u._prev; K && K.endTime() > this._time; )
                    K.render(
                      K._reversed
                        ? K.totalDuration() - (d - K._startTime) * K._timeScale
                        : (d - K._startTime) * K._timeScale,
                      e,
                      r
                    ),
                      (K = K._prev);
                  K = null;
                  this.pause();
                }
                u._reversed
                  ? u.render(
                      (u._dirty ? u.totalDuration() : u._totalDuration) -
                        (d - u._startTime) * u._timeScale,
                      e,
                      r
                    )
                  : u.render((d - u._startTime) * u._timeScale, e, r);
              }
              u = q;
            }
          this._onUpdate && !e && (x.length && J(), this._callback("onUpdate"));
          !y ||
            this._locked ||
            this._gc ||
            (f !== this._startTime && c === this._timeScale) ||
            !(0 === this._time || t >= this.totalDuration()) ||
            (w &&
              (x.length && J(),
              this._timeline.autoRemoveChildren && this._enabled(!1, !1),
              (this._active = !1)),
            !e && this.vars[y] && this._callback(y));
        } else
          a !== this._totalTime &&
            this._onUpdate &&
            (e || this._callback("onUpdate"));
      };
      e.getActive = function (d, e, r) {
        null == d && (d = !0);
        null == e && (e = !0);
        null == r && (r = !1);
        var q = [];
        d = this.getChildren(d, e, r);
        e = 0;
        r = d.length;
        var t;
        for (t = 0; t < r; t++) {
          var b = d[t];
          b.isActive() && (q[e++] = b);
        }
        return q;
      };
      e.getLabelAfter = function (d) {
        d || 0 === d || (d = this._time);
        var e = this.getLabelsArray(),
          r = e.length,
          q;
        for (q = 0; q < r; q++) if (e[q].time > d) return e[q].name;
        return null;
      };
      e.getLabelBefore = function (d) {
        null == d && (d = this._time);
        for (var e = this.getLabelsArray(), r = e.length; -1 < --r; )
          if (e[r].time < d) return e[r].name;
        return null;
      };
      e.getLabelsArray = function () {
        var d = [],
          e = 0,
          r;
        for (r in this._labels) d[e++] = { time: this._labels[r], name: r };
        d.sort(function (d, e) {
          return d.time - e.time;
        });
        return d;
      };
      e.invalidate = function () {
        this._locked = !1;
        return w.prototype.invalidate.call(this);
      };
      e.progress = function (d, e) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (this._yoyo && 0 !== (this._cycle & 1) ? 1 - d : d) +
                this._cycle * (this._duration + this._repeatDelay),
              e
            )
          : this._time / this.duration();
      };
      e.totalProgress = function (d, e) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * d, e)
          : this._totalTime / this.totalDuration();
      };
      e.totalDuration = function (d) {
        return arguments.length
          ? -1 !== this._repeat && d
            ? this.timeScale(this.totalDuration() / d)
            : this
          : (this._dirty &&
              (w.prototype.totalDuration.call(this),
              (this._totalDuration =
                -1 === this._repeat
                  ? 999999999999
                  : this._duration * (this._repeat + 1) +
                    this._repeatDelay * this._repeat)),
            this._totalDuration);
      };
      e.time = function (d, e) {
        if (!arguments.length) return this._time;
        this._dirty && this.totalDuration();
        d > this._duration && (d = this._duration);
        this._yoyo && 0 !== (this._cycle & 1)
          ? (d =
              this._duration -
              d +
              this._cycle * (this._duration + this._repeatDelay))
          : 0 !== this._repeat &&
            (d += this._cycle * (this._duration + this._repeatDelay));
        return this.totalTime(d, e);
      };
      e.repeat = function (d) {
        if (!arguments.length) return this._repeat;
        this._repeat = d;
        return this._uncache(!0);
      };
      e.repeatDelay = function (d) {
        if (!arguments.length) return this._repeatDelay;
        this._repeatDelay = d;
        return this._uncache(!0);
      };
      e.yoyo = function (d) {
        if (!arguments.length) return this._yoyo;
        this._yoyo = d;
        return this;
      };
      e.currentLabel = function (d) {
        return arguments.length
          ? this.seek(d, !0)
          : this.getLabelBefore(this._time + 1e-8);
      };
      return L;
    },
    !0
  );
  (function () {
    var w = 180 / Math.PI,
      z = [],
      e = [],
      L = [],
      q = {},
      x = _gsScope._gsDefine.globals,
      J = function (d, e, q, b) {
        q === b && (q = b - (b - e) / 1e6);
        d === e && (e = d + (q - d) / 1e6);
        this.a = d;
        this.b = e;
        this.c = q;
        this.d = b;
        this.da = b - d;
        this.ca = q - d;
        this.ba = e - d;
      },
      B = function (d, e, q, b) {
        var a = { a: d },
          f = {},
          c = {},
          p = { c: b },
          h = (d + e) / 2,
          m = (e + q) / 2;
        q = (q + b) / 2;
        e = (h + m) / 2;
        m = (m + q) / 2;
        var r = (m - e) / 8;
        a.b = h + (d - h) / 4;
        f.b = e + r;
        a.c = f.a = (a.b + f.b) / 2;
        f.c = c.a = (e + m) / 2;
        c.b = m - r;
        p.b = q + (b - q) / 4;
        c.c = p.a = (c.b + p.b) / 2;
        return [a, f, c, p];
      },
      F = function (d, t, w, b, a, f) {
        var c = {},
          p = [],
          h = f || d[0],
          m,
          r;
        a =
          "string" === typeof a
            ? "," + a + ","
            : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,";
        null == t && (t = 1);
        for (y in d[0]) p.push(y);
        if (1 < d.length) {
          var K = d[d.length - 1];
          var N = !0;
          for (m = p.length; -1 < --m; ) {
            var y = p[m];
            if (0.05 < Math.abs(h[y] - K[y])) {
              N = !1;
              break;
            }
          }
          N &&
            ((d = d.concat()),
            f && d.unshift(f),
            d.push(d[1]),
            (f = d[d.length - 3]));
        }
        z.length = e.length = L.length = 0;
        for (m = p.length; -1 < --m; ) {
          y = p[m];
          q[y] = -1 !== a.indexOf("," + y + ",");
          h = y;
          var U = d,
            x = y,
            H = q[y];
          var C = f;
          var A = [];
          if (C)
            for (U = [C].concat(U), K = U.length; -1 < --K; )
              "string" === typeof (r = U[K][x]) &&
                "\x3d" === r.charAt(1) &&
                (U[K][x] = C[x] + Number(r.charAt(0) + r.substr(2)));
          var S = U.length - 2;
          if (0 > S) A[0] = new J(U[0][x], 0, 0, U[-1 > S ? 0 : 1][x]);
          else {
            for (K = 0; K < S; K++) {
              var F = U[K][x];
              var da = U[K + 1][x];
              A[K] = new J(F, 0, 0, da);
              H &&
                ((C = U[K + 2][x]),
                (z[K] = (z[K] || 0) + (da - F) * (da - F)),
                (e[K] = (e[K] || 0) + (C - da) * (C - da)));
            }
            A[K] = new J(U[K][x], 0, 0, U[K + 1][x]);
          }
          K = A;
          c[h] = K;
        }
        for (m = z.length; -1 < --m; )
          (z[m] = Math.sqrt(z[m])), (e[m] = Math.sqrt(e[m]));
        if (!b) {
          for (m = p.length; -1 < --m; )
            if (q[y])
              for (d = c[p[m]], r = d.length - 1, a = 0; a < r; a++)
                (f = d[a + 1].da / e[a] + d[a].da / z[a] || 0),
                  (L[a] = (L[a] || 0) + f * f);
          for (m = L.length; -1 < --m; ) L[m] = Math.sqrt(L[m]);
        }
        m = p.length;
        for (a = w ? 4 : 1; -1 < --m; ) {
          y = p[m];
          d = c[y];
          f = d;
          r = t;
          h = w;
          K = b;
          U = q[y];
          x = f.length - 1;
          H = 0;
          F = f[0].a;
          for (y = 0; y < x; y++) {
            A = f[H];
            da = A.a;
            C = A.d;
            var na = f[H + 1].d;
            if (U) {
              var Q = z[y];
              var Ca = e[y];
              S = ((Ca + Q) * r * 0.25) / (K ? 0.5 : L[y] || 0.5);
              var R = C - (C - da) * (K ? 0.5 * r : 0 !== Q ? S / Q : 0);
              S = C + (na - C) * (K ? 0.5 * r : 0 !== Ca ? S / Ca : 0);
              Ca = C - (R + (((S - R) * ((3 * Q) / (Q + Ca) + 0.5)) / 4 || 0));
            } else
              (R = C - (C - da) * r * 0.5),
                (S = C + (na - C) * r * 0.5),
                (Ca = C - (R + S) / 2);
            R += Ca;
            S += Ca;
            A.c = R;
            A.b = 0 !== y ? F : (F = A.a + 0.6 * (A.c - A.a));
            A.da = C - da;
            A.ca = R - da;
            A.ba = F - da;
            h
              ? ((A = B(da, F, R, C)),
                f.splice(H, 1, A[0], A[1], A[2], A[3]),
                (H += 4))
              : H++;
            F = S;
          }
          A = f[H];
          A.b = F;
          A.c = F + 0.4 * (A.d - F);
          A.da = A.d - A.a;
          A.ca = A.c - A.a;
          A.ba = F - A.a;
          h &&
            ((A = B(A.a, F, A.c, A.d)), f.splice(H, 1, A[0], A[1], A[2], A[3]));
          N && (d.splice(0, a), d.splice(d.length - a, a));
        }
        return c;
      },
      d = _gsScope._gsDefine.plugin({
        propName: "bezier",
        priority: -1,
        version: "1.3.7",
        API: 2,
        global: !0,
        init: function (d, e, q) {
          this._target = d;
          e instanceof Array && (e = { values: e });
          this._func = {};
          this._mod = {};
          this._props = [];
          this._timeRes =
            null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
          var b = e.values || [],
            a = {},
            f = b[0],
            c = e.autoRotate || q.vars.orientToBezier,
            p,
            h;
          this._autoRotate = c
            ? c instanceof Array
              ? c
              : [["x", "y", "rotation", !0 === c ? 0 : Number(c) || 0]]
            : null;
          for (m in f) this._props.push(m);
          for (f = this._props.length; -1 < --f; ) {
            var m = this._props[f];
            this._overwriteProps.push(m);
            c = this._func[m] = "function" === typeof d[m];
            a[m] = c
              ? d[
                  m.indexOf("set") ||
                  "function" !== typeof d["get" + m.substr(3)]
                    ? m
                    : "get" + m.substr(3)
                ]()
              : parseFloat(d[m]);
            h || (a[m] !== b[0][m] && (h = a));
          }
          if ("cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type)
            a = F(
              b,
              isNaN(e.curviness) ? 1 : e.curviness,
              !1,
              "thruBasic" === e.type,
              e.correlate,
              h
            );
          else {
            f = (f = e.type) || "soft";
            e = {};
            c = "cubic" === f ? 3 : 2;
            f = "soft" === f;
            h = [];
            var r, t, w, y;
            f && a && (b = [a].concat(b));
            if (null == b || b.length < c + 1) throw "invalid Bezier data";
            for (z in b[0]) h.push(z);
            for (w = h.length; -1 < --w; ) {
              var z = h[w];
              e[z] = t = [];
              var x = 0;
              var H = b.length;
              for (y = 0; y < H; y++) {
                var C =
                  null == a
                    ? b[y][z]
                    : "string" === typeof (r = b[y][z]) &&
                      "\x3d" === r.charAt(1)
                    ? a[z] + Number(r.charAt(0) + r.substr(2))
                    : Number(r);
                f && 1 < y && y < H - 1 && (t[x++] = (C + t[x - 2]) / 2);
                t[x++] = C;
              }
              H = x - c + 1;
              for (y = x = 0; y < H; y += c) {
                C = t[y];
                z = t[y + 1];
                r = t[y + 2];
                var A = 2 === c ? 0 : t[y + 3];
                t[x++] = r =
                  3 === c
                    ? new J(C, z, r, A)
                    : new J(C, (2 * z + C) / 3, (2 * z + r) / 3, r);
              }
              t.length = x;
            }
            a = e;
          }
          this._beziers = a;
          this._segCount = this._beziers[m].length;
          if (this._timeRes) {
            h = this._beziers;
            m = this._timeRes;
            m = m >> 0 || 6;
            a = [];
            z = [];
            b = r = 0;
            e = m - 1;
            c = [];
            f = [];
            for (p in h)
              for (
                w = h[p], y = a, H = m, x = 1 / H, A = w.length;
                -1 < --A;

              ) {
                var S = w[A];
                var N = S.a;
                t = S.d - N;
                C = S.c - N;
                N = S.b - N;
                var L = 0;
                for (S = 1; S <= H; S++) {
                  var B = x * S;
                  var Q = 1 - B;
                  B = L - (L = (B * B * t + 3 * Q * (B * C + Q * N)) * B);
                  Q = A * H + S - 1;
                  y[Q] = (y[Q] || 0) + B * B;
                }
              }
            h = a.length;
            for (p = 0; p < h; p++)
              (r += Math.sqrt(a[p])),
                (C = p % m),
                (f[C] = r),
                C === e &&
                  ((b += r),
                  (C = (p / m) >> 0),
                  (c[C] = f),
                  (z[C] = b),
                  (r = 0),
                  (f = []));
            this._length = b;
            this._lengths = z;
            this._segments = c;
            this._l1 = this._li = this._s1 = this._si = 0;
            this._l2 = this._lengths[0];
            this._curSeg = this._segments[0];
            this._s2 = this._curSeg[0];
            this._prec = 1 / this._curSeg.length;
          }
          if ((c = this._autoRotate))
            for (
              this._initialRotations = [],
                c[0] instanceof Array || (this._autoRotate = c = [c]),
                f = c.length;
              -1 < --f;

            ) {
              for (p = 0; 3 > p; p++)
                (m = c[f][p]),
                  (this._func[m] =
                    "function" === typeof d[m]
                      ? d[
                          m.indexOf("set") ||
                          "function" !== typeof d["get" + m.substr(3)]
                            ? m
                            : "get" + m.substr(3)
                        ]
                      : !1);
              m = c[f][2];
              this._initialRotations[f] =
                (this._func[m]
                  ? this._func[m].call(this._target)
                  : this._target[m]) || 0;
              this._overwriteProps.push(m);
            }
          this._startRatio = q.vars.runBackwards ? 1 : 0;
          return !0;
        },
        set: function (d) {
          var e = this._segCount,
            r = this._func,
            b = this._target,
            a = d !== this._startRatio;
          if (this._timeRes) {
            var f = this._lengths;
            var c = this._curSeg;
            d *= this._length;
            var p = this._li;
            if (d > this._l2 && p < e - 1) {
              for (--e; p < e && (this._l2 = f[++p]) <= d; );
              this._l1 = f[p - 1];
              this._li = p;
              this._curSeg = c = this._segments[p];
              this._s2 = c[(this._s1 = this._si = 0)];
            } else if (d < this._l1 && 0 < p) {
              for (; 0 < p && (this._l1 = f[--p]) >= d; );
              0 === p && d < this._l1 ? (this._l1 = 0) : p++;
              this._l2 = f[p];
              this._li = p;
              this._curSeg = c = this._segments[p];
              this._s1 = c[(this._si = c.length - 1) - 1] || 0;
              this._s2 = c[this._si];
            }
            f = p;
            d -= this._l1;
            p = this._si;
            if (d > this._s2 && p < c.length - 1) {
              for (e = c.length - 1; p < e && (this._s2 = c[++p]) <= d; );
              this._s1 = c[p - 1];
              this._si = p;
            } else if (d < this._s1 && 0 < p) {
              for (; 0 < p && (this._s1 = c[--p]) >= d; );
              0 === p && d < this._s1 ? (this._s1 = 0) : p++;
              this._s2 = c[p];
              this._si = p;
            }
            c = (p + (d - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
          } else
            (f = 0 > d ? 0 : 1 <= d ? e - 1 : (e * d) >> 0),
              (c = (d - (1 / e) * f) * e);
          e = 1 - c;
          for (p = this._props.length; -1 < --p; ) {
            d = this._props[p];
            var h = this._beziers[d][f];
            var m = (c * c * h.da + 3 * e * (c * h.ca + e * h.ba)) * c + h.a;
            this._mod[d] && (m = this._mod[d](m, b));
            if (r[d]) b[d](m);
            else b[d] = m;
          }
          if (this._autoRotate)
            for (e = this._autoRotate, p = e.length; -1 < --p; ) {
              d = e[p][2];
              var q = e[p][3] || 0;
              var t = !0 === e[p][4] ? 1 : w;
              h = this._beziers[e[p][0]];
              m = this._beziers[e[p][1]];
              if (h && m) {
                h = h[f];
                m = m[f];
                var z = h.a + (h.b - h.a) * c;
                var y = h.b + (h.c - h.b) * c;
                z += (y - z) * c;
                y += (h.c + (h.d - h.c) * c - y) * c;
                h = m.a + (m.b - m.a) * c;
                var x = m.b + (m.c - m.b) * c;
                h += (x - h) * c;
                x += (m.c + (m.d - m.c) * c - x) * c;
                m = a
                  ? Math.atan2(x - h, y - z) * t + q
                  : this._initialRotations[p];
                this._mod[d] && (m = this._mod[d](m, b));
                if (r[d]) b[d](m);
                else b[d] = m;
              }
            }
        },
      }),
      t = d.prototype;
    d.bezierThrough = F;
    d.cubicToQuadratic = B;
    d._autoCSS = !0;
    d.quadraticToCubic = function (d, e, q) {
      return new J(d, (2 * e + d) / 3, (2 * e + q) / 3, q);
    };
    d._cssRegister = function () {
      var e = x.CSSPlugin;
      if (e) {
        e = e._internals;
        var q = e._parseToProxy,
          t = e._setPluginRatio,
          b = e.CSSPropTween;
        e._registerComplexSpecialProp("bezier", {
          parser: function (a, f, c, e, h, m) {
            f instanceof Array && (f = { values: f });
            m = new d();
            c = f.values;
            var p = c.length - 1,
              r = [],
              w = {},
              y,
              z;
            if (0 > p) return h;
            for (y = 0; y <= p; y++) {
              var x = q(a, c[y], e, h, m, p !== y);
              r[y] = x.end;
            }
            for (z in f) w[z] = f[z];
            w.values = r;
            h = new b(a, "bezier", 0, 0, x.pt, 2);
            h.data = x;
            h.plugin = m;
            h.setRatio = t;
            0 === w.autoRotate && (w.autoRotate = !0);
            !w.autoRotate ||
              w.autoRotate instanceof Array ||
              ((y = !0 === w.autoRotate ? 0 : Number(w.autoRotate)),
              (w.autoRotate =
                null != x.end.left
                  ? [["left", "top", "rotation", y, !1]]
                  : null != x.end.x
                  ? [["x", "y", "rotation", y, !1]]
                  : !1));
            w.autoRotate &&
              (e._transform || e._enableTransforms(!1),
              (x.autoRotate = e._target._gsTransform),
              (x.proxy.rotation = x.autoRotate.rotation || 0),
              e._overwriteProps.push("rotation"));
            m._onInitTween(x.proxy, w, e._tween);
            return h;
          },
        });
      }
    };
    t._mod = function (d) {
      for (var e = this._overwriteProps, q = e.length, b; -1 < --q; )
        (b = d[e[q]]) && "function" === typeof b && (this._mod[e[q]] = b);
    };
    t._kill = function (d) {
      var e = this._props,
        q,
        b;
      for (q in this._beziers)
        if (q in d)
          for (
            delete this._beziers[q], delete this._func[q], b = e.length;
            -1 < --b;

          )
            e[b] === q && e.splice(b, 1);
      if ((e = this._autoRotate))
        for (b = e.length; -1 < --b; ) d[e[b][2]] && e.splice(b, 1);
      return this._super._kill.call(this, d);
    };
  })();
  _gsScope._gsDefine(
    "plugins.CSSPlugin",
    ["plugins.TweenPlugin", "TweenLite"],
    function (w, z) {
      var e = function () {
          w.call(this, "css");
          this._overwriteProps.length = 0;
          this.setRatio = e.prototype.setRatio;
        },
        L = _gsScope._gsDefine.globals,
        q,
        x,
        J,
        B,
        F = {},
        d = (e.prototype = new w("css"));
      d.constructor = e;
      e.version = "1.19.1";
      e.API = 2;
      e.defaultTransformPerspective = 0;
      e.defaultSkewType = "compensated";
      e.defaultSmoothOrigin = !0;
      d = "px";
      e.suffixMap = {
        top: d,
        right: d,
        bottom: d,
        left: d,
        width: d,
        height: d,
        fontSize: d,
        padding: d,
        margin: d,
        perspective: d,
        lineHeight: "",
      };
      var t = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        r = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        N = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        C = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        b = /(?:\d|\-|\+|=|#|\.)*/g,
        a = /opacity *= *([^)]*)/i,
        f = /opacity:([^;]*)/i,
        c = /alpha\(opacity *=.+?\)/i,
        p = /^(rgb|hsl)/,
        h = /([A-Z])/g,
        m = /-([a-z])/gi,
        u = /(^(?:url\("|url\())|(?:("\))$|\)$)/gi,
        K = function (l, v) {
          return v.toUpperCase();
        },
        ha = /(?:Left|Right|Width)/i,
        y = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        U = /progid:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        ja = /,(?=[^\)]*(?:\(|$))/gi,
        H = /[\s,\(]/i,
        sa = Math.PI / 180,
        A = 180 / Math.PI,
        S = {},
        Qa = { style: {} },
        da = _gsScope.document || {
          createElement: function () {
            return Qa;
          },
        },
        na = function (l, v) {
          return da.createElementNS
            ? da.createElementNS(v || "http://www.w3.org/1999/xhtml", l)
            : da.createElement(l);
        },
        Q = na("div"),
        Ca = na("img"),
        R = (e._internals = { _specialProps: F }),
        X = (_gsScope.navigator || {}).userAgent || "",
        Ra,
        ea,
        Ma,
        ab,
        Na,
        oa,
        xa = (function () {
          var l = X.indexOf("Android"),
            v = na("a");
          Na =
            (Ma =
              -1 !== X.indexOf("Safari") &&
              -1 === X.indexOf("Chrome") &&
              (-1 === l || 3 < parseFloat(X.substr(l + 8, 2)))) &&
            6 > parseFloat(X.substr(X.indexOf("Version/") + 8, 2));
          ab = -1 !== X.indexOf("Firefox");
          if (
            /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) ||
            /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)
          )
            oa = parseFloat(RegExp.$1);
          if (!v) return !1;
          v.style.cssText = "top:1px;opacity:.55;";
          return /^0.55/.test(v.style.opacity);
        })(),
        Oa = function (l) {
          return a.test(
            "string" === typeof l
              ? l
              : (l.currentStyle ? l.currentStyle.filter : l.style.filter) || ""
          )
            ? parseFloat(RegExp.$1) / 100
            : 1;
        },
        Da,
        ta,
        ua = "",
        Ga = "",
        aa = function (l, v) {
          v = v || Q;
          v = v.style;
          var a;
          if (void 0 !== v[l]) return l;
          l = l.charAt(0).toUpperCase() + l.substr(1);
          var b = ["O", "Moz", "ms", "Ms", "Webkit"];
          for (a = 5; -1 < --a && void 0 === v[b[a] + l]; );
          return 0 <= a
            ? ((Ga = 3 === a ? "ms" : b[a]),
              (ua = "-" + Ga.toLowerCase() + "-"),
              Ga + l)
            : null;
        },
        ia = da.defaultView ? da.defaultView.getComputedStyle : function () {},
        k = (e.getStyle = function (l, v, a, b, k) {
          var n;
          if (!xa && "opacity" === v) return Oa(l);
          !b && l.style[v]
            ? (n = l.style[v])
            : (a = a || ia(l))
            ? (n =
                a[v] ||
                a.getPropertyValue(v) ||
                a.getPropertyValue(v.replace(h, "-$1").toLowerCase()))
            : l.currentStyle && (n = l.currentStyle[v]);
          return null == k ||
            (n && "none" !== n && "auto" !== n && "auto auto" !== n)
            ? n
            : k;
        }),
        G = (R.convertToPixels = function (l, v, a, b, n) {
          if ("px" === b || !b) return a;
          if ("auto" === b || !a) return 0;
          var M = ha.test(v),
            g = l,
            O = Q.style,
            c = 0 > a,
            Aa = 1 === a;
          c && (a = -a);
          Aa && (a *= 100);
          if ("%" === b && -1 !== v.indexOf("border"))
            O = (a / 100) * (M ? l.clientWidth : l.clientHeight);
          else {
            O.cssText =
              "border:0 solid red;position:" +
              k(l, "position") +
              ";line-height:0;";
            if (
              "%" !== b &&
              g.appendChild &&
              "v" !== b.charAt(0) &&
              "rem" !== b
            )
              O[M ? "borderLeftWidth" : "borderTopWidth"] = a + b;
            else {
              g = l.parentNode || da.body;
              var d = g._gsCache;
              var f = z.ticker.frame;
              if (d && M && d.time === f) return (d.width * a) / 100;
              O[M ? "width" : "height"] = a + b;
            }
            g.appendChild(Q);
            O = parseFloat(Q[M ? "offsetWidth" : "offsetHeight"]);
            g.removeChild(Q);
            M &&
              "%" === b &&
              !1 !== e.cacheWidths &&
              ((d = g._gsCache = g._gsCache || {}),
              (d.time = f),
              (d.width = (O / a) * 100));
            0 !== O || n || (O = G(l, v, a, b, !0));
          }
          Aa && (O /= 100);
          return c ? -O : O;
        }),
        I = (R.calculateOffset = function (l, v, a) {
          if ("absolute" !== k(l, "position", a)) return 0;
          var n = "left" === v ? "Left" : "Top";
          a = k(l, "margin" + n, a);
          return (
            l["offset" + n] - (G(l, v, parseFloat(a), a.replace(b, "")) || 0)
          );
        }),
        D = function (l, v) {
          var a = {},
            b;
          if ((v = v || ia(l, null)))
            if ((b = v.length))
              for (; -1 < --b; ) {
                var n = v[b];
                if (-1 === n.indexOf("-transform") || hb === n)
                  a[n.replace(m, K)] = v.getPropertyValue(n);
              }
            else
              for (b in v) {
                if (-1 === b.indexOf("Transform") || ba === b) a[b] = v[b];
              }
          else if ((v = l.currentStyle || l.style))
            for (b in v)
              "string" === typeof b &&
                void 0 === a[b] &&
                (a[b.replace(m, K)] = v[b]);
          xa || (a.opacity = Oa(l));
          l = ob(l, v, !1);
          a.rotation = l.rotation;
          a.skewX = l.skewX;
          a.scaleX = l.scaleX;
          a.scaleY = l.scaleY;
          a.x = l.x;
          a.y = l.y;
          Pa &&
            ((a.z = l.z),
            (a.rotationX = l.rotationX),
            (a.rotationY = l.rotationY),
            (a.scaleZ = l.scaleZ));
          a.filters && delete a.filters;
          return a;
        },
        P = function (l, v, a, b, n) {
          var k = {},
            g = l.style,
            M,
            O,
            c;
          for (O in a)
            "cssText" !== O &&
              "length" !== O &&
              isNaN(O) &&
              (v[O] !== (M = a[O]) || (n && n[O])) &&
              -1 === O.indexOf("Origin") &&
              ("number" === typeof M || "string" === typeof M) &&
              ((k[O] =
                "auto" !== M || ("left" !== O && "top" !== O)
                  ? ("" !== M && "auto" !== M && "none" !== M) ||
                    "string" !== typeof v[O] ||
                    "" === v[O].replace(C, "")
                    ? M
                    : 0
                  : I(l, O)),
              void 0 !== g[O] && (c = new ib(g, O, g[O], c)));
          if (b) for (O in b) "className" !== O && (k[O] = b[O]);
          return { difs: k, firstMPT: c };
        },
        Ua = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
        bb = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        Ba = function (l, v) {
          if ("contain" === l || "auto" === l || "auto auto" === l)
            return l + " ";
          if (null == l || "" === l) l = "0 0";
          var a = l.split(" "),
            b =
              -1 !== l.indexOf("left")
                ? "0%"
                : -1 !== l.indexOf("right")
                ? "100%"
                : a[0],
            n =
              -1 !== l.indexOf("top")
                ? "0%"
                : -1 !== l.indexOf("bottom")
                ? "100%"
                : a[1];
          if (3 < a.length && !v) {
            a = l.split(", ").join(",").split(",");
            l = [];
            for (v = 0; v < a.length; v++) l.push(Ba(a[v]));
            return l.join(",");
          }
          null == n
            ? (n = "center" === b ? "50%" : "0")
            : "center" === n && (n = "50%");
          if (
            "center" === b ||
            (isNaN(parseFloat(b)) && -1 === (b + "").indexOf("\x3d"))
          )
            b = "50%";
          l = b + " " + n + (2 < a.length ? " " + a[2] : "");
          v &&
            ((v.oxp = -1 !== b.indexOf("%")),
            (v.oyp = -1 !== n.indexOf("%")),
            (v.oxr = "\x3d" === b.charAt(1)),
            (v.oyr = "\x3d" === n.charAt(1)),
            (v.ox = parseFloat(b.replace(C, ""))),
            (v.oy = parseFloat(n.replace(C, ""))),
            (v.v = l));
          return v || l;
        },
        ya = function (l, v) {
          "function" === typeof l && (l = l(ta, Da));
          return "string" === typeof l && "\x3d" === l.charAt(1)
            ? parseInt(l.charAt(0) + "1", 10) * parseFloat(l.substr(2))
            : parseFloat(l) - parseFloat(v) || 0;
        },
        fa = function (l, v) {
          "function" === typeof l && (l = l(ta, Da));
          return null == l
            ? v
            : "string" === typeof l && "\x3d" === l.charAt(1)
            ? parseInt(l.charAt(0) + "1", 10) * parseFloat(l.substr(2)) + v
            : parseFloat(l) || 0;
        },
        Ha = function (l, v, a, b) {
          "function" === typeof l && (l = l(ta, Da));
          if (null == l) l = v;
          else if ("number" !== typeof l) {
            var n = l.split("_");
            var k = "\x3d" === l.charAt(1);
            k =
              (k
                ? parseInt(l.charAt(0) + "1", 10) * parseFloat(n[0].substr(2))
                : parseFloat(n[0])) *
                (-1 === l.indexOf("rad") ? 1 : A) -
              (k ? 0 : v);
            n.length &&
              (b && (b[a] = v + k),
              -1 !== l.indexOf("short") &&
                ((k %= 360), k !== k % 180 && (k = 0 > k ? k + 360 : k - 360)),
              -1 !== l.indexOf("_cw") && 0 > k
                ? (k = ((k + 3599999999640) % 360) - 360 * ((k / 360) | 0))
                : -1 !== l.indexOf("ccw") &&
                  0 < k &&
                  (k = ((k - 3599999999640) % 360) - 360 * ((k / 360) | 0)));
            l = v + k;
          }
          1e-6 > l && -1e-6 < l && (l = 0);
          return l;
        },
        Xa = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          fuchsia: [255, 0, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0],
        },
        Ya = function (l, a, b) {
          l = 0 > l ? l + 1 : 1 < l ? l - 1 : l;
          return (
            (255 *
              (1 > 6 * l
                ? a + (b - a) * l * 6
                : 0.5 > l
                ? b
                : 2 > 3 * l
                ? a + (b - a) * (2 / 3 - l) * 6
                : a) +
              0.5) |
            0
          );
        },
        la = (e.parseColor = function (l, a) {
          var v;
          if (l)
            if ("number" === typeof l)
              var b = [l >> 16, (l >> 8) & 255, l & 255];
            else {
              "," === l.charAt(l.length - 1) && (l = l.substr(0, l.length - 1));
              if (Xa[l]) b = Xa[l];
              else if ("#" === l.charAt(0)) {
                if (4 === l.length) {
                  var n = l.charAt(1);
                  var k = l.charAt(2);
                  l = l.charAt(3);
                  l = "#" + n + n + k + k + l + l;
                }
                l = parseInt(l.substr(1), 16);
                b = [l >> 16, (l >> 8) & 255, l & 255];
              } else if ("hsl" === l.substr(0, 3))
                if (((b = v = l.match(t)), !a)) {
                  var g = (Number(b[0]) % 360) / 360;
                  var c = Number(b[1]) / 100;
                  var d = Number(b[2]) / 100;
                  k = 0.5 >= d ? d * (c + 1) : d + c - d * c;
                  n = 2 * d - k;
                  3 < b.length && (b[3] = Number(l[3]));
                  b[0] = Ya(g + 1 / 3, n, k);
                  b[1] = Ya(g, n, k);
                  b[2] = Ya(g - 1 / 3, n, k);
                } else {
                  if (-1 !== l.indexOf("\x3d")) return l.match(r);
                }
              else b = l.match(t) || Xa.transparent;
              b[0] = Number(b[0]);
              b[1] = Number(b[1]);
              b[2] = Number(b[2]);
              3 < b.length && (b[3] = Number(b[3]));
            }
          else b = Xa.black;
          a &&
            !v &&
            ((n = b[0] / 255),
            (k = b[1] / 255),
            (l = b[2] / 255),
            (a = Math.max(n, k, l)),
            (c = Math.min(n, k, l)),
            (d = (a + c) / 2),
            a === c
              ? (g = c = 0)
              : ((v = a - c),
                (c = 0.5 < d ? v / (2 - a - c) : v / (a + c)),
                (g =
                  60 *
                  (a === n
                    ? (k - l) / v + (k < l ? 6 : 0)
                    : a === k
                    ? (l - n) / v + 2
                    : (n - k) / v + 4))),
            (b[0] = (g + 0.5) | 0),
            (b[1] = (100 * c + 0.5) | 0),
            (b[2] = (100 * d + 0.5) | 0));
          return b;
        }),
        jb = function (l, a) {
          var b = l.match(pa) || [],
            v = 0,
            n = b.length ? "" : l,
            k;
          for (k = 0; k < b.length; k++) {
            var g = b[k];
            var c = l.substr(v, l.indexOf(g, v) - v);
            v += c.length + g.length;
            g = la(g, a);
            3 === g.length && g.push(1);
            n +=
              c +
              (a
                ? "hsla(" + g[0] + "," + g[1] + "%," + g[2] + "%," + g[3]
                : "rgba(" + g.join(",")) +
              ")";
          }
          return n + l.substr(v);
        },
        pa =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
      for (d in Xa) pa += "|" + d + "\\b";
      pa = new RegExp(pa + ")", "gi");
      e.colorStringFilter = function (l) {
        var a = l[0] + l[1];
        pa.test(a) &&
          ((a = -1 !== a.indexOf("hsl(") || -1 !== a.indexOf("hsla(")),
          (l[0] = jb(l[0], a)),
          (l[1] = jb(l[1], a)));
        pa.lastIndex = 0;
      };
      z.defaultStringFilter || (z.defaultStringFilter = e.colorStringFilter);
      var mb = function (a, b, n, k) {
          if (null == a)
            return function (a) {
              return a;
            };
          var l = b ? (a.match(pa) || [""])[0] : "",
            v = a.split(l).join("").match(N) || [],
            g = a.substr(0, a.indexOf(v[0])),
            c = ")" === a.charAt(a.length - 1) ? ")" : "",
            d = -1 !== a.indexOf(" ") ? " " : ",",
            M = v.length,
            e = 0 < M ? v[0].replace(t, "") : "",
            f;
          return M
            ? b
              ? (f = function (a) {
                  var b;
                  if ("number" === typeof a) a += e;
                  else if (k && ja.test(a)) {
                    a = a.replace(ja, "|").split("|");
                    for (b = 0; b < a.length; b++) a[b] = f(a[b]);
                    return a.join(",");
                  }
                  var O = (a.match(pa) || [l])[0];
                  var h = a.split(O).join("").match(N) || [];
                  b = h.length;
                  if (M > b--)
                    for (; ++b < M; ) h[b] = n ? h[((b - 1) / 2) | 0] : v[b];
                  return (
                    g +
                    h.join(d) +
                    d +
                    O +
                    c +
                    (-1 !== a.indexOf("inset") ? " inset" : "")
                  );
                })
              : (f = function (a) {
                  if ("number" === typeof a) a += e;
                  else if (k && ja.test(a)) {
                    var b = a.replace(ja, "|").split("|");
                    for (a = 0; a < b.length; a++) b[a] = f(b[a]);
                    return b.join(",");
                  }
                  b = a.match(N) || [];
                  a = b.length;
                  if (M > a--)
                    for (; ++a < M; ) b[a] = n ? b[((a - 1) / 2) | 0] : v[a];
                  return g + b.join(d) + c;
                })
            : function (a) {
                return a;
              };
        },
        pb = function (a) {
          a = a.split(",");
          return function (b, l, n, k, c, g, d) {
            l = (l + "").split(" ");
            d = {};
            for (n = 0; 4 > n; n++)
              d[a[n]] = l[n] = l[n] || l[((n - 1) / 2) >> 0];
            return k.parse(b, d, c, g);
          };
        };
      R._setPluginRatio = function (a) {
        this.plugin.setRatio(a);
        for (var b = this.data, l = b.proxy, n = b.firstMPT, k; n; )
          (k = l[n.v]),
            n.r ? (k = Math.round(k)) : 1e-6 > k && -1e-6 < k && (k = 0),
            (n.t[n.p] = k),
            (n = n._next);
        b.autoRotate &&
          (b.autoRotate.rotation = b.mod
            ? b.mod(l.rotation, this.t)
            : l.rotation);
        if (1 === a || 0 === a)
          for (n = b.firstMPT, k = 1 === a ? "e" : "b"; n; ) {
            a = n.t;
            if (!a.type) a[k] = a.s + a.xs0;
            else if (1 === a.type) {
              l = a.xs0 + a.s + a.xs1;
              for (b = 1; b < a.l; b++) l += a["xn" + b] + a["xs" + (b + 1)];
              a[k] = l;
            }
            n = n._next;
          }
      };
      var ib = function (a, b, n, k, c) {
        this.t = a;
        this.p = b;
        this.v = n;
        this.r = c;
        k && ((k._prev = this), (this._next = k));
      };
      R._parseToProxy = function (a, b, n, k, c, d) {
        var l = k,
          v = {},
          O = {},
          f = n._transform,
          e = S;
        n._transform = null;
        S = b;
        k = a = n.parse(a, b, k, c);
        S = e;
        d &&
          ((n._transform = f),
          l && ((l._prev = null), l._prev && (l._prev._next = null)));
        for (; k && k !== l; ) {
          if (1 >= k.type) {
            f = k.p;
            O[f] = k.s + k.c;
            v[f] = k.s;
            if (!d) {
              var h = new ib(k, "s", f, h, k.r);
              k.c = 0;
            }
            if (1 === k.type)
              for (n = k.l; 0 < --n; )
                (e = "xn" + n),
                  (f = k.p + "_" + e),
                  (O[f] = k.data[e]),
                  (v[f] = k[e]),
                  d || (h = new ib(k, e, f, h, k.rxp[e]));
          }
          k = k._next;
        }
        return { proxy: v, end: O, firstMPT: h, pt: a };
      };
      var Y = (R.CSSPropTween = function (a, b, k, n, c, d, g, f, e, h, G) {
          this.t = a;
          this.p = b;
          this.s = k;
          this.c = n;
          this.n = g || b;
          a instanceof Y || B.push(this.n);
          this.r = f;
          this.type = d || 0;
          e && ((this.pr = e), (q = !0));
          this.b = void 0 === h ? k : h;
          this.e = void 0 === G ? k + n : G;
          c && ((this._next = c), (c._prev = this));
        }),
        Va = function (a, b, k, n, c, d) {
          a = new Y(a, b, k, n - k, c, -1, d);
          a.b = k;
          a.e = a.xs0 = n;
          return a;
        },
        Ka = (e.parseComplex = function (a, b, k, n, c, d, g, f, h, G) {
          k = k || d || "";
          "function" === typeof n && (n = n(ta, Da));
          g = new Y(a, b, 0, 0, g, G ? 2 : 1, null, !1, f, k, n);
          n += "";
          c &&
            pa.test(n + k) &&
            ((n = [k, n]), e.colorStringFilter(n), (k = n[0]), (n = n[1]));
          a = k.split(", ").join(",").split(" ");
          b = n.split(", ").join(",").split(" ");
          f = a.length;
          var l = !1 !== Ra;
          if (-1 !== n.indexOf(",") || -1 !== k.indexOf(","))
            (a = a.join(" ").replace(ja, ", ").split(" ")),
              (b = b.join(" ").replace(ja, ", ").split(" ")),
              (f = a.length);
          f !== b.length && ((a = (d || "").split(" ")), (f = a.length));
          g.plugin = h;
          g.setRatio = G;
          for (k = pa.lastIndex = 0; k < f; k++)
            if (((d = a[k]), (G = b[k]), (h = parseFloat(d)) || 0 === h))
              g.appendXtra(
                "",
                h,
                ya(G, h),
                G.replace(r, ""),
                l && -1 !== G.indexOf("px"),
                !0
              );
            else if (c && pa.test(d)) {
              var v = G.indexOf(")") + 1;
              v = ")" + (v ? G.substr(v) : "");
              var O = -1 !== G.indexOf("hsl") && xa;
              d = la(d, O);
              G = la(G, O);
              (h = 6 < d.length + G.length) && !xa && 0 === G[3]
                ? ((g["xs" + g.l] += g.l ? " transparent" : "transparent"),
                  (g.e = g.e.split(b[k]).join("transparent")))
                : (xa || (h = !1),
                  O
                    ? g
                        .appendXtra(
                          h ? "hsla(" : "hsl(",
                          d[0],
                          ya(G[0], d[0]),
                          ",",
                          !1,
                          !0
                        )
                        .appendXtra("", d[1], ya(G[1], d[1]), "%,", !1)
                        .appendXtra(
                          "",
                          d[2],
                          ya(G[2], d[2]),
                          h ? "%," : "%" + v,
                          !1
                        )
                    : g
                        .appendXtra(
                          h ? "rgba(" : "rgb(",
                          d[0],
                          G[0] - d[0],
                          ",",
                          !0,
                          !0
                        )
                        .appendXtra("", d[1], G[1] - d[1], ",", !0)
                        .appendXtra("", d[2], G[2] - d[2], h ? "," : v, !0),
                  h &&
                    ((d = 4 > d.length ? 1 : d[3]),
                    g.appendXtra("", d, (4 > G.length ? 1 : G[3]) - d, v, !1)));
              pa.lastIndex = 0;
            } else if ((h = d.match(t))) {
              O = G.match(r);
              if (!O || O.length !== h.length) return g;
              for (G = v = 0; G < h.length; G++) {
                var M = h[G];
                var I = d.indexOf(M, v);
                g.appendXtra(
                  d.substr(v, I - v),
                  Number(M),
                  ya(O[G], M),
                  "",
                  l && "px" === d.substr(I + M.length, 2),
                  0 === G
                );
                v = I + M.length;
              }
              g["xs" + g.l] += d.substr(v);
            } else g["xs" + g.l] += g.l || g["xs" + g.l] ? " " + G : G;
          if (-1 !== n.indexOf("\x3d") && g.data) {
            v = g.xs0 + g.data.s;
            for (k = 1; k < g.l; k++) v += g["xs" + k] + g.data["xn" + k];
            g.e = v + g["xs" + k];
          }
          g.l || ((g.type = -1), (g.xs0 = g.e));
          return g.xfirst || g;
        }),
        ca = 9;
      d = Y.prototype;
      for (d.l = d.pr = 0; 0 < --ca; ) (d["xn" + ca] = 0), (d["xs" + ca] = "");
      d.xs0 = "";
      d._next =
        d._prev =
        d.xfirst =
        d.data =
        d.plugin =
        d.setRatio =
        d.rxp =
          null;
      d.appendXtra = function (a, b, k, n, c, d) {
        var l = this.l;
        this["xs" + l] += d && (l || this["xs" + l]) ? " " + a : a || "";
        if (!k && 0 !== l && !this.plugin)
          return (this["xs" + l] += b + (n || "")), this;
        this.l++;
        this.type = this.setRatio ? 2 : 1;
        this["xs" + this.l] = n || "";
        if (0 < l)
          return (
            (this.data["xn" + l] = b + k),
            (this.rxp["xn" + l] = c),
            (this["xn" + l] = b),
            this.plugin ||
              ((this.xfirst = new Y(
                this,
                "xn" + l,
                b,
                k,
                this.xfirst || this,
                0,
                this.n,
                c,
                this.pr
              )),
              (this.xfirst.xs0 = 0)),
            this
          );
        this.data = { s: b + k };
        this.rxp = {};
        this.s = b;
        this.c = k;
        this.r = c;
        return this;
      };
      var Sa = function (a, b) {
          b = b || {};
          this.p = b.prefix ? aa(a) || a : a;
          F[a] = F[this.p] = this;
          this.format =
            b.formatter || mb(b.defaultValue, b.color, b.collapsible, b.multi);
          b.parser && (this.parse = b.parser);
          this.clrs = b.color;
          this.multi = b.multi;
          this.keyword = b.keyword;
          this.dflt = b.defaultValue;
          this.pr = b.priority || 0;
        },
        Z = (R._registerComplexSpecialProp = function (a, b, k) {
          "object" !== typeof b && (b = { parser: k });
          a = a.split(",");
          var l = b.defaultValue,
            v;
          k = k || [l];
          for (v = 0; v < a.length; v++)
            (b.prefix = 0 === v && b.prefix),
              (b.defaultValue = k[v] || l),
              new Sa(a[v], b);
        }),
        Za = (R._registerPluginProp = function (a) {
          if (!F[a]) {
            var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
            Z(a, {
              parser: function (a, l, k, v, g, n, c) {
                var d = L.com.greensock.plugins[b];
                if (!d)
                  return (
                    _gsScope.console &&
                      console.log("Error: " + b + " js file not loaded."),
                    g
                  );
                d._cssRegister();
                return F[k].parse(a, l, k, v, g, n, c);
              },
            });
          }
        });
      d = Sa.prototype;
      d.parseComplex = function (a, b, k, n, c, d) {
        var l = this.keyword,
          v;
        if (this.multi)
          if (ja.test(k) || ja.test(b)) {
            var f = b.replace(ja, "|").split("|");
            var e = k.replace(ja, "|").split("|");
          } else l && ((f = [b]), (e = [k]));
        if (e) {
          var h = e.length > f.length ? e.length : f.length;
          for (v = 0; v < h; v++)
            (b = f[v] = f[v] || this.dflt),
              (k = e[v] = e[v] || this.dflt),
              l &&
                ((b = b.indexOf(l)),
                (k = k.indexOf(l)),
                b !== k &&
                  (-1 === k
                    ? (f[v] = f[v].split(l).join(""))
                    : -1 === b && (f[v] += " " + l)));
          b = f.join(", ");
          k = e.join(", ");
        }
        return Ka(a, this.p, b, k, this.clrs, this.dflt, n, this.pr, c, d);
      };
      d.parse = function (a, b, n, c, d, f, g) {
        return this.parseComplex(
          a.style,
          this.format(k(a, this.p, J, !1, this.dflt)),
          this.format(b),
          d,
          f
        );
      };
      e.registerSpecialProp = function (a, b, k) {
        Z(a, {
          parser: function (a, l, v, g, n, c, d) {
            n = new Y(a, v, 0, 0, n, 2, v, !1, k);
            n.plugin = c;
            n.setRatio = b(a, l, g._tween, v);
            return n;
          },
          priority: k,
        });
      };
      e.useSVGTransformAttr = !0;
      var qb =
          "scaleX scaleY scaleZ x y z skewX skewY rotation rotationX rotationY perspective xPercent yPercent".split(
            " "
          ),
        ba = aa("transform"),
        hb = ua + "transform",
        cb = aa("transformOrigin"),
        Pa = null !== aa("perspective"),
        kb = (R.Transform = function () {
          this.perspective = parseFloat(e.defaultTransformPerspective) || 0;
          this.force3D =
            !1 !== e.defaultForce3D && Pa ? e.defaultForce3D || "auto" : !1;
        }),
        Ea = _gsScope.SVGElement,
        ka,
        vb = function (a, b, k) {
          a = da.createElementNS("http://www.w3.org/2000/svg", a);
          var l = /([a-z])([A-Z])/g,
            v;
          for (v in k)
            a.setAttributeNS(null, v.replace(l, "$1-$2").toLowerCase(), k[v]);
          b.appendChild(a);
          return a;
        },
        Ta = da.documentElement || {},
        wb = (function () {
          var a = oa || (/Android/i.test(X) && !_gsScope.chrome);
          if (da.createElementNS && !a) {
            var b = vb("svg", Ta);
            a = vb("rect", b, { width: 100, height: 50, x: 100 });
            var k = a.getBoundingClientRect().width;
            a.style[cb] = "50% 50%";
            a.style[ba] = "scaleX(0.5)";
            a = k === a.getBoundingClientRect().width && !(ab && Pa);
            Ta.removeChild(b);
          }
          return a;
        })(),
        rb = function (a, b, k, n, c, d) {
          var l = a._gsTransform,
            v = $a(a, !0),
            f,
            h,
            O;
          if (l) {
            var G = l.xOrigin;
            var I = l.yOrigin;
          }
          if (!n || 2 > (f = n.split(" ")).length) {
            var M = a.getBBox();
            0 === M.x &&
              0 === M.y &&
              0 === M.width + M.height &&
              (M = {
                x:
                  parseFloat(
                    a.hasAttribute("x")
                      ? a.getAttribute("x")
                      : a.hasAttribute("cx")
                      ? a.getAttribute("cx")
                      : 0
                  ) || 0,
                y:
                  parseFloat(
                    a.hasAttribute("y")
                      ? a.getAttribute("y")
                      : a.hasAttribute("cy")
                      ? a.getAttribute("cy")
                      : 0
                  ) || 0,
                width: 0,
                height: 0,
              });
            b = Ba(b).split(" ");
            f = [
              (-1 !== b[0].indexOf("%")
                ? (parseFloat(b[0]) / 100) * M.width
                : parseFloat(b[0])) + M.x,
              (-1 !== b[1].indexOf("%")
                ? (parseFloat(b[1]) / 100) * M.height
                : parseFloat(b[1])) + M.y,
            ];
          }
          k.xOrigin = h = parseFloat(f[0]);
          k.yOrigin = b = parseFloat(f[1]);
          if (n && v !== db) {
            var m = v[0];
            M = v[1];
            n = v[2];
            var E = v[3];
            var p = v[4];
            var Aa = v[5];
            if ((O = m * E - M * n))
              (M = (-M / O) * h + (m / O) * b - (m * Aa - M * p) / O),
                (h =
                  k.xOrigin =
                  f[0] =
                    (E / O) * h + (-n / O) * b + (n * Aa - E * p) / O),
                (b = k.yOrigin = f[1] = M);
          }
          l &&
            (d && ((k.xOffset = l.xOffset), (k.yOffset = l.yOffset), (l = k)),
            c || (!1 !== c && !1 !== e.defaultSmoothOrigin)
              ? ((k = h - G),
                (M = b - I),
                (l.xOffset += k * v[0] + M * v[2] - k),
                (l.yOffset += k * v[1] + M * v[3] - M))
              : (l.xOffset = l.yOffset = 0));
          d || a.setAttribute("data-svg-origin", f.join(" "));
        },
        ub = function (a) {
          var b = na(
              "svg",
              this.ownerSVGElement.getAttribute("xmlns") ||
                "http://www.w3.org/2000/svg"
            ),
            k = this.parentNode,
            l = this.nextSibling,
            n = this.style.cssText;
          Ta.appendChild(b);
          b.appendChild(this);
          this.style.display = "block";
          if (a)
            try {
              var c = this.getBBox();
              this._originalGetBBox = this.getBBox;
              this.getBBox = ub;
            } catch (g) {}
          else this._originalGetBBox && (c = this._originalGetBBox());
          l ? k.insertBefore(this, l) : k.appendChild(this);
          Ta.removeChild(b);
          this.style.cssText = n;
          return c;
        },
        nb = function (a) {
          var b;
          if ((b = Ea && a.getCTM))
            try {
              b = a.getBBox();
            } catch (Aa) {
              b = ub.call(a, !0);
            }
          return !(!b || (a.parentNode && !a.ownerSVGElement));
        },
        db = [1, 0, 0, 1, 0, 0],
        $a = function (a, b) {
          var n = a._gsTransform || new kb(),
            l = a.style,
            v,
            c;
          if (ba) var g = k(a, hb, null, !0);
          else
            a.currentStyle &&
              (g =
                (g = a.currentStyle.filter.match(y)) && 4 === g.length
                  ? [
                      g[0].substr(4),
                      Number(g[2].substr(4)),
                      Number(g[1].substr(4)),
                      g[3].substr(4),
                      n.x || 0,
                      n.y || 0,
                    ].join()
                  : "");
          if (
            (v = !g || "none" === g || "matrix(1, 0, 0, 1, 0, 0)" === g) &&
            ba &&
            ((c = "none" === ia(a).display) || !a.parentNode)
          ) {
            if (c) {
              var d = l.display;
              l.display = "block";
            }
            if (!a.parentNode) {
              var f = 1;
              Ta.appendChild(a);
            }
            g = k(a, hb, null, !0);
            v = !g || "none" === g || "matrix(1, 0, 0, 1, 0, 0)" === g;
            d ? (l.display = d) : c && eb(l, "display");
            f && Ta.removeChild(a);
          }
          if (n.svg || (a.getCTM && nb(a)))
            v &&
              -1 !== (l[ba] + "").indexOf("matrix") &&
              ((g = l[ba]), (v = 0)),
              (a = a.getAttribute("transform")),
              v &&
                a &&
                (-1 !== a.indexOf("matrix")
                  ? ((g = a), (v = 0))
                  : -1 !== a.indexOf("translate") &&
                    ((g =
                      "matrix(1,0,0,1," +
                      a.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") +
                      ")"),
                    (v = 0)));
          if (v) return db;
          a = (g || "").match(t) || [];
          for (ca = a.length; -1 < --ca; )
            (d = Number(a[ca])),
              (a[ca] = (f = d - (d |= 0))
                ? ((1e5 * f + (0 > f ? -0.5 : 0.5)) | 0) / 1e5 + d
                : d);
          return b && 6 < a.length ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a;
        },
        ob = (R.getTransform = function (a, b, n, c) {
          if (a._gsTransform && n && !c) return a._gsTransform;
          var l = n ? a._gsTransform || new kb() : new kb(),
            v = 0 > l.scaleX,
            g = Pa
              ? parseFloat(k(a, cb, b, !1, "0 0 0").split(" ")[2]) ||
                l.zOrigin ||
                0
              : 0,
            d = parseFloat(e.defaultTransformPerspective) || 0,
            f;
          l.svg = !(!a.getCTM || !nb(a));
          l.svg &&
            (rb(
              a,
              k(a, cb, b, !1, "50% 50%") + "",
              l,
              a.getAttribute("data-svg-origin")
            ),
            (ka = e.useSVGTransformAttr || wb));
          b = $a(a);
          if (b !== db) {
            if (16 === b.length) {
              d = b[0];
              c = b[1];
              var h = b[2],
                G = b[3],
                I = b[4];
              var m = b[5];
              var M = b[6];
              var E = b[7];
              var p = b[8],
                D = b[9],
                Aa = b[10],
                V = b[12],
                q = b[13],
                ra = b[14],
                r = b[11],
                t = Math.atan2(M, Aa);
              l.zOrigin &&
                ((ra = -l.zOrigin),
                (V = p * ra - b[12]),
                (q = D * ra - b[13]),
                (ra = Aa * ra + l.zOrigin - b[14]));
              l.rotationX = t * A;
              if (t) {
                b = Math.cos(-t);
                var y = Math.sin(-t);
                t = I * b + p * y;
                var P = m * b + D * y;
                var u = M * b + Aa * y;
                p = I * -y + p * b;
                D = m * -y + D * b;
                Aa = M * -y + Aa * b;
                r = E * -y + r * b;
                I = t;
                m = P;
                M = u;
              }
              t = Math.atan2(-h, Aa);
              l.rotationY = t * A;
              t &&
                ((b = Math.cos(-t)),
                (y = Math.sin(-t)),
                (P = c * b - D * y),
                (u = h * b - Aa * y),
                (D = c * y + D * b),
                (Aa = h * y + Aa * b),
                (r = G * y + r * b),
                (d = d * b - p * y),
                (c = P),
                (h = u));
              t = Math.atan2(c, d);
              l.rotation = t * A;
              t &&
                ((b = Math.cos(-t)),
                (y = Math.sin(-t)),
                (d = d * b + I * y),
                (P = c * b + m * y),
                (m = c * -y + m * b),
                (M = h * -y + M * b),
                (c = P));
              l.rotationX &&
                359.9 < Math.abs(l.rotationX) + Math.abs(l.rotation) &&
                ((l.rotationX = l.rotation = 0),
                (l.rotationY = 180 - l.rotationY));
              l.scaleX = ((1e5 * Math.sqrt(d * d + c * c) + 0.5) | 0) / 1e5;
              l.scaleY = ((1e5 * Math.sqrt(m * m + D * D) + 0.5) | 0) / 1e5;
              l.scaleZ = ((1e5 * Math.sqrt(M * M + Aa * Aa) + 0.5) | 0) / 1e5;
              l.rotationX || l.rotationY
                ? (l.skewX = 0)
                : ((l.skewX =
                    I || m ? Math.atan2(I, m) * A + l.rotation : l.skewX || 0),
                  90 < Math.abs(l.skewX) &&
                    270 > Math.abs(l.skewX) &&
                    (v
                      ? ((l.scaleX *= -1),
                        (l.skewX += 0 >= l.rotation ? 180 : -180),
                        (l.rotation += 0 >= l.rotation ? 180 : -180))
                      : ((l.scaleY *= -1),
                        (l.skewX += 0 >= l.skewX ? 180 : -180))));
              l.perspective = r ? 1 / (0 > r ? -r : r) : 0;
              l.x = V;
              l.y = q;
              l.z = ra;
              l.svg &&
                ((l.x -= l.xOrigin - (l.xOrigin * d - l.yOrigin * I)),
                (l.y -= l.yOrigin - (l.yOrigin * c - l.xOrigin * m)));
            } else
              (Pa &&
                !c &&
                b.length &&
                l.x === b[4] &&
                l.y === b[5] &&
                (l.rotationX || l.rotationY)) ||
                ((c = (I = 6 <= b.length) ? b[0] : 1),
                (h = b[1] || 0),
                (G = b[2] || 0),
                (I = I ? b[3] : 1),
                (l.x = b[4] || 0),
                (l.y = b[5] || 0),
                (b = Math.sqrt(c * c + h * h)),
                (m = Math.sqrt(I * I + G * G)),
                (M = c || h ? Math.atan2(h, c) * A : l.rotation || 0),
                (E = G || I ? Math.atan2(G, I) * A + M : l.skewX || 0),
                90 < Math.abs(E) &&
                  270 > Math.abs(E) &&
                  (v
                    ? ((b *= -1),
                      (E += 0 >= M ? 180 : -180),
                      (M += 0 >= M ? 180 : -180))
                    : ((m *= -1), (E += 0 >= E ? 180 : -180))),
                (l.scaleX = b),
                (l.scaleY = m),
                (l.rotation = M),
                (l.skewX = E),
                Pa &&
                  ((l.rotationX = l.rotationY = l.z = 0),
                  (l.perspective = d),
                  (l.scaleZ = 1)),
                l.svg &&
                  ((l.x -= l.xOrigin - (l.xOrigin * c + l.yOrigin * G)),
                  (l.y -= l.yOrigin - (l.xOrigin * h + l.yOrigin * I))));
            l.zOrigin = g;
            for (f in l) 2e-5 > l[f] && -2e-5 < l[f] && (l[f] = 0);
          }
          n &&
            ((a._gsTransform = l),
            l.svg &&
              (ka && a.style[ba]
                ? z.delayedCall(0.001, function () {
                    eb(a.style, ba);
                  })
                : !ka &&
                  a.getAttribute("transform") &&
                  z.delayedCall(0.001, function () {
                    a.removeAttribute("transform");
                  })));
          return l;
        }),
        Fa = function (l) {
          var k = this.data,
            n = -k.rotation * sa,
            c = n + k.skewX * sa,
            d = ((Math.cos(n) * k.scaleX * 1e5) | 0) / 1e5,
            f = ((Math.sin(n) * k.scaleX * 1e5) | 0) / 1e5,
            g = ((Math.sin(c) * -k.scaleY * 1e5) | 0) / 1e5,
            h = ((Math.cos(c) * k.scaleY * 1e5) | 0) / 1e5;
          c = this.t.style;
          n = this.t.currentStyle;
          if (n) {
            var e = f;
            f = -g;
            g = -e;
            var I = n.filter;
            c.filter = "";
            e = this.t.offsetWidth;
            var m = this.t.offsetHeight,
              E = "absolute" !== n.position,
              p =
                "progid:DXImageTransform.Microsoft.Matrix(M11\x3d" +
                d +
                ", M12\x3d" +
                f +
                ", M21\x3d" +
                g +
                ", M22\x3d" +
                h,
              D = k.x + (e * k.xPercent) / 100,
              ra = k.y + (m * k.yPercent) / 100;
            if (null != k.ox) {
              var V = (k.oxp ? e * k.ox * 0.01 : k.ox) - e / 2;
              var q = (k.oyp ? m * k.oy * 0.01 : k.oy) - m / 2;
              D += V - (V * d + q * f);
              ra += q - (V * g + q * h);
            }
            E
              ? ((V = e / 2),
                (q = m / 2),
                (p +=
                  ", Dx\x3d" +
                  (V - (V * d + q * f) + D) +
                  ", Dy\x3d" +
                  (q - (V * g + q * h) + ra) +
                  ")"))
              : (p += ", sizingMethod\x3d'auto expand')");
            -1 !== I.indexOf("DXImageTransform.Microsoft.Matrix(")
              ? (c.filter = I.replace(U, p))
              : (c.filter = p + " " + I);
            (0 !== l && 1 !== l) ||
              1 !== d ||
              0 !== f ||
              0 !== g ||
              1 !== h ||
              (E && -1 === p.indexOf("Dx\x3d0, Dy\x3d0")) ||
              (a.test(I) && 100 !== parseFloat(RegExp.$1)) ||
              (-1 === I.indexOf(I.indexOf("Alpha")) &&
                c.removeAttribute("filter"));
            if (!E)
              for (
                l = 8 > oa ? 1 : -1,
                  V = k.ieOffsetX || 0,
                  q = k.ieOffsetY || 0,
                  k.ieOffsetX = Math.round(
                    (e - ((0 > d ? -d : d) * e + (0 > f ? -f : f) * m)) / 2 + D
                  ),
                  k.ieOffsetY = Math.round(
                    (m - ((0 > h ? -h : h) * m + (0 > g ? -g : g) * e)) / 2 + ra
                  ),
                  ca = 0;
                4 > ca;
                ca++
              )
                (d = bb[ca]),
                  (f = n[d]),
                  (e =
                    -1 !== f.indexOf("px")
                      ? parseFloat(f)
                      : G(this.t, d, parseFloat(f), f.replace(b, "")) || 0),
                  (f =
                    e !== k[d]
                      ? 2 > ca
                        ? -k.ieOffsetX
                        : -k.ieOffsetY
                      : 2 > ca
                      ? V - k.ieOffsetX
                      : q - k.ieOffsetY),
                  (c[d] =
                    (k[d] = Math.round(
                      e - f * (0 === ca || 2 === ca ? 1 : l)
                    )) + "px");
          }
        },
        wa =
          (R.set3DTransformRatio =
          R.setTransformRatio =
            function (a) {
              var b = this.data,
                k = this.t.style,
                l = b.rotation,
                n = b.rotationX,
                c = b.rotationY,
                g = b.scaleX,
                d = b.scaleY,
                f = b.scaleZ,
                e = b.x,
                h = b.y,
                G = b.z,
                I = b.svg,
                m = b.perspective,
                E = b.force3D,
                p = b.skewY,
                D = b.skewX,
                V,
                q,
                ra,
                r,
                t;
              p && ((D += p), (l += p));
              if (
                (!(
                  (((1 !== a && 0 !== a) ||
                    "auto" !== E ||
                    (this.tween._totalTime !== this.tween._totalDuration &&
                      this.tween._totalTime)) &&
                    E) ||
                  G ||
                  m ||
                  c ||
                  n
                ) &&
                  1 === f) ||
                (ka && I) ||
                !Pa
              )
                if (l || D || I) {
                  l *= sa;
                  n = D * sa;
                  a = Math.cos(l) * g;
                  E = Math.sin(l) * g;
                  D = Math.sin(l - n) * -d;
                  var y = Math.cos(l - n) * d;
                  n &&
                    "simple" === b.skewType &&
                    ((l = Math.tan(n - p * sa)),
                    (l = Math.sqrt(1 + l * l)),
                    (D *= l),
                    (y *= l),
                    p &&
                      ((l = Math.tan(p * sa)),
                      (l = Math.sqrt(1 + l * l)),
                      (a *= l),
                      (E *= l)));
                  if (I) {
                    e +=
                      b.xOrigin - (b.xOrigin * a + b.yOrigin * D) + b.xOffset;
                    h +=
                      b.yOrigin - (b.xOrigin * E + b.yOrigin * y) + b.yOffset;
                    if (ka && (b.xPercent || b.yPercent)) {
                      var P = this.t.getBBox();
                      e += 0.01 * b.xPercent * P.width;
                      h += 0.01 * b.yPercent * P.height;
                    }
                    P = 1e-6;
                    e < P && e > -P && (e = 0);
                    h < P && h > -P && (h = 0);
                  }
                  g =
                    ((1e5 * a) | 0) / 1e5 +
                    "," +
                    ((1e5 * E) | 0) / 1e5 +
                    "," +
                    ((1e5 * D) | 0) / 1e5 +
                    "," +
                    ((1e5 * y) | 0) / 1e5 +
                    "," +
                    e +
                    "," +
                    h +
                    ")";
                  I && ka
                    ? this.t.setAttribute("transform", "matrix(" + g)
                    : (k[ba] =
                        (b.xPercent || b.yPercent
                          ? "translate(" +
                            b.xPercent +
                            "%," +
                            b.yPercent +
                            "%) matrix("
                          : "matrix(") + g);
                } else
                  k[ba] =
                    (b.xPercent || b.yPercent
                      ? "translate(" +
                        b.xPercent +
                        "%," +
                        b.yPercent +
                        "%) matrix("
                      : "matrix(") +
                    g +
                    ",0,0," +
                    d +
                    "," +
                    e +
                    "," +
                    h +
                    ")";
              else {
                ab &&
                  ((P = 1e-4),
                  g < P && g > -P && (g = f = 2e-5),
                  d < P && d > -P && (d = f = 2e-5),
                  !m || b.z || b.rotationX || b.rotationY || (m = 0));
                if (l || D) {
                  l *= sa;
                  var u = (a = Math.cos(l));
                  var A = (E = Math.sin(l));
                  D &&
                    ((l -= D * sa),
                    (u = Math.cos(l)),
                    (A = Math.sin(l)),
                    "simple" === b.skewType &&
                      ((l = Math.tan((D - p) * sa)),
                      (l = Math.sqrt(1 + l * l)),
                      (u *= l),
                      (A *= l),
                      b.skewY &&
                        ((l = Math.tan(p * sa)),
                        (l = Math.sqrt(1 + l * l)),
                        (a *= l),
                        (E *= l))));
                  D = -A;
                  y = u;
                } else if (c || n || 1 !== f || m || I)
                  (a = y = 1), (D = E = 0);
                else {
                  k[ba] =
                    (b.xPercent || b.yPercent
                      ? "translate(" +
                        b.xPercent +
                        "%," +
                        b.yPercent +
                        "%) translate3d("
                      : "translate3d(") +
                    e +
                    "px," +
                    h +
                    "px," +
                    G +
                    "px)" +
                    (1 !== g || 1 !== d ? " scale(" + g + "," + d + ")" : "");
                  return;
                }
                var w = 1;
                p = V = q = ra = r = t = 0;
                var x = m ? -1 / m : 0;
                var z = b.zOrigin;
                P = 1e-6;
                if ((l = c * sa))
                  (u = Math.cos(l)),
                    (A = Math.sin(l)),
                    (q = -A),
                    (r = x * -A),
                    (p = a * A),
                    (V = E * A),
                    (w = u),
                    (x *= u),
                    (a *= u),
                    (E *= u);
                if ((l = n * sa)) {
                  u = Math.cos(l);
                  A = Math.sin(l);
                  l = D * u + p * A;
                  var H = y * u + V * A;
                  ra = w * A;
                  t = x * A;
                  p = D * -A + p * u;
                  V = y * -A + V * u;
                  w *= u;
                  x *= u;
                  D = l;
                  y = H;
                }
                1 !== f && ((p *= f), (V *= f), (w *= f), (x *= f));
                1 !== d && ((D *= d), (y *= d), (ra *= d), (t *= d));
                1 !== g && ((a *= g), (E *= g), (q *= g), (r *= g));
                if (z || I)
                  z && ((e += p * -z), (h += V * -z), (G += w * -z + z)),
                    I &&
                      ((e +=
                        b.xOrigin -
                        (b.xOrigin * a + b.yOrigin * D) +
                        b.xOffset),
                      (h +=
                        b.yOrigin -
                        (b.xOrigin * E + b.yOrigin * y) +
                        b.yOffset)),
                    e < P && e > -P && (e = "0"),
                    h < P && h > -P && (h = "0"),
                    G < P && G > -P && (G = 0);
                g =
                  b.xPercent || b.yPercent
                    ? "translate(" +
                      b.xPercent +
                      "%," +
                      b.yPercent +
                      "%) matrix3d("
                    : "matrix3d(";
                g =
                  g +
                  ((a < P && a > -P ? "0" : a) +
                    "," +
                    (E < P && E > -P ? "0" : E) +
                    "," +
                    (q < P && q > -P ? "0" : q)) +
                  ("," +
                    (r < P && r > -P ? "0" : r) +
                    "," +
                    (D < P && D > -P ? "0" : D) +
                    "," +
                    (y < P && y > -P ? "0" : y));
                g =
                  n || c || 1 !== f
                    ? g +
                      ("," +
                        (ra < P && ra > -P ? "0" : ra) +
                        "," +
                        (t < P && t > -P ? "0" : t) +
                        "," +
                        (p < P && p > -P ? "0" : p)) +
                      ("," +
                        (V < P && V > -P ? "0" : V) +
                        "," +
                        (w < P && w > -P ? "0" : w) +
                        "," +
                        (x < P && x > -P ? "0" : x) +
                        ",")
                    : g + ",0,0,0,0,1,0,";
                g += e + "," + h + "," + G + "," + (m ? 1 + -G / m : 1) + ")";
                k[ba] = g;
              }
            });
      d = kb.prototype;
      d.x =
        d.y =
        d.z =
        d.skewX =
        d.skewY =
        d.rotation =
        d.rotationX =
        d.rotationY =
        d.zOrigin =
        d.xPercent =
        d.yPercent =
        d.xOffset =
        d.yOffset =
          0;
      d.scaleX = d.scaleY = d.scaleZ = 1;
      Z(
        "transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
        {
          parser: function (b, a, n, d, c, f, g) {
            if (d._lastParsedTransform === g) return c;
            d._lastParsedTransform = g;
            var l = g.scale && "function" === typeof g.scale ? g.scale : 0;
            if ("function" === typeof g[n]) {
              var v = g[n];
              g[n] = a;
            }
            l && (g.scale = l(ta, b));
            a = b._gsTransform;
            var h = b.style,
              G = qb.length,
              I = {},
              m = ob(b, J, !0, g.parseTransform),
              E =
                g.transform &&
                ("function" === typeof g.transform
                  ? g.transform(ta, Da)
                  : g.transform);
            d._transform = m;
            if (E && "string" === typeof E && ba) {
              var p = Q.style;
              p[ba] = E;
              p.display = "block";
              p.position = "absolute";
              da.body.appendChild(Q);
              var D = ob(Q, null, !1);
              if (m.svg) {
                p = m.xOrigin;
                var M = m.yOrigin;
                D.x -= m.xOffset;
                D.y -= m.yOffset;
                if (g.transformOrigin || g.svgOrigin)
                  (E = {}),
                    rb(
                      b,
                      Ba(g.transformOrigin),
                      E,
                      g.svgOrigin,
                      g.smoothOrigin,
                      !0
                    ),
                    (p = E.xOrigin),
                    (M = E.yOrigin),
                    (D.x -= E.xOffset - m.xOffset),
                    (D.y -= E.yOffset - m.yOffset);
                if (p || M)
                  (E = $a(Q, !0)),
                    (D.x -= p - (p * E[0] + M * E[2])),
                    (D.y -= M - (p * E[1] + M * E[3]));
              }
              da.body.removeChild(Q);
              D.perspective || (D.perspective = m.perspective);
              null != g.xPercent && (D.xPercent = fa(g.xPercent, m.xPercent));
              null != g.yPercent && (D.yPercent = fa(g.yPercent, m.yPercent));
            } else if ("object" === typeof g) {
              D = {
                scaleX: fa(null != g.scaleX ? g.scaleX : g.scale, m.scaleX),
                scaleY: fa(null != g.scaleY ? g.scaleY : g.scale, m.scaleY),
                scaleZ: fa(g.scaleZ, m.scaleZ),
                x: fa(g.x, m.x),
                y: fa(g.y, m.y),
                z: fa(g.z, m.z),
                xPercent: fa(g.xPercent, m.xPercent),
                yPercent: fa(g.yPercent, m.yPercent),
                perspective: fa(g.transformPerspective, m.perspective),
              };
              E = g.directionalRotation;
              if (null != E)
                if ("object" === typeof E) for (p in E) g[p] = E[p];
                else g.rotation = E;
              "string" === typeof g.x &&
                -1 !== g.x.indexOf("%") &&
                ((D.x = 0), (D.xPercent = fa(g.x, m.xPercent)));
              "string" === typeof g.y &&
                -1 !== g.y.indexOf("%") &&
                ((D.y = 0), (D.yPercent = fa(g.y, m.yPercent)));
              D.rotation = Ha(
                "rotation" in g
                  ? g.rotation
                  : "shortRotation" in g
                  ? g.shortRotation + "_short"
                  : "rotationZ" in g
                  ? g.rotationZ
                  : m.rotation,
                m.rotation,
                "rotation",
                I
              );
              Pa &&
                ((D.rotationX = Ha(
                  "rotationX" in g
                    ? g.rotationX
                    : "shortRotationX" in g
                    ? g.shortRotationX + "_short"
                    : m.rotationX || 0,
                  m.rotationX,
                  "rotationX",
                  I
                )),
                (D.rotationY = Ha(
                  "rotationY" in g
                    ? g.rotationY
                    : "shortRotationY" in g
                    ? g.shortRotationY + "_short"
                    : m.rotationY || 0,
                  m.rotationY,
                  "rotationY",
                  I
                )));
              D.skewX = Ha(g.skewX, m.skewX);
              D.skewY = Ha(g.skewY, m.skewY);
            }
            if (Pa && null != g.force3D) {
              m.force3D = g.force3D;
              var V = !0;
            }
            m.skewType = g.skewType || m.skewType || e.defaultSkewType;
            var q =
              m.force3D ||
              m.z ||
              m.rotationX ||
              m.rotationY ||
              D.z ||
              D.rotationX ||
              D.rotationY ||
              D.perspective;
            q || null == g.scale || (D.scaleZ = 1);
            for (; -1 < --G; )
              if (
                ((p = qb[G]),
                (E = D[p] - m[p]),
                1e-6 < E || -1e-6 > E || null != g[p] || null != S[p])
              )
                (V = !0),
                  (c = new Y(m, p, m[p], E, c)),
                  p in I && (c.e = I[p]),
                  (c.xs0 = 0),
                  (c.plugin = f),
                  d._overwriteProps.push(c.n);
            E = g.transformOrigin;
            if (m.svg && (E || g.svgOrigin)) {
              p = m.xOffset;
              M = m.yOffset;
              rb(b, Ba(E), D, g.svgOrigin, g.smoothOrigin);
              c = Va(
                m,
                "xOrigin",
                (a ? m : D).xOrigin,
                D.xOrigin,
                c,
                "transformOrigin"
              );
              c = Va(
                m,
                "yOrigin",
                (a ? m : D).yOrigin,
                D.yOrigin,
                c,
                "transformOrigin"
              );
              if (p !== m.xOffset || M !== m.yOffset)
                (c = Va(
                  m,
                  "xOffset",
                  a ? p : m.xOffset,
                  m.xOffset,
                  c,
                  "transformOrigin"
                )),
                  (c = Va(
                    m,
                    "yOffset",
                    a ? M : m.yOffset,
                    m.yOffset,
                    c,
                    "transformOrigin"
                  ));
              E = "0px 0px";
            }
            if (E || (Pa && q && m.zOrigin))
              ba
                ? ((V = !0),
                  (p = cb),
                  (E = (E || k(b, p, J, !1, "50% 50%")) + ""),
                  (c = new Y(h, p, 0, 0, c, -1, "transformOrigin")),
                  (c.b = h[p]),
                  (c.plugin = f),
                  Pa
                    ? ((p = m.zOrigin),
                      (E = E.split(" ")),
                      (m.zOrigin =
                        (2 < E.length && (0 === p || "0px" !== E[2])
                          ? parseFloat(E[2])
                          : p) || 0),
                      (c.xs0 = c.e = E[0] + " " + (E[1] || "50%") + " 0px"),
                      (c = new Y(m, "zOrigin", 0, 0, c, -1, c.n)),
                      (c.b = p),
                      (c.xs0 = c.e = m.zOrigin))
                    : (c.xs0 = c.e = E))
                : Ba(E + "", m);
            V &&
              (d._transformType =
                (m.svg && ka) || (!q && 3 !== this._transformType) ? 2 : 3);
            v && (g[n] = v);
            l && (g.scale = l);
            return c;
          },
          prefix: !0,
        }
      );
      Z("boxShadow", {
        defaultValue: "0px 0px 0px 0px #999",
        prefix: !0,
        color: !0,
        multi: !0,
        keyword: "inset",
      });
      Z("borderRadius", {
        defaultValue: "0px",
        parser: function (b, a, n, c, d, f) {
          a = this.format(a);
          c = [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomRightRadius",
            "borderBottomLeftRadius",
          ];
          f = b.style;
          var l, v, e, h;
          var m = parseFloat(b.offsetWidth);
          var E = parseFloat(b.offsetHeight);
          a = a.split(" ");
          for (l = 0; l < c.length; l++) {
            this.p.indexOf("border") && (c[l] = aa(c[l]));
            var I = (e = k(b, c[l], J, !1, "0px"));
            -1 !== I.indexOf(" ") &&
              ((e = I.split(" ")), (I = e[0]), (e = e[1]));
            var p = (v = a[l]);
            var D = parseFloat(I);
            var M = I.substr((D + "").length);
            if ((h = "\x3d" === p.charAt(1))) {
              var V = parseInt(p.charAt(0) + "1", 10);
              p = p.substr(2);
              V *= parseFloat(p);
              var q = p.substr((V + "").length - (0 > V ? 1 : 0)) || "";
            } else (V = parseFloat(p)), (q = p.substr((V + "").length));
            "" === q && (q = x[n] || M);
            q !== M &&
              ((I = G(b, "borderLeft", D, M)),
              (D = G(b, "borderTop", D, M)),
              "%" === q
                ? ((I = (I / m) * 100 + "%"), (e = (D / E) * 100 + "%"))
                : "em" === q
                ? ((M = G(b, "borderLeft", 1, "em")),
                  (I = I / M + "em"),
                  (e = D / M + "em"))
                : ((I += "px"), (e = D + "px")),
              h && ((p = parseFloat(I) + V + q), (v = parseFloat(e) + V + q)));
            d = Ka(f, c[l], I + " " + e, p + " " + v, !1, "0px", d);
          }
          return d;
        },
        prefix: !0,
        formatter: mb("0px 0px 0px 0px", !1, !0),
      });
      Z(
        "borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
        {
          defaultValue: "0px",
          parser: function (b, a, n, c, d, f) {
            return Ka(
              b.style,
              n,
              this.format(k(b, n, J, !1, "0px 0px")),
              this.format(a),
              !1,
              "0px",
              d
            );
          },
          prefix: !0,
          formatter: mb("0px 0px", !1, !0),
        }
      );
      Z("backgroundPosition", {
        defaultValue: "0 0",
        parser: function (b, a, n, c, d, f) {
          n = J || ia(b, null);
          n = this.format(
            (n
              ? oa
                ? n.getPropertyValue("background-position-x") +
                  " " +
                  n.getPropertyValue("background-position-y")
                : n.getPropertyValue("background-position")
              : b.currentStyle.backgroundPositionX +
                " " +
                b.currentStyle.backgroundPositionY) || "0 0"
          );
          a = this.format(a);
          var l;
          if (
            (-1 !== n.indexOf("%")) !== (-1 !== a.indexOf("%")) &&
            2 > a.split(",").length &&
            (l = k(b, "backgroundImage").replace(u, "")) &&
            "none" !== l
          ) {
            c = n.split(" ");
            var v = a.split(" ");
            Ca.setAttribute("src", l);
            for (l = 2; -1 < --l; ) {
              n = c[l];
              var e = -1 !== n.indexOf("%");
              if (e !== (-1 !== v[l].indexOf("%"))) {
                var h =
                  0 === l
                    ? b.offsetWidth - Ca.width
                    : b.offsetHeight - Ca.height;
                c[l] = e
                  ? (parseFloat(n) / 100) * h + "px"
                  : (parseFloat(n) / h) * 100 + "%";
              }
            }
            n = c.join(" ");
          }
          return this.parseComplex(b.style, n, a, d, f);
        },
        formatter: Ba,
      });
      Z("backgroundSize", {
        defaultValue: "0 0",
        formatter: function (b) {
          b += "";
          return Ba(-1 === b.indexOf(" ") ? b + " " + b : b);
        },
      });
      Z("perspective", { defaultValue: "0px", prefix: !0 });
      Z("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 });
      Z("transformStyle", { prefix: !0 });
      Z("backfaceVisibility", { prefix: !0 });
      Z("userSelect", { prefix: !0 });
      Z("margin", {
        parser: pb("marginTop,marginRight,marginBottom,marginLeft"),
      });
      Z("padding", {
        parser: pb("paddingTop,paddingRight,paddingBottom,paddingLeft"),
      });
      Z("clip", {
        defaultValue: "rect(0px,0px,0px,0px)",
        parser: function (b, a, n, c, d, f) {
          9 > oa
            ? ((c = b.currentStyle),
              (n = 8 > oa ? " " : ","),
              (c =
                "rect(" +
                c.clipTop +
                n +
                c.clipRight +
                n +
                c.clipBottom +
                n +
                c.clipLeft +
                ")"),
              (a = this.format(a).split(",").join(n)))
            : ((c = this.format(k(b, this.p, J, !1, this.dflt))),
              (a = this.format(a)));
          return this.parseComplex(b.style, c, a, d, f);
        },
      });
      Z("textShadow", {
        defaultValue: "0px 0px 0px #999",
        color: !0,
        multi: !0,
      });
      Z("autoRound,strictUnits", {
        parser: function (b, a, k, n, c) {
          return c;
        },
      });
      Z("border", {
        defaultValue: "0px solid #000",
        parser: function (a, n, c, d, f, e) {
          c = k(a, "borderTopWidth", J, !1, "0px");
          n = this.format(n).split(" ");
          d = n[0].replace(b, "");
          "px" !== d && (c = parseFloat(c) / G(a, "borderTopWidth", 1, d) + d);
          return this.parseComplex(
            a.style,
            this.format(
              c +
                " " +
                k(a, "borderTopStyle", J, !1, "solid") +
                " " +
                k(a, "borderTopColor", J, !1, "#000")
            ),
            n.join(" "),
            f,
            e
          );
        },
        color: !0,
        formatter: function (b) {
          var a = b.split(" ");
          return (
            a[0] + " " + (a[1] || "solid") + " " + (b.match(pa) || ["#000"])[0]
          );
        },
      });
      Z("borderWidth", {
        parser: pb(
          "borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
        ),
      });
      Z("float,cssFloat,styleFloat", {
        parser: function (b, a, k, n, c, d) {
          b = b.style;
          n = "cssFloat" in b ? "cssFloat" : "styleFloat";
          return new Y(b, n, 0, 0, c, -1, k, !1, 0, b[n], a);
        },
      });
      var Wa = function (b) {
        var l = this.t,
          n = l.filter || k(this.data, "filter") || "";
        b = (this.s + this.c * b) | 0;
        if (100 === b)
          if (
            -1 === n.indexOf("atrix(") &&
            -1 === n.indexOf("radient(") &&
            -1 === n.indexOf("oader(")
          ) {
            l.removeAttribute("filter");
            var d = !k(this.data, "filter");
          } else (l.filter = n.replace(c, "")), (d = !0);
        d ||
          (this.xn1 && (l.filter = n = n || "alpha(opacity\x3d" + b + ")"),
          -1 === n.indexOf("pacity")
            ? (0 === b && this.xn1) ||
              (l.filter = n + " alpha(opacity\x3d" + b + ")")
            : (l.filter = n.replace(a, "opacity\x3d" + b)));
      };
      Z("opacity,alpha,autoAlpha", {
        defaultValue: "1",
        parser: function (b, a, n, c, d, f) {
          var l = parseFloat(k(b, "opacity", J, !1, "1")),
            v = b.style,
            e = "autoAlpha" === n;
          "string" === typeof a &&
            "\x3d" === a.charAt(1) &&
            (a = ("-" === a.charAt(0) ? -1 : 1) * parseFloat(a.substr(2)) + l);
          e &&
            1 === l &&
            "hidden" === k(b, "visibility", J) &&
            0 !== a &&
            (l = 0);
          xa
            ? (d = new Y(v, "opacity", l, a - l, d))
            : ((d = new Y(v, "opacity", 100 * l, 100 * (a - l), d)),
              (d.xn1 = e ? 1 : 0),
              (v.zoom = 1),
              (d.type = 2),
              (d.b = "alpha(opacity\x3d" + d.s + ")"),
              (d.e = "alpha(opacity\x3d" + (d.s + d.c) + ")"),
              (d.data = b),
              (d.plugin = f),
              (d.setRatio = Wa));
          e &&
            ((d = new Y(
              v,
              "visibility",
              0,
              0,
              d,
              -1,
              null,
              !1,
              0,
              0 !== l ? "inherit" : "hidden",
              0 === a ? "hidden" : "inherit"
            )),
            (d.xs0 = "inherit"),
            c._overwriteProps.push(d.n),
            c._overwriteProps.push(n));
          return d;
        },
      });
      var eb = function (b, a) {
          if (a)
            if (b.removeProperty) {
              if ("ms" === a.substr(0, 2) || "webkit" === a.substr(0, 6))
                a = "-" + a;
              b.removeProperty(a.replace(h, "-$1").toLowerCase());
            } else b.removeAttribute(a);
        },
        n = function (b) {
          this.t._gsClassPT = this;
          if (1 === b || 0 === b) {
            this.t.setAttribute("class", 0 === b ? this.b : this.e);
            for (var a = this.data, n = this.t.style; a; )
              a.v ? (n[a.p] = a.v) : eb(n, a.p), (a = a._next);
            1 === b && this.t._gsClassPT === this && (this.t._gsClassPT = null);
          } else
            this.t.getAttribute("class") !== this.e &&
              this.t.setAttribute("class", this.e);
        };
      Z("className", {
        parser: function (b, a, k, c, d, f, g) {
          var l = b.getAttribute("class") || "",
            e = b.style.cssText,
            v,
            h;
          d = c._classNamePT = new Y(b, k, 0, 0, d, 2);
          d.setRatio = n;
          d.pr = -11;
          q = !0;
          d.b = l;
          k = D(b, J);
          if ((v = b._gsClassPT)) {
            var m = {};
            for (h = v.data; h; ) (m[h.p] = 1), (h = h._next);
            v.setRatio(1);
          }
          b._gsClassPT = d;
          d.e =
            "\x3d" !== a.charAt(1)
              ? a
              : l.replace(
                  new RegExp("(?:\\s|^)" + a.substr(2) + "(?![\\w-])"),
                  ""
                ) + ("+" === a.charAt(0) ? " " + a.substr(2) : "");
          b.setAttribute("class", d.e);
          a = P(b, k, D(b), g, m);
          b.setAttribute("class", l);
          d.data = a.firstMPT;
          b.style.cssText = e;
          return (d = d.xfirst = c.parse(b, a.difs, d, f));
        },
      });
      var E = function (b) {
        if (
          (1 === b || 0 === b) &&
          this.data._totalTime === this.data._totalDuration &&
          "isFromStart" !== this.data.data
        ) {
          b = this.t.style;
          var a = F.transform.parse,
            n;
          if ("all" === this.e) {
            b.cssText = "";
            var k = !0;
          } else {
            var l = this.e.split(" ").join("").split(",");
            for (n = l.length; -1 < --n; ) {
              var c = l[n];
              F[c] &&
                (F[c].parse === a
                  ? (k = !0)
                  : (c = "transformOrigin" === c ? cb : F[c].p));
              eb(b, c);
            }
          }
          k &&
            (eb(b, ba), (k = this.t._gsTransform)) &&
            (k.svg &&
              (this.t.removeAttribute("data-svg-origin"),
              this.t.removeAttribute("transform")),
            delete this.t._gsTransform);
        }
      };
      Z("clearProps", {
        parser: function (b, a, n, k, c) {
          c = new Y(b, n, 0, 0, c, 2);
          c.setRatio = E;
          c.e = a;
          c.pr = -10;
          c.data = k._tween;
          q = !0;
          return c;
        },
      });
      d = ["bezier", "throwProps", "physicsProps", "physics2D"];
      for (ca = d.length; ca--; ) Za(d[ca]);
      d = e.prototype;
      d._firstPT = d._lastParsedTransform = d._transform = null;
      d._onInitTween = function (b, a, n, c) {
        if (!b.nodeType) return !1;
        this._target = Da = b;
        this._tween = n;
        this._vars = a;
        ta = c;
        Ra = a.autoRound;
        q = !1;
        x = a.suffixMap || e.suffixMap;
        J = ia(b, "");
        B = this._overwriteProps;
        c = b.style;
        var l, d;
        if (ea && "" === c.zIndex) {
          var g = k(b, "zIndex", J);
          ("auto" !== g && "" !== g) || this._addLazySet(c, "zIndex", 0);
        }
        if ("string" === typeof a) {
          var h = c.cssText;
          g = D(b, J);
          c.cssText = h + ";" + a;
          g = P(b, g, D(b)).difs;
          !xa && f.test(a) && (g.opacity = parseFloat(RegExp.$1));
          a = g;
          c.cssText = h;
        }
        this._firstPT = a.className
          ? (l = F.className.parse(
              b,
              a.className,
              "className",
              this,
              null,
              null,
              a
            ))
          : (l = this.parse(b, a, null));
        if (this._transformType) {
          g = 3 === this._transformType;
          ba
            ? Ma &&
              ((ea = !0),
              "" === c.zIndex &&
                ((a = k(b, "zIndex", J)),
                ("auto" !== a && "" !== a) || this._addLazySet(c, "zIndex", 0)),
              Na &&
                this._addLazySet(
                  c,
                  "WebkitBackfaceVisibility",
                  this._vars.WebkitBackfaceVisibility ||
                    (g ? "visible" : "hidden")
                ))
            : (c.zoom = 1);
          for (c = l; c && c._next; ) c = c._next;
          a = new Y(b, "transform", 0, 0, null, 2);
          this._linkCSSP(a, null, c);
          a.setRatio = ba ? wa : Fa;
          a.data = this._transform || ob(b, J, !0);
          a.tween = n;
          a.pr = -1;
          B.pop();
        }
        if (q) {
          for (; l; ) {
            b = l._next;
            for (c = h; c && c.pr > l.pr; ) c = c._next;
            (l._prev = c ? c._prev : d) ? (l._prev._next = l) : (h = l);
            (l._next = c) ? (c._prev = l) : (d = l);
            l = b;
          }
          this._firstPT = h;
        }
        return !0;
      };
      d.parse = function (a, n, c, d) {
        var l = a.style,
          f,
          g,
          e;
        for (f in n) {
          var h = n[f];
          "function" === typeof h && (h = h(ta, Da));
          if ((g = F[f])) c = g.parse(a, h, f, this, c, d, n);
          else {
            g = k(a, f, J) + "";
            var m = "string" === typeof h;
            if (
              "color" === f ||
              "fill" === f ||
              "stroke" === f ||
              -1 !== f.indexOf("Color") ||
              (m && p.test(h))
            )
              m ||
                ((h = la(h)),
                (h = (3 < h.length ? "rgba(" : "rgb(") + h.join(",") + ")")),
                (c = Ka(l, f, g, h, !0, "transparent", c, 0, d));
            else if (m && H.test(h)) c = Ka(l, f, g, h, !0, null, c, 0, d);
            else {
              var v =
                (e = parseFloat(g)) || 0 === e ? g.substr((e + "").length) : "";
              if ("" === g || "auto" === g)
                if ("width" === f || "height" === f) {
                  e = a;
                  var E = f;
                  var D = J;
                  if ("svg" === (e.nodeName + "").toLowerCase())
                    e = (D || ia(e))[E] || 0;
                  else if (e.getCTM && nb(e)) e = e.getBBox()[E] || 0;
                  else {
                    v = parseFloat(
                      "width" === E ? e.offsetWidth : e.offsetHeight
                    );
                    E = Ua[E];
                    var V = E.length;
                    for (D = D || ia(e, null); -1 < --V; )
                      (v -= parseFloat(k(e, "padding" + E[V], D, !0)) || 0),
                        (v -=
                          parseFloat(k(e, "border" + E[V] + "Width", D, !0)) ||
                          0);
                    e = v;
                  }
                  v = "px";
                } else
                  "left" === f || "top" === f
                    ? ((e = I(a, f, J)), (v = "px"))
                    : ((e = "opacity" !== f ? 0 : 1), (v = ""));
              (E = m && "\x3d" === h.charAt(1))
                ? ((D = parseInt(h.charAt(0) + "1", 10)),
                  (h = h.substr(2)),
                  (D *= parseFloat(h)),
                  (m = h.replace(b, "")))
                : ((D = parseFloat(h)), (m = m ? h.replace(b, "") : ""));
              "" === m && (m = f in x ? x[f] : v);
              h = D || 0 === D ? (E ? D + e : D) + m : n[f];
              v !== m &&
                "" !== m &&
                (D || 0 === D) &&
                e &&
                ((e = G(a, f, e, v)),
                "%" === m
                  ? ((e /= G(a, f, 100, "%") / 100),
                    !0 !== n.strictUnits && (g = e + "%"))
                  : "em" === m || "rem" === m || "vw" === m || "vh" === m
                  ? (e /= G(a, f, 1, m))
                  : "px" !== m && ((D = G(a, f, D, m)), (m = "px")),
                E && (D || 0 === D) && (h = D + e + m));
              E && (D += e);
              (!e && 0 !== e) || (!D && 0 !== D)
                ? void 0 !== l[f] && (h || ("NaN" !== h + "" && null != h))
                  ? ((c = new Y(l, f, D || e || 0, 0, c, -1, f, !1, 0, g, h)),
                    (c.xs0 =
                      "none" !== h ||
                      ("display" !== f && -1 === f.indexOf("Style"))
                        ? h
                        : g))
                  : _gsScope.console &&
                    console.log("invalid " + f + " tween value: " + n[f])
                : ((c = new Y(
                    l,
                    f,
                    e,
                    D - e,
                    c,
                    0,
                    f,
                    !1 !== Ra && ("px" === m || "zIndex" === f),
                    0,
                    g,
                    h
                  )),
                  (c.xs0 = m));
            }
          }
          d && c && !c.plugin && (c.plugin = d);
        }
        return c;
      };
      d.setRatio = function (b) {
        var a = this._firstPT;
        if (
          1 !== b ||
          (this._tween._time !== this._tween._duration &&
            0 !== this._tween._time)
        )
          if (
            b ||
            (this._tween._time !== this._tween._duration &&
              0 !== this._tween._time) ||
            -1e-6 === this._tween._rawPrevTime
          )
            for (; a; ) {
              var n = a.c * b + a.s;
              a.r ? (n = Math.round(n)) : 1e-6 > n && -1e-6 < n && (n = 0);
              if (a.type)
                if (1 === a.type) {
                  var k = a.l;
                  if (2 === k) a.t[a.p] = a.xs0 + n + a.xs1 + a.xn1 + a.xs2;
                  else if (3 === k)
                    a.t[a.p] =
                      a.xs0 + n + a.xs1 + a.xn1 + a.xs2 + a.xn2 + a.xs3;
                  else if (4 === k)
                    a.t[a.p] =
                      a.xs0 +
                      n +
                      a.xs1 +
                      a.xn1 +
                      a.xs2 +
                      a.xn2 +
                      a.xs3 +
                      a.xn3 +
                      a.xs4;
                  else if (5 === k)
                    a.t[a.p] =
                      a.xs0 +
                      n +
                      a.xs1 +
                      a.xn1 +
                      a.xs2 +
                      a.xn2 +
                      a.xs3 +
                      a.xn3 +
                      a.xs4 +
                      a.xn4 +
                      a.xs5;
                  else {
                    n = a.xs0 + n + a.xs1;
                    for (k = 1; k < a.l; k++)
                      n += a["xn" + k] + a["xs" + (k + 1)];
                    a.t[a.p] = n;
                  }
                } else
                  -1 === a.type
                    ? (a.t[a.p] = a.xs0)
                    : a.setRatio && a.setRatio(b);
              else a.t[a.p] = n + a.xs0;
              a = a._next;
            }
          else
            for (; a; )
              2 !== a.type ? (a.t[a.p] = a.b) : a.setRatio(b), (a = a._next);
        else
          for (; a; ) {
            if (2 !== a.type)
              if (a.r && -1 !== a.type)
                if (((n = Math.round(a.s + a.c)), !a.type))
                  a.t[a.p] = n + a.xs0;
                else {
                  if (1 === a.type) {
                    n = a.xs0 + n + a.xs1;
                    for (k = 1; k < a.l; k++)
                      n += a["xn" + k] + a["xs" + (k + 1)];
                    a.t[a.p] = n;
                  }
                }
              else a.t[a.p] = a.e;
            else a.setRatio(b);
            a = a._next;
          }
      };
      d._enableTransforms = function (a) {
        this._transform = this._transform || ob(this._target, J, !0);
        this._transformType =
          (this._transform.svg && ka) || (!a && 3 !== this._transformType)
            ? 2
            : 3;
      };
      var V = function (a) {
        this.t[this.p] = this.e;
        this.data._linkCSSP(this, this._next, null, !0);
      };
      d._addLazySet = function (a, b, n) {
        a = this._firstPT = new Y(a, b, 0, 0, this._firstPT, 2);
        a.e = n;
        a.setRatio = V;
        a.data = this;
      };
      d._linkCSSP = function (a, b, n, k) {
        a &&
          (b && (b._prev = a),
          a._next && (a._next._prev = a._prev),
          a._prev
            ? (a._prev._next = a._next)
            : this._firstPT === a && ((this._firstPT = a._next), (k = !0)),
          n
            ? (n._next = a)
            : k || null !== this._firstPT || (this._firstPT = a),
          (a._next = b),
          (a._prev = n));
        return a;
      };
      d._mod = function (a) {
        for (var b = this._firstPT; b; )
          "function" === typeof a[b.p] && a[b.p] === Math.round && (b.r = 1),
            (b = b._next);
      };
      d._kill = function (a) {
        var b = a,
          n,
          k;
        if (a.autoAlpha || a.alpha) {
          b = {};
          for (l in a) b[l] = a[l];
          b.opacity = 1;
          b.autoAlpha && (b.visibility = 1);
        }
        a.className &&
          (n = this._classNamePT) &&
          ((k = n.xfirst) && k._prev
            ? this._linkCSSP(k._prev, n._next, k._prev._prev)
            : k === this._firstPT && (this._firstPT = n._next),
          n._next && this._linkCSSP(n._next, n._next._next, k._prev),
          (this._classNamePT = null));
        for (n = this._firstPT; n; ) {
          if (n.plugin && n.plugin !== l && n.plugin._kill) {
            n.plugin._kill(a);
            var l = n.plugin;
          }
          n = n._next;
        }
        return w.prototype._kill.call(this, b);
      };
      var ra = function (a, b, n) {
        var k;
        if (a.slice) for (k = a.length; -1 < --k; ) ra(a[k], b, n);
        else
          for (a = a.childNodes, k = a.length; -1 < --k; ) {
            var l = a[k];
            var c = l.type;
            l.style && (b.push(D(l)), n && n.push(l));
            (1 !== c && 9 !== c && 11 !== c) ||
              !l.childNodes.length ||
              ra(l, b, n);
          }
      };
      e.cascadeTo = function (a, b, n) {
        var k = z.to(a, b, n),
          l = [k],
          c = [],
          g = [],
          d = [],
          f = z._internals.reservedProps,
          e;
        a = k._targets || k.target;
        ra(a, c, d);
        k.render(b, !0, !0);
        ra(a, g);
        k.render(0, !0, !0);
        k._enabled(!0);
        for (a = d.length; -1 < --a; )
          if (((k = P(d[a], c[a], g[a])), k.firstMPT)) {
            k = k.difs;
            for (e in n) f[e] && (k[e] = n[e]);
            var h = {};
            for (e in k) h[e] = c[a][e];
            l.push(z.fromTo(d[a], b, h, k));
          }
        return l;
      };
      w.activate([e]);
      return e;
    },
    !0
  );
  (function () {
    var w = _gsScope._gsDefine.plugin({
      propName: "roundProps",
      version: "1.6.0",
      priority: -1,
      API: 2,
      init: function (w, e, L) {
        this._tween = L;
        return !0;
      },
    }).prototype;
    w._onInitAllProps = function () {
      for (
        var w = this._tween,
          e = w.vars.roundProps.join
            ? w.vars.roundProps
            : w.vars.roundProps.split(","),
          L = e.length,
          q = {},
          x = w._propLookup.roundProps,
          J,
          B,
          F;
        -1 < --L;

      )
        q[e[L]] = Math.round;
      for (L = e.length; -1 < --L; )
        for (J = e[L], B = w._firstPT; B; ) {
          F = B._next;
          if (B.pg) B.t._mod(q);
          else if (B.n === J)
            if (2 === B.f && B.t)
              for (B = B.t._firstPT; B; )
                B.f || B.blob || (B.m = Math.round), (B = B._next);
            else
              this._add(B.t, J, B.s, B.c),
                F && (F._prev = B._prev),
                B._prev
                  ? (B._prev._next = F)
                  : w._firstPT === B && (w._firstPT = F),
                (B._next = B._prev = null),
                (w._propLookup[J] = x);
          B = F;
        }
      return !1;
    };
    w._add = function (w, e, L, q) {
      this._addTween(w, e, L, L + q, e, Math.round);
      this._overwriteProps.push(e);
    };
  })();
  (function () {
    _gsScope._gsDefine.plugin({
      propName: "attr",
      API: 2,
      version: "0.6.0",
      init: function (w, z, e, L) {
        var q;
        if ("function" !== typeof w.setAttribute) return !1;
        for (q in z)
          (e = z[q]),
            "function" === typeof e && (e = e(L, w)),
            this._addTween(
              w,
              "setAttribute",
              w.getAttribute(q) + "",
              e + "",
              q,
              !1,
              q
            ),
            this._overwriteProps.push(q);
        return !0;
      },
    });
  })();
  _gsScope._gsDefine.plugin({
    propName: "directionalRotation",
    version: "0.3.0",
    API: 2,
    init: function (w, z, e, L) {
      "object" !== typeof z && (z = { rotation: z });
      this.finals = {};
      e = !0 === z.useRadians ? 2 * Math.PI : 360;
      var q;
      for (q in z)
        if ("useRadians" !== q) {
          var x = z[q];
          "function" === typeof x && (x = x(L, w));
          var J = (x + "").split("_");
          x = J[0];
          var B = parseFloat(
            "function" !== typeof w[q]
              ? w[q]
              : w[
                  q.indexOf("set") ||
                  "function" !== typeof w["get" + q.substr(3)]
                    ? q
                    : "get" + q.substr(3)
                ]()
          );
          x = this.finals[q] =
            "string" === typeof x && "\x3d" === x.charAt(1)
              ? B + parseInt(x.charAt(0) + "1", 10) * Number(x.substr(2))
              : Number(x) || 0;
          var F = x - B;
          J.length &&
            ((x = J.join("_")),
            -1 !== x.indexOf("short") &&
              ((F %= e), F !== F % (e / 2) && (F = 0 > F ? F + e : F - e)),
            -1 !== x.indexOf("_cw") && 0 > F
              ? (F = ((F + 9999999999 * e) % e) - ((F / e) | 0) * e)
              : -1 !== x.indexOf("ccw") &&
                0 < F &&
                (F = ((F - 9999999999 * e) % e) - ((F / e) | 0) * e));
          if (1e-6 < F || -1e-6 > F)
            this._addTween(w, q, B, B + F, q), this._overwriteProps.push(q);
        }
      return !0;
    },
    set: function (w) {
      if (1 !== w) this._super.setRatio.call(this, w);
      else
        for (w = this._firstPT; w; ) {
          if (w.f) w.t[w.p](this.finals[w.p]);
          else w.t[w.p] = this.finals[w.p];
          w = w._next;
        }
    },
  })._autoCSS = !0;
  _gsScope._gsDefine(
    "easing.Back",
    ["easing.Ease"],
    function (w) {
      var z = _gsScope.GreenSockGlobals || _gsScope,
        e = 2 * Math.PI,
        L = Math.PI / 2,
        q = z.com.greensock._class,
        x = function (b, a) {
          b = q("easing." + b, function () {}, !0);
          var d = (b.prototype = new w());
          d.constructor = b;
          d.getRatio = a;
          return b;
        },
        J = w.register || function () {},
        B = function (b, a, d, c, e) {
          a = q(
            "easing." + b,
            { easeOut: new a(), easeIn: new d(), easeInOut: new c() },
            !0
          );
          J(a, b);
          return a;
        },
        F = function (b, a, d) {
          this.t = b;
          this.v = a;
          d &&
            ((this.next = d),
            (d.prev = this),
            (this.c = d.v - a),
            (this.gap = d.t - b));
        },
        d = function (b, a) {
          var d = q(
            "easing." + b,
            function (a) {
              this._p1 = a || 0 === a ? a : 1.70158;
              this._p2 = 1.525 * this._p1;
            },
            !0
          );
          b = d.prototype = new w();
          b.constructor = d;
          b.getRatio = a;
          b.config = function (a) {
            return new d(a);
          };
          return d;
        };
      d = B(
        "Back",
        d("BackOut", function (b) {
          return --b * b * ((this._p1 + 1) * b + this._p1) + 1;
        }),
        d("BackIn", function (b) {
          return b * b * ((this._p1 + 1) * b - this._p1);
        }),
        d("BackInOut", function (b) {
          return 1 > (b *= 2)
            ? 0.5 * b * b * ((this._p2 + 1) * b - this._p2)
            : 0.5 * ((b -= 2) * b * ((this._p2 + 1) * b + this._p2) + 2);
        })
      );
      var t = q(
          "easing.SlowMo",
          function (b, a, d) {
            null == b ? (b = 0.7) : 1 < b && (b = 1);
            this._p = 1 !== b ? (a || 0 === a ? a : 0.7) : 0;
            this._p1 = (1 - b) / 2;
            this._p2 = b;
            this._p3 = this._p1 + this._p2;
            this._calcEnd = !0 === d;
          },
          !0
        ),
        r = (t.prototype = new w());
      r.constructor = t;
      r.getRatio = function (b) {
        var a = b + (0.5 - b) * this._p;
        return b < this._p1
          ? this._calcEnd
            ? 1 - (b = 1 - b / this._p1) * b
            : a - (b = 1 - b / this._p1) * b * b * b * a
          : b > this._p3
          ? this._calcEnd
            ? 1 - (b = (b - this._p3) / this._p1) * b
            : a + (b - a) * (b = (b - this._p3) / this._p1) * b * b * b
          : this._calcEnd
          ? 1
          : a;
      };
      t.ease = new t(0.7, 0.7);
      r.config = t.config = function (b, a, d) {
        return new t(b, a, d);
      };
      var N = q(
        "easing.SteppedEase",
        function (b) {
          b = b || 1;
          this._p1 = 1 / b;
          this._p2 = b + 1;
        },
        !0
      );
      r = N.prototype = new w();
      r.constructor = N;
      r.getRatio = function (b) {
        0 > b ? (b = 0) : 1 <= b && (b = 0.999999999);
        return ((this._p2 * b) >> 0) * this._p1;
      };
      r.config = N.config = function (b) {
        return new N(b);
      };
      var C = q(
        "easing.RoughEase",
        function (b) {
          b = b || {};
          var a = b.taper || "none",
            d = [],
            c = 0,
            e = (b.points || 20) | 0,
            h = e,
            m = !1 !== b.randomize,
            q = !0 === b.clamp,
            r = b.template instanceof w ? b.template : null;
          b = "number" === typeof b.strength ? 0.4 * b.strength : 0.4;
          for (var t, y, x; -1 < --h; )
            (t = m ? Math.random() : (1 / e) * h),
              (y = r ? r.getRatio(t) : t),
              "none" === a
                ? (x = b)
                : "out" === a
                ? ((x = 1 - t), (x = x * x * b))
                : "in" === a
                ? (x = t * t * b)
                : ((x = 0.5 > t ? 2 * t : 2 * (1 - t)), (x = x * x * 0.5 * b)),
              (y = m
                ? y + (Math.random() * x - 0.5 * x)
                : h % 2
                ? y + 0.5 * x
                : y - 0.5 * x),
              q && (1 < y ? (y = 1) : 0 > y && (y = 0)),
              (d[c++] = { x: t, y: y });
          d.sort(function (a, b) {
            return a.x - b.x;
          });
          a = new F(1, 1, null);
          for (h = e; -1 < --h; ) (e = d[h]), (a = new F(e.x, e.y, a));
          this._prev = new F(0, 0, 0 !== a.t ? a : a.next);
        },
        !0
      );
      r = C.prototype = new w();
      r.constructor = C;
      r.getRatio = function (b) {
        var a = this._prev;
        if (b > a.t) {
          for (; a.next && b >= a.t; ) a = a.next;
          a = a.prev;
        } else for (; a.prev && b <= a.t; ) a = a.prev;
        this._prev = a;
        return a.v + ((b - a.t) / a.gap) * a.c;
      };
      r.config = function (b) {
        return new C(b);
      };
      C.ease = new C();
      B(
        "Bounce",
        x("BounceOut", function (b) {
          return b < 1 / 2.75
            ? 7.5625 * b * b
            : b < 2 / 2.75
            ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75
            : b < 2.5 / 2.75
            ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375
            : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375;
        }),
        x("BounceIn", function (b) {
          return (b = 1 - b) < 1 / 2.75
            ? 1 - 7.5625 * b * b
            : b < 2 / 2.75
            ? 1 - (7.5625 * (b -= 1.5 / 2.75) * b + 0.75)
            : b < 2.5 / 2.75
            ? 1 - (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375)
            : 1 - (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375);
        }),
        x("BounceInOut", function (b) {
          var a = 0.5 > b;
          b = a ? 1 - 2 * b : 2 * b - 1;
          b =
            b < 1 / 2.75
              ? 7.5625 * b * b
              : b < 2 / 2.75
              ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75
              : b < 2.5 / 2.75
              ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375
              : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375;
          return a ? 0.5 * (1 - b) : 0.5 * b + 0.5;
        })
      );
      B(
        "Circ",
        x("CircOut", function (b) {
          return Math.sqrt(1 - --b * b);
        }),
        x("CircIn", function (b) {
          return -(Math.sqrt(1 - b * b) - 1);
        }),
        x("CircInOut", function (b) {
          return 1 > (b *= 2)
            ? -0.5 * (Math.sqrt(1 - b * b) - 1)
            : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1);
        })
      );
      r = function (b, a, d) {
        var c = q(
          "easing." + b,
          function (a, b) {
            this._p1 = 1 <= a ? a : 1;
            this._p2 = (b || d) / (1 > a ? a : 1);
            this._p3 = (this._p2 / e) * (Math.asin(1 / this._p1) || 0);
            this._p2 = e / this._p2;
          },
          !0
        );
        b = c.prototype = new w();
        b.constructor = c;
        b.getRatio = a;
        b.config = function (a, b) {
          return new c(a, b);
        };
        return c;
      };
      B(
        "Elastic",
        r(
          "ElasticOut",
          function (b) {
            return (
              this._p1 *
                Math.pow(2, -10 * b) *
                Math.sin((b - this._p3) * this._p2) +
              1
            );
          },
          0.3
        ),
        r(
          "ElasticIn",
          function (b) {
            return -(
              this._p1 *
              Math.pow(2, 10 * --b) *
              Math.sin((b - this._p3) * this._p2)
            );
          },
          0.3
        ),
        r(
          "ElasticInOut",
          function (b) {
            return 1 > (b *= 2)
              ? -0.5 *
                  this._p1 *
                  Math.pow(2, 10 * --b) *
                  Math.sin((b - this._p3) * this._p2)
              : this._p1 *
                  Math.pow(2, -10 * --b) *
                  Math.sin((b - this._p3) * this._p2) *
                  0.5 +
                  1;
          },
          0.45
        )
      );
      B(
        "Expo",
        x("ExpoOut", function (b) {
          return 1 - Math.pow(2, -10 * b);
        }),
        x("ExpoIn", function (b) {
          return Math.pow(2, 10 * (b - 1)) - 0.001;
        }),
        x("ExpoInOut", function (b) {
          return 1 > (b *= 2)
            ? 0.5 * Math.pow(2, 10 * (b - 1))
            : 0.5 * (2 - Math.pow(2, -10 * (b - 1)));
        })
      );
      B(
        "Sine",
        x("SineOut", function (b) {
          return Math.sin(b * L);
        }),
        x("SineIn", function (b) {
          return -Math.cos(b * L) + 1;
        }),
        x("SineInOut", function (b) {
          return -0.5 * (Math.cos(Math.PI * b) - 1);
        })
      );
      q(
        "easing.EaseLookup",
        {
          find: function (b) {
            return w.map[b];
          },
        },
        !0
      );
      J(z.SlowMo, "SlowMo", "ease,");
      J(C, "RoughEase", "ease,");
      J(N, "SteppedEase", "ease,");
      return d;
    },
    !0
  );
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()();
(function (w, z) {
  var e = {},
    L = w.document,
    q = (w.GreenSockGlobals = w.GreenSockGlobals || w);
  if (!q.TweenLite) {
    var x = function (a) {
        a = a.split(".");
        var b = q,
          k;
        for (k = 0; k < a.length; k++) b[a[k]] = b = b[a[k]] || {};
        return b;
      },
      J = x("com.greensock"),
      B = function (a) {
        var b = [],
          k = a.length,
          c;
        for (c = 0; c !== k; b.push(a[c++]));
        return b;
      },
      F = function () {},
      d = (function () {
        var a = Object.prototype.toString,
          b = a.call([]);
        return function (k) {
          return (
            null != k &&
            (k instanceof Array ||
              ("object" === typeof k && !!k.push && a.call(k) === b))
          );
        };
      })(),
      t,
      r = {},
      N = function (a, b, c, d) {
        this.sc = r[a] ? r[a].sc : [];
        r[a] = this;
        this.gsClass = null;
        this.func = c;
        var k = [];
        this.check = function (f) {
          for (var h = b.length, m = h, G, I; -1 < --h; )
            (G = r[b[h]] || new N(b[h], [])).gsClass
              ? ((k[h] = G.gsClass), m--)
              : f && G.sc.push(this);
          if (0 === m && c) {
            m = ("com.greensock." + a).split(".");
            f = m.pop();
            I = x(m.join("."))[f] = this.gsClass = c.apply(c, k);
            if (d)
              if (
                ((q[f] = e[f] = I),
                (m = "undefined" !== typeof module && module.exports),
                !m && "function" === typeof define && define.amd)
              )
                define(
                  (w.GreenSockAMDPath ? w.GreenSockAMDPath + "/" : "") +
                    a.split(".").pop(),
                  [],
                  function () {
                    return I;
                  }
                );
              else if (m)
                if (a === z)
                  for (h in ((module.exports = e[z] = I), e)) I[h] = e[h];
                else e[z] && (e[z][f] = I);
            for (h = 0; h < this.sc.length; h++) this.sc[h].check();
          }
        };
        this.check(!0);
      },
      C = (w._gsDefine = function (a, b, c, d) {
        return new N(a, b, c, d);
      }),
      b = (J._class = function (a, b, c) {
        b = b || function () {};
        C(
          a,
          [],
          function () {
            return b;
          },
          c
        );
        return b;
      });
    C.globals = q;
    var a = [0, 0, 1, 1],
      f = b(
        "easing.Ease",
        function (b, c, d, e) {
          this._func = b;
          this._type = d || 0;
          this._power = e || 0;
          this._params = c ? a.concat(c) : a;
        },
        !0
      ),
      c = (f.map = {}),
      p = (f.register = function (a, d, e, f) {
        d = d.split(",");
        var k = d.length;
        e = (e || "easeIn,easeOut,easeInOut").split(",");
        for (var h, m, G, I; -1 < --k; )
          for (
            m = d[k],
              h = f ? b("easing." + m, null, !0) : J.easing[m] || {},
              G = e.length;
            -1 < --G;

          )
            (I = e[G]),
              (c[m + "." + I] =
                c[I + m] =
                h[I] =
                  a.getRatio ? a : a[I] || new a());
      });
    var h = f.prototype;
    h._calcEnd = !1;
    h.getRatio = function (a) {
      if (this._func)
        return (this._params[0] = a), this._func.apply(null, this._params);
      var b = this._type,
        k = this._power,
        c = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
      1 === k
        ? (c *= c)
        : 2 === k
        ? (c *= c * c)
        : 3 === k
        ? (c *= c * c * c)
        : 4 === k && (c *= c * c * c * c);
      return 1 === b ? 1 - c : 2 === b ? c : 0.5 > a ? c / 2 : 1 - c / 2;
    };
    var m = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
    for (t = m.length; -1 < --t; )
      (h = m[t] + ",Power" + t),
        p(new f(null, null, 1, t), h, "easeOut", !0),
        p(new f(null, null, 2, t), h, "easeIn" + (0 === t ? ",easeNone" : "")),
        p(new f(null, null, 3, t), h, "easeInOut");
    c.linear = J.easing.Linear.easeIn;
    c.swing = J.easing.Quad.easeInOut;
    var u = b("events.EventDispatcher", function (a) {
      this._listeners = {};
      this._eventTarget = a || this;
    });
    h = u.prototype;
    h.addEventListener = function (a, b, c, d, e) {
      e = e || 0;
      var k = this._listeners[a],
        f = 0,
        h;
      this !== H || ia || H.wake();
      null == k && (this._listeners[a] = k = []);
      for (h = k.length; -1 < --h; )
        (a = k[h]),
          a.c === b && a.s === c
            ? k.splice(h, 1)
            : 0 === f && a.pr < e && (f = h + 1);
      k.splice(f, 0, { c: b, s: c, up: d, pr: e });
    };
    h.removeEventListener = function (a, b) {
      a = this._listeners[a];
      var k;
      if (a)
        for (k = a.length; -1 < --k; )
          if (a[k].c === b) {
            a.splice(k, 1);
            break;
          }
    };
    h.dispatchEvent = function (a) {
      var b = this._listeners[a],
        k,
        c;
      if (b) {
        var d = b.length;
        1 < d && (b = b.slice(0));
        for (k = this._eventTarget; -1 < --d; )
          (c = b[d]) &&
            (c.up
              ? c.c.call(c.s || k, { type: a, target: k })
              : c.c.call(c.s || k));
      }
    };
    var K = w.requestAnimationFrame,
      ha = w.cancelAnimationFrame,
      y =
        Date.now ||
        function () {
          return new Date().getTime();
        },
      U = y();
    m = ["ms", "moz", "webkit", "o"];
    for (t = m.length; -1 < --t && !K; )
      (K = w[m[t] + "RequestAnimationFrame"]),
        (ha =
          w[m[t] + "CancelAnimationFrame"] ||
          w[m[t] + "CancelRequestAnimationFrame"]);
    b("Ticker", function (a, b) {
      var k = this,
        c = y(),
        d = !1 !== b && K ? "auto" : !1,
        e = 500,
        f = 33,
        h,
        m,
        G,
        p,
        q,
        r = function (a) {
          var b = y() - U;
          b > e && (c += b - f);
          U += b;
          k.time = (U - c) / 1e3;
          b = k.time - q;
          if (!h || 0 < b || !0 === a) {
            k.frame++;
            q += b + (b >= p ? 0.004 : p - b);
            var d = !0;
          }
          !0 !== a && (G = m(r));
          d && k.dispatchEvent("tick");
        };
      u.call(k);
      k.time = k.frame = 0;
      k.tick = function () {
        r(!0);
      };
      k.lagSmoothing = function (a, b) {
        e = a || 1e10;
        f = Math.min(b, e, 0);
      };
      k.sleep = function () {
        null != G &&
          (d && ha ? ha(G) : clearTimeout(G),
          (m = F),
          (G = null),
          k === H && (ia = !1));
      };
      k.wake = function (a) {
        null !== G
          ? k.sleep()
          : a
          ? (c += -U + (U = y()))
          : 10 < k.frame && (U = y() - e + 5);
        m =
          0 === h
            ? F
            : d && K
            ? K
            : function (a) {
                return setTimeout(a, (1e3 * (q - k.time) + 1) | 0);
              };
        k === H && (ia = !0);
        r(2);
      };
      k.fps = function (a) {
        if (!arguments.length) return h;
        h = a;
        p = 1 / (h || 60);
        q = this.time + p;
        k.wake();
      };
      k.useRAF = function (a) {
        if (!arguments.length) return d;
        k.sleep();
        d = a;
        k.fps(h);
      };
      k.fps(a);
      setTimeout(function () {
        "auto" === d &&
          5 > k.frame &&
          "hidden" !== L.visibilityState &&
          k.useRAF(!1);
      }, 1500);
    });
    h = J.Ticker.prototype = new J.events.EventDispatcher();
    h.constructor = J.Ticker;
    var ja = b("core.Animation", function (a, b) {
      this.vars = b = b || {};
      this._duration = this._totalDuration = a || 0;
      this._delay = Number(b.delay) || 0;
      this._timeScale = 1;
      this._active = !0 === b.immediateRender;
      this.data = b.data;
      this._reversed = !0 === b.reversed;
      oa &&
        (ia || H.wake(),
        (a = this.vars.useFrames ? Na : oa),
        a.add(this, a._time),
        this.vars.paused && this.paused(!0));
    });
    var H = (ja.ticker = new J.Ticker());
    h = ja.prototype;
    h._dirty = h._gc = h._initted = h._paused = !1;
    h._totalTime = h._time = 0;
    h._rawPrevTime = -1;
    h._next = h._last = h._onUpdate = h._timeline = h.timeline = null;
    h._paused = !1;
    var sa = function () {
      ia && 2e3 < y() - U && H.wake();
      setTimeout(sa, 2e3);
    };
    sa();
    h.play = function (a, b) {
      null != a && this.seek(a, b);
      return this.reversed(!1).paused(!1);
    };
    h.pause = function (a, b) {
      null != a && this.seek(a, b);
      return this.paused(!0);
    };
    h.resume = function (a, b) {
      null != a && this.seek(a, b);
      return this.paused(!1);
    };
    h.seek = function (a, b) {
      return this.totalTime(Number(a), !1 !== b);
    };
    h.restart = function (a, b) {
      return this.reversed(!1)
        .paused(!1)
        .totalTime(a ? -this._delay : 0, !1 !== b, !0);
    };
    h.reverse = function (a, b) {
      null != a && this.seek(a || this.totalDuration(), b);
      return this.reversed(!0).paused(!1);
    };
    h.render = function (a, b, c) {};
    h.invalidate = function () {
      this._time = this._totalTime = 0;
      this._initted = this._gc = !1;
      this._rawPrevTime = -1;
      (!this._gc && this.timeline) || this._enabled(!0);
      return this;
    };
    h.isActive = function () {
      var a = this._timeline,
        b = this._startTime,
        c;
      return (
        !a ||
        (!this._gc &&
          !this._paused &&
          a.isActive() &&
          (c = a.rawTime(!0)) >= b &&
          c < b + this.totalDuration() / this._timeScale)
      );
    };
    h._enabled = function (a, b) {
      ia || H.wake();
      this._gc = !a;
      this._active = this.isActive();
      !0 !== b &&
        (a && !this.timeline
          ? this._timeline.add(this, this._startTime - this._delay)
          : !a && this.timeline && this._timeline._remove(this, !0));
      return !1;
    };
    h._kill = function (a, b) {
      return this._enabled(!1, !1);
    };
    h.kill = function (a, b) {
      this._kill(a, b);
      return this;
    };
    h._uncache = function (a) {
      for (a = a ? this : this.timeline; a; ) (a._dirty = !0), (a = a.timeline);
      return this;
    };
    h._swapSelfInParams = function (a) {
      for (var b = a.length, k = a.concat(); -1 < --b; )
        "{self}" === a[b] && (k[b] = this);
      return k;
    };
    h._callback = function (a) {
      var b = this.vars,
        k = b[a],
        c = b[a + "Params"];
      a = b[a + "Scope"] || b.callbackScope || this;
      switch (c ? c.length : 0) {
        case 0:
          k.call(a);
          break;
        case 1:
          k.call(a, c[0]);
          break;
        case 2:
          k.call(a, c[0], c[1]);
          break;
        default:
          k.apply(a, c);
      }
    };
    h.eventCallback = function (a, b, c, e) {
      if ("on" === (a || "").substr(0, 2)) {
        var k = this.vars;
        if (1 === arguments.length) return k[a];
        null == b
          ? delete k[a]
          : ((k[a] = b),
            (k[a + "Params"] =
              d(c) && -1 !== c.join("").indexOf("{self}")
                ? this._swapSelfInParams(c)
                : c),
            (k[a + "Scope"] = e));
        "onUpdate" === a && (this._onUpdate = b);
      }
      return this;
    };
    h.delay = function (a) {
      if (!arguments.length) return this._delay;
      this._timeline.smoothChildTiming &&
        this.startTime(this._startTime + a - this._delay);
      this._delay = a;
      return this;
    };
    h.duration = function (a) {
      if (!arguments.length) return (this._dirty = !1), this._duration;
      this._duration = this._totalDuration = a;
      this._uncache(!0);
      this._timeline.smoothChildTiming &&
        0 < this._time &&
        this._time < this._duration &&
        0 !== a &&
        this.totalTime((a / this._duration) * this._totalTime, !0);
      return this;
    };
    h.totalDuration = function (a) {
      this._dirty = !1;
      return arguments.length ? this.duration(a) : this._totalDuration;
    };
    h.time = function (a, b) {
      if (!arguments.length) return this._time;
      this._dirty && this.totalDuration();
      return this.totalTime(a > this._duration ? this._duration : a, b);
    };
    h.totalTime = function (a, b, c) {
      ia || H.wake();
      if (!arguments.length) return this._totalTime;
      if (this._timeline) {
        0 > a && !c && (a += this.totalDuration());
        if (this._timeline.smoothChildTiming) {
          this._dirty && this.totalDuration();
          var k = this._totalDuration,
            d = this._timeline;
          a > k && !c && (a = k);
          this._startTime =
            (this._paused ? this._pauseTime : d._time) -
            (this._reversed ? k - a : a) / this._timeScale;
          d._dirty || this._uncache(!1);
          if (d._timeline)
            for (; d._timeline; )
              d._timeline._time !==
                (d._startTime + d._totalTime) / d._timeScale &&
                d.totalTime(d._totalTime, !0),
                (d = d._timeline);
        }
        this._gc && this._enabled(!0, !1);
        if (this._totalTime !== a || 0 === this._duration)
          Qa.length && Oa(), this.render(a, b, !1), Qa.length && Oa();
      }
      return this;
    };
    h.progress = h.totalProgress = function (a, b) {
      var k = this.duration();
      return arguments.length
        ? this.totalTime(k * a, b)
        : k
        ? this._time / k
        : this.ratio;
    };
    h.startTime = function (a) {
      if (!arguments.length) return this._startTime;
      a !== this._startTime &&
        ((this._startTime = a),
        this.timeline &&
          this.timeline._sortChildren &&
          this.timeline.add(this, a - this._delay));
      return this;
    };
    h.endTime = function (a) {
      return (
        this._startTime +
        (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
      );
    };
    h.timeScale = function (a) {
      if (!arguments.length) return this._timeScale;
      a = a || 1e-10;
      if (this._timeline && this._timeline.smoothChildTiming) {
        var b = this._pauseTime;
        b = b || 0 === b ? b : this._timeline.totalTime();
        this._startTime = b - ((b - this._startTime) * this._timeScale) / a;
      }
      this._timeScale = a;
      return this._uncache(!1);
    };
    h.reversed = function (a) {
      if (!arguments.length) return this._reversed;
      a != this._reversed &&
        ((this._reversed = a),
        this.totalTime(
          this._timeline && !this._timeline.smoothChildTiming
            ? this.totalDuration() - this._totalTime
            : this._totalTime,
          !0
        ));
      return this;
    };
    h.paused = function (a) {
      if (!arguments.length) return this._paused;
      var b = this._timeline;
      if (a != this._paused && b) {
        ia || a || H.wake();
        var k = b.rawTime();
        var c = k - this._pauseTime;
        !a &&
          b.smoothChildTiming &&
          ((this._startTime += c), this._uncache(!1));
        this._pauseTime = a ? k : null;
        this._paused = a;
        this._active = this.isActive();
        !a &&
          0 !== c &&
          this._initted &&
          this.duration() &&
          ((k = b.smoothChildTiming
            ? this._totalTime
            : (k - this._startTime) / this._timeScale),
          this.render(k, k === this._totalTime, !0));
      }
      this._gc && !a && this._enabled(!0, !1);
      return this;
    };
    m = b("core.SimpleTimeline", function (a) {
      ja.call(this, 0, a);
      this.autoRemoveChildren = this.smoothChildTiming = !0;
    });
    h = m.prototype = new ja();
    h.constructor = m;
    h.kill()._gc = !1;
    h._first = h._last = h._recent = null;
    h._sortChildren = !1;
    h.add = h.insert = function (a, b, c, d) {
      a._startTime = Number(b || 0) + a._delay;
      a._paused &&
        this !== a._timeline &&
        (a._pauseTime =
          a._startTime + (this.rawTime() - a._startTime) / a._timeScale);
      a.timeline && a.timeline._remove(a, !0);
      a.timeline = a._timeline = this;
      a._gc && a._enabled(!0, !0);
      b = this._last;
      if (this._sortChildren)
        for (c = a._startTime; b && b._startTime > c; ) b = b._prev;
      b
        ? ((a._next = b._next), (b._next = a))
        : ((a._next = this._first), (this._first = a));
      a._next ? (a._next._prev = a) : (this._last = a);
      a._prev = b;
      this._recent = a;
      this._timeline && this._uncache(!0);
      return this;
    };
    h._remove = function (a, b) {
      a.timeline === this &&
        (b || a._enabled(!1, !0),
        a._prev
          ? (a._prev._next = a._next)
          : this._first === a && (this._first = a._next),
        a._next
          ? (a._next._prev = a._prev)
          : this._last === a && (this._last = a._prev),
        (a._next = a._prev = a.timeline = null),
        a === this._recent && (this._recent = this._last),
        this._timeline && this._uncache(!0));
      return this;
    };
    h.render = function (a, b, c) {
      var k = this._first;
      for (this._totalTime = this._time = this._rawPrevTime = a; k; ) {
        var d = k._next;
        if (k._active || (a >= k._startTime && !k._paused))
          k._reversed
            ? k.render(
                (k._dirty ? k.totalDuration() : k._totalDuration) -
                  (a - k._startTime) * k._timeScale,
                b,
                c
              )
            : k.render((a - k._startTime) * k._timeScale, b, c);
        k = d;
      }
    };
    h.rawTime = function () {
      ia || H.wake();
      return this._totalTime;
    };
    var A = b(
        "TweenLite",
        function (a, b, c) {
          ja.call(this, b, c);
          this.render = A.prototype.render;
          if (null == a) throw "Cannot tween a null target.";
          this.target = a = "string" !== typeof a ? a : A.selector(a) || a;
          var k =
            a.jquery ||
            (a.length &&
              a !== w &&
              a[0] &&
              (a[0] === w || (a[0].nodeType && a[0].style && !a.nodeType)));
          c = this.vars.overwrite;
          var e;
          this._overwrite = c =
            null == c
              ? ab[A.defaultOverwrite]
              : "number" === typeof c
              ? c >> 0
              : ab[c];
          if (
            (k || a instanceof Array || (a.push && d(a))) &&
            "number" !== typeof a[0]
          )
            for (
              this._targets = e = B(a),
                this._propLookup = [],
                this._siblings = [],
                a = 0;
              a < e.length;
              a++
            )
              (k = e[a])
                ? "string" === typeof k
                  ? ((k = e[a--] = A.selector(k)),
                    "string" === typeof k && e.splice(a + 1, 1))
                  : k.length &&
                    k !== w &&
                    k[0] &&
                    (k[0] === w || (k[0].nodeType && k[0].style && !k.nodeType))
                  ? (e.splice(a--, 1), (this._targets = e = e.concat(B(k))))
                  : ((this._siblings[a] = Da(k, this, !1)),
                    1 === c &&
                      1 < this._siblings[a].length &&
                      ua(k, this, null, 1, this._siblings[a]))
                : e.splice(a--, 1);
          else
            (this._propLookup = {}),
              (this._siblings = Da(a, this, !1)),
              1 === c &&
                1 < this._siblings.length &&
                ua(a, this, null, 1, this._siblings);
          if (
            this.vars.immediateRender ||
            (0 === b && 0 === this._delay && !1 !== this.vars.immediateRender)
          )
            (this._time = -1e-10), this.render(Math.min(0, -this._delay));
        },
        !0
      ),
      S = function (a) {
        return (
          a &&
          a.length &&
          a !== w &&
          a[0] &&
          (a[0] === w || (a[0].nodeType && a[0].style && !a.nodeType))
        );
      };
    h = A.prototype = new ja();
    h.constructor = A;
    h.kill()._gc = !1;
    h.ratio = 0;
    h._firstPT = h._targets = h._overwrittenProps = h._startAt = null;
    h._notifyPluginsOfEnabled = h._lazy = !1;
    A.version = "1.19.1";
    A.defaultEase = h._ease = new f(null, null, 1, 1);
    A.defaultOverwrite = "auto";
    A.ticker = H;
    A.autoSleep = 120;
    A.lagSmoothing = function (a, b) {
      H.lagSmoothing(a, b);
    };
    A.selector =
      w.$ ||
      w.jQuery ||
      function (a) {
        var b = w.$ || w.jQuery;
        return b
          ? ((A.selector = b), b(a))
          : "undefined" === typeof L
          ? a
          : L.querySelectorAll
          ? L.querySelectorAll(a)
          : L.getElementById("#" === a.charAt(0) ? a.substr(1) : a);
      };
    var Qa = [],
      da = {},
      na = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      Q = function (a) {
        for (var b = this._firstPT, c; b; ) {
          c = b.blob
            ? 1 === a
              ? this.end
              : a
              ? this.join("")
              : this.start
            : b.c * a + b.s;
          b.m
            ? (c = b.m(c, this._target || b.t))
            : 1e-6 > c && -1e-6 < c && !b.blob && (c = 0);
          if (b.f)
            if (b.fp) b.t[b.p](b.fp, c);
            else b.t[b.p](c);
          else b.t[b.p] = c;
          b = b._next;
        }
      },
      Ca = function (a, b, c, d) {
        var k = [],
          e = 0,
          h = "",
          f = 0;
        k.start = a;
        k.end = b;
        a = k[0] = a + "";
        b = k[1] = b + "";
        c && (c(k), (a = k[0]), (b = k[1]));
        k.length = 0;
        a = a.match(na) || [];
        c = b.match(na) || [];
        d && ((d._next = null), (d.blob = 1), (k._firstPT = k._applyPT = d));
        var m = c.length;
        for (d = 0; d < m; d++) {
          var p = c[d];
          var q = b.substr(e, b.indexOf(p, e) - e);
          h += q || !d ? q : ",";
          e += q.length;
          f ? (f = (f + 1) % 5) : "rgba(" === q.substr(-5) && (f = 1);
          p === a[d] || a.length <= d
            ? (h += p)
            : (h && (k.push(h), (h = "")),
              (q = parseFloat(a[d])),
              k.push(q),
              (k._firstPT = {
                _next: k._firstPT,
                t: k,
                p: k.length - 1,
                s: q,
                c:
                  ("\x3d" === p.charAt(1)
                    ? parseInt(p.charAt(0) + "1", 10) * parseFloat(p.substr(2))
                    : parseFloat(p) - q) || 0,
                f: 0,
                m: f && 4 > f ? Math.round : 0,
              }));
          e += p.length;
        }
        (h += b.substr(e)) && k.push(h);
        k.setRatio = Q;
        return k;
      },
      R = function (a, b, c, d, e, h, f, m, p) {
        "function" === typeof d && (d = d(p || 0, a));
        p = typeof a[b];
        var k =
          "function" !== p
            ? ""
            : b.indexOf("set") || "function" !== typeof a["get" + b.substr(3)]
            ? b
            : "get" + b.substr(3);
        c = "get" !== c ? c : k ? (f ? a[k](f) : a[k]()) : a[b];
        k = "string" === typeof d && "\x3d" === d.charAt(1);
        a = {
          t: a,
          p: b,
          s: c,
          f: "function" === p,
          pg: 0,
          n: e || b,
          m: h ? ("function" === typeof h ? h : Math.round) : 0,
          pr: 0,
          c: k
            ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2))
            : parseFloat(d) - c || 0,
        };
        if ("number" !== typeof c || ("number" !== typeof d && !k))
          f ||
          isNaN(c) ||
          (!k && isNaN(d)) ||
          "boolean" === typeof c ||
          "boolean" === typeof d
            ? ((a.fp = f),
              (d = Ca(c, k ? a.s + a.c : d, m || A.defaultStringFilter, a)),
              (a = {
                t: d,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: e || b,
                pr: 0,
                m: 0,
              }))
            : ((a.s = parseFloat(c)), k || (a.c = parseFloat(d) - a.s || 0));
        if (a.c) {
          if ((a._next = this._firstPT)) a._next._prev = a;
          return (this._firstPT = a);
        }
      };
    t = A._internals = {
      isArray: d,
      isSelector: S,
      lazyTweens: Qa,
      blobDif: Ca,
    };
    var X = (A._plugins = {}),
      Ra = (t.tweenLookup = {}),
      ea = 0,
      Ma = (t.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
      }),
      ab = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      },
      Na = (ja._rootFramesTimeline = new m()),
      oa = (ja._rootTimeline = new m()),
      xa = 30,
      Oa = (t.lazyRender = function () {
        var a = Qa.length,
          b;
        for (da = {}; -1 < --a; )
          (b = Qa[a]) &&
            !1 !== b._lazy &&
            (b.render(b._lazy[0], b._lazy[1], !0), (b._lazy = !1));
        Qa.length = 0;
      });
    oa._startTime = H.time;
    Na._startTime = H.frame;
    oa._active = Na._active = !0;
    setTimeout(Oa, 1);
    ja._updateRoot = A.render = function () {
      var a;
      Qa.length && Oa();
      oa.render((H.time - oa._startTime) * oa._timeScale, !1, !1);
      Na.render((H.frame - Na._startTime) * Na._timeScale, !1, !1);
      Qa.length && Oa();
      if (H.frame >= xa) {
        xa = H.frame + (parseInt(A.autoSleep, 10) || 120);
        for (c in Ra) {
          var b = Ra[c].tweens;
          for (a = b.length; -1 < --a; ) b[a]._gc && b.splice(a, 1);
          0 === b.length && delete Ra[c];
        }
        var c = oa._first;
        if (
          (!c || c._paused) &&
          A.autoSleep &&
          !Na._first &&
          1 === H._listeners.tick.length
        ) {
          for (; c && c._paused; ) c = c._next;
          c || H.sleep();
        }
      }
    };
    H.addEventListener("tick", ja._updateRoot);
    var Da = function (a, b, c) {
        var d = a._gsTweenID,
          k;
        Ra[d || (a._gsTweenID = d = "t" + ea++)] ||
          (Ra[d] = { target: a, tweens: [] });
        if (b && ((a = Ra[d].tweens), (a[(k = a.length)] = b), c))
          for (; -1 < --k; ) a[k] === b && a.splice(k, 1);
        return Ra[d].tweens;
      },
      ta = function (a, b, c, d) {
        var k = a.vars.onOverwrite,
          e,
          h;
        k && (e = k(a, b, c, d));
        (k = A.onOverwrite) && (h = k(a, b, c, d));
        return !1 !== e && !1 !== h;
      },
      ua = function (a, b, c, d, e) {
        var k, h, f;
        if (1 === d || 4 <= d) {
          c = e.length;
          for (k = 0; k < c; k++)
            if ((f = e[k]) !== b) f._gc || (f._kill(null, a, b) && (h = !0));
            else if (5 === d) break;
          return h;
        }
        var m = b._startTime + 1e-10,
          p = [],
          q = 0,
          r = 0 === b._duration;
        for (k = e.length; -1 < --k; )
          if ((f = e[k]) !== b && !f._gc && !f._paused)
            if (f._timeline !== b._timeline) {
              var I = I || Ga(b, 0, r);
              0 === Ga(f, I, r) && (p[q++] = f);
            } else
              f._startTime <= m &&
                f._startTime + f.totalDuration() / f._timeScale > m &&
                (((r || !f._initted) && 2e-10 >= m - f._startTime) ||
                  (p[q++] = f));
        for (k = q; -1 < --k; )
          (f = p[k]),
            2 === d && f._kill(c, a, b) && (h = !0),
            (2 !== d || (!f._firstPT && f._initted)) &&
              (2 === d || ta(f, b)) &&
              f._enabled(!1, !1) &&
              (h = !0);
        return h;
      },
      Ga = function (a, b, c) {
        for (
          var d = a._timeline, k = d._timeScale, e = a._startTime;
          d._timeline;

        ) {
          e += d._startTime;
          k *= d._timeScale;
          if (d._paused) return -100;
          d = d._timeline;
        }
        e /= k;
        return e > b
          ? e - b
          : (c && e === b) || (!a._initted && 2e-10 > e - b)
          ? 1e-10
          : (e += a.totalDuration() / a._timeScale / k) > b + 1e-10
          ? 0
          : e - b - 1e-10;
      };
    h._init = function () {
      var a = this.vars,
        b = this._overwrittenProps,
        d = this._duration,
        e = !!a.immediateRender,
        h = a.ease,
        m,
        p;
      if (a.startAt) {
        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill());
        var q = {};
        for (p in a.startAt) q[p] = a.startAt[p];
        q.overwrite = !1;
        q.immediateRender = !0;
        q.lazy = e && !1 !== a.lazy;
        q.startAt = q.delay = null;
        this._startAt = A.to(this.target, 0, q);
        if (e)
          if (0 < this._time) this._startAt = null;
          else if (0 !== d) return;
      } else if (a.runBackwards && 0 !== d)
        if (this._startAt)
          this._startAt.render(-1, !0),
            this._startAt.kill(),
            (this._startAt = null);
        else {
          0 !== this._time && (e = !1);
          d = {};
          for (p in a) (Ma[p] && "autoCSS" !== p) || (d[p] = a[p]);
          d.overwrite = 0;
          d.data = "isFromStart";
          d.lazy = e && !1 !== a.lazy;
          d.immediateRender = e;
          this._startAt = A.to(this.target, 0, d);
          if (!e)
            this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
          else if (0 === this._time) return;
        }
      this._ease = h = h
        ? h instanceof f
          ? h
          : "function" === typeof h
          ? new f(h, a.easeParams)
          : c[h] || A.defaultEase
        : A.defaultEase;
      a.easeParams instanceof Array &&
        h.config &&
        (this._ease = h.config.apply(h, a.easeParams));
      this._easeType = this._ease._type;
      this._easePower = this._ease._power;
      this._firstPT = null;
      if (this._targets)
        for (h = this._targets.length, e = 0; e < h; e++)
          this._initProps(
            this._targets[e],
            (this._propLookup[e] = {}),
            this._siblings[e],
            b ? b[e] : null,
            e
          ) && (m = !0);
      else
        m = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          b,
          0
        );
      m && A._onPluginEvent("_onInitAllProps", this);
      b &&
        (this._firstPT ||
          ("function" !== typeof this.target && this._enabled(!1, !1)));
      if (a.runBackwards)
        for (d = this._firstPT; d; ) (d.s += d.c), (d.c = -d.c), (d = d._next);
      this._onUpdate = a.onUpdate;
      this._initted = !0;
    };
    h._initProps = function (a, b, c, e, h) {
      var k, f;
      if (null == a) return !1;
      da[a._gsTweenID] && Oa();
      if (
        !this.vars.css &&
        a.style &&
        a !== w &&
        a.nodeType &&
        X.css &&
        !1 !== this.vars.autoCSS
      ) {
        var m = this.vars;
        var p = {};
        for (var q in m)
          Ma[q] ||
            (q in a &&
              "transform" !== q &&
              "x" !== q &&
              "y" !== q &&
              "width" !== q &&
              "height" !== q &&
              "className" !== q &&
              "border" !== q) ||
            !(!X[q] || (X[q] && X[q]._autoCSS)) ||
            ((p[q] = m[q]), delete m[q]);
        m.css = p;
      }
      for (k in this.vars)
        if (((m = this.vars[k]), Ma[k]))
          m &&
            (m instanceof Array || (m.push && d(m))) &&
            -1 !== m.join("").indexOf("{self}") &&
            (this.vars[k] = this._swapSelfInParams(m, this));
        else if (
          X[k] &&
          (f = new X[k]())._onInitTween(a, this.vars[k], this, h)
        ) {
          this._firstPT = p = {
            _next: this._firstPT,
            t: f,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 1,
            n: k,
            pg: 1,
            pr: f._priority,
            m: 0,
          };
          for (m = f._overwriteProps.length; -1 < --m; )
            b[f._overwriteProps[m]] = this._firstPT;
          if (f._priority || f._onInitAllProps) var r = !0;
          if (f._onDisable || f._onEnable) this._notifyPluginsOfEnabled = !0;
          p._next && (p._next._prev = p);
        } else
          b[k] = R.call(
            this,
            a,
            k,
            "get",
            m,
            k,
            0,
            null,
            this.vars.stringFilter,
            h
          );
      if (e && this._kill(e, a)) return this._initProps(a, b, c, e, h);
      if (
        1 < this._overwrite &&
        this._firstPT &&
        1 < c.length &&
        ua(a, this, b, this._overwrite, c)
      )
        return this._kill(b, a), this._initProps(a, b, c, e, h);
      this._firstPT &&
        ((!1 !== this.vars.lazy && this._duration) ||
          (this.vars.lazy && !this._duration)) &&
        (da[a._gsTweenID] = !0);
      return r;
    };
    h.render = function (a, b, c) {
      var d = this._time,
        k = this._duration,
        e = this._rawPrevTime,
        f;
      if (a >= k - 1e-7 && 0 <= a) {
        this._totalTime = this._time = k;
        this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
        if (!this._reversed) {
          var h = !0;
          var m = "onComplete";
          c = c || this._timeline.autoRemoveChildren;
        }
        0 !== k ||
          (!this._initted && this.vars.lazy && !c) ||
          (this._startTime === this._timeline._duration && (a = 0),
          (0 > e ||
            (0 >= a && -1e-7 <= a) ||
            (1e-10 === e && "isPause" !== this.data)) &&
            e !== a &&
            ((c = !0), 1e-10 < e && (m = "onReverseComplete")),
          (this._rawPrevTime = f = !b || a || e === a ? a : 1e-10));
      } else if (1e-7 > a) {
        this._totalTime = this._time = 0;
        this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
        if (0 !== d || (0 === k && 0 < e))
          (m = "onReverseComplete"), (h = this._reversed);
        0 > a &&
          ((this._active = !1),
          0 !== k ||
            (!this._initted && this.vars.lazy && !c) ||
            (0 <= e && (1e-10 !== e || "isPause" !== this.data) && (c = !0),
            (this._rawPrevTime = f = !b || a || e === a ? a : 1e-10)));
        this._initted || (c = !0);
      } else if (((this._totalTime = this._time = a), this._easeType)) {
        var p = a / k,
          q = this._easeType,
          r = this._easePower;
        if (1 === q || (3 === q && 0.5 <= p)) p = 1 - p;
        3 === q && (p *= 2);
        1 === r
          ? (p *= p)
          : 2 === r
          ? (p *= p * p)
          : 3 === r
          ? (p *= p * p * p)
          : 4 === r && (p *= p * p * p * p);
        this.ratio =
          1 === q ? 1 - p : 2 === q ? p : 0.5 > a / k ? p / 2 : 1 - p / 2;
      } else this.ratio = this._ease.getRatio(a / k);
      if (this._time !== d || c) {
        if (!this._initted) {
          this._init();
          if (!this._initted || this._gc) return;
          if (
            !c &&
            this._firstPT &&
            ((!1 !== this.vars.lazy && this._duration) ||
              (this.vars.lazy && !this._duration))
          ) {
            this._time = this._totalTime = d;
            this._rawPrevTime = e;
            Qa.push(this);
            this._lazy = [a, b];
            return;
          }
          this._time && !h
            ? (this.ratio = this._ease.getRatio(this._time / k))
            : h &&
              this._ease._calcEnd &&
              (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
        }
        !1 !== this._lazy && (this._lazy = !1);
        !this._active &&
          !this._paused &&
          this._time !== d &&
          0 <= a &&
          (this._active = !0);
        0 === d &&
          (this._startAt &&
            (0 <= a ? this._startAt.render(a, b, c) : m || (m = "_dummyGS")),
          !this.vars.onStart ||
            (0 === this._time && 0 !== k) ||
            b ||
            this._callback("onStart"));
        for (e = this._firstPT; e; ) {
          if (e.f) e.t[e.p](e.c * this.ratio + e.s);
          else e.t[e.p] = e.c * this.ratio + e.s;
          e = e._next;
        }
        this._onUpdate &&
          (0 > a &&
            this._startAt &&
            -1e-4 !== a &&
            this._startAt.render(a, b, c),
          b || ((this._time !== d || h || c) && this._callback("onUpdate")));
        !m ||
          (this._gc && !c) ||
          (0 > a &&
            this._startAt &&
            !this._onUpdate &&
            -1e-4 !== a &&
            this._startAt.render(a, b, c),
          h &&
            (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            (this._active = !1)),
          !b && this.vars[m] && this._callback(m),
          0 === k &&
            1e-10 === this._rawPrevTime &&
            1e-10 !== f &&
            (this._rawPrevTime = 0));
      }
    };
    h._kill = function (a, b, c) {
      "all" === a && (a = null);
      if (null == a && (null == b || b === this.target))
        return (this._lazy = !1), this._enabled(!1, !1);
      b =
        "string" !== typeof b
          ? b || this._targets || this.target
          : A.selector(b) || b;
      var e =
          c &&
          this._time &&
          c._startTime === this._startTime &&
          this._timeline === c._timeline,
        k,
        f,
        h,
        m;
      if ((d(b) || S(b)) && "number" !== typeof b[0])
        for (k = b.length; -1 < --k; ) this._kill(a, b[k], c) && (h = !0);
      else {
        if (this._targets)
          for (k = this._targets.length; -1 < --k; ) {
            if (b === this._targets[k]) {
              var p = this._propLookup[k] || {};
              this._overwrittenProps = this._overwrittenProps || [];
              var q = (this._overwrittenProps[k] = a
                ? this._overwrittenProps[k] || {}
                : "all");
              break;
            }
          }
        else {
          if (b !== this.target) return !1;
          p = this._propLookup;
          q = this._overwrittenProps = a ? this._overwrittenProps || {} : "all";
        }
        if (p) {
          k = a || p;
          var r =
            a !== q &&
            "all" !== q &&
            a !== p &&
            ("object" !== typeof a || !a._tempKill);
          if (c && (A.onOverwrite || this.vars.onOverwrite)) {
            for (f in k) p[f] && (m || (m = []), m.push(f));
            if ((m || !a) && !ta(this, c, b, m)) return !1;
          }
          for (f in k) {
            if ((a = p[f])) {
              if (e) {
                if (a.f) a.t[a.p](a.s);
                else a.t[a.p] = a.s;
                h = !0;
              }
              a.pg && a.t._kill(k) && (h = !0);
              (a.pg && 0 !== a.t._overwriteProps.length) ||
                (a._prev
                  ? (a._prev._next = a._next)
                  : a === this._firstPT && (this._firstPT = a._next),
                a._next && (a._next._prev = a._prev),
                (a._next = a._prev = null));
              delete p[f];
            }
            r && (q[f] = 1);
          }
          !this._firstPT && this._initted && this._enabled(!1, !1);
        }
      }
      return h;
    };
    h.invalidate = function () {
      this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this);
      this._firstPT =
        this._overwrittenProps =
        this._startAt =
        this._onUpdate =
          null;
      this._notifyPluginsOfEnabled = this._active = this._lazy = !1;
      this._propLookup = this._targets ? {} : [];
      ja.prototype.invalidate.call(this);
      this.vars.immediateRender &&
        ((this._time = -1e-10), this.render(Math.min(0, -this._delay)));
      return this;
    };
    h._enabled = function (a, b) {
      ia || H.wake();
      if (a && this._gc) {
        var c = this._targets,
          d;
        if (c)
          for (d = c.length; -1 < --d; ) this._siblings[d] = Da(c[d], this, !0);
        else this._siblings = Da(this.target, this, !0);
      }
      ja.prototype._enabled.call(this, a, b);
      return this._notifyPluginsOfEnabled && this._firstPT
        ? A._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
        : !1;
    };
    A.to = function (a, b, c) {
      return new A(a, b, c);
    };
    A.from = function (a, b, c) {
      c.runBackwards = !0;
      c.immediateRender = 0 != c.immediateRender;
      return new A(a, b, c);
    };
    A.fromTo = function (a, b, c, d) {
      d.startAt = c;
      d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender;
      return new A(a, b, d);
    };
    A.delayedCall = function (a, b, c, d, e) {
      return new A(b, 0, {
        delay: a,
        onComplete: b,
        onCompleteParams: c,
        callbackScope: d,
        onReverseComplete: b,
        onReverseCompleteParams: c,
        immediateRender: !1,
        lazy: !1,
        useFrames: e,
        overwrite: 0,
      });
    };
    A.set = function (a, b) {
      return new A(a, 0, b);
    };
    A.getTweensOf = function (a, b) {
      if (null == a) return [];
      a = "string" !== typeof a ? a : A.selector(a) || a;
      var c;
      if ((d(a) || S(a)) && "number" !== typeof a[0]) {
        var e = a.length;
        for (c = []; -1 < --e; ) c = c.concat(A.getTweensOf(a[e], b));
        for (e = c.length; -1 < --e; )
          for (b = c[e], a = e; -1 < --a; ) b === c[a] && c.splice(e, 1);
      } else
        for (c = Da(a).concat(), e = c.length; -1 < --e; )
          (c[e]._gc || (b && !c[e].isActive())) && c.splice(e, 1);
      return c;
    };
    A.killTweensOf = A.killDelayedCallsTo = function (a, b, c) {
      "object" === typeof b && ((c = b), (b = !1));
      b = A.getTweensOf(a, b);
      for (var d = b.length; -1 < --d; ) b[d]._kill(c, a);
    };
    var aa = b(
      "plugins.TweenPlugin",
      function (a, b) {
        this._overwriteProps = (a || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = b || 0;
        this._super = aa.prototype;
      },
      !0
    );
    h = aa.prototype;
    aa.version = "1.19.0";
    aa.API = 2;
    h._firstPT = null;
    h._addTween = R;
    h.setRatio = Q;
    h._kill = function (a) {
      var b = this._overwriteProps,
        c = this._firstPT,
        d;
      if (null != a[this._propName]) this._overwriteProps = [];
      else for (d = b.length; -1 < --d; ) null != a[b[d]] && b.splice(d, 1);
      for (; c; )
        null != a[c.n] &&
          (c._next && (c._next._prev = c._prev),
          c._prev
            ? ((c._prev._next = c._next), (c._prev = null))
            : this._firstPT === c && (this._firstPT = c._next)),
          (c = c._next);
      return !1;
    };
    h._mod = h._roundProps = function (a) {
      for (var b = this._firstPT, c; b; )
        (c =
          a[this._propName] ||
          (null != b.n && a[b.n.split(this._propName + "_").join("")])) &&
          "function" === typeof c &&
          (2 === b.f ? (b.t._applyPT.m = c) : (b.m = c)),
          (b = b._next);
    };
    A._onPluginEvent = function (a, b) {
      var c = b._firstPT,
        d,
        e,
        f,
        h;
      if ("_onInitAllProps" === a) {
        for (; c; ) {
          var k = c._next;
          for (e = f; e && e.pr > c.pr; ) e = e._next;
          (c._prev = e ? e._prev : h) ? (c._prev._next = c) : (f = c);
          (c._next = e) ? (e._prev = c) : (h = c);
          c = k;
        }
        c = b._firstPT = f;
      }
      for (; c; )
        c.pg && "function" === typeof c.t[a] && c.t[a]() && (d = !0),
          (c = c._next);
      return d;
    };
    aa.activate = function (a) {
      for (var b = a.length; -1 < --b; )
        a[b].API === aa.API && (X[new a[b]()._propName] = a[b]);
      return !0;
    };
    C.plugin = function (a) {
      if (!(a && a.propName && a.init && a.API))
        throw "illegal plugin definition.";
      var c = a.propName,
        d = a.priority || 0,
        e = a.overwriteProps,
        f = {
          init: "_onInitTween",
          set: "setRatio",
          kill: "_kill",
          round: "_mod",
          mod: "_mod",
          initAll: "_onInitAllProps",
        },
        h = b(
          "plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin",
          function () {
            aa.call(this, c, d);
            this._overwriteProps = e || [];
          },
          !0 === a.global
        ),
        k = (h.prototype = new aa(c)),
        m;
      k.constructor = h;
      h.API = a.API;
      for (m in f) "function" === typeof a[m] && (k[f[m]] = a[m]);
      h.version = a.version;
      aa.activate([h]);
      return h;
    };
    if ((m = w._gsQueue)) {
      for (t = 0; t < m.length; t++) m[t]();
      for (h in r)
        r[h].func || w.console.log("GSAP encountered missing dependency: " + h);
    }
    var ia = !1;
  }
})(
  "undefined" !== typeof module &&
    module.exports &&
    "undefined" !== typeof global
    ? global
    : this || window,
  "TweenMax"
);
_gsScope =
  "undefined" !== typeof module &&
  module.exports &&
  "undefined" !== typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  _gsScope._gsDefine(
    "utils.Draggable",
    ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"],
    function (w, z, e) {
      var L = { css: {} },
        q = { css: {} },
        x = { css: {} },
        J = { css: {} },
        B = _gsScope._gsDefine.globals,
        F = {},
        d = { style: {} },
        t = _gsScope.document || {
          createElement: function () {
            return d;
          },
        },
        r = t.documentElement || {},
        N = function (a) {
          return t.createElementNS
            ? t.createElementNS("http://www.w3.org/1999/xhtml", a)
            : t.createElement(a);
        },
        C = N("div"),
        b = [],
        a = function () {
          return !1;
        },
        f = 180 / Math.PI,
        c =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        p = !(t.addEventListener || !t.all),
        h = t.createElement("div"),
        m = [],
        u = {},
        K = 0,
        ha = /^(?:a|input|textarea|button|select)$/i,
        y = 0,
        U,
        ja,
        H = -1 !== navigator.userAgent.toLowerCase().indexOf("android"),
        sa = 0,
        A = {},
        S = {},
        Qa = function (a) {
          "string" === typeof a && (a = z.selector(a));
          if (!a || a.nodeType) return [a];
          var b = [],
            c = a.length,
            n;
          for (n = 0; n !== c; b.push(a[n++]));
          return b;
        },
        da = function (a, b) {
          var c = {},
            n;
          if (b) for (n in a) c[n] = a[n] * b;
          else for (n in a) c[n] = a[n];
          return c;
        },
        na,
        Q = function () {
          for (var a = m.length; -1 < --a; ) m[a]();
        },
        Ca = function (a) {
          m.push(a);
          1 === m.length && z.ticker.addEventListener("tick", Q, this, !1, 1);
        },
        R = function (a) {
          for (var b = m.length; -1 < --b; ) m[b] === a && m.splice(b, 1);
          z.to(X, 0, { overwrite: "all", delay: 15, onComplete: X });
        },
        X = function () {
          m.length || z.ticker.removeEventListener("tick", Q);
        },
        Ra = function (a, b) {
          for (var c in b) void 0 === a[c] && (a[c] = b[c]);
          return a;
        },
        ea = function () {
          return null != window.pageYOffset
            ? window.pageYOffset
            : null != t.scrollTop
            ? t.scrollTop
            : r.scrollTop || t.body.scrollTop || 0;
        },
        Ma = function () {
          return null != window.pageXOffset
            ? window.pageXOffset
            : null != t.scrollLeft
            ? t.scrollLeft
            : r.scrollLeft || t.body.scrollLeft || 0;
        },
        ab = function (a, b) {
          Ea(a, "scroll", b);
          oa(a.parentNode) || ab(a.parentNode, b);
        },
        Na = function (a, b) {
          ka(a, "scroll", b);
          oa(a.parentNode) || Na(a.parentNode, b);
        },
        oa = function (a) {
          return !(
            a &&
            a !== r &&
            a !== t &&
            a !== t.body &&
            a !== window &&
            a.nodeType &&
            a.parentNode
          );
        },
        xa = function (a, b) {
          b = "x" === b ? "Width" : "Height";
          var c = "scroll" + b,
            n = "client" + b,
            d = t.body;
          return Math.max(
            0,
            oa(a)
              ? Math.max(r[c], d[c]) - (window["inner" + b] || r[n] || d[n])
              : a[c] - a[n]
          );
        },
        Oa = function (a) {
          var b = oa(a),
            c = xa(a, "x"),
            n = xa(a, "y");
          b ? (a = S) : Oa(a.parentNode);
          a._gsMaxScrollX = c;
          a._gsMaxScrollY = n;
          a._gsScrollX = a.scrollLeft || 0;
          a._gsScrollY = a.scrollTop || 0;
        },
        Da = function (a, b) {
          a = a || window.event;
          F.pageX = a.clientX + t.body.scrollLeft + r.scrollLeft;
          F.pageY = a.clientY + t.body.scrollTop + r.scrollTop;
          b && (a.returnValue = !1);
          return F;
        },
        ta = function (a) {
          if (!a) return a;
          "string" === typeof a && (a = z.selector(a));
          a.length &&
            a !== window &&
            a[0] &&
            a[0].style &&
            !a.nodeType &&
            (a = a[0]);
          return a === window || (a.nodeType && a.style) ? a : null;
        },
        ua = function (a, b) {
          a = a.style;
          if (void 0 === a[b]) {
            var c = ["O", "Moz", "ms", "Ms", "Webkit"];
            var d = 5;
            for (
              b = b.charAt(0).toUpperCase() + b.substr(1);
              -1 < --d && void 0 === a[c[d] + b];

            );
            if (0 > d) return "";
            U = 3 === d ? "ms" : c[d];
            b = U + b;
          }
          return b;
        },
        Ga = function (a, b, c) {
          var d = a.style;
          d &&
            (void 0 === d[b] && (b = ua(a, b)),
            null == c
              ? d.removeProperty
                ? d.removeProperty(b.replace(/([A-Z])/g, "-$1").toLowerCase())
                : d.removeAttribute(b)
              : void 0 !== d[b] && (d[b] = c));
        },
        aa = t.defaultView ? t.defaultView.getComputedStyle : a,
        ia = /(?:Left|Right|Width)/i,
        k = /(?:\d|\-|\+|=|#|\.)*/g,
        G = function (a, b, c, d, l) {
          if ("px" === d || !d) return c;
          if ("auto" === d || !c) return 0;
          var n = ia.test(b),
            e = a,
            f = C.style,
            h = 0 > c;
          h && (c = -c);
          "%" === d && -1 !== b.indexOf("border")
            ? (n = (c / 100) * (n ? a.clientWidth : a.clientHeight))
            : ((f.cssText =
                "border:0 solid red;position:" +
                I(a, "position", !0) +
                ";line-height:0;"),
              "%" !== d && e.appendChild
                ? (f[n ? "borderLeftWidth" : "borderTopWidth"] = c + d)
                : ((e = a.parentNode || t.body),
                  (f[n ? "width" : "height"] = c + d)),
              e.appendChild(C),
              (n = parseFloat(C[n ? "offsetWidth" : "offsetHeight"])),
              e.removeChild(C),
              0 !== n || l || (n = G(a, b, c, d, !0)));
          return h ? -n : n;
        },
        I = function (a, b, c) {
          var d = (a._gsTransform || {})[b],
            n;
          if (d || 0 === d) return d;
          a.style[b]
            ? (d = a.style[b])
            : (n = aa(a))
            ? (d =
                (d = n.getPropertyValue(
                  b.replace(/([A-Z])/g, "-$1").toLowerCase()
                )) || n.length
                  ? d
                  : n[b])
            : a.currentStyle && (d = a.currentStyle[b]);
          "auto" !== d ||
            ("top" !== b && "left" !== b) ||
            ("absolute" !== I(a, "position", !0)
              ? (d = 0)
              : ((d = "left" === b ? "Left" : "Top"),
                (n = I(a, "margin" + d, !0)),
                (d =
                  a["offset" + d] -
                  (G(a, b, parseFloat(n), (n + "").replace(k, "")) || 0))));
          return c ? d : parseFloat(d) || 0;
        },
        D = function (a, b, c) {
          var d = a.vars,
            n = d[c],
            e = a._listeners[b];
          "function" === typeof n &&
            n.apply(
              d[c + "Scope"] || d.callbackScope || a,
              d[c + "Params"] || [a.pointerEvent]
            );
          e && a.dispatchEvent(b);
        },
        P = function (a, b) {
          var c = ta(a);
          if (!c) {
            if (void 0 !== a.left)
              return (
                (b = Sa(b)),
                {
                  left: a.left - b.x,
                  top: a.top - b.y,
                  width: a.width,
                  height: a.height,
                }
              );
            c = a.min || a.minX || a.minRotation || 0;
            b = a.min || a.minY || 0;
            return {
              left: c,
              top: b,
              width: (a.max || a.maxX || a.maxRotation || 0) - c,
              height: (a.max || a.maxY || 0) - b,
            };
          }
          return hb(c, b);
        },
        Ua,
        bb,
        Ba,
        ya,
        fa,
        Ha = function () {
          if (t.createElementNS) {
            var a = N("div"),
              b = t.createElementNS("http://www.w3.org/2000/svg", "svg"),
              c = N("div"),
              d = a.style,
              l = t.body || r;
            if (t.body && la) {
              d.position = "absolute";
              l.appendChild(c);
              c.appendChild(a);
              var e = a.offsetParent;
              c.style[la] = "rotate(1deg)";
              fa = a.offsetParent === e;
              c.style.position = "absolute";
              d.height = "10px";
              e = a.offsetTop;
              c.style.border = "5px solid red";
              ya = e !== a.offsetTop;
              l.removeChild(c);
            }
            d = b.style;
            b.setAttributeNS(null, "width", "400px");
            b.setAttributeNS(null, "height", "400px");
            b.setAttributeNS(null, "viewBox", "0 0 400 400");
            d.display = "block";
            d.boxSizing = "border-box";
            d.border = "0px solid red";
            d.transform = "none";
            a.style.cssText =
              "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;";
            l.appendChild(a);
            a.appendChild(b);
            e = b.createSVGPoint().matrixTransform(b.getScreenCTM());
            c = e.y;
            a.scrollTop = 100;
            e.x = e.y = 0;
            e = e.matrixTransform(b.getScreenCTM());
            Ba = 100.1 > c - e.y ? 0 : c - e.y - 150;
            a.removeChild(b);
            l.removeChild(a);
            l.appendChild(b);
            a = b.getScreenCTM();
            c = a.e;
            d.border = "50px solid red";
            a = b.getScreenCTM();
            0 === c && 0 === a.e && 0 === a.f && 1 === a.a
              ? ((Ua = 1), (bb = !0))
              : ((Ua = c !== a.e ? 1 : 0), (bb = 1 !== a.a));
            l.removeChild(b);
          } else (Ua = 0), (bb = !1);
        },
        Xa = "" !== ua(C, "perspective"),
        Ya = ua(C, "transformOrigin")
          .replace(/^ms/g, "Ms")
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase(),
        la = ua(C, "transform"),
        jb = la
          .replace(/^ms/g, "Ms")
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase(),
        pa = {},
        mb = {},
        pb = window.SVGElement,
        ib = function (a) {
          return !!(
            pb &&
            "function" === typeof a.getBBox &&
            a.getCTM &&
            (!a.parentNode || (a.parentNode.getBBox && a.parentNode.getCTM))
          );
        },
        Y =
          (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) ||
            /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) &&
          11 > parseFloat(RegExp.$1),
        Va = [],
        Ka = [],
        ca = function (a) {
          if (!a.getBoundingClientRect || !a.parentNode || !la)
            return {
              offsetTop: 0,
              offsetLeft: 0,
              scaleX: 1,
              scaleY: 1,
              offsetParent: r,
            };
          if (
            !1 !== Fa.cacheSVGData &&
            a._dCache &&
            a._dCache.lastUpdate === z.ticker.frame
          )
            return a._dCache;
          var b = a,
            c = Z(a);
          c.lastUpdate = z.ticker.frame;
          if (a.getBBox && !c.isSVGRoot) {
            b = a.parentNode;
            for (
              a = a.getBBox();
              b && "svg" !== (b.nodeName + "").toLowerCase();

            )
              b = b.parentNode;
            var d = ca(b);
            c.offsetTop = a.y * d.scaleY;
            c.offsetLeft = a.x * d.scaleX;
            c.scaleX = d.scaleX;
            c.scaleY = d.scaleY;
            c.offsetParent = b || r;
            return c;
          }
          var n = c.offsetParent;
          n === t.body && (n = r);
          for (Ka.length = Va.length = 0; b; ) {
            d = I(b, la, !0);
            "matrix(1, 0, 0, 1, 0, 0)" !== d &&
              "none" !== d &&
              "translate3d(0px, 0px, 0px)" !== d &&
              (Ka.push(b), Va.push(b.style[la]), (b.style[la] = "none"));
            if (b === n) break;
            b = b.parentNode;
          }
          b = n.getBoundingClientRect();
          d = a.getScreenCTM();
          var e = a.createSVGPoint();
          var f = e.matrixTransform(d);
          e.x = e.y = 10;
          e = e.matrixTransform(d);
          c.scaleX = (e.x - f.x) / 10;
          c.scaleY = (e.y - f.y) / 10;
          void 0 === Ua && Ha();
          if (c.borderBox && !bb && a.getAttribute("width")) {
            d = aa(a) || {};
            e =
              parseFloat(d.borderLeftWidth) + parseFloat(d.borderRightWidth) ||
              0;
            var h =
              parseFloat(d.borderTopWidth) + parseFloat(d.borderBottomWidth) ||
              0;
            var k = parseFloat(d.width) || 0;
            d = parseFloat(d.height) || 0;
            c.scaleX *= (k - e) / k;
            c.scaleY *= (d - h) / d;
          }
          Ba
            ? ((a = a.getBoundingClientRect()),
              (c.offsetLeft = a.left - b.left),
              (c.offsetTop = a.top - b.top))
            : ((c.offsetLeft = f.x - b.left), (c.offsetTop = f.y - b.top));
          c.offsetParent = n;
          for (n = Ka.length; -1 < --n; ) Ka[n].style[la] = Va[n];
          return c;
        },
        Sa = function (a, b) {
          b = b || {};
          if (!a || a === r || !a.parentNode || a === window)
            return { x: 0, y: 0 };
          var c = aa(a),
            d = Ya && c ? c.getPropertyValue(Ya) : "50% 50%",
            e = d.split(" ");
          c =
            -1 !== d.indexOf("left")
              ? "0%"
              : -1 !== d.indexOf("right")
              ? "100%"
              : e[0];
          d =
            -1 !== d.indexOf("top")
              ? "0%"
              : -1 !== d.indexOf("bottom")
              ? "100%"
              : e[1];
          if ("center" === d || null == d) d = "50%";
          if ("center" === c || isNaN(parseFloat(c))) c = "50%";
          a.getBBox && ib(a)
            ? (a._gsTransform ||
                (z.set(a, { x: "+\x3d0", overwrite: !1 }),
                void 0 === a._gsTransform.xOrigin &&
                  console.log("Draggable requires at least GSAP 1.17.0")),
              (d = a.getBBox()),
              (b.x = a._gsTransform.xOrigin - d.x),
              (b.y = a._gsTransform.yOrigin - d.y))
            : (a.getBBox &&
                -1 !== (c + d).indexOf("%") &&
                ((a = a.getBBox()),
                (a = { offsetWidth: a.width, offsetHeight: a.height })),
              (b.x =
                -1 !== c.indexOf("%")
                  ? (a.offsetWidth * parseFloat(c)) / 100
                  : parseFloat(c)),
              (b.y =
                -1 !== d.indexOf("%")
                  ? (a.offsetHeight * parseFloat(d)) / 100
                  : parseFloat(d)));
          return b;
        },
        Z = function (a) {
          if (
            !1 !== Fa.cacheSVGData &&
            a._dCache &&
            a._dCache.lastUpdate === z.ticker.frame
          )
            return a._dCache;
          var b = (a._dCache = a._dCache || {}),
            c = aa(a),
            d = a.getBBox && ib(a),
            e = "svg" === (a.nodeName + "").toLowerCase();
          b.isSVG = d;
          b.isSVGRoot = e;
          b.borderBox = "border-box" === c.boxSizing;
          b.computedStyle = c;
          if (e)
            (c = a.parentNode || r),
              c.insertBefore(C, a),
              (b.offsetParent = C.offsetParent || r),
              c.removeChild(C);
          else if (d) {
            for (
              c = a.parentNode;
              c && "svg" !== (c.nodeName + "").toLowerCase();

            )
              c = c.parentNode;
            b.offsetParent = c;
          } else b.offsetParent = a.offsetParent;
          return b;
        },
        Za = function (a, b, c, d) {
          if (a === window || !a || !a.style || !a.parentNode)
            return [1, 0, 0, 1, 0, 0];
          var e = a._dCache || Z(a),
            n = a.parentNode,
            f = n._dCache || Z(n),
            h = e.computedStyle,
            k = e.isSVG ? f.offsetParent : n.offsetParent,
            m;
          var g =
            e.isSVG && -1 !== (a.style[la] + "").indexOf("matrix")
              ? a.style[la]
              : h
              ? h.getPropertyValue(jb)
              : a.currentStyle
              ? a.currentStyle[la]
              : "1,0,0,1,0,0";
          a.getBBox &&
            -1 !== (a.getAttribute("transform") + "").indexOf("matrix") &&
            (g = a.getAttribute("transform"));
          g = (g + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1, 0, 0, 1, 0, 0];
          6 < g.length && (g = [g[0], g[1], g[4], g[5], g[12], g[13]]);
          d
            ? (g[4] = g[5] = 0)
            : e.isSVG &&
              (m = a._gsTransform) &&
              (m.xOrigin || m.yOrigin) &&
              ((g[0] = parseFloat(g[0])),
              (g[1] = parseFloat(g[1])),
              (g[2] = parseFloat(g[2])),
              (g[3] = parseFloat(g[3])),
              (g[4] =
                parseFloat(g[4]) -
                (m.xOrigin - (m.xOrigin * g[0] + m.yOrigin * g[2]))),
              (g[5] =
                parseFloat(g[5]) -
                (m.yOrigin - (m.xOrigin * g[1] + m.yOrigin * g[3]))));
          if (b) {
            void 0 === Ua && Ha();
            d = e.isSVG || e.isSVGRoot ? ca(a) : a;
            if (e.isSVG)
              (d = a.getBBox()),
                (m = f.isSVGRoot ? { x: 0, y: 0 } : n.getBBox()),
                (d = {
                  offsetLeft: d.x - m.x,
                  offsetTop: d.y - m.y,
                  offsetParent: e.offsetParent,
                });
            else if (e.isSVGRoot) {
              var p = parseInt(h.borderTopWidth, 10) || 0;
              var q = parseInt(h.borderLeftWidth, 10) || 0;
              m = (g[0] - Ua) * q + g[2] * p;
              q = g[1] * q + (g[3] - Ua) * p;
              var E = b.x;
              var y = b.y;
              p = E - (E * g[0] + y * g[2]);
              E = y - (E * g[1] + y * g[3]);
              g[4] = parseFloat(g[4]) + p;
              g[5] = parseFloat(g[5]) + E;
              b.x -= p;
              b.y -= E;
              E = d.scaleX;
              y = d.scaleY;
              b.x *= E;
              b.y *= y;
              g[0] *= E;
              g[1] *= y;
              g[2] *= E;
              g[3] *= y;
              Y || ((b.x += m), (b.y += q));
            } else
              !ya &&
                a.offsetParent &&
                ((b.x +=
                  parseInt(I(a.offsetParent, "borderLeftWidth"), 10) || 0),
                (b.y +=
                  parseInt(I(a.offsetParent, "borderTopWidth"), 10) || 0));
            m = n === r || n === t.body;
            g[4] =
              Number(g[4]) +
              b.x +
              (d.offsetLeft || 0) -
              c.x -
              (m ? 0 : n.scrollLeft || 0);
            g[5] =
              Number(g[5]) +
              b.y +
              (d.offsetTop || 0) -
              c.y -
              (m ? 0 : n.scrollTop || 0);
            n &&
              "fixed" === I(a, "position", h) &&
              ((g[4] += Ma()), (g[5] += ea()));
            !n ||
              n === r ||
              k !== d.offsetParent ||
              f.isSVG ||
              (fa && "100100" !== Za(n).join("")) ||
              ((d = f.isSVGRoot ? ca(n) : n),
              (g[4] -= d.offsetLeft || 0),
              (g[5] -= d.offsetTop || 0),
              ya ||
                !f.offsetParent ||
                e.isSVG ||
                e.isSVGRoot ||
                ((g[4] -=
                  parseInt(I(f.offsetParent, "borderLeftWidth"), 10) || 0),
                (g[5] -=
                  parseInt(I(f.offsetParent, "borderTopWidth"), 10) || 0)));
          }
          return g;
        },
        qb = function (a, b) {
          if (!a || a === window || !a.parentNode) return [1, 0, 0, 1, 0, 0];
          for (
            var c = Sa(a, pa),
              d = Sa(a.parentNode, mb),
              e = Za(a, c, d),
              n,
              f,
              h,
              k,
              m,
              g;
            (a = a.parentNode) && a.parentNode && a !== r;

          )
            (c = d),
              (d = Sa(a.parentNode, c === pa ? mb : pa)),
              (g = Za(a, c, d)),
              (c = e[0]),
              (n = e[1]),
              (f = e[2]),
              (h = e[3]),
              (k = e[4]),
              (m = e[5]),
              (e[0] = c * g[0] + n * g[2]),
              (e[1] = c * g[1] + n * g[3]),
              (e[2] = f * g[0] + h * g[2]),
              (e[3] = f * g[1] + h * g[3]),
              (e[4] = k * g[0] + m * g[2] + g[4]),
              (e[5] = k * g[1] + m * g[3] + g[5]);
          b &&
            ((c = e[0]),
            (n = e[1]),
            (f = e[2]),
            (h = e[3]),
            (k = e[4]),
            (m = e[5]),
            (a = c * h - n * f),
            (e[0] = h / a),
            (e[1] = -n / a),
            (e[2] = -f / a),
            (e[3] = c / a),
            (e[4] = (f * m - h * k) / a),
            (e[5] = -(c * m - n * k) / a));
          return e;
        },
        ba = function (a, b, c) {
          var d = a.x * b[0] + a.y * b[2] + b[4];
          b = a.x * b[1] + a.y * b[3] + b[5];
          a.x = d * c[0] + b * c[2] + c[4];
          a.y = d * c[1] + b * c[3] + c[5];
          return a;
        },
        hb = function (a, b, c) {
          if (!(a = ta(a))) return null;
          b = ta(b);
          var d = a.getBBox && ib(a);
          if (a === window) {
            var e = ea();
            var f = Ma();
            var h =
              f + (r.clientWidth || a.innerWidth || t.body.clientWidth || 0);
            d =
              e +
              ((a.innerHeight || 0) - 20 < r.clientHeight
                ? r.clientHeight
                : a.innerHeight || t.body.clientHeight || 0);
          } else {
            if (void 0 === b || b === window) return a.getBoundingClientRect();
            e = Sa(a);
            f = -e.x;
            e = -e.y;
            if (d) {
              d = a.getBBox();
              var n = d.width;
              var k = d.height;
            } else if (
              "svg" !== (a.nodeName + "").toLowerCase() &&
              a.offsetWidth
            )
              (n = a.offsetWidth), (k = a.offsetHeight);
            else {
              var m = aa(a);
              n = parseFloat(m.width);
              k = parseFloat(m.height);
            }
            h = f + n;
            d = e + k;
            if ("svg" === a.nodeName.toLowerCase() && !p) {
              var g = ca(a);
              var q = g.computedStyle || {};
              var E = (a.getAttribute("viewBox") || "0 0").split(" ");
              var y = parseFloat(E[0]);
              var u = parseFloat(E[1]);
              E = parseFloat(q.borderLeftWidth) || 0;
              var w = parseFloat(q.borderTopWidth) || 0;
              h -= n - (n - E) / g.scaleX - y;
              d -= k - (k - w) / g.scaleY - u;
              f -= E / g.scaleX - y;
              e -= w / g.scaleY - u;
              m &&
                ((h += (parseFloat(q.borderRightWidth) + E) / g.scaleX),
                (d += (w + parseFloat(q.borderBottomWidth)) / g.scaleY));
            }
          }
          if (a === b) return { left: f, top: e, width: h - f, height: d - e };
          n = qb(a);
          k = qb(b, !0);
          a = ba({ x: f, y: e }, n, k);
          m = ba({ x: h, y: e }, n, k);
          h = ba({ x: h, y: d }, n, k);
          d = ba({ x: f, y: d }, n, k);
          f = Math.min(a.x, m.x, h.x, d.x);
          e = Math.min(a.y, m.y, h.y, d.y);
          A.x = A.y = 0;
          c && Sa(b, A);
          return {
            left: f + A.x,
            top: e + A.y,
            width: Math.max(a.x, m.x, h.x, d.x) - f,
            height: Math.max(a.y, m.y, h.y, d.y) - e,
          };
        },
        cb = function (a) {
          return a &&
            a.length &&
            a[0] &&
            ((a[0].nodeType && a[0].style && !a.nodeType) ||
              (a[0].length && a[0][0]))
            ? !0
            : !1;
        },
        Pa = "ontouchstart" in r && "orientation" in window,
        kb = (function (a) {
          var b = a.split(",");
          a = (
            void 0 !== C.onpointerdown
              ? "pointerdown,pointermove,pointerup,pointercancel"
              : void 0 !== C.onmspointerdown
              ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel"
              : a
          ).split(",");
          for (var c = {}, d = 8; -1 < --d; )
            (c[b[d]] = a[d]), (c[a[d]] = b[d]);
          return c;
        })("touchstart,touchmove,touchend,touchcancel"),
        Ea = function (a, b, c, d) {
          a.addEventListener
            ? a.addEventListener(kb[b] || b, c, d)
            : a.attachEvent && a.attachEvent("on" + b, c);
        },
        ka = function (a, b, c) {
          a.removeEventListener
            ? a.removeEventListener(kb[b] || b, c)
            : a.detachEvent && a.detachEvent("on" + b, c);
        },
        vb = function (a, b) {
          for (var c = a.length; -1 < --c; )
            if (a[c].identifier === b) return !0;
          return !1;
        },
        Ta = function (a) {
          ja = a.touches && y < a.touches.length;
          ka(a.target, "touchend", Ta);
        },
        wb = function (a) {
          ja = a.touches && y < a.touches.length;
          Ea(a.target, "touchend", Ta);
        },
        rb = function (a, b, c, d, e, f) {
          var h = {},
            l,
            n;
          if (b)
            if (1 !== e && b instanceof Array) {
              h.end = l = [];
              var k = b.length;
              if ("object" === typeof b[0])
                for (n = 0; n < k; n++) l[n] = da(b[n], e);
              else for (n = 0; n < k; n++) l[n] = b[n] * e;
              c += 1.1;
              d -= 1.1;
            } else
              h.end =
                "function" === typeof b
                  ? function (c) {
                      c = b.call(a, c);
                      var d;
                      if (1 !== e && "object" === typeof c) {
                        var f = {};
                        for (d in c) f[d] = c[d] * e;
                        c = f;
                      }
                      return c;
                    }
                  : b;
          if (c || 0 === c) h.max = c;
          if (d || 0 === d) h.min = d;
          f && (h.velocity = 0);
          return h;
        },
        ub = function (a) {
          var b;
          return a && a.getAttribute && "BODY" !== a.nodeName
            ? "true" === (b = a.getAttribute("data-clickable")) ||
              ("false" !== b &&
                (a.onclick ||
                  ha.test(a.nodeName + "") ||
                  "true" === a.getAttribute("contentEditable")))
              ? !0
              : ub(a.parentNode)
            : !1;
        },
        nb = function (b, c) {
          for (var d = b.length, e; -1 < --d; )
            (e = b[d]),
              (e.ondragstart = e.onselectstart = c ? null : a),
              Ga(e, "userSelect", c ? "text" : "none");
        },
        db,
        $a = (function () {
          var a = t.createElement("div"),
            b = t.createElement("div"),
            c = b.style,
            d = t.body || C;
          c.display = "inline-block";
          c.position = "relative";
          a.style.cssText = b.innerHTML =
            "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden";
          a.appendChild(b);
          d.appendChild(a);
          db = b.offsetHeight + 18 > a.scrollHeight;
          c.width = "100%";
          if (!la) {
            c.paddingRight = "500px";
            var e = (a.scrollLeft = a.scrollWidth - a.clientWidth);
            c.left = "-90px";
            e = e !== a.scrollLeft;
          }
          d.removeChild(a);
          return e;
        })(),
        ob = function (a, b) {
          a = ta(a);
          b = b || {};
          var c = t.createElement("div"),
            d = c.style,
            e = a.firstChild,
            f = 0,
            h = 0,
            k = a.scrollTop,
            m = a.scrollLeft,
            n = a.scrollWidth,
            g = a.scrollHeight,
            q = 0,
            r = 0,
            y = 0,
            E,
            u,
            w,
            A;
          if (Xa && !1 !== b.force3D) {
            var x = "translate3d(";
            var H = "px,0px)";
          } else la && ((x = "translate("), (H = "px)"));
          this.scrollTop = function (a, b) {
            if (!arguments.length) return -this.top();
            this.top(-a, b);
          };
          this.scrollLeft = function (a, b) {
            if (!arguments.length) return -this.left();
            this.left(-a, b);
          };
          this.left = function (c, e) {
            if (!arguments.length) return -(a.scrollLeft + h);
            var g = a.scrollLeft - m,
              l = h;
            if ((2 < g || -2 > g) && !e) {
              if (
                ((m = a.scrollLeft),
                z.killTweensOf(this, !0, { left: 1, scrollLeft: 1 }),
                this.left(-m),
                b.onKill)
              )
                b.onKill();
            } else {
              c = -c;
              0 > c
                ? ((h = (c - 0.5) | 0), (c = 0))
                : c > r
                ? ((h = (c - r) | 0), (c = r))
                : (h = 0);
              if (h || l)
                x
                  ? this._suspendTransforms || (d[la] = x + -h + "px," + -f + H)
                  : (d.left = -h + "px"),
                  $a && 0 <= h + q && (d.paddingRight = h + q + "px");
              a.scrollLeft = c | 0;
              m = a.scrollLeft;
            }
          };
          this.top = function (c, e) {
            if (!arguments.length) return -(a.scrollTop + f);
            var g = a.scrollTop - k,
              l = f;
            if ((2 < g || -2 > g) && !e) {
              if (
                ((k = a.scrollTop),
                z.killTweensOf(this, !0, { top: 1, scrollTop: 1 }),
                this.top(-k),
                b.onKill)
              )
                b.onKill();
            } else {
              c = -c;
              0 > c
                ? ((f = (c - 0.5) | 0), (c = 0))
                : c > y
                ? ((f = (c - y) | 0), (c = y))
                : (f = 0);
              if (f || l)
                x
                  ? this._suspendTransforms || (d[la] = x + -h + "px," + -f + H)
                  : (d.top = -f + "px");
              a.scrollTop = c | 0;
              k = a.scrollTop;
            }
          };
          this.maxScrollTop = function () {
            return y;
          };
          this.maxScrollLeft = function () {
            return r;
          };
          this.disable = function () {
            for (e = c.firstChild; e; )
              (A = e.nextSibling), a.appendChild(e), (e = A);
            a === c.parentNode && a.removeChild(c);
          };
          this.enable = function () {
            e = a.firstChild;
            if (e !== c) {
              for (; e; ) (A = e.nextSibling), c.appendChild(e), (e = A);
              a.appendChild(c);
              this.calibrate();
            }
          };
          this.calibrate = function (b) {
            var e = a.clientWidth === E;
            k = a.scrollTop;
            m = a.scrollLeft;
            if (
              !e ||
              a.clientHeight !== u ||
              c.offsetHeight !== w ||
              n !== a.scrollWidth ||
              g !== a.scrollHeight ||
              b
            ) {
              if (f || h) {
                var l = this.left();
                var v = this.top();
                this.left(-a.scrollLeft);
                this.top(-a.scrollTop);
              }
              if (!e || b)
                (d.display = "block"),
                  (d.width = "auto"),
                  (d.paddingRight = "0px"),
                  (q = Math.max(0, a.scrollWidth - a.clientWidth)) &&
                    (q +=
                      I(a, "paddingLeft") + (db ? I(a, "paddingRight") : 0));
              d.display = "inline-block";
              d.position = "relative";
              d.overflow = "visible";
              d.verticalAlign = "top";
              d.width = "100%";
              d.paddingRight = q + "px";
              db && (d.paddingBottom = I(a, "paddingBottom", !0));
              p && (d.zoom = "1");
              E = a.clientWidth;
              u = a.clientHeight;
              n = a.scrollWidth;
              g = a.scrollHeight;
              r = a.scrollWidth - E;
              y = a.scrollHeight - u;
              w = c.offsetHeight;
              d.display = "block";
              if (l || v) this.left(l), this.top(v);
            }
          };
          this.content = c;
          this.element = a;
          this._suspendTransforms = !1;
          this.enable();
        },
        Fa = function (a, d) {
          w.call(this, a);
          a = ta(a);
          na || (na = B.com.greensock.plugins.ThrowPropsPlugin);
          this.vars = d = da(d || {});
          this.target = a;
          this.x = this.y = this.rotation = 0;
          this.dragResistance = parseFloat(d.dragResistance) || 0;
          this.edgeResistance = isNaN(d.edgeResistance)
            ? 1
            : parseFloat(d.edgeResistance) || 0;
          this.lockAxis = d.lockAxis;
          this.autoScroll = d.autoScroll || 0;
          this.lockedAxis = null;
          this.allowEventDefault = !!d.allowEventDefault;
          var k = (d.type || (p ? "top,left" : "x,y")).toLowerCase(),
            m = -1 !== k.indexOf("x") || -1 !== k.indexOf("y"),
            l = -1 !== k.indexOf("rotation"),
            n = l ? "rotation" : m ? "x" : "left",
            E = m ? "y" : "top",
            C =
              -1 !== k.indexOf("x") ||
              -1 !== k.indexOf("left") ||
              "scroll" === k,
            G =
              -1 !== k.indexOf("y") ||
              -1 !== k.indexOf("top") ||
              "scroll" === k,
            F = d.minimumMovement || 2,
            g = this,
            Q = Qa(d.trigger || d.handle || a),
            U = {},
            N = 0,
            ha = !1,
            X = d.clickableTest || ub,
            Z = 0,
            ea,
            ba,
            ca,
            aa,
            Y,
            ia,
            la,
            qa,
            ma,
            za,
            va,
            pa,
            fa,
            xa,
            Ia,
            Ma,
            ua,
            wa,
            Ba,
            Ka,
            La,
            T,
            Ua,
            ya,
            fb,
            gb,
            Sa,
            Ta,
            Wa,
            lb = function (b) {
              if (g.autoScroll && g.isDragging && (ha || Ia)) {
                var c = a,
                  d = 15 * g.autoScroll,
                  e,
                  f,
                  h;
                ha = !1;
                S.scrollTop =
                  null != window.pageYOffset
                    ? window.pageYOffset
                    : null != r.scrollTop
                    ? r.scrollTop
                    : t.body.scrollTop;
                S.scrollLeft =
                  null != window.pageXOffset
                    ? window.pageXOffset
                    : null != r.scrollLeft
                    ? r.scrollLeft
                    : t.body.scrollLeft;
                var k = g.pointerX - S.scrollLeft;
                for (f = g.pointerY - S.scrollTop; c && !e; ) {
                  c = (e = oa(c.parentNode)) ? S : c.parentNode;
                  var n = e
                    ? {
                        bottom: Math.max(
                          r.clientHeight,
                          window.innerHeight || 0
                        ),
                        right: Math.max(r.clientWidth, window.innerWidth || 0),
                        left: 0,
                        top: 0,
                      }
                    : c.getBoundingClientRect();
                  var p = (h = 0);
                  if (G) {
                    var q = c._gsMaxScrollY - c.scrollTop;
                    0 > q
                      ? (h = q)
                      : f > n.bottom - 40 && q
                      ? ((ha = !0),
                        (h = Math.min(
                          q,
                          (d * (1 - Math.max(0, n.bottom - f) / 40)) | 0
                        )))
                      : f < n.top + 40 &&
                        c.scrollTop &&
                        ((ha = !0),
                        (h = -Math.min(
                          c.scrollTop,
                          (d * (1 - Math.max(0, f - n.top) / 40)) | 0
                        )));
                    h && (c.scrollTop += h);
                  }
                  C &&
                    ((q = c._gsMaxScrollX - c.scrollLeft),
                    0 > q
                      ? (p = q)
                      : k > n.right - 40 && q
                      ? ((ha = !0),
                        (p = Math.min(
                          q,
                          (d * (1 - Math.max(0, n.right - k) / 40)) | 0
                        )))
                      : k < n.left + 40 &&
                        c.scrollLeft &&
                        ((ha = !0),
                        (p = -Math.min(
                          c.scrollLeft,
                          (d * (1 - Math.max(0, k - n.left) / 40)) | 0
                        ))),
                    p && (c.scrollLeft += p));
                  e &&
                    (p || h) &&
                    (window.scrollTo(c.scrollLeft, c.scrollTop),
                    $a(g.pointerX + p, g.pointerY + h));
                }
              }
              Ia &&
                ((d = g.x),
                (e = g.y),
                1e-6 > d && -1e-6 < d && (d = 0),
                1e-6 > e && -1e-6 < e && (e = 0),
                l
                  ? ((g.deltaX = d - ya.data.rotation),
                    (ya.data.rotation = g.rotation = d),
                    ya.setRatio(1))
                  : W
                  ? (G && ((g.deltaY = e - W.top()), W.top(e)),
                    C && ((g.deltaX = d - W.left()), W.left(d)))
                  : m
                  ? (G && ((g.deltaY = e - ya.data.y), (ya.data.y = e)),
                    C && ((g.deltaX = d - ya.data.x), (ya.data.x = d)),
                    ya.setRatio(1))
                  : (G &&
                      ((g.deltaY = e - parseFloat(a.style.top || 0)),
                      (a.style.top = e + "px")),
                    C &&
                      ((g.deltaY = d - parseFloat(a.style.left || 0)),
                      (a.style.left = d + "px"))),
                !la ||
                  b ||
                  Sa ||
                  ((Sa = !0), D(g, "drag", "onDrag"), (Sa = !1)));
              Ia = !1;
            },
            Ha = function (b, c) {
              var d = g.x,
                e = g.y;
              a._gsTransform ||
                (!m && !l) ||
                z.set(a, { x: "+\x3d0", overwrite: !1 });
              m
                ? ((g.y = a._gsTransform.y), (g.x = a._gsTransform.x))
                : l
                ? (g.x = g.rotation = a._gsTransform.rotation)
                : W
                ? ((g.y = W.top()), (g.x = W.left()))
                : ((g.y = parseInt(a.style.top, 10) || 0),
                  (g.x = parseInt(a.style.left, 10) || 0));
              (ua || wa || Ba) &&
                !c &&
                (g.isDragging || g.isThrowing) &&
                (Ba &&
                  ((A.x = g.x),
                  (A.y = g.y),
                  (c = Ba(A)),
                  c.x !== g.x && ((g.x = c.x), (Ia = !0)),
                  c.y !== g.y && ((g.y = c.y), (Ia = !0))),
                ua &&
                  ((c = ua(g.x)),
                  c !== g.x && ((g.x = c), l && (g.rotation = c), (Ia = !0))),
                wa && ((c = wa(g.y)), c !== g.y && (g.y = c), (Ia = !0)));
              Ia && lb(!0);
              b ||
                ((g.deltaX = g.x - d),
                (g.deltaY = g.y - e),
                D(g, "throwupdate", "onThrowUpdate"));
            },
            Va = function () {
              ia = !1;
              if (W)
                W.calibrate(),
                  (g.minX = ma = -W.maxScrollLeft()),
                  (g.minY = va = -W.maxScrollTop()),
                  (g.maxX = qa = g.maxY = za = 0),
                  (ia = !0);
              else if (d.bounds) {
                var b = P(d.bounds, a.parentNode);
                if (l)
                  (g.minX = ma = b.left),
                    (g.maxX = qa = b.left + b.width),
                    (g.minY = va = g.maxY = za = 0);
                else if (void 0 !== d.bounds.maxX || void 0 !== d.bounds.maxY)
                  (b = d.bounds),
                    (g.minX = ma = b.minX),
                    (g.minY = va = b.minY),
                    (g.maxX = qa = b.maxX),
                    (g.maxY = za = b.maxY);
                else {
                  var c = P(a, a.parentNode);
                  g.minX = ma = I(a, n) + b.left - c.left;
                  g.minY = va = I(a, E) + b.top - c.top;
                  g.maxX = qa = ma + (b.width - c.width);
                  g.maxY = za = va + (b.height - c.height);
                }
                ma > qa && ((g.minX = qa), (g.maxX = qa = ma), (ma = g.minX));
                va > za && ((g.minY = za), (g.maxY = za = va), (va = g.minY));
                l && ((g.minRotation = ma), (g.maxRotation = qa));
                ia = !0;
              }
              d.liveSnap &&
                ((b = !0 === d.liveSnap ? d.snap || {} : d.liveSnap),
                (c = b instanceof Array || "function" === typeof b),
                l
                  ? ((ua = hb(c ? b : b.rotation, ma, qa, 1)), (wa = null))
                  : b.points
                  ? (Ba = pb(
                      c ? b : b.points,
                      ma,
                      qa,
                      va,
                      za,
                      b.radius,
                      W ? -1 : 1
                    ))
                  : (C &&
                      (ua = hb(
                        c ? b : b.x || b.left || b.scrollLeft,
                        ma,
                        qa,
                        W ? -1 : 1
                      )),
                    G &&
                      (wa = hb(
                        c ? b : b.y || b.top || b.scrollTop,
                        va,
                        za,
                        W ? -1 : 1
                      ))));
            },
            cb = function () {
              g.isThrowing = !1;
              D(g, "throwcomplete", "onThrowComplete");
            },
            ib = function () {
              g.isThrowing = !1;
            },
            Xa = function (c, e) {
              if (c && na) {
                if (!0 === c) {
                  var f = d.snap || d.liveSnap || {};
                  var h = f instanceof Array || "function" === typeof f;
                  c = {
                    resistance:
                      (d.throwResistance || d.resistance || 1e3) / (l ? 10 : 1),
                  };
                  if (l) c.rotation = rb(g, h ? f : f.rotation, qa, ma, 1, e);
                  else if (
                    (C &&
                      (c[n] = rb(
                        g,
                        h ? f : f.points || f.x || f.left || f.scrollLeft,
                        qa,
                        ma,
                        W ? -1 : 1,
                        e || "x" === g.lockedAxis
                      )),
                    G &&
                      (c[E] = rb(
                        g,
                        h ? f : f.points || f.y || f.top || f.scrollTop,
                        za,
                        va,
                        W ? -1 : 1,
                        e || "y" === g.lockedAxis
                      )),
                    f.points ||
                      (f instanceof Array && "object" === typeof f[0]))
                  )
                    (c.linkedProps = n + "," + E), (c.radius = f.radius);
                }
                g.isThrowing = !0;
                e = isNaN(d.overshootTolerance)
                  ? 1 === d.edgeResistance
                    ? 0
                    : 1 - g.edgeResistance + 0.2
                  : d.overshootTolerance;
                g.tween = c = na.to(
                  W || a,
                  {
                    throwProps: c,
                    ease: d.ease || B.Power3.easeOut,
                    onComplete: cb,
                    onOverwrite: ib,
                    onUpdate: d.fastMode ? D : Ha,
                    onUpdateParams: d.fastMode
                      ? [g, "onthrowupdate", "onThrowUpdate"]
                      : f && f.radius
                      ? [!1, !0]
                      : b,
                  },
                  isNaN(d.maxDuration) ? 2 : d.maxDuration,
                  isNaN(d.minDuration) ? (0 === e ? 0 : 0.5) : d.minDuration,
                  e
                );
                d.fastMode ||
                  (W && (W._suspendTransforms = !0),
                  c.render(c.duration(), !0, !0),
                  Ha(!0, !0),
                  (g.endX = g.x),
                  (g.endY = g.y),
                  l && (g.endRotation = g.x),
                  c.play(0),
                  Ha(!0, !0),
                  W && (W._suspendTransforms = !1));
              } else ia && g.applyBounds();
            },
            db = function (b) {
              var c = T || [1, 0, 0, 1, 0, 0];
              T = qb(a.parentNode, !0);
              if (b && g.isPressed && c.join(",") !== T.join(",")) {
                b = c[0];
                var d = c[1];
                var e = c[2];
                var f = c[3];
                var h = c[4];
                c = c[5];
                var k = b * f - d * e;
                e = (f / k) * ba + (-e / k) * ca + (e * c - f * h) / k;
                b = (-d / k) * ba + (b / k) * ca + -(b * c - d * h) / k;
                ca = e * T[1] + b * T[3] + T[5];
                ba = e * T[0] + b * T[2] + T[4];
              }
              T[1] ||
                T[2] ||
                1 != T[0] ||
                1 != T[3] ||
                0 != T[4] ||
                0 != T[5] ||
                (T = null);
            },
            bb = function () {
              var b = 1 - g.edgeResistance;
              db(!1);
              T &&
                ((ba = g.pointerX * T[0] + g.pointerY * T[2] + T[4]),
                (ca = g.pointerX * T[1] + g.pointerY * T[3] + T[5]));
              Ia && ($a(g.pointerX, g.pointerY), lb(!0));
              if (W) Va(), (Y = W.top()), (aa = W.left());
              else if ((Ya() ? (Ha(!0, !0), Va()) : g.applyBounds(), l)) {
                var c = a,
                  d = { x: 0, y: 0 },
                  e = void 0;
                c = ta(c);
                c = qb(c, !1, void 0);
                var h = d.x,
                  k = d.y;
                e = !0 === e ? d : e || {};
                e.x = h * c[0] + k * c[2] + c[4];
                e.y = h * c[1] + k * c[3] + c[5];
                xa = e;
                Ha(!0, !0);
                aa = g.x;
                Y = g.y = Math.atan2(xa.y - g.pointerY, g.pointerX - xa.x) * f;
              } else (Y = I(a, E)), (aa = I(a, n));
              ia &&
                b &&
                (aa > qa
                  ? (aa = qa + (aa - qa) / b)
                  : aa < ma && (aa = ma - (ma - aa) / b),
                l ||
                  (Y > za
                    ? (Y = za + (Y - za) / b)
                    : Y < va && (Y = va - (va - Y) / b)));
              g.startX = aa;
              g.startY = Y;
            },
            Ya = function () {
              return g.tween && g.tween.isActive();
            },
            mb = function () {
              !h.parentNode ||
                Ya() ||
                g.isDragging ||
                h.parentNode.removeChild(h);
            },
            hb = function (a, b, c, d) {
              return "function" === typeof a
                ? function (e) {
                    var f = g.isPressed ? 1 - g.edgeResistance : 1;
                    return (
                      a.call(
                        g,
                        e > c ? c + (e - c) * f : e < b ? b + (e - b) * f : e
                      ) * d
                    );
                  }
                : a instanceof Array
                ? function (d) {
                    for (
                      var e = a.length, f = 0, h = 999999999999999, g, k;
                      -1 < --e;

                    )
                      (g = a[e]),
                        (k = g - d),
                        0 > k && (k = -k),
                        k < h && g >= b && g <= c && ((f = e), (h = k));
                    return a[f];
                  }
                : isNaN(a)
                ? function (a) {
                    return a;
                  }
                : function () {
                    return a * d;
                  };
            },
            pb = function (a, b, c, d, e, f, h) {
              f = f || 999999999999999;
              return "function" === typeof a
                ? function (k) {
                    var l = g.isPressed ? 1 - g.edgeResistance : 1,
                      m = k.x,
                      n = k.y;
                    k.x = m =
                      m > c ? c + (m - c) * l : m < b ? b + (m - b) * l : m;
                    k.y = n =
                      n > e ? e + (n - e) * l : n < d ? d + (n - d) * l : n;
                    l = a.call(g, k);
                    l !== k && ((k.x = l.x), (k.y = l.y));
                    1 !== h && ((k.x *= h), (k.y *= h));
                    if (999999999999999 > f) {
                      l = k.x - m;
                      var p = k.y - n;
                      Math.sqrt(l * l + p * p) > f && ((k.x = m), (k.y = n));
                    }
                    return k;
                  }
                : a instanceof Array
                ? function (b) {
                    for (
                      var c = a.length, d = 0, e = 999999999999999, h, g;
                      -1 < --c;

                    )
                      (g = a[c]),
                        (h = g.x - b.x),
                        (g = g.y - b.y),
                        (h = Math.sqrt(h * h + g * g)),
                        h < e && ((d = c), (e = h));
                    return e <= f ? a[d] : b;
                  }
                : function (a) {
                    return a;
                  };
            },
            Za = function (b) {
              if (
                !(
                  !ea ||
                  g.isPressed ||
                  !b ||
                  (("mousedown" === b.type || "pointerdown" === b.type) &&
                    30 > c() - Z &&
                    kb[g.pointerEvent.type])
                )
              )
                if (
                  ((Ua = Ya()),
                  (g.pointerEvent = b),
                  kb[b.type]
                    ? ((La =
                        -1 !== b.type.indexOf("touch")
                          ? b.currentTarget || b.target
                          : t),
                      Ea(La, "touchend", Ja),
                      Ea(La, "touchmove", sb),
                      Ea(La, "touchcancel", Ja),
                      Ea(t, "touchstart", wb))
                    : ((La = null), Ea(t, "mousemove", sb)),
                  (gb = null),
                  Ea(t, "mouseup", Ja),
                  b && b.target && Ea(b.target, "mouseup", Ja),
                  (Ka = X.call(g, b.target) && !d.dragClickables))
                )
                  Ea(b.target, "change", Ja),
                    D(g, "press", "onPress"),
                    nb(Q, !0);
                else {
                  fb =
                    La && C !== G && !1 !== g.vars.allowNativeTouchScrolling
                      ? C
                        ? "y"
                        : "x"
                      : !1;
                  p
                    ? (b = Da(b, !0))
                    : fb ||
                      g.allowEventDefault ||
                      (b.preventDefault(),
                      b.preventManipulation && b.preventManipulation());
                  b.changedTouches
                    ? ((b = pa = b.changedTouches[0]), (fa = b.identifier))
                    : b.pointerId
                    ? (fa = b.pointerId)
                    : (pa = fa = null);
                  y++;
                  Ca(lb);
                  ca = g.pointerY = b.pageY;
                  ba = g.pointerX = b.pageX;
                  (fb || g.autoScroll) && Oa(a.parentNode);
                  a.parentNode &&
                    (W ||
                      (g.autoScroll &&
                        !l &&
                        a.parentNode._gsMaxScrollX &&
                        !h.parentNode)) &&
                    !a.getBBox &&
                    ((h.style.width = a.parentNode.scrollWidth + "px"),
                    a.parentNode.appendChild(h));
                  bb();
                  g.tween && g.tween.kill();
                  g.isThrowing = !1;
                  z.killTweensOf(W || a, !0, U);
                  W && z.killTweensOf(a, !0, { scrollTo: 1 });
                  g.tween = g.lockedAxis = null;
                  if (d.zIndexBoost || (!l && !W && !1 !== d.zIndexBoost))
                    a.style.zIndex = Fa.zIndex++;
                  g.isPressed = !0;
                  la = !(!d.onDrag && !g._listeners.drag);
                  if (!l)
                    for (b = Q.length; -1 < --b; )
                      Ga(Q[b], "cursor", d.cursor || "move");
                  D(g, "press", "onPress");
                }
            },
            sb = function (a) {
              var b = a,
                c,
                d;
              if (ea && !ja && g.isPressed && a) {
                g.pointerEvent = a;
                if ((c = a.changedTouches)) {
                  if (((a = c[0]), a !== pa && a.identifier !== fa)) {
                    for (
                      d = c.length;
                      -1 < --d && (a = c[d]).identifier !== fa;

                    );
                    if (0 > d) return;
                  }
                } else if (a.pointerId && fa && a.pointerId !== fa) return;
                if (p) a = Da(a, !0);
                else {
                  if (La && fb && !gb) {
                    var e = a.pageX;
                    c = a.pageY;
                    T &&
                      ((d = e * T[0] + c * T[2] + T[4]),
                      (c = e * T[1] + c * T[3] + T[5]),
                      (e = d));
                    d = Math.abs(e - ba);
                    c = Math.abs(c - ca);
                    if ((d !== c && (d > F || c > F)) || (H && fb === gb))
                      if (
                        ((gb = d > c && C ? "x" : "y"),
                        !1 !== g.vars.lockAxisOnTouchScroll &&
                          ((g.lockedAxis = "x" === gb ? "y" : "x"),
                          "function" === typeof g.vars.onLockAxis &&
                            g.vars.onLockAxis.call(g, b)),
                        H && fb === gb)
                      ) {
                        Ja(b);
                        return;
                      }
                  }
                  g.allowEventDefault ||
                    (fb && (!gb || fb === gb)) ||
                    !1 === b.cancelable ||
                    (b.preventDefault(),
                    b.preventManipulation && b.preventManipulation());
                }
                g.autoScroll && (ha = !0);
                $a(a.pageX, a.pageY);
              }
            },
            $a = function (a, b) {
              var c = 1 - g.dragResistance,
                d = 1 - g.edgeResistance;
              g.pointerX = a;
              g.pointerY = b;
              if (l) {
                var e = Math.atan2(xa.y - b, a - xa.x) * f;
                b = g.y - e;
                g.y = e;
                180 < b ? (Y -= 360) : -180 > b && (Y += 360);
                a = aa + (Y - e) * c;
              } else
                T &&
                  ((e = a * T[0] + b * T[2] + T[4]),
                  (b = a * T[1] + b * T[3] + T[5]),
                  (a = e)),
                  (b -= ca),
                  (a -= ba),
                  b < F && b > -F && (b = 0),
                  a < F && a > -F && (a = 0),
                  (g.lockAxis || g.lockedAxis) &&
                    (a || b) &&
                    ((e = g.lockedAxis),
                    e ||
                      ((g.lockedAxis = e =
                        C && Math.abs(a) > Math.abs(b)
                          ? "y"
                          : G
                          ? "x"
                          : null) &&
                        "function" === typeof g.vars.onLockAxis &&
                        g.vars.onLockAxis.call(g, g.pointerEvent)),
                    "y" === e ? (b = 0) : "x" === e && (a = 0)),
                  (a = aa + a * c),
                  (e = Y + b * c);
              (ua || wa || Ba) && (g.x !== a || (g.y !== e && !l))
                ? (Ba &&
                    ((A.x = a), (A.y = e), (e = Ba(A)), (a = e.x), (e = e.y)),
                  ua && (a = ua(a)),
                  wa && (e = wa(e)))
                : ia &&
                  (a > qa
                    ? (a = qa + (a - qa) * d)
                    : a < ma && (a = ma + (a - ma) * d),
                  l ||
                    (e > za
                      ? (e = za + (e - za) * d)
                      : e < va && (e = va + (e - va) * d)));
              l || ((a = Math.round(a)), (e = Math.round(e)));
              if (g.x !== a || (g.y !== e && !l))
                l
                  ? ((g.endRotation = g.x = g.endX = a), (Ia = !0))
                  : (G && ((g.y = g.endY = e), (Ia = !0)),
                    C && ((g.x = g.endX = a), (Ia = !0))),
                  !g.isDragging &&
                    g.isPressed &&
                    ((g.isDragging = !0), D(g, "dragstart", "onDragStart"));
            },
            Ja = function (b, e) {
              if (
                ea &&
                g.isPressed &&
                (!b ||
                  null == fa ||
                  e ||
                  !(
                    (b.pointerId && b.pointerId !== fa) ||
                    (b.changedTouches && !vb(b.changedTouches, fa))
                  ))
              ) {
                g.isPressed = !1;
                e = b;
                var f = g.isDragging,
                  h = z.delayedCall(0.001, mb),
                  k,
                  m,
                  n;
                La
                  ? (ka(La, "touchend", Ja),
                    ka(La, "touchmove", sb),
                    ka(La, "touchcancel", Ja),
                    ka(t, "touchstart", wb))
                  : ka(t, "mousemove", sb);
                ka(t, "mouseup", Ja);
                b && b.target && ka(b.target, "mouseup", Ja);
                Ia = !1;
                if (Ka)
                  b && ka(b.target, "change", Ja),
                    nb(Q, !1),
                    D(g, "release", "onRelease"),
                    D(g, "click", "onClick"),
                    (Ka = !1);
                else {
                  R(lb);
                  if (!l)
                    for (m = Q.length; -1 < --m; )
                      Ga(Q[m], "cursor", d.cursor || "move");
                  f && ((N = sa = c()), (g.isDragging = !1));
                  y--;
                  if (b) {
                    p && (b = Da(b, !1));
                    if ((k = b.changedTouches))
                      if (((b = k[0]), b !== pa && b.identifier !== fa)) {
                        for (
                          m = k.length;
                          -1 < --m && (b = k[m]).identifier !== fa;

                        );
                        if (0 > m) return;
                      }
                    g.pointerEvent = e;
                    g.pointerX = b.pageX;
                    g.pointerY = b.pageY;
                  }
                  if (e && !f) {
                    if (
                      (Ua && (d.snap || d.bounds) && Xa(d.throwProps),
                      D(g, "release", "onRelease"),
                      !H || "touchmove" !== e.type)
                    ) {
                      D(g, "click", "onClick");
                      var q = e.target || e.srcElement || a;
                      Z = c();
                      H ||
                        e.defaultPrevented ||
                        z.delayedCall(1e-5, function () {
                          Z !== Ta &&
                            g.enabled() &&
                            !g.isPressed &&
                            (q.click
                              ? q.click()
                              : t.createEvent &&
                                ((n = t.createEvent("MouseEvents")),
                                n.initMouseEvent(
                                  "click",
                                  !0,
                                  !0,
                                  window,
                                  1,
                                  g.pointerEvent.screenX,
                                  g.pointerEvent.screenY,
                                  g.pointerX,
                                  g.pointerY,
                                  !1,
                                  !1,
                                  !1,
                                  !1,
                                  0,
                                  null
                                ),
                                q.dispatchEvent(n)));
                        });
                    }
                  } else
                    Xa(d.throwProps),
                      p ||
                        g.allowEventDefault ||
                        !e ||
                        (!d.dragClickables && X.call(g, e.target)) ||
                        !f ||
                        (fb && (!gb || fb !== gb)) ||
                        !1 === e.cancelable ||
                        (e.preventDefault(),
                        e.preventManipulation && e.preventManipulation()),
                      D(g, "release", "onRelease");
                  Ya() && h.duration(g.tween.duration());
                  f && D(g, "dragend", "onDragEnd");
                  return !0;
                }
              }
            },
            jb = function (b) {
              if (b && g.isDragging && !W) {
                b = b.target || b.srcElement || a.parentNode;
                var c = b.scrollLeft - b._gsScrollX,
                  d = b.scrollTop - b._gsScrollY;
                if (c || d)
                  T
                    ? ((ba -= c * T[0] + d * T[2]), (ca -= d * T[3] + c * T[1]))
                    : ((ba -= c), (ca -= d)),
                    (b._gsScrollX += c),
                    (b._gsScrollY += d),
                    $a(g.pointerX, g.pointerY);
              }
            },
            xb = function (a) {
              var b = c(),
                d = 40 > b - Z;
              b = 40 > b - N;
              var e = d && Ta === Z,
                f = !!a.preventDefault,
                h = g.pointerEvent && g.pointerEvent.defaultPrevented,
                k = d && Wa === Z,
                l = a.isTrusted || (null == a.isTrusted && d && e);
              f &&
                (e || (b && !1 !== g.vars.suppressClickOnDrag)) &&
                a.stopImmediatePropagation();
              if (
                !(
                  !d ||
                  (g.pointerEvent && g.pointerEvent.defaultPrevented) ||
                  (e && l === k)
                )
              )
                l && e && (Wa = Z), (Ta = Z);
              else if (g.isPressed || b || d)
                f
                  ? (l && a.detail && d && !h) ||
                    (a.preventDefault(),
                    a.preventManipulation && a.preventManipulation())
                  : (a.returnValue = !1);
            };
          (Ma = Fa.get(this.target)) && Ma.kill();
          this.startDrag = function (a) {
            Za(a);
            g.isDragging ||
              ((g.isDragging = !0), D(g, "dragstart", "onDragStart"));
          };
          this.drag = sb;
          this.endDrag = function (a) {
            Ja(a, !0);
          };
          this.timeSinceDrag = function () {
            return g.isDragging ? 0 : (c() - N) / 1e3;
          };
          this.hitTest = function (a, b) {
            return Fa.hitTest(g.target, a, b);
          };
          this.getDirection = function (a, b) {
            var c =
              "velocity" === a && na
                ? a
                : "object" !== typeof a || l
                ? "start"
                : "element";
            if ("element" === c) {
              var d = eb(g.target);
              var e = eb(a);
            }
            a =
              "start" === c
                ? g.x - aa
                : "velocity" === c
                ? na.getVelocity(this.target, n)
                : d.left + d.width / 2 - (e.left + e.width / 2);
            if (l) return 0 > a ? "counter-clockwise" : "clockwise";
            b = b || 2;
            c =
              "start" === c
                ? g.y - Y
                : "velocity" === c
                ? na.getVelocity(this.target, E)
                : d.top + d.height / 2 - (e.top + e.height / 2);
            d = Math.abs(a / c);
            a = d < 1 / b ? "" : 0 > a ? "left" : "right";
            d < b && ("" !== a && (a += "-"), (a += 0 > c ? "up" : "down"));
            return a;
          };
          this.applyBounds = function (b) {
            var c;
            if (b && d.bounds !== b) return (d.bounds = b), g.update(!0);
            Ha(!0);
            Va();
            if (ia) {
              b = g.x;
              var e = g.y;
              b > qa ? (b = qa) : b < ma && (b = ma);
              e > za ? (e = za) : e < va && (e = va);
              if (g.x !== b || g.y !== e) {
                var f = !0;
                g.x = g.endX = b;
                l ? (g.endRotation = b) : (g.y = g.endY = e);
                Ia = !0;
                lb(!0);
                if (g.autoScroll && !g.isDragging)
                  for (
                    Oa(a.parentNode),
                      b = a,
                      S.scrollTop =
                        null != window.pageYOffset
                          ? window.pageYOffset
                          : null != r.scrollTop
                          ? r.scrollTop
                          : t.body.scrollTop,
                      S.scrollLeft =
                        null != window.pageXOffset
                          ? window.pageXOffset
                          : null != r.scrollLeft
                          ? r.scrollLeft
                          : t.body.scrollLeft;
                    b && !c;

                  )
                    (b = (c = oa(b.parentNode)) ? S : b.parentNode),
                      G &&
                        b.scrollTop > b._gsMaxScrollY &&
                        (b.scrollTop = b._gsMaxScrollY),
                      C &&
                        b.scrollLeft > b._gsMaxScrollX &&
                        (b.scrollLeft = b._gsMaxScrollX);
              }
              g.isThrowing &&
                (f ||
                  g.endX > qa ||
                  g.endX < ma ||
                  g.endY > za ||
                  g.endY < va) &&
                Xa(d.throwProps, f);
            }
            return g;
          };
          this.update = function (b, c, d) {
            var e = g.x,
              f = g.y;
            db(!c);
            b ? g.applyBounds() : (Ia && d && lb(!0), Ha(!0));
            c && ($a(g.pointerX, g.pointerY), Ia && lb(!0));
            g.isPressed &&
              !c &&
              ((C && 0.01 < Math.abs(e - g.x)) ||
                (G && 0.01 < Math.abs(f - g.y) && !l)) &&
              bb();
            g.autoScroll && (Oa(a.parentNode), (ha = g.isDragging), lb(!0));
            g.autoScroll && (Na(a, jb), ab(a, jb));
            return g;
          };
          this.enable = function (b) {
            var c;
            if ("soft" !== b) {
              for (c = Q.length; -1 < --c; ) {
                var f = Q[c];
                Ea(f, "mousedown", Za);
                Ea(f, "touchstart", Za);
                Ea(f, "click", xb, !0);
                l || Ga(f, "cursor", d.cursor || "move");
                Ga(f, "touchCallout", "none");
                Ga(f, "touchAction", C === G ? "none" : C ? "pan-y" : "pan-x");
              }
              nb(Q, !1);
            }
            ab(a, jb);
            ea = !0;
            na &&
              "soft" !== b &&
              na.track(W || a, m ? "x,y" : l ? "rotation" : "top,left");
            W && W.enable();
            a._gsDragID = b = "d" + K++;
            u[b] = this;
            W && (W.element._gsDragID = b);
            z.set(a, { x: "+\x3d0", overwrite: !1 });
            ya = {
              t: a,
              data: p ? yb : a._gsTransform,
              tween: {},
              setRatio: p
                ? function () {
                    z.set(a, tb);
                  }
                : e._internals.setTransformRatio ||
                  e._internals.set3DTransformRatio,
            };
            bb();
            g.update(!0);
            return g;
          };
          this.disable = function (b) {
            var c = g.isDragging,
              d;
            if (!l) for (d = Q.length; -1 < --d; ) Ga(Q[d], "cursor", null);
            if ("soft" !== b) {
              for (d = Q.length; -1 < --d; ) {
                var e = Q[d];
                Ga(e, "touchCallout", null);
                Ga(e, "touchAction", null);
                ka(e, "mousedown", Za);
                ka(e, "touchstart", Za);
                ka(e, "click", xb);
              }
              nb(Q, !0);
              La &&
                (ka(La, "touchcancel", Ja),
                ka(La, "touchend", Ja),
                ka(La, "touchmove", sb));
              ka(t, "mouseup", Ja);
              ka(t, "mousemove", sb);
            }
            Na(a, jb);
            ea = !1;
            na &&
              "soft" !== b &&
              na.untrack(W || a, m ? "x,y" : l ? "rotation" : "top,left");
            W && W.disable();
            R(lb);
            g.isDragging = g.isPressed = Ka = !1;
            c && D(g, "dragend", "onDragEnd");
            return g;
          };
          this.enabled = function (a, b) {
            return arguments.length ? (a ? g.enable(b) : g.disable(b)) : ea;
          };
          this.kill = function () {
            g.isThrowing = !1;
            z.killTweensOf(W || a, !0, U);
            g.disable();
            delete u[a._gsDragID];
            return g;
          };
          if (-1 !== k.indexOf("scroll")) {
            var W = (this.scrollProxy = new ob(
              a,
              Ra(
                {
                  onKill: function () {
                    g.isPressed && Ja(null);
                  },
                },
                d
              )
            ));
            a.style.overflowY = G && !Pa ? "auto" : "hidden";
            a.style.overflowX = C && !Pa ? "auto" : "hidden";
            a = W.content;
          }
          !1 !== d.force3D && z.set(a, { force3D: !0 });
          l ? (U.rotation = 1) : (C && (U[n] = 1), G && (U[E] = 1));
          if (l) {
            var tb = J;
            var yb = tb.css;
            tb.overwrite = !1;
          } else
            m &&
              ((tb = C && G ? L : C ? q : x),
              (yb = tb.css),
              (tb.overwrite = !1));
          this.enable();
        },
        wa = (Fa.prototype = new w());
      wa.constructor = Fa;
      wa.pointerX =
        wa.pointerY =
        wa.startX =
        wa.startY =
        wa.deltaX =
        wa.deltaY =
          0;
      wa.isDragging = wa.isPressed = !1;
      Fa.version = "0.15.0";
      Fa.zIndex = 1e3;
      Ea(t, "touchcancel", function () {});
      Ea(t, "contextmenu", function (a) {
        for (var b in u) u[b].isPressed && u[b].endDrag();
      });
      Fa.create = function (a, b) {
        "string" === typeof a && (a = z.selector(a));
        if (a && 0 !== a.length)
          if (cb(a)) {
            var c = [],
              d = a.length,
              e,
              f;
            for (e = 0; e < d; e++) {
              var h = a[e];
              if (cb(h)) for (f = 0; f < h.length; f++) c.push(h[f]);
              else h && 0 !== h.length && c.push(h);
            }
            a = c;
          } else a = [a];
        else a = [];
        for (c = a.length; -1 < --c; ) a[c] = new Fa(a[c], b);
        return a;
      };
      Fa.get = function (a) {
        return u[(ta(a) || {})._gsDragID];
      };
      Fa.timeSinceDrag = function () {
        return (c() - sa) / 1e3;
      };
      var Wa = {},
        eb = function (a, b) {
          if (a === window)
            return (
              (Wa.left = Wa.top = 0),
              (Wa.width = Wa.right =
                r.clientWidth || a.innerWidth || t.body.clientWidth || 0),
              (Wa.height = Wa.bottom =
                (a.innerHeight || 0) - 20 < r.clientHeight
                  ? r.clientHeight
                  : a.innerHeight || t.body.clientHeight || 0),
              Wa
            );
          if (a.pageX !== b)
            var c = {
              left: a.pageX - Ma(),
              top: a.pageY - ea(),
              right: a.pageX - Ma() + 1,
              bottom: a.pageY - ea() + 1,
            };
          else if (a.nodeType || a.left === b || a.top === b)
            if (p) {
              var d = (c = 0),
                e;
              a = ta(a);
              var f = a.offsetWidth;
              for (e = a.offsetHeight; a; )
                (c += a.offsetTop), (d += a.offsetLeft), (a = a.offsetParent);
              c = { top: c, left: d, width: f, height: e };
            } else c = ta(a).getBoundingClientRect();
          else c = a;
          c.right === b && c.width !== b
            ? ((c.right = c.left + c.width), (c.bottom = c.top + c.height))
            : c.width === b &&
              (c = {
                width: c.right - c.left,
                height: c.bottom - c.top,
                right: c.right,
                left: c.left,
                bottom: c.bottom,
                top: c.top,
              });
          return c;
        };
      Fa.hitTest = function (a, b, c) {
        if (a === b) return !1;
        a = eb(a);
        b = eb(b);
        var d =
          b.left > a.right ||
          b.right < a.left ||
          b.top > a.bottom ||
          b.bottom < a.top;
        if (d || !c) return !d;
        d = -1 !== (c + "").indexOf("%");
        c = parseFloat(c) || 0;
        var e = Math.max(a.left, b.left);
        var f = Math.max(a.top, b.top);
        e = Math.min(a.right, b.right) - e;
        f = Math.min(a.bottom, b.bottom) - f;
        return 0 > e || 0 > f
          ? !1
          : d
          ? ((c *= 0.01),
            (d = e * f),
            d >= a.width * a.height * c || d >= b.width * b.height * c)
          : e > c && f > c;
      };
      h.style.cssText =
        "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;";
      return Fa;
    },
    !0
  );
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()();
(function (w) {
  var z = function () {
    return (_gsScope.GreenSockGlobals || _gsScope)[w];
  };
  "function" === typeof define && define.amd
    ? define(["./TweenLite", "./CSSPlugin"], z)
    : "undefined" !== typeof module &&
      module.exports &&
      (require("./TweenLite.js"),
      require("./CSSPlugin.js"),
      (module.exports = z()));
})("Draggable");
_gsScope =
  "undefined" !== typeof module &&
  module.exports &&
  "undefined" !== typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  _gsScope._gsDefine(
    "plugins.ThrowPropsPlugin",
    [
      "plugins.TweenPlugin",
      "TweenLite",
      "easing.Ease",
      "utils.VelocityTracker",
    ],
    function (w, z, e, L) {
      var q = function (a, b) {
          w.call(this, "throwProps");
          this._overwriteProps.length = 0;
        },
        x = _gsScope._gsDefine.globals,
        J = !1,
        B = {
          x: 1,
          y: 1,
          z: 2,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          rotation: 1,
          rotationZ: 1,
          rotationX: 2,
          rotationY: 2,
          skewX: 1,
          skewY: 1,
          xPercent: 1,
          yPercent: 1,
        },
        F = function (a, b, c, d, e) {
          var f = b.length,
            h = 0,
            m = 999999999999999,
            p;
          if ("object" === typeof a) {
            for (; -1 < --f; ) {
              var q = b[f];
              var r = 0;
              for (p in a) (c = q[p] - a[p]), (r += c * c);
              r < m && ((h = f), (m = r));
            }
            if (999999999999999 > (e || 999999999999999) && e < Math.sqrt(m))
              return a;
          } else
            for (; -1 < --f; )
              (q = b[f]),
                (r = q - a),
                0 > r && (r = -r),
                r < m && q >= d && q <= c && ((h = f), (m = r));
          return b[h];
        },
        d = function (a, b, c, d, e, f) {
          if ("auto" === a.end) return a;
          var h = a.end,
            m;
          c = isNaN(c) ? 999999999999999 : c;
          d = isNaN(d) ? -999999999999999 : d;
          if ("object" === typeof b) {
            f = b.calculated
              ? b
              : ("function" === typeof h ? h(b) : F(b, h, c, d, f)) || b;
            if (!b.calculated) {
              for (m in f) b[m] = f[m];
              b.calculated = !0;
            }
            f = f[e];
          } else
            f =
              "function" === typeof h
                ? h(b)
                : h instanceof Array
                ? F(b, h, c, d, f)
                : Number(h);
          f > c ? (f = c) : f < d && (f = d);
          return { max: f, min: f, unitFactor: a.unitFactor };
        },
        t = function (a, b, c) {
          for (var d in b) void 0 === a[d] && d !== c && (a[d] = b[d]);
          return a;
        },
        r = (q.calculateChange = function (a, b, c, d) {
          null == d && (d = 0.05);
          b = b instanceof e ? b : b ? new e(b) : z.defaultEase;
          return (c * d * a) / b.getRatio(d);
        }),
        N = (q.calculateDuration = function (a, b, c, d, f) {
          f = f || 0.05;
          d = d instanceof e ? d : d ? new e(d) : z.defaultEase;
          return Math.abs(((b - a) * d.getRatio(f)) / c / f);
        }),
        C = (q.calculateTweenDuration = function (a, b, c, f, p, y) {
          "string" === typeof a && (a = z.selector(a));
          if (!a) return 0;
          null == c && (c = 10);
          null == f && (f = 0.2);
          null == p && (p = 1);
          a.length && (a = a[0] || a);
          var h = 0,
            m = 9999999999,
            w = b.throwProps || b;
          b =
            b.ease instanceof e
              ? b.ease
              : b.ease
              ? new e(b.ease)
              : z.defaultEase;
          var x = isNaN(w.checkpoint) ? 0.05 : Number(w.checkpoint),
            A = isNaN(w.resistance)
              ? q.defaultResistance
              : Number(w.resistance),
            u,
            C,
            F;
          if (w.linkedProps) {
            var K = w.linkedProps.split(",");
            var Q = {};
            for (F = 0; F < K.length; F++) {
              var B = K[F];
              if ((u = w[B])) {
                var R =
                  void 0 !== u.velocity && "number" === typeof u.velocity
                    ? Number(u.velocity) || 0
                    : (C = C || L.getByTarget(a)) && C.isTrackingProp(B)
                    ? C.getVelocity(B)
                    : 0;
                var X = isNaN(u.resistance) ? A : Number(u.resistance);
                X = 0 < R * X ? R / X : R / -X;
                var ha =
                  "function" === typeof a[B]
                    ? a[
                        B.indexOf("set") ||
                        "function" !== typeof a["get" + B.substr(3)]
                          ? B
                          : "get" + B.substr(3)
                      ]()
                    : a[B] || 0;
                Q[B] = ha + r(R, b, X, x);
              }
            }
          }
          for (B in w)
            if (
              "resistance" !== B &&
              "checkpoint" !== B &&
              "preventOvershoot" !== B &&
              "linkedProps" !== B &&
              "radius" !== B
            ) {
              u = w[B];
              "object" !== typeof u &&
                ((C = C || L.getByTarget(a)) && C.isTrackingProp(B)
                  ? (u =
                      "number" === typeof u
                        ? { velocity: u }
                        : { velocity: C.getVelocity(B) })
                  : ((R = Number(u) || 0), (X = 0 < R * A ? R / A : R / -A)));
              if ("object" === typeof u) {
                R =
                  void 0 !== u.velocity && "number" === typeof u.velocity
                    ? Number(u.velocity) || 0
                    : (C = C || L.getByTarget(a)) && C.isTrackingProp(B)
                    ? C.getVelocity(B)
                    : 0;
                X = isNaN(u.resistance) ? A : Number(u.resistance);
                X = 0 < R * X ? R / X : R / -X;
                ha =
                  "function" === typeof a[B]
                    ? a[
                        B.indexOf("set") ||
                        "function" !== typeof a["get" + B.substr(3)]
                          ? B
                          : "get" + B.substr(3)
                      ]()
                    : a[B] || 0;
                K = ha + r(R, b, X, x);
                void 0 !== u.end &&
                  ((u = d(u, Q && B in Q ? Q : K, u.max, u.min, B, w.radius)),
                  y || J) &&
                  (w[B] = t(u, w[B], "end"));
                if (void 0 !== u.max && K > Number(u.max) + 1e-10) {
                  var ea = u.unitFactor || q.defaultUnitFactors[B] || 1;
                  ea =
                    (ha > u.max && u.min !== u.max) ||
                    (-15 < R * ea && 45 > R * ea)
                      ? f + 0.1 * (c - f)
                      : N(ha, u.max, R, b, x);
                  ea + p < m && (m = ea + p);
                } else
                  void 0 !== u.min &&
                    K < Number(u.min) - 1e-10 &&
                    ((ea = u.unitFactor || q.defaultUnitFactors[B] || 1),
                    (ea =
                      (ha < u.min && u.min !== u.max) ||
                      (-45 < R * ea && 15 > R * ea)
                        ? f + 0.1 * (c - f)
                        : N(ha, u.min, R, b, x)),
                    ea + p < m && (m = ea + p));
                ea > h && (h = ea);
              }
              X > h && (h = X);
            }
          h > m && (h = m);
          return h > c ? c : h < f ? f : h;
        }),
        b = (q.prototype = new w("throwProps")),
        a,
        f,
        c,
        p;
      b.constructor = q;
      q.version = "0.11.0";
      q.API = 2;
      q._autoCSS = !0;
      q.defaultResistance = 100;
      q.defaultUnitFactors = { time: 1e3, totalTime: 1e3 };
      q.track = function (a, b, c) {
        return L.track(a, b, c);
      };
      q.untrack = function (a, b) {
        L.untrack(a, b);
      };
      q.isTracking = function (a, b) {
        return L.isTracking(a, b);
      };
      q.getVelocity = function (a, b) {
        return (a = L.getByTarget(a)) ? a.getVelocity(b) : NaN;
      };
      q._cssRegister = function () {
        var b = x.com.greensock.plugins.CSSPlugin;
        if (b) {
          b = b._internals;
          var c = b._parseToProxy,
            d = b._setPluginRatio,
            e = b.CSSPropTween;
          b._registerComplexSpecialProp("throwProps", {
            parser: function (b, h, m, p, r, t) {
              t = new q();
              m = {};
              var w = {},
                u = {},
                y = {},
                x = {},
                C = {},
                z;
              f = {};
              for (z in h)
                if (
                  "resistance" !== z &&
                  "preventOvershoot" !== z &&
                  "linkedProps" !== z &&
                  "radius" !== z
                ) {
                  var H = h[z];
                  if ("object" === typeof H) {
                    if (void 0 !== H.velocity && "number" === typeof H.velocity)
                      m[z] = Number(H.velocity) || 0;
                    else {
                      var F = F || L.getByTarget(b);
                      m[z] = F && F.isTrackingProp(z) ? F.getVelocity(z) : 0;
                    }
                    void 0 !== H.end && (y[z] = H.end);
                    void 0 !== H.min && (w[z] = H.min);
                    void 0 !== H.max && (u[z] = H.max);
                    H.preventOvershoot && (C[z] = !0);
                    void 0 !== H.resistance && (x[z] = H.resistance);
                  } else
                    "number" === typeof H
                      ? (m[z] = H)
                      : (F = F || L.getByTarget(b)) && F.isTrackingProp(z)
                      ? (m[z] = F.getVelocity(z))
                      : (m[z] = H || 0);
                  B[z] && p._enableTransforms(2 === B[z]);
                }
              F = c(b, m, p, r, t);
              a = F.proxy;
              m = F.end;
              for (z in a)
                f[z] = {
                  velocity: m[z],
                  min: w[z],
                  max: u[z],
                  end: y[z],
                  resistance: x[z],
                  preventOvershoot: C[z],
                };
              null != h.resistance && (f.resistance = h.resistance);
              null != h.linkedProps && (f.linkedProps = h.linkedProps);
              null != h.radius && (f.radius = h.radius);
              h.preventOvershoot && (f.preventOvershoot = !0);
              r = new e(b, "throwProps", 0, 0, F.pt, 2);
              p._overwriteProps.pop();
              r.plugin = t;
              r.setRatio = d;
              r.data = F;
              t._onInitTween(a, f, p._tween);
              return r;
            },
          });
        }
      };
      q.to = function (b, d, e, q, r) {
        d.throwProps || (d = { throwProps: d });
        0 === r && (d.throwProps.preventOvershoot = !0);
        J = !0;
        var h = new z(b, q || 1, d);
        h.render(0, !0, !0);
        h.vars.css
          ? (h.duration(C(a, { throwProps: f, ease: d.ease }, e, q, r)),
            h._delay && !h.vars.immediateRender
              ? h.invalidate()
              : c._onInitTween(a, p, h))
          : (h.kill(), (h = new z(b, C(b, d, e, q, r), d)));
        J = !1;
        return h;
      };
      b._onInitTween = function (a, b, e, f) {
        this.target = a;
        this._props = [];
        c = this;
        p = b;
        var h = e._ease,
          m = isNaN(b.checkpoint) ? 0.05 : Number(b.checkpoint);
        e = e._duration;
        var q = b.preventOvershoot,
          w = 0,
          u,
          x,
          A;
        if (b.linkedProps) {
          var z = b.linkedProps.split(",");
          var C = {};
          for (x = 0; x < z.length; x++) {
            var B = z[x];
            if ((u = b[B])) {
              var F =
                void 0 !== u.velocity && "number" === typeof u.velocity
                  ? Number(u.velocity) || 0
                  : (A = A || L.getByTarget(a)) && A.isTrackingProp(B)
                  ? A.getVelocity(B)
                  : 0;
              var K =
                "function" === typeof a[B]
                  ? a[
                      B.indexOf("set") ||
                      "function" !== typeof a["get" + B.substr(3)]
                        ? B
                        : "get" + B.substr(3)
                    ]()
                  : a[B] || 0;
              C[B] = K + r(F, h, e, m);
            }
          }
        }
        for (B in b)
          if (
            "resistance" !== B &&
            "checkpoint" !== B &&
            "preventOvershoot" !== B &&
            "linkedProps" !== B &&
            "radius" !== B
          ) {
            u = b[B];
            "function" === typeof u && (u = u(f, a));
            if ("number" === typeof u) F = Number(u) || 0;
            else if ("object" !== typeof u || isNaN(u.velocity))
              if ((A = A || L.getByTarget(a)) && A.isTrackingProp(B))
                F = A.getVelocity(B);
              else
                throw (
                  "ERROR: No velocity was defined in the throwProps tween of " +
                  a +
                  " property: " +
                  B
                );
            else F = Number(u.velocity);
            z = r(F, h, e, m);
            var N = 0;
            K = (F = "function" === typeof a[B])
              ? a[
                  B.indexOf("set") ||
                  "function" !== typeof a["get" + B.substr(3)]
                    ? B
                    : "get" + B.substr(3)
                ]()
              : a[B];
            "object" === typeof u &&
              ((x = K + z),
              void 0 !== u.end &&
                ((u = d(u, C && B in C ? C : x, u.max, u.min, B, b.radius)),
                J && (b[B] = t(u, b[B], "end"))),
              void 0 !== u.max && Number(u.max) < x
                ? q || u.preventOvershoot
                  ? (z = u.max - K)
                  : (N = u.max - K - z)
                : void 0 !== u.min &&
                  Number(u.min) > x &&
                  (q || u.preventOvershoot
                    ? (z = u.min - K)
                    : (N = u.min - K - z)));
            this._overwriteProps[w] = B;
            this._props[w++] = { p: B, s: K, c1: z, c2: N, f: F, r: !1 };
          }
        return !0;
      };
      b._kill = function (a) {
        for (var b = this._props.length; -1 < --b; )
          null != a[this._props[b].p] && this._props.splice(b, 1);
        return w.prototype._kill.call(this, a);
      };
      b._mod = function (a) {
        for (var b = this._props, c = b.length, d; -1 < --c; )
          (d = a[b[c].p] || a.throwProps),
            "function" === typeof d && (b[c].m = d);
      };
      b.setRatio = function (a) {
        for (var b = this._props.length, c, d; -1 < --b; )
          if (
            ((c = this._props[b]),
            (d = c.s + c.c1 * a + c.c2 * a * a),
            c.m
              ? (d = c.m(d, this.target))
              : 1 === a && (d = ((1e4 * d + (0 > d ? -0.5 : 0.5)) | 0) / 1e4),
            c.f)
          )
            this.target[c.p](d);
          else this.target[c.p] = d;
      };
      w.activate([q]);
      return q;
    },
    !0
  );
  _gsScope._gsDefine(
    "utils.VelocityTracker",
    ["TweenLite"],
    function (w) {
      var z,
        e,
        L,
        q = /([A-Z])/g,
        x = {},
        J = _gsScope.document,
        B = {
          x: 1,
          y: 1,
          z: 2,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          rotation: 1,
          rotationZ: 1,
          rotationX: 2,
          rotationY: 2,
          skewX: 1,
          skewY: 1,
          xPercent: 1,
          yPercent: 1,
        },
        F = J.defaultView ? J.defaultView.getComputedStyle : function () {},
        d = function (a, b, c) {
          var d = (a._gsTransform || x)[b];
          if (d || 0 === d) return d;
          a.style[b]
            ? (d = a.style[b])
            : (c = c || F(a, null))
            ? (d =
                c[b] ||
                c.getPropertyValue(b) ||
                c.getPropertyValue(b.replace(q, "-$1").toLowerCase()))
            : a.currentStyle && (d = a.currentStyle[b]);
          return parseFloat(d) || 0;
        },
        t = w.ticker,
        r = function (a, b, c) {
          this.p = a;
          this.f = b;
          this.v1 = this.v2 = 0;
          this.t1 = this.t2 = t.time;
          this.css = !1;
          this.type = "";
          this._prev = null;
          c && ((this._next = c), (c._prev = this));
        },
        N = function () {
          var a = z,
            b = t.time,
            c;
          if (0.03 <= b - L)
            for (L = b; a; ) {
              for (c = a._firstVP; c; ) {
                var e = c.css
                  ? d(a.target, c.p)
                  : c.f
                  ? a.target[c.p]()
                  : a.target[c.p];
                if (e !== c.v1 || 0.15 < b - c.t1)
                  (c.v2 = c.v1), (c.v1 = e), (c.t2 = c.t1), (c.t1 = b);
                c = c._next;
              }
              a = a._next;
            }
        },
        C = function (a) {
          this._lookup = {};
          this.target = a;
          this.elem = a.style && a.nodeType ? !0 : !1;
          e ||
            (t.addEventListener("tick", N, null, !1, -100),
            (L = t.time),
            (e = !0));
          z && ((this._next = z), (z._prev = this));
          z = this;
        },
        b = (C.getByTarget = function (a) {
          for (var b = z; b; ) {
            if (b.target === a) return b;
            b = b._next;
          }
        });
      J = C.prototype;
      J.addProp = function (a, b) {
        if (!this._lookup[a]) {
          var c = this.target,
            e = "function" === typeof c[a],
            f = e ? this._altProp(a) : a,
            m = this._firstVP;
          this._firstVP =
            this._lookup[a] =
            this._lookup[f] =
            m =
              new r(f !== a && 0 === a.indexOf("set") ? f : a, e, m);
          m.css = this.elem && (void 0 !== this.target.style[m.p] || B[m.p]);
          m.css &&
            B[m.p] &&
            !c._gsTransform &&
            w.set(c, { x: "+\x3d0", overwrite: !1 });
          m.type = b || (m.css && 0 === a.indexOf("rotation")) ? "deg" : "";
          m.v1 = m.v2 = m.css ? d(c, m.p) : e ? c[m.p]() : c[m.p];
        }
      };
      J.removeProp = function (a) {
        var b = this._lookup[a];
        b &&
          (b._prev
            ? (b._prev._next = b._next)
            : b === this._firstVP && (this._firstVP = b._next),
          b._next && (b._next._prev = b._prev),
          (this._lookup[a] = 0),
          b.f && (this._lookup[this._altProp(a)] = 0));
      };
      J.isTrackingProp = function (a) {
        return this._lookup[a] instanceof r;
      };
      J.getVelocity = function (a) {
        var b = this._lookup[a],
          c = this.target;
        if (!b) throw "The velocity of " + a + " is not being tracked.";
        a = (b.css ? d(c, b.p) : b.f ? c[b.p]() : c[b.p]) - b.v2;
        if ("rad" === b.type || "deg" === b.type)
          (c = "rad" === b.type ? 2 * Math.PI : 360),
            (a %= c),
            a !== a % (c / 2) && (a = 0 > a ? a + c : a - c);
        return a / (t.time - b.t2);
      };
      J._altProp = function (a) {
        var b = a.substr(0, 3);
        b = ("get" === b ? "set" : "set" === b ? "get" : b) + a.substr(3);
        return "function" === typeof this.target[b] ? b : a;
      };
      C.getByTarget = function (a) {
        var b = z;
        "string" === typeof a && (a = w.selector(a));
        for (
          a.length &&
          a !== window &&
          a[0] &&
          a[0].style &&
          !a.nodeType &&
          (a = a[0]);
          b;

        ) {
          if (b.target === a) return b;
          b = b._next;
        }
      };
      C.track = function (a, d, c) {
        var e = b(a);
        d = d.split(",");
        var f = d.length;
        c = (c || "").split(",");
        for (e || (e = new C(a)); -1 < --f; ) e.addProp(d[f], c[f] || c[0]);
        return e;
      };
      C.untrack = function (a, d) {
        a = b(a);
        var c = (d || "").split(","),
          e = c.length;
        if (a) {
          for (; -1 < --e; ) a.removeProp(c[e]);
          (a._firstVP && d) ||
            (a._prev ? (a._prev._next = a._next) : a === z && (z = a._next),
            a._next && (a._next._prev = a._prev));
        }
      };
      C.isTracking = function (a, d) {
        return (a = b(a)) ? (!d && a._firstVP ? !0 : a.isTrackingProp(d)) : !1;
      };
      return C;
    },
    !0
  );
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()();
(function (w) {
  var z = function () {
    return (_gsScope.GreenSockGlobals || _gsScope)[w];
  };
  "function" === typeof define && define.amd
    ? define(["./TweenLite"], z)
    : "undefined" !== typeof module &&
      module.exports &&
      (require("./TweenLite.js"), (module.exports = z()));
})("ThrowPropsPlugin");
