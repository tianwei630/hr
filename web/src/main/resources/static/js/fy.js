/**
	updated 2014-05-04 by Lyu
**/
function Boxy(e, t) {
	this.boxy = jQuery(Boxy.WRAPPER).attr("id", "boxy_" + Math.random()), jQuery.data(this.boxy[0], "boxy", this), this.visible = !1, this.options = jQuery.extend({}, Boxy.DEFAULTS, t || {}), this.options.actuator && jQuery.data(this.options.actuator, "active.boxy", this), e = $(e || "<div></div>"), this.setContent(e), this._setupTitleBar(), this.boxy.css("display", "none").appendTo(document.body), this.toTop(), e = jQuery(e).eq(0);
	var n = jQuery(window).height() - 125;
	n < e.outerHeight(!0) && e.height(n), this.options.fixed && (Boxy.IE6 ? this.options.fixed = !1 : this.boxy.addClass("fixed")), this.options.center && Boxy._u(this.options.x, this.options.y) ? this.center() : this.moveTo(Boxy._u(this.options.x) ? Boxy.DEFAULT_X : this.options.x, Boxy._u(this.options.y) ? Boxy.DEFAULT_Y : this.options.y), this.options.show && this.show()
}(function(e, t, n) {
	var r = e.document,
		i = e.location,
		s = function(e) {
			var r = function(e) {
					return new r.fn.init(e)
				};
			r.fn = r.prototype = {
				init: function(n) {
					this.jq = n instanceof e ? n : t(n)
				}
			}, r.fn.__defined = {};
			var i = function(e, t) {
					e.parent ? (e.parent instanceof Array || (e.parent = [e.parent]), e.parent.push(t)) : e.parent = t;
					var n = t.prototype,
						r = e.prototype,
						i;
					for (i in n) i in r || (r[i] = n[i])
				};
			return r.register = function(e, t, s) {
				if (e in r.fn.init.prototype) throw new Error("[" + e + "] registered failed: The same name is used by another component!");
				t.prototype.define = e, t.prototype.getDefine = function() {
					return t
				}, t.prototype.extra = function(e, t) {
					var r;
					for (r in e) if (this[r] === n || t) this[r] = e[r];
					return this
				}, r.fn.__defined[e] = t;
				if (s) for (var o = 2, u = arguments.length; o < u; o++) {
					if (!r.fn.__defined[arguments[o]]) throw new Error("Super Class [" + arguments[o] + "] Not Found!");
					i(t, r.fn.__defined[arguments[o]])
				}
				r.fn.init.prototype[e] = function(e, n, r) {
					return new t(this.jq, e, n, r)
				}
			}, r
		}(t);
	e.fy = s
})(window, jQuery), function(window, $, fy, undefined) {
	function makeParam(e, t, n) {
		var r = this,
			i = function(n) {
				n.error ? srvFn.prototype.handleError.call(r, n.error) : typeof e == "function" ? e(n) : t(n)
			},
			s = t ? e : null,
			o = typeof n == "string" ? n : typeof t == "string" ? t : undefined;
		return [this.url, s, i, o]
	}
	fy.EMPTY_FN = function() {}, fy.PREVENT_FN = function() {
		return !1
	};
	var srvFn = function(e) {
			this.url = fy.serverRootPath + e.replace(/^['/']/, "")
		};
	srvFn.prototype = {
		handleError: function(e) {
			if (typeof this.onError == "function") this.onError(e);
			else if (typeof fy.onAjaxError == "function") {
				if (fy.server.isLocal) {
					var t = this.url.split("actionCode=");
					t.length > 1 ? t = t[1].split("&")[0] : t = !1, t && (e = "[code]: <b>" + t + "</b>, <br>" + e)
				}
				fy.onAjaxError.call(this, e)
			}
		},
		toString: function() {
			return this.url
		},
		getJSON: function(e, t) {
			return $.getJSON.apply(this, makeParam.call(this, e, t, "json"))
		},
		get: function(e, t, n) {
			return $.get.apply(this, makeParam.call(this, e, t, n))
		},
		post: function(e, t, n) {
			return $.post.apply(this, makeParam.call(this, e, t, n))
		}
	}, fy.server = function(e, t) {
		return e && fy.server.add(e, t), fy.server
	}, fy.server.add = function(e, t) {
		var n = fy.server,
			r = !t;
		if (typeof e == "string" && typeof t == "string") {
			var i = e;
			e = {}, e[i] = t, r = !0
		}
		for (var s in e) s in n && r || (n[s] = new srvFn(e[s]));
		return n
	}, fy.server.isLocal = location.hostname.indexOf("127.0.0.1") > -1 || location.hostname.indexOf("localhost") > -1, fy.server.isLAN = location.hostname.split(".")[0] in {
		192: 1,
		172: 1,
		10: 1
	} || fy.server.isLocal, fy.serverRootPath = "/", fy.onAjaxError = function(e) {
		fy.alert(e.toString())
	}, window.log = function(debug) {
		if (debug) if (!window.console) {
			document.write('<div id="fylogTracer001"></div>');
			var e = document.getElementById("fylogTracer001");
			window.log = function() {
				e.scrollHeight > 600 ? e.innerHTML = "" : e.innerHTML += "<p>";
				for (var t = 0, n = arguments.length; t < n; t++) e.innerHTML += (JSON.stringify(arguments[t]) || arguments[t]) + " "
			}
		} else {
			function mkArg(e) {
				var t = [];
				while (e--) t[e] = e;
				return "arguments[" + t.join("],arguments[") + "]"
			}
			window.log = function() {
				eval("console.log(" + mkArg(arguments.length) + ")")
			}, window.log.error = function() {
				eval("console.error(" + mkArg(arguments.length) + ")")
			}, window.log.warn = function() {
				eval("console.warn(" + mkArg(arguments.length) + ")")
			}
		} else window.log = function() {}, window.log.warn = window.log.error = fy.EMPTY_FN
	}, fy.formatString = function(e, t) {
		return arguments.length == 1 ?
		function() {
			var t = $.makeArray(arguments);
			return t.unshift(e), $.validator.format.apply(this, t)
		} : (arguments.length > 2 && t.constructor != Array && (t = $.makeArray(arguments).slice(1)), t.constructor != Array && (t = [t]), $.each(t, function(t, n) {
			e = e.replace(new RegExp("\\{" + t + "\\}", "g"), n)
		}), e)
	}, fy.formatJSON = function() {
		var e = /\{(\w*[:]*[=]*\w+)\}(?!})/g;
		return function(t, n) {
			return t.replace(e, function(e, t, r) {
				return n[t]
			})
		}
	}(), fy.cookie = function(e, t, n) {
		if (typeof t == "undefined") {
			var a = null;
			if (document.cookie && document.cookie != "") {
				var f = document.cookie.split(";");
				for (var l = 0; l < f.length; l++) {
					var c = jQuery.trim(f[l]);
					if (c.substring(0, e.length + 1) == e + "=") {
						try {
							a = decodeURIComponent(c.substring(e.length + 1))
						} catch (h) {
							a = c.substring(e.length + 1)
						}
						break
					}
				}
			}
			if (jQuery.evalJSON && a && a.match(/^\s*\{/)) try {
				a = jQuery.evalJSON(a)
			} catch (h) {}
			return a
		}
		n = n || {}, t === null && (t = "", n.expires = -1), typeof t == "object" && JSON.stringify && (t = JSON.stringify(t));
		var r = "";
		if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
			var i;
			typeof n.expires == "number" ? (i = new Date, i.setTime(i.getTime() + n.expires * 24 * 60 * 60 * 1e3)) : i = n.expires, r = "; expires=" + i.toUTCString()
		}
		var s = n.path ? "; path=" + n.path : "",
			o = n.domain ? "; domain=" + n.domain : "",
			u = n.secure ? "; secure" : "";
		document.cookie = [e, "=", encodeURIComponent(t), r, s, o, u].join("")
	}, fy.request = function() {
		var e = {},
			t = window.location,
			n = t.search.replace(/^\?/, "").split("&"),
			r = n.length,
			i = 0,
			s;
		for (; i < r; i++) {
			if (!n[i]) continue;
			s = n[i].split("=");
			try {
				e[s[0]] = decodeURI(s[1])
			} catch (o) {
				e[s[0]] = s[1]
			}
		}
		return e
	}(), fy.padLeft = function(e, t, n) {
		var r = e.toString(),
			i = r.length,
			s = n || "0";
		return t > i && (r = (new Array(t - i + 1)).join(s.toString()) + r), r
	}, fy.addSeconds = function(e, t) {
		return new Date(e.getTime() + t * 1e3)
	}, fy.addDays = function(e, t) {
		return new Date(e.getTime() + t * 24 * 3600 * 1e3)
	}, fy.daySpan = function(e, t) {
		return Math.round((e.valueOf() - t.valueOf()) / 864e5)
	}, fy.weekSpan = function(e, t) {
		var n = fy.daySpan(e, t);
		return Math.ceil((n + t.getDay()) / 7)
	}, fy.formatDate = function(e, t) {
		var n = t || "yyyy-MM-dd",
			r = {
				"M+": e.getMonth() + 1,
				"d+": e.getDate(),
				"h+": e.getHours(),
				"m+": e.getMinutes(),
				"s+": e.getSeconds(),
				"q+": Math.floor((e.getMonth() + 3) / 3),
				S: e.getMilliseconds()
			};
		/(y+)/.test(n) && (n = n.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (var i in r)(new RegExp("(" + i + ")")).test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? r[i] : ("00" + r[i]).substr(("" + r[i]).length)));
		return n
	}, fy.parseDate = function(e, t) {
		var n = t || "yyyy-mm-dd",
			r = e.match(/(\d+)/g),
			i = 0,
			s = {};
		return n.toLowerCase().replace(/(yyyy|dd|mm)/g, function(e) {
			s[e] = i++
		}), new Date(r[s.yyyy], r[s.mm] - 1, r[s.dd])
	};
	var number_format = fy.formatNumber = function(e, t, n, r) {
			var i = e,
				s = isNaN(t = Math.abs(t)) ? 2 : t,
				o = n == undefined ? "." : n,
				u = r == undefined ? "," : r,
				a = i < 0 ? "-" : "",
				f = parseInt(i = Math.abs(+i || 0).toFixed(s)) + "",
				l = (l = f.length) > 3 ? l % 3 : 0,
				c = a + (l ? f.substr(0, l) + u : "") + f.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + u) + (s ? o + Math.abs(i - f).toFixed(s).slice(2) : "");
			return parseFloat(c, 10)
		};
	fy.formatFilesize = function(e) {
		return e >= 1073741824 ? e = number_format(e / 1073741824, 2, ".", ",") + " GB" : e >= 1048576 ? e = number_format(e / 1048576, 2, ".", "") + " MB" : e >= 1024 ? e = number_format(e / 1024, 0) + " KB" : e = number_format(e, 0) + " bytes", e
	}, fy.timeStamp = function() {
		var e = new Date,
			t = new Date(2012, 11, 22);
		return (e.valueOf() - t.valueOf()).toString()
	}, fy.random = function(e) {
		return (Math.random() * Math.random()).toString().substr(2, e || 9)
	}, fy.uuid = function() {
		var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		return function(t, n) {
			var r = e,
				i = [];
			n = n || r.length;
			if (t) for (var s = 0; s < t; s++) i[s] = r[0 | Math.random() * n];
			else {
				var o;
				i[8] = i[13] = i[18] = i[23] = "-", i[14] = "4";
				for (var s = 0; s < 36; s++) i[s] || (o = 0 | Math.random() * 16, i[s] = r[s == 19 ? o & 3 | 8 : o])
			}
			return i.join("")
		}
	}(), fy.convertImageToBase64 = function(e) {
		var t = document.createElement("canvas");
		t.width = e.width, t.height = e.height;
		var n = t.getContext("2d");
		n.drawImage(e, 0, 0);
		var r = t.toDataURL("image/png");
		return r.replace(/^data:image\/(png|jpg);base64,/, "")
	}, fy.preloadImage = function(e, t, n) {
		var r = new Image;
		r.onload = function() {
			r.onload = null, typeof t == "function" && t(r), r = null
		}, r.onerror = function() {
			r.onerror = null, r = null, typeof n == "function" && n()
		}, r.src = e
	}, fy.loadFile = function(e, t, n, r) {
		n = n || fy.EMPTY_FN, r = r || fy.EMPTY_FN;
		var s;
		if (t === "js") {
			var o = document.getElementsByTagName("script");
			for (i = 0; i < o.length; i++) if (o[i].src && o[i].src.indexOf(e) != -1) return n();
			s = document.createElement("script"), document.getElementsByTagName("head")[0].appendChild(s), s.setAttribute("type", "text/javascript"), s.setAttribute("src", e)
		} else t === "css" && (document.createStyleSheet ? s = document.createStyleSheet(e) : (s = document.createElement("link"), document.getElementsByTagName("head")[0].appendChild(s), s.setAttribute("rel", "stylesheet"), s.setAttribute("type", "text/css"), s.setAttribute("href", e)));
		return s.onload = s.onreadystatechange = function() {
			if (this.readyState && this.readyState == "loading") return;
			n(), n = null
		}, s.onerror = function() {
			document.getElementsByTagName("head")[0].removeChild(s), r(), r = null
		}, s
	}, fy.removeFile = function(e, t) {
		var n = t == "js" ? "script" : t == "css" ? "link" : "none",
			r = t == "js" ? "src" : t == "css" ? "href" : "none",
			i = document.getElementsByTagName(n);
		for (var s = i.length; s >= 0; s--) i[s] && i[s].getAttribute(r) != null && i[s].getAttribute(r).indexOf(e) != -1 && i[s].parentNode.removeChild(i[s])
	}, fy.HTML = {
		encode: function(e) {
			var t = document.createElement("div");
			t.innerText ? t.innerText = e : t.textContent = e;
			var n = t.innerHTML;
			return t = null, n
		},
		decode: function(e) {
			var t = document.createElement("div");
			t.innerHTML = e;
			var n = t.innerText || t.textContent;
			return t = null, n
		},
		desEncode: function(e) {
			var t = [];
			for (var n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
			return "&#" + t.join(";&#") + ";"
		},
		hexEncode: function(e) {
			var t = [];
			for (var n = 0; n < e.length; n++) t[n] = e.charCodeAt(n).toString(16);
			return "&#x" + t.join(";&#x") + ";"
		},
		encodeSBC: function(e) {
			var t = "",
				n;
			for (var r = 0; r < e.length; r++) n = e.charCodeAt(r), t += n < 32 || n == 38 || n > 127 ? "&#" + n + ";" : e.charAt(r);
			return t
		},
		desHexDecode: function(e) {
			return e.replace(/&#(x)?([^&]{1,5});?/g, function(e, t, n) {
				return String.fromCharCode(parseInt(n, t ? 16 : 10))
			})
		},
		toDBC: function(e) {
			var t = "",
				n;
			for (var r = 0; r < e.length; r++) n = e.charCodeAt(r), n >= 65281 && n <= 65374 ? t += String.fromCharCode(n - 65248) : n == 12288 ? t += String.fromCharCode(32) : t += e.charAt(r);
			return t
		},
		toSBC: function(e) {
			var t = "",
				n;
			for (var r = 0; r < e.length; r++) n = e.charCodeAt(r), n >= 33 && n <= 126 ? t += String.fromCharCode(n + 65248) : n == 32 ? t += String.fromCharCode(12288) : t += e.charAt(r);
			return t
		},
		toUTF8: function(e) {
			if (typeof e != "string") throw new TypeError("toUTF8 function only accept a string as its parameter.");
			var t = [],
				n, r, i, s = 0;
			for (var o = 0, u = e.length; o < u; o++) {
				s = e.charCodeAt(o);
				if (s > 65535) throw new Error("InvalidCharacterError");
				s > 128 ? s < 2047 ? (n = String.fromCharCode(s >>> 6 | 192), r = String.fromCharCode(s & 63 | 128), t.push(n, r)) : (n = String.fromCharCode(s >>> 12 | 224), r = String.fromCharCode(s >>> 6 & 63 | 128), i = String.fromCharCode(s & 63 | 128), t.push(n, r, i)) : t.push(e[o])
			}
			return t.join("")
		},
		fromUTF8: function(e) {
			if (typeof e != "string") throw new TypeError("fromUTF8 function only accept a string as its parameter.");
			if (/[^ -ï]/.test(e)) throw new Error("InvalidCharacterError");
			var t = [],
				n = 0,
				r = 0;
			for (var i = 0, s = e.length; i < s;) n = e.charCodeAt(i++), n > 224 ? (r = (n & 15) << 12, n = e.charCodeAt(i++), r |= (n & 63) << 6, n = e.charCodeAt(i++), r |= n & 63, t.push(String.fromCharCode(r))) : n > 192 ? (r = (n & 31) << 6, n = e.charCodeAt(i++), r |= (n & 63) << 6, t.push(String.fromCharCode(r))) : n > 128 || t.push(e[i]);
			return t.join("")
		}
	};
	var Validate = {};
	Validate.isset = function(e) {
		return !!e
	}, Validate.empty = function(e) {
		return String(e).replace(/\s+/g, "").length == 0
	}, Validate.required = function(e) {
		return !Validate.empty(e)
	}, Validate.email = function(e) {
		return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(e)
	}, Validate.url = function(e) {
		return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i.test(e)
	}, Validate.date = function(e, t) {
		var n = Date.parse(e);
		if (isFinite(n)) return !0;
		if (t) {
			var r = new Date;
			return e = e.replace(/\d{4}/, r.getFullYear()), n = Date.parse(e), isFinite(n)
		}
		return !1
	}, Validate.time = function(e) {
		var t = new RegExp("^/[0-2]{1}/[0-6]{1}:/[0-5]{1}/[0-9]{1}:/[0-5]{1}/[0-9]{1}");
		return t.test(e)
	}, Validate.zip = function(e, t) {
		var n = t ? /^\d{5}-\d{4}$/ : /^\d{5}$/;
		return n.test(e)
	}, Validate.phone = function(e) {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(e)
	}, Validate.integer = function(e) {
		return /^\-?\d+$/.test(e)
	}, Validate.numeric = function(e) {
		return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
	}, Validate.currency = function(e, t) {
		return /^\$-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
	}, Validate.ip = function(e) {
		return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/.test(e)
	}, Validate.ssn = function(e) {
		return /^\d{3}-\d{2}-\d{4}$/.test(e)
	}, Validate.tin = function(e) {
		return /^\d{2}-\d{7}$/.test(e)
	}, Validate.base64 = function(e) {
		return /[^a-zA-Z0-9\/\+=]/i.test(e)
	}, Validate.alpha = function(e) {
		return /^[a-z]$/i.test(e)
	}, Validate.alphaNumeric = function(e) {
		return /^[a-z0-9]$/i.test(e)
	}, Validate.lowercase = function(e) {
		return e.toLowerCase() == e
	}, Validate.uppercase = function(e) {
		return e.toUpperCase() == e
	}, Validate.minlength = function(e, t) {
		return e.length >= t
	}, Validate.maxlength = function(e, t) {
		return e.length <= t
	}, Validate.between = function(e, t, n) {
		return e.length >= t && e.length <= n
	}, fy.validates = Validate, fy.sortOn = function(e, t, n) {
		if (n && typeof n == "function") return e.sort(n);
		var r = Array.prototype.slice.call(e, 0);
		return arguments.length ? r.sort(function(e, n) {
			var r = e[t],
				i = isNaN(r),
				s = n[t],
				o = isNaN(s);
			return i && o ? r === "" ? -1 : s === "" ? 1 : r === s ? 0 : r > s ? 1 : -1 : i ? -1 : o ? 1 : r === s ? 0 : r > s ? 1 : -1
		}) : r.sort()
	}, fy.is = {
		types: ["Array", "RegExp", "Date", "Number", "String", "Object", "HTMLDocument"]
	};
	for (var i = 0, c; c = fy.is.types[i++];) fy.is[c] = function(e) {
		return function(t) {
			return Object.prototype.toString.call(t) == "[object " + e + "]"
		}
	}(c);
	fy.setLanguage = function(e, t) {
		var n, r = window.document;
		if (t === undefined) {
			var i;
			for (i in e) {
				var s = i.indexOf("::");
				if (s !== -1) {
					var o = i.substr(0, s),
						u = i.substr(s + 2);
					n = $(u, "#" + o);
					for (var a = 0, f = n.length; a < f; a++) {
						var l = n[a];
						l.innerText ? l.innerText = e[i][a] : l.textContent = e[i][a]
					}
				} else {
					s = i.indexOf("@");
					if (s > -1) {
						var o = i.substr(0, s),
							c = i.substr(++s);
						$("#" + o).attr(c, e[i])
					} else n = r.getElementById(i), n && $(n).html(e[i])
				}
			}
		} else {
			var h;
			for (var p = 1, d = arguments.length; p < d; p++) h = arguments[p], n = r.getElementById(h), n && e[h] && $(n).html(e[h])
		}
		return fy
	}, fy.thread = function(e, t) {
		function a() {
			var t = i || !1,
				n = r.caller,
				f = r.stepLength;
			r.onProgress && r.onProgress.call(n, u, e);
			for (var l = 0; l < f; l++) {
				if (u === s) {
					r.onComplete && r.onComplete.call(n, e), r = i = e = u = f = t = n = null;
					return
				}++u, t && t.call(n, u, e[u], e)
			}
			o = setTimeout(a, 0)
		}
		var n = {
			startIndex: 0,
			caller: window,
			itemRender: null,
			stepLength: 5e3,
			onStart: null,
			onProgress: null,
			onComplete: null
		},
			r = $.extend(n, t),
			i = r.itemRender,
			s = e.length,
			o = 0,
			u = 0;
		r.onStart && r.onStart.call(r.caller, e), a(r.startIndex, r.stepLength)
	}, fy.benchMark = function(e, t, n) {
		function u() {
			var t = new Date,
				n = 0;
			for (; n < r; n++) e();
			return (new Date).getTime() - t.getTime()
		}
		var r = t || 5e3,
			i = n || 1;
		if (i === 1) return u();
		var s = 0;
		for (var o = 0; o < i; o++) s += u();
		return s / i
	}, fy.delayExecute = function(e, t, n) {
		var r = n || 100,
			i = window.setInterval(function() {
				e() && (window.clearInterval(i), t())
			}, r)
	}, fy.timerManager = {
		interval: 0,
		timer: {},
		has: function(e) {
			return e in this.timer
		},
		add: function(e) {
			if (this.timer[e.id]) throw new Error("id conflict");
			return e.stamp = (new Date).getTime(), this.timer[e.id] = e, this
		},
		remove: function(e) {
			var t;
			return typeof e == "string" ? t = e : e.id && (t = e.id), this.timer[t] && delete this.timer[t], this
		},
		trigger: function() {
			var e = fy.timerManager.timer,
				t, n, r = (new Date).getTime();
			for (t in e) n = e[t], r - n.stamp >= n.timeOut && (n.stamp = r, n.fn());
			return this
		},
		run: function(e) {
			return this.interval && this.stop(), this.interval = setInterval(fy.timerManager.trigger, e || 1e3), this
		},
		stop: function() {
			return this.interval && (clearInterval(this.interval), this.interval = 0), this
		}
	};
	var pfx = ["", "webkit", "ms", "moz", "o"];
	fy.runPrefixMethod = function(e, t) {
		var n = 0,
			r, i;
		while (n < pfx.length && !e[r]) {
			r = t, pfx[n] === "" && (r = r.substr(0, 1).toLowerCase() + r.substr(1)), r = pfx[n] + r, i = typeof e[r];
			if (i != "undefined") return pfx = [pfx[n]], i === "function" ? e[r]() : e[r];
			n++
		}
		return !1
	};
	var TAGNAMES = {
		select: "input",
		change: "input",
		submit: "form",
		reset: "form",
		error: "img",
		load: "img",
		abort: "img"
	};
	fy.isEventSupported = function(t, n) {
		n = n || document.createElement(TAGNAMES[t] || "div"), t = "on" + t;
		var r = t in n;
		return r || (n.setAttribute || (n = document.createElement("div")), n.setAttribute && n.removeAttribute && (n.setAttribute(t, ""), r = typeof n[t] == "function", typeof n[t] != "undefined" && (n[t] = void 0), n.removeAttribute(t))), n = null, r
	};
	var matched = function(e) {
			e = e.toLowerCase();
			var t = /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
				n = /(ipad)/.exec(e) || /(iphone)/.exec(e) || /(android)/.exec(e) || /(windows phone)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/i.exec(e) || [];
			return {
				browser: t[3] || t[1] || "",
				version: t[2] || "0",
				platform: n[0] || ""
			}
		}(window.navigator.userAgent),
		browser = {};
	matched.browser && (browser[matched.browser] = !0, browser.version = matched.version, browser.versionNumber = parseInt(matched.version, 10)), matched.platform && (browser[matched.platform] = !0);
	if (browser.chrome || browser.opr || browser.safari) browser.webkit = !0;
	if (browser.rv) {
		var ie = "msie";
		matched.browser = ie, browser[ie] = !0
	}
	if (browser.opr) {
		var opera = "opera";
		matched.browser = opera, browser[opera] = !0
	}
	if (browser.safari && browser.android) {
		var android = "android";
		matched.browser = android, browser[android] = !0
	}
	browser.name = matched.browser, browser.platform = matched.platform, browser.touchable = fy.isEventSupported("touchstart", document), fy.browser = browser, $.browser = fy.browser, fy.deepClone = function(e) {
		return JSON.parse(JSON.stringify(e))
	}, fy.select = function(e) {
		var t;
		if (fy.browser.msie) e.createTextRange ? t = e.createTextRange() : (t = document.body.createTextRange(), t.collapse(), t.moveToElementText(e)), t.moveEnd("character", 0), t.moveStart("character", -1), t.select();
		else if (e.setSelectionRange) e.focus(), e.select();
		else {
			var n = window.getSelection();
			n.setBaseAndExtent(e, 0, e, 1)
		}
	}, fy.cutChars = function(e, t) {
		var n = e.length;
		if (n * 2 <= t) return e;
		for (var r = 0, i = 0; r < n; r++) if (e.charCodeAt(r) > 256) {
			i += 2;
			if (i > t) return e.substring(0, r - 1) + "…"
		} else {
			i++;
			if (i > t) return e.substring(0, r - 2) + "…"
		}
		return e
	}, fy.calc = {
		add: function(e, t) {
			e = e.toString(), t = t.toString();
			var n = e.split("."),
				r = t.split("."),
				i = n.length == 2 ? n[1] : "",
				s = r.length == 2 ? r[1] : "",
				o = Math.max(i.length, s.length),
				u = Math.pow(10, o),
				a = Number(((e * u + t * u) / u).toFixed(o)),
				f = arguments[2];
			return typeof f == "number" ? Number(a.toFixed(f)) : a
		},
		sub: function(e, t) {
			return Calc.Add(e, -Number(t), arguments[2])
		},
		mul: function(e, t) {
			var n = e.toString(),
				r = t.toString(),
				i, s, o = arguments[2];
			return i = (n.split(".")[1] ? n.split(".")[1].length : 0) + (r.split(".")[1] ? r.split(".")[1].length : 0), s = Number(n.replace(".", "")) * Number(r.replace(".", "")) / Math.pow(10, i), typeof o != "number" ? Number(s) : Number(s.toFixed(parseInt(o)))
		},
		div: function(e, t) {
			var n = e.toString(),
				r = t.toString(),
				i, s, o = arguments[2];
			return i = (r.split(".")[1] ? r.split(".")[1].length : 0) - (n.split(".")[1] ? n.split(".")[1].length : 0), s = Number(n.replace(".", "")) / Number(r.replace(".", "")) * Math.pow(10, i), typeof o != "number" ? Number(s) : Number(s.toFixed(parseInt(o)))
		}
	}
}(window, jQuery, fy), function(e) {
	jQuery.fn.clone = function() {
		var t = e.apply(this, arguments),
			n = this.find("textarea").add(this.filter("textarea")),
			r = t.find("textarea").add(t.filter("textarea")),
			i = this.find("select").add(this.filter("select")),
			s = t.find("select").add(t.filter("select"));
		for (var o = 0, u = n.length; o < u; ++o) $(r[o]).val($(n[o]).val());
		for (var o = 0, u = i.length; o < u; ++o) s[o].selectedIndex = i[o].selectedIndex;
		return t
	}
}(jQuery.fn.clone), function(e) {
	e.fn.extend({
		syncCheckBoxGroup: function(t, n) {
			var r = $(this);
			return e(n || document).on("change", t, function() {
				var i = e(t, n || document),
					s = i.length;
				r.prop("checked", i.filter(":checked").length === s)
			}), r.change(function() {
				e(t, n || document).prop("checked", this.checked)
			}), this
		},
		labelledInput: function(t) {
			var t = e.extend({
				text: "key words",
				labelledClass: "fLightgray"
			}, t);
			return this.each(function() {
				e(this).val(t.text).addClass(t.labelledClass).focus(function() {
					e(this).val() == t.text && e(this).val("").removeClass(t.labelledClass)
				}).blur(function() {
					e.trim(e(this).val()) == "" && e(this).val(t.text).addClass(t.labelledClass)
				})
			})
		},
		fieldsToJson: function() {
			var t = {},
				n;
			return n = this.serializeArray(), e.each(n, function() {
				var n = this.name.indexOf("[]"),
					r = n !== -1,
					i = r ? this.name.substr(0, n) : this.name,
					s = e.trim(this.value + "") || "";
				t[i] ? (t[i].push || (t[i] = [t[i]]), t[i].push(s)) : r ? (t[i] = [], t[i][0] = s) : t[i] = s
			}), t
		},
		jsonToFields: function(t) {
			return this.find("input,select,textarea").each(function() {
				if (!this.name) {
					if (!this.id) return;
					this.name = this.id
				}
				var n = this.name.split("[]")[0],
					r = t[n];
				if (this.type == "checkbox" || this.type == "radio") {
					var i = e.isArray(r) ? r : [r],
						s = e.isNumeric(this.value) ? parseInt(this.value, 10) : this.value;
					for (var o = 0; o < i.length; o++) if (i[o] == s) {
						this.checked = !0;
						break
					}
				} else this.type.indexOf("select-") != -1 ? e(this).recheckElement(r) : this.tagName.toLowerCase() == "textarea" ? $(this).val(r) : (r === undefined && (r = ""), this.value = r)
			}), this
		},
		recheck: function(t) {
			var n = e.isArray(t) ? t : [t],
				r = this[0].options ? "selected" : "checked",
				i = r == "selected" ? this[0].options : this;
			return $(i).prop(r, !1).filter(function() {
				return e.inArray(this.value, n) != -1
			}).prop(r, !0).end()
		},
		recheckElement: function(t) {
			var n = e.isArray(t) ? t : [t],
				r, i, s;
			this.prop("tagName").toLowerCase() == "select" ? (r = this[0].options, i = this.attr("type") != "select-multiple", s = !0) : (r = this, i = this.attr("type") == "radio", s = !1);
			var o, u, a;
			e: for (var f = 0, l = r.length; f < l; f++) {
				o = r[f], a = !1, u = o.value;
				t: for (var c = 0, h = n.length; c < h; c++) if (u == n[c]) {
					if (i) {
						s ? o.selected = !0 : o.checked = !0;
						break e
					}
					a = !0;
					break t
				}
				s ? o.selected = a : o.checked = a
			}
			return this
		}
	}), $.fn.decimalMask = function(e) {
		function a(e) {
			var t = $(e.currentTarget);
			t.val() !== e.data.ov && (u.test(t.val()) || t.val(e.data.ov), e.data.ov = t.val())
		}
		if (!e || !e.match) throw "decimalMask: you must set the mask string.";
		var t, n = /^-/.test(e) ? "(-)?" : "",
			r = function() {
				return t = e.match(/[0-9]{1,}/), t !== null ? t[0].length : 0
			}(),
			i = function() {
				return t = e.match(/[0-9]{1,}$/), t !== null ? t[0].length : 0
			}(),
			s = function() {
				return t = e.match(/,|\./), t !== null ? t[0] : null
			}(),
			o = /.*MSIE 8.*|.*MSIE 7.*|.*MSIE 6.*|.*MSIE 5.*/.test(navigator.userAgent) ? "keyup propertychange paste" : "input paste",
			u = s === null ? new RegExp("^" + n + "[0-9]{0," + r + "}$") : new RegExp("^" + n + "[0-9]{0," + r + "}" + (s === "." ? "\\." : ",") + "[0-9]{0," + i + "}$|^" + n + "[0-9]{0," + r + "}" + (s === "." ? "\\." : ",") + "$|^" + n + "[0-9]{0," + r + "}$");
		this.each(function() {
			$(this).attr("maxlength", r + i + (s === null ? 0 : 1) + (n === "" ? 0 : 1)).val($(this).val() ? $(this).val().replace(".", s) : $(this).val()).on(o, {
				ov: $(this).val()
			}, a)
		})
	}
}(jQuery), function(e) {
	function t() {
		var e = document.createElement("input"),
			t = "onpaste";
		return e.setAttribute(t, ""), typeof e[t] == "function" ? "paste" : "input"
	}
	var n = t() + ".mask",
		r = navigator.userAgent,
		i = /iphone/i.test(r),
		s = /android/i.test(r),
		o;
	e.mask = {
		definitions: {
			9: "[0-9]",
			a: "[A-Za-z]",
			"*": "[A-Za-z0-9]"
		},
		dataName: "rawMaskFn",
		placeholder: "_"
	}, e.fn.extend({
		caret: function(e, t) {
			var n;
			if (this.length === 0 || this.is(":hidden")) return;
			return typeof e == "number" ? (t = typeof t == "number" ? t : e, this.each(function() {
				this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
			})) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
				begin: e,
				end: t
			})
		},
		unmask: function() {
			return this.trigger("unmask")
		},
		mask: function(t, r) {
			var u, a, f, l, c, h;
			return !t && this.length > 0 ? (u = e(this[0]), u.data(e.mask.dataName)()) : (r = e.extend({
				placeholder: e.mask.placeholder,
				completed: null
			}, r), a = e.mask.definitions, f = [], l = h = t.length, c = null, e.each(t.split(""), function(e, t) {
				t == "?" ? (h--, l = e) : a[t] ? (f.push(new RegExp(a[t])), c === null && (c = f.length - 1)) : f.push(null)
			}), this.trigger("unmask").each(function() {
				function v(e) {
					while (++e < h && !f[e]);
					return e
				}
				function m(e) {
					while (--e >= 0 && !f[e]);
					return e
				}
				function g(e, t) {
					var n, i;
					if (e < 0) return;
					for (n = e, i = v(t); n < h; n++) if (f[n]) {
						if (!(i < h && f[n].test(p[i]))) break;
						p[n] = p[i], p[i] = r.placeholder, i = v(i)
					}
					S(), u.caret(Math.max(c, e))
				}
				function y(e) {
					var t, n, i, s;
					for (t = e, n = r.placeholder; t < h; t++) if (f[t]) {
						i = v(t), s = p[t], p[t] = n;
						if (!(i < h && f[i].test(s))) break;
						n = s
					}
				}
				function b(e) {
					var t = e.which,
						n, r, s;
					t === 8 || t === 46 || i && t === 127 ? (n = u.caret(), r = n.begin, s = n.end, s - r === 0 && (r = t !== 46 ? m(r) : s = v(r - 1), s = t === 46 ? v(s) : s), E(r, s), g(r, s - 1), e.preventDefault()) : t == 27 && (u.val(d), u.caret(0, x()), e.preventDefault())
				}
				function w(t) {
					var n = t.which,
						i = u.caret(),
						o, a, l;
					if (t.ctrlKey || t.altKey || t.metaKey || n < 32) return;
					n && (i.end - i.begin !== 0 && (E(i.begin, i.end), g(i.begin, i.end - 1)), o = v(i.begin - 1), o < h && (a = String.fromCharCode(n), f[o].test(a) && (y(o), p[o] = a, S(), l = v(o), s ? setTimeout(e.proxy(e.fn.caret, u, l), 0) : u.caret(l), r.completed && l >= h && r.completed.call(u))), t.preventDefault())
				}
				function E(e, t) {
					var n;
					for (n = e; n < t && n < h; n++) f[n] && (p[n] = r.placeholder)
				}
				function S() {
					u.val(p.join(""))
				}
				function x(e) {
					var t = u.val(),
						n = -1,
						i, s;
					for (i = 0, pos = 0; i < h; i++) if (f[i]) {
						p[i] = r.placeholder;
						while (pos++ < t.length) {
							s = t.charAt(pos - 1);
							if (f[i].test(s)) {
								p[i] = s, n = i;
								break
							}
						}
						if (pos > t.length) break
					} else p[i] === t.charAt(pos) && i !== l && (pos++, n = i);
					return e ? S() : n + 1 < l ? (u.val(""), E(0, h)) : (S(), u.val(u.val().substring(0, n + 1))), l ? i : c
				}
				var u = e(this),
					p = e.map(t.split(""), function(e, t) {
						if (e != "?") return a[e] ? r.placeholder : e
					}),
					d = u.val();
				u.data(e.mask.dataName, function() {
					return e.map(p, function(e, t) {
						return f[t] && e != r.placeholder ? e : null
					}).join("")
				}), u.attr("readonly") || u.one("unmask", function() {
					u.unbind(".mask").removeData(e.mask.dataName)
				}).bind("focus.mask", function() {
					clearTimeout(o);
					var e, n;
					d = u.val(), e = x(), o = setTimeout(function() {
						S(), e == t.length ? u.caret(0, e) : u.caret(e)
					}, 10)
				}).bind("blur.mask", function() {
					x(), u.val() != d && u.change()
				}).bind("keydown.mask", b).bind("keypress.mask", w).bind(n, function() {
					setTimeout(function() {
						var e = x(!0);
						u.caret(e), r.completed && e == u.val().length && r.completed.call(u)
					}, 0)
				}), x()
			}))
		}
	})
}(jQuery), function(e) {
	var t = {
		m_Count: 0,
		make: function(e) {
			var t = e.template,
				n = {
					name: t
				},
				r = e.nullShown || "";
			pnter = /{\w+(:=)+\w+}/g, rnderFns = t.match(pnter), renderEvalStr = 'row[":index"]=i;';
			if (rnderFns) {
				var i, s, o;
				for (var u = 0; u < rnderFns.length; u++) i = rnderFns[u].substr(1, rnderFns[u].length - 2), s = i.indexOf(":="), o = i.substr(0, s), renderEvalStr += "row['" + i + "']=scope['" + i.substr(s + 2) + "'](row['" + o + "'] , i , row ,'" + o + "') ;"
			}
			var a = /\{(\w*[:]*[=]*\w+)\}(?!})/g,
				f = t.replace(a, function(e, t, n) {
					return "'+((row['" + t + "']===null||row['" + t + "']===undefined)?'" + r + "':row['" + t + "'])+'"
				});
			return renderEvalStr += "var out='" + f + "';return out;", n.render = new Function("row", "i", "scope", renderEvalStr), e.mode && (n.mode = e.mode), e.itemRender && (n.itemRender = e.itemRender), e.itemFilter && (n.itemFilter = e.itemFilter), e.onBound && (n.onBound = e.onBound), n.joiner = e.joiner || "", n.storeData = !! e.storeData, n
		},
		newId: function() {
			return "_Object__id" + this.m_Count++
		},
		remove: function(e) {
			delete this[e]
		}
	};
	e.fn.bindList = function(e) {
		var n = this[0],
			r = n.id || n.uniqueID ||
		function() {
			return n.id = t.newId(), n.id
		}(), i = t[r] || {}, s, o, u, a, f, l, c;
		e.push && e.slice ? (o = e, u = i.itemRender, a = i.itemFilter, f = i.mode, l = i.storeData) : (s = e.template, s !== undefined && i["name"] != s && (i = t.make(e), t[r] = i), o = e.list, u = e.itemRender || i.itemRender, a = e.itemFilter || i.itemFilter, f = e.mode || i.mode, l = !! e.storeData);
		var h = u || window,
			p = [],
			d = 0,
			v = 0,
			m, g = typeof a == "function";
		l && (c = []);
		for (; m = o[d];) g && (m = a(m, d)), m && (m[":rowNum"] = ++v, p[d] = i.render(m, d, h), l && c.push(m)), ++d;
		switch (f) {
		case "append":
			this.append(p.join(i.joiner));
			break;
		case "prepend":
			this.prepend(p.join(i.joiner));
			break;
		case "after":
			this.after(p.join(i.joiner));
			break;
		case "before":
			this.before(p.join(i.joiner));
			break;
		default:
			document.all ? this.html(p.join(i.joiner)) : n.innerHTML = p.join(i.joiner)
		}
		return typeof i.onBound == "function" && i.onBound.call(this, o, e), l && this.data("bound-array", c), this
	}, e.fn.bindLists = function(n) {
		var r;
		n.mode === "setCache" ? r = n.cache : r = t.make(n), this.each(function(e, n) {
			var i = n.id || n.uniqueID ||
			function() {
				return n.id = t.newId(), n.id
			}();
			t[i] = r
		});
		if (e.isArray(n.lists)) {
			var i = Math.min(this.size(), n.lists.length);
			for (var s = 0; s < i; s++) n.list = n.lists[s], this.eq(s).bindList(n);
			typeof n.onAllComplete == "function" && n.onAllComplete.call(this, n.lists, n)
		}
		return n.mode === "getCache" ? r : this
	}
}(jQuery), function(e) {
	e.PaginationCalculator = function(e, t) {
		this.maxentries = e, this.opts = t
	}, e.extend(e.PaginationCalculator.prototype, {
		numPages: function() {
			return Math.ceil(this.maxentries / this.opts.items_per_page)
		},
		getInterval: function(e) {
			var t = Math.floor(this.opts.num_display_entries / 2),
				n = this.numPages(),
				r = n - this.opts.num_display_entries,
				i = e > t ? Math.max(Math.min(e - t, r), 0) : 0,
				s = e > t ? Math.min(e + t + this.opts.num_display_entries % 2, n) : Math.min(this.opts.num_display_entries, n);
			return {
				start: i,
				end: s
			}
		}
	}), e.PaginationRenderers = {}, e.PaginationRenderers.defaultRenderer = function(t, n) {
		this.maxentries = t, this.opts = n, this.pc = new e.PaginationCalculator(t, n)
	}, e.extend(e.PaginationRenderers.defaultRenderer.prototype, {
		createLink: function(t, n, r) {
			var i, s = this.pc.numPages();
			return t = t < 0 ? 0 : t < s ? t : s - 1, r = e.extend({
				text: t + 1,
				classes: ""
			}, r || {}), t == n ? i = e("<span class='current'>" + r.text + "</span>") : i = e("<a>" + r.text + "</a>").attr("href", this.opts.link_to.replace(/__id__/, t)), r.classes && i.addClass(r.classes), r.rel && i.attr("rel", r.rel), i.data("page_id", t), i
		},
		appendRange: function(e, t, n, r, i) {
			var s;
			for (s = n; s < r; s++) this.createLink(s, t, i).appendTo(e)
		},
		getLinks: function(t, n) {
			var r, i, s = this.pc.getInterval(t),
				o = this.pc.numPages(),
				u = e("<div class='pagination'></div>");
			return this.opts.prev_text && (t > 0 || this.opts.prev_show_always) && u.append(this.createLink(t - 1, t, {
				text: this.opts.prev_text,
				classes: "prev",
				rel: "prev"
			})), s.start > 0 && this.opts.num_edge_entries > 0 && (i = Math.min(this.opts.num_edge_entries, s.start), this.appendRange(u, t, 0, i, {
				classes: "sp"
			}), this.opts.num_edge_entries < s.start && this.opts.ellipse_text && e("<span>" + this.opts.ellipse_text + "</span>").appendTo(u)), this.appendRange(u, t, s.start, s.end), s.end < o && this.opts.num_edge_entries > 0 && (o - this.opts.num_edge_entries > s.end && this.opts.ellipse_text && e("<span>" + this.opts.ellipse_text + "</span>").appendTo(u), r = Math.max(o - this.opts.num_edge_entries, s.end), this.appendRange(u, t, r, o, {
				classes: "ep"
			})), this.opts.next_text && (t < o - 1 || this.opts.next_show_always) && u.append(this.createLink(t + 1, t, {
				text: this.opts.next_text,
				classes: "next",
				rel: "next"
			})), e("a", u).click(n), u
		}
	}), e.fn.pagination = function(t, n) {
		function u(t) {
			var n, r = e(t.target).data("page_id"),
				i = a(r);
			return i || t.stopPropagation(), i
		}
		function a(e) {
			r.data("current_page", e), s = i.getLinks(e, u), r.empty(), s.appendTo(r);
			var t = n.callback(e, r);
			return t
		}
		n = e.extend({
			items_per_page: 10,
			num_display_entries: 11,
			current_page: 0,
			num_edge_entries: 0,
			link_to: "#",
			prev_text: "Prev",
			next_text: "Next",
			ellipse_text: "...",
			prev_show_always: !0,
			next_show_always: !0,
			renderer: "defaultRenderer",
			show_if_single_page: !1,
			load_first_page: !0,
			callback: function() {
				return !1
			}
		}, n || {});
		var r = this,
			i, s, o;
		o = parseInt(n.current_page), r.data("current_page", o), t = !t || t < 0 ? 1 : t, n.items_per_page = !n.items_per_page || n.items_per_page < 0 ? 1 : n.items_per_page;
		if (!e.PaginationRenderers[n.renderer]) throw new ReferenceError("Pagination renderer '" + n.renderer + "' was not found in jQuery.PaginationRenderers object.");
		i = new e.PaginationRenderers[n.renderer](t, n);
		var f = new e.PaginationCalculator(t, n),
			l = f.numPages();
		r.off("setPage").on("setPage", {
			numPages: l
		}, function(e, t) {
			if (t >= 0 && t < e.data.numPages) return a(t), !1
		}), r.off("prevPage").on("prevPage", function(t) {
			var n = e(this).data("current_page");
			return n > 0 && a(n - 1), !1
		}), r.off("nextPage").on("nextPage", {
			numPages: l
		}, function(t) {
			var n = e(this).data("current_page");
			return n < t.data.numPages - 1 && a(n + 1), !1
		}), r.off("currentPage").on("currentPage", function() {
			var t = e(this).data("current_page");
			return a(t), !1
		}), s = i.getLinks(o, u), r.empty(), (l > 1 || n.show_if_single_page) && s.appendTo(r), n.load_first_page && n.callback(o, r)
	}
}(jQuery), function($) {
	$.fn.editable = function(e, t) {
		if ("disable" == e) {
			$(this).data("disabled.editable", !0);
			return
		}
		if ("enable" == e) {
			$(this).data("disabled.editable", !1);
			return
		}
		if ("destroy" == e) {
			$(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");
			return
		}
		var n = $.extend({}, $.fn.editable.defaults, {
			target: e
		}, t),
			r = $.editable.types[n.type].plugin || fy.EMPTY_FN,
			i = $.editable.types[n.type].submit || fy.EMPTY_FN,
			s = $.editable.types[n.type].buttons || $.editable.types.defaults.buttons,
			o = $.editable.types[n.type].content || $.editable.types.defaults.content,
			u = $.editable.types[n.type].element || $.editable.types.defaults.element,
			a = $.editable.types[n.type].reset || $.editable.types.defaults.reset,
			f = n.callback || fy.EMPTY_FN,
			l = n.onedit || fy.EMPTY_FN,
			c = n.onsubmit || fy.EMPTY_FN,
			h = n.onreset || fy.EMPTY_FN,
			p = n.onerror || a;
		return n.tooltip && $(this).attr("title", n.tooltip), n.autowidth = "auto" == n.width, n.autoheight = "auto" == n.height, this.each(function() {
			var e = this,
				t = $(e).width(),
				d = $(e).height();
			$(this).data("event.editable", n.event), $.trim($(this).html()) || $(this).html(n.placeholder), $(this).bind(n.event, function(h) {
				if (!0 === $(this).data("disabled.editable")) return;
				if (e.editing) return;
				if (!1 === l.apply(this, [n, e])) return;
				h.preventDefault(), h.stopPropagation(), n.tooltip && $(e).removeAttr("title"), 0 == $(e).width() ? (n.width = t, n.height = d) : (n.width != "none" && (n.width = n.autowidth ? $(e).width() : n.width), n.height != "none" && (n.height = n.autoheight ? $(e).height() : n.height)), $(this).html().toLowerCase().replace(/(;|")/g, "") == n.placeholder.toLowerCase().replace(/(;|")/g, "") && $(this).html(""), e.editing = !0, e.revert = $(e).html(), $(e).html("");
				var v = $('<form class="editableForm" />');
				n.cssclass && ("inherit" == n.cssclass ? v.attr("class", $(e).attr("class")) : v.attr("class", n.cssclass)), n.style && ("inherit" == n.style ? (v.attr("style", $(e).attr("style")), v.css("display", $(e).css("display"))) : v.attr("style", n.style));
				var m = u.apply(v, [n, e]);
				typeof n.onKeydown == "function" && m.bind("keydown.fy", n.onKeydown), typeof n.onKeyup == "function" && m.bind("keyup.fy", n.onKeyup), typeof n.onKeypress == "function" && m.bind("keypress.fy", n.onKeypress), typeof n.onBlur == "function" && m.bind("blur.fy", n.onBlur), typeof n.onPaste == "function" && m.bind("paste.fy", n.onPaste), typeof n.onFocus == "function" && m.bind("focus.fy", n.onFocus), typeof n.onClick == "function" && m.bind("click.fy", n.onClick);
				var g;
				if (n.loadurl) {
					var y = setTimeout(function() {
						m.disabled = !0, o.apply(v, [n.loadtext, n, e])
					}, 100),
						b = {};
					b[n.id] = e.id, $.isFunction(n.loaddata) ? $.extend(b, n.loaddata.apply(e, [e.revert, n])) : $.extend(b, n.loaddata), $.ajax({
						type: n.loadtype,
						url: n.loadurl,
						data: b,
						async: !1,
						success: function(e) {
							window.clearTimeout(y), g = e, m.disabled = !1
						}
					})
				} else n.data ? (g = n.data, $.isFunction(n.data) && (g = n.data.apply(e, [e.revert, n]))) : g = e.revert;
				o.apply(v, [g, n, e]), m.attr("name", n.name), s.apply(v, [n, e]), $(e).append(v), r.apply(v, [n, e]), $(":input:visible:enabled:first", v).focus(), n.select && m.select(), m.keydown(function(t) {
					t.keyCode == 27 && (t.preventDefault(), a.apply(v, [n, e]))
				});
				var y;
				"cancel" == n.onblur ? m.blur(function(t) {
					y = setTimeout(function() {
						a.apply(v, [n, e])
					}, 500)
				}) : "submit" == n.onblur ? m.blur(function(e) {
					y = setTimeout(function() {
						v.submit()
					}, 200)
				}) : $.isFunction(n.onblur) ? m.blur(function(t) {
					n.onblur.apply(e, [m.val(), n])
				}) : m.blur(function(e) {}), v.submit(function(t) {
					y && clearTimeout(y), t.preventDefault();
					if (!1 !== c.apply(v, [n, e]) && !1 !== i.apply(v, [n, e])) if ($.isFunction(n.target)) {
						var r;
						if (n.type === "checkBox") {
							var s = $(e).find(":checkbox:checked"),
								o = [];
							s.each(function(e, t) {
								o[e] = t.value
							}), r = o.join(";")
						} else r = m.val();
						var u = n.target.apply(e, [r, n]);
						$(e).html(u), e.editing = !1, f.apply(e, [e.innerHTML, n]), $.trim($(e).html()) || $(e).html(n.placeholder)
					} else {
						var a = {};
						a[n.name] = m.val(), a[n.id] = e.id, $.isFunction(n.submitdata) ? $.extend(a, n.submitdata.apply(e, [e.revert, n])) : $.extend(a, n.submitdata), "PUT" == n.method && (a._method = "put"), $(e).html(n.indicator);
						var l = {
							type: "POST",
							data: a,
							dataType: "html",
							url: n.target,
							success: function(t, r) {
								l.dataType == "html" && $(e).html(t), e.editing = !1, f.apply(e, [t, n]), $.trim($(e).html()) || $(e).html(n.placeholder)
							},
							error: function(t, r, i) {
								p.apply(v, [n, e, t])
							}
						};
						$.extend(l, n.ajaxoptions), $.ajax(l)
					}
					return $(e).attr("title", n.tooltip), !1
				})
			}), this.reset = function(t) {
				this.editing && !1 !== h.apply(t, [n, e]) && ($(e).html(e.revert), e.editing = !1, $.trim($(e).html()) || $(e).html(n.placeholder), n.tooltip && $(e).attr("title", n.tooltip))
			}
		})
	}, $.editable = {
		types: {
			defaults: {
				element: function(e, t) {
					var n = $('<input type="hidden" />');
					return $(this).append(n), n
				},
				content: function(e, t, n) {
					$(":input:first", this).val(e)
				},
				reset: function(e, t) {
					t.reset(this)
				},
				buttons: function(e, t) {
					var n = this;
					if (e.submit) {
						if (e.submit.match(/>$/)) var r = $(e.submit).click(function() {
							r.attr("type") != "submit" && n.submit()
						});
						else {
							var r = $('<button type="submit" />');
							r.html(e.submit)
						}
						$(this).append(r)
					}
					if (e.cancel) {
						if (e.cancel.match(/>$/)) var i = $(e.cancel);
						else {
							var i = $('<button type="cancel" />');
							i.html(e.cancel)
						}
						$(this).append(i), $(i).click(function(r) {
							if ($.isFunction($.editable.types[e.type].reset)) var i = $.editable.types[e.type].reset;
							else var i = $.editable.types.defaults.reset;
							return i.apply(n, [e, t]), !1
						})
					}
				}
			},
			text: {
				element: function(e, t) {
					var n = $('<input type="text" />');
					return e.width != "none" && n.width(e.width), e.height != "none" && n.height(e.height), n.attr("autocomplete", "off"), $(this).append(n), e.mask ? n.mask(e.mask) : e.numberic && (typeof e.numberic != "string" && (e.numberic = "9999"), n.decimalMask(e.numberic)), n
				}
			},
			textarea: {
				element: function(e, t) {
					var n = $("<textarea />");
					return e.rows ? n.attr("rows", e.rows) : e.height != "none" && n.height(e.height), e.cols ? n.attr("cols", e.cols) : e.width != "none" && n.width(e.width), $(this).append(n), n
				}
			},
			select: {
				element: function(e, t) {
					var n = $("<select />");
					return $(this).append(n), n
				},
				content: function(data, settings, original) {
					if (String == data.constructor) eval("var json = " + data);
					else var json = data;
					for (var key in json) {
						if (!json.hasOwnProperty(key)) continue;
						if ("selected" == key) continue;
						var option = $("<option />").val(key).append(json[key]);
						$("select", this).append(option)
					}
					$("select", this).children().each(function() {
						($(this).val() == json["selected"] || $(this).text() == $.trim(original.revert)) && $(this).attr("selected", "selected")
					})
				}
			},
			checkBox: {
				element: function(e, t) {
					var n = e.data;
					if (n) {
						var r = "",
							i, s = "ckb_" + Math.random();
						for (var o in n) i = Math.random(), r += '<input id="ckb_' + i + '" name="' + s + '" type="checkbox" value="' + o + '"><label for="ckb_' + i + '">' + n[o] + ";</label><br>";
						return $(r).appendTo(this)
					}
					return null
				},
				content: function(e, t, n) {
					var r = n.revert.split(";"),
						i = r.length,
						s = this.find(":checkbox");
					while (i--) this.find("[value='" + r[i] + "']").prop("checked", !0)
				}
			}
		},
		addInputType: function(e, t) {
			$.editable.types[e] = t
		}
	}, $.fn.editable.defaults = {
		name: "value",
		id: "id",
		type: "text",
		width: "auto",
		height: "auto",
		event: "click.editable",
		onblur: "cancel",
		loadtype: "GET",
		loadtext: "Loading...",
		placeholder: "Click to edit",
		loaddata: {},
		submitdata: {},
		ajaxoptions: {}
	}
}(jQuery), function(e, t, n, r) {
	var i = function(e, t) {
			this.jq = e, this.data = t.data, this.onInit || (this.onInit = t.onInit), this.onCreate || (this.onCreate = t.onCreate)
		};
	i.prototype = {
		create: function() {
			return typeof this.onInit == "function" && this.onInit(), typeof this.htmlMashup == "function" && this.htmlMashup(!0), this.createHandler(this.data), this
		},
		createHandler: function(e) {
			return typeof this.onCreate == "function" && this.onCreate(e), this
		},
		toString: function() {
			return this.define
		}
	}, n.register("DisplayObject", i)
}(window, jQuery, fy), function(e, t, n) {
	var r = function(e, t) {
			this.jq = e, this.lazy = t.lazy, this.data = t.data, this.url = t.url, this.param = t.param, this.ajaxType = t.ajaxType || "GET", this.xhr = null, this.created = !1, this.onAjaxStart = t.onAjaxStart, this.onAjaxEnd = t.onAjaxEnd, this.onInit = t.onInit, this.onCreate = t.onCreate, this.onUpdate = t.onUpdate, this.onError = t.onError
		};
	r.prototype = {
		create: function() {
			return this.data ? this.bindData(this, !0) : this.url && (this.xhr = t.ajaxSettings.xhr(), this.ajax(this.param, !0)), this
		},
		createHandler: function(e) {
			return this.created = !0, typeof this.onCreate == "function" && this.onCreate(e), this
		},
		abort: function() {
			return this.xhr && this.xhr.readyState != 4 && this.xhr.readyState != 0 && this.xhr.abort(), this
		},
		update: function(e, n) {
			var r;
			return typeof n == "function" && (this.onUpdateOnce = n), this.url ? typeof e == "function" ? this.onUpdateOnce = e : this.param ? t.extend(this.param, e) : this.param = e : r = e || this.data, this.created ? this.url ? this.ajax(this.param, !1) : this.bindData(r) : (!this.url && r && (this.data = r), this.create()), this
		},
		updateHandler: function(e, t) {
			typeof this.onUpdate == "function" && this.onUpdate(e, t)
		},
		ajax: function(e, n) {
			var r = this;
			this.ajaxStartHandler(n);
			var i = this.xhr.readyState;
			return i !== 4 && i !== 0 && this.xhr.abort(), t.ajax({
				url: this.url,
				dataType: "json",
				data: e,
				type: this.ajaxType,
				xhr: function() {
					return r.xhr
				},
				success: function(e, t, i) {
					e.error ? r.errorHandler(e.error) : (r.ajaxEndHandler(e, n), r.bindData(e, n))
				}
			}), this
		},
		ajaxStartHandler: function(e) {
			typeof this.onAjaxStart == "function" && this.onAjaxStart(e)
		},
		ajaxEndHandler: function(e, t) {
			typeof this.onAjaxEnd == "function" && this.onAjaxEnd(e, t)
		},
		bindData: function(e, t) {
			throw new Error(this.define + "的数据绑定函数未实现")
		},
		errorHandler: function(e) {
			typeof this.onError == "function" ? this.onError(e) : this.url.handleError ? this.url.handleError.call(this.url, e) : typeof n.onAjaxError == "function" && n.onAjaxError.call(this, e)
		},
		toString: function() {
			return this.define
		}
	}, n.register("AjaxDisplayObject", r)
}(window, jQuery, fy), function(e, t, n) {
	var r = function(e, n) {
			var i = t.extend({}, n);
			r.parent.call(this, e, i), this.data = i.data, this.template = i.template, this.items = null, this.selectedIndex = -1, this.prevIndex = -1, this.bindOptions = this.getBindOptions(n.bindOptions), this.onSelect = i.onSelect, this.onBind = i.onBind
		};
	r.prototype = {
		bindData: function(e, n) {
			return this.json = e ? e : [], this.bindOptions.list = t.isArray(e) ? e : e.data || [], this.bindOptions.itemFilter && (this.bindOptions.storeData = !0), this.jq.bindList(this.bindOptions), this.bindOptions.itemFilter ? (this.data = this.jq.data("bound-array"), this.jq.removeData("bound-array")) : this.data = this.bindOptions.list, this.bindHandler(e, n), n ? this.createHandler(e) : this.updateHandler(e), typeof this.onUpdateOnce == "function" && (this.onUpdateOnce(e, n), delete this.onUpdateOnce), this
		},
		bindHandler: function(e, t) {
			t || (this.selectedIndex = -1, this.prevIndex = -1), typeof this.onBind == "function" && this.onBind(e, t)
		},
		getBindOptions: function(e) {
			var n = {
				template: this.template
			};
			return t.extend(n, e)
		},
		setSelectedIndex: function(e) {
			return this.prevIndex = this.selectedIndex, this.selectedIndex = e, this
		},
		selectHandler: function(e) {
			this.prevIndex = this.selectedIndex, this.selectedIndex = this.items.index(e.target), typeof this.onSelect == "function" && this.onSelect(e)
		},
		getPureData: function(e) {
			if (!e || e instanceof Array) {
				var t = n.deepClone(e || this.data);
				for (var r = 0, i = t.length; r < i; r++) {
					var s = t[r],
						o;
					for (o in s) o.indexOf(":") > -1 && delete s[o]
				}
				return t
			}
			return null
		},
		getSelectedData: function(e) {
			var t = this.data[this.selectedIndex];
			if (!e) {
				var n = {},
					r;
				for (r in t) r.indexOf(":") === -1 && (n[r] = t[r]);
				return n
			}
			return t
		},
		getSelectedItem: function() {
			return this.items[this.selectedIndex]
		},
		empty: function() {
			return this.jq.html(""), this
		},
		clearAll: function() {
			return this.data = null, this.empty()
		}
	}, n.register("ListBase", r, "AjaxDisplayObject")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = t("body"),
		s = {
			zIndex: 29999,
			instances: {},
			remove: function(e) {
				delete this.instances[e]
			},
			closeAll: function() {
				for (var e in this.instances) {
					var t = this.instances[e];
					t.status === "open" && t.close()
				}
			}
		};
	i.bind("scroll.dropDownHideAll", function() {
		s.closeAll()
	});
	var o = function(e, n) {
			var r = t.extend({
				eventType: "mousedown",
				allowBlank: !1
			}, n),
				u = this;
			o.parent.call(this, e, r), this.text = r.text || "", this.target = t(r.target), n.width && this.target.width(n.width), n.height && this.target.css("maxHeight", n.height), this.status = "close", this.event = r.eventType + ".fyDropdown", this.bodyBinder = function() {
				i.bind("mousedown.dropDownHideAll", function() {
					s.closeAll()
				})
			}, this.onBeforeOpen = r.onBeforeOpen, this.onOpen = r.onOpen, this.onClose = r.onClose, r.allowBlank && (this.wrapper = this.jq.css({
				"float": "left",
				margin: 0
			}).wrap('<span style="display: inline-block;vertical-align: middle;"></span>').parents("span:first"), this.ereaser = t('<div style="font:Arial 12px;color:#d00;float:left;margin:5px 0 0 -26px ;width:8px;line-height:12px;cursor:pointer;display:none;">x</div>').appendTo(this.wrapper).click(function() {
				u.jq.val("")
			}), this.wrapper.hover(function() {
				u.ereaser.toggle()
			})), this.lazy || this.create()
		};
	o.prototype = {
		position: function() {
			var e = this.jq,
				n = this.target,
				r = e.offset(),
				i = r.top + e.outerHeight();
			i + n.outerHeight() > t(document).outerHeight() && (i = r.top - n.outerHeight()), n.css({
				top: i,
				left: r.left,
				zIndex: s.zIndex++
			})
		},
		create: function(e) {
			return typeof this.onInit == "function" && this.onInit(), this.jq[0].tagName === "INPUT" ? this.jq.addClass("combo-input").val(this.text) : this.jq.text(this.text), this.target.css({
				display: "none",
				position: "absolute"
			}).mousedown(function(e) {
				e.stopPropagation()
			}), this.enable(), this.instanceId = n.uuid(), s.instances[this.instanceId] = this, this.createHandler(e), this
		},
		enable: function() {
			var e = this,
				t = this.jq,
				n = this.target;
			return t.bind(this.event, function(t) {
				var r = !0;
				e.status === "close" && e.position();
				if (typeof e.onBeforeOpen == "function") {
					r = e.onBeforeOpen.apply(e);
					if (r === !1) return e
				}
				return n.stop(!0, !0).slideToggle(90, function() {
					n.css("display") === "block" ? e.openHandler() : e.closeHandler()
				}), e
			}), this
		},
		disable: function() {
			return this.jq.prop("disabled", !0), this.target.hide(), this.jq.unbind(this.event), this
		},
		open: function() {
			if (typeof this.onBeforeOpen == "function") {
				var e = this.onBeforeOpen();
				if (e === !1) return this
			}
			return this.position(), this.target.stop(!0, !0).slideDown(90), this.openHandler(), this
		},
		openHandler: function() {
			this.status = "open", this.bodyBinder(), this.target.bind("mouseleave.dropDownHide", this.bodyBinder).bind("mouseenter.dropDownHide", function() {
				i.unbind("click.dropDownHide")
			}), typeof this.onOpen == "function" && this.onOpen.apply(this, arguments)
		},
		close: function() {
			return this.target.stop(!0, !0).slideUp(90), this.closeHandler(), this
		},
		closeHandler: function() {
			this.status = "close", i.unbind(".dropDownHide"), this.target.unbind(".dropDownHide"), typeof this.onClose == "function" && this.onClose.apply(this, arguments)
		}
	}, n.register("ComboBase", o, "DisplayObject")
}(window, jQuery, fy), function(e, t, n, r) {
	function a(e) {
		var t, n;
		return e.getMonth() < 8 ? t = new Date(e.getFullYear() - 1, 8, 1) : t = new Date(e.getFullYear(), 8, 1), t.getDay() == 0 ? n = new Date(t.getFullYear(), 8, 2) : t.getDay() == 6 ? n = new Date(t.getFullYear(), 8, 3) : n = t, n
	}
	var s = new Date,
		o = new Date(s.getFullYear(), s.getMonth(), s.getDate()),
		u = a(o),
		f = function(e, r) {
			var i = t.extend({
				today: o,
				schoolOpen: u,
				selectedDate: o,
				showToday: !1,
				showWeekNum: !0,
				sundayIsWeekend: !1,
				dayNames: ["日", "一", "二", "三", "四", "五", "六"],
				monthNames: null,
				symbols: ["年", "月", "周次"]
			}, r);
			f.parent.call(this, e, i), this.sundayIsWeekend = i.sundayIsWeekend, this.showToday = i.showToday, this.onChoose = i.onChoose, this.onChooseWeek = i.onChooseWeek, this.onCalendarEnter = i.onCalendarEnter, this.onChange = i.onChange, this.today = typeof i.today == "string" ? n.parseDate(i.today) : i.today, r.schoolOpen ? this.schoolOpen = typeof i.schoolOpen == "string" ? n.parseDate(i.schoolOpen) : i.schoolOpen : this.schoolOpen = a(this.today), this.begin = null, this.showWeekNum = !! i.showWeekNum, r.selectedDate ? this.selectedDate = typeof i.selectedDate == "string" ? n.parseDate(i.selectedDate) : i.selectedDate : this.selectedDate = this.today, this.monthNames = i.monthNames || ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], this.symbols = i.symbols, this.showState = 0, this.lastDrawn = {}, this.create(i)
		};
	f.prototype = {
		"goto": function(e, t, n) {
			return e = parseInt(e, 10), t = parseInt(t, 10), n ? this.setSelectedDate(e + "-" + t + "-" + n) : (this.selectedYear = e, this.selectedMonth = t, this.drawMonthly(e, t)), this
		},
		drawMonthly: function(e, t, n) {
			return this.toggler.text(e + this.symbols[0] + t + this.symbols[1]), this.lastDrawn.year != e || this.lastDrawn.month != t ? (this.lastDrawn.year = e, this.lastDrawn.month = t, this.rewriteDayTds(e, t), typeof this.onChange == "function" && this.onChange.call(this, this.dateTds, n || "enter")) : typeof this.onCalendarEnter == "function" && this.onCalendarEnter.call(this, this.dateTds, n || "enter"), this
		},
		mkDateArr: function(e, t) {
			var r = [],
				i = 0,
				s = (new Date(e, t, 0)).getDate(),
				o = (new Date(e, t - 1, 1)).getDay();
			this.sundayIsWeekend && (o--, o < 0 && (o = 6));
			for (; i < s; i++) this.begin && parseInt("" + e + n.padLeft(t) + n.padLeft(i + 1), 10) < this.begin ? r[i + o] = "" : r[i + o] = i + 1;
			i = 42;
			while (i--) r[i] || (r[i] = "&nbsp;");
			return r
		},
		create: function(e) {
			typeof this.onInit == "function" && this.onInit();
			var r = '<td class="TdOut"></td>',
				s = e.showWeekNum ? '<td class="TdWeek"></td>' : "",
				o = e.showWeekNum ? 8 : 7,
				u = "",
				a = e.showWeekNum ? "<td class=TdWeek>" + e.symbols[2] + "</td>" : "";
			for (i = 0; i < 7; i++) s += r;
			var f = "<tr>" + s + "</tr>";
			for (i = 0; i < 6; i++) u += f;
			var l = '<table class="tbCalendarHeader"><tr><td class="signal jmpPrev">«</td><td class="tdCalendarHeader"></td><td class="signal jmpNext">»</td></tr></table>',
				c = t(l).appendTo(this.jq);
			this.toggler = c.find(".tdCalendarHeader"), c[0].onselectstart = n.PREVENT_FN;
			var h = '<table class="TbDateChooser"><thead style="height:24px;"><tr class="trDayName"></tr></thead><tbody class="tbdDate">' + u + "</tbody></table>";
			this.calendar = t(h).appendTo(this.jq).css({
				height: this.jq.height() - c.height()
			}), this.tds = this.calendar.find("td.TdOut"), this.weekTds = this.calendar.find("td.TdWeek"), this.ymTable = t('<table class="ymTable"><tr><td class="yearTd"></td></tr></table>').appendTo(this.jq).css("height", this.calendar.height()), this.selector = this.ymTable.find(".yearTd"), this.goto(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1), this.sundayIsWeekend && e.dayNames.push(e.dayNames.shift()), this.calendar.find(".trDayName").html(a + "</td><td class=TrOut>" + e.dayNames.join("</td><td class=TrOut>") + "</td>");
			var p = this;
			this.toggler.click(function() {
				p.showState = ++p.showState % 3, p.toggleView(p.showState)
			}), this.selector.delegate("td", "click", function(e) {
				p.showState = --p.showState % 3, p.toggleView(p.showState, t.text(this))
			}), this.toggler.siblings(".jmpPrev").click(function() {
				p.jumpPrev(p.showState)
			}), this.toggler.siblings(".jmpNext").click(function() {
				p.jumpNext(p.showState)
			});
			var d = this.calendar.find(".tbdDate");
			return d.delegate("td.TdOut", "click", function(e) {
				var n = t(this).data("date");
				n && t.trim(n) && p.chooseHandler(new Date(p.selectedYear, p.selectedMonth - 1, parseInt(n, 10)), e.currentTarget)
			}).find("tr").css("height", (this.calendar.height() - 24) / 6), this.showWeekNum && typeof this.onChooseWeek == "function" && d.delegate(".TdWeek", "click", function(e) {
				p.onChooseWeek(parseInt(t.text(e.currentTarget, 10)))
			}), this.createHandler(this.selectedDate), this
		},
		toggleView: function(e, n) {
			if (e) switch (e) {
			case 3:
				break;
			case 2:
				var r = Math.floor((n || this.selectedYear) * .1) * 10;
				this.toggler.text(r + " - " + (r + 10) + this.symbols[0]);
				var i = 0,
					s = [];
				for (; i < 11; i++) {
					s[i] = "";
					var o = r === this.selectedYear ? ' class="current"' : "";
					i % 4 || (s[i] += "<tr>"), s[i] += "<td" + o + ">" + r+++"</td>", i % 4 === 3 && (s[i] += "</tr>")
				}
				this.selector.html("<table>" + s.join("") + "</table>");
				break;
			case 1:
				n && (this.selectedYear = parseInt(n, 10)), this.toggler.text(this.selectedYear + this.symbols[0]);
				var u = this.monthNames,
					i = 0,
					s = [];
				for (; i < 12; i++) {
					s[i] = "";
					var o = i + 1 === this.selectedMonth ? ' class="current"' : "";
					i % 4 || (s[i] += "<tr>"), s[i] += "<td" + o + ">" + u[i] + "</td>", i % 4 === 3 && (s[i] += "</tr>")
				}
				this.selector.html("<table>" + s.join("") + "</table>"), this.calendar.hide(), this.ymTable.show()
			} else n && (this.selectedMonth = t.inArray(n, this.monthNames) + 1), this.drawMonthly(this.selectedYear, this.selectedMonth), this.ymTable.hide(), this.calendar.show()
		},
		chooseHandler: function(e, n) {
			this.selectedDate = e, this.tds.filter(".selectedDate").removeClass("selectedDate"), this.selectedTD = t(n).addClass("selectedDate"), typeof this.onChoose == "function" && this.onChoose(e, this.selectedTD)
		},
		rewriteDayTds: function(e, n) {
			var r = this.mkDateArr(e, n),
				i, s, o = this,
				u;
			this.tds.removeClass("today").removeClass("selectedDate").each(function(e, n) {
				s = r[e], u = t(n).removeAttr("style").unbind().removeData(), isNaN(s) ? u.html(s) : (i = new Date(o.selectedYear, o.selectedMonth - 1, parseInt(s, 10)), o.showToday && i.getTime() == o.today.getTime() && u.addClass("today"), i.getTime() == o.selectedDate.getTime() && u.addClass("selectedDate"), u.html(s).data("date", parseInt(s, 10)))
			}), this.showWeekNum && this.rewriteWeek(e, n), this.dateTds = [];
			for (var a = 0; a < r.length; a++) r[a] !== "&nbsp;" && this.dateTds.push(this.tds[a]);
			return this.dateTds = t(this.dateTds), typeof this.onCalendarEnter == "function" && this.onCalendarEnter(this.dateTds), this
		},
		rewriteWeek: function(e, r) {
			var i = new Date(e, r - 1, 1),
				s = n.weekSpan(i, this.schoolOpen);
			return !this.sundayIsWeekend && i.getDay() === 0 && s++, this.weekTds.each(function() {
				t(this).text(s++)
			}), this
		},
		jumpPrev: function(e) {
			switch (e) {
			case 0:
				this.selectedMonth = this.selectedMonth - 1, this.selectedMonth == 0 && (--this.selectedYear, this.selectedMonth = 12), this.drawMonthly(this.selectedYear, this.selectedMonth, "prev");
				break;
			case 1:
				this.toggler.text(--this.selectedYear + this.symbols[0]);
				break;
			case 2:
				this.toggleView(2, parseInt(this.selector.find("td:first").text(), 10) - 10)
			}
		},
		jumpNext: function(e) {
			switch (e) {
			case 0:
				this.selectedMonth = this.selectedMonth + 1, this.selectedMonth == 13 && (++this.selectedYear, this.selectedMonth = 1), this.drawMonthly(this.selectedYear, this.selectedMonth, "next");
				break;
			case 1:
				this.toggler.text(++this.selectedYear + this.symbols[0]);
				break;
			case 2:
				this.toggleView(2, parseInt(this.selector.find("td:first").text(), 10) + 10)
			}
		},
		getSelectedDate: function() {
			return this.selectedDate.getDate()
		},
		setSelectedDate: function(e) {
			return this.selectedDate = typeof e == "string" ? n.parseDate(e) : e, this.goto(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1), this
		},
		select: function(e) {
			return this.setSelectedDate(e), this.getTDByDate(e).trigger("click"), this
		},
		getDateByTd: function(e) {
			var t = [],
				n = this.selectedYear,
				r = this.selectedMonth;
			return e.each(function(i, s) {
				var o = e.eq(i).data("date");
				o && t.push(new Date(n, r, o))
			}), t
		},
		getTDByWeekNum: function(e) {
			var n, r = [];
			this.weekTds.each(function(r, i) {
				if (t.text(i) == e) return n = t(i), !1
			});
			if (n && n.length) {
				var i = n.parent("tr").find(".TdOut");
				i.each(function(e, n) {
					t(n).data("date") && r.push(n)
				})
			}
			return t(r)
		},
		getTDWeekNum: function(e) {
			var t = "不在当前月中";
			if (this.showWeekNum) {
				var n = e ? this.getTDByDate(e) : this.selectedTD;
				n.length && (t = n.parent().find(".TdWeek").text())
			} else t = "未设定显示周次";
			return t
		},
		getTDByDay: function(e) {
			var n = e;
			this.showWeekNum && e++, this.sundayIsWeekend && (e = n ? --e : e + 6);
			var r = [];
			return this.getTDmonthly().each(function(t, n) {
				n.cellIndex === e && r.push(n)
			}), t(r)
		},
		getTDByDate: function(e) {
			var r = this.dateTds,
				i = typeof e == "string" ? n.parseDate(e) : e,
				s = this.selectedMonth,
				o = this.selectedYear;
			if (o === i.getFullYear() && s === i.getMonth() + 1) {
				var u = r.length,
					a = i.getDate();
				while (u--) if (r.eq(u).data("date") === a) break;
				return r.eq(u)
			}
			return t(" ")
		},
		getTDweekly: function(e) {
			var n = this.getTDByDate(e);
			if (n.length) {
				var r = n.parent().find("td.TdOut");
				return r.not(function(e) {
					return r.eq(e).html() === "&nbsp;"
				})
			}
			return t(" ")
		},
		getTDmonthly: function(e) {
			var r = typeof e == "string" ? n.parseDate(e) : e,
				i = this.selectedMonth,
				s = this.selectedYear;
			return !e || s === r.getFullYear() && i === r.getMonth() + 1 ? this.dateTds : t(" ")
		},
		getTDByDateMonthly: function(e) {
			var t = parseInt(e, 10) || 1;
			return this.dateTds.eq(--t)
		},
		getTDByDateYearly: function(e, n) {
			var r = parseInt(e, 10) || 0,
				i = parseInt(n, 10) || 1;
			return this.selectedMonth === r ? this.getTDByDate(new Date(this.selectedYear, r - 1, i)) : t(" ")
		},
		getFirstDateOfMonth: function(e, t) {
			var n = e || this.selectedYear,
				r = t || this.selectedMonth;
			return new Date(n, r - 1, 1)
		},
		getLastDateOfMonth: function(e, t) {
			var n = e || this.selectedYear,
				r = t || this.selectedMonth;
			return new Date(n, r, 0)
		},
		getTDBetween: function(e, r) {
			var i = e instanceof Date ? e : n.parseDate(e),
				s = r instanceof Date ? r : n.parseDate(r),
				o = this.getFirstDateOfMonth(),
				u = this.getLastDateOfMonth(),
				a = [];
			if (o >= i && o <= s || u >= i && u <= s) {
				var f = this;
				this.dateTds.each(function(e, n) {
					var r = new Date(f.selectedYear, f.selectedMonth - 1, t(n).data("date"));
					r >= i && r <= s && a.push(n)
				})
			}
			return t(a)
		}
	}, n.register("dateChooser", f, "DisplayObject")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, s) {
			var o = t.extend({
				format: "yyyy-MM-dd",
				allowBlank: !0
			}, s),
				u = this;
			this.format = o.format, this.onChoose = o.onChoose, this.jq = e.addClass("dateField-input").prop("readonly", !0);
			var a = t.extend({}, o);
			delete a.onInit, delete a.onCreate, a.onChoose = function(e, t) {
				u._syncData(), typeof u.onChoose == "function" && u.onChoose(u.text, e, t), u.close()
			}, this.dateChooser = n(t('<div class="combo-dropDown dateField-combo"/>').appendTo("body")).dateChooser(a), this._syncData(), o.target = this.dateChooser.jq, o.text === r && (o.text = this.text), i.parent.call(this, e, o)
		};
	i.prototype = {
		_syncData: function() {
			this.selectedDate = this.dateChooser.selectedDate, this.text = n.formatDate(this.selectedDate, this.format), this.jq.val(this.text)
		},
		setSelectedDate: function(e) {
			return this.dateChooser.setSelectedDate(e), this._syncData(), this
		},
		"goto": function(e, t, n) {
			return this.dateChooser.goto(e, t, n), n && this._syncData(), this
		},
		select: function(e) {
			return this.dateChooser.select(e), this
		}
	}, n.register("dateField", i, "ComboBase")
}(window, jQuery, fy), function(e, t, n, r) {
	function i(e) {
		var n = t.trim(this.jq.val());
		if (n) {
			var r = this.list,
				i = [];
			for (var s = 0, o = this.data.length; s < o; s++) {
				var u = this.data[s];
				if (u[e.textSrc].indexOf(n) !== -1) {
					i.push(u);
					if (i.length === e.maxEntries) break
				}
			}
			i.length ? (r.bindData({
				data: i
			}), this.open(), r.items.each(function(e, r) {
				var i = t(r);
				i.html(i.text().replace(n, '<span class="fBlue fBold">' + n + "</span>"))
			})) : (this.list.bindData({
				data: []
			}), this.close())
		} else this.list.bindData({
			data: []
		}), this.close()
	}
	var s = function(e, r) {
			var o = t.extend({
				enabled: !0,
				textSrc: "text",
				maxEntries: 5,
				selectedClass: "autoComplete-hi"
			}, r),
				u = this;
			this.enabled = o.enabled, this.list = n('<ul class="combo-dropDown autoComplete"><li class="fLightGray">loading...</li></ul>').list(o), this.list.onSelect = function() {
				var e = this.getSelectedItem();
				u.jq.val(t.text(e))
			}, this.list.onCreate = function(e) {
				u.data = e.data, this.bindData({
					data: []
				}), this.jq.css({
					width: u.jq.width()
				}).click(function() {
					u.close()
				}), u.jq.bind("keyup.fyDropdown", function(e) {
					if (!u.enabled) return;
					var n = t.trim(u.jq.val()),
						r = e.keyCode,
						s = u.list;
					if (r === 38 || r === 40) if (s.selectedIndex === -1) s.setSelectedIndex(0);
					else {
						var a = s.selectedIndex;
						r === 38 ? a === 0 ? a = s.items.length - 1 : a-- : a === s.items.length - 1 ? a = 0 : a++, s.setSelectedIndex(a)
					} else r === 13 ? u.close() : i.call(u, o);
					return !1
				})
			}, o.target = this.list.jq.appendTo("body"), o.onBeforeOpen = function() {
				if (!t.trim(u.jq.val()) || !u.list.data.length) return !1
			}, s.parent.call(this, e, o), this.position()
		};
	s.prototype = {
		enable: function() {
			this.enabled = !0
		},
		disable: function() {
			this.enabled = !1
		}
	}, n.register("autoComplete", s, "ComboBase")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, n) {
			var r, s = t.extend({
				bindOptions: {},
				textSrc: "text",
				selectedIndex: 0,
				autoHeight: !1,
				eventType: "click"
			}, n);
			n.renderer ? (r = ":=render", s.bindOptions.itemRender = {
				render: n.renderer
			}) : r = "";
			var o = s.iconSrc ? '<img src="{' + s.iconSrc + '}" class="accIco" align="absmiddle" />' : "";
			s.bindOptions.template = s.template || '<li><div class="accHead">' + o + "{" + s.textSrc + r + '}</div><div class="accBox"></div></li>', i.parent.call(this, e, s), this.jq[0].tagName.toLowerCase() !== "ul" && (this.jq = t('<ul class="accUL"></ul>').appendTo(this.jq)), this.selectedIndex = s.selectedIndex, this.selectedClass = s.selectedClass, this.autoHeight = !! s.autoHeight, this.boxHeight = 0, this.eventType = s.eventType, this.stacks = e.children("li"), this.onSelect = s.onSelect, this.lazy || this.create(s)
		};
	i.prototype = {
		adjustHeight: function() {
			this.boxHeight = this.jq.innerHeight() - this.stacks.find(".accHead").eq(0).outerHeight() * this.stacks.length, this.jq.find(".accBox").outerHeight(this.boxHeight)
		},
		createHandler: function(n) {
			var r = this;
			this.stacks = this.jq.children("li"), this.boxHeight = this.jq.innerHeight() - this.stacks.find(".accHead").eq(0).outerHeight() * this.stacks.length;
			if (this.autoHeight) {
				this.jq.find(".accBox").css("height", this.boxHeight);
				var i = 0;
				t(e).resize(function() {
					i && clearTimeout(i), i = setTimeout(function() {
						r.adjustHeight()
					}, 50)
				})
			}
			return this.jq.delegate(".accHead", this.eventType, function(e) {
				e.stopImmediatePropagation();
				var n = t(e.currentTarget),
					i = n.parent(),
					s = r.stacks.index(i);
				if (s === r.selectedIndex && r.prevIndex != -1) return;
				r.prevIndex = r.selectedIndex, r.selectedIndex = s, r.stacks.eq(r.prevIndex).children(".accBox.current").removeClass("current").slideUp(100), r.stacks.eq(s).children(".accBox").addClass("current").slideDown(100), r.selectedClass && (r.stacks.find("." + r.selectedClass).removeClass(r.selectedClass), t(e.currentTarget).addClass(r.selectedClass)), typeof r.onSelect == "function" && r.onSelect(e)
			}), typeof this.onCreate == "function" && this.onCreate(n), this.openBox(this.selectedIndex), this
		},
		openBox: function(e) {
			this.jq.find(".accHead").eq(e).trigger(this.eventType)
		},
		getBox: function(e) {
			return this.stacks.eq(e).find(".accBox")
		},
		getBar: function(e) {
			return this.stacks.eq(e).children(".accHead")
		}
	}, n.register("accordion", i, "ListBase")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, n) {
			var r = {
				arrow: !0,
				arrowColor: "",
				once: !1,
				trigger: "auto",
				fixedWidth: 0,
				offsetX: 0,
				offsetY: 0,
				position: "top-left",
				tooltipTheme: ".tooltip-message"
			},
				s = t.extend(r, n);
			i.parent.call(this, e, s), this.tipText = s.text || this.jq.attr("title") || "", this.sets = s, this.$tip = null, this.tooltip_width = this.tooltip_height = 0, this.create(s)
		};
	i.prototype = {
		create: function() {
			function p() {
				var r = t(e).scrollLeft();
				if (v - r < 0) {
					var i = v - r;
					v = r, n.$tip.data("arrow-reposition", i)
				}
				if (v + l - r > u) {
					var i = v - (u + r - l);
					v = u + r - l, n.$tip.data("arrow-reposition", i)
				}
			}
			typeof this.onInit == "function" && this.onInit();
			var n = this,
				r = this.jq,
				i = this.sets,
				s = n.tipText,
				o = i.fixedWidth > 0 ? ' style="width:' + i.fixedWidth + 'px;"' : "";
			n.$tip = t('<div class="' + i.tooltipTheme.replace(".", "") + '"' + o + '><div class="tooltip-message-content">' + s + "</div></div>").hide().appendTo("body"), r.data("$tip", n.$tip), r.data("sets", i);
			var u = t(e).width(),
				a = r.outerWidth(!1),
				f = r.outerHeight(!1),
				l = this.tooltip_width = n.$tip.outerWidth(!1),
				c = this.tooltip_height = n.$tip.outerHeight(!1),
				h = r.offset();
			i.fixedWidth || n.$tip.css({
				width: l + "px",
				paddingLeft: 0,
				paddingRight: 0
			});
			switch (i.position) {
			case "top":
				var d = h.left + l - (h.left + r.outerWidth(!1)),
					v = h.left + i.offsetX - d / 2,
					m = h.top - c - i.offsetY - 10;
				p(), h.top - c - i.offsetY - 11 < 0 && (m = 0);
				break;
			case "top-left":
				var v = h.left + i.offsetX,
					m = h.top - c - i.offsetY - 10;
				p();
				break;
			case "top-right":
				var v = h.left + a + i.offsetX - l,
					m = h.top - c - i.offsetY - 10;
				p();
				break;
			case "bottom":
				var d = h.left + l + i.offsetX - (h.left + r.outerWidth(!1)),
					v = h.left - d / 2,
					m = h.top + f + i.offsetY + 10;
				p();
				break;
			case "bottom-left":
				var v = h.left + i.offsetX,
					m = h.top + f + i.offsetY + 10;
				p();
				break;
			case "bottom-right":
				var v = h.left + a + i.offsetX - l,
					m = h.top + f + i.offsetY + 10;
				p();
				break;
			case "left":
				var v = h.left - i.offsetX - l - 10,
					g = h.left + i.offsetX + a + 10,
					y = h.top + c + i.offsetY - (h.top + r.outerHeight(!1)),
					m = h.top - y / 2;
				v < 0 && g + l > u && (v += l);
				if (v < 0) {
					var v = h.left + i.offsetX + a + 10;
					n.$tip.data("arrow-reposition", "left")
				}
				break;
			case "right":
				var v = h.left + i.offsetX + a + 10,
					g = h.left - i.offsetX - l - 10,
					y = h.top + c + i.offsetY - (h.top + r.outerHeight(!1)),
					m = h.top - y / 2;
				v + l > u && g < 0 && (v = u - l), v + l > u && (v = h.left - i.offsetX - l - 10, n.$tip.data("arrow-reposition", "right"));
				break;
			default:
			}
			if (i.arrow == 1) {
				var b = "tooltip-arrow-" + i.position,
					w = n.$tip.css("backgroundColor"),
					E = "◆",
					S = "";
				b == "tooltip-arrow-right" ? S = "top:" + (c / 2 - 6) + "px" : b == "tooltip-arrow-left" && (S = "top:" + (c / 2 - 6) + "px"), b.search("top") > 0 && (S = "top: " + (c - 8) + "px"), b.search("bottom") > 0 && (S = "top: -6px");
				var x = '<div class="' + b + ' tooltip-arrow" style="color:' + w + "; width:" + l + "px; " + S + '">' + E + "</div>";
				n.$tip.css({
					top: m + "px",
					left: v + "px"
				}).append(x)
			}
			return i.trigger === "auto" && r.bind("mouseenter.fy", function() {
				n.show()
			}).bind("mouseleave.fy blur.fy", i.once ?
			function() {
				n.dispose()
			} : function() {
				n.hide()
			}), this.createHandler(), this
		},
		dispose: function() {
			var e = this.jq,
				t = this.$tip;
			return t.stop(!0, !0).fadeOut(200, function() {
				e.removeData().unbind(".fy"), t.removeData().remove()
			}), this
		},
		show: function() {
			return this.$tip.stop(!0, !0).fadeIn(200), this
		},
		hide: function() {
			return this.$tip.stop(!0, !0).fadeOut(200), this
		}
	}, n.register("toolTip", i, "DisplayObject")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = 0,
		s = function(e, n) {
			var r = this,
				o = t.extend({}, n);
			s.parent.call(this, e, o), this.cmds = {};
			var u = "fyMenu" + i++,
				a = t('<ul id="' + u + '" class="contextMenu"></ul>'),
				f = o.menu;
			for (var l in f) a.append('<li><a href="#' + l + '">' + f[l].txt + "</a></li>"), this.cmds[l] = f[l].cmd;
			t("body").append(a), this.jq = a, o.menu = u, e.contextMenu(o, function(e, t, n) {
				r.cmds[e](t, n)
			})
		};
	s.prototype = {
		disable: function(e) {
			this.jq.disableContextMenuItems(e)
		},
		enable: function(e) {
			this.jq.enableContextMenuItems(e)
		}
	}, n.register("contextMenu", s, "DisplayObject")
}(window, jQuery, fy), function(e, t, n, r) {
	function o(e, n) {
		setTimeout(function() {
			e.tbody.find("tr:first").find(".editableTD").eq(0).trigger("click")
		}, 100), e.tbody.delegate("td", "keydown", function(r) {
			var i = t(this);
			switch (r.keyCode) {
			case 13:
				setTimeout(function() {
					var t = i.nextAll(".editableTD");
					if (t.length) t.eq(0).trigger("click");
					else {
						var r = i.parent("tr"),
							s = r.next("tr");
						s.length ? s.find(".editableTD").eq(0).trigger("click") : n && (e.addRow(n), e.tbody.find("tr:last").find(".editableTD").eq(0).trigger("click"))
					}
				}, 20);
				break;
			case 37:
				setTimeout(function() {
					var e = i.prevAll(".editableTD");
					e.length && e.eq(0).trigger("click")
				}, 20);
				break;
			case 38:
				setTimeout(function() {
					var e = i.parent("tr").prev("tr"),
						t;
					e.length && (t = e.find("td").eq(i[0].cellIndex), t.trigger("click"))
				}, 20);
				break;
			case 39:
				setTimeout(function() {
					var e = i.nextAll(".editableTD");
					e.length && e.eq(0).trigger("click")
				}, 20);
				break;
			case 40:
				setTimeout(function() {
					var t = i.parent("tr").next("tr"),
						r;
					t.length ? (r = t.find("td").eq(i[0].cellIndex), r.trigger("click")) : n && (e.addRow(n), e.tbody.find("tr:last").find(".editableTD").eq(0).trigger("click"))
				}, 20);
				break;
			default:
			}
		})
	}
	var i = 0,
		s = function(e, r) {
			var i = this,
				o = t.extend({
					template: this.makeTemplate(r)
				}, r);
			s.parent.call(this, e, o), this.columns = o.columns;
			if (this.jq[0].tagName.toLowerCase() !== "table") this.jq = t('<table id="' + e[0].id + '_table" class="fui-datagrid"></table>').appendTo(this.jq);
			else {
				this.jq.addClass("fui-datagrid");
				if (n.browser.webkit) {
					var u = t("<br>");
					this.jq.replaceWith(u), u.replaceWith(this.jq)
				}
			}
			this.table = this.jq, this.makeTHeader(o), this.thead = this.jq.find("tr.fyGridHeadCols"), this.
			tfoot = this.jq.find("tfoot td").eq(0), this.tbody = this.jq = this.jq.find("tbody"), this.group && this.tbody.addClass("groupedTbody"), this.titleBars = 1, o.header && this.titleBars++, o.toolBar && this.titleBars++, this.sortInLocal = !! o.sortInLocal, o.selectedClass && (this.selectedClass = o.selectedClass), this.keyboardEdit = o.keyboardEdit, o.hideHeader && this.thead.hide(), this.tbody.delegate("td", "click.fy", function(e) {
				i.selectHandler(e, t(e.currentTarget).parents("tr")[0].rowIndex - i.titleBars)
			}), r.onRowDblClick && this.tbody.delegate("tr", "dblclick", function() {
				r.onRowDblClick(i.selectedIndex, i.getSelectedData())
			}), this.pagination = o.pagination, this.param = o.param, this.lazy || this.create()
		};
	s.prototype = {
		create: function() {
			typeof this.onInit == "function" && this.onInit(), typeof this.htmlMashup == "function" && this.htmlMashup(!0);
			if (this.data) this.sortInLocal = !0, this.bindData({
				data: this.data
			}, !0);
			else if (this.url) {
				var e = this;
				if (this.pagination) {
					var n = {
						link_to: "javascript:void(0)",
						num_edge_entries: 1,
						num_display_entries: 5,
						items_per_page: 10,
						prev_text: "上页",
						next_text: "下页",
						load_first_page: !1,
						callback: function(t, n) {
							return e.pageIndex = e.param.pageIndex = t, e.update(), !1
						}
					};
					this.pagination = t.extend(n, this.pagination), this.pageCount = this.pageIndex = this.rowCount = 0, this.pageSize = this.pagination.items_per_page, this.param = t.extend({
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}, this.param), this.tPager = t('<div style="float: right; "></div>').appendTo(this.tfoot), this.pagination.showCount && (typeof this.pagination.showCount == "string" ? this.showCountTmpl = this.pagination.showCount : this.showCountTmpl = "总记录数: {rowCount} , 第{pageNum} / {pageCount}页", this.pageCounter = t("<span></span>"), this.tPager.after(this.pageCounter));
					if (this.pagination.customizable) {
						this.pagination.customizable.push || (this.pagination.customizable = [10, 20, 50]);
						var r = this.pagination.customizable,
							i = [];
						for (var s = 0, o = r.length; s < o; s++) i[s] = '<option value="' + r[s] + '" ' + (r[s] == this.pageSize ? "selected" : "") + ">" + r[s] + "</option>";
						this.pageSelector = t('<select style="width: 50px;margin-right: 12px;">' + i.join("") + "</select>"), this.tfoot.prepend(this.pageSelector), this.pageSelector.bind("change", function() {
							return e.pageSize = e.param.pageSize = this.options[this.selectedIndex].value, e.pageIndex = e.param.pageIndex = 0, e.update(), !1
						})
					}
				}
				this.xhr = t.ajaxSettings.xhr(), this.ajax(this.param, !0)
			}
			return this
		},
		bindHandler: function(e, t) {
			this.items = this.tbody.find("tr"), this.group && this.mkGroup(this.group, e, t), typeof this.onBind == "function" && this.onBind(e, t)
		},
		createHandler: function(e) {
			this.created = !0, this.paginate(e, !0), this.columns && (this.sortColumn(e, !0), this.configEditable(e, !0)), typeof this.onCreate == "function" && (this.onCreate(e), this.keyboardEdit && o(this))
		},
		mkGroup: function(e, t, n) {
			for (var r = 0, i = e.length; r < i; r++) {
				var s = e[r],
					o = null,
					u = 1,
					a = null,
					f = this.cols(s);
				for (var l = 0, c = f.length; l < c; l++) {
					var h = f.eq(l),
						p = h.html();
					p !== o ? (o = p, u = 1, a = h) : (u++, h.remove(), a.attr("rowspan", u))
				}
			}
		},
		paginate: function(e, t) {
			this.pagination && (this.pageInfo = e.page || this.pageInfo, this.pageInfo.pageNum = this.pageInfo.pageIndex + 1, this.rowCount = this.pageInfo.rowCount, this.pageIndex = this.pagination.current_page = this.pageInfo.pageIndex, this.pageCount = this.pageInfo.pageCount, this.pageSize = this.pagination.items_per_page = this.pageInfo.pageSize, this.tPager.pagination(this.rowCount, this.pagination), this.pagination.showCount && this.pageCounter.html(n.formatJSON(this.showCountTmpl, this.pageInfo)))
		},
		updateHandler: function(e, t) {
			t = !! t, this.paginate(e, t), this.columns && this.configEditable(e, t), typeof this.onUpdate == "function" && this.onUpdate(e, t), typeof this.onUpdateOnce == "function" && (this.onUpdateOnce(e, t), delete this.onUpdateOnce)
		},
		configEditable: function(e, n) {
			var r = this,
				i = function(e, n) {
					var s = t(this),
						o = e,
						u = r.data[s.parent("tr")[0].rowIndex - r.titleBars],
						a = r.columns[this.cellIndex].src,
						f = s.data("oval") || u[a],
						l = s.data("oldHTML");
					if (e != f) {
						var c = r.columns[this.cellIndex].renderer;
						c && (o = c(e, this.cellIndex, u, a)), u[a] = e, u[":modified by user"] = !0;
						if (s.data("linkRow")) {
							var h = s.siblings("td");
							h.each(function(e, t) {
								var n = h.eq(e),
									i = r.columns[t.cellIndex].renderer;
								if (i && !t.editing) {
									var s = i(u[r.columns[t.cellIndex].src], t.cellIndex, u, a);
									n.html(s).data({
										oldHTML: s
									})
								}
							})
						}
						s.data("oval", e).data({
							oldHTML: o
						}).addClass("tableEditedCell"), n.type === "select" ? (n.data.selected = e, s.editable("destroy"), s.editable(i, n)) : n.type === "checkBox";
						if (n.onEdited) {
							var p = {};
							p[a] = e, n.onEdited.call(r, s, p, u, a)
						}
					} else o = l;
					return o
				},
				s = l = this.columns.length;
			while (s--) {
				var o = this.columns[s];
				if (o.editable) {
					var u = this.cols(s);
					u.each(function(e, n) {
						var s = t(n),
							u = {
								onblur: "submit",
								width: "none",
								height: "none",
								placeholder: ""
							};
						o.editable.submit && (u.onblur = "ignore");
						var a = t.extend(u, o.editable);
						if (a.type === "select") {
							if (a.data.reverse) {
								var f = a.data,
									l = f.length,
									c = {};
								while (l--) c[f[l][a.value]] = f[l][a.text];
								a.data = c
							}
							a.data = t.extend({
								selected: s.data("oval")
							}, a.data)
						}
						s.bind("click.fy", function(e) {
							r.selectHandler(e, n.parentElement.rowIndex - r.titleBars)
						}).data({
							oldHTML: s.html()
						}).addClass("editableTD").editable(i, a), o.editable.linkRow && s.data("linkRow", !0)
					})
				}
				switch (o.cmd) {
				case "checkAll":
					n && (this.cmdCheckAll = this.thead.find("th").eq(s).find("input"), this.cmdCheckAll.syncCheckBoxGroup("td.cellIndex_0>:checkbox:enabled", this.tbody)), this.cmdCheckAll.prop("checked", !1);
					break;
				case "checkOne":
					n && (this.cmdCheckOne = this.thead.find("th").eq(s).find("input:hidden"));
					break;
				default:
				}
			}
		},
		makeTHeader: function(e) {
			var n = 0,
				r = e.columns ? e.columns.length : 0,
				i = [],
				s = [];
			for (; n < r; n++) {
				var o = !1,
					u = e.columns[n];
				u.cmd && (o = !0, u.width = "30", u.cmd === "checkAll" ? u.text = '<label><input type="checkbox" name="' + u.src + '" value="chk_' + n + '"> ' + (u.text || "") + "</label>" : u.text = '<input type="hidden" name="' + u.src + '" value="chk_' + n + '">'), s[n] = '<th data-osrc="' + (typeof u.sortable == "string" ? u.sortable : u.src) + '"' + (o ? ' style="text-overflow:clip;"' : "") + ">" + (u.text || "column_" + n) + "</th>", i[n] = "width:" + (u.width ? u.width + "px;" : "auto;min-width:16px;")
			}
			var a = e.header ? '<tr class="fyGridHeadText"><th colspan="' + (r || "1") + '">' + e.header + "</th></tr>" : "",
				f = e.toolBar ? '<tr class="fyGridHeadBar"><th class="fyToolBar" colspan="' + r + '" ></th></tr>' : "",
				l = '<colgroup><col style="' + i.join('"><col style="') + '"></colgroup><thead>' + a + f + '<tr class="fyGridHeadCols">' + s.join("") + "</tr></thead>",
				c = e.hideFooter ? "" : '<tfoot><tr><td colspan="' + (r || "1") + '"></td></tr></tfoot>';
			this.jq.append(l + '<tbody id="' + this.jq[0].id + '_tbody"></tbody>' + c);
			if (e.toolBar) {
				this.toolBar = this.jq.find(".fyToolBar");
				var h;
				for (n = 0, r = e.toolBar.length; n < r; n++) h = e.toolBar[n], t("<button" + (h.id ? ' id="' + h.id + '"' : "") + ' class="fyToolBar_Button" style="' + (h.icon ? "background-image:url(" + h.icon + ")" : "text-indent:0") + ';" ' + (h.disabled ? "disabled" : "") + ">" + h.text + "</button>").click(h.onClick).appendTo(this.toolBar);
				this.toolBar.buttons = this.toolBar.find(".fyToolBar_Button"), e.toolBarPosition === "bottom" && this.toolbarCopy(), e.toolBarPosition === "both" && this.toolbarCopy(!0)
			}
		},
		makeTemplate: function(e) {
			var n = [],
				s, o, u = 0,
				a = e.columns ? e.columns.length : 0;
			e.bindOptions = t.extend({
				itemRender: {}
			}, e.bindOptions);
			for (; u < a; u++) {
				var f = e.columns[u];
				f.group && (this.group ? this.group.push(u) : this.group = [u]);
				var l = f.className ? " " + f.className : "";
				if (f.cmd) f.cmd === "checkAll" ? n[u] = '<td data-osrc="' + f.src + '" class="font-center cellIndex_' + u + '">' + '<input type="checkbox" name="chk_' + u + '" value="{' + f.src + '}"></td>' : n[u] = '<td data-osrc="' + f.src + '" class="font-center cellIndex_' + u + '">' + '<input type="radio" name="chk_' + u + '" value="{' + f.src + '}"></td>';
				else {
					typeof f.renderer == "function" ? (o = f.src + "_Renderer" + ++i, s = ":=" + o, e.bindOptions.itemRender[o] = f.renderer) : s = "";
					var c = "";
					l && f.title === r && (f.title = !0), f.title === !0 ? c = ' title="{' + f.src + s + '}"' : typeof f.title == "string" && (c = ' title="' + f.title.replace(/"/g, '\\"') + '"');
					var h = f.align ? "font-" + f.align.toLowerCase() : "";
					n[u] = "<td " + c + ' data-osrc="' + f.src + '" class="' + h + " cellIndex_" + u + l + '">{' + f.src + s + "}</td>"
				}
			}
			return "<tr>" + n.join("") + "</tr>"
		},
		toolbarCopy: function(e) {
			if (this.toolBar) {
				var t;
				e ? (t = this.toolBar.parent().clone(!0), t.find(".fyToolBar_Button").each(function(e, t) {
					t.id && (t.id = t.id + "_2")
				})) : t = this.toolBar.parent(), this.table.find("tfoot").prepend(t)
			}
		},
		th: function(e) {
			return e !== r ? this.thead.find("th").eq(parseInt(e, 10) || 0) : this.thead.find("th")
		},
		hideColumn: function(e) {
			this.th(e).add(this.cols(e)).hide()
		},
		rows: function(e) {
			return e !== r ? this.tbody.find("tr").eq(parseInt(e, 10) || 0) : this.tbody.find("tr")
		},
		cols: function(e) {
			return e !== r ? this.tbody.find(".cellIndex_" + e) : this.tbody.find("td")
		},
		selectHandler: function(e, t) {
			this.prevIndex = this.selectedIndex, this.selectedIndex = t, this.selectedClass && (this.prevIndex > -1 && this.rows(this.prevIndex).removeClass(this.selectedClass), this.rows(t).addClass(this.selectedClass)), typeof this.onSelect == "function" && this.onSelect(e)
		},
		sortColumn: function(e) {
			var r = this.thead.find("th"),
				i = this.sortInLocal,
				s = this;
			for (var o = 0, u = this.columns.length; o < u; o++) if (this.columns[o].sortable) {
				var a = r.eq(o);
				a.append('<span class="spSortableTH"></span>'), i ? a.click(function() {
					var e = t(this);
					e.data("sortType", e.data("sortType") === "desc" ? "asc" : "desc");
					var r = e.data("osrc");
					s.json.data = n.sortOn(s.json.data, r, s.columns[this.cellIndex].sortFunction), s.prevSortCol && s.prevSortCol.find(".spSortableTH").text(""), s.prevSortCol = e, e.data("sortType") === "desc" ? (s.json.data.reverse(), e.find(".spSortableTH").text(" (▾)")) : e.find(".spSortableTH").text(" (▴)"), s.bindData(s.json, !1)
				}) : r.eq(o).click(function() {
					var e = t(this),
						n = e.data("sortType") === "desc" ? "asc" : "desc";
					e.data("sortType", n), s.curSortCol = e, s.prevSortCol && s.prevSortCol[0] != s.curSortCol[0] && s.prevSortCol.find(".spSortableTH").text(""), s.prevSortCol = e, n === "desc" ? e.find(".spSortableTH").text(" (▾)") : e.find(".spSortableTH").text(" (▴)");
					var r = {
						sortBy: e.data("osrc"),
						sortType: n
					};
					s.update(r)
				})
			}
		},
		getCheckValue: function() {
			var e, t;
			if (this.cmdCheckAll) {
				e = this.cmdCheckAll.val(), t = this.tbody.find("[name='" + e + "']:checked");
				if (t.length) {
					var n = this.tbody.find("[name='" + e + "']:checked").fieldsToJson();
					return n[e].push ? n[e] : [n[e]]
				}
				return []
			}
			return this.cmdCheckOne ? (e = this.cmdCheckOne.val(), t = this.tbody.find(":radio[name='" + e + "']:checked"), t.val() || null) : null
		},
		getCheckData: function() {
			if (this.cmdCheckAll || this.cmdCheckOne) {
				var e = (this.cmdCheckAll || this.cmdCheckOne).val(),
					t = this.tbody.find("input[name='" + e + "']"),
					n = this.cmdCheckAll ? [] : null;
				for (var r = 0, i = t.length; r < i; r++) if (t[r].checked) {
					if (this.cmdCheckOne) return this.data[r];
					n.push(this.data[r])
				}
				return n
			}
			return null
		},
		addRow: function(e) {
			return this.data.push(e), this.bindData({
				data: this.data
			}), this
		},
		delRowAt: function(e) {
			return this.data.splice(e, 1), this.bindData({
				data: this.data
			}), this.updateHandler(this.data), this
		},
		getModifiedRows: function() {
			var e = [],
				t = this.data,
				n = t.length;
			while (n--) t[n][":modified by user"] && e.push(t[n]);
			return this.getPureData(e)
		},
		delRow: function(e) {
			var t = this.items.index(e);
			return this.delRowAt(t), this
		},
		empty: function() {
			return this.tbody.html(""), this
		},
		setTitle: function(e) {
			var t = this.table.find("tr.fyGridHeadText");
			t.length && t.find("th:first").html(e)
		}
	}, n.register("datagrid", s, "ListBase")
}(window, jQuery, fy), function(e, t, n) {
	var r = 0,
		i = function(e, n) {
			var s = '<option value="{' + (n.value || "value") + '}">{' + (n.text || "text") + "}</option>",
				o = t.extend({
					template: s,
					elementName: "fyElem_" + ++r
				}, n),
				u = this;
			i.parent.call(this, e, o), this.elementName = o.elementName, this.initSelectedIndex = o.selectedIndex || 0, this.autoFire = o.autoFire, this.jq[0].tagName !== "SELECT" && (this.jq = t('<select name="' + this.elementName + '" class="fui-button theme-select"></select>').appendTo(this.jq)), this.jq.bind("change.fy", function(e) {
				u.selectHandler(e)
			}), this.lazy || this.create()
		};
	i.prototype = {
		setSelectedIndex: function(e) {
			return this.selectedIndex = this.jq[0].selectedIndex = e, this
		},
		selectHandler: function(e) {
			this.prevIndex = this.selectedIndex, this.selectedIndex = this.jq[0].selectedIndex, typeof this.onSelect == "function" && this.onSelect(e)
		},
		bindHandler: function(e, t) {
			this.items = this.jq.find("option"), this.selectedIndex = this.items.length > this.initSelectedIndex ? this.initSelectedIndex : this.items.length ? 0 : -1, this.prevIndex = -1, typeof this.onBind == "function" && this.onBind(e, t);
			if (this.selectedIndex > -1 || this.autoFire) {
				var n = this;
				setTimeout(function() {
					n.selectedIndex > 0 && n.setSelectedIndex(n.selectedIndex), n.autoFire && n.jq.trigger("change.fy")
				}, 0)
			}
		},
		getValue: function() {
			return this.jq.val()
		},
		getText: function() {
			var e = this.jq[0];
			return e.options[e.selectedIndex].text
		}
	}, n.register("listBox", i, "ListBase");
	var s = function(e, n) {
			this.elementName = n.elementName || "fyElem_" + ++r;
			var i = '<label><input name="' + this.elementName + '" type="checkbox" value="{' + (n.value || "value") + '}">{' + (n.text || "text") + "}</label>" + (n.joiner === undefined ? " " : n.joiner),
				o = t.extend({
					template: i
				}, n),
				u = this;
			this.autoFire = !! o.autoFire, s.parent.call(this, e, o), this.jq.bind("change.fy", function(e) {
				u.selectHandler(e)
			}), this.lazy || this.create()
		};
	s.prototype = {
		bindHandler: function(e, t) {
			this.items = this.jq.find("input[name='" + this.elementName + "']:checkbox"), typeof this.onBind == "function" && this.onBind(e, t)
		},
		getSelectedIndices: function() {
			var e = this.items.filter(":checked"),
				t = [],
				n = this.items;
			return e.each(function(e, r) {
				t.push(n.index(r))
			}), t
		},
		getSelectedItems: function() {
			return this.items.filter(":checked")
		},
		getSelectedData: function(e) {
			var t = this.items.filter(":checked"),
				n = [],
				r = this;
			return t.each(function(e, t) {
				var i = r.data[r.items.index(this)],
					s = {},
					o;
				for (o in i) o.indexOf(":") === -1 && (s[o] = i[o]);
				n.push(s)
			}), n
		},
		getValue: function() {
			var e = this.items.filter(":checked");
			if (e.length) {
				var t = [];
				return e.each(function(e, n) {
					t.push(n.value)
				}), t
			}
			return null
		}
	}, n.register("checkBox", s, "ListBase");
	var o = function(e, n) {
			this.elementName = n.elementName || "fyElem_" + ++r;
			var i = '<label><input name="' + this.elementName + '" type="radio" value="{' + (n.value || "value") + '}">{' + (n.text || "text") + "}</label>" + (n.joiner === undefined ? " " : n.joiner),
				s = t.extend({
					template: i
				}, n),
				u = this;
			this.autoFire = !! s.autoFire, this.initSelectedIndex = s.selectedIndex, o.parent.call(this, e, s), this.jq.delegate(":radio", "change.fy", function(e) {
				u.selectHandler(e)
			}), this.lazy || this.create()
		};
	o.prototype = {
		bindHandler: function(e, t) {
			this.items = this.jq.find("input[name='" + this.elementName + "']:radio"), this.selectedIndex = this.items.length > this.initSelectedIndex ? this.initSelectedIndex : this.items.length ? 0 : -1, this.prevIndex = -1, typeof this.onBind == "function" && this.onBind(e, t);
			if (this.autoFire || this.initSelectedIndex !== undefined) {
				var n = this;
				setTimeout(function() {
					var e = n.initSelectedIndex === undefined ? 0 : n.initSelectedIndex;
					n.setSelectedIndex(e), n.items.eq(e).prop("checked", !0).trigger("change.fy")
				}, 0)
			}
		},
		getValue: function() {
			return this.items.filter(":checked").val()
		}
	}, n.register("radioBox", o, "ListBase")
}(window, jQuery, fy), function(e, t, n) {
	var r = function(e, n) {
			var i = t.extend({}, n);
			r.parent.call(this, e, i);
			if (this.jq[0].tagName !== "FORM") {
				var s = this.jq.children().first();
				s[0].tagName !== "FORM" ? this.jq = this.jq.wrapInner(t("<form style='padding:0;margin:0;'></form>")).children().first() : this.jq = s
			}
			this.action = i.action, this.method = i.method === "post" ? "post" : i.method === "get" ? "get" : "getJSON", this.validator = i.validator, this.success = i.success, this.param = null, this.oldData = i.data, this.lazy || this.create();
			if (i.trigger) {
				var o = this;
				this.trigger = t(i.trigger).click(function() {
					o.submit()
				})
			}
		};
	r.prototype = {
		create: function() {
			return typeof this.onInit == "function" && this.onInit(), this.jq[0].onsubmit = n.PREVENT_FN, this.data ? this.bindData({
				data: this.data
			}, !0) : this.url ? (this.xhr = t.ajaxSettings.xhr(), this.ajax(this.param, !0)) : this.data = this.jq.fieldsToJson(), this
		},
		bindData: function(e, t) {
			return this.oldData = this.data, this.data = e.data, this.jq.jsonToFields(e.data), this.bindHandler(e, t), t ? this.createHandler(e) : this.updateHandler(e), this
		},
		toJSON: function() {
			return this.jq.fieldsToJson()
		},
		submit: function(e) {
			var r = e ? t.extend({}, this.data, e) : this.toJSON(),
				i = this.validateHanler(r);
			if (i) if (this.action) {
				this.trigger && this.trigger.prop("disabled", !0), i === !0 && (i = r);
				var s = this;
				t.ajax({
					url: this.action,
					dataType: "json",
					data: i,
					type: this.method,
					success: function(e, t, i) {
						e.error ? s.action.handleError ? s.action.handleError.call(s.action, e.error) : n.onAjaxError(e.error) : (s.oldData = r, typeof s.success == "function" && s.success.call(s, r, e))
					},
					complete: function(e, t) {
						s.trigger && s.trigger.prop("disabled", !1)
					}
				})
			} else this.oldData = r, typeof this.success == "function" && this.success(r);
			return this
		},
		ajaxEndHandler: function(e, t) {
			typeof this.onAjaxEnd == "function" && this.onAjaxEnd(e, t)
		},
		reset: function() {
			return this.jq.jsonToFields(this.oldData), this
		},
		clear: function() {
			return this.jq.reset(), this
		},
		validateHanler: function(e) {
			var t = !0;
			return typeof this.validator == "function" && (t = this.validator(e)), t
		}
	}, n.register("form", r, "AjaxDisplayObject")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, n) {
			var r = {
				textSrc: "text",
				selectedIndex: -1,
				bindOptions: {}
			},
				s = "",
				o = t.extend(r, n);
			if (o.renderer && !o.bindOptions.itemRender) {
				var u = "renderer";
				s = ":=" + u, o.bindOptions.itemRender = {}, o.bindOptions.itemRender[u] = o.renderer
			}
			o.bindOptions.template || (o.bindOptions.template = o.template || "<li>{" + o.textSrc + s + "}</li>"), i.parent.call(this, e, o), this.selectedClass = o.selectedClass || "current", this.selectedIndex = o.selectedIndex, this.eventType = "click.fy", this.title = o.title, this.jq[0].tagName !== "UL" ? this.jq = t('<ul class="fui-list" style="width: 100%; height: 100%; margin: 0; padding: 0;"></ul>').appendTo(this.jq) : this.jq.addClass("fui-list"), this.lazy || this.create(o)
		};
	i.prototype = {
		createHandler: function(e) {
			var t = this;
			this.items = this.jq.find("li"), this.title && this.jq.prepend('<div class="listHead">' + this.title + "</div>"), this.jq.delegate("li", this.eventType, function(e) {
				t.selectHandler(e, t.selectedIndex)
			}), this.selectedIndex !== -1 && this.items.eq(this.selectedIndex).trigger(this.eventType), typeof this.onCreate == "function" && this.onCreate(e)
		},
		updateHandler: function(e, t) {
			t || (this.items = this.jq.find("li")), typeof this.onUpdate == "function" && this.onUpdate(e, t), typeof this.onUpdateOnce == "function" && (this.onUpdateOnce(e, t), delete this.onUpdateOnce)
		},
		setSelectedIndex: function(e) {
			return this.items.eq(e).trigger(this.eventType), this
		},
		selectHandler: function(e) {
			var n = this.items.index(e.currentTarget);
			if (n === this.selectedIndex && this.prevIndex != -1) return;
			this.prevIndex = this.selectedIndex, this.selectedIndex = n, this.items.eq(this.prevIndex).removeClass(this.selectedClass), t(e.currentTarget).addClass(this.selectedClass), typeof this.onSelect == "function" && this.onSelect(e)
		}
	}, n.register("list", i, "ListBase")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, n) {
			var r = {
				title: "对话框",
				hideFade: !0
			},
				s = t.extend(r, n);
			i.parent.call(this, e, s), this.boxy = null, this.create(s)
		};
	i.prototype = {
		create: function(e) {
			return typeof this.onInit == "function" && this.onInit(), this.boxy = new Boxy(this.jq, e), this.jq = this.boxy.boxy, this.createHandler(), this
		},
		get: function(e) {
			return this.boxy.get(e)
		},
		getInner: function() {
			return this.boxy.getInner()
		},
		getContent: function() {
			return this.boxy.getContent()
		},
		setContent: function(e) {
			return this.boxy.setContent(e), this
		},
		getTitle: function() {
			return this.boxy.getTitle()
		},
		setTitle: function(e) {
			return this.boxy.setTitle(e), this
		},
		getPosition: function() {
			var e = this.boxy.getPosition();
			return {
				x: e[0],
				y: e[1]
			}
		},
		moveTo: function(e, t) {
			return this.boxy.moveTo(e, t), this
		},
		moveToX: function(e) {
			return this.boxy.moveToX(e), this
		},
		moveToY: function(e) {
			return this.boxy.moveToY(e), this
		},
		center: function(e) {
			return this.boxy.center(e), this
		},
		centerAt: function(e, t) {
			return this.boxy.centerAt(e, t), this
		},
		getCenter: function() {
			var e = this.boxy.getCenter();
			return {
				x: e[0],
				y: e[1]
			}
		},
		resize: function(e, t, n) {
			return this.boxy.resize(e, t, n), this
		},
		tween: function(e, t, n) {
			return this.boxy.tween(e, t, n), this
		},
		getSize: function() {
			var e = this.boxy.getSize();
			return {
				width: e[0],
				height: e[1]
			}
		},
		getContentSize: function() {
			var e = this.boxy.getContentSize();
			return {
				width: e[0],
				height: e[1]
			}
		},
		estimateSize: function() {
			var e = this.boxy.estimateSize();
			return {
				width: e[0],
				height: e[1]
			}
		},
		toTop: function() {
			return this.boxy.toTop(), this
		},
		show: function() {
			return this.boxy.show().toTop(), this
		},
		hide: function(e) {
			return this.boxy.hide(e), this
		},
		toggle: function() {
			return this.boxy.toggle(), this
		},
		maximum: function() {
			return this.boxy.winState = null, this.boxy.btnMax ? this.boxy.btnMax.trigger("click") : this.boxy.maximum(), this
		},
		closeAndDestroy: function(e) {
			return this.boxy.hideAndUnload(e), this
		},
		destroy: function() {
			return this.boxy.unload(), this
		},
		isVisible: function() {
			return this.boxy.isVisible()
		},
		isModalVisible: function() {
			return this.boxy.isModalVisible()
		}
	}, n.register("popup", i, "DisplayObject"), n.dialog = function(e, r, i, s) {
		var o = Boxy.ask(e, r, i, t.extend({
			title: null,
			show: !0,
			unloadOnHide: !0
		}, s));
		return n(o[0]).popup(o[1])
	}, n.alert = function(e, r, i) {
		var s = Boxy.alert(e, r, t.extend({
			title: null,
			show: !0,
			unloadOnHide: !0
		}, i)),
			o = n(s[0]).popup(s[1]);
		return o.jq.find(".answers>.btn-success")[0].focus(), o
	}, n.confirm = function(e, r, i) {
		var s = Boxy.confirm(e, r, t.extend({
			title: "请确认您的操作",
			show: !0,
			unloadOnHide: !0
		}, i));
		return n(s[0]).popup(s[1])
	}, n.popHTML = function(e, n) {
		n = n || {};
		var r = {
			url: e,
			type: "GET",
			dataType: "html",
			cache: !1,
			success: function(e) {
				e = jQuery(e), n.filter && (e = jQuery(n.filter, e)), new Boxy(e, n)
			}
		};
		t.each(["type", "cache"], function() {
			this in n && (r[this] = n[this], delete n[this])
		}), t.ajax(r)
	}, n.popImage = function(e, n) {
		var r = new Image;
		r.onload = function() {
			new Boxy(t('<div class="boxy-image-wrapper"/>').append(this), n)
		}, r.src = e
	}
}(window, jQuery, fy), jQuery.fn.boxy = function(e) {
	return e = e || {}, this.each(function() {
		var t = this.nodeName.toLowerCase(),
			n = this;
		t === "a" ? jQuery(this).click(function() {
			var t = Boxy.linkedTo(this),
				n = this.getAttribute("href"),
				r = jQuery.extend({
					actuator: this,
					title: this.title
				}, e);
			n.match(/(&|\?)boxy\.modal/) && (r.modal = !0);
			if (t) t.show();
			else if (n.indexOf("#") >= 0) {
				var i = jQuery(n.substr(n.indexOf("#"))),
					s = i.clone(!0);
				i.remove(), r.unloadOnHide = !1, new Boxy(s, r)
			} else n.match(/\.(jpe?g|png|gif|bmp)($|\?)/i) ? (r.unloadOnHide = !0, Boxy.loadImage(this.href, r)) : (r.cache || (r.unloadOnHide = !0), Boxy.load(this.href, r));
			return !1
		}) : t == "form" && jQuery(this).bind("submit.boxy", function() {
			return Boxy.confirm(e.message || "Please confirm:", function() {
				jQuery(n).unbind("submit.boxy").submit()
			}), !1
		})
	})
}, fy.popupManager = Boxy, Boxy.EF = fy.EMPTY_FN, Boxy.PREVENT_FN = fy.PREVENT_FN, jQuery.extend(Boxy, {
	WRAPPER: '<div class="boxy-wrapper"><div class="boxy-inner"></div></div>',
	DEFAULTS: {
		title: null,
		closeable: !0,
		minimizable: !1,
		maximizable: !1,
		draggable: !0,
		clone: !1,
		actuator: null,
		center: !0,
		show: !0,
		modal: !1,
		fixed: !0,
		closeText: "",
		maxText: "",
		minText: "",
		restoreText: "",
		unloadOnHide: !1,
		clickToFront: !1,
		behaviours: Boxy.EF,
		afterDrop: Boxy.EF,
		afterShow: Boxy.EF,
		afterHide: Boxy.EF,
		beforeUnload: Boxy.EF,
		beforeHide: Boxy.EF,
		onMax: Boxy.EF,
		onMin: Boxy.EF,
		onRestore: Boxy.EF,
		hideFade: !1,
		hideShrink: "vertical"
	},
	IE6: jQuery.browser.msie && jQuery.browser.version < 7,
	DEFAULT_X: 50,
	DEFAULT_Y: 50,
	MODAL_OPACITY: .05,
	zIndex: 9e3,
	dragConfigured: !1,
	resizeConfigured: !1,
	dragging: null,
	load: function(e, t) {
		t = t || {};
		var n = {
			url: e,
			type: "GET",
			dataType: "html",
			cache: !1,
			success: function(e) {
				e = jQuery(e), t.filter && (e = jQuery(t.filter, e)), new Boxy(e, t)
			}
		};
		jQuery.each(["type", "cache"], function() {
			this in t && (n[this] = t[this], delete t[this])
		}), jQuery.ajax(n)
	},
	loadImage: function(e, t) {
		var n = new Image;
		n.onload = function() {
			new Boxy($('<div class="boxy-image-wrapper"/>').append(this), t)
		}, n.src = e
	},
	get: function(e) {
		var t = jQuery(e).parents(".boxy-wrapper");
		return t.length ? jQuery.data(t[0], "boxy") : null
	},
	linkedTo: function(e) {
		return jQuery.data(e, "active.boxy")
	},
	alert: function(e, t, n) {
		typeof t != "function" && !n && (n = t, t = null);
		var r = Boxy.ask(e, ["确定"], t, n),
			i = r[0].eq(1).find("button");
		return i.eq(0).addClass("btn-success"), r
	},
	confirm: function(e, t, n) {
		var r = Boxy.ask(e, ["确定", "取消"], function(e, n, r) {
			return e ? void 0 : t(e, n, r)
		}, n),
			i = r[0].eq(1).find("button");
		return i.eq(0).addClass("btn-success"), i.eq(1).addClass("fyBtn"), r
	},
	ask: function(e, t, n, r) {
		e = jQuery('<div class="question"></div>').append(e).appendTo("body");
		var i = jQuery(window).height() - 125;
		i < e.outerHeight(!0) && e.height(i), r = jQuery.extend({
			title: "网页对话框",
			show: !0,
			modal: !0,
			closeable: !1
		}, r || {});
		var s = jQuery("<div></div>").append(e),
			o = jQuery('<div class="answers"></div>');
		return o.html(jQuery.map(Boxy._values(t), function(e, t) {
			return '<button class="boxy-button" name="' + t + '">' + e + "</button>"
		}).join(" ")), jQuery("button", o).click(function() {
			var e = this;
			if (n) {
				var r = parseInt(e.name, 10),
					i = n(r, e, t);
				i || Boxy.get(e).hide()
			} else Boxy.get(e).hide()
		}), s.after(o), [s.add(o), r]
	},
	isModalVisible: function() {
		return jQuery(".boxy-modal-blackout").length > 0
	},
	_u: function() {
		for (var e = 0; e < arguments.length; e++) if (typeof arguments[e] != "undefined") return !1;
		return !0
	},
	_values: function(e) {
		if (e instanceof Array) return e;
		var t = [];
		for (var n in e) t.push(e[n]);
		return t
	},
	_handleResize: function(e) {
		jQuery(".boxy-modal-blackout").css("display", "none").css(Boxy._cssForOverlay()).css("display", "block")
	},
	_handleDrag: function(e) {
		var t = Boxy.dragging;
		if (t) {
			var n = e.pageX - t[1],
				r = e.pageY - t[2];
			n < 3 ? n = 3 : n > t[3] && (n = t[3]), r < 3 ? r = 3 : r > t[4] && (r = t[4]);
			var i = ";left:" + n + "px;top:" + r + "px;";
			Boxy.dragConfigured[0].style.cssText += i, t[5] && (t[0].style.cssText += i)
		}
	},
	_nextZ: function() {
		return Boxy.zIndex++
	},
	_viewport: function() {
		var e = document.documentElement,
			t = document.body,
			n = window;
		return jQuery.extend(jQuery.browser.msie ? {
			left: t.scrollLeft || e.scrollLeft,
			top: t.scrollTop || e.scrollTop
		} : {
			left: n.pageXOffset,
			top: n.pageYOffset
		}, Boxy._u(n.innerWidth) ? !Boxy._u(e) && !Boxy._u(e.clientWidth) && e.clientWidth != 0 ? {
			width: e.clientWidth,
			height: e.clientHeight
		} : {
			width: t.clientWidth,
			height: t.clientHeight
		} : {
			width: n.innerWidth,
			height: n.innerHeight
		})
	},
	_setupModalResizing: function() {
		Boxy.resizeConfigured || (Boxy.resizeConfigured = !0)
	},
	_cssForOverlay: function() {
		return Boxy.IE6 ? Boxy._viewport() : {
			width: "100%",
			height: jQuery(document).height()
		}
	}
}), Boxy.prototype = {
	estimateSize: function() {
		this.boxy.css({
			visibility: "hidden",
			display: "block"
		});
		var e = this.getSize();
		return this.boxy.css("display", "none").css("visibility", "visible"), e
	},
	getSize: function() {
		return [this.boxy.outerWidth(), this.boxy.outerHeight()]
	},
	getContentSize: function() {
		var e = this.getContent();
		return [e.width(), e.height()]
	},
	getPosition: function() {
		var e = this.boxy[0];
		// Update sutanwei  e.offsetTop
		return [e.offsetLeft, e.offsetTop]
	},
	getCenter: function() {
		var e = this.getPosition(),
			t = this.getSize();
		return [Math.floor(e[0] + t[0] / 2), Math.floor(e[1] + t[1] / 2)]
	},
	getInner: function() {
		return jQuery(".boxy-inner", this.boxy)
	},
	getContent: function() {
		var e = jQuery(".boxy-content", this.boxy);
		return e.length > 1 && (e = e.find(".question").children(":first")), e
	},
	setContent: function(e) {
		return e = jQuery(e).css({
			display: "block"
		}).addClass("boxy-content"), this.options.clone && (e = e.clone(!0)), this.getContent().remove(), this.getInner().append(e), this.options.behaviours.call(this, e), this
	},
	moveTo: function(e, t) {
		return typeof e == "number" && typeof t == "number" && this.boxy.css({
			left: e,
			top: t
		}), this
	},
	moveToX: function(e) {
		return typeof e == "number" ? this.boxy.css({
			left: e
		}) : this.centerX(), this
	},
	moveToY: function(e) {
		return typeof e == "number" ? this.boxy.css({
			top: e
		}) : this.centerY(), this
	},
	centerAt: function(e, t) {
		var n = this[this.visible ? "getSize" : "estimateSize"]();
		if (typeof e == "number") {
			var r = e - n[0] / 2;
			this.moveToX(r < 0 ? 0 : r)
		}
		if (typeof t == "number") {
			var i = t - n[1] / 2;
			this.moveToY(i < 0 ? 0 : i)
		}
		return this
	},
	centerAtX: function(e) {
		return this.centerAt(e, null)
	},
	centerAtY: function(e) {
		return this.centerAt(null, e)
	},
	center: function(e) {
		var t = Boxy._viewport(),
			n = this.options.fixed ? [0, 0] : [t.left, t.top];
		return (!e || e == "x") && this.centerAt(n[0] + t.width / 2, null), (!e || e == "y") && this.centerAt(null, n[1] + t.height / 2), this
	},
	centerX: function() {
		return this.center("x")
	},
	centerY: function() {
		return this.center("y")
	},
	resize: function(e, t, n) {
		if (!this.visible) return this;
		var r = this._getBoundsForResize(e, t);
		return this.getContent().css({
			width: r[2],
			height: r[3]
		}), n && n(this), this
	},
	tween: function(e, t, n) {
		if (!this.visible) return this;
		var r = this._getBoundsForResize(e, t),
			i = this;
		return this.boxy.stop().animate({
			left: r[0],
			top: r[1]
		}, 300), this.getContent().stop().animate({
			width: r[2],
			height: r[3]
		}, 300, function() {
			n && n(i)
		}), this
	},
	maximum: function(e) {
		var t = jQuery(window),
			n = this.boxy.stop(!0, !0),
			r = this.getContent(),
			i = r.width(),
			s = r.height();
		if (e) {
			this.winState = "max";
			var o = this.getPosition(),
				u = {
					l: o[0],
					t: o[1],
					w: i,
					h: s
				};
			this.btnMax.data("size", u).removeClass("max").text(this.options.restoreText).addClass("restore");
			var a = this;
			t.bind("resize.boxy", function() {
				a.maximum()
			}), this.boxy.css({
				left: 0,
				top: 0,
				zIndex: ++Boxy.zIndex
			})
		} else this.boxy.css({
			left: 0,
			top: 0
		});
		r.css({
			width: t.width() - (n.outerWidth() - i),
			height: t.height() - (n.outerHeight() - s)
		})
	},
	minimum: function(e) {
		return this.visible ? (this.boxy.stop(!0, !0), this.winState = "min", this.hide(this.options.onMin, !0, !0), this) : this
	},
	restoreSize: function() {
		this.winState = "normal", $(window).unbind("resize.boxy");
		var e = this.btnMax.removeClass("restore").text(this.options.maxText).addClass("max").data("size");
		this.resize(e.w, e.h).moveTo(e.l, e.t)
	},
	isVisible: function() {
		return this.visible
	},
	show: function() {
		if (this.visible) return this.toTop(), this;
		if (this.options.modal) {
			var e = typeof this.options.modal == "number" ? this.options.modal : Boxy.MODAL_OPACITY;
			Boxy._setupModalResizing(), this.modalBlackout = jQuery('<div class="boxy-modal-blackout"></div>').css(jQuery.extend(Boxy._cssForOverlay(), {
				zIndex: Boxy._nextZ(),
				opacity: e
			})).appendTo(document.body), this.toTop()
		}
		this.getInner().stop().css({
			width: "",
			height: ""
		});
		if (fy.browser.msie && fy.browser.version < 10) this.boxy.stop(!0, !0).css({
			opacity: 1,
			display: "block"
		});
		else {
			this.boxy.stop(!0, !0).css({
				opacity: 0,
				display: "block"
			});
			var t = this.boxy.position().top;
			this.boxy.css({
				top: t - 20
			}).animate({
				opacity: 1,
				top: t
			}, 200)
		}
		return this.visible = !0, this.boxy.find(".close:first").focus(), this._fire("afterShow"), this
	},
	hide: function(e, t, n) {
		if (!this.visible) return this;
		var r = this;
		r._fire("beforeHide"), this.options.modal && (jQuery(document.body).unbind("keypress.boxy"), this.modalBlackout.animate({
			opacity: 0
		}, 200, function() {
			jQuery(this).remove()
		}));
		var i = {
			boxy: {},
			inner: {}
		},
			s = 0;
		if (fy.browser.msie && fy.browser.version < 9) {
			var o = this.getPosition();
			r.boxy.css({
				display: "none",
				left: o[0],
				top: o[1]
			}), r.visible = !1, r._fire("afterHide"), e && e(r), !t && r.options.unloadOnHide && r.unload()
		} else {
			if (this.options.hideShrink) {
				var u = this.getInner(),
					a = this.options.hideShrink,
					o = this.getPosition();
				s |= 1;
				if (a === !0 || a == "vertical") if (n) {
					var f = this.options.minimizable;
					if (f.offset) {
						var l = f.offset();
						i.boxy.top = l.top, i.boxy.left = l.left + 64
					} else {
						var c = $(document);
						i.boxy.top = c.height() - 10, i.boxy.left = c.width() + u.width() >> 1 >> 1
					}
					i.inner.height = 0, i.inner.width = 0, u.height(100)
				} else i.boxy.top = o[1] - 40;
				if (a === !0 || a == "horizontal") i.inner.width = 0, i.boxy.left = o[0] + u.width() >> 1
			}
			this.options.hideFade && (s |= 2, i.boxy.opacity = 0);
			var h = function() {
					r.boxy.css({
						display: "none",
						left: o[0],
						top: o[1]
					}), r.visible = !1, r._fire("afterHide"), e && e(r), !t && r.options.unloadOnHide && r.unload()
				};
			s ? (s & 1 && u.stop().animate(i.inner, n ? 300 : 200), this.boxy.stop(!0, !0).animate(i.boxy, n ? 300 : 200, h)) : h()
		}
		return this
	},
	toggle: function() {
		return this[this.visible ? "hide" : "show"](), this
	},
	hideAndUnload: function(e) {
		return this.options.unloadOnHide = !0, this.hide(e), this
	},
	unload: function() {
		this._fire("beforeUnload"), this.boxy.remove(), this.options.actuator && jQuery.data(this.options.actuator, "active.boxy", !1), this.options.maximizable && this.winState && ($(window).unbind("resize.boxy"), jQuery.data(this.btnMax, "size", !1), this.btnMax = null)
	},
	toTop: function() {
		return this.boxy.css({
			zIndex: Boxy._nextZ()
		}), this
	},
	getTitle: function() {
		return jQuery("> .title-bar h2", this.getInner()).html()
	},
	setTitle: function(e) {
		return jQuery("> .title-bar h2", this.getInner()).html(e), this
	},
	_getBoundsForResize: function(e, t) {
		var n = this.getContentSize(),
			r = [e - n[0], t - n[1]],
			i = this.getPosition();
		return [Math.max(i[0] - r[0] / 2, 0), Math.max(i[1] - r[1] / 2, 0), e, t]
	},
	_setupTitleBar: function() {
		if (this.options.title) {
			var e = this,
				t = jQuery("<div class='title-bar'></div>").html("<h2>" + this.options.title + "</h2>");
			t[0].onselectstart = Boxy.PREVENT_FN;
			var n = jQuery('<div class="btnSets"></div>').appendTo(t).mousedown(function(e) {
				e.stopPropagation()
			});
			this.options.minimizable && n.append(jQuery("<a href='javascript:void(0)' class='min'></a>").html(this.options.minText)), this.options.maximizable && (this.btnMax = jQuery("<a href='javascript:void(0)' class='max'></a>").html(this.options.maxText), n.append(this.btnMax)), this.options.closeable && n.append(jQuery("<a href='javascript:void(0)' class='close'></a>").html(this.options.closeText)), this.options.draggable && (Boxy.dragConfigured || (Boxy.dragConfigured = jQuery('<div id="boxy-helper" style=""></div>').appendTo("body"), document.addEventListener || Boxy.dragConfigured.css({
				border: "2px dotted #000",
				backgroundColor: "#fff",
				opacity: .2
			})), t.mousedown(function(n) {
				e.toTop(), n.button < 2 && e.winState !== "max" && (t.bind("mousemove.boxy", function(n) {
					t.unbind("mousemove.boxy");
					var r = e.boxy[0];
					Boxy.dragConfigured.css({
						display: "block",
						top: r.offsetTop,
						left: r.offsetLeft,
						width: e.boxy.outerWidth(),
						height: e.boxy.outerHeight()
					}), document.onselectstart = Boxy.PREVENT_FN;
					var i = e.getSize();
					Boxy.dragging = [r, n.pageX - r.offsetLeft, n.pageY - r.offsetTop, document.body.scrollWidth - i[0], document.body.scrollHeight - i[1], document.addEventListener ? !0 : !1], jQuery(document).bind("mousemove.boxy", Boxy._handleDrag), document.addEventListener || (Boxy.dragConfigured[0].setCapture(), e.boxy.hide(0)), jQuery(document).bind("mouseup.boxy", function() {
						e.winState !== "max" && Boxy.dragging && (Boxy.dragConfigured.hide(), jQuery(document).unbind(".boxy"), document.removeEventListener || (Boxy.dragConfigured[0].releaseCapture(), e.boxy.show(0).css({
							top: Boxy.dragConfigured[0].style.top,
							left: Boxy.dragConfigured[0].style.left
						})), Boxy.dragging = document.onselectstart = null, e._fire("afterDrop"))
					})
				}), t.bind("mouseup.boxy", function() {
					t.unbind(".boxy")
				}))
			})), this.getInner().prepend(t), this._setupDefaultBehaviours(t)
		}
	},
	_setupDefaultBehaviours: function(e) {
		var t = this;
		this.options.clickToFront && e.click(function() {
			t.toTop()
		}), jQuery(".close", e).click(function() {
			return t.hide(), !1
		}), this.btnMax && (jQuery(".max", e).click(function(e) {
			return t.winState === "max" || t.winState === "min" ? t.restoreSize(e.currentTarget) : t.maximum(!0), !1
		}), e.dblclick(function(e) {
			e.stopPropagation(), t.btnMax.trigger("click")
		})), jQuery(".min", e).click(function(e) {
			return t.minimum(e.currentTarget), !1
		})
	},
	_fire: function(e) {
		this.options[e].call(this)
	}
}, function(e, t, n, r) {
	var i = function(e, n) {
			var r = this,
				s = t.extend({
					eventType: "click",
					autoHeight: !0
				}, n);
			i.parent.call(this, e, s), this.tabNavigation = t("ul.tabUL", e).eq(0), this.tabNavigation.length || (this.tabNavigation = t('<div class="tabNavigator"><div class="tabWrap"><ul class="tabUL"></ul></div></div>').appendTo(e).find("ul.tabUL"));
			var o = this.tabNavigation.parent(),
				u = o.parent();
			u.hasClass("tabNavigator") || o.wrap('<div class="tabNavigator"></div>'), this.tabNavigation.delegate(".tabCloser", "click", function(e) {
				r.removeTab(t(e.target).parent())
			}), this.autoHeight = s.autoHeight;
			if (s.eventType == "mouseover" || s.eventType == "hover") s.eventType = "mouseenter";
			this.eventType = s.eventType;
			var a = this.tabNavigation.find("li"),
				f, l;
			this.tabItems = {
				length: a.length
			};
			for (var c = 0, h = a.length; c < h; c++) f = a.eq(c), l = f.attr("tab"), this.tabItems[l] = f, this.closable && t('<div class="tabCloser"></div>').prependTo(f);
			typeof s.onAddTab == "function" && (this.onAddTab = s.onAddTab, delete s.onAddTab), typeof s.onRemoveTab == "function" && (this.onRemoveTab = s.onRemoveTab, delete s.onRemoveTab), typeof s.onOpenTab == "function" && (this.onOpenTab = s.onOpenTab, delete s.onOpenTab), this.create(s)
		};
	i.prototype = {
		create: function(n) {
			typeof this.onInit == "function" && this.onInit(), this.jq.doTab(n), this.createHandler(this.data);
			if (this.autoHeight) {
				var r = 0,
					i = this;
				t(e).resize(function() {
					r && clearTimeout(r), r = setTimeout(function() {
						i.adjustHeight()
					}, 50)
				})
			}
			return this
		},
		adjustHeight: function() {
			var e = this.jq.innerHeight() - this.jq.find("ul.tabUL").outerHeight();
			if (e < 60) return;
			this.jq.find("div.tabDivision").css("height", e - 2)
		},
		getBox: function(e) {
			if (typeof e == "number") return this.jq.find("div.tabDivision").eq(e);
			if (typeof e == "string") {
				var n = e.indexOf("#") === -1 ? "#" + e : e;
				return t(n, this.jq)
			}
			return this.getBox(0)
		},
		openTab: function(e) {
			var n;
			if (typeof e == "number") this.tabNavigation.find("li").eq(parseInt(e, 10)).trigger(this.eventType), typeof this.onOpenTab == "function" && this.onOpenTab();
			else {
				if (typeof e != "string") return n = e.id.indexOf("#") === -1 ? "#" + e.id : e.id, this.tabItems[n] || this.addTab(t.extend({
					id: n
				}, e)), this.openTab(n);
				n = e.indexOf("#") === -1 ? "#" + e : e, this.tabItems[n].trigger(this.eventType), typeof this.onOpenTab == "function" && this.onOpenTab()
			}
			return this
		},
		addTab: function(e) {
			var n = e.id;
			n.indexOf("#") === -1 && (n = "#" + n);
			var r = n.substr(1),
				i = t('<li tab="' + n + '">' + e.title + "</li>").appendTo(this.tabNavigation),
				s = t('<div id="' + r + '" class="tabDivision"></div>').appendTo(this.jq),
				o = this.tabNavigation.find("div.clear");
			o.length ? o.appendTo(this.tabNavigation) : this.tabNavigation.append('<div class="clear"></div>'), e.content && s.append(e.content), e.src && s.append('<iframe id="tab_iframe_' + r + '" name="tab_iframe_named_' + r + '" src="' + e.src + '" style="width:100%; height:100%; margin:0;padding:0" />');
			if (e.closable) var u = t('<div class="tabCloser"></div>').prependTo(i);
			return this.tabItems[n] = i, this.tabItems.length++, this.autoHeight && this.adjustHeight(), typeof this.onAddTab == "function" && this.onAddTab(), this
		},
		removeTab: function(e) {
			var n, r, i;
			return typeof e == "string" ? (n = e, n.indexOf("#") === -1 && (n = "#" + n), e = this.tabNavigation.find("li[tab='" + n + "']")) : n = e.attr("tab"), e.hasClass("current") && (r = this.tabNavigation.find("li").filter(".current").index(), r ? i = this.tabNavigation.find("li:eq(" + --r + ")").attr("tab") : i = this.tabNavigation.find("li:eq(" + ++r + ")").attr("tab"), this.tabItems.length > 1 && this.openTab({
				id: i
			})), delete this.tabItems[n], this.tabItems.length--, t(n).remove(), e.remove(), typeof this.onRemoveTab == "function" && this.onRemoveTab(), this
		}
	}, n.register("tab", i, "DisplayObject")
}(window, jQuery, fy), function(e) {
	e.fn.extend({
		doTab: function(t) {
			var n = e.extend({
				initTabIndex: 0,
				delay: 100,
				eventType: "mouseenter"
			}, t),
				r = "#" + e(this).attr("id"),
				i = function(e, t) {
					t.show().siblings("div.tabDivision:visible").hide(), e.addClass("current").siblings("li.current").removeClass("current"), typeof n.onChange == "function" && n.onChange(s.find("li").index(e), e, t)
				};
			e(r + " > div.tabDivision").eq(n.initTabIndex).show();
			var s = e(r + " ul.tabUL").find("li:eq(" + n.initTabIndex + ")").addClass("current").end().delegate("li", n.eventType + ".doTab", function(t) {
				var r = e(t.target),
					s = r.attr("tab"),
					o = e(s);
				if (o.css("display") != "block") if (n.eventType == "mouseenter") {
					function u() {
						i(r, o)
					}
					r.data("timer", setTimeout(u, n.delay))
				} else i(r, o)
			});
			return n.eventType == "mouseenter" && s.delegate("li", "mouseleave.doTab", function() {
				var t = e(this);
				clearTimeout(t.data("timer")), t.data("timer", null)
			}), this
		},
		undoTab: function() {
			return e("ul.tabUL", this).undelegate("li", ".doTab"), this
		}
	})
}(jQuery), function(e, t, n, r) {
	var i = function(e, n) {
			var r = {
				eventType: "click",
				selectedIndex: 0,
				labelField: "label"
			};
			n.iconField ? r.template = '<li><img class="tabIco" src="{' + n.iconField + '}">{' + (n.labelField || r.labelField) + "}</li>" : r.template = "<li>{" + (n.labelField || r.labelField) + "}</li>";
			var s = t.extend(r, n);
			if (n.data && typeof n.data[0] == "string") {
				var o = [];
				for (var u = 0, a = n.data.length; u < a; u++) o[u] = {}, o[u][s.labelField] = n.data[u];
				s.data = o
			}
			i.parent.call(this, e, s);
			if (s.eventType.indexOf("mouse") > -1 || s.eventType === "hover") s.eventType = "mouseenter";
			this.eventType = s.eventType + ".fy", this.initSelectedIndex = this.selectedIndex = s.selectedIndex, this.autoFire = !! s.autoFire, this.jq = t("ul.tabUL", e).eq(0), this.jq.length || (this.jq = t('<div class="tabNavigator"><div class="tabWrap"><ul class="tabUL"></ul></div></div>').appendTo(e).find("ul.tabUL")), s.onSelect && (this.onChange = s.onSelect), this.create(s)
		};
	i.prototype = {
		createHandler: function(e) {
			var t = this,
				n, r;
			return this.eventType === "mouseenter.fy" ? (n = function(e) {
				r = setTimeout(function() {
					t.selectHandler.call(t, e)
				}, 150)
			}, this.jq.delegate("li", "mouseleave.fy", function() {
				clearTimeout(r)
			})) : n = function(e) {
				t.selectHandler.call(t, e)
			}, this.jq.on(this.eventType, "li", n), typeof this.onCreate == "function" && this.onCreate(e), this
		},
		bindHandler: function(e, t) {
			this.items = this.jq.find("li"), this.selectedIndex = this.items.length > this.initSelectedIndex ? this.initSelectedIndex : this.items.length ? 0 : -1, this.prevIndex = -1, typeof this.onBind == "function" && this.onBind(e, t);
			if (this.autoFire && this.selectedIndex > -1) {
				var n = this;
				setTimeout(function() {
					n.setSelectedIndex(n.selectedIndex)
				}, 0)
			}
		},
		selectHandler: function(e) {
			var n = e.target,
				r = this.items.index(n);
			if (r === this.selectedIndex && this.prevIndex != -1) return;
			t(n).addClass("current").siblings("li.current").removeClass("current"), this.prevIndex = this.selectedIndex, this.selectedIndex = r, typeof this.onSelect == "function" && this.onSelect(e)
		},
		setSelectedIndex: function(e) {
			return this.jq.find("li:eq(" + e + ")").trigger(this.eventType), this
		}
	}, n.register("tabBar", i, "ListBase")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, n) {
			var r = "",
				s = t.extend({
					bindOptions: {},
					textSrc: "text",
					animated: 100,
					control: t("<span><a></a><a></a><a></a></span>"),
					collapsed: !0,
					fullyUpdate: !1
				}, n);
			n.renderer && (r = ":=render", s.bindOptions.itemRender = {
				render: n.renderer
			}), s.bindOptions.template || (s.bindOptions.template = s.template || "<li><span>{" + s.textSrc + r + "}</span></li>"), i.parent.call(this, e, s), this.selectedClass = s.selectedClass || "current", this.selectedIndex = s.selectedIndex, this.eventType = "click.fy", this.updateKey = s.updateKey || "id", this.control = s.control.find("a"), this.fullyUpdate = s.fullyUpdate, this.jq[0].tagName.toLowerCase() !== "ul" ? this.jq = t('<ul class="treeview"></ul>').appendTo(this.jq) : this.jq.addClass("treeview"), s.fileTree && this.jq.addClass("filetree"), this.sets = s, this.lazy || this.create(s)
		};
	i.prototype = {
		createHandler: function(e) {
			this.created = !0;
			var t = this;
			this._selectedItem = null, this.jq.delegate("li", this.eventType, function(e) {
				e.stopPropagation(), t.selectHandler(e, t.selectedIndex)
			}), typeof this.onCreate == "function" && this.onCreate(e)
		},
		selectHandler: function(e) {
			if (this._selectedItem !== null && this._selectedItem[0] === e.currentTarget) return;
			this.selectedClass && this._selectedItem && this._selectedItem.children("span").removeClass(this.selectedClass), this._selectedItem = t(e.currentTarget), this.selectedClass && this._selectedItem && this._selectedItem.children("span").addClass(this.selectedClass), this._selectedData = this._selectedItem.data("treeItem"), typeof this.onSelect == "function" && this.onSelect(e, this._selectedData);
			if (this._selectedItem.hasClass("hasChildren")) {
				this._selectedItem.removeClass("hasChildren");
				var n = {};
				n[this.updateKey] = this._selectedData[this.updateKey], this.update(n)
			}
		},
		getSelectedData: function() {
			return this._selectedData ? this._selectedData : null
		},
		getSelectedItem: function() {
			return this._selectedItem ? this._selectedItem : null
		},
		collapseAll: function() {
			this.control && this.control.eq(0).trigger("click")
		},
		expandAll: function() {
			this.control && this.control.eq(1).trigger("click")
		},
		toggleAll: function() {
			this.control && this.control.eq(2).trigger("click")
		},
		bindData: function(e, t) {
			if (!t) {
				var n;
				this.fullyUpdate || !this._selectedItem ? (this.data = e.data, n = this.jq) : (this.data = e.data, n = this._selectedItem.find("ul")), this.createNode(n, e.data), n.treeview({
					collapsed: !0
				}), this.bindHandler(e, t), this.updateHandler(e)
			} else this.data = e.data, this.createNode(this.jq, e.data), this.jq.treeview(this.sets), this.bindHandler(e, t), this.createHandler(e);
			return this
		},
		createNode: function(e, n) {
			var r = this;
			e.bindList({
				list: n,
				template: r.bindOptions.template,
				itemRender: r.bindOptions.itemRender,
				onBound: function(e) {
					var n = this.find("li");
					for (var i = 0, s = e.length; i < s; i++) {
						var o = e[i],
							u = n.eq(i).data("treeItem", o);
						o.expanded && u.addClass("open"), o.children && o.children.length ? r.createNode(t("<ul></ul>").appendTo(u.find("span").addClass("folder").end()), o.children) : o.hasChildren ? u.find("span").addClass("folder").end().addClass("hasChildren").append('<ul><li><span class="placeholder">&nbsp;</span></li></ul>') : u.find("span").addClass("file")
					}
				}
			})
		}
	}, n.register("tree", i, "ListBase")
}(window, jQuery, fy), function(e) {
	e.extend(e.fn, {
		swapClass: function(e, t) {
			var n = this.filter("." + e);
			return this.filter("." + t).removeClass(t).addClass(e), n.removeClass(e).addClass(t), this
		},
		replaceClass: function(e, t) {
			return this.filter("." + e).removeClass(e).addClass(t).end()
		},
		hoverClass: function(t) {
			return t = t || "hover", this.hover(function() {
				e(this).addClass(t)
			}, function() {
				e(this).removeClass(t)
			})
		},
		heightToggle: function(e, t) {
			e ? this.animate({
				height: "toggle"
			}, e, t) : this.each(function() {
				jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"](), t && t.apply(this, arguments)
			})
		},
		heightHide: function(e, t) {
			e ? this.animate({
				height: "hide"
			}, e, t) : (this.hide(), t && this.each(t))
		},
		prepareBranches: function(e) {
			return e.prerendered || (this.filter(":last-child:not(ul)").addClass(t.last), this.filter((e.collapsed ? "" : "." + t.closed) + ":not(." + t.open + ")").find(">ul").hide()), this.filter(":has(>ul)")
		},
		applyClasses: function(n, r) {
			this.filter(":has(>ul):not(:has(>a))").find(">span").unbind("click.treeview").bind("click.treeview", function(t) {
				this == t.target && r.apply(e(this).next())
			}).add(e("a", this)).hoverClass();
			if (!n.prerendered) {
				this.filter(":has(>ul:hidden)").addClass(t.expandable).replaceClass(t.last, t.lastExpandable), this.not(":has(>ul:hidden)").addClass(t.collapsable).replaceClass(t.last, t.lastCollapsable);
				var i = this.find("div." + t.hitarea);
				i.length || (i = this.prepend('<div class="' + t.hitarea + '"/>').find("div." + t.hitarea)), i.removeClass().addClass(t.hitarea).each(function() {
					var t = "",
						n = e(this);
					e.each(n.parent().attr("class").split(" "), function() {
						t += this + "-hitarea "
					}), n.addClass(t)
				})
			}
			this.find("div." + t.hitarea).click(r)
		},
		treeview: function(n) {
			function i(n, r) {
				function i(r) {
					return function() {
						return s.apply(e("div." + t.hitarea, n).filter(function() {
							return r ? e(this).parent("." + r).length : !0
						})), !1
					}
				}
				e("a:eq(0)", r).click(i(t.collapsable)), e("a:eq(1)", r).click(i(t.expandable)), e("a:eq(2)", r).click(i())
			}
			function s() {
				e(this).parent().find(">.hitarea").swapClass(t.collapsableHitarea, t.expandableHitarea).swapClass(t.lastCollapsableHitarea, t.lastExpandableHitarea).end().swapClass(t.collapsable, t.expandable).swapClass(t.lastCollapsable, t.lastExpandable).find(">ul").heightToggle(n.animated, n.toggle), n.unique && e(this).parent().siblings().find(">.hitarea").replaceClass(t.collapsableHitarea, t.expandableHitarea).replaceClass(t.lastCollapsableHitarea, t.lastExpandableHitarea).end().replaceClass(t.collapsable, t.expandable).replaceClass(t.lastCollapsable, t.lastExpandable).find(">ul").heightHide(n.animated, n.toggle)
			}
			function o() {
				function t(e) {
					return e ? 1 : 0
				}
				var r = [];
				a.each(function(t, n) {
					r[t] = e(n).is(":has(>ul:visible)") ? 1 : 0
				}), e.cookie(n.cookieId, r.join(""), n.cookieOptions)
			}
			function u() {
				var t = e.cookie(n.cookieId);
				if (t) {
					var r = t.split("");
					a.each(function(t, n) {
						e(n).find(">ul")[parseInt(r[t]) ? "show" : "hide"]()
					})
				}
			}
			n = e.extend({
				cookieId: "treeview"
			}, n);
			if (n.toggle) {
				var r = n.toggle;
				n.toggle = function() {
					return r.apply(e(this).parent()[0], arguments)
				}
			}
			this.data("toggler", s), this.addClass("treeview");
			var a = this.find("li").prepareBranches(n);
			switch (n.persist) {
			case "cookie":
				var f = n.toggle;
				n.toggle = function() {
					o(), f && f.apply(this, arguments)
				}, u();
				break;
			case "location":
				var l = this.find("a").filter(function() {
					return this.href.toLowerCase() == location.href.toLowerCase()
				});
				if (l.length) {
					var c = l.addClass("selected").parents("ul, li").add(l.next()).show();
					n.prerendered && c.filter("li").swapClass(t.collapsable, t.expandable).swapClass(t.lastCollapsable, t.lastExpandable).find(">.hitarea").swapClass(t.collapsableHitarea, t.expandableHitarea).swapClass(t.lastCollapsableHitarea, t.lastExpandableHitarea)
				}
			}
			return a.applyClasses(n, s), n.control && (i(this, n.control), e(n.control).show()), this
		}
	}), e.treeview = {};
	var t = e.treeview.classes = {
		open: "open",
		closed: "closed",
		expandable: "expandable",
		expandableHitarea: "expandable-hitarea",
		lastExpandableHitarea: "lastExpandable-hitarea",
		collapsable: "collapsable",
		collapsableHitarea: "collapsable-hitarea",
		lastCollapsableHitarea: "lastCollapsable-hitarea",
		lastCollapsable: "lastCollapsable",
		lastExpandable: "lastExpandable",
		last: "last",
		hitarea: "hitarea"
	}
}(jQuery), function(e, t, n, r) {
	var i = function(e, r) {
			var s = {
				name: r.name || n.random(),
				singleSelect: !0,
				value: "id",
				textSrc: "text",
				unique: !0
			};
			this.onSelect = r.onSelect, delete r.onSelect, this.onCreate = r.onCreate, delete r.onCreate;
			var o = t.extend(s, r),
				u = this;
			this.name = o.name, this.singleSelect = o.singleSelect, this.singleSelect || (this.value = []);
			var a = r.renderer ? ":=render" : "";
			o.template = r.template || '<li><span><label><input name="' + o.name + '" type="' + (o.singleSelect ? "radio" : "checkbox") + '" value="{' + o.value + '}">{' + o.textSrc + a + "}</label></span></li>", this.jq = e.prop("readonly", !0).addClass("treeField-input").css("user-select", "none"), n.browser.ie && (this.jq[0].onselectstart = n.PREVENT_FN);
			var f = t.extend({}, o);
			f.onCreate = function(t) {
				this.jq.delegate('input[name="' + o.name + '"]', "click", function(e) {
					u._syncData(e)
				}), o.target = this.jq, o.data = t.data, i.parent.call(u, e, o)
			}, this.tree = n(t('<ul class="combo-dropDown treeField-combo" />').appendTo("body")).tree(f)
		};
	i.prototype = {
		_syncData: function(e) {
			if (this.singleSelect) {
				var n = t(e.target),
					r = n.val();
				this.value != r && (this.value = r, this.text = n.parent().text(), this.jq.val(this.text))
			} else {
				var i = t('[name="' + this.name + '"]:checked'),
					s = this,
					o = [];
				this.value.length = 0, i.each(function(e, n) {
					s.value[e] = n.value, o[e] = t(n).parent().text()
				}), this.text = o.join("; "), this.jq.val(this.text)
			}
			this.selectHandler(e)
		},
		selectHandler: function(e) {
			this.onSelect && this.onSelect(e)
		}
	}, n.register("treeField", i, "ComboBase")
}(window, jQuery, fy), function(e, t, n, r) {
	var i = function(e, n) {
			var r = {
				max: 100,
				value: 0,
				showLabel: !1,
				labelTemplate: "{percent}%",
				labelPlacement: "center",
				width: 150,
				height: 10
			},
				s = t.extend(r, n);
			i.parent.call(this, e, s), this.max = s.max, this.value = s.value, this.showLabel = s.showLabel, this.labelTemplate = s.labelTemplate, this.labelPlacement = s.labelPlacement, this.onChange = s.onChange, this.onComplete = s.onComplete, this.create(s)
		};
	i.prototype = {
		create: function(e) {
			typeof this.onInit == "function" && this.onInit();
			var n = this.jq;
			e.width && e.height ? n.css({
				width: e.width,
				height: e.height
			}) : e.width ? n.css("width", e.width) : e.height && n.css("height", e.height), this.barDiv = t('<div class="progressBar-value"></div>').appendTo(n.addClass("progressBar"));
			if (this.showLabel) {
				this.msgdiv = t('<div class="progressBar-text"></div>').appendTo(n);
				switch (this.labelPlacement) {
				case "right":
					this.msgdiv.css({
						textAlign: "left",
						marginLeft: n.outerWidth(),
						marginTop: -(n.outerHeight() + parseInt(this.msgdiv.css("lineHeight"), 10)) >> 1
					});
					break;
				case "left":
					this.msgdiv.css({
						textAlign: "right",
						marginLeft: -n.outerWidth(),
						marginTop: -(n.outerHeight() + parseInt(this.msgdiv.css("lineHeight"), 10)) >> 1
					});
					break;
				case "top":
					this.msgdiv.css({
						marginTop: -(n.outerHeight() + parseInt(this.msgdiv.css("lineHeight"), 10))
					});
					break;
				case "center":
					this.msgdiv.css({
						marginTop: -(n.outerHeight() + parseInt(this.msgdiv.css("lineHeight"), 10)) >> 1
					});
					break;
				case "bottom":
				default:
				}
			}
			return this.setValue(e.value), this.createHandler(), this
		},
		setValue: function(e) {
			var n;
			typeof e == "number" ? (this.value = e, this.percent = Math.round(e * 100 / this.max), n = {
				percent: this.percent,
				value: e
			}) : (this.value = e.value, this.percent = Math.round(this.value * 100 / this.max), n = t.extend({
				percent: this.percent
			}, e)), this.barDiv.stop().animate({
				width: this.percent + "%"
			}, 500), this.showLabel && this.setLabel(n), typeof this.onChange == "function" && this.onChange(n), this.value >= this.max && typeof this.onComplete == "function" && this.onComplete(n)
		},
		setLabel: function(e) {
			var t = n.formatJSON(this.labelTemplate, e);
			this.msgdiv.html(t)
		}
	}, n.register("progressBar", i, "DisplayObject")
}(window, jQuery, fy);