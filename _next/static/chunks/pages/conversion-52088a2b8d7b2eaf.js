(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[822],{60165:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/conversion",function(){return t(71685)}])},47937:function(e,n,t){"use strict";var r=t(67294);let i=(0,r.createContext)({alert:null,setAlert:e=>{}});n.Z=i},87557:function(e,n,t){"use strict";t.d(n,{Z:function(){return j}});var r=t(85893),i=t(67294),s=t(16628),l=t(87357),o=function(e){let{children:n,stayMs:t=5e3,onClose:o}=e,[a,c]=(0,i.useState)(!1);return((0,i.useEffect)(()=>{setTimeout(()=>{c(!0)},200)},[]),n)?(0,r.jsx)(s.Z,{in:a,timeout:{enter:1e3,exit:1e3},addEndListener:()=>{setTimeout(()=>{c(!1),o()},t)},children:(0,r.jsx)(l.Z,{children:n})}):(console.error("invalid children for TransitionAlert"),null)},a=t(92401),c=t(15568),d=function(e){let{icon:n,title:t,children:i}=e;return(0,r.jsxs)(c.Z,{severity:"success",icon:n,children:[t&&(0,r.jsx)(a.Z,{children:t}),i]})},u=function(e){let{title:n,children:t}=e;return(0,r.jsxs)(c.Z,{severity:"error",variant:"standard",className:"alert",children:[(0,r.jsx)(a.Z,{children:n}),t]})},_=t(47937),x=t(33072),h=t.n(x);let f=e=>{let{children:n}=e,[t,s]=(0,i.useState)(null);return(0,r.jsxs)(_.Z.Provider,{value:{alert:t,setAlert:s},children:[n,t&&(0,r.jsx)(l.Z,{className:h().alertBar,children:(0,r.jsx)(o,{stayMs:15e3,onClose:()=>s(null),children:"success"===t.type?(0,r.jsx)(d,{title:t.title,children:t.text}):(0,r.jsx)(u,{title:t.title,children:t.text})})})]})};var j=f},71685:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return j}});var r=t(85893),i=t(9008),s=t.n(i),l=t(31502),o=t.n(l),a=t(15861),c=t(87357),d=t(67294),u=t(87557),_=t(62225),x=t(83321),h=t(13550),f=t.n(h);function j(){let[e,n]=(0,d.useState)(""),[t,i]=(0,d.useState)(""),l=()=>{i(new(f())(e).toString("hex"))},h=()=>{i(new(f())(e.replace(/^0x/,""),"hex").toString())},j=()=>{i(new(f())(e.replace(/^0x/,"").substring(0,4),"hex").shln(parseInt(e.substring(e.length-2),16)).toString())},m=()=>{let n=parseInt(e)/7922816251426434e13;return n*n};return(0,r.jsxs)(u.Z,{children:[(0,r.jsxs)(s(),{children:[(0,r.jsx)("title",{children:"Conversion tools"}),(0,r.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)("main",{className:o().main,children:[(0,r.jsx)(a.Z,{variant:"h4",component:"h2",children:"Conversion Tools"}),(0,r.jsxs)(_.WS,{children:[(0,r.jsx)(c.Z,{children:(0,r.jsx)(_.bM,{fullWidth:!0,name:"val",label:"Input value",value:e,onChange:e=>n(e.target.value),validators:["required"],errorMessages:["This field is required"]})}),(0,r.jsxs)(c.Z,{children:[(0,r.jsx)("h5",{children:"result:"}),t]}),(0,r.jsxs)(c.Z,{sx:{padding:2,display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,r.jsx)(x.Z,{disabled:!e,onClick:l,variant:"contained",children:"Uint to hex"}),(0,r.jsx)(x.Z,{sx:{marginLeft:4},disabled:!e,onClick:h,variant:"contained",children:"Hex to uint"}),(0,r.jsx)(x.Z,{sx:{marginLeft:4},disabled:!e,onClick:j,variant:"contained",children:"Restore Shift4"}),(0,r.jsx)(x.Z,{sx:{marginLeft:4},disabled:!e,onClick:m,variant:"contained",children:"SqrtX96 To Decimal"})]})]})]})]})}},33072:function(e){e.exports={alertBar:"alertBar_alertBar__7grMj"}},31502:function(e){e.exports={main:"Home_main__nLjiQ",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",center:"Home_center__4BFgC",logo:"Home_logo__27_tb",thirteen:"Home_thirteen__cMI_k",rotate:"Home_rotate____XsI",content:"Home_content__Zy02X",vercelLogo:"Home_vercelLogo__dtSk9"}},46601:function(){}},function(e){e.O(0,[560,550,774,888,179],function(){return e(e.s=60165)}),_N_E=e.O()}]);