! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    t.m = e, t.c = n, t.i = function(e) {
        return e
    }, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "/audio/dist/", t(t.s = 5)
}({
    5: function(e, t) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function r(e) {
            var t = o[e];
            t && (s.disconnect(t.source), t.stream.getTracks()[0].stop(), delete o[e], chrome.tabs.query({
                currentWindow: !0,
                active: !0
            }, function(t) {
                t[0].id === e && chrome.runtime.sendMessage({
                    type: "disable"
                })
            }))
        }
        var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            a = function() {
                function e(t) {
                    n(this, e), this.context = new AudioContext, this.opts = {
                        frequencies: [32, 64, 125, 250, 500, 1e3, 2e3, 4e3, 8e3, 16e3],
                        filter: {
                            Q: 1.4,
                            gain: 0
                        },
                        effects: {
                            reset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
							bass: [5.4, 9, 9, 5.5, 1, 0.5, 0, 2, 3.5, 7.7],
                            electronic: [4, 3.5, 1, 0, -2, 2, .5, 1, 4, 5],
                            classic: [4.5, 3.5, 3, 2.5, -2, -1.5, 0, 2, 3.5, 4],
                            jazz: [4, 3, 1, 2, -2, -2, 0, 1.5, 3, 3.5],
                            pop: [-2, -1, 0, 2, 4, 4, 2, 0, -1.5, -2],
                            voice: [-2, -3.5, -3, 1, 3.5, 3.5, 3, 1.5, .5, -2],
                            dance: [3.5, 6.5, 5, 0, 2, 3.5, 5, 4, 3.5, 0],
                            rock: [5, 4, 3, 1.5, -.5, -1.5, .5, 2.5, 3.5, 4.5]
                        }
                    };
                    var r = [],
                        i = {},
                        a = null;
                    this.preGain = this.context.createGain(), this.output = this.context.destination;
                    var o = !0,
                        s = !1,
                        c = void 0;
                    try {
                        for (var u, l = this.opts.frequencies[Symbol.iterator](); !(o = (u = l.next()).done); o = !0) {
                            var f = u.value,
                                d = this.context.createBiquadFilter();
                            d.type = d.PEAKING || "peaking", d.Q.value = this.opts.filter.Q, d.gain.value = this.opts.filter.gain, d.frequency.value = f, r.push(d), i[f] = d, a ? a.connect(d) : this.preGain.connect(d), a = d
                        }
                    } catch (e) {
                        s = !0, c = e
                    } finally {
                        try {
                            !o && l.return && l.return()
                        } finally {
                            if (s) throw c
                        }
                    }
                    a.connect(this.output), this.filters = r, this.filtersMap = i, this.lastFilter = a
                }
                return i(e, [{
                    key: "connect",
                    value: function(e) {
                        var t = this.context.createMediaStreamSource(e);
                        return t.connect(this.preGain), t
                    }
                }, {
                    key: "disconnect",
                    value: function(e) {
                        e.disconnect()
                    }
                }, {
                    key: "setEffect",
                    value: function(e, t) {
                        for (var n = this.opts.effects, r = n[e] || n.reset, i = 0; i < this.filters.length; i++) {
                            this.filters[i].gain.value = r[i]
                        }
                        return t && t(r)
                    }
                }, {
                    key: "setEffectValue",
                    value: function(e) {//console.log(e);
                        for (var t = 0; t < this.filters.length; t++) {
                            this.filters[t].gain.value = e[t]
                        }
                    }
                }, {
                    key: "setPreGainValue",
                    value: function(e) {
                        return e = Number(e), (-12 > e || e > 12) && (e = 0), this.preGain.gain.value = Math.pow(10, e / 12)
                    }
                }, {
                    key: "setFilterValue",
                    value: function(e, t) {
                        (-12 > t || t > 12) && (t = 0);
                        var n = this.filtersMap[e];
                        if (n) return n.gain.value = t
                    }
                }]), e
            }(),
            o = {},
            s = new a;
        chrome.runtime.onMessage.addListener(function(e, t, n) {
            "enableEQ" === e.type && chrome.tabs.query({
                currentWindow: !0,
                active: !0
            }, function(t) {
                var n = t[0];
                if (o[n.id]) return s.setEffectValue(e.effect), void s.setPreGainValue(e.pre);
                chrome.tabCapture.capture({
                    audio: !0
                }, function(t) {
                    var r = s.connect(t);
                    s.setEffectValue(e.effect), s.setPreGainValue(e.pre), o[n.id] = {
                        stream: t,
                        source: r,
                        url: n.url,
                        title: n.title,
                        icon: n.favIconUrl
                    }, chrome.runtime.sendMessage({
                        type: "list",
                        body: o
                    })
                }), chrome.runtime.sendMessage({
                    type: "enabled"
                })
            }), "disable" === e.type && chrome.tabs.query({
                currentWindow: !0,
                active: !0
            }, function(e) {
                r(e[0].id)
            }), "disableById" === e.type && r(e.tabId), "status" === e.type && chrome.tabs.query({
                currentWindow: !0,
                active: !0
            }, function(e) {
                var t = e[0];
                o[t.id] ? chrome.runtime.sendMessage({
                    type: "enabled"
                }) : chrome.runtime.sendMessage({
                    type: "disable"
                }), chrome.runtime.sendMessage({
                    type: "list",
                    body: o
                })
            }),//near end of chrome.runtime.onmessage
			onMsg(e);
        }), chrome.tabCapture.onStatusChanged.addListener(function(e) {
			//console.log(e);
            "active" == e.status || "stopped" != e.status && "error" != e.status || (delete o[e.tabId], chrome.runtime.sendMessage({
                type: "list",
                body: o
            }))
        }), chrome.tabs.onUpdated.addListener(function(e, t, n) {
            var r = o[e];
            r && (r.url = n.url, r.title = n.title, r.icon = n.favIconUrl), chrome.runtime.sendMessage({
                type: "list",
                body: o
            })
        }), chrome.tabs.onRemoved.addListener(function(e) {
            r(e)
        })
    }
});