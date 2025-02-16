(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const we=(e,t)=>e===t,p=Symbol("solid-proxy"),Q=Symbol("solid-track"),M={equals:we};let te=re;const w=1,P=2,ne={owned:null,cleanups:null,context:null,owner:null};var d=null;let j=null,Se=null,h=null,g=null,b=null,I=0;function ie(e,t){const n=h,i=d,s=e.length===0,o=t===void 0?i:t,r=s?ne:{owned:null,cleanups:null,context:o?o.context:null,owner:o},l=s?e:()=>e(()=>C(()=>T(r)));d=r,h=null;try{return v(l,!0)}finally{h=n,d=i}}function se(e,t){t=t?Object.assign({},M,t):M;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),le(n,s));return[oe.bind(n),i]}function x(e,t,n){const i=q(e,t,!1,w);R(i)}function E(e,t,n){te=Te;const i=q(e,t,!1,w);i.user=!0,b?b.push(i):R(i)}function pe(e,t,n){n=n?Object.assign({},M,n):M;const i=q(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,R(i),oe.bind(i)}function Ae(e){return v(e,!1)}function C(e){if(h===null)return e();const t=h;h=null;try{return e()}finally{h=t}}function Oe(e){E(()=>C(e))}function xe(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function k(){return h}function oe(){if(this.sources&&this.state)if(this.state===w)R(this);else{const e=g;g=null,v(()=>N(this),!1),g=e}if(h){const e=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(e)):(h.sources=[this],h.sourceSlots=[e]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function le(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&v(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],r=j&&j.running;r&&j.disposed.has(o),(r?!o.tState:!o.state)&&(o.pure?g.push(o):b.push(o),o.observers&&fe(o)),r||(o.state=w)}if(g.length>1e6)throw g=[],new Error},!1)),t}function R(e){if(!e.fn)return;T(e);const t=I;ve(e,e.value,t)}function ve(e,t,n){let i;const s=d,o=h;h=d=e;try{i=e.fn(t)}catch(r){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(T),e.owned=null),e.updatedAt=n+1,ue(r)}finally{h=o,d=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?le(e,i):e.value=i,e.updatedAt=n)}function q(e,t,n,i=w,s){const o={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:n};return d===null||d!==ne&&(d.owned?d.owned.push(o):d.owned=[o]),o}function H(e){if(e.state===0)return;if(e.state===P)return N(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<I);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===w)R(e);else if(e.state===P){const i=g;g=null,v(()=>N(e,t[0]),!1),g=i}}function v(e,t){if(g)return e();let n=!1;t||(g=[]),b?n=!0:b=[],I++;try{const i=e();return _e(n),i}catch(i){n||(b=null),g=null,ue(i)}}function _e(e){if(g&&(re(g),g=null),e)return;const t=b;b=null,t.length&&v(()=>te(t),!1)}function re(e){for(let t=0;t<e.length;t++)H(e[t])}function Te(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:H(i)}for(t=0;t<n;t++)H(e[t])}function N(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const s=i.state;s===w?i!==t&&(!i.updatedAt||i.updatedAt<I)&&H(i):s===P&&N(i,t)}}}function fe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=P,n.pure?g.push(n):b.push(n),n.observers&&fe(n))}}function T(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),r=n.observerSlots.pop();i<s.length&&(o.sourceSlots[r]=i,s[i]=o,n.observerSlots[i]=r)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)T(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)T(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function me(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ue(e,t=d){throw me(e)}function G(e,t){return C(()=>e(t||{}))}function $e(e,t,n){let i=n.length,s=t.length,o=i,r=0,l=0,f=t[s-1].nextSibling,u=null;for(;r<s||l<o;){if(t[r]===n[l]){r++,l++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===r){const c=o<i?l?n[l-1].nextSibling:n[o-l]:f;for(;l<o;)e.insertBefore(n[l++],c)}else if(o===l)for(;r<s;)(!u||!u.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[o-1]&&n[l]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[l++],t[r++].nextSibling),e.insertBefore(n[--o],c),t[s]=n[o]}else{if(!u){u=new Map;let a=l;for(;a<o;)u.set(n[a],a++)}const c=u.get(t[r]);if(c!=null)if(l<c&&c<o){let a=r,S=1,Y;for(;++a<s&&a<o&&!((Y=u.get(t[a]))==null||Y!==c+S);)S++;if(S>c-l){const be=t[r];for(;l<c;)e.insertBefore(n[l++],be)}else e.replaceChild(n[l++],t[r++])}else r++;else t[r++].remove()}}}const Z="_$DX_DELEGATE";function Ce(e,t,n,i={}){let s;return ie(o=>{s=o,t===document?e():W(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function ce(e,t,n){let i;const s=()=>{const r=document.createElement("template");return r.innerHTML=e,r.content.firstChild},o=()=>(i||(i=s())).cloneNode(!0);return o.cloneNode=o,o}function Re(e,t=window.document){const n=t[Z]||(t[Z]=new Set);for(let i=0,s=e.length;i<s;i++){const o=e[i];n.has(o)||(n.add(o),t.addEventListener(o,Me))}}function J(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Ee(e,t,n){return C(()=>e(t,n))}function W(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return D(e,t,i,n);x(s=>D(e,t(),s,n),i)}function Me(e){let t=e.target;const n=`$$${e.type}`,i=e.target,s=e.currentTarget,o=f=>Object.defineProperty(e,"target",{configurable:!0,value:f}),r=()=>{const f=t[n];if(f&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?f.call(t,u,e):f.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&o(t.host),!0},l=()=>{for(;r()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const f=e.composedPath();o(f[0]);for(let u=0;u<f.length-2&&(t=f[u],!!r());u++){if(t._$host){t=t._$host,l();break}if(t.parentNode===s)break}}else l();o(i)}function D(e,t,n,i,s){for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,r=i!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(o==="number"&&(t=t.toString(),t===n))return n;if(r){let l=n[0];l&&l.nodeType===3?l.data!==t&&(l.data=t):l=document.createTextNode(t),n=A(e,n,i,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean")n=A(e,n,i);else{if(o==="function")return x(()=>{let l=t();for(;typeof l=="function";)l=l();n=D(e,l,n,i)}),()=>n;if(Array.isArray(t)){const l=[],f=n&&Array.isArray(n);if(z(l,t,n,s))return x(()=>n=D(e,l,n,i,!0)),()=>n;if(l.length===0){if(n=A(e,n,i),r)return n}else f?n.length===0?ee(e,l,i):$e(e,n,l):(n&&A(e),ee(e,l));n=l}else if(t.nodeType){if(Array.isArray(n)){if(r)return n=A(e,n,i,t);A(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function z(e,t,n,i){let s=!1;for(let o=0,r=t.length;o<r;o++){let l=t[o],f=n&&n[e.length],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))s=z(e,l,f)||s;else if(u==="function")if(i){for(;typeof l=="function";)l=l();s=z(e,Array.isArray(l)?l:[l],Array.isArray(f)?f:[f])||s}else e.push(l),s=!0;else{const c=String(l);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return s}function ee(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function A(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let o=!1;for(let r=t.length-1;r>=0;r--){const l=t[r];if(s!==l){const f=l.parentNode===e;!o&&!r?f?e.replaceChild(s,l):e.insertBefore(s,n):f&&l.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}const K=Symbol("store-raw"),O=Symbol("store-node"),y=Symbol("store-has"),ae=Symbol("store-self");function he(e){let t=e[p];if(!t&&(Object.defineProperty(e,p,{value:t=new Proxy(e,Ne)}),!Array.isArray(e))){const n=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let s=0,o=n.length;s<o;s++){const r=n[s];i[r].get&&Object.defineProperty(e,r,{enumerable:i[r].enumerable,get:i[r].get.bind(t)})}}return t}function F(e){let t;return e!=null&&typeof e=="object"&&(e[p]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function m(e,t=new Set){let n,i,s,o;if(n=e!=null&&e[K])return n;if(!F(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let r=0,l=e.length;r<l;r++)s=e[r],(i=m(s,t))!==s&&(e[r]=i)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const r=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let f=0,u=r.length;f<u;f++)o=r[f],!l[o].get&&(s=e[o],(i=m(s,t))!==s&&(e[o]=i))}return e}function U(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function $(e,t,n){if(e[t])return e[t];const[i,s]=se(n,{equals:!1,internal:!0});return i.$=s,e[t]=i}function Pe(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===p||t===O||(delete n.value,delete n.writable,n.get=()=>e[p][t]),n}function de(e){k()&&$(U(e,O),ae)()}function He(e){return de(e),Reflect.ownKeys(e)}const Ne={get(e,t,n){if(t===K)return e;if(t===p)return n;if(t===Q)return de(e),n;const i=U(e,O),s=i[t];let o=s?s():e[t];if(t===O||t===y||t==="__proto__")return o;if(!s){const r=Object.getOwnPropertyDescriptor(e,t);k()&&(typeof o!="function"||e.hasOwnProperty(t))&&!(r&&r.get)&&(o=$(i,t,o)())}return F(o)?he(o):o},has(e,t){return t===K||t===p||t===Q||t===O||t===y||t==="__proto__"?!0:(k()&&$(U(e,y),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:He,getOwnPropertyDescriptor:Pe};function L(e,t,n,i=!1){if(!i&&e[t]===n)return;const s=e[t],o=e.length;n===void 0?(delete e[t],e[y]&&e[y][t]&&s!==void 0&&e[y][t].$()):(e[t]=n,e[y]&&e[y][t]&&s===void 0&&e[y][t].$());let r=U(e,O),l;if((l=$(r,t,s))&&l.$(()=>n),Array.isArray(e)&&e.length!==o){for(let f=e.length;f<o;f++)(l=r[f])&&l.$();(l=$(r,"length",o))&&l.$(e.length)}(l=r[ae])&&l.$()}function ge(e,t){const n=Object.keys(t);for(let i=0;i<n.length;i+=1){const s=n[i];L(e,s,t[s])}}function De(e,t){if(typeof t=="function"&&(t=t(e)),t=m(t),Array.isArray(t)){if(e===t)return;let n=0,i=t.length;for(;n<i;n++){const s=t[n];e[n]!==s&&L(e,n,s)}L(e,"length",i)}else ge(e,t)}function _(e,t,n=[]){let i,s=e;if(t.length>1){i=t.shift();const r=typeof i,l=Array.isArray(e);if(Array.isArray(i)){for(let f=0;f<i.length;f++)_(e,[i[f]].concat(t),n);return}else if(l&&r==="function"){for(let f=0;f<e.length;f++)i(e[f],f)&&_(e,[f].concat(t),n);return}else if(l&&r==="object"){const{from:f=0,to:u=e.length-1,by:c=1}=i;for(let a=f;a<=u;a+=c)_(e,[a].concat(t),n);return}else if(t.length>1){_(e[i],t,[i].concat(n));return}s=e[i],n=[i].concat(n)}let o=t[0];typeof o=="function"&&(o=o(s,n),o===s)||i===void 0&&o==null||(o=m(o),i===void 0||F(s)&&F(o)&&!Array.isArray(o)?ge(s,o):L(e,i,o))}function Fe(...[e,t]){const n=m(e||{}),i=Array.isArray(n),s=he(n);function o(...r){Ae(()=>{i&&r.length===1?De(n,r[0]):_(n,r)})}return[s,o]}const Ue=()=>{const[e,t]=Fe({hour:0,minute:0});return{context:e,send:i=>{switch(i.type){case"SET_HOUR":t("hour",i.hour);break;case"SET_MINUTE":t("minute",i.minute);break}}}},V=ie(()=>Ue());function X(e){return pe(()=>V.context[e])}const Le="clock-calendar",Ie={name:Le},je="#F0F0F0",Be=3.5,ke=1.159,Ge="#F9F9F9",We="#D9D9D9",ze=1,Ke="#F0F0F0",Ve="#FF0000",Xe=`/${Ie.name}/Rubik-font.woff2`;function qe(e){const t=e.getContext("2d");t==null||t.clearRect(0,0,e.width,e.height)}function ye(){return Math.max(window.devicePixelRatio,1)}function Ye(e){const t=e.getContext("2d"),n=ye();t==null||t.resetTransform(),t==null||t.scale(n,n)}function Qe(e,t){const n=e.getContext("2d");n&&(n.fillStyle=je,n.fillRect(0,0,t.width,t.height))}function B(e){return e.value<e.inMin?e.outMin:e.value>e.inMax?e.outMax:(e.value-e.inMin)*(e.outMax-e.outMin)/(e.inMax-e.inMin)+e.outMin}function Ze(e){const t=e.canvasEl.getContext("2d");if(!t)return;const n=B({value:Be,inMin:0,inMax:100,outMin:0,outMax:e.canvasSize.width}),i=n*ke,s=24,o=n*s,r=n*ze,l=B({value:7,inMin:0,inMax:100,outMin:0,outMax:r});for(let f=0;f<s;f++){const u=e.canvasSize.width/2-o/2+n*f,c=e.canvasSize.height/2-i/2;t.fillStyle=Ge,t.fillRect(u,c,n,i),f>0&&(t.strokeStyle=We,t.beginPath(),t.moveTo(u,c),t.lineTo(u,c+i),t.stroke());const a=f>12?f-12:f;if(t.fillStyle=f===e.activeHour?Ve:Ke,t.textAlign="center",t.textBaseline="middle",t.font=`${r}px Rubik`,a>=10){t.textAlign="right",t.fillText(Math.trunc(a/10).toString(),u+n/2,c+i/2+l,n),t.textAlign="center",t.textBaseline="bottom",t.font=`${r/1.5}px Rubik`;const S=B({value:9,inMin:0,inMax:100,outMin:0,outMax:r});t.fillText((a%10).toString(),u+n-n/3,c+i-S,n)}else t.fillText(a.toString(),u+n/2,c+i/2+l,n)}}var Je=ce("<canvas id=visualization-canvas>");function et(){const e=X("hour"),[t,n]=se({width:0,height:0});let i,s;const o=l=>{if(!i)return;const f=l[0].contentRect,u=ye();n({width:f.width*u,height:f.height*u})},r=()=>{const l=i==null?void 0:i.getContext("2d");!i||!l||(qe(i),Qe(i,t()),Ze({canvasEl:i,canvasSize:t(),activeHour:e()}))};return E(()=>{i&&Ye(i)}),E(()=>{r()}),E(()=>{new FontFace("Rubik",`url(${Xe})`).load().then(r)}),Oe(()=>{s=new ResizeObserver(o),i&&s.observe(i)}),xe(()=>{i&&(s==null||s.unobserve(i))}),(()=>{var l=Je(),f=i;return typeof f=="function"?Ee(f,l):i=l,x(u=>{var c=t().width,a=t().height;return c!==u.e&&J(l,"width",u.e=c),a!==u.t&&J(l,"height",u.t=a),u},{e:void 0,t:void 0}),l})()}var tt=ce("<div class=time-setter-container><div class=time-setter-item><div class=time-setter-label>Hour:</div><input type=range min=0 max=23 class=slider><div class=time-setter-value></div></div><div class=time-setter-item><div class=time-setter-label>Minute:</div><input type=range min=0 max=59 class=slider><div class=time-setter-value>");function nt(){const e=X("hour"),t=X("minute"),n=s=>{V.send({type:"SET_HOUR",hour:Number(s.currentTarget.value)})},i=s=>{V.send({type:"SET_MINUTE",minute:Number(s.currentTarget.value)})};return(()=>{var s=tt(),o=s.firstChild,r=o.firstChild,l=r.nextSibling,f=l.nextSibling,u=o.nextSibling,c=u.firstChild,a=c.nextSibling,S=a.nextSibling;return l.$$input=n,W(f,e),a.$$input=i,W(S,t),x(()=>l.value=e()),x(()=>a.value=t()),s})()}Re(["input"]);function it(){return[G(et,{}),G(nt,{})]}const st=document.getElementById("root");Ce(()=>G(it,{}),st);
