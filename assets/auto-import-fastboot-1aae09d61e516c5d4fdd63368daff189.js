(window.webpackJsonp_ember_auto_import_=window.webpackJsonp_ember_auto_import_||[]).push([[2],[,,,,,,function(r,t,o){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var e=o(10)
t.decode=e.default,t.isBlurhashValid=e.isBlurhashValid
var n=o(11)
t.encode=n.default,function(r){for(var o in r)t.hasOwnProperty(o)||(t[o]=r[o])}(o(7))},function(r,t,o){"use strict"
var e,n=this&&this.__extends||(e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var o in t)t.hasOwnProperty(o)&&(r[o]=t[o])})(r,t)},function(r,t){function o(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)})
Object.defineProperty(t,"__esModule",{value:!0})
var a=function(r){function t(t){var o=r.call(this,t)||this
return o.name="ValidationError",o.message=t,o}return n(t,r),t}(Error)
t.ValidationError=a},function(r,t,o){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","#","$","%","*","+",",","-",".",":",";","=","?","@","[","]","^","_","{","|","}","~"]
t.decode83=function(r){for(var t=0,o=0;o<r.length;o++){var n=r[o]
t=83*t+e.indexOf(n)}return t},t.encode83=function(r,t){for(var o="",n=1;n<=t;n++){var a=Math.floor(r)/Math.pow(83,t-n)%83
o+=e[Math.floor(a)]}return o}},function(r,t,o){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.sRGBToLinear=function(r){var t=r/255
return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)},t.linearTosRGB=function(r){var t=Math.max(0,Math.min(1,r))
return t<=.0031308?Math.round(12.92*t*255+.5):Math.round(255*(1.055*Math.pow(t,1/2.4)-.055)+.5)},t.sign=function(r){return r<0?-1:1},t.signPow=function(r,o){return t.sign(r)*Math.pow(Math.abs(r),o)}},function(r,t,o){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var e=o(8),n=o(9),a=o(7),i=function(r){if(!r||r.length<6)throw new a.ValidationError("The blurhash string must be at least 6 characters")
var t=e.decode83(r[0]),o=Math.floor(t/9)+1,n=t%9+1
if(r.length!==4+2*n*o)throw new a.ValidationError("blurhash length mismatch: length is "+r.length+" but it should be "+(4+2*n*o))}
t.isBlurhashValid=function(r){try{i(r)}catch(r){return{result:!1,errorReason:r.message}}return{result:!0}}
var u=function(r){var t=r>>16,o=r>>8&255,e=255&r
return[n.sRGBToLinear(t),n.sRGBToLinear(o),n.sRGBToLinear(e)]},s=function(r,t){var o=Math.floor(r/361),e=Math.floor(r/19)%19,a=r%19
return[n.signPow((o-9)/9,2)*t,n.signPow((e-9)/9,2)*t,n.signPow((a-9)/9,2)*t]}
t.default=function(r,t,o,a){i(r),a|=1
for(var h=e.decode83(r[0]),c=Math.floor(h/9)+1,f=h%9+1,l=(e.decode83(r[1])+1)/166,d=new Array(f*c),M=0;M<d.length;M++)if(0===M){var v=e.decode83(r.substring(2,6))
d[M]=u(v)}else v=e.decode83(r.substring(4+2*M,6+2*M)),d[M]=s(v,l*a)
for(var p=4*t,w=new Uint8ClampedArray(p*o),_=0;_<o;_++)for(var m=0;m<t;m++){for(var g=0,b=0,P=0,y=0;y<c;y++)for(M=0;M<f;M++){var B=Math.cos(Math.PI*m*M/t)*Math.cos(Math.PI*_*y/o),R=d[M+y*f]
g+=R[0]*B,b+=R[1]*B,P+=R[2]*B}var T=n.linearTosRGB(g),G=n.linearTosRGB(b),O=n.linearTosRGB(P)
w[4*m+0+_*p]=T,w[4*m+1+_*p]=G,w[4*m+2+_*p]=O,w[4*m+3+_*p]=255}return w}},function(r,t,o){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var e=o(8),n=o(9),a=o(7)
t.default=function(r,t,o,i,u){if(i<1||i>9||u<1||u>9)throw new a.ValidationError("BlurHash must have between 1 and 9 components")
if(t*o*4!==r.length)throw new a.ValidationError("Width and height must match the pixels array")
for(var s=[],h=function(e){for(var a=function(a){var i=0==a&&0==e?1:2,u=function(r,t,o,e){for(var a=0,i=0,u=0,s=4*t,h=0;h<t;h++)for(var c=0;c<o;c++){var f=e(h,c)
a+=f*n.sRGBToLinear(r[4*h+0+c*s]),i+=f*n.sRGBToLinear(r[4*h+1+c*s]),u+=f*n.sRGBToLinear(r[4*h+2+c*s])}var l=1/(t*o)
return[a*l,i*l,u*l]}(r,t,o,(function(r,n){return i*Math.cos(Math.PI*a*r/t)*Math.cos(Math.PI*e*n/o)}))
s.push(u)},u=0;u<i;u++)a(u)},c=0;c<u;c++)h(c)
var f,l,d=s[0],M=s.slice(1),v="",p=i-1+9*(u-1)
if(v+=e.encode83(p,1),M.length>0){var w=Math.max.apply(Math,M.map((function(r){return Math.max.apply(Math,r)}))),_=Math.floor(Math.max(0,Math.min(82,Math.floor(166*w-.5))))
f=(_+1)/166,v+=e.encode83(_,1)}else f=1,v+=e.encode83(0,1)
return v+=e.encode83((l=d,(n.linearTosRGB(l[0])<<16)+(n.linearTosRGB(l[1])<<8)+n.linearTosRGB(l[2])),4),M.forEach((function(r){v+=e.encode83(function(r,t){return 19*Math.floor(Math.max(0,Math.min(18,Math.floor(9*n.signPow(r[0]/t,.5)+9.5))))*19+19*Math.floor(Math.max(0,Math.min(18,Math.floor(9*n.signPow(r[1]/t,.5)+9.5))))+Math.floor(Math.max(0,Math.min(18,Math.floor(9*n.signPow(r[2]/t,.5)+9.5))))}(r,f),2)})),v}}]])
