!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function o(t,e,n){return parseInt(t.substr(e,n),16)}function i(t){return(t|=0)<0?"00":t<16?"0"+t.toString(16):t<256?t.toString(16):"ff"}function r(t,e,n){return i(255*((n=n<0?n+6:n>6?n-6:n)<1?t+(e-t)*n:n<3?e:n<4?t+(e-t)*(4-n):t))}function s(t){if(/^#[0-9a-f]{3,8}$/i.test(t)){let e;if(t.length<6){const n=t[1],o=t[2],i=t[3],r=t[4]||"";e="#"+n+n+o+o+i+i+r+r}return(7==t.length||t.length>8)&&(e=t),e}}function u(t,e,n){const o=[.55,.5,.5,.46,.6,.55,.55][6*t+.5|0];return function(t,e,n){let o;if(0==e){const t=i(255*n);o=t+t+t}else{const i=n<=.5?n*(e+1):n+e-n*e,s=2*n-i;o=r(s,i,6*t+2)+r(s,i,6*t)+r(s,i,6*t-2)}return"#"+o}(t,e,n=n<.5?n*o*2:o+(n-.5)*(1-o)*2)}n.r(e);const c="undefined"!=typeof window?window:"undefined"!=typeof self?self:"undefined"!=typeof global?global:{};var l={};class f{constructor(t,e){this.x=t,this.y=e}}class a{constructor(t,e,n,o){this.p=t,this.q=e,this.G=n,this.S=o}H(t,e,n,o){const i=this.p+this.G,r=this.q+this.G,s=this.S;return 1===s?new f(i-e-(o||0),this.q+t):2===s?new f(i-t-(n||0),r-e-(o||0)):3===s?new f(this.p+e,r-t-(n||0)):new f(this.p+t,this.q+e)}}const h=new a(0,0,0,0);class d{constructor(t){this.I=t,this.t=h}g(t,e){const n=e?-2:2,o=this.t,i=[];for(let r=e?t.length-2:0;r<t.length&&r>=0;r+=n)i.push(o.H(t[r],t[r+1]));this.I.g(i)}h(t,e,n,o){const i=this.t.H(t,e,n,n);this.I.h(i,n,o)}i(t,e,n,o,i){this.g([t,e,t+n,e,t+n,e+o,t,e+o],i)}j(t,e,n,o,i,r){const s=[t+n,e,t+n,e+o,t,e+o,t,e];s.splice((i||0)%4*2,2),this.g(s,r)}J(t,e,n,o,i){this.g([t+n/2,e,t+n,e+o/2,t+n/2,e+o,t,e+o/2],i)}}function g(t,e,n,o){let i,r,s,u,c,l;(t%=14)?1==t?(s=0|.5*n,u=0|.8*n,e.j(n-s,0,s,u,2)):2==t?(s=0|n/3,e.i(s,s,n-s,n-s)):3==t?(c=.1*n,l=n<6?1:n<8?2:0|.25*n,c=c>1?0|c:c>.5?1:c,e.i(l,l,n-c-l,n-c-l)):4==t?(r=0|.15*n,s=0|.5*n,e.h(n-s-r,n-s-r,s)):5==t?(c=.1*n,l=4*c,l>3&&(l|=0),e.i(0,0,n,n),e.g([l,l,n-c,l,l+(n-l-c)/2,n-c],!0)):6==t?e.g([0,0,n,0,n,.7*n,.4*n,.4*n,.7*n,n,0,n]):7==t?e.j(n/2,n/2,n/2,n/2,3):8==t?(e.i(0,0,n,n/2),e.i(0,n/2,n/2,n/2),e.j(n/2,n/2,n/2,n/2,1)):9==t?(c=.14*n,l=n<4?1:n<6?2:0|.35*n,c=n<8?c:0|c,e.i(0,0,n,n),e.i(l,l,n-l-c,n-l-c,!0)):10==t?(c=.12*n,l=3*c,e.i(0,0,n,n),e.h(l,l,n-c-l,!0)):11==t?e.j(n/2,n/2,n/2,n/2,3):12==t?(r=.25*n,e.i(0,0,n,n),e.J(r,r,n-r,n-r,!0)):!o&&(r=.4*n,s=1.2*n,e.h(r,r,s)):(i=.42*n,e.g([0,0,n,0,n,n-2*i,n-i,n,0,n]))}function m(t,e,n){let o;(t%=4)?1==t?e.j(0,n/2,n,n/2,0):2==t?e.J(0,0,n,n):(o=n/6,e.h(o,o,n-2*o)):e.j(0,0,n,n,0)}function p(t,e,n){(n=function(t,e){const n="object"==typeof t&&t||l.config||c.jdenticon_config||{},o=n.lightness||{},i=n.saturation||{},r="color"in i?i.color:i,u=i.grayscale,f=n.backColor,a=n.padding;function h(t,e){let n=o[t];return n&&n.length>1||(n=e),function(t){return(t=n[0]+t*(n[1]-n[0]))<0?0:t>1?1:t}}return{P:function(t){const e=n.hues;let o;return e&&e.length>0&&(o=e[0|.999*t*e.length]),"number"==typeof o?(o/360%1+1)%1:t},n:"number"==typeof r?r:.5,C:"number"==typeof u?u:0,o:h("color",[.4,.8]),D:h("grayscale",[.3,.9]),F:s(f),R:"number"==typeof t?t:"number"==typeof a?a:e}}(n,.08)).F&&t.m(n.F);let i=t.k;const r=.5+i*n.R|0;i-=2*r;const f=new d(t),h=0|i/4,p=0|r+i/2-2*h,y=0|r+i/2-2*h;function b(n,i,r,s,u){const c=o(e,r,1);let l=s?o(e,s,1):0;t.K(w[v[n]]);for(let t=0;t<u.length;t++)f.t=new a(p+u[t][0]*h,y+u[t][1]*h,h,l++%4),i(c,f,h,t);t.L()}const w=function(t,e){return[u(t=e.P(t),e.C,e.D(0)),u(t,e.n,e.o(.5)),u(t,e.C,e.D(1)),u(t,e.n,e.o(1)),u(t,e.n,e.o(0))]}(o(e,-7)/268435455,n),v=[];let x;function S(t){if(t.indexOf(x)>=0)for(let e=0;e<t.length;e++)if(v.indexOf(t[e])>=0)return!0}for(let t=0;t<3;t++)x=o(e,8+t,1)%w.length,(S([0,4])||S([2,3]))&&(x=1),v.push(x);b(0,m,2,3,[[1,0],[2,0],[2,3],[1,3],[0,1],[3,1],[3,2],[0,2]]),b(1,m,4,5,[[0,0],[3,0],[3,3],[0,3]]),b(2,g,1,null,[[1,1],[2,1],[2,2],[1,2]]),t.finish()}function y(t){return/^[0-9a-f]{11,}$/i.test(t)&&t}function b(t){return function(t){var e,n=0,o=0,i=encodeURI(t)+"%80",r=[],s=[],u=1732584193,c=4023233417,l=~u,f=~c,a=3285377520,h=[u,c,l,f,a],d=0,g="";function m(t,e){return t<<e|t>>>32-e}for(;n<i.length;o++)r[o>>2]=r[o>>2]|("%"==i[n]?parseInt(i.substring(n+1,n+=3),16):i.charCodeAt(n++))<<8*(3-(3&o));for(r[(e=16*(1+(o+7>>6)))-1]=8*o-8;d<e;d+=16){for(n=0;n<80;n++)o=m(u,5)+a+(n<20?1518500249+(c&l^~c&f):n<40?1859775393+(c^l^f):n<60?2400959708+(c&l^c&f^l&f):3395469782+(c^l^f))+(s[n]=n<16?0|r[d+n]:m(s[n-3]^s[n-8]^s[n-14]^s[n-16],1)),a=f,f=l,l=m(c,30),c=u,u=o;h[0]=u=h[0]+u|0,h[1]=c=h[1]+c|0,h[2]=l=h[2]+l|0,h[3]=f=h[3]+f|0,h[4]=a=h[4]+a|0}for(n=0;n<40;n++)g+=(h[n>>3]>>>4*(7-(7&n))&15).toString(16);return g}(null==t?"":""+t)}function w(t){return(10*t+.5|0)/10}class v{constructor(){this.u=""}g(t){let e="";for(let n=0;n<t.length;n++)e+=(n?"L":"M")+w(t[n].x)+" "+w(t[n].y);this.u+=e+"Z"}h(t,e,n){const o=n?0:1,i=w(e/2),r=w(e),s="a"+i+","+i+" 0 1,"+o+" ";this.u+="M"+w(t.x)+" "+w(t.y+e/2)+s+r+",0"+s+-r+",0"}}class x{constructor(t){this.v,this.A={},this.M=t,this.k=t.k}m(t){const e=/^(#......)(..)?/.exec(t),n=e[2]?o(e[2],0)/255:1;this.M.m(e[1],n)}K(t){this.v=this.A[t]||(this.A[t]=new v)}L(){}g(t){this.v.g(t)}h(t,e,n){this.v.h(t,e,n)}finish(){const t=this.A;for(let e in t)t.hasOwnProperty(e)&&this.M.N(e,t[e].u)}}class S{constructor(t){this.k=t,this.B='<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+t+'" viewBox="0 0 '+t+" "+t+'">'}m(t,e){e&&(this.B+='<rect width="100%" height="100%" fill="'+t+'" opacity="'+e.toFixed(2)+'"/>')}N(t,e){this.B+='<path fill="'+t+'" d="'+e+'"/>'}toString(){return this.B+"</svg>"}}"undefined"!=typeof document&&document.querySelectorAll.bind(document);let j;console.log(function(t,e,n){const o=new S(e);return p(new x(o),y(t)||b(t),n),o.toString()}("my value",100));let O="Anonymous";function B(t){let e=document.createElement("div"),n=document.getElementById("messages");e.textContent=t,e.className="message",n.appendChild(e)}document.addEventListener("DOMContentLoaded",(function(){j=new WebSocket(("https:"===window.location.protocol?"wss://":"ws://")+window.location.host+"/ws"),j.onopen=function(){B("Connected to chatroom")},j.onclose=function(){B("Disconnected from chatroom"),j=null},j.onmessage=function(t){let e=JSON.parse(t.data);switch(e.action){case"init":document.getElementById("username").value=e.user.username;break;case"broadcast":B(`${e.sender.username}: ${e.text}`);break;case"systemBroadcast":B(""+e.text);break;default:console.log("Unhandled message action:",e)}},j.onerror=function(t){B("ERROR: "+t.data)}}),!1),document.getElementById("submit").addEventListener("click",(function(){let t=document.getElementById("message-entry");if(!j||0===t.value.length)return!1;let e={action:"broadcast",text:t.value.trim()};return j.send(JSON.stringify(e)),t.value="",!1}),!1),document.getElementById("username").addEventListener("focusout",(function(){let t=document.getElementById("username");if(O!==t.value){O=t.value;let e={action:"usernameChange",username:t.value};j.send(JSON.stringify(e))}}),!1)}]);