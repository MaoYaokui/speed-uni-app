(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2fcb":function(t,e,n){"use strict";n.r(e);var r=n("4e62"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},"4e62":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("4795")),o=n("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,r,o,i,u){try{var c=t[i](u),a=c.value}catch(s){return void n(s)}c.done?e(a):Promise.resolve(a).then(r,o)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){u(i,r,o,c,a,"next",t)}function a(t){u(i,r,o,c,a,"throw",t)}c(void 0)}))}}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={data:function(){return{titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:[],goodsList:[]}},onLoad:function(){var e=this;this.hasLogin||t.login({provider:"weixin",success:function(n){t.getUserInfo({provider:"weixin",lang:"zh_CN",success:function(t){e.toMain(n.code,t.userInfo)},fail:function(){t.showToast({icon:"none",title:"登陆失败"})}})},fail:function(t){console.error("授权登录失败："+JSON.stringify(t))}}),this.loadData()},computed:(0,o.mapState)(["ipAddress"]),methods:s({},(0,o.mapMutations)(["login"]),{loadData:function(){var t=this;return c(r.default.mark((function e(){var n,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.json("carouselList");case 2:return n=e.sent,t.titleNViewBackground=n[0].background,t.swiperLength=n.length,t.carouselList=n,e.next=8,t.$api.json("goodsList");case 8:o=e.sent,t.goodsList=o||[];case 10:case"end":return e.stop()}}),e)})))()},swiperChange:function(t){var e=t.detail.current;this.swiperCurrent=e,this.titleNViewBackground=this.carouselList[e].background},navToDetailPage:function(e){var n=e.title;t.navigateTo({url:"/pages/product/product?id=".concat(n)})},toMain:function(t,e){e.code=t,this.login(e)}})};e.default=l}).call(this,n("543d")["default"])},6856:function(t,e,n){"use strict";(function(t){n("1fbb"),n("921b");r(n("66fd"));var e=r(n("754a"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},7449:function(t,e,n){"use strict";var r=n("8076"),o=n.n(r);o.a},"754a":function(t,e,n){"use strict";n.r(e);var r=n("af7e"),o=n("2fcb");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("7449");var u,c=n("f0c5"),a=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=a.exports},8076:function(t,e,n){},af7e:function(t,e,n){"use strict";var r,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}))}},[["6856","common/runtime","common/vendor"]]]);