(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/category"],{1634:function(t,n,e){"use strict";e.r(n);var i=e("5b72"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},3063:function(t,n,e){"use strict";e.r(n);var i=e("a7fa"),a=e("1634");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("da67");var c,u=e("f0c5"),o=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);n["default"]=o.exports},"37d6":function(t,n,e){},"5b72":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("4795"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,i,a,r,c){try{var u=t[r](c),o=u.value}catch(s){return void e(s)}u.done?n(o):Promise.resolve(o).then(i,a)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(i,a){var c=t.apply(n,e);function u(t){r(c,i,a,u,o,"next",t)}function o(t){r(c,i,a,u,o,"throw",t)}u(void 0)}))}}var u={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:1,flist:[],slist:[],tlist:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this;return c(i.default.mark((function n(){var e;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$api.json("cateList");case 2:e=n.sent,e.forEach((function(n){n.pid?n.picture?t.tlist.push(n):t.slist.push(n):t.flist.push(n)}));case 4:case"end":return n.stop()}}),n)})))()},tabtap:function(t){this.sizeCalcState||this.calcSize(),this.currentId=t.id;var n=this.slist.findIndex((function(n){return n.pid===t.id}));this.tabScrollTop=this.slist[n].top},asideScroll:function(t){this.sizeCalcState||this.calcSize();var n=t.detail.scrollTop,e=this.slist.filter((function(t){return t.top<=n})).reverse();e.length>0&&(this.currentId=e[0].pid)},calcSize:function(){var n=0;this.slist.forEach((function(e){var i=t.createSelectorQuery().select("#main-"+e.id);i.fields({size:!0},(function(t){e.top=n,n+=t.height,e.bottom=n})).exec()})),this.sizeCalcState=!0},navToList:function(n,e){t.navigateTo({url:"/pages/product/list?fid=".concat(this.currentId,"&sid=").concat(n,"&tid=").concat(e)})}}};n.default=u}).call(this,e("543d")["default"])},6007:function(t,n,e){"use strict";(function(t){e("1fbb"),e("921b");i(e("66fd"));var n=i(e("3063"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a7fa:function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}))},da67:function(t,n,e){"use strict";var i=e("37d6"),a=e.n(i);a.a}},[["6007","common/runtime","common/vendor"]]]);