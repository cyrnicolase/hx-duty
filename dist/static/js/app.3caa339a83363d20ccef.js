webpackJsonp([1],{0:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("xd7I"),i=s("OolZ"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},h=s("C7Lr")({name:"App"},a,!1,null,null,null).exports,r=s("KGCO"),o=s("XH5H"),u=s.n(o),l={data:function(){var t=new Date;return{curDate:t.getDate(),year:t.getFullYear(),month:t.getMonth(),monthDays:[],activeDate:t,monthDuty:[],weekends:[],holidays:{},lunars:[]}},created:function(){this.init()},methods:{init:function(){var t=this.month,e=new Date(this.year,t,1).getDay(),s=new Date(this.year,t+1,0).getDate();this.weekends=[],this.monthDays=[],this.lunars=[];for(var n=0;n<e;++n)this.monthDays.push("");for(var i=!1,a=1;a<=s;++a){this.monthDays.push(a);new Date(this.year,t,a);if(!i){var h=new Date(this.year,t,a).getDay();if(0==h){i=!0,this.weekends.push(a-1),this.weekends.push(a),this.weekends.push(a+6),this.weekends.push(a+7),this.weekends.push(a+13),this.weekends.push(a+14),this.weekends.push(a+20),this.weekends.push(a+21),this.weekends.push(a+27),this.weekends.push(a+28);continue}6==h&&(i=!0,this.weekends.push(a),this.weekends.push(a+1),this.weekends.push(a+7),this.weekends.push(a+8),this.weekends.push(a+14),this.weekends.push(a+15),this.weekends.push(a+21),this.weekends.push(a+22),this.weekends.push(a+28),this.weekends.push(a+29))}}this.calc()},calc:function(){this.monthDuty=[];var t=["白班","值班","下夜班","正修"],e=new Date(2019,3,5),s=new Date(this.year,this.month,1),n=(e.getTime()-s.getTime())/864e5,i=new Date(this.year,this.month+1,0).getDate();if(n>0)for(var a=(4-n%4)%4,h=0;h<i;++h){this.monthDuty.push(t[(a+h)%4]);var r=u.a.solar2lunar(this.year,this.month+1,h+1);this.lunars.push("初一"==r.dayCn?r.monthCn:r.dayCn)}else for(var o=(n=Math.abs(n))%4,l=0;l<i;++l){this.monthDuty.push(t[(o+l)%4]);var c=u.a.solar2lunar(this.year,this.month+1,l+1);this.lunars.push("初一"==c.dayCn?c.monthCn:c.dayCn)}},getHolidays:function(){var t=this,e=parseInt(this.month)+1;e<10&&(e=this.year+"0"+e),this.holidays=[],this.$http.get("http://www.easybots.cn/api/holiday.php?m="+e).then(function(s){t.holidays=s.body[e]})},getDayClass:function(t){return this.curDate==t?"active":this.weekends.indexOf(t)>-1?"holiday":void 0!==this.holidays[t]?"holiday":""},btnPrev:function(){this.month-=1,this.curDate=null,this.month<0&&(this.month=11,this.year-=1),this.month==this.activeDate.getMonth()&&this.year==this.activeDate.getFullYear()&&(this.curDate=this.activeDate.getDate()),this.init()},btnNext:function(){this.month+=1,this.curDate=null,this.month>11&&(this.month=0,this.year+=1),this.month==this.activeDate.getMonth()&&this.year==this.activeDate.getFullYear()&&(this.curDate=this.activeDate.getDate()),this.init()}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h1",[t._v("轮班表")]),t._v(" "),s("div",{staticClass:"month"},[s("ul",[s("li",{staticClass:"prev",on:{click:function(e){return t.btnPrev()}}},[t._v("<")]),t._v(" "),s("li",{staticClass:"next",on:{click:function(e){return t.btnNext()}}},[t._v(">")]),t._v(" "),s("li",{staticClass:"title"},[t._v(t._s(t.month+1)+"月"),s("br"),t._v(t._s(t.year))])])]),t._v(" "),t._m(0),t._v(" "),s("ul",{staticClass:"days"},t._l(t.monthDays,function(e){return s("li",[s("span",{staticClass:"header_sign"},[t._v(t._s(t.monthDuty[e-1]))]),s("br"),t._v(" "),s("span",{class:t.getDayClass(e)},[t._v(t._s(e))]),s("br"),t._v(" "),s("span",{staticClass:"foot_sign"},[t._v(t._s(t.lunars[e-1]))])])}),0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"weekdays"},[s("li",[t._v("日")]),t._v(" "),s("li",[t._v("一")]),t._v(" "),s("li",[t._v("二")]),t._v(" "),s("li",[t._v("三")]),t._v(" "),s("li",[t._v("四")]),t._v(" "),s("li",[t._v("五")]),t._v(" "),s("li",[t._v("六")])])}]};var v=s("C7Lr")(l,c,!1,function(t){s("joA7")},"data-v-56b18267",null).exports;n.a.use(r.a);var d=new r.a({mode:"history",routes:[{path:"/",name:"duty",component:v}]});n.a.config.productionTip=!1,n.a.use(i.a),new n.a({el:"#app",router:d,components:{App:h},template:"<App/>"})},joA7:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.3caa339a83363d20ccef.js.map