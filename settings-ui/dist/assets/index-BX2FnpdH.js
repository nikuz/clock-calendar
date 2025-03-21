(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Xe=(e,t)=>e===t,T=Symbol("solid-proxy"),Ke=typeof Proxy=="function",he=Symbol("solid-track"),ee={equals:Xe};let He=Pe;const L=1,te=2,Re={owned:null,cleanups:null,context:null,owner:null};var S=null;let ue=null,Ye=null,b=null,m=null,R=null,ae=0;function W(e,t){const n=b,i=S,s=e.length===0,r=t===void 0?i:t,l=s?Re:{owned:null,cleanups:null,context:r?r.context:null,owner:r},o=s?e:()=>e(()=>j(()=>G(l)));S=l,b=null;try{return B(o,!0)}finally{b=n,S=i}}function ne(e,t){t=t?Object.assign({},ee,t):ee;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),Le(n,s));return[Me.bind(n),i]}function I(e,t,n){const i=we(e,t,!1,L);Y(i)}function p(e,t,n){He=Je;const i=we(e,t,!1,L);i.user=!0,R?R.push(i):Y(i)}function Se(e,t,n){n=n?Object.assign({},ee,n):ee;const i=we(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,Y(i),Me.bind(i)}function qe(e){return B(e,!1)}function j(e){if(b===null)return e();const t=b;b=null;try{return e()}finally{b=t}}function Ce(e){p(()=>j(e))}function Ie(e){return S===null||(S.cleanups===null?S.cleanups=[e]:S.cleanups.push(e)),e}function ge(){return b}function Me(){if(this.sources&&this.state)if(this.state===L)Y(this);else{const e=m;m=null,B(()=>se(this),!1),m=e}if(b){const e=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(e)):(b.sources=[this],b.sourceSlots=[e]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function Le(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&B(()=>{for(let s=0;s<e.observers.length;s+=1){const r=e.observers[s],l=ue&&ue.running;l&&ue.disposed.has(r),(l?!r.tState:!r.state)&&(r.pure?m.push(r):R.push(r),r.observers&&De(r)),l||(r.state=L)}if(m.length>1e6)throw m=[],new Error},!1)),t}function Y(e){if(!e.fn)return;G(e);const t=ae;Ze(e,e.value,t)}function Ze(e,t,n){let i;const s=S,r=b;b=S=e;try{i=e.fn(t)}catch(l){return e.pure&&(e.state=L,e.owned&&e.owned.forEach(G),e.owned=null),e.updatedAt=n+1,ke(l)}finally{b=r,S=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Le(e,i):e.value=i,e.updatedAt=n)}function we(e,t,n,i=L,s){const r={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:S,context:S?S.context:null,pure:n};return S===null||S!==Re&&(S.owned?S.owned.push(r):S.owned=[r]),r}function ie(e){if(e.state===0)return;if(e.state===te)return se(e);if(e.suspense&&j(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ae);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===L)Y(e);else if(e.state===te){const i=m;m=null,B(()=>se(e,t[0]),!1),m=i}}function B(e,t){if(m)return e();let n=!1;t||(m=[]),R?n=!0:R=[],ae++;try{const i=e();return Qe(n),i}catch(i){n||(R=null),m=null,ke(i)}}function Qe(e){if(m&&(Pe(m),m=null),e)return;const t=R;R=null,t.length&&B(()=>He(t),!1)}function Pe(e){for(let t=0;t<e.length;t++)ie(e[t])}function Je(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:ie(i)}for(t=0;t<n;t++)ie(e[t])}function se(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const s=i.state;s===L?i!==t&&(!i.updatedAt||i.updatedAt<ae)&&ie(i):s===te&&se(i,t)}}}function De(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=te,n.pure?m.push(n):R.push(n),n.observers&&De(n))}}function G(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const r=s.pop(),l=n.observerSlots.pop();i<s.length&&(r.sourceSlots[l]=i,s[i]=r,n.observerSlots[i]=l)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)G(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)G(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function et(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ke(e,t=S){throw et(e)}const tt=Symbol("fallback");function Ee(e){for(let t=0;t<e.length;t++)e[t]()}function nt(e,t,n={}){let i=[],s=[],r=[],l=0,o=t.length>1?[]:null;return Ie(()=>Ee(r)),()=>{let c=e()||[],u=c.length,f,a;return c[he],j(()=>{let g,v,d,w,y,E,_,$,D;if(u===0)l!==0&&(Ee(r),r=[],i=[],s=[],l=0,o&&(o=[])),n.fallback&&(i=[tt],s[0]=W(Ge=>(r[0]=Ge,n.fallback())),l=1);else if(l===0){for(s=new Array(u),a=0;a<u;a++)i[a]=c[a],s[a]=W(h);l=u}else{for(d=new Array(u),w=new Array(u),o&&(y=new Array(u)),E=0,_=Math.min(l,u);E<_&&i[E]===c[E];E++);for(_=l-1,$=u-1;_>=E&&$>=E&&i[_]===c[$];_--,$--)d[$]=s[_],w[$]=r[_],o&&(y[$]=o[_]);for(g=new Map,v=new Array($+1),a=$;a>=E;a--)D=c[a],f=g.get(D),v[a]=f===void 0?-1:f,g.set(D,a);for(f=E;f<=_;f++)D=i[f],a=g.get(D),a!==void 0&&a!==-1?(d[a]=s[f],w[a]=r[f],o&&(y[a]=o[f]),a=v[a],g.set(D,a)):r[f]();for(a=E;a<u;a++)a in d?(s[a]=d[a],r[a]=w[a],o&&(o[a]=y[a],o[a](a))):s[a]=W(h);s=s.slice(0,l=u),i=c.slice(0)}return s});function h(g){if(r[a]=g,o){const[v,d]=ne(a);return o[a]=d,t(c[a],v)}return t(c[a])}}}function O(e,t){return j(()=>e(t||{}))}function J(){return!0}const it={get(e,t,n){return t===T?n:e.get(t)},has(e,t){return t===T?!0:e.has(t)},set:J,deleteProperty:J,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:J,deleteProperty:J}},ownKeys(e){return e.keys()}};function fe(e){return(e=typeof e=="function"?e():e)?e:{}}function st(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function rt(...e){let t=!1;for(let l=0;l<e.length;l++){const o=e[l];t=t||!!o&&T in o,e[l]=typeof o=="function"?(t=!0,Se(o)):o}if(Ke&&t)return new Proxy({get(l){for(let o=e.length-1;o>=0;o--){const c=fe(e[o])[l];if(c!==void 0)return c}},has(l){for(let o=e.length-1;o>=0;o--)if(l in fe(e[o]))return!0;return!1},keys(){const l=[];for(let o=0;o<e.length;o++)l.push(...Object.keys(fe(e[o])));return[...new Set(l)]}},it);const n={},i=Object.create(null);for(let l=e.length-1;l>=0;l--){const o=e[l];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let u=c.length-1;u>=0;u--){const f=c[u];if(f==="__proto__"||f==="constructor")continue;const a=Object.getOwnPropertyDescriptor(o,f);if(!i[f])i[f]=a.get?{enumerable:!0,configurable:!0,get:st.bind(n[f]=[a.get.bind(o)])}:a.value!==void 0?a:void 0;else{const h=n[f];h&&(a.get?h.push(a.get.bind(o)):a.value!==void 0&&h.push(()=>a.value))}}}const s={},r=Object.keys(i);for(let l=r.length-1;l>=0;l--){const o=r[l],c=i[o];c&&c.get?Object.defineProperty(s,o,c):s[o]=c?c.value:void 0}return s}function ot(e){const t="fallback"in e&&{fallback:()=>e.fallback};return Se(nt(()=>e.each,e.children,t||void 0))}function lt(e,t,n){let i=n.length,s=t.length,r=i,l=0,o=0,c=t[s-1].nextSibling,u=null;for(;l<s||o<r;){if(t[l]===n[o]){l++,o++;continue}for(;t[s-1]===n[r-1];)s--,r--;if(s===l){const f=r<i?o?n[o-1].nextSibling:n[r-o]:c;for(;o<r;)e.insertBefore(n[o++],f)}else if(r===o)for(;l<s;)(!u||!u.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[r-1]&&n[o]===t[s-1]){const f=t[--s].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--r],f),t[s]=n[r]}else{if(!u){u=new Map;let a=o;for(;a<r;)u.set(n[a],a++)}const f=u.get(t[l]);if(f!=null)if(o<f&&f<r){let a=l,h=1,g;for(;++a<s&&a<r&&!((g=u.get(t[a]))==null||g!==f+h);)h++;if(h>f-o){const v=t[l];for(;o<f;)e.insertBefore(n[o++],v)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const _e="_$DX_DELEGATE";function ct(e,t,n,i={}){let s;return W(r=>{s=r,t===document?e():A(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function C(e,t,n){let i;const s=()=>{const l=document.createElement("template");return l.innerHTML=e,l.content.firstChild},r=()=>(i||(i=s())).cloneNode(!0);return r.cloneNode=r,r}function pe(e,t=window.document){const n=t[_e]||(t[_e]=new Set);for(let i=0,s=e.length;i<s;i++){const r=e[i];n.has(r)||(n.add(r),t.addEventListener(r,ut))}}function V(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function at(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ae(e,t,n){return j(()=>e(t,n))}function A(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return re(e,t,i,n);I(s=>re(e,t(),s,n),i)}function ut(e){let t=e.target;const n=`$$${e.type}`,i=e.target,s=e.currentTarget,r=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),l=()=>{const c=t[n];if(c&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?c.call(t,u,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&r(t.host),!0},o=()=>{for(;l()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();r(c[0]);for(let u=0;u<c.length-2&&(t=c[u],!!l());u++){if(t._$host){t=t._$host,o();break}if(t.parentNode===s)break}}else o();r(i)}function re(e,t,n,i,s){for(;typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,l=i!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(r==="number"&&(t=t.toString(),t===n))return n;if(l){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=k(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean")n=k(e,n,i);else{if(r==="function")return I(()=>{let o=t();for(;typeof o=="function";)o=o();n=re(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(ve(o,t,n,s))return I(()=>n=re(e,o,n,i,!0)),()=>n;if(o.length===0){if(n=k(e,n,i),l)return n}else c?n.length===0?Oe(e,o,i):lt(e,n,o):(n&&k(e),Oe(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=k(e,n,i,t);k(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ve(e,t,n,i){let s=!1;for(let r=0,l=t.length;r<l;r++){let o=t[r],c=n&&n[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))s=ve(e,o,c)||s;else if(u==="function")if(i){for(;typeof o=="function";)o=o();s=ve(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return s}function Oe(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function k(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(s!==o){const c=o.parentNode===e;!r&&!l?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else r=!0}}else e.insertBefore(s,n);return[s]}const be=Symbol("store-raw"),N=Symbol("store-node"),H=Symbol("store-has"),Ne=Symbol("store-self");function ze(e){let t=e[T];if(!t&&(Object.defineProperty(e,T,{value:t=new Proxy(e,ht)}),!Array.isArray(e))){const n=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let s=0,r=n.length;s<r;s++){const l=n[s];i[l].get&&Object.defineProperty(e,l,{enumerable:i[l].enumerable,get:i[l].get.bind(t)})}}return t}function oe(e){let t;return e!=null&&typeof e=="object"&&(e[T]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function X(e,t=new Set){let n,i,s,r;if(n=e!=null&&e[be])return n;if(!oe(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let l=0,o=e.length;l<o;l++)s=e[l],(i=X(s,t))!==s&&(e[l]=i)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const l=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,u=l.length;c<u;c++)r=l[c],!o[r].get&&(s=e[r],(i=X(s,t))!==s&&(e[r]=i))}return e}function le(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function K(e,t,n){if(e[t])return e[t];const[i,s]=ne(n,{equals:!1,internal:!0});return i.$=s,e[t]=i}function ft(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===T||t===N||(delete n.value,delete n.writable,n.get=()=>e[T][t]),n}function Ue(e){ge()&&K(le(e,N),Ne)()}function dt(e){return Ue(e),Reflect.ownKeys(e)}const ht={get(e,t,n){if(t===be)return e;if(t===T)return n;if(t===he)return Ue(e),n;const i=le(e,N),s=i[t];let r=s?s():e[t];if(t===N||t===H||t==="__proto__")return r;if(!s){const l=Object.getOwnPropertyDescriptor(e,t);ge()&&(typeof r!="function"||e.hasOwnProperty(t))&&!(l&&l.get)&&(r=K(i,t,r)())}return oe(r)?ze(r):r},has(e,t){return t===be||t===T||t===he||t===N||t===H||t==="__proto__"?!0:(ge()&&K(le(e,H),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:dt,getOwnPropertyDescriptor:ft};function ce(e,t,n,i=!1){if(!i&&e[t]===n)return;const s=e[t],r=e.length;n===void 0?(delete e[t],e[H]&&e[H][t]&&s!==void 0&&e[H][t].$()):(e[t]=n,e[H]&&e[H][t]&&s===void 0&&e[H][t].$());let l=le(e,N),o;if((o=K(l,t,s))&&o.$(()=>n),Array.isArray(e)&&e.length!==r){for(let c=e.length;c<r;c++)(o=l[c])&&o.$();(o=K(l,"length",r))&&o.$(e.length)}(o=l[Ne])&&o.$()}function je(e,t){const n=Object.keys(t);for(let i=0;i<n.length;i+=1){const s=n[i];ce(e,s,t[s])}}function gt(e,t){if(typeof t=="function"&&(t=t(e)),t=X(t),Array.isArray(t)){if(e===t)return;let n=0,i=t.length;for(;n<i;n++){const s=t[n];e[n]!==s&&ce(e,n,s)}ce(e,"length",i)}else je(e,t)}function F(e,t,n=[]){let i,s=e;if(t.length>1){i=t.shift();const l=typeof i,o=Array.isArray(e);if(Array.isArray(i)){for(let c=0;c<i.length;c++)F(e,[i[c]].concat(t),n);return}else if(o&&l==="function"){for(let c=0;c<e.length;c++)i(e[c],c)&&F(e,[c].concat(t),n);return}else if(o&&l==="object"){const{from:c=0,to:u=e.length-1,by:f=1}=i;for(let a=c;a<=u;a+=f)F(e,[a].concat(t),n);return}else if(t.length>1){F(e[i],t,[i].concat(n));return}s=e[i],n=[i].concat(n)}let r=t[0];typeof r=="function"&&(r=r(s,n),r===s)||i===void 0&&r==null||(r=X(r),i===void 0||oe(s)&&oe(r)&&!Array.isArray(r)?je(s,r):ce(e,i,r))}function vt(...[e,t]){const n=X(e||{}),i=Array.isArray(n),s=ze(n);function r(...l){qe(()=>{i&&l.length===1?gt(n,l[0]):F(n,l)})}return[s,r]}const bt=()=>{const e=new Date,[t,n]=vt({hour:e.getHours(),minute:e.getMinutes(),events:[],brightness:100});return{context:t,send:s=>{switch(s.type){case"SET_HOUR":n("hour",s.hour);break;case"SET_MINUTE":n("minute",s.minute);break;case"SET_EVENTS":n("events",s.events);break;case"SET_ACTIVE_EVENT":n("activeEvent",s.index);break;case"CLEAR_ACTIVE_EVENT":n("activeEvent",void 0);break;case"SET_BRIGHTNESS":n("brightness",s.value);break}}}},P=W(()=>bt());function x(e){return Se(()=>P.context[e])}const yt="clock-calendar",Be={name:yt},St="#71706F",M=24,q=3.5,Z=1.159,wt="rgb(183, 183, 183)",mt="#D0D0D0",Et=1.2,_t="rgba(104, 104, 104, 0.1)",At="#FFF",Ot=`/${Be.name}/Rubik-font.woff2`,Fe="rgba(183, 183, 183, 0.4)",Q=.2,z=6,xt="#00FF00",xe=`/${Be.name}/holder.svg`,Tt=5.8,$t="rgba(200, 200, 200, 0.5)",me=10,We="#F00",Ht=["#00ffff","#ff4500","#ffa600","#8a2be2","#ff00ff","#8b4513","#32cd32","#ffd900","#40e0d0","#ffc0cb","#dc143c","#e6e6fa","#808000","#00ff7f","#4682b4","#daa520","#ff69b4","#228b22","#800000"];function Rt(e){const t=e.getContext("2d");t==null||t.clearRect(0,0,e.width,e.height)}function Ve(){return Math.max(window.devicePixelRatio,1)}function Ct(e){const t=e.getContext("2d"),n=Ve();t==null||t.resetTransform(),t==null||t.scale(n,n)}function U(e){return e.value<e.inMin?e.outMin:e.value>e.inMax?e.outMax:(e.value-e.inMin)*(e.outMax-e.outMin)/(e.inMax-e.inMin)+e.outMin}function It(e){const t=e.canvasEl.getContext("2d");if(!t)return;const n=U({value:q,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),i=n*Z,s=i*Q,r=e.canvasSize.height/2-i/2-s*2,l=n*M,o=n*Et;for(let c=0;c<M;c++){t.globalAlpha=e.brightness/100;const u=c===e.activeHour,f=e.canvasSize.width/2-l/2+n*c;t.fillStyle=wt,t.fillRect(f,r,n,i),c>0&&(t.strokeStyle=mt,t.beginPath(),t.moveTo(f,r),t.lineTo(f,r+i),t.stroke());const a=c>12?c-12:c;if(t.fillStyle=u?At:_t,u&&e.brightness<=me&&(t.fillStyle=We),t.textAlign="center",u&&(t.globalAlpha=1),a>=10){t.font=`${o}px Rubik`;const h=Math.trunc(a/10).toString(),g=de(t,h);t.textAlign="right",t.fillText(h,f+n/2+n/100*3,r+i+Te(g),n),t.textAlign="center",t.textBaseline="alphabetic",t.font=`${o/1.5}px Rubik`;const v=(a%10).toString(),d=de(t,v);t.fillText(v,f+n-n/3.5,r+i+Mt(d),n)}else{t.font=`${o}px Rubik`;const h=a.toString(),g=de(t,h);t.fillText(h,f+n/2,r+i+Te(g),n)}}t.globalAlpha=e.brightness/100}function de(e,t){return e.measureText(t)}function Te(e){return navigator.userAgent.toLowerCase().indexOf("firefox")>-1?e.ideographicBaseline:e.ideographicBaseline/2}function Mt(e){return navigator.userAgent.toLowerCase().indexOf("firefox")>-1?e.ideographicBaseline*1.5:e.ideographicBaseline/1.3}function Lt(e){const t=e.canvasEl.getContext("2d");if(!t)return;const n=U({value:q,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),i=n*Z,s=i*Q,r=n/z,l=r/100*83,o=r-l,c=e.canvasSize.height/2+i/2-s*2+s/5,u=n*M;for(let f=0;f<M;f++){const a=e.canvasSize.width/2-u/2+n*f;for(let h=0;h<z;h++){t.globalAlpha=e.brightness/100;const g=a+o/2+r*h;t.fillStyle=Fe,t.fillRect(g,c,l,l),f===e.activeHour&&e.activeMinute/10>=h&&(t.globalAlpha=1,t.beginPath(),t.fillStyle=xt,e.brightness<=me&&(t.fillStyle=We),t.arc(g+l/2,c+l/2,l/2,0,10),t.fill())}}t.globalAlpha=e.brightness/100}function Pt(e){const t=e.canvasEl.getContext("2d");if(!t)return;const n=U({value:q,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),i=n*Z,s=i*Q,r=n/z,l=r/100*83,o=r-l,c=e.canvasSize.height/2+i/2-s,u=n*M;let f=0,a=e.events[f];for(let h=0;h<M;h++){const g=e.canvasSize.width/2-u/2+n*h;for(let v=0;v<z;v++){t.globalAlpha=e.brightness/100;const d=h*z+v,w=g+o/2+r*v;if(t.fillStyle=Fe,t.fillRect(w,c,l,l),a&&d>=a.startLedIndex&&d<=a.endLedIndex){e.brightness>me&&(t.globalAlpha=Math.min(e.brightness/100*2,1));let y=1;e.activeEvent!==void 0&&(f!==e.activeEvent||!e.blinkCycleHight)&&(y=.5),t.save(),t.filter=`opacity(${y})`,t.beginPath(),t.fillStyle=a.color,t.arc(w+l/2,c+l/2,l/2,0,10),t.fill(),t.restore(),d===a.endLedIndex&&(f++,a=e.events[f])}}}t.globalAlpha=e.brightness/100}function Dt(e){const t=e.canvasEl.getContext("2d");if(!t||!e.image||!e.image.width)return;const n=e.image.width,i=e.image.height,s=n/i,r=U({value:Tt,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),l=r*s,o=U({value:q,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),c=o*Z,u=c*Q,f=e.image.width,a=e.image.height,h=f/a;let g=r,v=l;r/l>h?g=l*h:v=r/h;const d=o*M,w=e.canvasSize.width/2-d/2-g-g/100,y=e.canvasSize.height/2-c/2-u*2-l/180;t.drawImage(e.image,w,y,g,v);const E=e.canvasSize.width/2+d/2+g+g/100;t.save(),t.scale(-1,1),t.drawImage(e.image,-E,y,g,v),t.restore()}function kt(e){const t=e.canvasEl.getContext("2d");if(!t)return;const n=U({value:q,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),i=n*Z,s=i*Q,r=n*M,l=4,o=e.canvasSize.width/2-r/2-l,c=e.canvasSize.height/2-i/2-s*2,u=e.canvasSize.width/2+r/2-o+l,f=i+s*2-s/6;t.fillStyle=$t,t.fillRect(o,c,u,f)}var pt=C("<canvas id=visualization-canvas>"),Nt=C("<img id=visualization-holder-image>");function zt(){const e=x("hour"),t=x("minute"),n=x("events"),i=x("activeEvent"),s=x("brightness"),[r,l]=ne({width:0,height:0}),[o,c]=ne(!0);let u,f,a,h;const g=d=>{if(!u)return;const w=d[0].contentRect,y=Ve();l({width:w.width*y,height:w.height*y})},v=()=>{const d=u==null?void 0:u.getContext("2d");!u||!d||(d.globalAlpha=s()/100,Rt(u),kt({canvasEl:u,canvasSize:r()}),It({canvasEl:u,canvasSize:r(),activeHour:e(),brightness:s()}),Lt({canvasEl:u,canvasSize:r(),activeHour:e(),activeMinute:t(),brightness:s()}),Pt({canvasEl:u,canvasSize:r(),events:n(),activeEvent:i(),blinkCycleHight:o(),brightness:s()}),Dt({canvasEl:u,canvasSize:r(),image:f}))};return p(()=>{u&&Ct(u)}),p(()=>{v()}),p(()=>{new FontFace("Rubik",`url(${Ot})`).load().then(v)}),p(()=>{const d=new Image;d.src=xe,d.onload=v}),p(()=>{i()===void 0?(c(!0),clearInterval(h)):h=setInterval(()=>{i()!==void 0&&c(!o())},1e3)}),Ce(()=>{a=new ResizeObserver(g),u&&a.observe(u)}),Ie(()=>{u&&(a==null||a.unobserve(u)),clearInterval(h)}),[(()=>{var d=pt(),w=u;return typeof w=="function"?Ae(w,d):u=d,I(y=>{var E=r().width,_=r().height;return E!==y.e&&V(d,"width",y.e=E),_!==y.t&&V(d,"height",y.t=_),y},{e:void 0,t:void 0}),d})(),(()=>{var d=Nt(),w=f;return typeof w=="function"?Ae(w,d):f=d,V(d,"src",xe),d})()]}var Ut=C("<div><div class=slider-label></div><input type=range class=slider><div class=slider-value>");function ye(e){return(()=>{var t=Ut(),n=t.firstChild,i=n.nextSibling,s=i.nextSibling;return A(n,()=>e.label),i.$$input=r=>e.onInput(r),A(s,()=>e.value),I(r=>{var l=`slider-container ${e.class??""}`,o=e.min,c=e.max;return l!==r.e&&at(t,r.e=l),o!==r.t&&V(i,"min",r.t=o),c!==r.a&&V(i,"max",r.a=c),r},{e:void 0,t:void 0,a:void 0}),I(()=>i.value=e.value),t})()}pe(["input"]);var jt=C("<div class=time-setter-container><h2>Time");function Bt(){const e=x("hour"),t=x("minute"),n=s=>{P.send({type:"SET_HOUR",hour:Number(s.currentTarget.value)})},i=s=>{P.send({type:"SET_MINUTE",minute:Number(s.currentTarget.value)})};return(()=>{var s=jt();return s.firstChild,A(s,O(ye,{label:"Hour:",get value(){return e()},min:0,max:23,onInput:n}),null),A(s,O(ye,{label:"Minute:",get value(){return t()},min:0,max:59,onInput:i}),null),s})()}function Ft(e,t){const n=r=>{const l=Math.floor(r/60),o=r%60;let c="AM",u=l;return l>=12&&(c="PM",u=l===12?12:l-12),l===0&&(u=12),{time:o===0?`${u}`:`${u}:${o.toString().padStart(2,"0")}`,period:c}},i=n(e),s=n(t);return i.period===s.period?`${i.time} - ${s.time}${i.period}`:`${i.time}${i.period} - ${s.time}${s.period}`}function $e(e,t=!0){let n=Math.trunc(e/60)*z+Math.trunc(e%60/10);return!t&&n>0&&e%10===0&&n--,n}function Wt(e,t=1){e=e.replace("#","");let n=parseInt(e.substring(0,2),16),i=parseInt(e.substring(2,4),16),s=parseInt(e.substring(4,6),16);return`rgba(${n}, ${i}, ${s}, ${t})`}var Vt=C("<li><div class=event-list-content><span class=event-list-item-color></span><span class=elc-summary>");function Gt(e){const t=()=>{P.send({type:"SET_ACTIVE_EVENT",index:e.index})},n=()=>{P.send({type:"CLEAR_ACTIVE_EVENT"})};return(()=>{var i=Vt(),s=i.firstChild,r=s.firstChild,l=r.nextSibling;return s.addEventListener("mouseleave",n),s.addEventListener("mouseenter",t),A(l,()=>e.summary),I(o=>(o=e.color)!=null?r.style.setProperty("background",o):r.style.removeProperty("background")),i})()}var Xt=C("<ul class=event-list>");function Kt(){const e=x("events");return(()=>{var t=Xt();return A(t,O(ot,{get each(){return e()},children:(n,i)=>O(Gt,rt(n,{get index(){return i()}}))})),t})()}var Yt=C("<div class=event-generator-container><div class=events-generator-title-wrapper><h2>Events</h2><span class=events-generator-dash>&mdash;</span><button class=events-generator-btn>Generate");function qt(){const e=()=>{const t=[];let i=480,s=18*60,r=i,l=0;for(;r<s;){const o=Math.round(Math.random()*7+1),c=Math.round(Math.random()*1+1),u=r,f=r+o*15;t.push({summary:Ft(u,f),startTime:u,endTime:f,startLedIndex:$e(u),endLedIndex:$e(f,!1),color:Ht[l]}),r=f+c*15,l++}P.send({type:"SET_EVENTS",events:t})};return Ce(()=>{e()}),(()=>{var t=Yt(),n=t.firstChild,i=n.firstChild,s=i.nextSibling,r=s.nextSibling;return r.$$click=e,A(t,O(Kt,{}),null),t})()}pe(["click"]);var Zt=C("<div class=brightness-setter-container>");function Qt(){const e=x("brightness"),t=n=>{P.send({type:"SET_BRIGHTNESS",value:Number(n.currentTarget.value)})};return(()=>{var n=Zt();return A(n,O(ye,{label:"Room brightness:",get value(){return e()},min:0,max:100,class:"room-brightness-slider",onInput:t})),n})()}var Jt=C("<div class=content><div class=settings-grid>");function en(){const e=x("brightness");return(()=>{var t=Jt(),n=t.firstChild;return A(t,O(zt,{}),n),A(t,O(Qt,{}),n),A(n,O(Bt,{}),null),A(n,O(qt,{}),null),I(i=>(i=Wt(St,e()/100))!=null?t.style.setProperty("background",i):t.style.removeProperty("background")),t})()}const tn=document.getElementById("root");ct(()=>O(en,{}),tn);
