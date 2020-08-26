(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/children/NavView"],{"0f12":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{}},components:{},props:{navLabel:{type:Array,default:function(){return[]}}},computed:{fruitsName:function(){return this.navLabel.map((function(t){var n=/[类|果]\/(.*?)\.jpg$/g;return n.exec(t)[1]}))}},methods:{toSearch:function(n){t.navigateTo({url:"/pages/search/search?fruits="+this.fruitsName[n]})}}};n.default=e}).call(this,e("543d")["default"])},"1b6f":function(t,n,e){"use strict";var u=e("e591"),r=e.n(u);r.a},"488d":function(t,n,e){"use strict";var u,r=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},"6cc1":function(t,n,e){"use strict";e.r(n);var u=e("488d"),r=e("958f");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("1b6f");var c,f=e("f0c5"),i=Object(f["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=i.exports},"958f":function(t,n,e){"use strict";e.r(n);var u=e("0f12"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=r.a},e591:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/category/children/NavView-create-component',
    {
        'pages/category/children/NavView-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6cc1"))
        })
    },
    [['pages/category/children/NavView-create-component']]
]);
