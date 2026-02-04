(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();function hd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ja={exports:{}},ai={},eo={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er=Symbol.for("react.element"),md=Symbol.for("react.portal"),fd=Symbol.for("react.fragment"),vd=Symbol.for("react.strict_mode"),gd=Symbol.for("react.profiler"),xd=Symbol.for("react.provider"),yd=Symbol.for("react.context"),Sd=Symbol.for("react.forward_ref"),jd=Symbol.for("react.suspense"),Nd=Symbol.for("react.memo"),wd=Symbol.for("react.lazy"),Ws=Symbol.iterator;function _d(e){return e===null||typeof e!="object"?null:(e=Ws&&e[Ws]||e["@@iterator"],typeof e=="function"?e:null)}var to={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},no=Object.assign,ro={};function pn(e,t,n){this.props=e,this.context=t,this.refs=ro,this.updater=n||to}pn.prototype.isReactComponent={};pn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};pn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function io(){}io.prototype=pn.prototype;function Ql(e,t,n){this.props=e,this.context=t,this.refs=ro,this.updater=n||to}var ql=Ql.prototype=new io;ql.constructor=Ql;no(ql,pn.prototype);ql.isPureReactComponent=!0;var Hs=Array.isArray,lo=Object.prototype.hasOwnProperty,Kl={current:null},so={key:!0,ref:!0,__self:!0,__source:!0};function ao(e,t,n){var i,l={},s=null,a=null;if(t!=null)for(i in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)lo.call(t,i)&&!so.hasOwnProperty(i)&&(l[i]=t[i]);var o=arguments.length-2;if(o===1)l.children=n;else if(1<o){for(var u=Array(o),c=0;c<o;c++)u[c]=arguments[c+2];l.children=u}if(e&&e.defaultProps)for(i in o=e.defaultProps,o)l[i]===void 0&&(l[i]=o[i]);return{$$typeof:er,type:e,key:s,ref:a,props:l,_owner:Kl.current}}function Td(e,t){return{$$typeof:er,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Yl(e){return typeof e=="object"&&e!==null&&e.$$typeof===er}function Cd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Vs=/\/+/g;function Ci(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Cd(""+e.key):t.toString(36)}function Tr(e,t,n,i,l){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case er:case md:a=!0}}if(a)return a=e,l=l(a),e=i===""?"."+Ci(a,0):i,Hs(l)?(n="",e!=null&&(n=e.replace(Vs,"$&/")+"/"),Tr(l,t,n,"",function(c){return c})):l!=null&&(Yl(l)&&(l=Td(l,n+(!l.key||a&&a.key===l.key?"":(""+l.key).replace(Vs,"$&/")+"/")+e)),t.push(l)),1;if(a=0,i=i===""?".":i+":",Hs(e))for(var o=0;o<e.length;o++){s=e[o];var u=i+Ci(s,o);a+=Tr(s,t,n,u,l)}else if(u=_d(e),typeof u=="function")for(e=u.call(e),o=0;!(s=e.next()).done;)s=s.value,u=i+Ci(s,o++),a+=Tr(s,t,n,u,l);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function or(e,t,n){if(e==null)return e;var i=[],l=0;return Tr(e,i,"","",function(s){return t.call(n,s,l++)}),i}function Ed(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},Cr={transition:null},kd={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:Cr,ReactCurrentOwner:Kl};function oo(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:or,forEach:function(e,t,n){or(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return or(e,function(){t++}),t},toArray:function(e){return or(e,function(t){return t})||[]},only:function(e){if(!Yl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};D.Component=pn;D.Fragment=fd;D.Profiler=gd;D.PureComponent=Ql;D.StrictMode=vd;D.Suspense=jd;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kd;D.act=oo;D.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=no({},e.props),l=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=Kl.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(u in t)lo.call(t,u)&&!so.hasOwnProperty(u)&&(i[u]=t[u]===void 0&&o!==void 0?o[u]:t[u])}var u=arguments.length-2;if(u===1)i.children=n;else if(1<u){o=Array(u);for(var c=0;c<u;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:er,type:e.type,key:l,ref:s,props:i,_owner:a}};D.createContext=function(e){return e={$$typeof:yd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:xd,_context:e},e.Consumer=e};D.createElement=ao;D.createFactory=function(e){var t=ao.bind(null,e);return t.type=e,t};D.createRef=function(){return{current:null}};D.forwardRef=function(e){return{$$typeof:Sd,render:e}};D.isValidElement=Yl;D.lazy=function(e){return{$$typeof:wd,_payload:{_status:-1,_result:e},_init:Ed}};D.memo=function(e,t){return{$$typeof:Nd,type:e,compare:t===void 0?null:t}};D.startTransition=function(e){var t=Cr.transition;Cr.transition={};try{e()}finally{Cr.transition=t}};D.unstable_act=oo;D.useCallback=function(e,t){return ce.current.useCallback(e,t)};D.useContext=function(e){return ce.current.useContext(e)};D.useDebugValue=function(){};D.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};D.useEffect=function(e,t){return ce.current.useEffect(e,t)};D.useId=function(){return ce.current.useId()};D.useImperativeHandle=function(e,t,n){return ce.current.useImperativeHandle(e,t,n)};D.useInsertionEffect=function(e,t){return ce.current.useInsertionEffect(e,t)};D.useLayoutEffect=function(e,t){return ce.current.useLayoutEffect(e,t)};D.useMemo=function(e,t){return ce.current.useMemo(e,t)};D.useReducer=function(e,t,n){return ce.current.useReducer(e,t,n)};D.useRef=function(e){return ce.current.useRef(e)};D.useState=function(e){return ce.current.useState(e)};D.useSyncExternalStore=function(e,t,n){return ce.current.useSyncExternalStore(e,t,n)};D.useTransition=function(){return ce.current.useTransition()};D.version="18.3.1";eo.exports=D;var qe=eo.exports;const Id=hd(qe);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ad=qe,Rd=Symbol.for("react.element"),Dd=Symbol.for("react.fragment"),Md=Object.prototype.hasOwnProperty,$d=Ad.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ld={key:!0,ref:!0,__self:!0,__source:!0};function uo(e,t,n){var i,l={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(i in t)Md.call(t,i)&&!Ld.hasOwnProperty(i)&&(l[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps,t)l[i]===void 0&&(l[i]=t[i]);return{$$typeof:Rd,type:e,key:s,ref:a,props:l,_owner:$d.current}}ai.Fragment=Dd;ai.jsx=uo;ai.jsxs=uo;Ja.exports=ai;var r=Ja.exports,Zi={},co={exports:{}},Ne={},po={exports:{}},ho={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(_,I){var A=_.length;_.push(I);e:for(;0<A;){var V=A-1>>>1,Z=_[V];if(0<l(Z,I))_[V]=I,_[A]=Z,A=V;else break e}}function n(_){return _.length===0?null:_[0]}function i(_){if(_.length===0)return null;var I=_[0],A=_.pop();if(A!==I){_[0]=A;e:for(var V=0,Z=_.length,sr=Z>>>1;V<sr;){var wt=2*(V+1)-1,Ti=_[wt],_t=wt+1,ar=_[_t];if(0>l(Ti,A))_t<Z&&0>l(ar,Ti)?(_[V]=ar,_[_t]=A,V=_t):(_[V]=Ti,_[wt]=A,V=wt);else if(_t<Z&&0>l(ar,A))_[V]=ar,_[_t]=A,V=_t;else break e}}return I}function l(_,I){var A=_.sortIndex-I.sortIndex;return A!==0?A:_.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var u=[],c=[],v=1,x=null,g=3,y=!1,d=!1,f=!1,k=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(_){for(var I=n(c);I!==null;){if(I.callback===null)i(c);else if(I.startTime<=_)i(c),I.sortIndex=I.expirationTime,t(u,I);else break;I=n(c)}}function S(_){if(f=!1,m(_),!d)if(n(u)!==null)d=!0,wi(N);else{var I=n(c);I!==null&&_i(S,I.startTime-_)}}function N(_,I){d=!1,f&&(f=!1,h(E),E=-1),y=!0;var A=g;try{for(m(I),x=n(u);x!==null&&(!(x.expirationTime>I)||_&&!M());){var V=x.callback;if(typeof V=="function"){x.callback=null,g=x.priorityLevel;var Z=V(x.expirationTime<=I);I=e.unstable_now(),typeof Z=="function"?x.callback=Z:x===n(u)&&i(u),m(I)}else i(u);x=n(u)}if(x!==null)var sr=!0;else{var wt=n(c);wt!==null&&_i(S,wt.startTime-I),sr=!1}return sr}finally{x=null,g=A,y=!1}}var C=!1,T=null,E=-1,z=5,R=-1;function M(){return!(e.unstable_now()-R<z)}function ze(){if(T!==null){var _=e.unstable_now();R=_;var I=!0;try{I=T(!0,_)}finally{I?X():(C=!1,T=null)}}else C=!1}var X;if(typeof p=="function")X=function(){p(ze)};else if(typeof MessageChannel<"u"){var lr=new MessageChannel,pd=lr.port2;lr.port1.onmessage=ze,X=function(){pd.postMessage(null)}}else X=function(){k(ze,0)};function wi(_){T=_,C||(C=!0,X())}function _i(_,I){E=k(function(){_(e.unstable_now())},I)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(_){_.callback=null},e.unstable_continueExecution=function(){d||y||(d=!0,wi(N))},e.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<_?Math.floor(1e3/_):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(_){switch(g){case 1:case 2:case 3:var I=3;break;default:I=g}var A=g;g=I;try{return _()}finally{g=A}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(_,I){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var A=g;g=_;try{return I()}finally{g=A}},e.unstable_scheduleCallback=function(_,I,A){var V=e.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?V+A:V):A=V,_){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=A+Z,_={id:v++,callback:I,priorityLevel:_,startTime:A,expirationTime:Z,sortIndex:-1},A>V?(_.sortIndex=A,t(c,_),n(u)===null&&_===n(c)&&(f?(h(E),E=-1):f=!0,_i(S,A-V))):(_.sortIndex=Z,t(u,_),d||y||(d=!0,wi(N))),_},e.unstable_shouldYield=M,e.unstable_wrapCallback=function(_){var I=g;return function(){var A=g;g=I;try{return _.apply(this,arguments)}finally{g=A}}}})(ho);po.exports=ho;var Od=po.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zd=qe,je=Od;function j(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var mo=new Set,zn={};function zt(e,t){ln(e,t),ln(e+"Capture",t)}function ln(e,t){for(zn[e]=t,e=0;e<t.length;e++)mo.add(t[e])}var Ze=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ji=Object.prototype.hasOwnProperty,Pd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Gs={},Qs={};function Bd(e){return Ji.call(Qs,e)?!0:Ji.call(Gs,e)?!1:Pd.test(e)?Qs[e]=!0:(Gs[e]=!0,!1)}function bd(e,t,n,i){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Fd(e,t,n,i){if(t===null||typeof t>"u"||bd(e,t,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function pe(e,t,n,i,l,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=i,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var ie={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ie[e]=new pe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ie[t]=new pe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ie[e]=new pe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ie[e]=new pe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ie[e]=new pe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ie[e]=new pe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ie[e]=new pe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ie[e]=new pe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ie[e]=new pe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Xl=/[\-:]([a-z])/g;function Zl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Xl,Zl);ie[t]=new pe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Xl,Zl);ie[t]=new pe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Xl,Zl);ie[t]=new pe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ie[e]=new pe(e,1,!1,e.toLowerCase(),null,!1,!1)});ie.xlinkHref=new pe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ie[e]=new pe(e,1,!1,e.toLowerCase(),null,!0,!0)});function Jl(e,t,n,i){var l=ie.hasOwnProperty(t)?ie[t]:null;(l!==null?l.type!==0:i||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Fd(t,n,l,i)&&(n=null),i||l===null?Bd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,i=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,i?e.setAttributeNS(i,t,n):e.setAttribute(t,n))))}var nt=zd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ur=Symbol.for("react.element"),bt=Symbol.for("react.portal"),Ft=Symbol.for("react.fragment"),es=Symbol.for("react.strict_mode"),el=Symbol.for("react.profiler"),fo=Symbol.for("react.provider"),vo=Symbol.for("react.context"),ts=Symbol.for("react.forward_ref"),tl=Symbol.for("react.suspense"),nl=Symbol.for("react.suspense_list"),ns=Symbol.for("react.memo"),it=Symbol.for("react.lazy"),go=Symbol.for("react.offscreen"),qs=Symbol.iterator;function fn(e){return e===null||typeof e!="object"?null:(e=qs&&e[qs]||e["@@iterator"],typeof e=="function"?e:null)}var W=Object.assign,Ei;function wn(e){if(Ei===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ei=t&&t[1]||""}return`
`+Ei+e}var ki=!1;function Ii(e,t){if(!e||ki)return"";ki=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var i=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){i=c}e.call(t.prototype)}else{try{throw Error()}catch(c){i=c}e()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),s=i.stack.split(`
`),a=l.length-1,o=s.length-1;1<=a&&0<=o&&l[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(l[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||l[a]!==s[o]){var u=`
`+l[a].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=a&&0<=o);break}}}finally{ki=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?wn(e):""}function Ud(e){switch(e.tag){case 5:return wn(e.type);case 16:return wn("Lazy");case 13:return wn("Suspense");case 19:return wn("SuspenseList");case 0:case 2:case 15:return e=Ii(e.type,!1),e;case 11:return e=Ii(e.type.render,!1),e;case 1:return e=Ii(e.type,!0),e;default:return""}}function rl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ft:return"Fragment";case bt:return"Portal";case el:return"Profiler";case es:return"StrictMode";case tl:return"Suspense";case nl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case vo:return(e.displayName||"Context")+".Consumer";case fo:return(e._context.displayName||"Context")+".Provider";case ts:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ns:return t=e.displayName||null,t!==null?t:rl(e.type)||"Memo";case it:t=e._payload,e=e._init;try{return rl(e(t))}catch{}}return null}function Wd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return rl(t);case 8:return t===es?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function xt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function xo(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Hd(e){var t=xo(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function dr(e){e._valueTracker||(e._valueTracker=Hd(e))}function yo(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=xo(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function zr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function il(e,t){var n=t.checked;return W({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ks(e,t){var n=t.defaultValue==null?"":t.defaultValue,i=t.checked!=null?t.checked:t.defaultChecked;n=xt(t.value!=null?t.value:n),e._wrapperState={initialChecked:i,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function So(e,t){t=t.checked,t!=null&&Jl(e,"checked",t,!1)}function ll(e,t){So(e,t);var n=xt(t.value),i=t.type;if(n!=null)i==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?sl(e,t.type,n):t.hasOwnProperty("defaultValue")&&sl(e,t.type,xt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ys(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type;if(!(i!=="submit"&&i!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function sl(e,t,n){(t!=="number"||zr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var _n=Array.isArray;function Zt(e,t,n,i){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&i&&(e[n].defaultSelected=!0)}else{for(n=""+xt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,i&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function al(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(j(91));return W({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Xs(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(j(92));if(_n(n)){if(1<n.length)throw Error(j(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:xt(n)}}function jo(e,t){var n=xt(t.value),i=xt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),i!=null&&(e.defaultValue=""+i)}function Zs(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function No(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ol(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?No(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var cr,wo=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,i,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,i,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Pn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var En={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vd=["Webkit","ms","Moz","O"];Object.keys(En).forEach(function(e){Vd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),En[t]=En[e]})});function _o(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||En.hasOwnProperty(e)&&En[e]?(""+t).trim():t+"px"}function To(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var i=n.indexOf("--")===0,l=_o(n,t[n],i);n==="float"&&(n="cssFloat"),i?e.setProperty(n,l):e[n]=l}}var Gd=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ul(e,t){if(t){if(Gd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(j(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(j(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(j(61))}if(t.style!=null&&typeof t.style!="object")throw Error(j(62))}}function dl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cl=null;function rs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pl=null,Jt=null,en=null;function Js(e){if(e=rr(e)){if(typeof pl!="function")throw Error(j(280));var t=e.stateNode;t&&(t=pi(t),pl(e.stateNode,e.type,t))}}function Co(e){Jt?en?en.push(e):en=[e]:Jt=e}function Eo(){if(Jt){var e=Jt,t=en;if(en=Jt=null,Js(e),t)for(e=0;e<t.length;e++)Js(t[e])}}function ko(e,t){return e(t)}function Io(){}var Ai=!1;function Ao(e,t,n){if(Ai)return e(t,n);Ai=!0;try{return ko(e,t,n)}finally{Ai=!1,(Jt!==null||en!==null)&&(Io(),Eo())}}function Bn(e,t){var n=e.stateNode;if(n===null)return null;var i=pi(n);if(i===null)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(j(231,t,typeof n));return n}var hl=!1;if(Ze)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){hl=!0}}),window.addEventListener("test",vn,vn),window.removeEventListener("test",vn,vn)}catch{hl=!1}function Qd(e,t,n,i,l,s,a,o,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(v){this.onError(v)}}var kn=!1,Pr=null,Br=!1,ml=null,qd={onError:function(e){kn=!0,Pr=e}};function Kd(e,t,n,i,l,s,a,o,u){kn=!1,Pr=null,Qd.apply(qd,arguments)}function Yd(e,t,n,i,l,s,a,o,u){if(Kd.apply(this,arguments),kn){if(kn){var c=Pr;kn=!1,Pr=null}else throw Error(j(198));Br||(Br=!0,ml=c)}}function Pt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ro(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ea(e){if(Pt(e)!==e)throw Error(j(188))}function Xd(e){var t=e.alternate;if(!t){if(t=Pt(e),t===null)throw Error(j(188));return t!==e?null:e}for(var n=e,i=t;;){var l=n.return;if(l===null)break;var s=l.alternate;if(s===null){if(i=l.return,i!==null){n=i;continue}break}if(l.child===s.child){for(s=l.child;s;){if(s===n)return ea(l),e;if(s===i)return ea(l),t;s=s.sibling}throw Error(j(188))}if(n.return!==i.return)n=l,i=s;else{for(var a=!1,o=l.child;o;){if(o===n){a=!0,n=l,i=s;break}if(o===i){a=!0,i=l,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=l;break}if(o===i){a=!0,i=s,n=l;break}o=o.sibling}if(!a)throw Error(j(189))}}if(n.alternate!==i)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?e:t}function Do(e){return e=Xd(e),e!==null?Mo(e):null}function Mo(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Mo(e);if(t!==null)return t;e=e.sibling}return null}var $o=je.unstable_scheduleCallback,ta=je.unstable_cancelCallback,Zd=je.unstable_shouldYield,Jd=je.unstable_requestPaint,G=je.unstable_now,ec=je.unstable_getCurrentPriorityLevel,is=je.unstable_ImmediatePriority,Lo=je.unstable_UserBlockingPriority,br=je.unstable_NormalPriority,tc=je.unstable_LowPriority,Oo=je.unstable_IdlePriority,oi=null,We=null;function nc(e){if(We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(oi,e,void 0,(e.current.flags&128)===128)}catch{}}var $e=Math.clz32?Math.clz32:lc,rc=Math.log,ic=Math.LN2;function lc(e){return e>>>=0,e===0?32:31-(rc(e)/ic|0)|0}var pr=64,hr=4194304;function Tn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Fr(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,l=e.suspendedLanes,s=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~l;o!==0?i=Tn(o):(s&=a,s!==0&&(i=Tn(s)))}else a=n&~l,a!==0?i=Tn(a):s!==0&&(i=Tn(s));if(i===0)return 0;if(t!==0&&t!==i&&!(t&l)&&(l=i&-i,s=t&-t,l>=s||l===16&&(s&4194240)!==0))return t;if(i&4&&(i|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=i;0<t;)n=31-$e(t),l=1<<n,i|=e[n],t&=~l;return i}function sc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ac(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,l=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-$e(s),o=1<<a,u=l[a];u===-1?(!(o&n)||o&i)&&(l[a]=sc(o,t)):u<=t&&(e.expiredLanes|=o),s&=~o}}function fl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function zo(){var e=pr;return pr<<=1,!(pr&4194240)&&(pr=64),e}function Ri(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-$e(t),e[t]=n}function oc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-$e(n),s=1<<l;t[l]=0,i[l]=-1,e[l]=-1,n&=~s}}function ls(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-$e(n),l=1<<i;l&t|e[i]&t&&(e[i]|=t),n&=~l}}var L=0;function Po(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Bo,ss,bo,Fo,Uo,vl=!1,mr=[],dt=null,ct=null,pt=null,bn=new Map,Fn=new Map,st=[],uc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function na(e,t){switch(e){case"focusin":case"focusout":dt=null;break;case"dragenter":case"dragleave":ct=null;break;case"mouseover":case"mouseout":pt=null;break;case"pointerover":case"pointerout":bn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fn.delete(t.pointerId)}}function gn(e,t,n,i,l,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[l]},t!==null&&(t=rr(t),t!==null&&ss(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function dc(e,t,n,i,l){switch(t){case"focusin":return dt=gn(dt,e,t,n,i,l),!0;case"dragenter":return ct=gn(ct,e,t,n,i,l),!0;case"mouseover":return pt=gn(pt,e,t,n,i,l),!0;case"pointerover":var s=l.pointerId;return bn.set(s,gn(bn.get(s)||null,e,t,n,i,l)),!0;case"gotpointercapture":return s=l.pointerId,Fn.set(s,gn(Fn.get(s)||null,e,t,n,i,l)),!0}return!1}function Wo(e){var t=Et(e.target);if(t!==null){var n=Pt(t);if(n!==null){if(t=n.tag,t===13){if(t=Ro(n),t!==null){e.blockedOn=t,Uo(e.priority,function(){bo(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Er(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=gl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);cl=i,n.target.dispatchEvent(i),cl=null}else return t=rr(n),t!==null&&ss(t),e.blockedOn=n,!1;t.shift()}return!0}function ra(e,t,n){Er(e)&&n.delete(t)}function cc(){vl=!1,dt!==null&&Er(dt)&&(dt=null),ct!==null&&Er(ct)&&(ct=null),pt!==null&&Er(pt)&&(pt=null),bn.forEach(ra),Fn.forEach(ra)}function xn(e,t){e.blockedOn===t&&(e.blockedOn=null,vl||(vl=!0,je.unstable_scheduleCallback(je.unstable_NormalPriority,cc)))}function Un(e){function t(l){return xn(l,e)}if(0<mr.length){xn(mr[0],e);for(var n=1;n<mr.length;n++){var i=mr[n];i.blockedOn===e&&(i.blockedOn=null)}}for(dt!==null&&xn(dt,e),ct!==null&&xn(ct,e),pt!==null&&xn(pt,e),bn.forEach(t),Fn.forEach(t),n=0;n<st.length;n++)i=st[n],i.blockedOn===e&&(i.blockedOn=null);for(;0<st.length&&(n=st[0],n.blockedOn===null);)Wo(n),n.blockedOn===null&&st.shift()}var tn=nt.ReactCurrentBatchConfig,Ur=!0;function pc(e,t,n,i){var l=L,s=tn.transition;tn.transition=null;try{L=1,as(e,t,n,i)}finally{L=l,tn.transition=s}}function hc(e,t,n,i){var l=L,s=tn.transition;tn.transition=null;try{L=4,as(e,t,n,i)}finally{L=l,tn.transition=s}}function as(e,t,n,i){if(Ur){var l=gl(e,t,n,i);if(l===null)Fi(e,t,i,Wr,n),na(e,i);else if(dc(l,e,t,n,i))i.stopPropagation();else if(na(e,i),t&4&&-1<uc.indexOf(e)){for(;l!==null;){var s=rr(l);if(s!==null&&Bo(s),s=gl(e,t,n,i),s===null&&Fi(e,t,i,Wr,n),s===l)break;l=s}l!==null&&i.stopPropagation()}else Fi(e,t,i,null,n)}}var Wr=null;function gl(e,t,n,i){if(Wr=null,e=rs(i),e=Et(e),e!==null)if(t=Pt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ro(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Wr=e,null}function Ho(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ec()){case is:return 1;case Lo:return 4;case br:case tc:return 16;case Oo:return 536870912;default:return 16}default:return 16}}var ot=null,os=null,kr=null;function Vo(){if(kr)return kr;var e,t=os,n=t.length,i,l="value"in ot?ot.value:ot.textContent,s=l.length;for(e=0;e<n&&t[e]===l[e];e++);var a=n-e;for(i=1;i<=a&&t[n-i]===l[s-i];i++);return kr=l.slice(e,1<i?1-i:void 0)}function Ir(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fr(){return!0}function ia(){return!1}function we(e){function t(n,i,l,s,a){this._reactName=n,this._targetInst=l,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?fr:ia,this.isPropagationStopped=ia,this}return W(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fr)},persist:function(){},isPersistent:fr}),t}var hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},us=we(hn),nr=W({},hn,{view:0,detail:0}),mc=we(nr),Di,Mi,yn,ui=W({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ds,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==yn&&(yn&&e.type==="mousemove"?(Di=e.screenX-yn.screenX,Mi=e.screenY-yn.screenY):Mi=Di=0,yn=e),Di)},movementY:function(e){return"movementY"in e?e.movementY:Mi}}),la=we(ui),fc=W({},ui,{dataTransfer:0}),vc=we(fc),gc=W({},nr,{relatedTarget:0}),$i=we(gc),xc=W({},hn,{animationName:0,elapsedTime:0,pseudoElement:0}),yc=we(xc),Sc=W({},hn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jc=we(Sc),Nc=W({},hn,{data:0}),sa=we(Nc),wc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_c={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Tc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cc(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Tc[e])?!!t[e]:!1}function ds(){return Cc}var Ec=W({},nr,{key:function(e){if(e.key){var t=wc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ir(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_c[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ds,charCode:function(e){return e.type==="keypress"?Ir(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ir(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),kc=we(Ec),Ic=W({},ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),aa=we(Ic),Ac=W({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ds}),Rc=we(Ac),Dc=W({},hn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Mc=we(Dc),$c=W({},ui,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lc=we($c),Oc=[9,13,27,32],cs=Ze&&"CompositionEvent"in window,In=null;Ze&&"documentMode"in document&&(In=document.documentMode);var zc=Ze&&"TextEvent"in window&&!In,Go=Ze&&(!cs||In&&8<In&&11>=In),oa=" ",ua=!1;function Qo(e,t){switch(e){case"keyup":return Oc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qo(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ut=!1;function Pc(e,t){switch(e){case"compositionend":return qo(t);case"keypress":return t.which!==32?null:(ua=!0,oa);case"textInput":return e=t.data,e===oa&&ua?null:e;default:return null}}function Bc(e,t){if(Ut)return e==="compositionend"||!cs&&Qo(e,t)?(e=Vo(),kr=os=ot=null,Ut=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Go&&t.locale!=="ko"?null:t.data;default:return null}}var bc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function da(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!bc[e.type]:t==="textarea"}function Ko(e,t,n,i){Co(i),t=Hr(t,"onChange"),0<t.length&&(n=new us("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var An=null,Wn=null;function Fc(e){su(e,0)}function di(e){var t=Vt(e);if(yo(t))return e}function Uc(e,t){if(e==="change")return t}var Yo=!1;if(Ze){var Li;if(Ze){var Oi="oninput"in document;if(!Oi){var ca=document.createElement("div");ca.setAttribute("oninput","return;"),Oi=typeof ca.oninput=="function"}Li=Oi}else Li=!1;Yo=Li&&(!document.documentMode||9<document.documentMode)}function pa(){An&&(An.detachEvent("onpropertychange",Xo),Wn=An=null)}function Xo(e){if(e.propertyName==="value"&&di(Wn)){var t=[];Ko(t,Wn,e,rs(e)),Ao(Fc,t)}}function Wc(e,t,n){e==="focusin"?(pa(),An=t,Wn=n,An.attachEvent("onpropertychange",Xo)):e==="focusout"&&pa()}function Hc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return di(Wn)}function Vc(e,t){if(e==="click")return di(t)}function Gc(e,t){if(e==="input"||e==="change")return di(t)}function Qc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Oe=typeof Object.is=="function"?Object.is:Qc;function Hn(e,t){if(Oe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var l=n[i];if(!Ji.call(t,l)||!Oe(e[l],t[l]))return!1}return!0}function ha(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ma(e,t){var n=ha(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ha(n)}}function Zo(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Zo(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Jo(){for(var e=window,t=zr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=zr(e.document)}return t}function ps(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function qc(e){var t=Jo(),n=e.focusedElem,i=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Zo(n.ownerDocument.documentElement,n)){if(i!==null&&ps(n)){if(t=i.start,e=i.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,s=Math.min(i.start,l);i=i.end===void 0?s:Math.min(i.end,l),!e.extend&&s>i&&(l=i,i=s,s=l),l=ma(n,s);var a=ma(n,i);l&&a&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),s>i?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Kc=Ze&&"documentMode"in document&&11>=document.documentMode,Wt=null,xl=null,Rn=null,yl=!1;function fa(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;yl||Wt==null||Wt!==zr(i)||(i=Wt,"selectionStart"in i&&ps(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Rn&&Hn(Rn,i)||(Rn=i,i=Hr(xl,"onSelect"),0<i.length&&(t=new us("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Wt)))}function vr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ht={animationend:vr("Animation","AnimationEnd"),animationiteration:vr("Animation","AnimationIteration"),animationstart:vr("Animation","AnimationStart"),transitionend:vr("Transition","TransitionEnd")},zi={},eu={};Ze&&(eu=document.createElement("div").style,"AnimationEvent"in window||(delete Ht.animationend.animation,delete Ht.animationiteration.animation,delete Ht.animationstart.animation),"TransitionEvent"in window||delete Ht.transitionend.transition);function ci(e){if(zi[e])return zi[e];if(!Ht[e])return e;var t=Ht[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in eu)return zi[e]=t[n];return e}var tu=ci("animationend"),nu=ci("animationiteration"),ru=ci("animationstart"),iu=ci("transitionend"),lu=new Map,va="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function St(e,t){lu.set(e,t),zt(t,[e])}for(var Pi=0;Pi<va.length;Pi++){var Bi=va[Pi],Yc=Bi.toLowerCase(),Xc=Bi[0].toUpperCase()+Bi.slice(1);St(Yc,"on"+Xc)}St(tu,"onAnimationEnd");St(nu,"onAnimationIteration");St(ru,"onAnimationStart");St("dblclick","onDoubleClick");St("focusin","onFocus");St("focusout","onBlur");St(iu,"onTransitionEnd");ln("onMouseEnter",["mouseout","mouseover"]);ln("onMouseLeave",["mouseout","mouseover"]);ln("onPointerEnter",["pointerout","pointerover"]);ln("onPointerLeave",["pointerout","pointerover"]);zt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));zt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));zt("onBeforeInput",["compositionend","keypress","textInput","paste"]);zt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));zt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));zt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zc=new Set("cancel close invalid load scroll toggle".split(" ").concat(Cn));function ga(e,t,n){var i=e.type||"unknown-event";e.currentTarget=n,Yd(i,t,void 0,e),e.currentTarget=null}function su(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],l=i.event;i=i.listeners;e:{var s=void 0;if(t)for(var a=i.length-1;0<=a;a--){var o=i[a],u=o.instance,c=o.currentTarget;if(o=o.listener,u!==s&&l.isPropagationStopped())break e;ga(l,o,c),s=u}else for(a=0;a<i.length;a++){if(o=i[a],u=o.instance,c=o.currentTarget,o=o.listener,u!==s&&l.isPropagationStopped())break e;ga(l,o,c),s=u}}}if(Br)throw e=ml,Br=!1,ml=null,e}function P(e,t){var n=t[_l];n===void 0&&(n=t[_l]=new Set);var i=e+"__bubble";n.has(i)||(au(t,e,2,!1),n.add(i))}function bi(e,t,n){var i=0;t&&(i|=4),au(n,e,i,t)}var gr="_reactListening"+Math.random().toString(36).slice(2);function Vn(e){if(!e[gr]){e[gr]=!0,mo.forEach(function(n){n!=="selectionchange"&&(Zc.has(n)||bi(n,!1,e),bi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[gr]||(t[gr]=!0,bi("selectionchange",!1,t))}}function au(e,t,n,i){switch(Ho(t)){case 1:var l=pc;break;case 4:l=hc;break;default:l=as}n=l.bind(null,t,n,e),l=void 0,!hl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),i?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Fi(e,t,n,i,l){var s=i;if(!(t&1)&&!(t&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===l||o.nodeType===8&&o.parentNode===l)break;if(a===4)for(a=i.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;a=a.return}for(;o!==null;){if(a=Et(o),a===null)return;if(u=a.tag,u===5||u===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Ao(function(){var c=s,v=rs(n),x=[];e:{var g=lu.get(e);if(g!==void 0){var y=us,d=e;switch(e){case"keypress":if(Ir(n)===0)break e;case"keydown":case"keyup":y=kc;break;case"focusin":d="focus",y=$i;break;case"focusout":d="blur",y=$i;break;case"beforeblur":case"afterblur":y=$i;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=la;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=vc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Rc;break;case tu:case nu:case ru:y=yc;break;case iu:y=Mc;break;case"scroll":y=mc;break;case"wheel":y=Lc;break;case"copy":case"cut":case"paste":y=jc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=aa}var f=(t&4)!==0,k=!f&&e==="scroll",h=f?g!==null?g+"Capture":null:g;f=[];for(var p=c,m;p!==null;){m=p;var S=m.stateNode;if(m.tag===5&&S!==null&&(m=S,h!==null&&(S=Bn(p,h),S!=null&&f.push(Gn(p,S,m)))),k)break;p=p.return}0<f.length&&(g=new y(g,d,null,n,v),x.push({event:g,listeners:f}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",g&&n!==cl&&(d=n.relatedTarget||n.fromElement)&&(Et(d)||d[Je]))break e;if((y||g)&&(g=v.window===v?v:(g=v.ownerDocument)?g.defaultView||g.parentWindow:window,y?(d=n.relatedTarget||n.toElement,y=c,d=d?Et(d):null,d!==null&&(k=Pt(d),d!==k||d.tag!==5&&d.tag!==6)&&(d=null)):(y=null,d=c),y!==d)){if(f=la,S="onMouseLeave",h="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(f=aa,S="onPointerLeave",h="onPointerEnter",p="pointer"),k=y==null?g:Vt(y),m=d==null?g:Vt(d),g=new f(S,p+"leave",y,n,v),g.target=k,g.relatedTarget=m,S=null,Et(v)===c&&(f=new f(h,p+"enter",d,n,v),f.target=m,f.relatedTarget=k,S=f),k=S,y&&d)t:{for(f=y,h=d,p=0,m=f;m;m=Bt(m))p++;for(m=0,S=h;S;S=Bt(S))m++;for(;0<p-m;)f=Bt(f),p--;for(;0<m-p;)h=Bt(h),m--;for(;p--;){if(f===h||h!==null&&f===h.alternate)break t;f=Bt(f),h=Bt(h)}f=null}else f=null;y!==null&&xa(x,g,y,f,!1),d!==null&&k!==null&&xa(x,k,d,f,!0)}}e:{if(g=c?Vt(c):window,y=g.nodeName&&g.nodeName.toLowerCase(),y==="select"||y==="input"&&g.type==="file")var N=Uc;else if(da(g))if(Yo)N=Gc;else{N=Hc;var C=Wc}else(y=g.nodeName)&&y.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(N=Vc);if(N&&(N=N(e,c))){Ko(x,N,n,v);break e}C&&C(e,g,c),e==="focusout"&&(C=g._wrapperState)&&C.controlled&&g.type==="number"&&sl(g,"number",g.value)}switch(C=c?Vt(c):window,e){case"focusin":(da(C)||C.contentEditable==="true")&&(Wt=C,xl=c,Rn=null);break;case"focusout":Rn=xl=Wt=null;break;case"mousedown":yl=!0;break;case"contextmenu":case"mouseup":case"dragend":yl=!1,fa(x,n,v);break;case"selectionchange":if(Kc)break;case"keydown":case"keyup":fa(x,n,v)}var T;if(cs)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else Ut?Qo(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(Go&&n.locale!=="ko"&&(Ut||E!=="onCompositionStart"?E==="onCompositionEnd"&&Ut&&(T=Vo()):(ot=v,os="value"in ot?ot.value:ot.textContent,Ut=!0)),C=Hr(c,E),0<C.length&&(E=new sa(E,e,null,n,v),x.push({event:E,listeners:C}),T?E.data=T:(T=qo(n),T!==null&&(E.data=T)))),(T=zc?Pc(e,n):Bc(e,n))&&(c=Hr(c,"onBeforeInput"),0<c.length&&(v=new sa("onBeforeInput","beforeinput",null,n,v),x.push({event:v,listeners:c}),v.data=T))}su(x,t)})}function Gn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Hr(e,t){for(var n=t+"Capture",i=[];e!==null;){var l=e,s=l.stateNode;l.tag===5&&s!==null&&(l=s,s=Bn(e,n),s!=null&&i.unshift(Gn(e,s,l)),s=Bn(e,t),s!=null&&i.push(Gn(e,s,l))),e=e.return}return i}function Bt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function xa(e,t,n,i,l){for(var s=t._reactName,a=[];n!==null&&n!==i;){var o=n,u=o.alternate,c=o.stateNode;if(u!==null&&u===i)break;o.tag===5&&c!==null&&(o=c,l?(u=Bn(n,s),u!=null&&a.unshift(Gn(n,u,o))):l||(u=Bn(n,s),u!=null&&a.push(Gn(n,u,o)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Jc=/\r\n?/g,ep=/\u0000|\uFFFD/g;function ya(e){return(typeof e=="string"?e:""+e).replace(Jc,`
`).replace(ep,"")}function xr(e,t,n){if(t=ya(t),ya(e)!==t&&n)throw Error(j(425))}function Vr(){}var Sl=null,jl=null;function Nl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var wl=typeof setTimeout=="function"?setTimeout:void 0,tp=typeof clearTimeout=="function"?clearTimeout:void 0,Sa=typeof Promise=="function"?Promise:void 0,np=typeof queueMicrotask=="function"?queueMicrotask:typeof Sa<"u"?function(e){return Sa.resolve(null).then(e).catch(rp)}:wl;function rp(e){setTimeout(function(){throw e})}function Ui(e,t){var n=t,i=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(i===0){e.removeChild(l),Un(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=l}while(n);Un(t)}function ht(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ja(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var mn=Math.random().toString(36).slice(2),Fe="__reactFiber$"+mn,Qn="__reactProps$"+mn,Je="__reactContainer$"+mn,_l="__reactEvents$"+mn,ip="__reactListeners$"+mn,lp="__reactHandles$"+mn;function Et(e){var t=e[Fe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Je]||n[Fe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ja(e);e!==null;){if(n=e[Fe])return n;e=ja(e)}return t}e=n,n=e.parentNode}return null}function rr(e){return e=e[Fe]||e[Je],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Vt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(j(33))}function pi(e){return e[Qn]||null}var Tl=[],Gt=-1;function jt(e){return{current:e}}function B(e){0>Gt||(e.current=Tl[Gt],Tl[Gt]=null,Gt--)}function O(e,t){Gt++,Tl[Gt]=e.current,e.current=t}var yt={},oe=jt(yt),fe=jt(!1),Dt=yt;function sn(e,t){var n=e.type.contextTypes;if(!n)return yt;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var l={},s;for(s in n)l[s]=t[s];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function ve(e){return e=e.childContextTypes,e!=null}function Gr(){B(fe),B(oe)}function Na(e,t,n){if(oe.current!==yt)throw Error(j(168));O(oe,t),O(fe,n)}function ou(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var l in i)if(!(l in t))throw Error(j(108,Wd(e)||"Unknown",l));return W({},n,i)}function Qr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||yt,Dt=oe.current,O(oe,e),O(fe,fe.current),!0}function wa(e,t,n){var i=e.stateNode;if(!i)throw Error(j(169));n?(e=ou(e,t,Dt),i.__reactInternalMemoizedMergedChildContext=e,B(fe),B(oe),O(oe,e)):B(fe),O(fe,n)}var Qe=null,hi=!1,Wi=!1;function uu(e){Qe===null?Qe=[e]:Qe.push(e)}function sp(e){hi=!0,uu(e)}function Nt(){if(!Wi&&Qe!==null){Wi=!0;var e=0,t=L;try{var n=Qe;for(L=1;e<n.length;e++){var i=n[e];do i=i(!0);while(i!==null)}Qe=null,hi=!1}catch(l){throw Qe!==null&&(Qe=Qe.slice(e+1)),$o(is,Nt),l}finally{L=t,Wi=!1}}return null}var Qt=[],qt=0,qr=null,Kr=0,_e=[],Te=0,Mt=null,Ke=1,Ye="";function Tt(e,t){Qt[qt++]=Kr,Qt[qt++]=qr,qr=e,Kr=t}function du(e,t,n){_e[Te++]=Ke,_e[Te++]=Ye,_e[Te++]=Mt,Mt=e;var i=Ke;e=Ye;var l=32-$e(i)-1;i&=~(1<<l),n+=1;var s=32-$e(t)+l;if(30<s){var a=l-l%5;s=(i&(1<<a)-1).toString(32),i>>=a,l-=a,Ke=1<<32-$e(t)+l|n<<l|i,Ye=s+e}else Ke=1<<s|n<<l|i,Ye=e}function hs(e){e.return!==null&&(Tt(e,1),du(e,1,0))}function ms(e){for(;e===qr;)qr=Qt[--qt],Qt[qt]=null,Kr=Qt[--qt],Qt[qt]=null;for(;e===Mt;)Mt=_e[--Te],_e[Te]=null,Ye=_e[--Te],_e[Te]=null,Ke=_e[--Te],_e[Te]=null}var Se=null,ye=null,b=!1,Me=null;function cu(e,t){var n=Ce(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function _a(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Se=e,ye=ht(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Se=e,ye=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Mt!==null?{id:Ke,overflow:Ye}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ce(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Se=e,ye=null,!0):!1;default:return!1}}function Cl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function El(e){if(b){var t=ye;if(t){var n=t;if(!_a(e,t)){if(Cl(e))throw Error(j(418));t=ht(n.nextSibling);var i=Se;t&&_a(e,t)?cu(i,n):(e.flags=e.flags&-4097|2,b=!1,Se=e)}}else{if(Cl(e))throw Error(j(418));e.flags=e.flags&-4097|2,b=!1,Se=e}}}function Ta(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Se=e}function yr(e){if(e!==Se)return!1;if(!b)return Ta(e),b=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Nl(e.type,e.memoizedProps)),t&&(t=ye)){if(Cl(e))throw pu(),Error(j(418));for(;t;)cu(e,t),t=ht(t.nextSibling)}if(Ta(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ye=ht(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ye=null}}else ye=Se?ht(e.stateNode.nextSibling):null;return!0}function pu(){for(var e=ye;e;)e=ht(e.nextSibling)}function an(){ye=Se=null,b=!1}function fs(e){Me===null?Me=[e]:Me.push(e)}var ap=nt.ReactCurrentBatchConfig;function Sn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(j(309));var i=n.stateNode}if(!i)throw Error(j(147,e));var l=i,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var o=l.refs;a===null?delete o[s]:o[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(j(284));if(!n._owner)throw Error(j(290,e))}return e}function Sr(e,t){throw e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ca(e){var t=e._init;return t(e._payload)}function hu(e){function t(h,p){if(e){var m=h.deletions;m===null?(h.deletions=[p],h.flags|=16):m.push(p)}}function n(h,p){if(!e)return null;for(;p!==null;)t(h,p),p=p.sibling;return null}function i(h,p){for(h=new Map;p!==null;)p.key!==null?h.set(p.key,p):h.set(p.index,p),p=p.sibling;return h}function l(h,p){return h=gt(h,p),h.index=0,h.sibling=null,h}function s(h,p,m){return h.index=m,e?(m=h.alternate,m!==null?(m=m.index,m<p?(h.flags|=2,p):m):(h.flags|=2,p)):(h.flags|=1048576,p)}function a(h){return e&&h.alternate===null&&(h.flags|=2),h}function o(h,p,m,S){return p===null||p.tag!==6?(p=Yi(m,h.mode,S),p.return=h,p):(p=l(p,m),p.return=h,p)}function u(h,p,m,S){var N=m.type;return N===Ft?v(h,p,m.props.children,S,m.key):p!==null&&(p.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===it&&Ca(N)===p.type)?(S=l(p,m.props),S.ref=Sn(h,p,m),S.return=h,S):(S=Or(m.type,m.key,m.props,null,h.mode,S),S.ref=Sn(h,p,m),S.return=h,S)}function c(h,p,m,S){return p===null||p.tag!==4||p.stateNode.containerInfo!==m.containerInfo||p.stateNode.implementation!==m.implementation?(p=Xi(m,h.mode,S),p.return=h,p):(p=l(p,m.children||[]),p.return=h,p)}function v(h,p,m,S,N){return p===null||p.tag!==7?(p=Rt(m,h.mode,S,N),p.return=h,p):(p=l(p,m),p.return=h,p)}function x(h,p,m){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Yi(""+p,h.mode,m),p.return=h,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case ur:return m=Or(p.type,p.key,p.props,null,h.mode,m),m.ref=Sn(h,null,p),m.return=h,m;case bt:return p=Xi(p,h.mode,m),p.return=h,p;case it:var S=p._init;return x(h,S(p._payload),m)}if(_n(p)||fn(p))return p=Rt(p,h.mode,m,null),p.return=h,p;Sr(h,p)}return null}function g(h,p,m,S){var N=p!==null?p.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:o(h,p,""+m,S);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ur:return m.key===N?u(h,p,m,S):null;case bt:return m.key===N?c(h,p,m,S):null;case it:return N=m._init,g(h,p,N(m._payload),S)}if(_n(m)||fn(m))return N!==null?null:v(h,p,m,S,null);Sr(h,m)}return null}function y(h,p,m,S,N){if(typeof S=="string"&&S!==""||typeof S=="number")return h=h.get(m)||null,o(p,h,""+S,N);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ur:return h=h.get(S.key===null?m:S.key)||null,u(p,h,S,N);case bt:return h=h.get(S.key===null?m:S.key)||null,c(p,h,S,N);case it:var C=S._init;return y(h,p,m,C(S._payload),N)}if(_n(S)||fn(S))return h=h.get(m)||null,v(p,h,S,N,null);Sr(p,S)}return null}function d(h,p,m,S){for(var N=null,C=null,T=p,E=p=0,z=null;T!==null&&E<m.length;E++){T.index>E?(z=T,T=null):z=T.sibling;var R=g(h,T,m[E],S);if(R===null){T===null&&(T=z);break}e&&T&&R.alternate===null&&t(h,T),p=s(R,p,E),C===null?N=R:C.sibling=R,C=R,T=z}if(E===m.length)return n(h,T),b&&Tt(h,E),N;if(T===null){for(;E<m.length;E++)T=x(h,m[E],S),T!==null&&(p=s(T,p,E),C===null?N=T:C.sibling=T,C=T);return b&&Tt(h,E),N}for(T=i(h,T);E<m.length;E++)z=y(T,h,E,m[E],S),z!==null&&(e&&z.alternate!==null&&T.delete(z.key===null?E:z.key),p=s(z,p,E),C===null?N=z:C.sibling=z,C=z);return e&&T.forEach(function(M){return t(h,M)}),b&&Tt(h,E),N}function f(h,p,m,S){var N=fn(m);if(typeof N!="function")throw Error(j(150));if(m=N.call(m),m==null)throw Error(j(151));for(var C=N=null,T=p,E=p=0,z=null,R=m.next();T!==null&&!R.done;E++,R=m.next()){T.index>E?(z=T,T=null):z=T.sibling;var M=g(h,T,R.value,S);if(M===null){T===null&&(T=z);break}e&&T&&M.alternate===null&&t(h,T),p=s(M,p,E),C===null?N=M:C.sibling=M,C=M,T=z}if(R.done)return n(h,T),b&&Tt(h,E),N;if(T===null){for(;!R.done;E++,R=m.next())R=x(h,R.value,S),R!==null&&(p=s(R,p,E),C===null?N=R:C.sibling=R,C=R);return b&&Tt(h,E),N}for(T=i(h,T);!R.done;E++,R=m.next())R=y(T,h,E,R.value,S),R!==null&&(e&&R.alternate!==null&&T.delete(R.key===null?E:R.key),p=s(R,p,E),C===null?N=R:C.sibling=R,C=R);return e&&T.forEach(function(ze){return t(h,ze)}),b&&Tt(h,E),N}function k(h,p,m,S){if(typeof m=="object"&&m!==null&&m.type===Ft&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ur:e:{for(var N=m.key,C=p;C!==null;){if(C.key===N){if(N=m.type,N===Ft){if(C.tag===7){n(h,C.sibling),p=l(C,m.props.children),p.return=h,h=p;break e}}else if(C.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===it&&Ca(N)===C.type){n(h,C.sibling),p=l(C,m.props),p.ref=Sn(h,C,m),p.return=h,h=p;break e}n(h,C);break}else t(h,C);C=C.sibling}m.type===Ft?(p=Rt(m.props.children,h.mode,S,m.key),p.return=h,h=p):(S=Or(m.type,m.key,m.props,null,h.mode,S),S.ref=Sn(h,p,m),S.return=h,h=S)}return a(h);case bt:e:{for(C=m.key;p!==null;){if(p.key===C)if(p.tag===4&&p.stateNode.containerInfo===m.containerInfo&&p.stateNode.implementation===m.implementation){n(h,p.sibling),p=l(p,m.children||[]),p.return=h,h=p;break e}else{n(h,p);break}else t(h,p);p=p.sibling}p=Xi(m,h.mode,S),p.return=h,h=p}return a(h);case it:return C=m._init,k(h,p,C(m._payload),S)}if(_n(m))return d(h,p,m,S);if(fn(m))return f(h,p,m,S);Sr(h,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,p!==null&&p.tag===6?(n(h,p.sibling),p=l(p,m),p.return=h,h=p):(n(h,p),p=Yi(m,h.mode,S),p.return=h,h=p),a(h)):n(h,p)}return k}var on=hu(!0),mu=hu(!1),Yr=jt(null),Xr=null,Kt=null,vs=null;function gs(){vs=Kt=Xr=null}function xs(e){var t=Yr.current;B(Yr),e._currentValue=t}function kl(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function nn(e,t){Xr=e,vs=Kt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(me=!0),e.firstContext=null)}function ke(e){var t=e._currentValue;if(vs!==e)if(e={context:e,memoizedValue:t,next:null},Kt===null){if(Xr===null)throw Error(j(308));Kt=e,Xr.dependencies={lanes:0,firstContext:e}}else Kt=Kt.next=e;return t}var kt=null;function ys(e){kt===null?kt=[e]:kt.push(e)}function fu(e,t,n,i){var l=t.interleaved;return l===null?(n.next=n,ys(t)):(n.next=l.next,l.next=n),t.interleaved=n,et(e,i)}function et(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var lt=!1;function Ss(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Xe(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function mt(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,$&2){var l=i.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),i.pending=t,et(e,n)}return l=i.interleaved,l===null?(t.next=t,ys(i)):(t.next=l.next,l.next=t),i.interleaved=t,et(e,n)}function Ar(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,ls(e,n)}}function Ea(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var l=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?l=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?l=s=t:s=s.next=t}else l=s=t;n={baseState:i.baseState,firstBaseUpdate:l,lastBaseUpdate:s,shared:i.shared,effects:i.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Zr(e,t,n,i){var l=e.updateQueue;lt=!1;var s=l.firstBaseUpdate,a=l.lastBaseUpdate,o=l.shared.pending;if(o!==null){l.shared.pending=null;var u=o,c=u.next;u.next=null,a===null?s=c:a.next=c,a=u;var v=e.alternate;v!==null&&(v=v.updateQueue,o=v.lastBaseUpdate,o!==a&&(o===null?v.firstBaseUpdate=c:o.next=c,v.lastBaseUpdate=u))}if(s!==null){var x=l.baseState;a=0,v=c=u=null,o=s;do{var g=o.lane,y=o.eventTime;if((i&g)===g){v!==null&&(v=v.next={eventTime:y,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var d=e,f=o;switch(g=t,y=n,f.tag){case 1:if(d=f.payload,typeof d=="function"){x=d.call(y,x,g);break e}x=d;break e;case 3:d.flags=d.flags&-65537|128;case 0:if(d=f.payload,g=typeof d=="function"?d.call(y,x,g):d,g==null)break e;x=W({},x,g);break e;case 2:lt=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,g=l.effects,g===null?l.effects=[o]:g.push(o))}else y={eventTime:y,lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},v===null?(c=v=y,u=x):v=v.next=y,a|=g;if(o=o.next,o===null){if(o=l.shared.pending,o===null)break;g=o,o=g.next,g.next=null,l.lastBaseUpdate=g,l.shared.pending=null}}while(!0);if(v===null&&(u=x),l.baseState=u,l.firstBaseUpdate=c,l.lastBaseUpdate=v,t=l.shared.interleaved,t!==null){l=t;do a|=l.lane,l=l.next;while(l!==t)}else s===null&&(l.shared.lanes=0);Lt|=a,e.lanes=a,e.memoizedState=x}}function ka(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],l=i.callback;if(l!==null){if(i.callback=null,i=n,typeof l!="function")throw Error(j(191,l));l.call(i)}}}var ir={},He=jt(ir),qn=jt(ir),Kn=jt(ir);function It(e){if(e===ir)throw Error(j(174));return e}function js(e,t){switch(O(Kn,t),O(qn,e),O(He,ir),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ol(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ol(t,e)}B(He),O(He,t)}function un(){B(He),B(qn),B(Kn)}function gu(e){It(Kn.current);var t=It(He.current),n=ol(t,e.type);t!==n&&(O(qn,e),O(He,n))}function Ns(e){qn.current===e&&(B(He),B(qn))}var F=jt(0);function Jr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Hi=[];function ws(){for(var e=0;e<Hi.length;e++)Hi[e]._workInProgressVersionPrimary=null;Hi.length=0}var Rr=nt.ReactCurrentDispatcher,Vi=nt.ReactCurrentBatchConfig,$t=0,U=null,K=null,J=null,ei=!1,Dn=!1,Yn=0,op=0;function le(){throw Error(j(321))}function _s(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Oe(e[n],t[n]))return!1;return!0}function Ts(e,t,n,i,l,s){if($t=s,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Rr.current=e===null||e.memoizedState===null?pp:hp,e=n(i,l),Dn){s=0;do{if(Dn=!1,Yn=0,25<=s)throw Error(j(301));s+=1,J=K=null,t.updateQueue=null,Rr.current=mp,e=n(i,l)}while(Dn)}if(Rr.current=ti,t=K!==null&&K.next!==null,$t=0,J=K=U=null,ei=!1,t)throw Error(j(300));return e}function Cs(){var e=Yn!==0;return Yn=0,e}function be(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return J===null?U.memoizedState=J=e:J=J.next=e,J}function Ie(){if(K===null){var e=U.alternate;e=e!==null?e.memoizedState:null}else e=K.next;var t=J===null?U.memoizedState:J.next;if(t!==null)J=t,K=e;else{if(e===null)throw Error(j(310));K=e,e={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null},J===null?U.memoizedState=J=e:J=J.next=e}return J}function Xn(e,t){return typeof t=="function"?t(e):t}function Gi(e){var t=Ie(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var i=K,l=i.baseQueue,s=n.pending;if(s!==null){if(l!==null){var a=l.next;l.next=s.next,s.next=a}i.baseQueue=l=s,n.pending=null}if(l!==null){s=l.next,i=i.baseState;var o=a=null,u=null,c=s;do{var v=c.lane;if(($t&v)===v)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:e(i,c.action);else{var x={lane:v,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(o=u=x,a=i):u=u.next=x,U.lanes|=v,Lt|=v}c=c.next}while(c!==null&&c!==s);u===null?a=i:u.next=o,Oe(i,t.memoizedState)||(me=!0),t.memoizedState=i,t.baseState=a,t.baseQueue=u,n.lastRenderedState=i}if(e=n.interleaved,e!==null){l=e;do s=l.lane,U.lanes|=s,Lt|=s,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Qi(e){var t=Ie(),n=t.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=e;var i=n.dispatch,l=n.pending,s=t.memoizedState;if(l!==null){n.pending=null;var a=l=l.next;do s=e(s,a.action),a=a.next;while(a!==l);Oe(s,t.memoizedState)||(me=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function xu(){}function yu(e,t){var n=U,i=Ie(),l=t(),s=!Oe(i.memoizedState,l);if(s&&(i.memoizedState=l,me=!0),i=i.queue,Es(Nu.bind(null,n,i,e),[e]),i.getSnapshot!==t||s||J!==null&&J.memoizedState.tag&1){if(n.flags|=2048,Zn(9,ju.bind(null,n,i,l,t),void 0,null),ee===null)throw Error(j(349));$t&30||Su(n,t,l)}return l}function Su(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ju(e,t,n,i){t.value=n,t.getSnapshot=i,wu(t)&&_u(e)}function Nu(e,t,n){return n(function(){wu(t)&&_u(e)})}function wu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Oe(e,n)}catch{return!0}}function _u(e){var t=et(e,1);t!==null&&Le(t,e,1,-1)}function Ia(e){var t=be();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xn,lastRenderedState:e},t.queue=e,e=e.dispatch=cp.bind(null,U,e),[t.memoizedState,e]}function Zn(e,t,n,i){return e={tag:e,create:t,destroy:n,deps:i,next:null},t=U.updateQueue,t===null?(t={lastEffect:null,stores:null},U.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e)),e}function Tu(){return Ie().memoizedState}function Dr(e,t,n,i){var l=be();U.flags|=e,l.memoizedState=Zn(1|t,n,void 0,i===void 0?null:i)}function mi(e,t,n,i){var l=Ie();i=i===void 0?null:i;var s=void 0;if(K!==null){var a=K.memoizedState;if(s=a.destroy,i!==null&&_s(i,a.deps)){l.memoizedState=Zn(t,n,s,i);return}}U.flags|=e,l.memoizedState=Zn(1|t,n,s,i)}function Aa(e,t){return Dr(8390656,8,e,t)}function Es(e,t){return mi(2048,8,e,t)}function Cu(e,t){return mi(4,2,e,t)}function Eu(e,t){return mi(4,4,e,t)}function ku(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Iu(e,t,n){return n=n!=null?n.concat([e]):null,mi(4,4,ku.bind(null,t,e),n)}function ks(){}function Au(e,t){var n=Ie();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&_s(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Ru(e,t){var n=Ie();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&_s(t,i[1])?i[0]:(e=e(),n.memoizedState=[e,t],e)}function Du(e,t,n){return $t&21?(Oe(n,t)||(n=zo(),U.lanes|=n,Lt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,me=!0),e.memoizedState=n)}function up(e,t){var n=L;L=n!==0&&4>n?n:4,e(!0);var i=Vi.transition;Vi.transition={};try{e(!1),t()}finally{L=n,Vi.transition=i}}function Mu(){return Ie().memoizedState}function dp(e,t,n){var i=vt(e);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},$u(e))Lu(t,n);else if(n=fu(e,t,n,i),n!==null){var l=de();Le(n,e,i,l),Ou(n,t,i)}}function cp(e,t,n){var i=vt(e),l={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if($u(e))Lu(t,l);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,o=s(a,n);if(l.hasEagerState=!0,l.eagerState=o,Oe(o,a)){var u=t.interleaved;u===null?(l.next=l,ys(t)):(l.next=u.next,u.next=l),t.interleaved=l;return}}catch{}finally{}n=fu(e,t,l,i),n!==null&&(l=de(),Le(n,e,i,l),Ou(n,t,i))}}function $u(e){var t=e.alternate;return e===U||t!==null&&t===U}function Lu(e,t){Dn=ei=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ou(e,t,n){if(n&4194240){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,ls(e,n)}}var ti={readContext:ke,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useInsertionEffect:le,useLayoutEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useMutableSource:le,useSyncExternalStore:le,useId:le,unstable_isNewReconciler:!1},pp={readContext:ke,useCallback:function(e,t){return be().memoizedState=[e,t===void 0?null:t],e},useContext:ke,useEffect:Aa,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Dr(4194308,4,ku.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Dr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Dr(4,2,e,t)},useMemo:function(e,t){var n=be();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var i=be();return t=n!==void 0?n(t):t,i.memoizedState=i.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},i.queue=e,e=e.dispatch=dp.bind(null,U,e),[i.memoizedState,e]},useRef:function(e){var t=be();return e={current:e},t.memoizedState=e},useState:Ia,useDebugValue:ks,useDeferredValue:function(e){return be().memoizedState=e},useTransition:function(){var e=Ia(!1),t=e[0];return e=up.bind(null,e[1]),be().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=U,l=be();if(b){if(n===void 0)throw Error(j(407));n=n()}else{if(n=t(),ee===null)throw Error(j(349));$t&30||Su(i,t,n)}l.memoizedState=n;var s={value:n,getSnapshot:t};return l.queue=s,Aa(Nu.bind(null,i,s,e),[e]),i.flags|=2048,Zn(9,ju.bind(null,i,s,n,t),void 0,null),n},useId:function(){var e=be(),t=ee.identifierPrefix;if(b){var n=Ye,i=Ke;n=(i&~(1<<32-$e(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=Yn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=op++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},hp={readContext:ke,useCallback:Au,useContext:ke,useEffect:Es,useImperativeHandle:Iu,useInsertionEffect:Cu,useLayoutEffect:Eu,useMemo:Ru,useReducer:Gi,useRef:Tu,useState:function(){return Gi(Xn)},useDebugValue:ks,useDeferredValue:function(e){var t=Ie();return Du(t,K.memoizedState,e)},useTransition:function(){var e=Gi(Xn)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:xu,useSyncExternalStore:yu,useId:Mu,unstable_isNewReconciler:!1},mp={readContext:ke,useCallback:Au,useContext:ke,useEffect:Es,useImperativeHandle:Iu,useInsertionEffect:Cu,useLayoutEffect:Eu,useMemo:Ru,useReducer:Qi,useRef:Tu,useState:function(){return Qi(Xn)},useDebugValue:ks,useDeferredValue:function(e){var t=Ie();return K===null?t.memoizedState=e:Du(t,K.memoizedState,e)},useTransition:function(){var e=Qi(Xn)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:xu,useSyncExternalStore:yu,useId:Mu,unstable_isNewReconciler:!1};function Re(e,t){if(e&&e.defaultProps){t=W({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Il(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:W({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var fi={isMounted:function(e){return(e=e._reactInternals)?Pt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=de(),l=vt(e),s=Xe(i,l);s.payload=t,n!=null&&(s.callback=n),t=mt(e,s,l),t!==null&&(Le(t,e,l,i),Ar(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=de(),l=vt(e),s=Xe(i,l);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=mt(e,s,l),t!==null&&(Le(t,e,l,i),Ar(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=de(),i=vt(e),l=Xe(n,i);l.tag=2,t!=null&&(l.callback=t),t=mt(e,l,i),t!==null&&(Le(t,e,i,n),Ar(t,e,i))}};function Ra(e,t,n,i,l,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,a):t.prototype&&t.prototype.isPureReactComponent?!Hn(n,i)||!Hn(l,s):!0}function zu(e,t,n){var i=!1,l=yt,s=t.contextType;return typeof s=="object"&&s!==null?s=ke(s):(l=ve(t)?Dt:oe.current,i=t.contextTypes,s=(i=i!=null)?sn(e,l):yt),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=fi,e.stateNode=t,t._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=s),t}function Da(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&fi.enqueueReplaceState(t,t.state,null)}function Al(e,t,n,i){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Ss(e);var s=t.contextType;typeof s=="object"&&s!==null?l.context=ke(s):(s=ve(t)?Dt:oe.current,l.context=sn(e,s)),l.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Il(e,t,s,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&fi.enqueueReplaceState(l,l.state,null),Zr(e,n,l,i),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function dn(e,t){try{var n="",i=t;do n+=Ud(i),i=i.return;while(i);var l=n}catch(s){l=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:l,digest:null}}function qi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Rl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var fp=typeof WeakMap=="function"?WeakMap:Map;function Pu(e,t,n){n=Xe(-1,n),n.tag=3,n.payload={element:null};var i=t.value;return n.callback=function(){ri||(ri=!0,Fl=i),Rl(e,t)},n}function Bu(e,t,n){n=Xe(-1,n),n.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var l=t.value;n.payload=function(){return i(l)},n.callback=function(){Rl(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Rl(e,t),typeof i!="function"&&(ft===null?ft=new Set([this]):ft.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Ma(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new fp;var l=new Set;i.set(t,l)}else l=i.get(t),l===void 0&&(l=new Set,i.set(t,l));l.has(n)||(l.add(n),e=Ip.bind(null,e,t,n),t.then(e,e))}function $a(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function La(e,t,n,i,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Xe(-1,1),t.tag=2,mt(n,t,1))),n.lanes|=1),e)}var vp=nt.ReactCurrentOwner,me=!1;function ue(e,t,n,i){t.child=e===null?mu(t,null,n,i):on(t,e.child,n,i)}function Oa(e,t,n,i,l){n=n.render;var s=t.ref;return nn(t,l),i=Ts(e,t,n,i,s,l),n=Cs(),e!==null&&!me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):(b&&n&&hs(t),t.flags|=1,ue(e,t,i,l),t.child)}function za(e,t,n,i,l){if(e===null){var s=n.type;return typeof s=="function"&&!Os(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,bu(e,t,s,i,l)):(e=Or(n.type,null,i,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&l)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Hn,n(a,i)&&e.ref===t.ref)return tt(e,t,l)}return t.flags|=1,e=gt(s,i),e.ref=t.ref,e.return=t,t.child=e}function bu(e,t,n,i,l){if(e!==null){var s=e.memoizedProps;if(Hn(s,i)&&e.ref===t.ref)if(me=!1,t.pendingProps=i=s,(e.lanes&l)!==0)e.flags&131072&&(me=!0);else return t.lanes=e.lanes,tt(e,t,l)}return Dl(e,t,n,i,l)}function Fu(e,t,n){var i=t.pendingProps,l=i.children,s=e!==null?e.memoizedState:null;if(i.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(Xt,xe),xe|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,O(Xt,xe),xe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,O(Xt,xe),xe|=i}else s!==null?(i=s.baseLanes|n,t.memoizedState=null):i=n,O(Xt,xe),xe|=i;return ue(e,t,l,n),t.child}function Uu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Dl(e,t,n,i,l){var s=ve(n)?Dt:oe.current;return s=sn(t,s),nn(t,l),n=Ts(e,t,n,i,s,l),i=Cs(),e!==null&&!me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):(b&&i&&hs(t),t.flags|=1,ue(e,t,n,l),t.child)}function Pa(e,t,n,i,l){if(ve(n)){var s=!0;Qr(t)}else s=!1;if(nn(t,l),t.stateNode===null)Mr(e,t),zu(t,n,i),Al(t,n,i,l),i=!0;else if(e===null){var a=t.stateNode,o=t.memoizedProps;a.props=o;var u=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=ke(c):(c=ve(n)?Dt:oe.current,c=sn(t,c));var v=n.getDerivedStateFromProps,x=typeof v=="function"||typeof a.getSnapshotBeforeUpdate=="function";x||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||u!==c)&&Da(t,a,i,c),lt=!1;var g=t.memoizedState;a.state=g,Zr(t,i,a,l),u=t.memoizedState,o!==i||g!==u||fe.current||lt?(typeof v=="function"&&(Il(t,n,v,i),u=t.memoizedState),(o=lt||Ra(t,n,o,i,g,u,c))?(x||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=u),a.props=i,a.state=u,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,vu(e,t),o=t.memoizedProps,c=t.type===t.elementType?o:Re(t.type,o),a.props=c,x=t.pendingProps,g=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=ke(u):(u=ve(n)?Dt:oe.current,u=sn(t,u));var y=n.getDerivedStateFromProps;(v=typeof y=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==x||g!==u)&&Da(t,a,i,u),lt=!1,g=t.memoizedState,a.state=g,Zr(t,i,a,l);var d=t.memoizedState;o!==x||g!==d||fe.current||lt?(typeof y=="function"&&(Il(t,n,y,i),d=t.memoizedState),(c=lt||Ra(t,n,c,i,g,d,u)||!1)?(v||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,d,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,d,u)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=d),a.props=i,a.state=d,a.context=u,i=c):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),i=!1)}return Ml(e,t,n,i,s,l)}function Ml(e,t,n,i,l,s){Uu(e,t);var a=(t.flags&128)!==0;if(!i&&!a)return l&&wa(t,n,!1),tt(e,t,s);i=t.stateNode,vp.current=t;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return t.flags|=1,e!==null&&a?(t.child=on(t,e.child,null,s),t.child=on(t,null,o,s)):ue(e,t,o,s),t.memoizedState=i.state,l&&wa(t,n,!0),t.child}function Wu(e){var t=e.stateNode;t.pendingContext?Na(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Na(e,t.context,!1),js(e,t.containerInfo)}function Ba(e,t,n,i,l){return an(),fs(l),t.flags|=256,ue(e,t,n,i),t.child}var $l={dehydrated:null,treeContext:null,retryLane:0};function Ll(e){return{baseLanes:e,cachePool:null,transitions:null}}function Hu(e,t,n){var i=t.pendingProps,l=F.current,s=!1,a=(t.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(l&2)!==0),o?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),O(F,l&1),e===null)return El(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=i.children,e=i.fallback,s?(i=t.mode,s=t.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=xi(a,i,0,null),e=Rt(e,i,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Ll(n),t.memoizedState=$l,e):Is(t,a));if(l=e.memoizedState,l!==null&&(o=l.dehydrated,o!==null))return gp(e,t,a,i,o,l,n);if(s){s=i.fallback,a=t.mode,l=e.child,o=l.sibling;var u={mode:"hidden",children:i.children};return!(a&1)&&t.child!==l?(i=t.child,i.childLanes=0,i.pendingProps=u,t.deletions=null):(i=gt(l,u),i.subtreeFlags=l.subtreeFlags&14680064),o!==null?s=gt(o,s):(s=Rt(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,a=e.child.memoizedState,a=a===null?Ll(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~n,t.memoizedState=$l,i}return s=e.child,e=s.sibling,i=gt(s,{mode:"visible",children:i.children}),!(t.mode&1)&&(i.lanes=n),i.return=t,i.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function Is(e,t){return t=xi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function jr(e,t,n,i){return i!==null&&fs(i),on(t,e.child,null,n),e=Is(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gp(e,t,n,i,l,s,a){if(n)return t.flags&256?(t.flags&=-257,i=qi(Error(j(422))),jr(e,t,a,i)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=i.fallback,l=t.mode,i=xi({mode:"visible",children:i.children},l,0,null),s=Rt(s,l,a,null),s.flags|=2,i.return=t,s.return=t,i.sibling=s,t.child=i,t.mode&1&&on(t,e.child,null,a),t.child.memoizedState=Ll(a),t.memoizedState=$l,s);if(!(t.mode&1))return jr(e,t,a,null);if(l.data==="$!"){if(i=l.nextSibling&&l.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(j(419)),i=qi(s,i,void 0),jr(e,t,a,i)}if(o=(a&e.childLanes)!==0,me||o){if(i=ee,i!==null){switch(a&-a){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(i.suspendedLanes|a)?0:l,l!==0&&l!==s.retryLane&&(s.retryLane=l,et(e,l),Le(i,e,l,-1))}return Ls(),i=qi(Error(j(421))),jr(e,t,a,i)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Ap.bind(null,e),l._reactRetry=t,null):(e=s.treeContext,ye=ht(l.nextSibling),Se=t,b=!0,Me=null,e!==null&&(_e[Te++]=Ke,_e[Te++]=Ye,_e[Te++]=Mt,Ke=e.id,Ye=e.overflow,Mt=t),t=Is(t,i.children),t.flags|=4096,t)}function ba(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),kl(e.return,t,n)}function Ki(e,t,n,i,l){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:l}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=l)}function Vu(e,t,n){var i=t.pendingProps,l=i.revealOrder,s=i.tail;if(ue(e,t,i.children,n),i=F.current,i&2)i=i&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ba(e,n,t);else if(e.tag===19)ba(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(O(F,i),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Jr(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Ki(t,!1,l,n,s);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Jr(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Ki(t,!0,n,null,s);break;case"together":Ki(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Mr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function tt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Lt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,n=gt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function xp(e,t,n){switch(t.tag){case 3:Wu(t),an();break;case 5:gu(t);break;case 1:ve(t.type)&&Qr(t);break;case 4:js(t,t.stateNode.containerInfo);break;case 10:var i=t.type._context,l=t.memoizedProps.value;O(Yr,i._currentValue),i._currentValue=l;break;case 13:if(i=t.memoizedState,i!==null)return i.dehydrated!==null?(O(F,F.current&1),t.flags|=128,null):n&t.child.childLanes?Hu(e,t,n):(O(F,F.current&1),e=tt(e,t,n),e!==null?e.sibling:null);O(F,F.current&1);break;case 19:if(i=(n&t.childLanes)!==0,e.flags&128){if(i)return Vu(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),O(F,F.current),i)break;return null;case 22:case 23:return t.lanes=0,Fu(e,t,n)}return tt(e,t,n)}var Gu,Ol,Qu,qu;Gu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ol=function(){};Qu=function(e,t,n,i){var l=e.memoizedProps;if(l!==i){e=t.stateNode,It(He.current);var s=null;switch(n){case"input":l=il(e,l),i=il(e,i),s=[];break;case"select":l=W({},l,{value:void 0}),i=W({},i,{value:void 0}),s=[];break;case"textarea":l=al(e,l),i=al(e,i),s=[];break;default:typeof l.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=Vr)}ul(n,i);var a;n=null;for(c in l)if(!i.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var o=l[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(zn.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var u=i[c];if(o=l!=null?l[c]:void 0,i.hasOwnProperty(c)&&u!==o&&(u!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&o[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(s||(s=[]),s.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,o=o?o.__html:void 0,u!=null&&o!==u&&(s=s||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(zn.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&P("scroll",e),s||o===u||(s=[])):(s=s||[]).push(c,u))}n&&(s=s||[]).push("style",n);var c=s;(t.updateQueue=c)&&(t.flags|=4)}};qu=function(e,t,n,i){n!==i&&(t.flags|=4)};function jn(e,t){if(!b)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,i|=l.subtreeFlags&14680064,i|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,i|=l.subtreeFlags,i|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function yp(e,t,n){var i=t.pendingProps;switch(ms(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return ve(t.type)&&Gr(),se(t),null;case 3:return i=t.stateNode,un(),B(fe),B(oe),ws(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Me!==null&&(Hl(Me),Me=null))),Ol(e,t),se(t),null;case 5:Ns(t);var l=It(Kn.current);if(n=t.type,e!==null&&t.stateNode!=null)Qu(e,t,n,i,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(j(166));return se(t),null}if(e=It(He.current),yr(t)){i=t.stateNode,n=t.type;var s=t.memoizedProps;switch(i[Fe]=t,i[Qn]=s,e=(t.mode&1)!==0,n){case"dialog":P("cancel",i),P("close",i);break;case"iframe":case"object":case"embed":P("load",i);break;case"video":case"audio":for(l=0;l<Cn.length;l++)P(Cn[l],i);break;case"source":P("error",i);break;case"img":case"image":case"link":P("error",i),P("load",i);break;case"details":P("toggle",i);break;case"input":Ks(i,s),P("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},P("invalid",i);break;case"textarea":Xs(i,s),P("invalid",i)}ul(n,s),l=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&xr(i.textContent,o,e),l=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&xr(i.textContent,o,e),l=["children",""+o]):zn.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&P("scroll",i)}switch(n){case"input":dr(i),Ys(i,s,!0);break;case"textarea":dr(i),Zs(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Vr)}i=l,t.updateQueue=i,i!==null&&(t.flags|=4)}else{a=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=No(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=a.createElement(n,{is:i.is}):(e=a.createElement(n),n==="select"&&(a=e,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):e=a.createElementNS(e,n),e[Fe]=t,e[Qn]=i,Gu(e,t,!1,!1),t.stateNode=e;e:{switch(a=dl(n,i),n){case"dialog":P("cancel",e),P("close",e),l=i;break;case"iframe":case"object":case"embed":P("load",e),l=i;break;case"video":case"audio":for(l=0;l<Cn.length;l++)P(Cn[l],e);l=i;break;case"source":P("error",e),l=i;break;case"img":case"image":case"link":P("error",e),P("load",e),l=i;break;case"details":P("toggle",e),l=i;break;case"input":Ks(e,i),l=il(e,i),P("invalid",e);break;case"option":l=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},l=W({},i,{value:void 0}),P("invalid",e);break;case"textarea":Xs(e,i),l=al(e,i),P("invalid",e);break;default:l=i}ul(n,l),o=l;for(s in o)if(o.hasOwnProperty(s)){var u=o[s];s==="style"?To(e,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&wo(e,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Pn(e,u):typeof u=="number"&&Pn(e,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(zn.hasOwnProperty(s)?u!=null&&s==="onScroll"&&P("scroll",e):u!=null&&Jl(e,s,u,a))}switch(n){case"input":dr(e),Ys(e,i,!1);break;case"textarea":dr(e),Zs(e);break;case"option":i.value!=null&&e.setAttribute("value",""+xt(i.value));break;case"select":e.multiple=!!i.multiple,s=i.value,s!=null?Zt(e,!!i.multiple,s,!1):i.defaultValue!=null&&Zt(e,!!i.multiple,i.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Vr)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)qu(e,t,e.memoizedProps,i);else{if(typeof i!="string"&&t.stateNode===null)throw Error(j(166));if(n=It(Kn.current),It(He.current),yr(t)){if(i=t.stateNode,n=t.memoizedProps,i[Fe]=t,(s=i.nodeValue!==n)&&(e=Se,e!==null))switch(e.tag){case 3:xr(i.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(i.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Fe]=t,t.stateNode=i}return se(t),null;case 13:if(B(F),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(b&&ye!==null&&t.mode&1&&!(t.flags&128))pu(),an(),t.flags|=98560,s=!1;else if(s=yr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(j(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(j(317));s[Fe]=t}else an(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),s=!1}else Me!==null&&(Hl(Me),Me=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,t.mode&1&&(e===null||F.current&1?Y===0&&(Y=3):Ls())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return un(),Ol(e,t),e===null&&Vn(t.stateNode.containerInfo),se(t),null;case 10:return xs(t.type._context),se(t),null;case 17:return ve(t.type)&&Gr(),se(t),null;case 19:if(B(F),s=t.memoizedState,s===null)return se(t),null;if(i=(t.flags&128)!==0,a=s.rendering,a===null)if(i)jn(s,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Jr(e),a!==null){for(t.flags|=128,jn(s,!1),i=a.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)s=n,e=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return O(F,F.current&1|2),t.child}e=e.sibling}s.tail!==null&&G()>cn&&(t.flags|=128,i=!0,jn(s,!1),t.lanes=4194304)}else{if(!i)if(e=Jr(a),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),jn(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!b)return se(t),null}else 2*G()-s.renderingStartTime>cn&&n!==1073741824&&(t.flags|=128,i=!0,jn(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(n=s.last,n!==null?n.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=G(),t.sibling=null,n=F.current,O(F,i?n&1|2:n&1),t):(se(t),null);case 22:case 23:return $s(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&t.mode&1?xe&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(j(156,t.tag))}function Sp(e,t){switch(ms(t),t.tag){case 1:return ve(t.type)&&Gr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return un(),B(fe),B(oe),ws(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ns(t),null;case 13:if(B(F),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));an()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(F),null;case 4:return un(),null;case 10:return xs(t.type._context),null;case 22:case 23:return $s(),null;case 24:return null;default:return null}}var Nr=!1,ae=!1,jp=typeof WeakSet=="function"?WeakSet:Set,w=null;function Yt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){H(e,t,i)}else n.current=null}function zl(e,t,n){try{n()}catch(i){H(e,t,i)}}var Fa=!1;function Np(e,t){if(Sl=Ur,e=Jo(),ps(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var l=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,u=-1,c=0,v=0,x=e,g=null;t:for(;;){for(var y;x!==n||l!==0&&x.nodeType!==3||(o=a+l),x!==s||i!==0&&x.nodeType!==3||(u=a+i),x.nodeType===3&&(a+=x.nodeValue.length),(y=x.firstChild)!==null;)g=x,x=y;for(;;){if(x===e)break t;if(g===n&&++c===l&&(o=a),g===s&&++v===i&&(u=a),(y=x.nextSibling)!==null)break;x=g,g=x.parentNode}x=y}n=o===-1||u===-1?null:{start:o,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(jl={focusedElem:e,selectionRange:n},Ur=!1,w=t;w!==null;)if(t=w,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,w=e;else for(;w!==null;){t=w;try{var d=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(d!==null){var f=d.memoizedProps,k=d.memoizedState,h=t.stateNode,p=h.getSnapshotBeforeUpdate(t.elementType===t.type?f:Re(t.type,f),k);h.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(S){H(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,w=e;break}w=t.return}return d=Fa,Fa=!1,d}function Mn(e,t,n){var i=t.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var l=i=i.next;do{if((l.tag&e)===e){var s=l.destroy;l.destroy=void 0,s!==void 0&&zl(t,n,s)}l=l.next}while(l!==i)}}function vi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var i=n.create;n.destroy=i()}n=n.next}while(n!==t)}}function Pl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Ku(e){var t=e.alternate;t!==null&&(e.alternate=null,Ku(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Fe],delete t[Qn],delete t[_l],delete t[ip],delete t[lp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Yu(e){return e.tag===5||e.tag===3||e.tag===4}function Ua(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Yu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Bl(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Vr));else if(i!==4&&(e=e.child,e!==null))for(Bl(e,t,n),e=e.sibling;e!==null;)Bl(e,t,n),e=e.sibling}function bl(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(bl(e,t,n),e=e.sibling;e!==null;)bl(e,t,n),e=e.sibling}var ne=null,De=!1;function rt(e,t,n){for(n=n.child;n!==null;)Xu(e,t,n),n=n.sibling}function Xu(e,t,n){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(oi,n)}catch{}switch(n.tag){case 5:ae||Yt(n,t);case 6:var i=ne,l=De;ne=null,rt(e,t,n),ne=i,De=l,ne!==null&&(De?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&(De?(e=ne,n=n.stateNode,e.nodeType===8?Ui(e.parentNode,n):e.nodeType===1&&Ui(e,n),Un(e)):Ui(ne,n.stateNode));break;case 4:i=ne,l=De,ne=n.stateNode.containerInfo,De=!0,rt(e,t,n),ne=i,De=l;break;case 0:case 11:case 14:case 15:if(!ae&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){l=i=i.next;do{var s=l,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&zl(n,t,a),l=l.next}while(l!==i)}rt(e,t,n);break;case 1:if(!ae&&(Yt(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){H(n,t,o)}rt(e,t,n);break;case 21:rt(e,t,n);break;case 22:n.mode&1?(ae=(i=ae)||n.memoizedState!==null,rt(e,t,n),ae=i):rt(e,t,n);break;default:rt(e,t,n)}}function Wa(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new jp),t.forEach(function(i){var l=Rp.bind(null,e,i);n.has(i)||(n.add(i),i.then(l,l))})}}function Ae(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var l=n[i];try{var s=e,a=t,o=a;e:for(;o!==null;){switch(o.tag){case 5:ne=o.stateNode,De=!1;break e;case 3:ne=o.stateNode.containerInfo,De=!0;break e;case 4:ne=o.stateNode.containerInfo,De=!0;break e}o=o.return}if(ne===null)throw Error(j(160));Xu(s,a,l),ne=null,De=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(c){H(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Zu(t,e),t=t.sibling}function Zu(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ae(t,e),Pe(e),i&4){try{Mn(3,e,e.return),vi(3,e)}catch(f){H(e,e.return,f)}try{Mn(5,e,e.return)}catch(f){H(e,e.return,f)}}break;case 1:Ae(t,e),Pe(e),i&512&&n!==null&&Yt(n,n.return);break;case 5:if(Ae(t,e),Pe(e),i&512&&n!==null&&Yt(n,n.return),e.flags&32){var l=e.stateNode;try{Pn(l,"")}catch(f){H(e,e.return,f)}}if(i&4&&(l=e.stateNode,l!=null)){var s=e.memoizedProps,a=n!==null?n.memoizedProps:s,o=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&So(l,s),dl(o,a);var c=dl(o,s);for(a=0;a<u.length;a+=2){var v=u[a],x=u[a+1];v==="style"?To(l,x):v==="dangerouslySetInnerHTML"?wo(l,x):v==="children"?Pn(l,x):Jl(l,v,x,c)}switch(o){case"input":ll(l,s);break;case"textarea":jo(l,s);break;case"select":var g=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!s.multiple;var y=s.value;y!=null?Zt(l,!!s.multiple,y,!1):g!==!!s.multiple&&(s.defaultValue!=null?Zt(l,!!s.multiple,s.defaultValue,!0):Zt(l,!!s.multiple,s.multiple?[]:"",!1))}l[Qn]=s}catch(f){H(e,e.return,f)}}break;case 6:if(Ae(t,e),Pe(e),i&4){if(e.stateNode===null)throw Error(j(162));l=e.stateNode,s=e.memoizedProps;try{l.nodeValue=s}catch(f){H(e,e.return,f)}}break;case 3:if(Ae(t,e),Pe(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Un(t.containerInfo)}catch(f){H(e,e.return,f)}break;case 4:Ae(t,e),Pe(e);break;case 13:Ae(t,e),Pe(e),l=e.child,l.flags&8192&&(s=l.memoizedState!==null,l.stateNode.isHidden=s,!s||l.alternate!==null&&l.alternate.memoizedState!==null||(Ds=G())),i&4&&Wa(e);break;case 22:if(v=n!==null&&n.memoizedState!==null,e.mode&1?(ae=(c=ae)||v,Ae(t,e),ae=c):Ae(t,e),Pe(e),i&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!v&&e.mode&1)for(w=e,v=e.child;v!==null;){for(x=w=v;w!==null;){switch(g=w,y=g.child,g.tag){case 0:case 11:case 14:case 15:Mn(4,g,g.return);break;case 1:Yt(g,g.return);var d=g.stateNode;if(typeof d.componentWillUnmount=="function"){i=g,n=g.return;try{t=i,d.props=t.memoizedProps,d.state=t.memoizedState,d.componentWillUnmount()}catch(f){H(i,n,f)}}break;case 5:Yt(g,g.return);break;case 22:if(g.memoizedState!==null){Va(x);continue}}y!==null?(y.return=g,w=y):Va(x)}v=v.sibling}e:for(v=null,x=e;;){if(x.tag===5){if(v===null){v=x;try{l=x.stateNode,c?(s=l.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=x.stateNode,u=x.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,o.style.display=_o("display",a))}catch(f){H(e,e.return,f)}}}else if(x.tag===6){if(v===null)try{x.stateNode.nodeValue=c?"":x.memoizedProps}catch(f){H(e,e.return,f)}}else if((x.tag!==22&&x.tag!==23||x.memoizedState===null||x===e)&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===e)break e;for(;x.sibling===null;){if(x.return===null||x.return===e)break e;v===x&&(v=null),x=x.return}v===x&&(v=null),x.sibling.return=x.return,x=x.sibling}}break;case 19:Ae(t,e),Pe(e),i&4&&Wa(e);break;case 21:break;default:Ae(t,e),Pe(e)}}function Pe(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Yu(n)){var i=n;break e}n=n.return}throw Error(j(160))}switch(i.tag){case 5:var l=i.stateNode;i.flags&32&&(Pn(l,""),i.flags&=-33);var s=Ua(e);bl(e,s,l);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Ua(e);Bl(e,o,a);break;default:throw Error(j(161))}}catch(u){H(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wp(e,t,n){w=e,Ju(e)}function Ju(e,t,n){for(var i=(e.mode&1)!==0;w!==null;){var l=w,s=l.child;if(l.tag===22&&i){var a=l.memoizedState!==null||Nr;if(!a){var o=l.alternate,u=o!==null&&o.memoizedState!==null||ae;o=Nr;var c=ae;if(Nr=a,(ae=u)&&!c)for(w=l;w!==null;)a=w,u=a.child,a.tag===22&&a.memoizedState!==null?Ga(l):u!==null?(u.return=a,w=u):Ga(l);for(;s!==null;)w=s,Ju(s),s=s.sibling;w=l,Nr=o,ae=c}Ha(e)}else l.subtreeFlags&8772&&s!==null?(s.return=l,w=s):Ha(e)}}function Ha(e){for(;w!==null;){var t=w;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ae||vi(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!ae)if(n===null)i.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Re(t.type,n.memoizedProps);i.componentDidUpdate(l,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&ka(t,s,i);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ka(t,a,n)}break;case 5:var o=t.stateNode;if(n===null&&t.flags&4){n=o;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var v=c.memoizedState;if(v!==null){var x=v.dehydrated;x!==null&&Un(x)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}ae||t.flags&512&&Pl(t)}catch(g){H(t,t.return,g)}}if(t===e){w=null;break}if(n=t.sibling,n!==null){n.return=t.return,w=n;break}w=t.return}}function Va(e){for(;w!==null;){var t=w;if(t===e){w=null;break}var n=t.sibling;if(n!==null){n.return=t.return,w=n;break}w=t.return}}function Ga(e){for(;w!==null;){var t=w;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{vi(4,t)}catch(u){H(t,n,u)}break;case 1:var i=t.stateNode;if(typeof i.componentDidMount=="function"){var l=t.return;try{i.componentDidMount()}catch(u){H(t,l,u)}}var s=t.return;try{Pl(t)}catch(u){H(t,s,u)}break;case 5:var a=t.return;try{Pl(t)}catch(u){H(t,a,u)}}}catch(u){H(t,t.return,u)}if(t===e){w=null;break}var o=t.sibling;if(o!==null){o.return=t.return,w=o;break}w=t.return}}var _p=Math.ceil,ni=nt.ReactCurrentDispatcher,As=nt.ReactCurrentOwner,Ee=nt.ReactCurrentBatchConfig,$=0,ee=null,Q=null,re=0,xe=0,Xt=jt(0),Y=0,Jn=null,Lt=0,gi=0,Rs=0,$n=null,he=null,Ds=0,cn=1/0,Ge=null,ri=!1,Fl=null,ft=null,wr=!1,ut=null,ii=0,Ln=0,Ul=null,$r=-1,Lr=0;function de(){return $&6?G():$r!==-1?$r:$r=G()}function vt(e){return e.mode&1?$&2&&re!==0?re&-re:ap.transition!==null?(Lr===0&&(Lr=zo()),Lr):(e=L,e!==0||(e=window.event,e=e===void 0?16:Ho(e.type)),e):1}function Le(e,t,n,i){if(50<Ln)throw Ln=0,Ul=null,Error(j(185));tr(e,n,i),(!($&2)||e!==ee)&&(e===ee&&(!($&2)&&(gi|=n),Y===4&&at(e,re)),ge(e,i),n===1&&$===0&&!(t.mode&1)&&(cn=G()+500,hi&&Nt()))}function ge(e,t){var n=e.callbackNode;ac(e,t);var i=Fr(e,e===ee?re:0);if(i===0)n!==null&&ta(n),e.callbackNode=null,e.callbackPriority=0;else if(t=i&-i,e.callbackPriority!==t){if(n!=null&&ta(n),t===1)e.tag===0?sp(Qa.bind(null,e)):uu(Qa.bind(null,e)),np(function(){!($&6)&&Nt()}),n=null;else{switch(Po(i)){case 1:n=is;break;case 4:n=Lo;break;case 16:n=br;break;case 536870912:n=Oo;break;default:n=br}n=ad(n,ed.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ed(e,t){if($r=-1,Lr=0,$&6)throw Error(j(327));var n=e.callbackNode;if(rn()&&e.callbackNode!==n)return null;var i=Fr(e,e===ee?re:0);if(i===0)return null;if(i&30||i&e.expiredLanes||t)t=li(e,i);else{t=i;var l=$;$|=2;var s=nd();(ee!==e||re!==t)&&(Ge=null,cn=G()+500,At(e,t));do try{Ep();break}catch(o){td(e,o)}while(!0);gs(),ni.current=s,$=l,Q!==null?t=0:(ee=null,re=0,t=Y)}if(t!==0){if(t===2&&(l=fl(e),l!==0&&(i=l,t=Wl(e,l))),t===1)throw n=Jn,At(e,0),at(e,i),ge(e,G()),n;if(t===6)at(e,i);else{if(l=e.current.alternate,!(i&30)&&!Tp(l)&&(t=li(e,i),t===2&&(s=fl(e),s!==0&&(i=s,t=Wl(e,s))),t===1))throw n=Jn,At(e,0),at(e,i),ge(e,G()),n;switch(e.finishedWork=l,e.finishedLanes=i,t){case 0:case 1:throw Error(j(345));case 2:Ct(e,he,Ge);break;case 3:if(at(e,i),(i&130023424)===i&&(t=Ds+500-G(),10<t)){if(Fr(e,0)!==0)break;if(l=e.suspendedLanes,(l&i)!==i){de(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=wl(Ct.bind(null,e,he,Ge),t);break}Ct(e,he,Ge);break;case 4:if(at(e,i),(i&4194240)===i)break;for(t=e.eventTimes,l=-1;0<i;){var a=31-$e(i);s=1<<a,a=t[a],a>l&&(l=a),i&=~s}if(i=l,i=G()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*_p(i/1960))-i,10<i){e.timeoutHandle=wl(Ct.bind(null,e,he,Ge),i);break}Ct(e,he,Ge);break;case 5:Ct(e,he,Ge);break;default:throw Error(j(329))}}}return ge(e,G()),e.callbackNode===n?ed.bind(null,e):null}function Wl(e,t){var n=$n;return e.current.memoizedState.isDehydrated&&(At(e,t).flags|=256),e=li(e,t),e!==2&&(t=he,he=n,t!==null&&Hl(t)),e}function Hl(e){he===null?he=e:he.push.apply(he,e)}function Tp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var l=n[i],s=l.getSnapshot;l=l.value;try{if(!Oe(s(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function at(e,t){for(t&=~Rs,t&=~gi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-$e(t),i=1<<n;e[n]=-1,t&=~i}}function Qa(e){if($&6)throw Error(j(327));rn();var t=Fr(e,0);if(!(t&1))return ge(e,G()),null;var n=li(e,t);if(e.tag!==0&&n===2){var i=fl(e);i!==0&&(t=i,n=Wl(e,i))}if(n===1)throw n=Jn,At(e,0),at(e,t),ge(e,G()),n;if(n===6)throw Error(j(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ct(e,he,Ge),ge(e,G()),null}function Ms(e,t){var n=$;$|=1;try{return e(t)}finally{$=n,$===0&&(cn=G()+500,hi&&Nt())}}function Ot(e){ut!==null&&ut.tag===0&&!($&6)&&rn();var t=$;$|=1;var n=Ee.transition,i=L;try{if(Ee.transition=null,L=1,e)return e()}finally{L=i,Ee.transition=n,$=t,!($&6)&&Nt()}}function $s(){xe=Xt.current,B(Xt)}function At(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,tp(n)),Q!==null)for(n=Q.return;n!==null;){var i=n;switch(ms(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Gr();break;case 3:un(),B(fe),B(oe),ws();break;case 5:Ns(i);break;case 4:un();break;case 13:B(F);break;case 19:B(F);break;case 10:xs(i.type._context);break;case 22:case 23:$s()}n=n.return}if(ee=e,Q=e=gt(e.current,null),re=xe=t,Y=0,Jn=null,Rs=gi=Lt=0,he=$n=null,kt!==null){for(t=0;t<kt.length;t++)if(n=kt[t],i=n.interleaved,i!==null){n.interleaved=null;var l=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=l,i.next=a}n.pending=i}kt=null}return e}function td(e,t){do{var n=Q;try{if(gs(),Rr.current=ti,ei){for(var i=U.memoizedState;i!==null;){var l=i.queue;l!==null&&(l.pending=null),i=i.next}ei=!1}if($t=0,J=K=U=null,Dn=!1,Yn=0,As.current=null,n===null||n.return===null){Y=1,Jn=t,Q=null;break}e:{var s=e,a=n.return,o=n,u=t;if(t=re,o.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,v=o,x=v.tag;if(!(v.mode&1)&&(x===0||x===11||x===15)){var g=v.alternate;g?(v.updateQueue=g.updateQueue,v.memoizedState=g.memoizedState,v.lanes=g.lanes):(v.updateQueue=null,v.memoizedState=null)}var y=$a(a);if(y!==null){y.flags&=-257,La(y,a,o,s,t),y.mode&1&&Ma(s,c,t),t=y,u=c;var d=t.updateQueue;if(d===null){var f=new Set;f.add(u),t.updateQueue=f}else d.add(u);break e}else{if(!(t&1)){Ma(s,c,t),Ls();break e}u=Error(j(426))}}else if(b&&o.mode&1){var k=$a(a);if(k!==null){!(k.flags&65536)&&(k.flags|=256),La(k,a,o,s,t),fs(dn(u,o));break e}}s=u=dn(u,o),Y!==4&&(Y=2),$n===null?$n=[s]:$n.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var h=Pu(s,u,t);Ea(s,h);break e;case 1:o=u;var p=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof p.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(ft===null||!ft.has(m)))){s.flags|=65536,t&=-t,s.lanes|=t;var S=Bu(s,o,t);Ea(s,S);break e}}s=s.return}while(s!==null)}id(n)}catch(N){t=N,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function nd(){var e=ni.current;return ni.current=ti,e===null?ti:e}function Ls(){(Y===0||Y===3||Y===2)&&(Y=4),ee===null||!(Lt&268435455)&&!(gi&268435455)||at(ee,re)}function li(e,t){var n=$;$|=2;var i=nd();(ee!==e||re!==t)&&(Ge=null,At(e,t));do try{Cp();break}catch(l){td(e,l)}while(!0);if(gs(),$=n,ni.current=i,Q!==null)throw Error(j(261));return ee=null,re=0,Y}function Cp(){for(;Q!==null;)rd(Q)}function Ep(){for(;Q!==null&&!Zd();)rd(Q)}function rd(e){var t=sd(e.alternate,e,xe);e.memoizedProps=e.pendingProps,t===null?id(e):Q=t,As.current=null}function id(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Sp(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Y=6,Q=null;return}}else if(n=yp(n,t,xe),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);Y===0&&(Y=5)}function Ct(e,t,n){var i=L,l=Ee.transition;try{Ee.transition=null,L=1,kp(e,t,n,i)}finally{Ee.transition=l,L=i}return null}function kp(e,t,n,i){do rn();while(ut!==null);if($&6)throw Error(j(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(j(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(oc(e,s),e===ee&&(Q=ee=null,re=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||wr||(wr=!0,ad(br,function(){return rn(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Ee.transition,Ee.transition=null;var a=L;L=1;var o=$;$|=4,As.current=null,Np(e,n),Zu(n,e),qc(jl),Ur=!!Sl,jl=Sl=null,e.current=n,wp(n),Jd(),$=o,L=a,Ee.transition=s}else e.current=n;if(wr&&(wr=!1,ut=e,ii=l),s=e.pendingLanes,s===0&&(ft=null),nc(n.stateNode),ge(e,G()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],i(l.value,{componentStack:l.stack,digest:l.digest});if(ri)throw ri=!1,e=Fl,Fl=null,e;return ii&1&&e.tag!==0&&rn(),s=e.pendingLanes,s&1?e===Ul?Ln++:(Ln=0,Ul=e):Ln=0,Nt(),null}function rn(){if(ut!==null){var e=Po(ii),t=Ee.transition,n=L;try{if(Ee.transition=null,L=16>e?16:e,ut===null)var i=!1;else{if(e=ut,ut=null,ii=0,$&6)throw Error(j(331));var l=$;for($|=4,w=e.current;w!==null;){var s=w,a=s.child;if(w.flags&16){var o=s.deletions;if(o!==null){for(var u=0;u<o.length;u++){var c=o[u];for(w=c;w!==null;){var v=w;switch(v.tag){case 0:case 11:case 15:Mn(8,v,s)}var x=v.child;if(x!==null)x.return=v,w=x;else for(;w!==null;){v=w;var g=v.sibling,y=v.return;if(Ku(v),v===c){w=null;break}if(g!==null){g.return=y,w=g;break}w=y}}}var d=s.alternate;if(d!==null){var f=d.child;if(f!==null){d.child=null;do{var k=f.sibling;f.sibling=null,f=k}while(f!==null)}}w=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,w=a;else e:for(;w!==null;){if(s=w,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Mn(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,w=h;break e}w=s.return}}var p=e.current;for(w=p;w!==null;){a=w;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,w=m;else e:for(a=p;w!==null;){if(o=w,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:vi(9,o)}}catch(N){H(o,o.return,N)}if(o===a){w=null;break e}var S=o.sibling;if(S!==null){S.return=o.return,w=S;break e}w=o.return}}if($=l,Nt(),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(oi,e)}catch{}i=!0}return i}finally{L=n,Ee.transition=t}}return!1}function qa(e,t,n){t=dn(n,t),t=Pu(e,t,1),e=mt(e,t,1),t=de(),e!==null&&(tr(e,1,t),ge(e,t))}function H(e,t,n){if(e.tag===3)qa(e,e,n);else for(;t!==null;){if(t.tag===3){qa(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ft===null||!ft.has(i))){e=dn(n,e),e=Bu(t,e,1),t=mt(t,e,1),e=de(),t!==null&&(tr(t,1,e),ge(t,e));break}}t=t.return}}function Ip(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),t=de(),e.pingedLanes|=e.suspendedLanes&n,ee===e&&(re&n)===n&&(Y===4||Y===3&&(re&130023424)===re&&500>G()-Ds?At(e,0):Rs|=n),ge(e,t)}function ld(e,t){t===0&&(e.mode&1?(t=hr,hr<<=1,!(hr&130023424)&&(hr=4194304)):t=1);var n=de();e=et(e,t),e!==null&&(tr(e,t,n),ge(e,n))}function Ap(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ld(e,n)}function Rp(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(j(314))}i!==null&&i.delete(t),ld(e,n)}var sd;sd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||fe.current)me=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return me=!1,xp(e,t,n);me=!!(e.flags&131072)}else me=!1,b&&t.flags&1048576&&du(t,Kr,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;Mr(e,t),e=t.pendingProps;var l=sn(t,oe.current);nn(t,n),l=Ts(null,t,i,e,l,n);var s=Cs();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ve(i)?(s=!0,Qr(t)):s=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Ss(t),l.updater=fi,t.stateNode=l,l._reactInternals=t,Al(t,i,e,n),t=Ml(null,t,i,!0,s,n)):(t.tag=0,b&&s&&hs(t),ue(null,t,l,n),t=t.child),t;case 16:i=t.elementType;e:{switch(Mr(e,t),e=t.pendingProps,l=i._init,i=l(i._payload),t.type=i,l=t.tag=Mp(i),e=Re(i,e),l){case 0:t=Dl(null,t,i,e,n);break e;case 1:t=Pa(null,t,i,e,n);break e;case 11:t=Oa(null,t,i,e,n);break e;case 14:t=za(null,t,i,Re(i.type,e),n);break e}throw Error(j(306,i,""))}return t;case 0:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:Re(i,l),Dl(e,t,i,l,n);case 1:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:Re(i,l),Pa(e,t,i,l,n);case 3:e:{if(Wu(t),e===null)throw Error(j(387));i=t.pendingProps,s=t.memoizedState,l=s.element,vu(e,t),Zr(t,i,null,n);var a=t.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){l=dn(Error(j(423)),t),t=Ba(e,t,i,n,l);break e}else if(i!==l){l=dn(Error(j(424)),t),t=Ba(e,t,i,n,l);break e}else for(ye=ht(t.stateNode.containerInfo.firstChild),Se=t,b=!0,Me=null,n=mu(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(an(),i===l){t=tt(e,t,n);break e}ue(e,t,i,n)}t=t.child}return t;case 5:return gu(t),e===null&&El(t),i=t.type,l=t.pendingProps,s=e!==null?e.memoizedProps:null,a=l.children,Nl(i,l)?a=null:s!==null&&Nl(i,s)&&(t.flags|=32),Uu(e,t),ue(e,t,a,n),t.child;case 6:return e===null&&El(t),null;case 13:return Hu(e,t,n);case 4:return js(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=on(t,null,i,n):ue(e,t,i,n),t.child;case 11:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:Re(i,l),Oa(e,t,i,l,n);case 7:return ue(e,t,t.pendingProps,n),t.child;case 8:return ue(e,t,t.pendingProps.children,n),t.child;case 12:return ue(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(i=t.type._context,l=t.pendingProps,s=t.memoizedProps,a=l.value,O(Yr,i._currentValue),i._currentValue=a,s!==null)if(Oe(s.value,a)){if(s.children===l.children&&!fe.current){t=tt(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var u=o.firstContext;u!==null;){if(u.context===i){if(s.tag===1){u=Xe(-1,n&-n),u.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var v=c.pending;v===null?u.next=u:(u.next=v.next,v.next=u),c.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),kl(s.return,n,t),o.lanes|=n;break}u=u.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(j(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),kl(a,n,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}ue(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,i=t.pendingProps.children,nn(t,n),l=ke(l),i=i(l),t.flags|=1,ue(e,t,i,n),t.child;case 14:return i=t.type,l=Re(i,t.pendingProps),l=Re(i.type,l),za(e,t,i,l,n);case 15:return bu(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,l=t.pendingProps,l=t.elementType===i?l:Re(i,l),Mr(e,t),t.tag=1,ve(i)?(e=!0,Qr(t)):e=!1,nn(t,n),zu(t,i,l),Al(t,i,l,n),Ml(null,t,i,!0,e,n);case 19:return Vu(e,t,n);case 22:return Fu(e,t,n)}throw Error(j(156,t.tag))};function ad(e,t){return $o(e,t)}function Dp(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ce(e,t,n,i){return new Dp(e,t,n,i)}function Os(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mp(e){if(typeof e=="function")return Os(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ts)return 11;if(e===ns)return 14}return 2}function gt(e,t){var n=e.alternate;return n===null?(n=Ce(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Or(e,t,n,i,l,s){var a=2;if(i=e,typeof e=="function")Os(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Ft:return Rt(n.children,l,s,t);case es:a=8,l|=8;break;case el:return e=Ce(12,n,t,l|2),e.elementType=el,e.lanes=s,e;case tl:return e=Ce(13,n,t,l),e.elementType=tl,e.lanes=s,e;case nl:return e=Ce(19,n,t,l),e.elementType=nl,e.lanes=s,e;case go:return xi(n,l,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case fo:a=10;break e;case vo:a=9;break e;case ts:a=11;break e;case ns:a=14;break e;case it:a=16,i=null;break e}throw Error(j(130,e==null?e:typeof e,""))}return t=Ce(a,n,t,l),t.elementType=e,t.type=i,t.lanes=s,t}function Rt(e,t,n,i){return e=Ce(7,e,i,t),e.lanes=n,e}function xi(e,t,n,i){return e=Ce(22,e,i,t),e.elementType=go,e.lanes=n,e.stateNode={isHidden:!1},e}function Yi(e,t,n){return e=Ce(6,e,null,t),e.lanes=n,e}function Xi(e,t,n){return t=Ce(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function $p(e,t,n,i,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ri(0),this.expirationTimes=Ri(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ri(0),this.identifierPrefix=i,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function zs(e,t,n,i,l,s,a,o,u){return e=new $p(e,t,n,o,u),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Ce(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ss(s),e}function Lp(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:bt,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}function od(e){if(!e)return yt;e=e._reactInternals;e:{if(Pt(e)!==e||e.tag!==1)throw Error(j(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(j(171))}if(e.tag===1){var n=e.type;if(ve(n))return ou(e,n,t)}return t}function ud(e,t,n,i,l,s,a,o,u){return e=zs(n,i,!0,e,l,s,a,o,u),e.context=od(null),n=e.current,i=de(),l=vt(n),s=Xe(i,l),s.callback=t??null,mt(n,s,l),e.current.lanes=l,tr(e,l,i),ge(e,i),e}function yi(e,t,n,i){var l=t.current,s=de(),a=vt(l);return n=od(n),t.context===null?t.context=n:t.pendingContext=n,t=Xe(s,a),t.payload={element:e},i=i===void 0?null:i,i!==null&&(t.callback=i),e=mt(l,t,a),e!==null&&(Le(e,l,a,s),Ar(e,l,a)),a}function si(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ka(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ps(e,t){Ka(e,t),(e=e.alternate)&&Ka(e,t)}function Op(){return null}var dd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bs(e){this._internalRoot=e}Si.prototype.render=Bs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));yi(e,t,null,null)};Si.prototype.unmount=Bs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ot(function(){yi(null,e,null,null)}),t[Je]=null}};function Si(e){this._internalRoot=e}Si.prototype.unstable_scheduleHydration=function(e){if(e){var t=Fo();e={blockedOn:null,target:e,priority:t};for(var n=0;n<st.length&&t!==0&&t<st[n].priority;n++);st.splice(n,0,e),n===0&&Wo(e)}};function bs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ji(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ya(){}function zp(e,t,n,i,l){if(l){if(typeof i=="function"){var s=i;i=function(){var c=si(a);s.call(c)}}var a=ud(t,i,e,0,null,!1,!1,"",Ya);return e._reactRootContainer=a,e[Je]=a.current,Vn(e.nodeType===8?e.parentNode:e),Ot(),a}for(;l=e.lastChild;)e.removeChild(l);if(typeof i=="function"){var o=i;i=function(){var c=si(u);o.call(c)}}var u=zs(e,0,!1,null,null,!1,!1,"",Ya);return e._reactRootContainer=u,e[Je]=u.current,Vn(e.nodeType===8?e.parentNode:e),Ot(function(){yi(t,u,n,i)}),u}function Ni(e,t,n,i,l){var s=n._reactRootContainer;if(s){var a=s;if(typeof l=="function"){var o=l;l=function(){var u=si(a);o.call(u)}}yi(t,a,e,l)}else a=zp(n,t,e,l,i);return si(a)}Bo=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Tn(t.pendingLanes);n!==0&&(ls(t,n|1),ge(t,G()),!($&6)&&(cn=G()+500,Nt()))}break;case 13:Ot(function(){var i=et(e,1);if(i!==null){var l=de();Le(i,e,1,l)}}),Ps(e,1)}};ss=function(e){if(e.tag===13){var t=et(e,134217728);if(t!==null){var n=de();Le(t,e,134217728,n)}Ps(e,134217728)}};bo=function(e){if(e.tag===13){var t=vt(e),n=et(e,t);if(n!==null){var i=de();Le(n,e,t,i)}Ps(e,t)}};Fo=function(){return L};Uo=function(e,t){var n=L;try{return L=e,t()}finally{L=n}};pl=function(e,t,n){switch(t){case"input":if(ll(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var l=pi(i);if(!l)throw Error(j(90));yo(i),ll(i,l)}}}break;case"textarea":jo(e,n);break;case"select":t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}};ko=Ms;Io=Ot;var Pp={usingClientEntryPoint:!1,Events:[rr,Vt,pi,Co,Eo,Ms]},Nn={findFiberByHostInstance:Et,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Bp={bundleType:Nn.bundleType,version:Nn.version,rendererPackageName:Nn.rendererPackageName,rendererConfig:Nn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:nt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Do(e),e===null?null:e.stateNode},findFiberByHostInstance:Nn.findFiberByHostInstance||Op,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _r=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_r.isDisabled&&_r.supportsFiber)try{oi=_r.inject(Bp),We=_r}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pp;Ne.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bs(t))throw Error(j(200));return Lp(e,t,null,n)};Ne.createRoot=function(e,t){if(!bs(e))throw Error(j(299));var n=!1,i="",l=dd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=zs(e,1,!1,null,null,n,!1,i,l),e[Je]=t.current,Vn(e.nodeType===8?e.parentNode:e),new Bs(t)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=Do(t),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return Ot(e)};Ne.hydrate=function(e,t,n){if(!ji(t))throw Error(j(200));return Ni(null,e,t,!0,n)};Ne.hydrateRoot=function(e,t,n){if(!bs(e))throw Error(j(405));var i=n!=null&&n.hydratedSources||null,l=!1,s="",a=dd;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=ud(t,null,e,1,n??null,l,!1,s,a),e[Je]=t.current,Vn(e),i)for(e=0;e<i.length;e++)n=i[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Si(t)};Ne.render=function(e,t,n){if(!ji(t))throw Error(j(200));return Ni(null,e,t,!1,n)};Ne.unmountComponentAtNode=function(e){if(!ji(e))throw Error(j(40));return e._reactRootContainer?(Ot(function(){Ni(null,null,e,!1,function(){e._reactRootContainer=null,e[Je]=null})}),!0):!1};Ne.unstable_batchedUpdates=Ms;Ne.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!ji(n))throw Error(j(200));if(e==null||e._reactInternals===void 0)throw Error(j(38));return Ni(e,t,n,!1,i)};Ne.version="18.3.1-next-f1338f8080-20240426";function cd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cd)}catch(e){console.error(e)}}cd(),co.exports=Ne;var bp=co.exports,Xa=bp;Zi.createRoot=Xa.createRoot,Zi.hydrateRoot=Xa.hydrateRoot;function Vl(){return{scriptName:"NewSiteScript",nodes:Array.from({length:6},(e,t)=>({displayName:`구역 ${t+1}`,mapNodeName:`구역 ${t+1}`})),syncNodeDisplayNames:!0,startNodeName:"대기장소",chargingStationName:"충전소",chargingStationMarkerId:1e4,enableMultiStopQueue:!0,enableSingleDestination:!1,enableScenarioMode:!1,multiStopArrivalBehavior:"waitForButton",singleDestinationArrivalBehavior:"waitForButton",scenarioArrivalBehavior:"waitForButton",waitTimeSettings:{waitTimeSeconds:30,allowSkip:!0,allowIncrease:!0,allowDecrease:!0,stepSize:10},autoChargeTrigger:"batteryLow",batteryLowLevel:15,batteryHighLevel:95,afterChargingBehavior:"stayAtCharger",lowBatteryReturn:{enabled:!1,nodeName:""},nightCharging:{enabled:!1,startHour:17,startMinute:30,endHour:9,endMinute:0,autoChargeWhenIdle:!1},audio:{enabled:!1,volume:70,playOnArrival:!0,arrivalSoundFile:"arrival",playOnDriveStart:!1,driveStartSoundFile:"moving",playOnLowBattery:!1,lowBatterySoundFile:"low_battery",playOnBlocked:!1,blockedSoundFile:"blocked"},repeat:{enabled:!0,defaultCount:1,maxCount:99},queue:{maxSize:6},scenarios:[],multiStopCompletionReturn:"",scenarioCompletionReturn:"",singleDestCompletionReturn:"",showScenarioPositionWarning:!1,warningDisplayDuration:3,updateLocationOn:"arrival"}}function Ue(e){return e.enableMultiStopQueue&&e.multiStopArrivalBehavior==="countdown"||e.enableSingleDestination&&e.singleDestinationArrivalBehavior==="countdown"||e.enableScenarioMode&&e.scenarioArrivalBehavior==="countdown"}function On(e){return e.enableMultiStopQueue&&e.multiStopArrivalBehavior==="waitForButton"||e.enableSingleDestination&&e.singleDestinationArrivalBehavior==="waitForButton"||e.enableScenarioMode&&e.scenarioArrivalBehavior==="waitForButton"}function Fp(e){const t=[],n=[];e.scriptName.trim()?/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(e.scriptName)||t.push("스크립트 이름은 영문자, 숫자, 밑줄(_)만 사용할 수 있으며, 숫자로 시작할 수 없습니다."):t.push("스크립트 이름을 입력해주세요."),e.nodes.length===0&&t.push("최소 1개 이상의 노드가 필요합니다.");const i=e.nodes.map((o,u)=>({node:o,index:u})).filter(o=>!o.node.displayName.trim()||!o.node.mapNodeName.trim()).map(o=>o.index+1);i.length>0&&t.push(`노드 ${i.join(", ")}의 이름이 비어있습니다.`);const l=e.nodes.map(o=>o.mapNodeName.trim().toLowerCase()),s=l.filter((o,u)=>l.indexOf(o)!==u);s.length>0&&t.push(`중복된 노드 이름이 있습니다: ${[...new Set(s)].join(", ")}`),e.startNodeName.trim()||t.push("시작 위치 이름을 입력해주세요."),e.chargingStationName.trim()||t.push("충전소 이름을 입력해주세요."),(!Number.isInteger(e.chargingStationMarkerId)||e.chargingStationMarkerId<=0)&&t.push("충전소 마커 ID는 양의 정수여야 합니다."),(e.batteryLowLevel<1||e.batteryLowLevel>100)&&t.push("저배터리 임계값은 1~100 사이여야 합니다."),(e.batteryHighLevel<1||e.batteryHighLevel>100)&&t.push("충전 완료 임계값은 1~100 사이여야 합니다."),e.batteryLowLevel>=e.batteryHighLevel&&n.push("저배터리 임계값이 충전 완료 임계값보다 낮아야 합니다."),!e.enableMultiStopQueue&&!e.enableSingleDestination&&!e.enableScenarioMode&&t.push("최소 하나의 주행 모드를 활성화해야 합니다."),(e.enableMultiStopQueue&&e.multiStopArrivalBehavior==="countdown"||e.enableSingleDestination&&e.singleDestinationArrivalBehavior==="countdown"||e.enableScenarioMode&&e.scenarioArrivalBehavior==="countdown")&&(e.waitTimeSettings.waitTimeSeconds<1&&t.push("대기 시간은 1초 이상이어야 합니다."),(e.waitTimeSettings.allowIncrease||e.waitTimeSettings.allowDecrease)&&e.waitTimeSettings.stepSize<1&&t.push("카운트다운 증감 단위는 1초 이상이어야 합니다.")),e.repeat.enabled&&e.repeat.maxCount<1&&t.push("최대 반복 횟수는 1 이상이어야 합니다."),e.enableScenarioMode&&e.scenarios.length===0&&n.push("시나리오 모드가 활성화되었지만 정의된 시나리오가 없습니다.");for(let o=0;o<e.scenarios.length;o++){const u=e.scenarios[o];u.name.trim()||t.push(`시나리오 ${o+1}의 이름이 비어있습니다.`),u.nodes.length===0&&t.push(`시나리오 "${u.name}"에 노드가 없습니다.`)}if(e.nightCharging.enabled&&((e.nightCharging.startHour<0||e.nightCharging.startHour>23)&&t.push("야간 충전 시작 시간은 0~23 사이여야 합니다."),(e.nightCharging.endHour<0||e.nightCharging.endHour>23)&&t.push("야간 충전 종료 시간은 0~23 사이여야 합니다.")),e.audio.enabled&&(e.audio.volume<0||e.audio.volume>100)&&t.push("오디오 볼륨은 0~100 사이여야 합니다."),e.repeat.enabled&&!e.enableMultiStopQueue&&n.push("반복 기능은 다중 정차 큐 모드에서만 작동합니다. 다중 정차 큐 모드를 활성화하거나 반복 기능을 비활성화하세요."),e.multiStopCompletionReturn&&!e.enableMultiStopQueue&&n.push("다중 정차 완료 후 복귀 위치가 설정되어 있지만 다중 정차 모드가 비활성화되어 있습니다."),e.scenarioCompletionReturn&&!e.enableScenarioMode&&n.push("시나리오 완료 후 복귀 위치가 설정되어 있지만 시나리오 모드가 비활성화되어 있습니다."),e.singleDestCompletionReturn&&!e.enableSingleDestination&&n.push("단일 이동 완료 후 복귀 위치가 설정되어 있지만 단일 이동 모드가 비활성화되어 있습니다."),e.showScenarioPositionWarning&&!e.enableScenarioMode&&n.push("시나리오 위치 경고는 시나리오 모드가 활성화되어야 적용됩니다."),e.showScenarioPositionWarning&&e.enableScenarioMode&&e.scenarios.length>0&&!e.scenarios.some(o=>o.requireStartFrom&&o.requireStartFrom.trim()!=="")&&n.push("시나리오 위치 경고가 활성화되었지만, 시작 위치 제한이 설정된 시나리오가 없습니다."),!e.showScenarioPositionWarning&&e.enableScenarioMode&&e.scenarios.length>0&&e.scenarios.some(o=>o.requireStartFrom&&o.requireStartFrom.trim()!=="")&&n.push("시나리오에 시작 위치 제한이 설정되었지만 경고 표시가 비활성화되어 있습니다. 잘못된 위치에서 시나리오 시작 시 사용자에게 피드백이 표시되지 않습니다."),e.nightCharging.enabled&&e.autoChargeTrigger==="never"&&!e.nightCharging.autoChargeWhenIdle&&n.push("야간 충전 윈도우가 활성화되었지만 자동 충전이 비활성화되어 있습니다. 야간 충전 윈도우는 충전 완료 시 자동 언도킹만 방지합니다."),e.nightCharging.enabled&&e.nightCharging.startHour===e.nightCharging.endHour&&e.nightCharging.startMinute===e.nightCharging.endMinute&&n.push("야간 충전 시작 시간과 종료 시간이 동일합니다. 야간 충전 윈도우가 작동하지 않습니다."),e.lowBatteryReturn.enabled&&!e.lowBatteryReturn.nodeName&&n.push("저배터리 시 복귀 위치가 활성화되었지만 복귀 노드가 선택되지 않았습니다."),e.audio.enabled&&!e.audio.playOnArrival&&!e.audio.playOnDriveStart&&n.push("오디오가 활성화되었지만 재생 이벤트가 선택되지 않았습니다. 오디오가 재생되지 않습니다."),e.enableSingleDestination&&!e.enableMultiStopQueue&&!e.enableScenarioMode&&e.singleDestinationArrivalBehavior==="waitForButton"&&n.push('단일 목적지 모드에서 버튼 대기 설정 시, 도착 후 "도착 확인" 버튼을 눌러야 대기 상태로 전환됩니다.'),e.enableScenarioMode&&e.scenarios.length>0){const o=e.nodes.map(v=>v.mapNodeName.trim().toLowerCase()),u=e.startNodeName.trim().toLowerCase(),c=e.chargingStationName.trim().toLowerCase();for(const v of e.scenarios){const x=v.nodes.filter(g=>{const y=g.trim().toLowerCase();return!o.includes(y)&&y!==u&&y!==c});x.length>0&&n.push(`시나리오 "${v.name}"에 노드 목록에 없는 노드가 있습니다: ${x.join(", ")}`)}}return{valid:t.length===0,errors:t,warnings:n}}function Fs(e){return e.nodes.map(t=>t.displayName)}function Us(e){return e.nodes.map(t=>t.mapNodeName)}const Up=["basic","drivingMode"],Za=["basic","drivingMode","arrival","charging","repeat","nightCharging","audio","scenario","nodes"];function te({text:e,position:t="top",style:n}){return r.jsxs("span",{className:`help-tooltip-wrapper ${t==="bottom"?"tooltip-bottom":""}`,style:n,children:[r.jsx("span",{className:"help-tooltip-icon",children:"?"}),r.jsx("span",{className:"help-tooltip-content",children:e})]})}function Ve({title:e,icon:t,children:n,isOpen:i,onToggle:l}){return r.jsxs("div",{className:"card",children:[r.jsxs("div",{className:"section-header",onClick:l,style:{cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[r.jsxs("h3",{className:"card-title",style:{marginBottom:0},children:[r.jsx("span",{style:{marginRight:"0.5rem"},children:t}),e]}),r.jsx("span",{style:{fontSize:"1.2rem",color:"var(--text-secondary)",display:"inline-block",transform:i?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s ease"},children:"▶"})]}),i&&r.jsx("div",{style:{marginTop:"1rem"},children:n})]})}function Wp({config:e,onChange:t,expandedSections:n,onToggleSection:i}){const l=Fp(e),s=d=>{if(d){const f=e.nodes.map(k=>({...k,displayName:k.mapNodeName}));t({...e,syncNodeDisplayNames:d,nodes:f})}else t({...e,syncNodeDisplayNames:d})},a=(d,f)=>{t({...e,[d]:f})},o=(d,f,k)=>{t({...e,[d]:{...e[d],[f]:k}})},u=(d,f,k)=>{const h=[...e.nodes];e.syncNodeDisplayNames&&f==="mapNodeName"?h[d]={...h[d],displayName:k,mapNodeName:k}:h[d]={...h[d],[f]:k},t({...e,nodes:h})},c=()=>{const d=e.nodes.length+1;t({...e,nodes:[...e.nodes,{displayName:`구역 ${d}`,mapNodeName:`구역 ${d}`}]})},v=d=>{t({...e,nodes:e.nodes.filter((f,k)=>k!==d)})},x=()=>{const d={name:`시나리오 ${e.scenarios.length+1}`,nodes:[]};t({...e,scenarios:[...e.scenarios,d]})},g=d=>{t({...e,scenarios:e.scenarios.filter((f,k)=>k!==d)})},y=(d,f,k)=>{const h=[...e.scenarios];h[d]={...h[d],[f]:k},t({...e,scenarios:h})};return r.jsxs("div",{children:[l.errors.length>0&&r.jsx("div",{className:"validation-message error",children:l.errors.map((d,f)=>r.jsxs("div",{children:["⚠️ ",d]},f))}),l.warnings.length>0&&r.jsx("div",{className:"validation-message warning",children:l.warnings.map((d,f)=>r.jsxs("div",{children:["💡 ",d]},f))}),l.valid&&l.warnings.length===0&&r.jsx("div",{className:"validation-message success",children:"✅ 모든 설정이 올바릅니다."}),r.jsx(Ve,{title:"기본 설정",icon:"📋",isOpen:n.has("basic"),onToggle:()=>i("basic"),children:r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"scriptName",children:"스크립트 이름"}),r.jsx("input",{id:"scriptName",type:"text",value:e.scriptName,onChange:d=>a("scriptName",d.target.value),placeholder:"예: NewSiteScript"}),r.jsx("small",{style:{color:"var(--text-secondary)"},children:"영문, 숫자, 밑줄(_)만 사용 가능"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"startNode",children:"시작 위치 (대기장소)"}),r.jsx("input",{id:"startNode",type:"text",value:e.startNodeName,onChange:d=>a("startNodeName",d.target.value),placeholder:"예: 대기장소"})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"updateLocationOn",children:["위치 업데이트 시점",r.jsx(te,{text:`output_currentRobotLocation 변수가 언제 업데이트되는지 설정합니다.

• 출발 시: 이동 시작할 때 목적지로 설정
• 도착 시: 도착 확인 후 업데이트`,style:{top:"-1px"}})]}),r.jsxs("select",{id:"updateLocationOn",value:e.updateLocationOn,onChange:d=>a("updateLocationOn",d.target.value),children:[r.jsx("option",{value:"arrival",children:"도착 확인 후"}),r.jsx("option",{value:"driveStart",children:"주행 시작 시"})]})]})]})}),r.jsxs(Ve,{title:"주행 모드",icon:"🚗",isOpen:n.has("drivingMode"),onToggle:()=>i("drivingMode"),children:[r.jsx("p",{style:{fontSize:"0.9rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:"사용할 주행 모드를 선택하세요. 여러 모드를 동시에 활성화할 수 있으며, 각 모드는 별도의 대시보드 버튼으로 구분됩니다."}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[r.jsxs("div",{style:{padding:"0.75rem",background:e.enableMultiStopQueue?"rgba(88, 166, 255, 0.1)":"transparent",borderRadius:"8px",border:e.enableMultiStopQueue?"1px solid rgba(88, 166, 255, 0.3)":"1px solid var(--border)"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"0.75rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.enableMultiStopQueue,onChange:d=>a("enableMultiStopQueue",d.target.checked),style:{marginTop:"0.2rem"}}),r.jsxs("div",{children:[r.jsx("span",{style:{fontWeight:500},children:"다중 정차 큐 모드"}),r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginTop:"0.25rem"},children:'목적지를 큐에 추가한 후 "이동 시작" 버튼으로 순차 이동. 반복 기능 지원.'})]})]}),e.enableMultiStopQueue&&r.jsxs("div",{style:{marginTop:"0.75rem",marginLeft:"1.75rem",display:"flex",flexWrap:"wrap",gap:"1rem"},children:[r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"도착 후 동작:"}),r.jsxs("select",{value:e.multiStopArrivalBehavior,onChange:d=>a("multiStopArrivalBehavior",d.target.value),style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem"},children:[r.jsx("option",{value:"waitForButton",children:"버튼 대기"}),r.jsx("option",{value:"countdown",children:"카운트다운"}),r.jsx("option",{value:"autoProceed",children:"즉시 진행"})]})]}),e.multiStopArrivalBehavior==="countdown"&&r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"대기 시간(초):"}),r.jsx("input",{type:"number",min:1,defaultValue:e.waitTimeSettings.multiStopWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||30);d.target.value=String(f),a("waitTimeSettings",{...e.waitTimeSettings,multiStopWaitTimeSeconds:f})},style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem",width:"60px"}})]}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"작업 완료 후 복귀:"}),r.jsxs("select",{value:e.multiStopCompletionReturn,onChange:d=>a("multiStopCompletionReturn",d.target.value),style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem"},children:[r.jsx("option",{value:"",children:"제자리 (이동 안함)"}),r.jsxs("option",{value:e.startNodeName,children:[e.startNodeName," (시작)"]}),r.jsxs("option",{value:e.chargingStationName,children:[e.chargingStationName," (충전)"]}),e.nodes.map((d,f)=>r.jsx("option",{value:d.mapNodeName,children:d.displayName||d.mapNodeName},f))]})]}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"경유지 추가 최대 큐 크기:"}),r.jsx("input",{type:"number",min:1,max:99,defaultValue:e.queue.maxSize,onBlur:d=>{const f=Math.min(99,Math.max(1,parseInt(d.target.value)||6));d.target.value=String(f),a("queue",{maxSize:f})},style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem",width:"60px"}})]})]})]}),r.jsxs("div",{style:{padding:"0.75rem",background:e.enableSingleDestination?"rgba(63, 185, 80, 0.1)":"transparent",borderRadius:"8px",border:e.enableSingleDestination?"1px solid rgba(63, 185, 80, 0.3)":"1px solid var(--border)"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"0.75rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.enableSingleDestination,onChange:d=>a("enableSingleDestination",d.target.checked),style:{marginTop:"0.2rem"}}),r.jsxs("div",{children:[r.jsx("span",{style:{fontWeight:500},children:"단일 목적지 모드"}),r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginTop:"0.25rem"},children:"버튼 클릭 즉시 해당 노드로 이동 시작. 빠른 단일 이동에 적합."})]})]}),e.enableSingleDestination&&r.jsxs("div",{style:{marginTop:"0.75rem",marginLeft:"1.75rem",display:"flex",flexWrap:"wrap",gap:"1rem"},children:[r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"도착 후 동작:"}),r.jsxs("select",{value:e.singleDestinationArrivalBehavior,onChange:d=>a("singleDestinationArrivalBehavior",d.target.value),style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem"},children:[r.jsx("option",{value:"waitForButton",children:"버튼 대기"}),r.jsx("option",{value:"countdown",children:"카운트다운"}),r.jsx("option",{value:"autoProceed",children:"즉시 진행"})]})]}),e.singleDestinationArrivalBehavior==="countdown"&&r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"대기 시간(초):"}),r.jsx("input",{type:"number",min:1,defaultValue:e.waitTimeSettings.singleDestWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||30);d.target.value=String(f),a("waitTimeSettings",{...e.waitTimeSettings,singleDestWaitTimeSeconds:f})},style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem",width:"60px"}})]}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"작업 완료 후 복귀:"}),r.jsxs("select",{value:e.singleDestCompletionReturn,onChange:d=>a("singleDestCompletionReturn",d.target.value),style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem"},children:[r.jsx("option",{value:"",children:"제자리 (이동 안함)"}),r.jsxs("option",{value:e.startNodeName,children:[e.startNodeName," (시작)"]}),r.jsxs("option",{value:e.chargingStationName,children:[e.chargingStationName," (충전)"]}),e.nodes.map((d,f)=>r.jsx("option",{value:d.mapNodeName,children:d.displayName||d.mapNodeName},f))]})]})]})]}),r.jsxs("div",{style:{padding:"0.75rem",background:e.enableScenarioMode?"rgba(192, 132, 252, 0.15)":"transparent",borderRadius:"8px",border:e.enableScenarioMode?"1px solid rgba(192, 132, 252, 0.4)":"1px solid var(--border)"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"0.75rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.enableScenarioMode,onChange:d=>a("enableScenarioMode",d.target.checked),style:{marginTop:"0.2rem"}}),r.jsxs("div",{children:[r.jsx("span",{style:{fontWeight:500},children:"시나리오 모드"}),r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginTop:"0.25rem"},children:"미리 정의된 경로를 버튼 하나로 실행. 정해진 순회 경로에 적합."})]})]}),e.enableScenarioMode&&r.jsxs("div",{style:{marginTop:"0.75rem",marginLeft:"1.75rem",display:"flex",flexWrap:"wrap",gap:"1rem"},children:[r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"도착 후 동작:"}),r.jsxs("select",{value:e.scenarioArrivalBehavior,onChange:d=>a("scenarioArrivalBehavior",d.target.value),style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem"},children:[r.jsx("option",{value:"waitForButton",children:"버튼 대기"}),r.jsx("option",{value:"countdown",children:"카운트다운"}),r.jsx("option",{value:"autoProceed",children:"즉시 진행"})]})]}),e.scenarioArrivalBehavior==="countdown"&&r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"대기 시간(초):"}),r.jsx("input",{type:"number",min:1,defaultValue:e.waitTimeSettings.scenarioWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||30);d.target.value=String(f),a("waitTimeSettings",{...e.waitTimeSettings,scenarioWaitTimeSeconds:f})},style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem",width:"60px"}})]}),r.jsxs("div",{children:[r.jsx("label",{style:{fontSize:"0.85rem",color:"var(--text-secondary)"},children:"작업 완료 후 복귀:"}),r.jsxs("select",{value:e.scenarioCompletionReturn,onChange:d=>a("scenarioCompletionReturn",d.target.value),style:{marginLeft:"0.5rem",padding:"0.25rem 0.5rem",fontSize:"0.85rem"},children:[r.jsx("option",{value:"",children:"제자리 (이동 안함)"}),r.jsxs("option",{value:e.startNodeName,children:[e.startNodeName," (시작)"]}),r.jsxs("option",{value:e.chargingStationName,children:[e.chargingStationName," (충전)"]}),e.nodes.map((d,f)=>r.jsx("option",{value:d.mapNodeName,children:d.displayName||d.mapNodeName},f))]})]})]})]})]})]}),Ue(e)&&r.jsxs(Ve,{title:"카운트다운 설정",icon:"⏱️",isOpen:n.has("arrival"),onToggle:()=>i("arrival"),children:[r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:"각 주행 모드별 대기 시간은 해당 모드 설정에서 개별 지정됩니다. 아래는 공통 설정입니다."}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"stepSize",children:["조절 단위 (초)",r.jsx(te,{text:`대시보드에서 '시간+' 또는 '시간-' 버튼을 눌렀을 때 카운트다운 시간이 증가/감소하는 단위입니다.

예: 조절 단위가 10초이면, 시간+ 버튼 클릭 시 남은 시간이 10초씩 증가합니다.`,style:{top:"-1px"}})]}),r.jsx("input",{id:"stepSize",type:"number",min:"1",defaultValue:e.waitTimeSettings.stepSize,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||10);d.target.value=String(f),o("waitTimeSettings","stepSize",f)}})]}),r.jsx("div",{className:"form-group full-width",children:r.jsxs("div",{style:{display:"flex",gap:"1.5rem",flexWrap:"wrap"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.waitTimeSettings.allowSkip,onChange:d=>o("waitTimeSettings","allowSkip",d.target.checked)}),"대기 스킵 허용"]}),r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.waitTimeSettings.allowIncrease,onChange:d=>o("waitTimeSettings","allowIncrease",d.target.checked)}),"시간 증가 버튼"]}),r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.waitTimeSettings.allowDecrease,onChange:d=>o("waitTimeSettings","allowDecrease",d.target.checked)}),"시간 감소 버튼"]})]})})]})]}),r.jsxs(Ve,{title:"충전 설정",icon:"🔋",isOpen:n.has("charging"),onToggle:()=>i("charging"),children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"chargingName",children:"충전소 노드 이름"}),r.jsx("input",{id:"chargingName",type:"text",value:e.chargingStationName,onChange:d=>a("chargingStationName",d.target.value),placeholder:"예: 충전소"})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"chargingMarker",children:["충전소 마커 ID",r.jsx(te,{text:"충전 스테이션에 부착된 AruCo 마커의 고유 ID입니다. 로봇이 도킹할 때 이 마커를 인식합니다.",style:{top:"-2px"}})]}),r.jsx("input",{id:"chargingMarker",type:"number",defaultValue:e.chargingStationMarkerId,onBlur:d=>{const f=parseInt(d.target.value)||0;d.target.value=String(f),a("chargingStationMarkerId",f)},placeholder:"예: 10056"})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"batteryLow",children:["저배터리 임계값 (%)",r.jsx(te,{text:"배터리가 이 수치 이하로 떨어지면 저배터리 상태로 간주됩니다. 자동 충전이 활성화된 경우 충전소로 이동합니다.",style:{top:"-2px"}})]}),r.jsx("input",{id:"batteryLow",type:"number",min:"1",max:"100",defaultValue:e.batteryLowLevel,onBlur:d=>{const f=Math.min(100,Math.max(1,parseInt(d.target.value)||15));d.target.value=String(f),a("batteryLowLevel",f)}}),r.jsx("small",{style:{color:"var(--text-secondary)"},children:"이 값 이하일 때 자동 충전"})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"batteryHigh",children:["충전 완료 임계값 (%)",r.jsx(te,{text:"배터리가 이 수치 이상이 되면 충전이 완료된 것으로 간주됩니다. 충전 완료 후 동작 설정에 따라 다음 행동을 수행합니다.",style:{top:"-2px"}})]}),r.jsx("input",{id:"batteryHigh",type:"number",min:"1",max:"100",defaultValue:e.batteryHighLevel,onBlur:d=>{const f=Math.min(100,Math.max(1,parseInt(d.target.value)||95));d.target.value=String(f),a("batteryHighLevel",f)}}),r.jsx("small",{style:{color:"var(--text-secondary)"},children:"이 값 이상이면 충전 완료"})]})]}),r.jsxs("div",{className:"form-grid",style:{marginTop:"1rem"},children:[r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"autoChargeTrigger",children:["자동 충전 조건",r.jsx(te,{text:`언제 자동으로 충전소로 이동할지 설정합니다.

• 대기 중 저배터리: 대기 상태에서 배터리 부족 시 자동 충전
• 수동만: 사용자가 직접 충전 버튼 눌러야 함`,style:{top:"-1px"}})]}),r.jsxs("select",{id:"autoChargeTrigger",value:e.autoChargeTrigger,onChange:d=>a("autoChargeTrigger",d.target.value),children:[r.jsx("option",{value:"batteryLow",children:"대기 중 배터리 부족 시"}),r.jsx("option",{value:"never",children:"자동 충전 안함 (수동만)"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{htmlFor:"afterCharging",children:["충전 완료 후 동작",r.jsx(te,{text:`충전이 완료된 후 로봇의 행동입니다.

• 충전소 대기: 도킹된 상태 유지
• 시작 위치 복귀: 자동으로 대기 장소로 이동
• 언도킹 후 대기: 충전소에서 나온 뒤 그 자리 대기`,style:{top:"-1px"}})]}),r.jsxs("select",{id:"afterCharging",value:e.afterChargingBehavior,onChange:d=>a("afterChargingBehavior",d.target.value),children:[r.jsx("option",{value:"stayAtCharger",children:"충전소에 대기 (언도킹 안함)"}),r.jsx("option",{value:"returnToStart",children:"시작 위치로 자동 복귀"}),r.jsx("option",{value:"goToIdle",children:"언도킹 후 제자리 대기"})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[r.jsx("input",{type:"checkbox",checked:e.lowBatteryReturn.enabled,onChange:d=>a("lowBatteryReturn",{...e.lowBatteryReturn,enabled:d.target.checked})}),r.jsxs("span",{children:["저배터리 시 복귀",r.jsx(te,{text:`활성화 시, 배터리가 낮을 때 자동 충전 대신 지정된 위치로 이동합니다.
이 설정은 자동 충전 설정을 덮어씁니다.`,style:{top:"-1px",left:"2px"}})]})]}),e.lowBatteryReturn.enabled&&r.jsxs("select",{value:e.lowBatteryReturn.nodeName,onChange:d=>a("lowBatteryReturn",{...e.lowBatteryReturn,nodeName:d.target.value}),children:[r.jsx("option",{value:"",children:"-- 복귀 노드 선택 --"}),r.jsxs("option",{value:e.startNodeName,children:[e.startNodeName," (시작 위치)"]}),e.nodes.map((d,f)=>r.jsx("option",{value:d.mapNodeName,children:d.displayName||d.mapNodeName},f))]})]})]})]}),r.jsxs(Ve,{title:"반복 설정",icon:"🔄",isOpen:n.has("repeat"),onToggle:()=>i("repeat"),children:[r.jsx("div",{style:{marginBottom:"1rem"},children:r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.repeat.enabled,onChange:d=>o("repeat","enabled",d.target.checked)}),r.jsx("span",{style:{fontWeight:500},children:"반복 기능 활성화"})]})}),e.repeat.enabled&&r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"defaultRepeat",children:"기본 반복 횟수"}),r.jsx("input",{id:"defaultRepeat",type:"number",min:"1",defaultValue:e.repeat.defaultCount,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||1);d.target.value=String(f),o("repeat","defaultCount",f)}})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"maxRepeat",children:"최대 반복 횟수"}),r.jsx("input",{id:"maxRepeat",type:"number",min:"1",defaultValue:e.repeat.maxCount,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||99);d.target.value=String(f),o("repeat","maxCount",f)}})]})]})]}),r.jsxs(Ve,{title:"야간 충전 설정",icon:"🌙",isOpen:n.has("nightCharging"),onToggle:()=>i("nightCharging"),children:[r.jsx("div",{style:{marginBottom:"1rem"},children:r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.nightCharging.enabled,onChange:d=>o("nightCharging","enabled",d.target.checked)}),r.jsx("span",{style:{fontWeight:500},children:"야간 충전 윈도우 활성화"}),r.jsx(te,{text:"특정 시간대에 충전 완료 시 자동 언도킹을 방지합니다. 이 시간대에 로봇이 충전 중이면 배터리가 가득 차도 자동으로 출발하지 않고 충전소에 머뭅니다. 수동 주행 명령(버튼)은 여전히 작동합니다.",style:{top:"1px",marginLeft:"0.1rem"}})]})}),e.nightCharging.enabled&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"시작 시간"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[r.jsx("input",{type:"number",min:"0",max:"23",defaultValue:e.nightCharging.startHour,onBlur:d=>{const f=Math.min(23,Math.max(0,parseInt(d.target.value)||0));d.target.value=String(f),o("nightCharging","startHour",f)},style:{width:"70px"}}),r.jsx("span",{style:{alignSelf:"center"},children:":"}),r.jsx("input",{type:"number",min:"0",max:"59",defaultValue:e.nightCharging.startMinute,onBlur:d=>{const f=Math.min(59,Math.max(0,parseInt(d.target.value)||0));d.target.value=String(f),o("nightCharging","startMinute",f)},style:{width:"70px"}})]})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"종료 시간"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[r.jsx("input",{type:"number",min:"0",max:"23",defaultValue:e.nightCharging.endHour,onBlur:d=>{const f=Math.min(23,Math.max(0,parseInt(d.target.value)||0));d.target.value=String(f),o("nightCharging","endHour",f)},style:{width:"70px"}}),r.jsx("span",{style:{alignSelf:"center"},children:":"}),r.jsx("input",{type:"number",min:"0",max:"59",defaultValue:e.nightCharging.endMinute,onBlur:d=>{const f=Math.min(59,Math.max(0,parseInt(d.target.value)||0));d.target.value=String(f),o("nightCharging","endMinute",f)},style:{width:"70px"}})]})]})]}),r.jsx("div",{style:{marginTop:"1rem"},children:r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.nightCharging.autoChargeWhenIdle,onChange:d=>o("nightCharging","autoChargeWhenIdle",d.target.checked)}),r.jsx("span",{style:{fontWeight:500},children:"대기 중 자동 충전"}),r.jsx(te,{text:"야간 충전 윈도우 시간대에 로봇이 대기 중(IDLE) 상태이면 자동으로 충전소로 이동합니다.",style:{top:"-1px"}})]})})]})]}),r.jsxs(Ve,{title:"오디오 설정",icon:"🔊",isOpen:n.has("audio"),onToggle:()=>i("audio"),children:[r.jsx("div",{style:{marginBottom:"1rem"},children:r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.audio.enabled,onChange:d=>o("audio","enabled",d.target.checked)}),r.jsx("span",{style:{fontWeight:500},children:"오디오 피드백 활성화"}),r.jsx(te,{text:`오디오 파일(.mp3)은 TCS 리소스관리 > resource > audio 폴더에 배치해야 합니다.

⚠️ 필수 파일: silent.mp3 (오디오 중지/초기화용)

파일명 입력 시 .mp3 확장자는 제외합니다.`,style:{top:"-1px"}})]})}),e.audio.enabled&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"form-group",style:{marginBottom:"1rem",maxWidth:"200px"},children:[r.jsx("label",{htmlFor:"audioVolume",children:"볼륨 (0-100)"}),r.jsx("input",{id:"audioVolume",type:"number",min:"0",max:"100",defaultValue:e.audio.volume,onBlur:d=>{const f=Math.min(100,Math.max(0,parseInt(d.target.value)||70));d.target.value=String(f),o("audio","volume",f)}})]}),r.jsx("p",{style:{color:"var(--text-secondary)",marginBottom:"1rem",fontSize:"0.85rem"},children:"각 이벤트별로 재생할 오디오 파일을 설정합니다. 파일명만 입력하세요 (.mp3 제외)."}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"0.75rem",flexWrap:"wrap"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer",minWidth:"180px"},children:[r.jsx("input",{type:"checkbox",checked:e.audio.playOnArrival,onChange:d=>o("audio","playOnArrival",d.target.checked)}),"도착 시 사운드 재생"]}),e.audio.playOnArrival&&r.jsx("input",{type:"text",value:e.audio.arrivalSoundFile,onChange:d=>o("audio","arrivalSoundFile",d.target.value),placeholder:"예: arrival",style:{flex:1,minWidth:"150px",maxWidth:"200px",background:"var(--bg-dark)"}})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"0.75rem",flexWrap:"wrap"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer",minWidth:"180px"},children:[r.jsx("input",{type:"checkbox",checked:e.audio.playOnDriveStart,onChange:d=>o("audio","playOnDriveStart",d.target.checked)}),"주행 중 오디오 (무한 반복)"]}),e.audio.playOnDriveStart&&r.jsx("input",{type:"text",value:e.audio.driveStartSoundFile,onChange:d=>o("audio","driveStartSoundFile",d.target.value),placeholder:"예: moving",style:{flex:1,minWidth:"150px",maxWidth:"200px",background:"var(--bg-dark)"}})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"0.75rem",flexWrap:"wrap"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer",minWidth:"180px"},children:[r.jsx("input",{type:"checkbox",checked:e.audio.playOnLowBattery,onChange:d=>o("audio","playOnLowBattery",d.target.checked)}),"저배터리 경고 사운드"]}),e.audio.playOnLowBattery&&r.jsx("input",{type:"text",value:e.audio.lowBatterySoundFile,onChange:d=>o("audio","lowBatterySoundFile",d.target.value),placeholder:"예: low_battery",style:{flex:1,minWidth:"150px",maxWidth:"200px",background:"var(--bg-dark)"}})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"0.75rem",flexWrap:"wrap"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer",minWidth:"180px"},children:[r.jsx("input",{type:"checkbox",checked:e.audio.playOnBlocked,onChange:d=>o("audio","playOnBlocked",d.target.checked)}),"장애물 감지 (무한 반복)"]}),e.audio.playOnBlocked&&r.jsx("input",{type:"text",value:e.audio.blockedSoundFile,onChange:d=>o("audio","blockedSoundFile",d.target.value),placeholder:"예: blocked",style:{flex:1,minWidth:"150px",maxWidth:"200px",background:"var(--bg-dark)"}})]})]})]}),e.enableScenarioMode&&r.jsxs(Ve,{title:"시나리오 설정",icon:"📍",isOpen:n.has("scenario"),onToggle:()=>i("scenario"),children:[r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"},children:[r.jsx("input",{type:"checkbox",checked:e.showScenarioPositionWarning,onChange:d=>a("showScenarioPositionWarning",d.target.checked)}),r.jsxs("div",{children:[r.jsx("span",{style:{fontWeight:500},children:"시나리오 위치 경고 표시"}),r.jsx(te,{text:"시나리오에 시작 위치 제한이 설정되어 있고, 로봇이 해당 위치에 없을 때 경고 이미지를 표시합니다. 대시보드에 '변수 조건별 리소스 표시' 위젯을 배치해야 합니다.",style:{top:"-1px"}}),r.jsx("small",{style:{display:"block",color:"var(--text-secondary)",marginTop:"0.25rem"},children:"잘못된 위치에서 시나리오 시작 시 경고 이미지 표시"})]})]}),e.showScenarioPositionWarning&&r.jsxs("div",{className:"form-group",style:{marginLeft:"1.5rem",marginTop:"0.5rem"},children:[r.jsx("label",{children:"경고 표시 시간 (초)"}),r.jsx("input",{type:"number",min:"1",defaultValue:e.warningDisplayDuration,onBlur:d=>{const f=Math.max(1,parseInt(d.target.value)||3);d.target.value=String(f),a("warningDisplayDuration",f)},style:{width:"100px"}})]})]}),e.scenarios.map((d,f)=>r.jsxs("div",{style:{background:"var(--bg-input)",padding:"1rem",borderRadius:"8px",marginBottom:"1rem"},children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"0.75rem"},children:[r.jsxs("strong",{children:["시나리오 ",f+1]}),r.jsx("button",{type:"button",className:"btn btn-outline-danger",onClick:()=>g(f),style:{padding:"0.25rem 0.6rem",fontSize:"0.8rem"},children:"삭제"})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{children:"시나리오 이름"}),r.jsx("input",{type:"text",value:d.name,onChange:k=>y(f,"name",k.target.value),placeholder:"예: 오전 순회"})]}),r.jsxs("div",{className:"form-group",children:[r.jsxs("label",{children:["시작 위치 제한 (선택)",r.jsx(te,{text:"이 시나리오를 시작하기 위해 로봇이 있어야 하는 특정 위치입니다. 비워두면 어느 위치에서든 시작 가능합니다. 예: 특정 시나리오는 '충전소'에서만 시작하도록 제한",style:{top:"-1px"}})]}),r.jsxs("select",{value:d.requireStartFrom||"",onChange:k=>y(f,"requireStartFrom",k.target.value),style:{background:"var(--bg-dark)"},children:[r.jsx("option",{value:"",children:"제한 없음"}),r.jsx("optgroup",{label:"목적지 노드",children:e.nodes.map((k,h)=>r.jsx("option",{value:k.displayName,children:k.displayName},`start-node-${h}`))}),r.jsxs("optgroup",{label:"특수 위치",children:[r.jsxs("option",{value:e.startNodeName,children:["🏠 ",e.startNodeName," (시작 위치)"]}),r.jsxs("option",{value:e.chargingStationName,children:["🔋 ",e.chargingStationName," (충전소)"]})]})]})]})]}),r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsxs("label",{style:{display:"block",marginBottom:"0.5rem",fontWeight:500},children:["경유 노드 목록",r.jsx(te,{text:"시나리오 실행 시 로봇이 순서대로 방문할 노드 목록입니다. 위에서 아래로 순서대로 이동합니다.",style:{top:"-1px"}})]}),d.nodes.map((k,h)=>r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.5rem"},children:[r.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem",minWidth:"24px"},children:[h+1,"."]}),r.jsxs("select",{value:k,onChange:p=>{const m=[...d.nodes];m[h]=p.target.value,y(f,"nodes",m)},style:{flex:1,background:"var(--bg-dark)"},children:[r.jsx("option",{value:"",children:"-- 노드 선택 --"}),r.jsx("optgroup",{label:"목적지 노드",children:e.nodes.map((p,m)=>r.jsx("option",{value:p.displayName,children:p.displayName},`node-${m}`))}),r.jsxs("optgroup",{label:"특수 위치",children:[r.jsxs("option",{value:e.startNodeName,children:["🏠 ",e.startNodeName," (시작 위치)"]}),r.jsxs("option",{value:e.chargingStationName,children:["🔋 ",e.chargingStationName," (충전소)"]})]})]}),r.jsx("button",{type:"button",onClick:()=>{const p=d.nodes.filter((m,S)=>S!==h);y(f,"nodes",p)},style:{background:"transparent",color:"var(--error)",border:"none",cursor:"pointer",fontSize:"1.2rem",padding:"0 0.25rem"},title:"노드 삭제",children:"×"})]},h)),r.jsx("button",{type:"button",onClick:()=>{const k=[...d.nodes,""];y(f,"nodes",k)},style:{background:"transparent",color:"var(--accent)",border:"1px dashed var(--border)",padding:"0.4rem 0.75rem",borderRadius:"4px",cursor:"pointer",fontSize:"0.85rem",marginTop:"0.25rem"},children:"+ 노드 추가"})]})]},f)),r.jsx("button",{type:"button",className:"btn btn-outline",onClick:x,style:{marginTop:"0.5rem"},children:"+ 시나리오 추가"})]}),r.jsxs(Ve,{title:"목적지 노드 설정",icon:"📍",isOpen:n.has("nodes"),onToggle:()=>i("nodes"),children:[r.jsx("p",{style:{color:"var(--text-secondary)",marginBottom:"1rem",fontSize:"0.9rem"},children:"대시보드 버튼에 표시될 목적지입니다. 표시 이름과 맵 노드 이름이 다를 수 있습니다."}),r.jsxs("label",{className:"checkbox-label",style:{marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.5rem"},children:[r.jsx("div",{className:`toggle-switch ${e.syncNodeDisplayNames?"active":""}`,onClick:()=>s(!e.syncNodeDisplayNames),style:{width:"40px",height:"22px",borderRadius:"11px",background:e.syncNodeDisplayNames?"var(--accent)":"var(--border)",position:"relative",cursor:"pointer",transition:"background 0.2s ease"},children:r.jsx("div",{style:{position:"absolute",top:"2px",left:e.syncNodeDisplayNames?"20px":"2px",width:"18px",height:"18px",borderRadius:"50%",background:"white",transition:"left 0.2s ease",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}})}),r.jsx("span",{style:{fontWeight:500},children:"표시 이름 = 맵 노드 이름"}),r.jsx(te,{text:`활성화: 표시 이름 = 맵 노드 이름 (동일)
비활성화: 표시 이름을 별도로 지정

맵에서 특수문자(~, /, 등)를 사용할 수 없지만 대시보드에는 표시하고 싶을 때 비활성화하세요.
예: 맵 노드 이름 '2' → 표시 이름 '2~3'

표시 이름: 대시보드에 표시 (output_currentRobotLocation 등)
맵 노드 이름: 실제 경로주행에 사용`,style:{top:"1px",marginLeft:"0.15rem"}})]}),r.jsx("div",{style:{overflowX:"auto"},children:r.jsxs("table",{className:"mapping-table",style:{marginBottom:"1rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{width:"50px"},children:"#"}),!e.syncNodeDisplayNames&&r.jsxs("th",{children:["표시 이름",r.jsx(te,{text:"대시보드 버튼에 표시되는 이름입니다. 사용자가 쉽게 이해할 수 있는 이름을 사용하세요. 예: '1층 로비', '휴게실'",position:"bottom",style:{top:"-1px"}})]}),r.jsxs("th",{children:["맵 노드 이름",r.jsx(te,{text:"TCS 맵에 설정된 실제 노드 이름입니다. TCS 티칭 노드관리에서 확인할 수 있으며, 정확히 일치해야 로봇이 해당 위치로 이동합니다.",position:"bottom",style:{top:"-1px"}})]}),r.jsx("th",{style:{width:"60px"}})]})}),r.jsx("tbody",{children:e.nodes.map((d,f)=>r.jsxs("tr",{children:[r.jsx("td",{children:f+1}),!e.syncNodeDisplayNames&&r.jsx("td",{children:r.jsx("input",{type:"text",value:d.displayName,onChange:k=>u(f,"displayName",k.target.value),placeholder:"대시보드 표시 이름",style:{width:"100%",background:"var(--bg-dark)"}})}),r.jsx("td",{children:r.jsx("input",{type:"text",value:d.mapNodeName,onChange:k=>u(f,"mapNodeName",k.target.value),placeholder:"실제 맵 노드 이름",style:{width:"100%",background:"var(--bg-dark)"}})}),r.jsx("td",{children:r.jsx("button",{type:"button",onClick:()=>v(f),style:{background:"transparent",color:"var(--error)",border:"none",cursor:"pointer",fontSize:"1.2rem"},title:"노드 삭제",children:"×"})})]},f))})]})}),r.jsx("button",{type:"button",className:"btn btn-outline",onClick:c,children:"+ 노드 추가"})]})]})}function Hp(e){const t=Fs(e),n=Us(e),i=t.map(M=>`"${M}"`).join(", "),l=n.map(M=>`"${M}"`).join(", "),s=e.nodes.length;let a="",o="";if(e.enableScenarioMode&&e.scenarios.length>0){const M=Math.max(...e.scenarios.map(X=>X.nodes.length)),ze=e.scenarios.some(X=>X.requireStartFrom&&X.requireStartFrom.trim()!=="");a=`
// 시나리오 정의
int MAX_SCENARIO_NODES = ${M};
int SCENARIO_COUNT = ${e.scenarios.length};
string scenarioNames[${e.scenarios.length}] = {${e.scenarios.map(X=>`"${X.name}"`).join(", ")}};
string scenarioRoutes[${e.scenarios.length}][${M}] = {${e.scenarios.map(X=>`{${X.nodes.map(lr=>`"${lr}"`).join(", ")}${X.nodes.length<M?", "+Array(M-X.nodes.length).fill('""').join(", "):""}}`).join(", ")}};
${ze?`string scenarioStartPositions[${e.scenarios.length}] = {${e.scenarios.map(X=>`"${X.requireStartFrom||""}"`).join(", ")}};  // 시나리오별 시작 위치 제한`:""}
`,o=`
    // 시나리오 변수 초기화
    currentScenarioIndex = -1;
    isScenarioActive = false;`}let u="";e.audio.enabled&&(u=`
        setSpeakerVolume(AUDIO_VOLUME);
        스피커재생("silent", 1, true); // 음소거를 위한 초기화 (true = non-blocking)`);let c="";e.nightCharging.enabled&&(e.nightCharging.startHour>e.nightCharging.endHour||e.nightCharging.startHour===e.nightCharging.endHour&&e.nightCharging.startMinute>e.nightCharging.endMinute?c=`
    // 야간 충전 윈도우 계산 (${String(e.nightCharging.startHour).padStart(2,"0")}:${String(e.nightCharging.startMinute).padStart(2,"0")} ~ ${String(e.nightCharging.endHour).padStart(2,"0")}:${String(e.nightCharging.endMinute).padStart(2,"0")}) - 자정 경과
    // 이 시간대에는 충전 완료 시 자동 언도킹하지 않고 계속 충전 상태 유지
    isNightChargeWindow = false;
    // 저녁 시간대 (시작시간 이후) OR 아침 시간대 (종료시간 이전)
    if ((TIME_HOUR > ${e.nightCharging.startHour} || (TIME_HOUR == ${e.nightCharging.startHour} && TIME_MINUTE >= ${e.nightCharging.startMinute})) || (TIME_HOUR < ${e.nightCharging.endHour} || (TIME_HOUR == ${e.nightCharging.endHour} && TIME_MINUTE < ${e.nightCharging.endMinute})))
    {
        isNightChargeWindow = true;
    }`:c=`
    // 야간 충전 윈도우 계산 (${String(e.nightCharging.startHour).padStart(2,"0")}:${String(e.nightCharging.startMinute).padStart(2,"0")} ~ ${String(e.nightCharging.endHour).padStart(2,"0")}:${String(e.nightCharging.endMinute).padStart(2,"0")})
    // 이 시간대에는 충전 완료 시 자동 언도킹하지 않고 계속 충전 상태 유지
    isNightChargeWindow = false;
    // 시작시간 이후 AND 종료시간 이전
    if ((TIME_HOUR > ${e.nightCharging.startHour} || (TIME_HOUR == ${e.nightCharging.startHour} && TIME_MINUTE >= ${e.nightCharging.startMinute})) && (TIME_HOUR < ${e.nightCharging.endHour} || (TIME_HOUR == ${e.nightCharging.endHour} && TIME_MINUTE < ${e.nightCharging.endMinute})))
    {
        isNightChargeWindow = true;
    }`);const v=Ue(e),x=M=>M==="waitForButton"?"버튼 대기":M==="countdown"?"카운트다운":"다음 목적지",g=x(e.singleDestinationArrivalBehavior),y=x(e.scenarioArrivalBehavior),d=x(e.multiStopArrivalBehavior),f=e.enableSingleDestination&&e.singleDestinationArrivalBehavior==="waitForButton"||e.enableScenarioMode&&e.scenarioArrivalBehavior==="waitForButton"||e.enableMultiStopQueue&&e.multiStopArrivalBehavior==="waitForButton",k=v,h=f?`
    // ============================================================
    // 버튼 대기 상태 (도착 확인 버튼 대기)
    // ============================================================
    else if (robot_state == "버튼 대기")
    {
        출력("도착 확인 대기 중 (isMoveComplete 버튼 대기)");
        로그출력("도착 확인 대기 중 (isMoveComplete 버튼 대기)");

        // isMoveComplete 버튼이 눌릴 때까지 대기
        while (EMS_ON == 0 && isMoveComplete == false)
        {
            // 주행 취소 체크
            if (IS_DRIVING_CANCELED == 1)
            {
                출력("    [Driving Canceled during wait]");
                로그출력("    [Driving Canceled during wait]");
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                robot_state = "INIT";
                break;
            }
            대기시간(0.2);
        }
        isMoveComplete = false;
        
        if (robot_state != "INIT")
        {
            robot_state = "다음 목적지";
        }
    }`:"",p=k?`
    // ============================================================
    // 카운트다운 상태 (타이머 대기)
    // ============================================================
    else if (robot_state == "카운트다운")
    {
        // 모드별 대기 시간 결정
        int currentWaitTime = 30;
${e.multiStopArrivalBehavior==="countdown"?`        if (isMultiStopActive == true)
        {
            currentWaitTime = multiStopWaitTime;
        }`:""}
${e.singleDestinationArrivalBehavior==="countdown"?`        ${e.multiStopArrivalBehavior==="countdown"?"else ":""}if (isSingleDrivingActive == true)
        {
            currentWaitTime = singleDestWaitTime;
        }`:""}
${e.scenarioArrivalBehavior==="countdown"?`        ${e.multiStopArrivalBehavior==="countdown"||e.singleDestinationArrivalBehavior==="countdown"?"else ":""}if (isScenarioActive == true)
        {
            currentWaitTime = scenarioWaitTime;
        }`:""}

        출력("카운트다운 시작 (" + currentWaitTime + "초)");
        로그출력("카운트다운 시작 (" + currentWaitTime + "초)");

        int waitCountdown = currentWaitTime;
        output_waitCountdown = waitCountdown;

        while (EMS_ON == 0 && waitCountdown > 0 && isMoveComplete == false)
        {
            // 주행 취소 체크
            if (IS_DRIVING_CANCELED == 1)
            {
                출력("    [Driving Canceled during countdown]");
                로그출력("    [Driving Canceled during countdown]");
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                robot_state = "INIT";
                break;
            }

            // 대기 시간 조절 버튼 처리
${e.waitTimeSettings.allowIncrease?`            if (input_waitTimeIncrease == true)
            {
                waitCountdown = waitCountdown + ${e.waitTimeSettings.stepSize};
                output_waitCountdown = waitCountdown;
                출력("대기 시간 증가: " + waitCountdown + "초");
                input_waitTimeIncrease = false;
            }`:"            // 대기 시간 증가 비활성화"}
${e.waitTimeSettings.allowDecrease?`            if (input_waitTimeDecrease == true)
            {
                if (waitCountdown > ${e.waitTimeSettings.stepSize})
                {
                    waitCountdown = waitCountdown - ${e.waitTimeSettings.stepSize};
                }
                else
                {
                    waitCountdown = 1;
                }
                output_waitCountdown = waitCountdown;
                출력("대기 시간 감소: " + waitCountdown + "초");
                input_waitTimeDecrease = false;
            }`:"            // 대기 시간 감소 비활성화"}
${e.waitTimeSettings.allowSkip?`            if (input_skipWait == true)
            {
                출력("대기 스킵");
                로그출력("대기 스킵");
                input_skipWait = false;
                break;
            }`:"            // 대기 스킵 비활성화"}

            대기시간(1.0);
            waitCountdown--;
            output_waitCountdown = waitCountdown;
        }
        isMoveComplete = false;
        output_waitCountdown = 0;
        
        if (robot_state != "INIT")
        {
            robot_state = "다음 목적지";
        }
    }`:"";let m="";e.afterChargingBehavior==="returnToStart"?m=`
            if (DOCKING_STATE == 1)
            {
                언도킹(CHARGING_STATION_MARKER_ID, false);
                // 언도킹 시작 대기 (DRIVING_METHOD가 UNDOCKING으로 변경될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && DRIVING_METHOD != "UNDOCKING")
                {
                    대기시간(0.1);
                }
                // 언도킹 완료 대기 (IS_ARRIVED가 1이 될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && IS_ARRIVED == 0)
                {
                    대기시간(0.1);
                }
            }

            출력("충전 완료 (" + BATTERY_POWER + "%), 출발지로 복귀");
            로그출력("충전 완료 (" + BATTERY_POWER + "%), 출발지로 복귀");

            currentNodeName = START_NODE_NAME;
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;

            robot_state = "이동 중";`:e.afterChargingBehavior==="goToIdle"?m=`
            if (DOCKING_STATE == 1)
            {
                언도킹(CHARGING_STATION_MARKER_ID, false);
                // 언도킹 시작 대기 (DRIVING_METHOD가 UNDOCKING으로 변경될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && DRIVING_METHOD != "UNDOCKING")
                {
                    대기시간(0.1);
                }
                // 언도킹 완료 대기 (IS_ARRIVED가 1이 될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && IS_ARRIVED == 0)
                {
                    대기시간(0.1);
                }
            }

            출력("충전 완료 (" + BATTERY_POWER + "%), 대기 상태로 전환");
            로그출력("충전 완료 (" + BATTERY_POWER + "%), 대기 상태로 전환");

            isGoingToChargerActive = false;
            isMultiStopActive = false;

            robot_state = "대기 중";`:m=`
            // 충전소에 대기 (언도킹 안함)
            if (hasLoggedChargingComplete == false)
            {
                출력("충전 완료 (" + BATTERY_POWER + "%), 충전소에서 대기 중");
                로그출력("충전 완료 (" + BATTERY_POWER + "%), 충전소에서 대기 중");
                hasLoggedChargingComplete = true;
            }
            // 사용자가 명시적으로 주행 시작 버튼을 눌러야 함`;let S="";e.enableSingleDestination&&(S=`
        // --- 단일 목적지 즉시 주행 ---
        else if (input_directDrivingNodeIndex >= 0 && input_directDrivingNodeIndex < ALL_NODES_SIZE)
        {
            string selected = ALL_NODES[input_directDrivingNodeIndex];
            currentNodeName = selected;
            // 모든 주행 플래그 초기화 후 단일 목적지 플래그만 설정
            isSingleDrivingActive = true;
            isMultiStopActive = false;
            isGoingToChargerActive = false;
            isReturningToStartActive = false;
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            
            출력("단일 노드 즉시 주행 시작: " + selected);
            로그출력("단일 노드 즉시 주행 시작: " + selected);
            
            robot_state = "이동 중";
            input_directDrivingNodeIndex = -1;
        }`);let N="";if(e.enableScenarioMode&&e.scenarios.length>0){const M=e.scenarios.some(ze=>ze.requireStartFrom&&ze.requireStartFrom.trim()!=="");N=`
        // --- 시나리오 시작 ---
        else if (input_scenarioIndex >= 0 && input_scenarioIndex < SCENARIO_COUNT)
        {
            ${M?`// 시나리오별 시작 위치 확인
            string requiredPosition = scenarioStartPositions[input_scenarioIndex];
            bool canStart = true;
            
            if (requiredPosition != "" && output_currentRobotLocation != requiredPosition)
            {
                canStart = false;
                ${e.showScenarioPositionWarning?`scenarioWarning = true;
                대기시간(${e.warningDisplayDuration}.0);
                scenarioWarning = false;`:""}
                출력("시나리오 시작 불가: " + requiredPosition + "에서만 시작 가능 (현재: " + output_currentRobotLocation + ")");
                로그출력("시나리오 시작 불가: " + requiredPosition + "에서만 시작 가능 (현재: " + output_currentRobotLocation + ")");
                input_scenarioIndex = -1;
            }
            
            if (canStart)
            {`:""}
                // 시나리오 로드
                currentScenarioIndex = input_scenarioIndex;
                scenarioNodeCount = 0;
                
                for (int i = 0; i < MAX_SCENARIO_NODES; i++)
                {
                    activeScenarioRoute[i] = scenarioRoutes[currentScenarioIndex][i];
                    if (activeScenarioRoute[i] != "")
                    {
                        scenarioNodeCount++;
                    }
                }
                
                출력("시나리오 " + scenarioNames[currentScenarioIndex] + " 로드 완료 (노드 수: " + scenarioNodeCount + ")");
                로그출력("시나리오 " + scenarioNames[currentScenarioIndex] + " 로드 완료 (노드 수: " + scenarioNodeCount + ")");
                
                // 모든 주행 플래그 초기화 후 시나리오 플래그만 설정
                isScenarioActive = true;
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                scenarioNodeIndex = 0;
                currentNodeName = activeScenarioRoute[0];
                
                robot_state = "이동 중";
                input_scenarioIndex = -1;
            ${M?"}":""}
        }`}let C="";e.audio.enabled&&e.audio.playOnArrival&&(C=`
                    스피커재생(ARRIVAL_AUDIO, 1, true);`);let T="";if(e.multiStopCompletionReturn){const M=e.multiStopCompletionReturn===e.chargingStationName;T=`
                    // 다중 정차 주행 완료 후 복귀 위치로 이동
                    출력("다중 정차 주행 완료, 복귀 위치로 이동: ${e.multiStopCompletionReturn}");
                    로그출력("다중 정차 주행 완료, 복귀 위치로 이동: ${e.multiStopCompletionReturn}");
                    currentNodeName = "${e.multiStopCompletionReturn}";
                    isMultiStopActive = false;
                    ${M?`isGoingToChargerActive = true;
                    isReturningToStartActive = false;`:`isReturningToStartActive = true;
                    isGoingToChargerActive = false;`}
                    robot_state = "이동 중";`}else T=`
                    // 다중 정차 주행 완료, 대기 상태로 전환 (제자리)
                    출력("다중 정차 주행 완료");
                    로그출력("다중 정차 주행 완료");
                    isMultiStopActive = false;
                    robot_state = "INIT";`;let E="";if(e.scenarioCompletionReturn){const M=e.scenarioCompletionReturn===e.chargingStationName;E=`출력("시나리오 완료, 복귀 위치로 이동: ${e.scenarioCompletionReturn}");
                로그출력("시나리오 완료, 복귀 위치로 이동: ${e.scenarioCompletionReturn}");
                currentNodeName = "${e.scenarioCompletionReturn}";
                ${M?`isGoingToChargerActive = true;
                isReturningToStartActive = false;`:`isReturningToStartActive = true;
                isGoingToChargerActive = false;`}
                robot_state = "이동 중";`}else E=`출력("시나리오 완료");
                로그출력("시나리오 완료");
                robot_state = "INIT";`;let z="";if(e.singleDestCompletionReturn){const M=e.singleDestCompletionReturn===e.chargingStationName;z=`
            // 단일 목적지 완료 후 복귀 위치로 이동
            출력("단일 목적지 완료, 복귀 위치로 이동: ${e.singleDestCompletionReturn}");
            로그출력("단일 목적지 완료, 복귀 위치로 이동: ${e.singleDestCompletionReturn}");
            currentNodeName = "${e.singleDestCompletionReturn}";
            isSingleDrivingActive = false;
            ${M?`isGoingToChargerActive = true;
            isReturningToStartActive = false;`:`isReturningToStartActive = true;
            isGoingToChargerActive = false;`}
            robot_state = "이동 중";`}else z=`
            // 단일 목적지 완료, 대기 상태로 전환 (제자리)
            출력("단일 목적지 완료");
            로그출력("단일 목적지 완료");
            isSingleDrivingActive = false;
            robot_state = "INIT";`;const R=e.updateLocationOn==="arrival"?"output_currentRobotLocation = currentNodeName;  // 도착 시 위치 업데이트":"// 위치 업데이트는 주행 시작 시 수행됨";return`//----------------------------------------------------------------------------------------------------------------------------//
// 자동 생성된 TCS 스크립트: ${e.scriptName}
// 생성 시각: ${new Date().toLocaleString("ko-KR",{timeZone:"Asia/Seoul"})}
// 설정: 
//   - 주행 모드: ${e.enableMultiStopQueue?"다중정차큐 ":""}${e.enableSingleDestination?"단일목적지 ":""}${e.enableScenarioMode?"시나리오 ":""}
//   - 도착 동작: ${e.enableMultiStopQueue?`다중정차(${e.multiStopArrivalBehavior==="waitForButton"?"버튼":e.multiStopArrivalBehavior==="countdown"?`카운트다운${e.waitTimeSettings.multiStopWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds}초`:"즉시"}) `:""}${e.enableSingleDestination?`단일(${e.singleDestinationArrivalBehavior==="waitForButton"?"버튼":e.singleDestinationArrivalBehavior==="countdown"?`카운트다운${e.waitTimeSettings.singleDestWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds}초`:"즉시"}) `:""}${e.enableScenarioMode?`시나리오(${e.scenarioArrivalBehavior==="waitForButton"?"버튼":e.scenarioArrivalBehavior==="countdown"?`카운트다운${e.waitTimeSettings.scenarioWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds}초`:"즉시"})`:""}
//   - 충전: ${e.afterChargingBehavior==="returnToStart"?"완료 후 시작위치 복귀":e.afterChargingBehavior==="stayAtCharger"?"완료 후 충전소 대기":"완료 후 제자리 대기"}${e.lowBatteryReturn.enabled&&e.lowBatteryReturn.nodeName?`, 저배터리 시 ${e.lowBatteryReturn.nodeName}로 복귀`:""}
${e.nightCharging.enabled?`//   - 야간 충전: ${String(e.nightCharging.startHour).padStart(2,"0")}:${String(e.nightCharging.startMinute).padStart(2,"0")}~${String(e.nightCharging.endHour).padStart(2,"0")}:${String(e.nightCharging.endMinute).padStart(2,"0")}`:""}${e.repeat.enabled?`
//   - 반복: 기본 ${e.repeat.defaultCount}회, 최대 ${e.repeat.maxCount}회`:""}${e.audio.enabled?`
//   - 오디오: 볼륨 ${e.audio.volume}%`:""}${e.multiStopCompletionReturn||e.singleDestCompletionReturn||e.scenarioCompletionReturn?`
//   - 완료 후 복귀: ${e.enableMultiStopQueue&&e.multiStopCompletionReturn?`다중정차→${e.multiStopCompletionReturn} `:""}${e.enableSingleDestination&&e.singleDestCompletionReturn?`단일→${e.singleDestCompletionReturn} `:""}${e.enableScenarioMode&&e.scenarioCompletionReturn?`시나리오→${e.scenarioCompletionReturn}`:""}`:""}
//----------------------------------------------------------------------------------------------------------------------------//

// ************** 운용 파라미터 **************

string START_NODE_NAME = "${e.startNodeName}";                         // 대기장소
string CHARGING_STATION_NAME = "${e.chargingStationName}";             // 충전 스테이션 이름
int CHARGING_STATION_MARKER_ID = ${e.chargingStationMarkerId};         // 충전 스테이션 마커 ID

int BATTERY_LOW_LEVEL = ${e.batteryLowLevel};                          // 자동 충전 시작 배터리
int BATTERY_HIGH_LEVEL = ${e.batteryHighLevel};                        // 충전 완료 배터리

int MAX_QUEUE = ${e.queue.maxSize};                                    // 최대 다중 정차 큐 크기 (설정에서 변경 가능)
int ALL_NODES_SIZE = ${s};                                          // 총 노드 수

${e.audio.enabled?`// 오디오 설정
int AUDIO_VOLUME = ${e.audio.volume};                                 // 오디오 볼륨
${e.audio.playOnArrival?`string ARRIVAL_AUDIO = "${e.audio.arrivalSoundFile}";              // 도착 사운드 파일명`:""}
${e.audio.playOnDriveStart?`string DRIVE_START_AUDIO = "${e.audio.driveStartSoundFile}";      // 주행 시작 사운드 파일명`:""}
${e.audio.playOnLowBattery?`string LOW_BATTERY_AUDIO = "${e.audio.lowBatterySoundFile}";      // 저배터리 사운드 파일명`:""}
${e.audio.playOnBlocked?`string BLOCKED_AUDIO = "${e.audio.blockedSoundFile}";              // 장애물 감지 사운드 파일명`:""}`:""}

${e.multiStopArrivalBehavior==="countdown"?`int multiStopWaitTime = ${e.waitTimeSettings.multiStopWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds};          // 다중정차 대기 시간 (초)`:""}
${e.singleDestinationArrivalBehavior==="countdown"?`int singleDestWaitTime = ${e.waitTimeSettings.singleDestWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds};          // 단일 목적지 대기 시간 (초)`:""}
${e.scenarioArrivalBehavior==="countdown"?`int scenarioWaitTime = ${e.waitTimeSettings.scenarioWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds};          // 시나리오 대기 시간 (초)`:""}

// 전체 노드 목록
string ALL_NODES[${s}] = {${i}};
${e.syncNodeDisplayNames?"":`// 맵 노드 이름 (경로주행용 - 표시 이름과 다를 때만 사용)
string ALL_MAP_NODES[${s}] = {${l}};`}
${a}


// ************** 대시보드 INPUT 변수 (대시보드 → 스크립트) **************

${e.enableMultiStopQueue?`int input_queueNodeIndex = -1;                              // 큐에 추가할 노드 인덱스
bool input_startDrivingPressed = false;                     // 주행 시작 버튼
bool input_clearQueue = false;                              // 큐 비우기 버튼`:""}
${e.enableSingleDestination?"int input_directDrivingNodeIndex = -1;                     // 단일 목적지 노드 인덱스":""}
${e.enableScenarioMode?"int input_scenarioIndex = -1;                              // 시나리오 인덱스":""}
bool isMoveComplete = false;                                // 도착 확인 버튼
${e.repeat.enabled?`bool input_repeatPlusPressed = false;                       // 반복 횟수 증가
bool input_repeatMinusPressed = false;                      // 반복 횟수 감소`:""}
${v&&e.waitTimeSettings.allowSkip?"bool input_skipWait = false;                               // 대기 스킵 버튼":""}
${v&&e.waitTimeSettings.allowIncrease?"bool input_waitTimeIncrease = false;                       // 대기 시간 증가":""}
${v&&e.waitTimeSettings.allowDecrease?"bool input_waitTimeDecrease = false;                       // 대기 시간 감소":""}
bool input_goToCharger = false;                             // 충전소 이동 버튼
bool input_goToStart = false;                               // 시작 위치 이동 버튼


// ************** 대시보드 OUTPUT 변수 (스크립트 → 대시보드) **************

${e.enableMultiStopQueue?`string output_selectedQueue[${e.queue.maxSize}];                       // 선택된 큐 목록
int output_queueSize = 0;                                   // 현재 큐 크기
int output_maxQueueSize = ${e.queue.maxSize};                           // 최대 큐 크기`:""}
${e.repeat.enabled?`int output_repeatCount = ${e.repeat.defaultCount};                        // 설정된 반복 횟수
int output_repeatRemaining = 0;                             // 남은 반복 횟수`:""}
string output_currentRobotLocation = "";                    // 현재 로봇 위치
string output_targetNodeName = "";                          // 현재 목적지
int output_remainingNodes = 0;                              // 남은 노드 수
${v?"int output_waitCountdown = 0;                              // 대기 카운트다운 (초)":""}
${e.showScenarioPositionWarning?"bool scenarioWarning = false;                              // 시나리오 위치 경고":""}


// ************** 시스템 변수 **************

string robot_state = "INIT";
string previousState = "INIT";
int EMS = 0;                                                    // EMS 상태 (대시보드 동기화용, 0.5초 지연)

${e.enableMultiStopQueue?`string queue[${e.queue.maxSize}];
int queueSize = 0;
int queueIndex = 0;`:""}

${e.repeat.enabled?`int repeatRequested = ${e.repeat.defaultCount};
int repeatRemaining = 0;`:""}

bool isMultiStopActive = false;
bool isGoingToChargerActive = false;
bool isReturningToStartActive = false;
bool hasLoggedChargingComplete = false;  // 충전 완료 메시지 중복 출력 방지
${e.audio.enabled&&e.audio.playOnLowBattery?"bool hasPlayedLowBatteryWarning = false;  // 저배터리 경고 중복 재생 방지":""}
${e.nightCharging.enabled?"bool isNightChargeWindow = false;  // 야간 충전 윈도우 상태":""}
${e.enableSingleDestination?"bool isSingleDrivingActive = false;":""}
${e.enableScenarioMode?`bool isScenarioActive = false;
int currentScenarioIndex = -1;
int scenarioNodeIndex = 0;
int scenarioNodeCount = 0;
string activeScenarioRoute[${e.scenarios.length>0?Math.max(...e.scenarios.map(M=>M.nodes.length)):1}];`:""}

string currentNodeName = "";
bool start_script = true;

//----------------------------------------------------------------------------------------------------------------------------//


// ************** 메인 루프 시작 **************

while(EMS_ON == 0)
{
    // 상태 변화 출력 (디버깅)
    if (previousState != robot_state)
    {
        출력("  robot_state changed, from [" + previousState + "] to [" + robot_state + "]");
        로그출력("  robot_state changed, from [" + previousState + "] to [" + robot_state + "]");
        previousState = robot_state;
    }
${c}

    // ============================================================
    // INIT 상태
    // ============================================================
    if (robot_state == "INIT")
    {${u}
        ${e.enableMultiStopQueue?`// 큐 초기화
        for (int i = 0; i < MAX_QUEUE; i++)
        {
            queue[i] = "";
            output_selectedQueue[i] = "";
        }
        queueSize = 0;
        queueIndex = 0;
        output_queueSize = 0;
        input_queueNodeIndex = -1;
        input_startDrivingPressed = false;`:""}
        ${e.repeat.enabled?`repeatRequested = ${e.repeat.defaultCount};
        repeatRemaining = 0;
        output_repeatCount = ${e.repeat.defaultCount};
        output_repeatRemaining = 0;`:""}
        isMultiStopActive = false;
        isGoingToChargerActive = false;
        isReturningToStartActive = false;
        ${e.enableSingleDestination?`isSingleDrivingActive = false;
        input_directDrivingNodeIndex = -1;`:""}
        ${e.enableScenarioMode?o:""}
        isMoveComplete = false;
        ${e.audio.enabled&&e.audio.playOnLowBattery?"hasPlayedLowBatteryWarning = false;  // 대기 중 진입 시 저배터리 경고 재생 가능하도록 리셋":""}

        출력("INIT 완료, 대기 중으로 전환");
        로그출력("INIT 완료, 대기 중으로 전환");
        robot_state = "대기 중";
    }

    // ============================================================
    // 대기 중 상태
    // ============================================================
    else if (robot_state == "대기 중")
    {
${e.audio.enabled&&e.audio.playOnLowBattery?`        // --- 저배터리 경고 오디오 (대기 중 상태 진입 시 1회 재생, 다른 오디오와 충돌 방지) ---
        if (BATTERY_POWER < BATTERY_LOW_LEVEL && hasPlayedLowBatteryWarning == false)
        {
            스피커재생(LOW_BATTERY_AUDIO, 1, true);
            hasPlayedLowBatteryWarning = true;
            출력("저배터리 경고 오디오 재생");
        }
`:""}
        ${e.lowBatteryReturn.enabled&&e.lowBatteryReturn.nodeName?`// --- 저배터리 시 복귀 위치로 이동 (자동 충전 대신) ---
        // 이미 복귀 위치에 있으면 다시 주행하지 않음
        if (BATTERY_POWER < BATTERY_LOW_LEVEL && output_currentRobotLocation != "${e.lowBatteryReturn.nodeName}")
        {
            출력("배터리 부족 (" + BATTERY_POWER + "%), 복귀 위치로 이동: ${e.lowBatteryReturn.nodeName}");
            로그출력("배터리 부족 (" + BATTERY_POWER + "%), 복귀 위치로 이동: ${e.lowBatteryReturn.nodeName}");
            currentNodeName = "${e.lowBatteryReturn.nodeName}";
            // 모든 주행 플래그 초기화 후 시작 위치 복귀 플래그 설정
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
        }`:e.autoChargeTrigger!=="never"?`// --- 자동 충전 체크 ---
        if (BATTERY_POWER < BATTERY_LOW_LEVEL)
        {
            출력("배터리 부족 (" + BATTERY_POWER + "%), 충전 스테이션으로 자동 이동");
            로그출력("배터리 부족 (" + BATTERY_POWER + "%), 충전 스테이션으로 자동 이동");
            currentNodeName = CHARGING_STATION_NAME;
            // 모든 주행 플래그 초기화
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
        }`:"// 자동 충전 비활성화"}
        ${e.nightCharging.enabled&&e.nightCharging.autoChargeWhenIdle?`
        // --- 야간 충전 윈도우: 대기 중 자동 충전 ---
        ${e.lowBatteryReturn.enabled&&e.lowBatteryReturn.nodeName||e.autoChargeTrigger!=="never"?"else":""} if (isNightChargeWindow == true)
        {
            출력("야간 충전 윈도우 - 자동 충전소 이동");
            로그출력("야간 충전 윈도우 - 자동 충전소 이동");
            currentNodeName = CHARGING_STATION_NAME;
            // 모든 주행 플래그 초기화
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
        }`:""}

        // --- 충전소/시작 위치 이동 버튼 ---
        ${e.lowBatteryReturn.enabled&&e.lowBatteryReturn.nodeName||e.autoChargeTrigger!=="never"||e.nightCharging.enabled&&e.nightCharging.autoChargeWhenIdle?"else":""} if (input_goToCharger == true)
        {
            currentNodeName = CHARGING_STATION_NAME;
            // 모든 주행 플래그 초기화 후 충전소 이동 플래그만 설정
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
            input_goToCharger = false;
        }
        else if (input_goToStart == true)
        {
            currentNodeName = START_NODE_NAME;
            // 모든 주행 플래그 초기화 후 시작위치 복귀 플래그만 설정
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
            input_goToStart = false;
        }
${e.enableMultiStopQueue?`
        // --- 큐에 노드 추가 ---
        else if (input_queueNodeIndex >= 0 && input_queueNodeIndex < ALL_NODES_SIZE)
        {
            if (queueSize < MAX_QUEUE)
            {
                string nodeName = ALL_NODES[input_queueNodeIndex];
                queue[queueSize] = nodeName;
                output_selectedQueue[queueSize] = nodeName;
                queueSize++;
                output_queueSize = queueSize;
                출력("큐에 노드 추가: " + nodeName + " (큐 크기: " + queueSize + ")");
            }
            else
            {
                출력("큐가 가득 찼습니다 (최대 " + MAX_QUEUE + "개)");
            }
            input_queueNodeIndex = -1;
        }
        // --- 큐 비우기 ---
        else if (input_clearQueue == true)
        {
            for (int i = 0; i < MAX_QUEUE; i++)
            {
                queue[i] = "";
                output_selectedQueue[i] = "";
            }
            queueSize = 0;
            output_queueSize = 0;
            출력("큐가 비워졌습니다");
            로그출력("큐가 비워졌습니다");
            input_clearQueue = false;
        }
        ${e.repeat.enabled?`// --- 반복 횟수 조절 ---
        else if (input_repeatPlusPressed == true)
        {
            ${e.repeat.maxCount?`if (repeatRequested < ${e.repeat.maxCount})
            {`:""}
                repeatRequested++;
                output_repeatCount = repeatRequested;
            ${e.repeat.maxCount?"}":""}
            input_repeatPlusPressed = false;
        }
        else if (input_repeatMinusPressed == true)
        {
            if (repeatRequested > 1)
            {
                repeatRequested--;
                output_repeatCount = repeatRequested;
            }
            input_repeatMinusPressed = false;
        }`:""}
        // --- 주행 시작 버튼 ---
        else if (input_startDrivingPressed == true)
        {
            if (queueSize > 0)
            {
                출력("다중 정차 주행 시작 (큐 크기: " + queueSize + "${e.repeat.enabled?', 반복: " + repeatRequested + "회)':")"}");
                // 모든 주행 플래그 초기화 후 다중 정차 플래그만 설정
                isMultiStopActive = true;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.repeat.enabled?`repeatRemaining = repeatRequested - 1;
                output_repeatRemaining = repeatRemaining;`:""}
                queueIndex = 0;
                currentNodeName = queue[0];
                robot_state = "이동 중";
            }
            else
            {
                출력("큐가 비어있습니다");
            }
            input_startDrivingPressed = false;
        }`:""}
${S}
${N}
    }

    // ============================================================
    // 이동 중 상태
    // ============================================================
    else if (robot_state == "이동 중")
    {
        output_targetNodeName = currentNodeName;
${e.updateLocationOn==="driveStart"?"        output_currentRobotLocation = currentNodeName;  // 주행 시작 시 위치 업데이트":""}
        ${e.enableMultiStopQueue&&e.enableScenarioMode?`if (isMultiStopActive == true)
        {
            output_remainingNodes = queueSize - queueIndex;
        }
        else if (isScenarioActive == true)
        {
            output_remainingNodes = scenarioNodeCount - scenarioNodeIndex;
        }
        else
        {
            output_remainingNodes = 1;
        }`:e.enableMultiStopQueue?`if (isMultiStopActive == true)
        {
            output_remainingNodes = queueSize - queueIndex;
        }
        else
        {
            output_remainingNodes = 1;
        }`:e.enableScenarioMode?`if (isScenarioActive == true)
        {
            output_remainingNodes = scenarioNodeCount - scenarioNodeIndex;
        }
        else
        {
            output_remainingNodes = 1;
        }`:"output_remainingNodes = 1;"}

        출력("    [Current Goal]: " + currentNodeName);

        // 언도킹 (충전 중 상태에서 주행 시작 시)
        if ((CHARGING_BATTERY == 1 || DOCKING_STATE == 1) && currentNodeName != CHARGING_STATION_NAME)
        {
            출력("    [Undock before driving]");
            언도킹(CHARGING_STATION_MARKER_ID, false);
            // 언도킹 시작 대기 (DRIVING_METHOD가 UNDOCKING으로 변경될 때까지)
            while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && DRIVING_METHOD != "UNDOCKING")
            {
                대기시간(0.1);
            }
            // 언도킹 완료 대기 (IS_ARRIVED가 1이 될 때까지)
            while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && IS_ARRIVED == 0)
            {
                대기시간(0.1);
            }
            
            // 언도킹 중 취소되었으면 주행 진행하지 않고 INIT으로 복귀
            if (IS_DRIVING_CANCELED == 1 || EMS_ON == 1)
            {
                출력("    [Canceled during undocking]");
                로그출력("    [Canceled during undocking]");
                
                // 주행 시스템 리셋 대기
                while (EMS_ON == 0 && (PATHFIND_STATE == "DRIVING" || DRIVING_STATUS != "IDLE"))
                {
                    대기시간(0.1);
                }
                
                ${e.enableMultiStopQueue?`// 큐 초기화
                for (int i = 0; i < MAX_QUEUE; i++)
                {
                    queue[i] = "";
                    output_selectedQueue[i] = "";
                }
                queueSize = 0;
                queueIndex = 0;
                output_queueSize = 0;`:""}
                ${e.repeat.enabled?`repeatRequested = ${e.repeat.defaultCount};
                repeatRemaining = 0;
                output_repeatCount = ${e.repeat.defaultCount};
                output_repeatRemaining = 0;`:""}
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                robot_state = "INIT";
            }
        }
        
        // EMS 또는 취소 상태면 주행 진행하지 않음
        if (EMS_ON == 1 || robot_state == "INIT")
        {
            // 이미 INIT으로 전환됨, 루프 다음 반복으로
        }
        else
        {
${e.syncNodeDisplayNames?`        string driveTarget = currentNodeName;
        경로주행("OAP", "", "@" + driveTarget, true, false, false);`:`        // 표시 이름을 맵 노드 이름으로 변환
        string driveTarget = currentNodeName;
        for (int i = 0; i < ALL_NODES_SIZE; i++)
        {
            if (ALL_NODES[i] == currentNodeName)
            {
                driveTarget = ALL_MAP_NODES[i];
                break;
            }
        }
        // 충전소, 시작 위치는 별도 처리 (표시 이름 = 맵 노드 이름)
        if (currentNodeName == CHARGING_STATION_NAME || currentNodeName == START_NODE_NAME)
        {
            driveTarget = currentNodeName;
        }
        경로주행("OAP", "", "@" + driveTarget, true, false, false);`}

        string prevPathfindState = PATHFIND_STATE;
        string prevDrivingStatus = DRIVING_STATUS;
        bool hasDrivingStarted = false;

        while (EMS_ON == 0)
        {
            // 주행 시작 감지 (DRIVING_STATUS가 IDLE에서 변경되거나, PATHFIND_STATE가 DRIVING이 되면)
            if (hasDrivingStarted == false && (DRIVING_STATUS != "IDLE" || PATHFIND_STATE == "DRIVING"))
            {
                hasDrivingStarted = true;
                출력("    [Driving Started]: " + DRIVING_STATUS + ", PATHFIND: " + PATHFIND_STATE);
            }
${e.audio.enabled&&(e.audio.playOnDriveStart||e.audio.playOnBlocked)?`
            // 오디오 상태 전환 처리 (DRIVING ↔ BLOCKED)
            if (prevPathfindState != PATHFIND_STATE)
            {
                ${e.audio.playOnDriveStart?`// DRIVING 상태로 전환 시 주행 오디오 시작
                if (hasDrivingStarted == true && PATHFIND_STATE == "DRIVING")
                {
                    스피커재생(DRIVE_START_AUDIO, 0, true);  // repeat=0 for infinite loop, true = non-blocking
                }`:""}
                ${e.audio.playOnBlocked?`// BLOCKED 상태로 전환 시 장애물 오디오 시작
                ${e.audio.playOnDriveStart?"else ":""}if (PATHFIND_STATE == "BLOCKED")
                {
                    스피커재생(BLOCKED_AUDIO, 0, true);  // repeat=0 for continuous blocked sound, true = non-blocking
                }`:""}
            }`:""}

            // 주행 시작 후에만 취소 체크 (이전 주행의 IS_DRIVING_CANCELED 값이 리셋되기 전 오감지 방지)
            // 단, 이미 완료된 경우(PATHFIND_STATE == "COMPLETED")는 취소 무시 (취소가 늦게 들어온 경우)
            if (hasDrivingStarted == true && IS_DRIVING_CANCELED == 1 && PATHFIND_STATE != "COMPLETED")
            {
                출력("    [Driving Canceled]");
                로그출력("    [Driving Canceled]");
                ${e.audio.enabled?'스피커재생("silent", 1, true);  // 오디오 중지':""}
                
                // 주행 시스템이 완전히 리셋될 때까지 대기 (다음 주행 명령 전 안정화)
                출력("    [Waiting for drive system reset...]");
                while (EMS_ON == 0 && (PATHFIND_STATE == "DRIVING" || DRIVING_STATUS != "IDLE"))
                {
                    대기시간(0.1);
                }
                출력("    [Drive system reset complete]");
                
                ${e.enableMultiStopQueue?`// 큐 초기화
                for (int i = 0; i < MAX_QUEUE; i++)
                {
                    queue[i] = "";
                    output_selectedQueue[i] = "";
                }
                queueSize = 0;
                queueIndex = 0;
                output_queueSize = 0;`:""}
                ${e.repeat.enabled?`repeatRequested = ${e.repeat.defaultCount};
                repeatRemaining = 0;
                output_repeatCount = ${e.repeat.defaultCount};
                output_repeatRemaining = 0;`:""}
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                robot_state = "INIT";
                break;
            }

            // 상태 변화 로깅
            if (prevPathfindState != PATHFIND_STATE)
            {
                출력("    [PATHFIND_STATE]: " + PATHFIND_STATE);
                prevPathfindState = PATHFIND_STATE;
            }
            if (prevDrivingStatus != DRIVING_STATUS)
            {
                출력("    [DRIVING_STATUS]: " + DRIVING_STATUS);
                prevDrivingStatus = DRIVING_STATUS;
            }

            // 도착 감지: PATHFIND_STATE == "COMPLETED" 만 사용 (DRIVING_STATUS는 불안정할 수 있음)
            // 비동기 경로주행이므로 반드시 주행 시작 후에만 완료 체크 (이전 주행의 COMPLETED 상태 오감지 방지)
            if (hasDrivingStarted == true && PATHFIND_STATE == "COMPLETED")
            {
                ${e.audio.enabled?'스피커재생("silent", 1, true);  // 주행 오디오 중지':""}
                출력("    [Move Complete] (PATHFIND: " + PATHFIND_STATE + ", DRIVING: " + DRIVING_STATUS + ")");
                ${R}
${C}

                // 충전 스테이션 도착 처리 (모든 모드에서 동일하게 충전 상태로 전환)
                if (currentNodeName == CHARGING_STATION_NAME)
                {
                    출력("충전 스테이션 도착, 도킹");
                    도킹(CHARGING_STATION_MARKER_ID, false);
                    // CHARGING_BATTERY == 1 (충전 중) 또는 DOCKING_STATE == 1 (도킹 완료) 대기
                    // 배터리 100%일 때 충전소로 보내면 CHARGING_BATTERY는 0으로 유지되지만 DOCKING_STATE는 1이 됨
                    while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && CHARGING_BATTERY == 0 && DOCKING_STATE == 0)
                    {
                        대기시간(0.1);
                    }
                    // 모든 주행 플래그 초기화
                    isMultiStopActive = false;
                    isGoingToChargerActive = false;
                    isReturningToStartActive = false;
                    ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                    ${e.enableScenarioMode?"isScenarioActive = false;":""}
                    hasLoggedChargingComplete = false;  // 충전 완료 메시지 플래그 리셋
                    robot_state = "충전 중";
                    break;
                }
                // 시작 위치 복귀 완료 (input_goToStart로 이동 시 - 적재 상태 확인 없이 바로 INIT)
                else if (isReturningToStartActive == true)
                {
                    // 모든 주행 플래그 초기화
                    isReturningToStartActive = false;
                    isGoingToChargerActive = false;
                    isMultiStopActive = false;
                    ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                    ${e.enableScenarioMode?"isScenarioActive = false;":""}
                    출력("시작 위치 복귀 완료");
                    robot_state = "INIT";
                    break;
                }
                ${e.enableSingleDestination?`// 단일 목적지 도착
                else if (isSingleDrivingActive == true)
                {
                    // 도착 후 동작이 버튼대기나 카운트다운이면 플래그 유지 (다음 목적지 상태에서 해제)
                    출력("단일 목적지 도착");
                    robot_state = "${g}";
                    break;
                }`:""}
                ${e.enableScenarioMode?`// 시나리오 노드 도착
                else if (isScenarioActive == true)
                {
                    출력("시나리오 노드 도착");
                    robot_state = "${y}";
                    break;
                }`:""}
                ${e.enableMultiStopQueue?`// 다중 정차 노드 도착
                else if (isMultiStopActive == true)
                {
                    bool isLastInQueue = (queueIndex >= (queueSize - 1));
                    ${e.repeat.enabled?"bool isLastNode = isLastInQueue && (repeatRemaining == 0);":"bool isLastNode = isLastInQueue;"}
                    
                    // 시작위치가 유일한 노드이거나 마지막 노드인 경우 바로 종료
                    if (currentNodeName == START_NODE_NAME && isLastNode)
                    {
                        isMultiStopActive = false;
                        if (queueSize == 1)
                        {
                            출력("시작위치 단일 노드 주행 완료, 주행 종료");
                        }
                        else
                        {
                            출력("마지막 목적지(시작위치) 도착, 주행 종료");
                        }
                        robot_state = "INIT";
                        break;
                    }
                    
                    // 그 외 경우 도착 처리
                    출력("경유지 도착");
                    robot_state = "${d}";
                    break;
                }`:""}
                else
                {
                    robot_state = "INIT";
                    break;
                }
            }

            // 경로 취소 처리 (시스템 레벨 경로 취소)
            if (PATHFIND_STATE == "CANCELED")
            {
                출력("    [Path Canceled]");
                로그출력("    [Path Canceled]");
                ${e.audio.enabled?'스피커재생("silent", 1, true);  // 오디오 중지':""}
                
                // 주행 시스템이 완전히 리셋될 때까지 대기
                출력("    [Waiting for drive system reset...]");
                while (EMS_ON == 0 && DRIVING_STATUS != "IDLE")
                {
                    대기시간(0.1);
                }
                출력("    [Drive system reset complete]");
                
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                robot_state = "INIT";
                break;
            }
            대기시간(0.1);
        }
        ${e.audio.enabled?`// EMS로 while 루프 종료 시 오디오 중지
        if (EMS_ON == 1)
        {
            스피커재생("silent", 1, true);
        }`:""}
        }  // end of else block (주행 진행)
    }

${h}
${p}

    // ============================================================
    // 다음 목적지 상태 (도착 후 다음 목적지로 이동 또는 종료)
    // ============================================================
    else if (robot_state == "다음 목적지")
    {
        대기시간(0.2);

        ${e.enableScenarioMode?`// 시나리오 다음 노드
        if (isScenarioActive == true)
        {
            scenarioNodeIndex++;
            if (scenarioNodeIndex < scenarioNodeCount)
            {
                currentNodeName = activeScenarioRoute[scenarioNodeIndex];
                출력("시나리오 다음 노드: " + currentNodeName);
                robot_state = "이동 중";
            }
            else
            {
                // 시나리오 완료
                isScenarioActive = false;
                ${E}
            }
        }
        ${e.enableMultiStopQueue?"else if (isMultiStopActive == true)":"else"}`:e.enableMultiStopQueue?"if (isMultiStopActive == true)":""} ${e.enableMultiStopQueue?`// 다중 정차 다음 노드
        {
            if (queueIndex < queueSize - 1)
            {
                queueIndex++;
                currentNodeName = queue[queueIndex];
                출력("다음 노드: " + currentNodeName);
                robot_state = "이동 중";
            }
            else
            {
                ${e.repeat.enabled?`if (repeatRemaining > 0)
                {
                    repeatRemaining--;
                    output_repeatRemaining = repeatRemaining;
                    queueIndex = 0;
                    currentNodeName = queue[0];
                    출력("반복 주행 (남은: " + repeatRemaining + ")");
                    robot_state = "이동 중";
                }
                else
                {`:""}
${T}
                ${e.repeat.enabled?"}":""}
            }
        }
        else`:""}
        {
            ${e.enableSingleDestination?`// 단일 목적지 완료 처리
            if (isSingleDrivingActive == true)
            {
${z}
            }
            else
            {
                // 시작 위치/충전소 이동 완료 또는 기타 - 대기 상태로 전환
                robot_state = "INIT";
            }`:`// 시작 위치/충전소 이동 완료 또는 기타 - 대기 상태로 전환
            robot_state = "INIT";`}
        }
    }

    // ============================================================
    // 충전 중 상태
    // ============================================================
    else if (robot_state == "충전 중")
    {
        // --- 시작 위치 이동 버튼 (언도킹 후 이동) ---
        if (input_goToStart == true)
        {
            출력("충전 중 시작 위치 이동 요청");
            currentNodeName = START_NODE_NAME;
            // 모든 주행 플래그 초기화 후 시작위치 복귀 플래그만 설정
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
            input_goToStart = false;
        }
${e.enableSingleDestination?`
        // --- 단일 목적지 즉시 주행 (언도킹 후 이동) ---
        else if (input_directDrivingNodeIndex >= 0 && input_directDrivingNodeIndex < ALL_NODES_SIZE)
        {
            string selected = ALL_NODES[input_directDrivingNodeIndex];
            출력("충전 중 단일 목적지 이동 요청: " + selected);
            currentNodeName = selected;
            // 모든 주행 플래그 초기화 후 단일 목적지 플래그만 설정
            isSingleDrivingActive = true;
            isMultiStopActive = false;
            isGoingToChargerActive = false;
            isReturningToStartActive = false;
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
            input_directDrivingNodeIndex = -1;
        }`:""}
${e.enableScenarioMode&&e.scenarios.length>0?`
        // --- 시나리오 시작 (언도킹 후 이동) ---
        else if (input_scenarioIndex >= 0 && input_scenarioIndex < SCENARIO_COUNT)
        {
            출력("충전 중 시나리오 시작 요청");
            // 시나리오 로드
            currentScenarioIndex = input_scenarioIndex;
            scenarioNodeCount = 0;
            
            for (int i = 0; i < MAX_SCENARIO_NODES; i++)
            {
                activeScenarioRoute[i] = scenarioRoutes[currentScenarioIndex][i];
                if (activeScenarioRoute[i] != "")
                {
                    scenarioNodeCount++;
                }
            }
            
            출력("시나리오 " + scenarioNames[currentScenarioIndex] + " 로드 완료 (노드 수: " + scenarioNodeCount + ")");
            
            // 모든 주행 플래그 초기화 후 시나리오 플래그만 설정
            isScenarioActive = true;
            isMultiStopActive = false;
            isGoingToChargerActive = false;
            isReturningToStartActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            scenarioNodeIndex = 0;
            currentNodeName = activeScenarioRoute[0];
            
            robot_state = "이동 중";
            input_scenarioIndex = -1;
        }`:""}
${e.enableMultiStopQueue?`
        // --- 충전 중 큐 편집 허용 ---
        else if (input_queueNodeIndex >= 0 && input_queueNodeIndex < ALL_NODES_SIZE)
        {
            if (queueSize < MAX_QUEUE)
            {
                string nodeName = ALL_NODES[input_queueNodeIndex];
                queue[queueSize] = nodeName;
                output_selectedQueue[queueSize] = nodeName;
                queueSize++;
                output_queueSize = queueSize;
            }
            input_queueNodeIndex = -1;
        }
        // --- 충전 중 큐 비우기 ---
        else if (input_clearQueue == true)
        {
            for (int i = 0; i < MAX_QUEUE; i++)
            {
                queue[i] = "";
                output_selectedQueue[i] = "";
            }
            queueSize = 0;
            output_queueSize = 0;
            출력("큐가 비워졌습니다");
            input_clearQueue = false;
        }`:""}
${e.repeat.enabled?`
        // --- 충전 중 반복 횟수 조절 ---
        ${e.enableMultiStopQueue?"else ":""}if (input_repeatPlusPressed == true)
        {
            ${e.repeat.maxCount?`if (repeatRequested < ${e.repeat.maxCount})
            {`:""}
                repeatRequested++;
                output_repeatCount = repeatRequested;
            ${e.repeat.maxCount?"}":""}
            input_repeatPlusPressed = false;
        }
        else if (input_repeatMinusPressed == true)
        {
            if (repeatRequested > 1)
            {
                repeatRequested--;
                output_repeatCount = repeatRequested;
            }
            input_repeatMinusPressed = false;
        }`:""}
${e.enableMultiStopQueue?`
        // --- 다중 정차 주행 시작 (언도킹 후 이동) ---
        ${e.repeat.enabled,"else "}if (input_startDrivingPressed == true)
        {
            if (queueSize > 0)
            {
                출력("충전 중 다중 정차 주행 시작 요청");
                // 모든 주행 플래그 초기화 후 다중 정차 플래그만 설정
                isMultiStopActive = true;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
                ${e.enableScenarioMode?"isScenarioActive = false;":""}
                ${e.repeat.enabled?`repeatRemaining = repeatRequested - 1;
                output_repeatRemaining = repeatRemaining;`:""}
                queueIndex = 0;
                currentNodeName = queue[0];
                robot_state = "이동 중";
            }
            input_startDrivingPressed = false;
        }`:""}

        // 도킹 상태 확인 (위 버튼 처리로 상태가 바뀌지 않은 경우만)
        // CHARGING_BATTERY == 0 이고 DOCKING_STATE == 0 이면 충전소로 재이동 (둘 다 0일 때만)
        // 직접 도킹() 호출 대신 충전소로 경로주행 후 도킹하는 전체 프로세스 실행
        if (robot_state == "충전 중" && EMS_ON == 0 && CHARGING_BATTERY == 0 && DOCKING_STATE == 0)
        {
            출력("도킹 상태 이상 감지 - 충전소로 재이동");
            로그출력("도킹 상태 이상 감지 - 충전소로 재이동");
            currentNodeName = CHARGING_STATION_NAME;
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${e.enableSingleDestination?"isSingleDrivingActive = false;":""}
            ${e.enableScenarioMode?"isScenarioActive = false;":""}
            robot_state = "이동 중";
        }

        // 충전 완료 처리 (위 버튼 처리로 상태가 바뀌지 않은 경우만)
        // ${e.nightCharging.enabled?"야간 충전 윈도우 활성화 시 자동 언도킹 방지":""}
        if (robot_state == "충전 중" && BATTERY_POWER >= BATTERY_HIGH_LEVEL && IS_DRIVING_CANCELED == 0${e.nightCharging.enabled?" && isNightChargeWindow == false":""})
        {
${m}
        }
    }

    대기시간(0.1);
}

// EMS_ON이 1이 되어 메인 루프 종료됨
${e.audio.enabled?'스피커재생("silent", 1, true);  // EMS 시 오디오 중지':""}
start_script = false;
EMS = 1;  // 대시보드 동기화용 EMS 변수 업데이트

while (1)
{
    대기시간(0.1);
}
`}function Vp(e){const t=Fs(e),n=Us(e),i=t.some((y,d)=>y!==n[d]);let l="";for(let y=0;y<t.length;y++){const d=e.enableMultiStopQueue?"input_queueNodeIndex":"input_directDrivingNodeIndex";i&&t[y]!==n[y]?l+=`// 버튼 "${y+1}" → ${d} = ${y} → 표시: ${t[y]} (맵: ${n[y]})
`:l+=`// 버튼 "${y+1}" → ${d} = ${y} → 노드: ${t[y]}
`}const s=[];e.enableMultiStopQueue&&s.push("다중 정차 큐 모드"),e.enableSingleDestination&&s.push("단일 목적지 모드"),e.enableScenarioMode&&s.push("시나리오 모드");const a=(y,d)=>y==="waitForButton"?"버튼 대기":y==="countdown"?`카운트다운 (${d}초)`:"즉시 진행",o=[];if(e.enableMultiStopQueue){const y=e.waitTimeSettings.multiStopWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds;o.push(`다중정차: ${a(e.multiStopArrivalBehavior,y)}`)}if(e.enableSingleDestination){const y=e.waitTimeSettings.singleDestWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds;o.push(`단일목적지: ${a(e.singleDestinationArrivalBehavior,y)}`)}if(e.enableScenarioMode){const y=e.waitTimeSettings.scenarioWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds;o.push(`시나리오: ${a(e.scenarioArrivalBehavior,y)}`)}const u=o.join(", ")||"없음";let c="";e.afterChargingBehavior==="returnToStart"?c="충전 완료 후 시작 위치로 자동 복귀":e.afterChargingBehavior==="stayAtCharger"?c="충전 완료 후 충전소에서 대기 (언도킹 안함)":c="충전 완료 후 언도킹하여 제자리 대기";let v="";e.enableMultiStopQueue&&(v+=`
// [다중 정차 큐 모드 - 입력 변수]
// input_queueNodeIndex     = 0~${t.length-1}  → 큐에 노드 추가 (최대 ${e.queue.maxSize}개)
// input_startDrivingPressed = true   → 큐에 담긴 경로로 주행 시작
// input_clearQueue         = true    → 큐 비우기 (모든 노드 삭제)
${e.repeat.enabled?`// input_repeatPlusPressed  = true    → 반복 횟수 증가
// input_repeatMinusPressed = true    → 반복 횟수 감소`:""}`),e.enableSingleDestination&&(v+=`

// [단일 목적지 모드 - 입력 변수]
// input_directDrivingNodeIndex = 0~${t.length-1}  → 클릭 즉시 해당 노드로 이동`),e.enableScenarioMode&&e.scenarios.length>0&&(v+=`

// [시나리오 모드 - 입력 변수]
// input_scenarioIndex = 0~${e.scenarios.length-1}  → 시나리오 시작
${e.scenarios.map((y,d)=>`//   ${d}: "${y.name}" (${y.nodes.join(" → ")})`).join(`
`)}`);let x="";Ue(e)&&(x=`
// [카운트다운 모드 전용]
${e.waitTimeSettings.allowSkip?"// input_skipWait          = true    → 대기 스킵":""}
${e.waitTimeSettings.allowIncrease?`// input_waitTimeIncrease  = true    → 대기 시간 +${e.waitTimeSettings.stepSize}초`:""}
${e.waitTimeSettings.allowDecrease?`// input_waitTimeDecrease  = true    → 대기 시간 -${e.waitTimeSettings.stepSize}초`:""}
// output_waitCountdown      → 남은 대기 시간 (초)`);let g="";return e.enableMultiStopQueue&&(g+=`
// [다중 정차 큐 모드 - 출력 변수]
${Array.from({length:e.queue.maxSize},(y,d)=>`// output_selectedQueue[${d}]    → 다중정차 경유지 ${d+1}번째`).join(`
`)}
// output_queueSize          → 현재 큐에 담긴 목적지 수
// output_maxQueueSize       → 경유지 추가 최대 큐 크기 (${e.queue.maxSize})
${e.repeat.enabled?`// output_repeatCount       → 설정된 반복 횟수
// output_repeatRemaining   → 남은 반복 횟수 (실시간)`:""}`),`/*
 * ===================================================================
 * 대시보드 설정 요약 및 가이드
 * Script Name: ${e.scriptName}
 * 생성 시각: ${new Date().toLocaleString("ko-KR",{timeZone:"Asia/Seoul"})}
 * ===================================================================
 */

// ============== 활성화된 모드 ==============
${s.map(y=>`// ✓ ${y}`).join(`
`)}

// ============== 도착 동작 설정 ==============
// ${u}
${e.enableMultiStopQueue&&e.multiStopCompletionReturn?`// 다중정차 완료 후 복귀: ${e.multiStopCompletionReturn}`:""}
${e.enableSingleDestination&&e.singleDestCompletionReturn?`// 단일이동 완료 후 복귀: ${e.singleDestCompletionReturn}`:""}
${e.enableScenarioMode&&e.scenarioCompletionReturn?`// 시나리오 완료 후 복귀: ${e.scenarioCompletionReturn}`:""}

// ============== 충전 동작 설정 ==============
// ${c}
// 저배터리 임계값: ${e.batteryLowLevel}%
// 충전 완료 임계값: ${e.batteryHighLevel}%
// 자동 충전: ${e.autoChargeTrigger==="never"?"비활성화 (수동만)":"대기 중 배터리 부족 시"}
${e.lowBatteryReturn.enabled&&e.lowBatteryReturn.nodeName?`// 저배터리 시 복귀 위치: ${e.lowBatteryReturn.nodeName} (충전 대신 이 위치로 이동)`:""}

${e.nightCharging.enabled?`// ============== 야간 충전 윈도우 ==============
// 시간: ${String(e.nightCharging.startHour).padStart(2,"0")}:${String(e.nightCharging.startMinute).padStart(2,"0")} ~ ${String(e.nightCharging.endHour).padStart(2,"0")}:${String(e.nightCharging.endMinute).padStart(2,"0")}
// 동작: 충전 완료 시 자동 언도킹 방지 (수동 주행 명령은 허용)`:""}

${e.audio.enabled?`// ============== 오디오 설정 ==============
// 볼륨: ${e.audio.volume}%
// 
// ⚠️ 필수 파일: silent.mp3 (오디오 중지/초기화용)
//
// 도착 시 사운드: ${e.audio.playOnArrival?`활성화 (${e.audio.arrivalSoundFile}.mp3) - 1회 재생`:"비활성화"}
// 주행 중 사운드: ${e.audio.playOnDriveStart?`활성화 (${e.audio.driveStartSoundFile}.mp3) - 주행 중 무한 반복, 도착/취소 시 자동 중지`:"비활성화"}
// 저배터리 사운드: ${e.audio.playOnLowBattery?`활성화 (${e.audio.lowBatterySoundFile}.mp3) - 저배터리 시 1회 재생`:"비활성화"}
// 장애물 감지 사운드: ${e.audio.playOnBlocked?`활성화 (${e.audio.blockedSoundFile}.mp3) - 장애물 감지(BLOCKED) 중 무한 반복`:"비활성화"}`:""}

// ============== 화면 구성 ==============
//
// 1. default (기본 대시보드)
//    - 스크립트 시작 버튼 (scriptExecute: ${e.scriptName})
//    - 자동 모드 전환 버튼
//
// 2. 메인 화면
//    - 목적지 선택 화면
//    - 현재 위치 표시 (output_currentRobotLocation)
//
${e.enableMultiStopQueue?`// 3. 경유지 설정
//    - ${t.length}개 노드 버튼
//    - 다중정차 경유지 목록 표시 (output_selectedQueue[0~${e.queue.maxSize-1}])
${e.repeat.enabled?"//    - 반복 횟수 조절 버튼":""}
//    - 이동 시작 버튼
//`:""}
// 4. 이동 중
//    - 목적지 표시 (output_targetNodeName)
//    - 남은 노드 수 (output_remainingNodes)
//    - 주행 취소 버튼
//
// 5. 도착 후 동작 (모드별로 다른 화면으로 이동)
//    - 도착 동작: ${u}
${On(e)?`//
// 5-a. 버튼 대기 화면 (robot_state == "버튼 대기")
//    - 도착 확인 버튼 (isMoveComplete = true)`:""}
${Ue(e)?`//
// 5-b. 카운트다운 화면 (robot_state == "카운트다운")
//    - 카운트다운 표시 (output_waitCountdown)
${e.waitTimeSettings.allowSkip?"//    - 스킵 버튼 (input_skipWait)":""}
${e.waitTimeSettings.allowIncrease?"//    - 시간 증가 버튼 (input_waitTimeIncrease)":""}
${e.waitTimeSettings.allowDecrease?"//    - 시간 감소 버튼 (input_waitTimeDecrease)":""}`:""}
//
// 6. 충전 중
//    - 배터리 상태 표시 (BATTERY_POWER)
//
// 7. 장애물 감지 중
//    - 주행 취소 버튼
//
// 8. 비상정지 중
//    - 스크립트 재시작 버튼

// ============== 버튼 → 변수 매핑 ==============
${l}
// [공통 버튼]
// "충전소 이동"   → input_goToCharger = true     → ${e.chargingStationName}
// "시작 위치"     → input_goToStart = true       → ${e.startNodeName}
// "취소"          → 대시보드 시스템 취소 버튼 사용 (drivingCancel 위젯)
${On(e)?`//
// [버튼 대기 모드]
// "도착 확인"     → isMoveComplete = true        → 다음 목적지로 이동`:""}
${v}
${x}

// ============== 표시용 OUTPUT 변수 ==============
// start_script                → 스크립트 실행 상태 (true=실행 중, false=종료됨)
// robot_state                 → 현재 상태 머신 상태
// EMS                         → EMS 상태 (대시보드 화면 전환용, 0=정상, 1=EMS 활성화)
// output_currentRobotLocation → 현재 로봇 위치
// output_targetNodeName       → 현재 이동 중인 목적지
// output_remainingNodes       → 남은 목적지 수
${e.showScenarioPositionWarning?"// scenarioWarning             → 시나리오 위치 경고 (true=경고 표시 중)":""}
${g}

// ============== 화면 자동 전환 조건 ==============
// conditionAutoRedirection 위젯으로 설정:
//
// start_script == true         → 메인 화면
// start_script == false        → default
// robot_state == "이동 중"     → 이동 중 화면
// robot_state == "충전 중"     → 충전 중 화면
${On(e)?'// robot_state == "버튼 대기"   → 도착 확인 버튼 화면':""}
${Ue(e)?'// robot_state == "카운트다운"  → 카운트다운 화면':""}
// robot_state == "다음 목적지" → (짧은 상태, 화면 전환 불필요)
// robot_state == "대기 중"     → 대기 중 화면
// DRIVING_STATUS == "BLOCKED"  → 장애물 감지 중 화면
// EMS == 1                     → 비상정지 중 화면 (대시보드 동기화용 변수 사용)
// LOCALIZATION_STATUS == 0     → 위치 추정 요청 중 화면
${e.showScenarioPositionWarning?"// scenarioWarning == true     → 시나리오 위치 경고 화면":""}

// ============== TCT 상태별 경고 이미지 (전역 설정) ==============
// 모든 대시보드에 적용해야 하는 전역 설정입니다.
// '변수 조건별 리소스 표시' 위젯 사용:
//
// 조건 변수: TCT_STATE
//   MANUAL_READY  → 자동동작실행안내.gif
//   AUTO_READY    → 자동동작실행안내.gif
//   STOPPED       → 자동동작실행안내.gif
//   ALARM         → 알람발생안내.gif
//   AUTO_RUNNING  → 공백.png (빈 이미지)
//
// 필요 파일: 자동동작실행안내.gif, 알람발생안내.gif, 공백.png
// 파일 위치: TCS 리소스관리 → resource → image 폴더
${e.showScenarioPositionWarning?`
// ============== 시나리오 위치 경고 위젯 ==============
// '변수 조건별 리소스 표시' 위젯 사용:
//
// 조건 변수: scenarioWarning
//   true   → 경고 이미지 파일
//   false  → 공백 이미지 (투명 or 빈 이미지)
`:""}
// ============== 설정 체크리스트 ==============
// □ 스크립트 파일(${e.scriptName}.chill)을 TCS에 업로드
// □ 대시보드 가이드에 맞게 대시보드 수동 구성
// □ 노드 이름이 로봇 맵의 실제 노드와 일치하는지 확인
//   ${t.slice(0,3).join(", ")}${t.length>3?", ...":""}
// □ 충전소 마커 ID(${e.chargingStationMarkerId})가 올바른지 확인
// □ 각 화면에서 버튼 동작 테스트
// □ 화면 자동 전환 테스트
${e.enableScenarioMode?`// □ 시나리오 동작 테스트 (${e.scenarios.length}개 시나리오)`:""}
${e.nightCharging.enabled?"// □ 야간 충전 윈도우 테스트":""}
`}function Gp({config:e}){const[t,n]=qe.useState("script"),i=Hp(e),l=Vp(e),s=(u,c)=>{navigator.clipboard.writeText(u).then(()=>{alert(`${c} 복사 완료!`)})},o=(()=>{switch(t){case"script":return{text:i,filename:`${e.scriptName}.chill`,label:"스크립트"};case"dashboard-guide":return{text:l,filename:"dashboard-guide.txt",label:"대시보드 가이드 (.txt)"}}})();return r.jsxs("div",{children:[r.jsxs("div",{style:{marginBottom:"1rem",display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[r.jsx("button",{className:`btn ${t==="script"?"btn-primary":"btn-outline"}`,onClick:()=>n("script"),style:{padding:"0.5rem 1rem",fontSize:"0.9rem"},children:"📄 스크립트 (.chill)"}),r.jsx("button",{className:`btn ${t==="dashboard-guide"?"btn-primary":"btn-outline"}`,onClick:()=>n("dashboard-guide"),style:{padding:"0.5rem 1rem",fontSize:"0.9rem"},children:"📖 대시보드 가이드 (.txt)"})]}),r.jsxs("div",{className:"code-preview",children:[r.jsxs("div",{className:"code-preview-header",children:[r.jsx("span",{children:o.filename}),r.jsx("button",{className:"btn btn-outline",style:{padding:"0.4rem 0.8rem",fontSize:"0.8rem"},onClick:()=>s(o.text,o.label),children:"복사"})]}),r.jsx("pre",{children:o.text})]}),t==="dashboard-guide"&&r.jsxs("div",{style:{marginTop:"1rem",padding:"1rem",background:"rgba(88, 166, 255, 0.1)",border:"1px solid rgba(88, 166, 255, 0.3)",borderRadius:"8px",fontSize:"0.9rem"},children:["💡 ",r.jsx("strong",{children:"팁:"})," 이 가이드를 복사하여 프로젝트 문서로 저장하면 나중에 참고하기 좋습니다. 각 노드 버튼과 변수 매핑이 현재 설정에 맞게 자동 생성됩니다."]})]})}function q({text:e}){return r.jsxs("span",{className:"help-tooltip-wrapper",children:[r.jsx("span",{className:"help-tooltip-icon",children:"?"}),r.jsx("span",{className:"help-tooltip-content",children:e})]})}function Be({title:e,icon:t,isOpen:n,onToggle:i,children:l}){return r.jsxs("div",{className:"card",children:[r.jsxs("div",{className:"section-header",onClick:i,style:{cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[r.jsxs("h3",{className:"card-title",style:{marginBottom:0},children:[t&&r.jsx("span",{style:{marginRight:"0.5rem"},children:t}),e]}),r.jsx("span",{style:{fontSize:"1.2rem",color:"var(--text-secondary)",display:"inline-block",transform:n?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.2s ease"},children:"▶"})]}),n&&r.jsx("div",{style:{marginTop:"1rem"},children:l})]})}function Qp({config:e}){const[t,n]=qe.useState(new Set(["variables","nodes","screens"])),i=Fs(e),l=Us(e),s=i.some((c,v)=>c!==l[v]),a=c=>{const v=new Set(t);v.has(c)?v.delete(c):v.add(c),n(v)},o=[];o.push({button:"충전소 이동",variable:"input_goToCharger",value:"true",description:"충전소로 즉시 이동"},{button:"시작 위치 이동",variable:"input_goToStart",value:"true",description:"시작 위치로 즉시 이동"}),On(e)&&o.push({button:"도착 확인 (적재 확인)",variable:"isMoveComplete",value:"true",description:"다음 목적지로 이동 진행",mode:"버튼 대기"}),e.enableMultiStopQueue&&o.push({button:"다중정차 큐 추가",variable:"input_queueNodeIndex",value:"0~"+(i.length-1),description:"해당 노드를 큐에 추가",mode:"다중정차(Multi-stop)"},{button:"다중정차 이동 시작",variable:"input_startDrivingPressed",value:"true",description:"큐에 담긴 경로로 주행 시작",mode:"다중정차(Multi-stop)"},{button:"큐 비우기",variable:"input_clearQueue",value:"true",description:"큐에 담긴 모든 노드 삭제",mode:"다중정차(Multi-stop)"}),e.repeat.enabled&&o.push({button:"반복 +",variable:"input_repeatPlusPressed",value:"true",description:"반복 횟수 증가",mode:"반복"},{button:"반복 -",variable:"input_repeatMinusPressed",value:"true",description:"반복 횟수 감소",mode:"반복"}),e.enableSingleDestination&&o.push({button:"단일이동 시작",variable:"input_directDrivingNodeIndex",value:"0~"+(i.length-1),description:"해당 노드로 즉시 이동",mode:"단일이동 (Single-stop)"}),e.enableScenarioMode&&e.scenarios.length>0&&o.push({button:"시나리오 시작",variable:"input_scenarioIndex",value:"0~"+(e.scenarios.length-1),description:"해당 시나리오 시작",mode:"시나리오"}),Ue(e)&&(e.waitTimeSettings.allowSkip&&o.push({button:"대기 스킵",variable:"input_skipWait",value:"true",description:"카운트다운 스킵하고 다음으로",mode:"카운트다운"}),e.waitTimeSettings.allowIncrease&&o.push({button:"시간 +",variable:"input_waitTimeIncrease",value:"true",description:`대기 시간 +${e.waitTimeSettings.stepSize}초`,mode:"카운트다운"}),e.waitTimeSettings.allowDecrease&&o.push({button:"시간 -",variable:"input_waitTimeDecrease",value:"true",description:`대기 시간 -${e.waitTimeSettings.stepSize}초`,mode:"카운트다운"}));const u=[{variable:"start_script",description:"스크립트 실행 상태 (true=실행 중, false=종료됨)"},{variable:"robot_state",description:"현재 상태 (INIT, 대기 중, 이동 중, 충전 중, 버튼 대기, 카운트다운, 다음 목적지)"},{variable:"EMS",description:"EMS 상태 (대시보드 화면 전환용, 0=정상, 1=EMS 활성화)"},{variable:"output_currentRobotLocation",description:"로봇 현재 위치"},{variable:"output_targetNodeName",description:"현재 목적지"},{variable:"output_remainingNodes",description:"남은 목적지 수"}];return e.enableMultiStopQueue&&u.push({variable:"output_selectedQueue[0~"+(e.queue.maxSize-1)+"]",description:"다중정차 경유지 목록 표시"},{variable:"output_queueSize",description:"다중정차 큐에 담긴 목적지 수"},{variable:"output_maxQueueSize",description:"경유지 추가 최대 큐 크기 ("+e.queue.maxSize+")"}),e.repeat.enabled&&u.push({variable:"output_repeatCount",description:"설정된 반복 횟수"},{variable:"output_repeatRemaining",description:"남은 반복 횟수 (실시간)"}),Ue(e)&&u.push({variable:"output_waitCountdown",description:"남은 대기 시간 (초)"}),e.showScenarioPositionWarning&&e.enableScenarioMode&&u.push({variable:"scenarioWarning",description:"시나리오 위치 경고 (true=경고 표시 중)"}),r.jsxs("div",{children:[r.jsxs("div",{className:"card",children:[r.jsx("h3",{className:"card-title",children:"현재 설정 요약"}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"주행 모드"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[e.enableMultiStopQueue&&r.jsx("span",{style:{background:"rgba(88, 166, 255, 0.2)",color:"var(--accent)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.85rem"},children:"✓ 다중정차 (Multi-stop)"}),e.enableSingleDestination&&r.jsx("span",{style:{background:"rgba(63, 185, 80, 0.2)",color:"var(--success)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.85rem"},children:"✓ 단일이동 (Single-stop)"}),e.enableScenarioMode&&r.jsx("span",{style:{background:"rgba(192, 132, 252, 0.2)",color:"#c084fc",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.85rem"},children:"✓ 시나리오"}),!e.enableMultiStopQueue&&!e.enableSingleDestination&&!e.enableScenarioMode&&r.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem"},children:"없음"})]})]}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"도착 후 동작"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[e.enableMultiStopQueue&&r.jsxs("span",{style:{background:"rgba(88, 166, 255, 0.15)",color:"var(--accent)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["다중정차→",e.multiStopArrivalBehavior==="waitForButton"?"버튼 대기⏸️":e.multiStopArrivalBehavior==="countdown"?`카운트다운⏱️(${e.waitTimeSettings.multiStopWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds}초)`:"즉시이동⏩"]}),e.enableSingleDestination&&r.jsxs("span",{style:{background:"rgba(63, 185, 80, 0.15)",color:"var(--success)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["단일 이동→",e.singleDestinationArrivalBehavior==="waitForButton"?"버튼 대기⏸️":e.singleDestinationArrivalBehavior==="countdown"?`카운트다운⏱️(${e.waitTimeSettings.singleDestWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds}초)`:"즉시이동⏩"]}),e.enableScenarioMode&&r.jsxs("span",{style:{background:"rgba(192, 132, 252, 0.15)",color:"#c084fc",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["시나리오→",e.scenarioArrivalBehavior==="waitForButton"?"버튼 대기⏸️":e.scenarioArrivalBehavior==="countdown"?`카운트다운⏱️(${e.waitTimeSettings.scenarioWaitTimeSeconds??e.waitTimeSettings.waitTimeSeconds}초)`:"즉시이동⏩"]})]})]}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"노드 설정"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[r.jsxs("span",{style:{background:"rgba(255, 255, 255, 0.1)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["목적지 노드: ",e.nodes.length,"개"]}),r.jsxs("span",{style:{background:"rgba(255, 255, 255, 0.1)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["시작 노드: ",e.startNodeName||"미설정"]}),r.jsxs("span",{style:{background:"rgba(255, 255, 255, 0.1)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["충전소: ",e.chargingStationName||"미설정"]}),!e.syncNodeDisplayNames&&r.jsx("span",{style:{background:"rgba(255, 193, 7, 0.15)",color:"#ffc107",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:"표시 이름 ≠ 맵 노드"})]})]}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"배터리 설정"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[r.jsxs("span",{style:{background:"rgba(239, 68, 68, 0.15)",color:"#ef4444",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["저전력: ",e.batteryLowLevel,"%"]}),r.jsxs("span",{style:{background:"rgba(34, 197, 94, 0.15)",color:"#22c55e",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["고전력: ",e.batteryHighLevel,"%"]})]})]}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"충전 설정"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[r.jsxs("span",{style:{background:"rgba(255, 193, 7, 0.15)",color:"#ffc107",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["자동 충전: ",e.autoChargeTrigger==="never"?"비활성화 (수동만)":"대기 중 저배터리"]}),r.jsxs("span",{style:{background:"rgba(255, 193, 7, 0.15)",color:"#ffc107",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["충전 완료 후: ",e.afterChargingBehavior==="stayAtCharger"?"충전소 대기":e.afterChargingBehavior==="goToIdle"?"언도킹 후 대기":"시작 위치 이동"]}),e.lowBatteryReturn.enabled&&e.lowBatteryReturn.nodeName&&r.jsxs("span",{style:{background:"rgba(255, 193, 7, 0.15)",color:"#ffc107",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["저배터리 복귀: ",e.lowBatteryReturn.nodeName]})]})]}),(e.multiStopCompletionReturn||e.singleDestCompletionReturn||e.scenarioCompletionReturn)&&r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"작업 완료 후 복귀"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[e.enableMultiStopQueue&&e.multiStopCompletionReturn&&r.jsxs("span",{style:{background:"rgba(88, 166, 255, 0.15)",color:"var(--accent)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["다중정차 → ",e.multiStopCompletionReturn]}),e.enableSingleDestination&&e.singleDestCompletionReturn&&r.jsxs("span",{style:{background:"rgba(63, 185, 80, 0.15)",color:"var(--success)",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["단일이동 → ",e.singleDestCompletionReturn]}),e.enableScenarioMode&&e.scenarioCompletionReturn&&r.jsxs("span",{style:{background:"rgba(192, 132, 252, 0.15)",color:"#c084fc",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["시나리오 → ",e.scenarioCompletionReturn]})]})]}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:"추가 설정"}),r.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[e.nightCharging.enabled&&r.jsxs("span",{style:{background:"rgba(99, 102, 241, 0.15)",color:"#818cf8",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["🌙 야간 충전 (",String(e.nightCharging.startHour).padStart(2,"0"),":",String(e.nightCharging.startMinute).padStart(2,"0"),"~",String(e.nightCharging.endHour).padStart(2,"0"),":",String(e.nightCharging.endMinute).padStart(2,"0"),")"]}),e.nightCharging.enabled&&e.nightCharging.autoChargeWhenIdle&&r.jsx("span",{style:{background:"rgba(99, 102, 241, 0.1)",color:"#818cf8",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:"대기 시 자동 충전"}),e.repeat.enabled&&r.jsxs("span",{style:{background:"rgba(251, 146, 60, 0.15)",color:"#fb923c",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["🔁 반복 (기본 ",e.repeat.defaultCount,"회, 최대 ",e.repeat.maxCount,"회)"]}),e.audio.enabled&&r.jsxs("span",{style:{background:"rgba(168, 85, 247, 0.15)",color:"#a855f7",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["🔊 오디오 (볼륨 ",e.audio.volume,"%)"]}),e.enableScenarioMode&&e.scenarios.length>0&&r.jsxs("span",{style:{background:"rgba(192, 132, 252, 0.1)",color:"#c084fc",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["시나리오 ",e.scenarios.length,"개"]}),e.showScenarioPositionWarning&&e.enableScenarioMode&&r.jsx("span",{style:{background:"rgba(255, 193, 7, 0.15)",color:"#ffc107",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:"⚠️ 시나리오 위치 경고"}),Ue(e)&&r.jsxs("span",{style:{background:"rgba(236, 72, 153, 0.1)",color:"#ec4899",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.8rem"},children:["⏱️ 조절: ",e.waitTimeSettings.allowSkip?"스킵":"",e.waitTimeSettings.allowIncrease?(e.waitTimeSettings.allowSkip?"/":"")+`+${e.waitTimeSettings.stepSize}초`:"",e.waitTimeSettings.allowDecrease?`/-${e.waitTimeSettings.stepSize}초`:""]}),!e.nightCharging.enabled&&!e.repeat.enabled&&!e.audio.enabled&&!Ue(e)&&r.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"0.85rem"},children:"없음"})]})]}),(e.enableMultiStopQueue&&e.enableSingleDestination||e.enableMultiStopQueue&&e.enableScenarioMode||e.enableSingleDestination&&e.enableScenarioMode)&&r.jsxs("div",{style:{background:"rgba(210, 153, 34, 0.1)",border:"1px solid rgba(210, 153, 34, 0.3)",borderRadius:"8px",padding:"0.75rem",fontSize:"0.85rem"},children:[r.jsx("strong",{style:{color:"var(--warning)"},children:"⚠️ 복수 모드 활성화"}),r.jsx("span",{style:{color:"var(--text-secondary)",marginLeft:"0.5rem"},children:"각 모드는 서로 다른 변수를 사용하므로 별도의 버튼/화면으로 구분하세요."})]})]}),r.jsx(Be,{title:"변수 매핑",icon:"📋",isOpen:t.has("variables"),onToggle:()=>a("variables"),children:r.jsxs(r.Fragment,{children:[r.jsxs("div",{style:{display:"flex",gap:"2.5rem",flexWrap:"wrap",marginBottom:"2rem"},children:[r.jsxs("div",{children:[r.jsx("strong",{style:{color:"#87CEEB"},children:"INPUT"}),": ",r.jsx("strong",{style:{color:"var(--text-primary)"},children:"변수변경"})," ",r.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:"0.9rem"},children:["(",r.jsx("code",{children:"modifyVariable"}),") 위젯 사용"]}),r.jsx(q,{text:"대시보드 버튼을 누르면 스크립트의 변수 값이 변경됩니다. 버튼 클릭 → 변수 변경 → 스크립트가 감지하여 동작 수행"})]}),r.jsxs("div",{children:[r.jsx("strong",{style:{color:"var(--success)"},children:"OUTPUT"}),": ",r.jsx("strong",{style:{color:"var(--text-primary)"},children:"변수상태"})," ",r.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:"0.9rem"},children:["(",r.jsx("code",{children:"userVariable"}),") 위젯 사용"]}),r.jsx(q,{text:"스크립트가 설정한 변수 값을 대시보드에 표시합니다. 로봇 상태, 현재 위치 등을 화면에 보여줄 때 사용"})]})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"#87CEEB"},children:"📥 INPUT (대시보드 → 스크립트)"}),r.jsxs("table",{className:"mapping-table",style:{marginBottom:"1rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"버튼"}),r.jsx("th",{children:"변수"}),r.jsx("th",{children:"값"}),r.jsx("th",{children:"모드"})]})}),r.jsx("tbody",{children:o.map((c,v)=>r.jsxs("tr",{children:[r.jsx("td",{children:c.button}),r.jsx("td",{children:r.jsx("code",{children:c.variable})}),r.jsx("td",{children:r.jsx("code",{children:c.value})}),r.jsx("td",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:c.mode||"공통"})]},v))})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--success)"},children:"📤 OUTPUT (스크립트 → 대시보드)"}),r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"변수"}),r.jsx("th",{children:"설명"})]})}),r.jsx("tbody",{children:u.map((c,v)=>r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:c.variable})}),r.jsx("td",{children:c.description})]},v))})]})]})}),r.jsx(Be,{title:"노드 인덱스 매핑",icon:"📍",isOpen:t.has("nodes"),onToggle:()=>a("nodes"),children:r.jsxs(r.Fragment,{children:[r.jsxs("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"0.5rem"},children:["⚠️ 인덱스는 0부터 시작합니다.",r.jsx(q,{text:"프로그래밍에서 배열 인덱스는 0부터 시작합니다. 대시보드에서 첫 번째 노드 버튼은 인덱스 0을 전송해야 합니다."})]}),s&&r.jsxs("div",{style:{background:"rgba(255, 193, 7, 0.1)",border:"1px solid rgba(255, 193, 7, 0.3)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:[r.jsx("strong",{style:{color:"#ffc107"},children:"💡 표시 이름 ≠ 맵 노드 이름:"})," 대시보드에는 ",r.jsx("strong",{children:"표시 이름"}),"이 표시되고, 실제 경로주행에는 ",r.jsx("strong",{children:"맵 노드 이름"}),"이 사용됩니다."]}),r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"#"}),r.jsx("th",{children:"인덱스"}),r.jsxs("th",{children:["표시 이름",s&&r.jsx(q,{text:"대시보드에 표시되는 이름 (output_currentRobotLocation 등)"})]}),s&&r.jsxs("th",{children:["맵 노드 이름",r.jsx(q,{text:"실제 경로주행에 사용되는 이름"})]}),e.enableMultiStopQueue&&r.jsx("th",{style:{background:"rgba(88, 166, 255, 0.2)"},children:"다중정차 (큐 추가)"}),e.enableSingleDestination&&r.jsx("th",{style:{background:"rgba(63, 185, 80, 0.2)"},children:"단일이동 (즉시 이동)"})]})}),r.jsx("tbody",{children:i.map((c,v)=>r.jsxs("tr",{children:[r.jsx("td",{children:v+1}),r.jsx("td",{children:r.jsx("code",{children:v})}),r.jsxs("td",{children:[c," ",r.jsxs("span",{style:{color:"var(--text-muted)",fontSize:"0.8rem"},children:["(",r.jsxs("code",{children:["ALL_NODES[",v,"]"]}),")"]})]}),s&&r.jsxs("td",{children:[r.jsx("code",{children:l[v]}),c!==l[v]&&r.jsx("span",{style:{color:"var(--warning)",marginLeft:"0.5rem"},children:"≠"})]}),e.enableMultiStopQueue&&r.jsx("td",{children:r.jsxs("code",{children:["input_queueNodeIndex = ",v]})}),e.enableSingleDestination&&r.jsx("td",{children:r.jsxs("code",{children:["input_directDrivingNodeIndex = ",v]})})]},v))})]}),e.enableScenarioMode&&e.scenarios.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("h4",{style:{fontSize:"0.9rem",marginTop:"1rem",marginBottom:"0.5rem"},children:"시나리오 매핑"}),r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"#"}),r.jsx("th",{children:"인덱스"}),r.jsx("th",{children:"표시 이름"}),r.jsx("th",{style:{background:"rgba(192, 132, 252, 0.2)"},children:"시나리오 (이동 시작)"}),r.jsx("th",{children:"경로"})]})}),r.jsx("tbody",{children:e.scenarios.map((c,v)=>r.jsxs("tr",{children:[r.jsx("td",{children:v+1}),r.jsx("td",{children:r.jsx("code",{children:v})}),r.jsxs("td",{children:[c.name," ",r.jsxs("span",{style:{color:"var(--text-muted)",fontSize:"0.8rem"},children:["(",r.jsxs("code",{children:["scenarioNames[",v,"]"]}),")"]})]}),r.jsx("td",{children:r.jsxs("code",{children:["input_scenarioIndex = ",v]})}),r.jsx("td",{style:{fontSize:"0.8rem"},children:c.nodes.join(" → ")})]},v))})]})]})]})}),r.jsx(Be,{title:"화면 전환 조건",icon:"🔄",isOpen:t.has("screens"),onToggle:()=>a("screens"),children:r.jsxs(r.Fragment,{children:[r.jsxs("p",{style:{marginBottom:"0.75rem"},children:[r.jsx("strong",{style:{color:"#ffb366"},children:"변수 조건별 대시보드 자동 이동"})," ",r.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:"0.9rem"},children:["(",r.jsx("code",{children:"conditionAutoRedirection"}),") 위젯을 각 화면에 배치하여 자동 전환"]}),r.jsx(q,{text:"이 위젯을 대시보드 각 화면에 배치하면, 조건이 충족될 때 자동으로 해당 화면으로 전환됩니다. 예: robot_state가 '이동 중'이면 이동 중 화면으로 자동 전환"})]}),r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"조건"}),r.jsx("th",{children:"값"}),r.jsx("th",{children:"이동 화면"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"start_script"})}),r.jsx("td",{children:r.jsx("code",{children:"true"})}),r.jsx("td",{children:"메인 화면"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"robot_state"})}),r.jsx("td",{children:r.jsx("code",{children:'"이동 중"'})}),r.jsx("td",{children:"이동 중"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"robot_state"})}),r.jsx("td",{children:r.jsx("code",{children:'"충전 중"'})}),r.jsx("td",{children:"충전 중"})]}),On(e)&&r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"robot_state"})}),r.jsx("td",{children:r.jsx("code",{children:'"버튼 대기"'})}),r.jsx("td",{children:"도착 확인 버튼 화면"})]}),Ue(e)&&r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"robot_state"})}),r.jsx("td",{children:r.jsx("code",{children:'"카운트다운"'})}),r.jsx("td",{children:"카운트다운 화면"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"robot_state"})}),r.jsx("td",{children:r.jsx("code",{children:'"다음 목적지"'})}),r.jsx("td",{children:"바로 다음 목적지 이동 (대시보드 필요 X)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"robot_state"})}),r.jsx("td",{children:r.jsx("code",{children:'"대기 중"'})}),r.jsx("td",{children:"대기 중"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"DRIVING_STATUS"})}),r.jsx("td",{children:r.jsx("code",{children:'"BLOCKED"'})}),r.jsx("td",{children:"장애물 감지 중"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"EMS"})}),r.jsx("td",{children:r.jsx("code",{children:"1"})}),r.jsx("td",{children:"비상정지 중"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"LOCALIZATION_STATUS"})}),r.jsx("td",{children:r.jsx("code",{children:"0"})}),r.jsx("td",{children:"위치 추정 요청"})]})]})]})]})}),e.nightCharging.enabled&&r.jsx(Be,{title:"야간 충전 설정",icon:"🌙",isOpen:t.has("nightCharging"),onToggle:()=>a("nightCharging"),children:r.jsxs(r.Fragment,{children:[r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:"야간 충전 윈도우가 활성화되어 있습니다. 이 시간대에는 특별한 충전 동작이 적용됩니다."}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--accent)"},children:"⏰ 야간 충전 시간"}),r.jsx("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:r.jsxs("p",{children:[r.jsx("strong",{children:"시작:"})," ",String(e.nightCharging.startHour).padStart(2,"0"),":",String(e.nightCharging.startMinute).padStart(2,"0")," →",r.jsx("strong",{children:" 종료:"})," ",String(e.nightCharging.endHour).padStart(2,"0"),":",String(e.nightCharging.endMinute).padStart(2,"0")]})}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--accent)"},children:"🔋 야간 충전 동작"}),r.jsxs("table",{className:"mapping-table",style:{marginBottom:"1rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"기능"}),r.jsx("th",{children:"설명"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:"충전 완료 시 자동 언도킹 방지"}),r.jsx("td",{children:"배터리가 가득 차도 야간 시간대에는 충전소에 머뭅니다"})]}),e.nightCharging.autoChargeWhenIdle&&r.jsxs("tr",{children:[r.jsx("td",{style:{color:"var(--success)"},children:"✓ 대기 중 자동 충전"}),r.jsx("td",{children:"야간 시간대에 로봇이 대기 중이면 자동으로 충전소로 이동합니다"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"수동 주행 명령"}),r.jsx("td",{children:"야간 시간대에도 버튼을 통한 수동 주행은 정상 작동합니다"})]})]})]}),r.jsxs("div",{style:{background:"rgba(255, 193, 7, 0.1)",border:"1px solid rgba(255, 193, 7, 0.3)",padding:"0.75rem",borderRadius:"8px",fontSize:"0.85rem"},children:[r.jsx("strong",{style:{color:"#ffc107"},children:"💡 참고:"})," 야간 충전은 스크립트 내부에서 자동으로 처리됩니다. 대시보드에 별도 설정이 필요하지 않습니다."]})]})}),e.audio.enabled&&r.jsx(Be,{title:"오디오 설정 가이드",icon:"🔊",isOpen:t.has("audio"),onToggle:()=>a("audio"),children:r.jsxs(r.Fragment,{children:[r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:"오디오 파일은 스크립트에서 직접 재생됩니다. 대시보드에 별도 설정이 필요하지 않습니다."}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--accent)"},children:"📁 필수 오디오 파일"}),r.jsxs("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:[r.jsxs("p",{style:{marginBottom:"0.5rem"},children:[r.jsx("strong",{children:"TCS 리소스관리"})," → ",r.jsx("strong",{children:"resource"})," → ",r.jsx("strong",{children:"audio"})," 폴더에 .mp3 파일 배치"]}),r.jsxs("table",{className:"mapping-table",style:{marginTop:"0.5rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"이벤트"}),r.jsx("th",{children:"파일명"}),r.jsx("th",{children:"재생 방식"}),r.jsx("th",{children:"상태"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{style:{background:"rgba(255, 193, 7, 0.1)"},children:[r.jsx("td",{children:r.jsx("strong",{children:"시스템 필수"})}),r.jsx("td",{children:r.jsx("code",{children:"silent.mp3"})}),r.jsx("td",{children:"오디오 중지/초기화용"}),r.jsx("td",{style:{color:"#ffc107"},children:"⚠️ 필수"})]}),e.audio.playOnArrival&&r.jsxs("tr",{children:[r.jsx("td",{children:"도착 시"}),r.jsx("td",{children:r.jsxs("code",{children:[e.audio.arrivalSoundFile,".mp3"]})}),r.jsx("td",{children:"1회 재생"}),r.jsx("td",{style:{color:"var(--success)"},children:"✓ 활성"})]}),e.audio.playOnDriveStart&&r.jsxs("tr",{children:[r.jsx("td",{children:"주행 중"}),r.jsx("td",{children:r.jsxs("code",{children:[e.audio.driveStartSoundFile,".mp3"]})}),r.jsx("td",{children:"무한 반복 (주행 종료까지)"}),r.jsx("td",{style:{color:"var(--success)"},children:"✓ 활성"})]}),e.audio.playOnLowBattery&&r.jsxs("tr",{children:[r.jsx("td",{children:"저배터리 경고"}),r.jsx("td",{children:r.jsxs("code",{children:[e.audio.lowBatterySoundFile,".mp3"]})}),r.jsx("td",{children:"1회 재생"}),r.jsx("td",{style:{color:"var(--success)"},children:"✓ 활성"})]}),e.audio.playOnBlocked&&r.jsxs("tr",{children:[r.jsx("td",{children:"장애물 감지"}),r.jsx("td",{children:r.jsxs("code",{children:[e.audio.blockedSoundFile,".mp3"]})}),r.jsx("td",{children:"무한 반복 (장애물 해제까지)"}),r.jsx("td",{style:{color:"var(--success)"},children:"✓ 활성"})]})]})]})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--accent)"},children:"🔊 오디오 재생 동작"}),r.jsx("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:r.jsxs("ul",{style:{margin:0,paddingLeft:"1.25rem"},children:[r.jsxs("li",{children:[r.jsx("strong",{children:"주행 중 오디오"}),": 주행이 시작되면 무한 반복 재생, 도착/취소 시 자동 중지"]}),r.jsxs("li",{children:[r.jsx("strong",{children:"장애물 감지 오디오"}),": 장애물 감지(BLOCKED) 상태에서 무한 반복 재생"]}),r.jsxs("li",{children:[r.jsx("strong",{children:"도착 오디오"}),": 목적지 도착 시 1회 재생"]}),r.jsxs("li",{children:[r.jsx("strong",{children:"저배터리 오디오"}),": 저배터리 시 대기 상태에서 1회 재생"]})]})}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--accent)"},children:"⚙️ 스크립트 함수"}),r.jsxs("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",fontSize:"0.85rem",fontFamily:"monospace"},children:[r.jsxs("p",{style:{marginBottom:"0.25rem"},children:[r.jsxs("code",{children:["setSpeakerVolume(",e.audio.volume,");"]})," ",r.jsx("span",{style:{color:"var(--text-secondary)"},children:"// 볼륨 설정"})]}),r.jsx("p",{style:{marginBottom:"0.25rem"},children:r.jsx("code",{children:'스피커재생("파일명", 반복횟수, 논블로킹);'})}),r.jsx("p",{style:{marginBottom:"0.25rem",paddingLeft:"1rem"},children:r.jsx("span",{style:{color:"var(--text-secondary)"},children:"• 반복횟수: 0=무한반복, 1=1회, 2=2회..."})}),r.jsx("p",{style:{marginBottom:"0.25rem",paddingLeft:"1rem"},children:r.jsx("span",{style:{color:"var(--text-secondary)"},children:"• 논블로킹: true=다음 코드 즉시 실행, false=재생 완료 대기"})}),r.jsxs("p",{children:[r.jsx("code",{children:'스피커재생("silent", 1, true);'})," ",r.jsx("span",{style:{color:"var(--text-secondary)"},children:"// 오디오 중지"})]})]})]})}),e.enableScenarioMode&&e.showScenarioPositionWarning&&r.jsx(Be,{title:"시나리오 위치 경고 설정",icon:"⚠️",isOpen:t.has("scenarioWarning"),onToggle:()=>a("scenarioWarning"),children:r.jsxs(r.Fragment,{children:[r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:'시나리오에 "시작 위치 제한"이 설정되어 있고, 로봇이 해당 위치에 없을 때 경고 이미지를 표시합니다.'}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--accent)"},children:"📋 시작 위치 제한이 설정된 시나리오"}),r.jsx("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:e.scenarios.filter(c=>c.requireStartFrom&&c.requireStartFrom.trim()!=="").length>0?r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"시나리오"}),r.jsx("th",{children:"필수 시작 위치"})]})}),r.jsx("tbody",{children:e.scenarios.filter(c=>c.requireStartFrom&&c.requireStartFrom.trim()!=="").map((c,v)=>r.jsxs("tr",{children:[r.jsx("td",{children:c.name}),r.jsx("td",{children:r.jsx("code",{children:c.requireStartFrom})})]},v))})]}):r.jsx("p",{style:{color:"var(--warning)"},children:"⚠️ 시작 위치 제한이 설정된 시나리오가 없습니다. 경고가 표시되지 않습니다."})}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--warning)"},children:"📁 경고 이미지 배치"}),r.jsx("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:r.jsxs("p",{children:[r.jsx("strong",{children:"TCS 리소스관리"})," → ",r.jsx("strong",{children:"resource"})," → ",r.jsx("strong",{children:"image"})," 폴더에 경고 이미지 파일 배치"]})}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--warning)"},children:"🖥️ 대시보드 설정"}),r.jsxs("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",fontSize:"0.85rem"},children:[r.jsxs("p",{style:{marginBottom:"0.5rem"},children:[r.jsx("strong",{children:"변수 조건별 리소스 표시"})," 위젯 사용:"]}),r.jsxs("table",{className:"mapping-table",style:{marginTop:"0.5rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"조건 변수"}),r.jsx("th",{children:"조건 값"}),r.jsx("th",{children:"표시 리소스"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"scenarioWarning"})}),r.jsx("td",{children:r.jsx("code",{children:"true"})}),r.jsx("td",{children:"경고 이미지 파일"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"scenarioWarning"})}),r.jsx("td",{children:r.jsx("code",{children:"false"})}),r.jsx("td",{children:"공백 이미지 (투명 or 빈 이미지)"})]})]})]}),r.jsxs("p",{style:{marginTop:"0.75rem",color:"var(--text-secondary)"},children:[r.jsx("code",{children:"scenarioWarning"}),"가 ",r.jsx("code",{children:"true"}),"일 때 경고 이미지가 표시되고, ",r.jsx("code",{children:"false"}),"일 때 공백 이미지로 전환됩니다."]})]})]})}),r.jsx(Be,{title:"TCT 상태별 경고 이미지 설정 (전역)",icon:"🚨",isOpen:t.has("tctState"),onToggle:()=>a("tctState"),children:r.jsxs(r.Fragment,{children:[r.jsxs("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:["TCT_STATE 변수를 사용하여 로봇 상태에 따른 경고 이미지를 표시합니다. ",r.jsx("strong",{children:"모든 대시보드에 적용해야 하는 전역 설정"}),"입니다."]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--warning)"},children:"📁 경고 이미지 배치"}),r.jsxs("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",marginBottom:"1rem",fontSize:"0.85rem"},children:[r.jsxs("p",{style:{marginBottom:"0.5rem"},children:[r.jsx("strong",{children:"TCS 리소스관리"})," → ",r.jsx("strong",{children:"resource"})," → ",r.jsx("strong",{children:"image"})," 폴더에 아래 파일 배치:"]}),r.jsxs("table",{className:"mapping-table",style:{marginTop:"0.5rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"파일명"}),r.jsx("th",{children:"용도"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"자동동작실행안내.gif"})}),r.jsx("td",{children:"자동 동작 실행 안내 (대기 상태)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"알람발생안내.gif"})}),r.jsx("td",{children:"알람 발생 안내"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"공백.png"})}),r.jsx("td",{children:"빈 이미지 (자동 실행 중일 때)"})]})]})]})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--warning)"},children:"🖥️ 대시보드 설정"}),r.jsxs("div",{style:{background:"var(--bg-dark)",padding:"0.75rem",borderRadius:"8px",fontSize:"0.85rem"},children:[r.jsxs("p",{style:{marginBottom:"0.5rem"},children:[r.jsx("strong",{children:"변수 조건별 리소스 표시"})," 위젯 사용:"]}),r.jsxs("table",{className:"mapping-table",style:{marginTop:"0.5rem"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"조건 변수"}),r.jsx("th",{children:"조건 값"}),r.jsx("th",{children:"표시 리소스"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TCT_STATE"})}),r.jsx("td",{children:r.jsx("code",{children:"MANUAL_READY"})}),r.jsx("td",{children:r.jsx("code",{children:"자동동작실행안내.gif"})})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TCT_STATE"})}),r.jsx("td",{children:r.jsx("code",{children:"AUTO_READY"})}),r.jsx("td",{children:r.jsx("code",{children:"자동동작실행안내.gif"})})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TCT_STATE"})}),r.jsx("td",{children:r.jsx("code",{children:"STOPPED"})}),r.jsx("td",{children:r.jsx("code",{children:"자동동작실행안내.gif"})})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TCT_STATE"})}),r.jsx("td",{children:r.jsx("code",{children:"ALARM"})}),r.jsx("td",{children:r.jsx("code",{children:"알람발생안내.gif"})})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TCT_STATE"})}),r.jsx("td",{children:r.jsx("code",{children:"AUTO_RUNNING"})}),r.jsx("td",{children:r.jsx("code",{children:"공백.png"})})]})]})]}),r.jsx("p",{style:{marginTop:"0.75rem",color:"var(--text-secondary)"},children:r.jsx("strong",{children:"TCT_STATE 값 설명:"})}),r.jsxs("ul",{style:{marginTop:"0.25rem",paddingLeft:"1.5rem",color:"var(--text-secondary)"},children:[r.jsxs("li",{children:[r.jsx("code",{children:"MANUAL_READY"}),": 수동 대기 상태"]}),r.jsxs("li",{children:[r.jsx("code",{children:"AUTO_READY"}),": 자동 대기 상태"]}),r.jsxs("li",{children:[r.jsx("code",{children:"STOPPED"}),": 정지 상태"]}),r.jsxs("li",{children:[r.jsx("code",{children:"ALARM"}),": 알람 발생 상태"]}),r.jsxs("li",{children:[r.jsx("code",{children:"AUTO_RUNNING"}),": 자동 실행 중 (경고 없음)"]})]})]})]})}),r.jsx(Be,{title:"위젯 타입 참조",icon:"🧩",isOpen:t.has("widgets"),onToggle:()=>a("widgets"),children:r.jsxs(r.Fragment,{children:[r.jsxs("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"0.75rem"},children:["대시보드에서 사용할 수 있는 위젯 타입입니다. 각 위젯은 특정 기능을 수행합니다.",r.jsx(q,{text:"대시보드 편집기에서 위젯을 추가하고, 위젯 속성에서 아래 설정값을 입력합니다."})]}),r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"위젯"}),r.jsx("th",{children:"용도"}),r.jsx("th",{children:"설정"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"modifyVariable"})}),r.jsxs("td",{children:["변수변경",r.jsx(q,{text:"버튼 클릭 시 스크립트 변수의 값을 변경합니다. 이동 시작, 도착 확인 등의 동작 트리거에 사용"})]}),r.jsxs("td",{children:[r.jsx("code",{children:"modifyDataList"}),"에 변수/값"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"userVariable"})}),r.jsxs("td",{children:["변수상태",r.jsx(q,{text:"스크립트에서 설정한 변수 값을 화면에 표시합니다. 현재 위치, 상태 등 정보 표시에 사용"})]}),r.jsxs("td",{children:[r.jsx("code",{children:"name"}),"에 변수명"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"conditionAutoRedirection"})}),r.jsxs("td",{children:["자동 화면 전환",r.jsx(q,{text:"조건이 충족되면 지정된 화면으로 자동 이동합니다. 각 화면에 배치하여 상태에 따른 화면 전환 구현"})]}),r.jsxs("td",{children:[r.jsx("code",{children:"conditions"}),"에 조건/대상"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"scriptExecute"})}),r.jsxs("td",{children:["스크립트 실행",r.jsx(q,{text:"TCS 스크립트를 시작합니다. 기본 화면에 배치하여 로봇 운영을 시작"})]}),r.jsxs("td",{children:[r.jsx("code",{children:"scriptName"}),": ",r.jsx("code",{children:e.scriptName})]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"scriptStop"})}),r.jsxs("td",{children:["스크립트 중지",r.jsx(q,{text:"실행 중인 스크립트를 중지합니다. 비상 상황 시 사용"})]}),r.jsx("td",{children:"설정 없음"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"drivingCancel"})}),r.jsxs("td",{children:["주행 취소",r.jsx(q,{text:"현재 진행 중인 주행을 취소합니다. 스크립트는 계속 실행됨"})]}),r.jsx("td",{children:"설정 없음"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"dashboardMove"})}),r.jsxs("td",{children:["화면 이동",r.jsx(q,{text:"버튼 클릭 시 지정된 화면으로 이동합니다. 수동 화면 전환에 사용"})]}),r.jsxs("td",{children:[r.jsx("code",{children:"dashboardName"}),"에 대상 화면"]})]})]})]})]})}),r.jsx(Be,{title:"시스템 내장 변수",icon:"⚙️",isOpen:t.has("system"),onToggle:()=>a("system"),children:r.jsxs(r.Fragment,{children:[r.jsx("p",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginBottom:"1rem"},children:"TCS 엔진에서 제공하는 시스템 변수 목록입니다. 스크립트 및 대시보드에서 읽기 전용으로 사용 가능합니다."}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"#87CEEB"},children:"✓ BOOL 타입"}),r.jsxs("table",{className:"mapping-table",style:{marginBottom:"1rem",tableLayout:"fixed",width:"100%"},children:[r.jsxs("colgroup",{children:[r.jsx("col",{style:{width:"500px"}}),r.jsx("col",{})]}),r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{background:"rgba(135, 206, 235, 0.2)",color:"#d0d0d0"},children:"변수"}),r.jsx("th",{children:"설명"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"EMS_ON"})}),r.jsx("td",{children:"비상정지 (0=해제, 1=활성)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"LOCALIZATION_STATUS"})}),r.jsx("td",{children:"위치 추정 (0=미완료, 1=완료, 2=진행중)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"CHARGING_BATTERY"})}),r.jsx("td",{children:"충전 중 (0=아니오, 1=예)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"DOCKING_STATE"})}),r.jsx("td",{children:"도킹 상태 (0=언도킹, 1=도킹)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"MASTER_CONNECTED"})}),r.jsx("td",{children:"마스터 연결 (0=끊김, 1=연결)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_IS_DEADLOCK"})}),r.jsx("td",{children:"경로 교착 상태"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_IS_POSSIBLE_CONCESSION"})}),r.jsx("td",{children:"양보 가능 여부"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"INTERNAL_PAUSE_ON"})}),r.jsx("td",{children:"내부 일시정지"})]})]})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"#f0e68c"},children:"✓ INT 타입"}),r.jsxs("table",{className:"mapping-table",style:{marginBottom:"1rem",tableLayout:"fixed",width:"100%"},children:[r.jsxs("colgroup",{children:[r.jsx("col",{style:{width:"500px"}}),r.jsx("col",{})]}),r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{background:"rgba(240, 230, 140, 0.2)",color:"#d0d0d0"},children:"변수"}),r.jsx("th",{children:"설명"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"BATTERY_POWER"})}),r.jsx("td",{children:"배터리 잔량 (%)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"ROBOT_ID"})}),r.jsx("td",{children:"로봇 ID"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"LINE_NO"})}),r.jsx("td",{children:"현재 실행 중인 스크립트 라인 번호"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"IS_ARRIVED"})}),r.jsx("td",{children:"도착 여부"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"IS_LOCALIZED"})}),r.jsx("td",{children:"위치 추정 완료 여부"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"IS_MODE_CHANGED"})}),r.jsx("td",{children:"모드 변경됨"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"IS_DRIVING_CANCELED"})}),r.jsx("td",{children:"주행 취소됨"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"NODE_STATUS"})}),r.jsx("td",{children:"노드 상태"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TIME_YEAR"})}),r.jsx("td",{children:"현재 년도"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TIME_MONTH"})}),r.jsx("td",{children:"현재 월 (1-12)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TIME_DAY"})}),r.jsx("td",{children:"현재 일 (1-31)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TIME_HOUR"})}),r.jsx("td",{children:"현재 시 (0-23)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TIME_MINUTE"})}),r.jsx("td",{children:"현재 분 (0-59)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TIME_SEC"})}),r.jsx("td",{children:"현재 초 (0-59)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TODAY_SECS"})}),r.jsx("td",{children:"오늘 0시부터 경과된 초"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"NAVI_MAIN_COMMAND_QUEUE_COUNT"})}),r.jsx("td",{children:"네비 명령 큐 수"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"TCT_MAIN_COMMAND_QUEUE_COUNT"})}),r.jsx("td",{children:"TCT 명령 큐 수"})]})]})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"#c084fc"},children:"✓ DOUBLE 타입"}),r.jsxs("table",{className:"mapping-table",style:{marginBottom:"1rem",tableLayout:"fixed",width:"100%"},children:[r.jsxs("colgroup",{children:[r.jsx("col",{style:{width:"500px"}}),r.jsx("col",{})]}),r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{background:"rgba(192, 132, 252, 0.2)",color:"#d0d0d0"},children:"변수"}),r.jsx("th",{children:"설명"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsxs("td",{children:[r.jsx("code",{children:"CURR_POS_X"}),", ",r.jsx("code",{children:"CURR_POS_Y"})]}),r.jsx("td",{children:"현재 위치 좌표"})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:[r.jsx("code",{children:"CURR_HEADING_RAD"}),", ",r.jsx("code",{children:"CURR_HEADING_DEG"})]}),r.jsx("td",{children:"현재 방향 (라디안/도)"})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:[r.jsx("code",{children:"CURR_VEL_X"}),", ",r.jsx("code",{children:"CURR_VEL_Y"})]}),r.jsx("td",{children:"현재 속도"})]}),r.jsxs("tr",{children:[r.jsxs("td",{children:[r.jsx("code",{children:"GOAL_POS_X"}),", ",r.jsx("code",{children:"GOAL_POS_Y"})]}),r.jsx("td",{children:"목표 위치 좌표"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"REMAINING_DIST"})}),r.jsx("td",{children:"남은 거리 (m)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"POSE_ACCURACY"})}),r.jsx("td",{children:"위치 정확도 (0-1)"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_ELAPSED_TIME"})}),r.jsx("td",{children:"경로 탐색 경과 시간"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_ESTIMATE_REMAINING_TIME"})}),r.jsx("td",{children:"예상 남은 시간"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_ESTIMATE_REMAINING_DISTANCE"})}),r.jsx("td",{children:"예상 남은 거리"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"CURRENT_CLOCK"})}),r.jsx("td",{children:"현재 클럭"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PI"})}),r.jsx("td",{children:"원주율 상수"})]})]})]}),r.jsx("h4",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"var(--success)"},children:"✓ STRING 타입"}),r.jsxs("table",{className:"mapping-table",style:{tableLayout:"fixed",width:"100%"},children:[r.jsxs("colgroup",{children:[r.jsx("col",{style:{width:"500px"}}),r.jsx("col",{style:{width:"350px"}}),r.jsx("col",{style:{width:"auto"}})]}),r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{style:{background:"rgba(63, 185, 80, 0.2)",color:"#d0d0d0"},children:"변수"}),r.jsx("th",{children:"설명"}),r.jsx("th",{children:"예시 값"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"DRIVING_STATUS"})}),r.jsx("td",{children:"주행 상태"}),r.jsx("td",{children:"IDLE, MOVING, BLOCKED"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_STATE"})}),r.jsx("td",{children:"경로 탐색 상태"}),r.jsx("td",{children:"IDLE, DRIVING, COMPLETED, CANCELED"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"DRIVING_METHOD"})}),r.jsx("td",{children:"주행 방식"}),r.jsx("td",{children:"UNKNOWN, AUTO_DYNAMIC, ..."})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"ENGINE_MODE"})}),r.jsx("td",{children:"엔진 모드"}),r.jsx("td",{children:"AUTONOMOUS_DRIVE"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"SENSOR_STATE"})}),r.jsx("td",{children:"센서 상태"}),r.jsx("td",{children:"STABLE"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"ENGINE_VERSION"})}),r.jsx("td",{children:"엔진 버전"}),r.jsx("td",{children:"2.10.3"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"ROBOT_NAME"})}),r.jsx("td",{children:"로봇 이름"}),r.jsx("td",{children:"-"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"LOCAL_TIME"})}),r.jsx("td",{children:"현지 시각"}),r.jsx("td",{children:"2026-01-22_14:48:02"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"ENGINE_TIME"})}),r.jsx("td",{children:"엔진 시각 (ISO)"}),r.jsx("td",{children:"2026-01-22T14:48:00+09:00"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"CURRENT_FLOOR"})}),r.jsx("td",{children:"현재 층"}),r.jsx("td",{children:"1F"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"PATHFIND_FINAL_GOAL_NAME"})}),r.jsx("td",{children:"최종 목적지 이름"}),r.jsx("td",{children:"-"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:r.jsx("code",{children:"CODELINE_TXT"})}),r.jsx("td",{children:"현재 실행 중인 코드"}),r.jsx("td",{children:"대기시간(0.1);"})]})]})]})]})}),r.jsx(Be,{title:"문제 해결",icon:"🔧",isOpen:t.has("troubleshooting"),onToggle:()=>a("troubleshooting"),children:r.jsxs("table",{className:"mapping-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"증상"}),r.jsx("th",{children:"해결"})]})}),r.jsxs("tbody",{children:[r.jsxs("tr",{children:[r.jsx("td",{children:"스크립트 실행 안됨"}),r.jsxs("td",{children:[r.jsx("code",{children:"scriptName"}),"이 파일명과 일치하는지 확인 (확장자 제외)"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"버튼 반응 없음"}),r.jsxs("td",{children:[r.jsx("code",{children:"modifyVariable"}),"의 변수명/값 확인"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"화면 전환 안됨"}),r.jsxs("td",{children:[r.jsx("code",{children:"conditionAutoRedirection"})," 위젯 조건 확인"]})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"노드 이동 실패"}),r.jsx("td",{children:"스크립트의 노드 이름이 맵과 정확히 일치하는지 확인"})]}),r.jsxs("tr",{children:[r.jsx("td",{children:"충전소 도킹 실패"}),r.jsxs("td",{children:["마커 ID (",e.chargingStationMarkerId,") 확인"]})]})]})]})}),r.jsxs("div",{className:"card",children:[r.jsx("h3",{className:"card-title",children:"✅ 설정 체크리스트"}),r.jsxs("ol",{style:{paddingLeft:"1.5rem",lineHeight:"2",fontSize:"0.9rem"},children:[r.jsxs("li",{children:[r.jsxs("code",{children:[e.scriptName,".chill"]})," 파일을 TCS 스크립트에 복붙",r.jsx(q,{text:"OUTPUT 탭에서 스크립트를 복사하여 TCS 엔진의 스크립트 편집기에 붙여넣기"})]}),r.jsxs("li",{children:["대시보드를 설정에 맞게 수정",r.jsx(q,{text:"위의 변수 매핑과 화면 전환 조건을 참고하여 대시보드 위젯 구성"})]}),r.jsxs("li",{children:["노드 이름이 로봇 맵의 실제 노드 이름과 일치 확인",r.jsx(q,{text:"TCS 티칭 > 노드관리에서 노드 이름을 확인하고, 설정 탭의 맵 노드 이름과 정확히 일치시킴"})]}),r.jsxs("li",{children:["충전소 마커 ID (",e.chargingStationMarkerId,") 확인",r.jsx(q,{text:"충전 스테이션에 부착된 AruCo 마커의 ID. 충전소 설정에서 확인 가능"})]}),r.jsxs("li",{children:["각 버튼의 변수 값 설정 확인",r.jsx(q,{text:"대시보드의 modifyVariable 위젯에서 변수명과 값이 위의 매핑표와 일치하는지 확인"})]})]})]})]})}const Gl="autotcs-config";function qp(){try{const e=localStorage.getItem(Gl);if(e){const t=JSON.parse(e),i={...Vl(),...t};return i.queue||(i.queue={maxSize:20}),i}}catch(e){console.warn("Failed to load saved config:",e)}return Vl()}function Kp(){const[e,t]=qe.useState(qp),[n,i]=qe.useState("config"),[l,s]=qe.useState(new Set(Up));qe.useEffect(()=>{try{localStorage.setItem(Gl,JSON.stringify(e))}catch(c){console.warn("Failed to save config:",c)}},[e]);const a=()=>s(new Set(Za)),o=()=>s(new Set),u=l.size===Za.length;return r.jsxs("div",{className:"app-container",children:[r.jsxs("header",{className:"header",children:[r.jsx("h1",{style:{fontFamily:"'Furore', sans-serif",fontWeight:400,letterSpacing:"0.15em"},children:"AutoTCS"}),r.jsx("p",{children:"TCS 스크립트와 대시보드 설정을 자동 생성하는 tool 입니다"})]}),r.jsxs("div",{className:"tabs",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{style:{display:"flex",gap:"0.5rem",borderBottom:"1px solid var(--border)",paddingBottom:"0"},children:[r.jsx("button",{className:`tab ${n==="config"?"active":""}`,onClick:()=>i("config"),children:"설정"}),r.jsx("button",{className:`tab ${n==="preview"?"active":""}`,onClick:()=>i("preview"),children:"OUTPUT"}),r.jsx("button",{className:`tab ${n==="guide"?"active":""}`,onClick:()=>i("guide"),children:"대시보드 가이드"})]}),n==="config"&&r.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[r.jsxs("button",{className:"btn btn-outline-danger",onClick:()=>{window.confirm("모든 설정을 초기화하시겠습니까? 저장된 데이터가 삭제됩니다.")&&(localStorage.removeItem(Gl),t(Vl()))},style:{padding:"0.4rem 0.8rem",fontSize:"0.85rem"},children:[r.jsx("span",{style:{marginRight:"0.05rem"},children:"⚠"}),"초기화"]}),r.jsxs("button",{className:"btn btn-outline",onClick:u?o:a,style:{padding:"0.4rem 0.8rem",fontSize:"0.85rem"},children:[r.jsx("span",{style:{color:"var(--text-secondary)",marginRight:"0.05rem"},children:u?"▲":"▼"}),u?"모두 접기":"모두 펼치기"]})]})]}),n==="config"&&r.jsx(Wp,{config:e,onChange:t,expandedSections:l,onToggleSection:c=>{const v=new Set(l);v.has(c)?v.delete(c):v.add(c),s(v)}}),n==="preview"&&r.jsx(Gp,{config:e}),n==="guide"&&r.jsx(Qp,{config:e}),r.jsxs("footer",{className:"footer",children:[r.jsx("span",{style:{fontFamily:"'Furore', sans-serif",fontWeight:400},children:"AutoTCS"})," v1.0"]})]})}Zi.createRoot(document.getElementById("root")).render(r.jsx(Id.StrictMode,{children:r.jsx(Kp,{})}));
