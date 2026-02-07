import{S as Ce,i as Be,s as Le,ai as Te,L as J,h as u,d as ae,t as N,a as Q,I as G,M as ye,N as Se,C as je,P as De,D as Re,l as d,n as a,m as ne,u as c,A as $,v as k,c as ie,w as h,p as oe,J as Ue,k as O,o as qe,aj as Ee}from"./index-BXdnPgBO.js";import{F as Fe}from"./FieldsQueryParam-B0vPSaUP.js";function $e(n,s,l){const o=n.slice();return o[8]=s[l],o}function Me(n,s,l){const o=n.slice();return o[8]=s[l],o}function Ae(n,s){let l,o=s[8].code+"",p,b,i,f;function m(){return s[6](s[8])}return{key:n,first:null,c(){l=c("button"),p=$(o),b=k(),h(l,"class","tab-item"),O(l,"active",s[1]===s[8].code),this.first=l},m(v,w){d(v,l,w),a(l,p),a(l,b),i||(f=qe(l,"click",m),i=!0)},p(v,w){s=v,w&4&&o!==(o=s[8].code+"")&&G(p,o),w&6&&O(l,"active",s[1]===s[8].code)},d(v){v&&u(l),i=!1,f()}}}function Pe(n,s){let l,o,p,b;return o=new Ee({props:{content:s[8].body}}),{key:n,first:null,c(){l=c("div"),ie(o.$$.fragment),p=k(),h(l,"class","tab-item"),O(l,"active",s[1]===s[8].code),this.first=l},m(i,f){d(i,l,f),ne(o,l,null),a(l,p),b=!0},p(i,f){s=i;const m={};f&4&&(m.content=s[8].body),o.$set(m),(!b||f&6)&&O(l,"active",s[1]===s[8].code)},i(i){b||(Q(o.$$.fragment,i),b=!0)},o(i){N(o.$$.fragment,i),b=!1},d(i){i&&u(l),ae(o)}}}function He(n){var ke,ge;let s,l,o=n[0].name+"",p,b,i,f,m,v,w,g=n[0].name+"",z,ce,K,M,V,T,W,A,E,re,F,S,ue,X,H=n[0].name+"",Y,de,Z,j,x,P,ee,fe,te,L,le,D,se,C,R,y=[],me=new Map,pe,U,_=[],be=new Map,B;M=new Te({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${n[3]}');

        ...

        const result = await pb.collection('${(ke=n[0])==null?void 0:ke.name}').listAuthMethods();
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${n[3]}');

        ...

        final result = await pb.collection('${(ge=n[0])==null?void 0:ge.name}').listAuthMethods();
    `}}),L=new Fe({});let I=J(n[2]);const he=e=>e[8].code;for(let e=0;e<I.length;e+=1){let t=Me(n,I,e),r=he(t);me.set(r,y[e]=Ae(r,t))}let q=J(n[2]);const _e=e=>e[8].code;for(let e=0;e<q.length;e+=1){let t=$e(n,q,e),r=_e(t);be.set(r,_[e]=Pe(r,t))}return{c(){s=c("h3"),l=$("List auth methods ("),p=$(o),b=$(")"),i=k(),f=c("div"),m=c("p"),v=$("Returns a public list with all allowed "),w=c("strong"),z=$(g),ce=$(" authentication methods."),K=k(),ie(M.$$.fragment),V=k(),T=c("h6"),T.textContent="API details",W=k(),A=c("div"),E=c("strong"),E.textContent="GET",re=k(),F=c("div"),S=c("p"),ue=$("/api/collections/"),X=c("strong"),Y=$(H),de=$("/auth-methods"),Z=k(),j=c("div"),j.textContent="Query parameters",x=k(),P=c("table"),ee=c("thead"),ee.innerHTML='<tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr>',fe=k(),te=c("tbody"),ie(L.$$.fragment),le=k(),D=c("div"),D.textContent="Responses",se=k(),C=c("div"),R=c("div");for(let e=0;e<y.length;e+=1)y[e].c();pe=k(),U=c("div");for(let e=0;e<_.length;e+=1)_[e].c();h(s,"class","m-b-sm"),h(f,"class","content txt-lg m-b-sm"),h(T,"class","m-b-xs"),h(E,"class","label label-primary"),h(F,"class","content"),h(A,"class","alert alert-info"),h(j,"class","section-title"),h(P,"class","table-compact table-border m-b-base"),h(D,"class","section-title"),h(R,"class","tabs-header compact combined left"),h(U,"class","tabs-content"),h(C,"class","tabs")},m(e,t){d(e,s,t),a(s,l),a(s,p),a(s,b),d(e,i,t),d(e,f,t),a(f,m),a(m,v),a(m,w),a(w,z),a(m,ce),d(e,K,t),ne(M,e,t),d(e,V,t),d(e,T,t),d(e,W,t),d(e,A,t),a(A,E),a(A,re),a(A,F),a(F,S),a(S,ue),a(S,X),a(X,Y),a(S,de),d(e,Z,t),d(e,j,t),d(e,x,t),d(e,P,t),a(P,ee),a(P,fe),a(P,te),ne(L,te,null),d(e,le,t),d(e,D,t),d(e,se,t),d(e,C,t),a(C,R);for(let r=0;r<y.length;r+=1)y[r]&&y[r].m(R,null);a(C,pe),a(C,U);for(let r=0;r<_.length;r+=1)_[r]&&_[r].m(U,null);B=!0},p(e,[t]){var ve,we;(!B||t&1)&&o!==(o=e[0].name+"")&&G(p,o),(!B||t&1)&&g!==(g=e[0].name+"")&&G(z,g);const r={};t&9&&(r.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${e[3]}');

        ...

        const result = await pb.collection('${(ve=e[0])==null?void 0:ve.name}').listAuthMethods();
    `),t&9&&(r.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${e[3]}');

        ...

        final result = await pb.collection('${(we=e[0])==null?void 0:we.name}').listAuthMethods();
    `),M.$set(r),(!B||t&1)&&H!==(H=e[0].name+"")&&G(Y,H),t&6&&(I=J(e[2]),y=ye(y,t,he,1,e,I,me,R,Se,Ae,null,Me)),t&6&&(q=J(e[2]),je(),_=ye(_,t,_e,1,e,q,be,U,De,Pe,null,$e),Re())},i(e){if(!B){Q(M.$$.fragment,e),Q(L.$$.fragment,e);for(let t=0;t<q.length;t+=1)Q(_[t]);B=!0}},o(e){N(M.$$.fragment,e),N(L.$$.fragment,e);for(let t=0;t<_.length;t+=1)N(_[t]);B=!1},d(e){e&&(u(s),u(i),u(f),u(K),u(V),u(T),u(W),u(A),u(Z),u(j),u(x),u(P),u(le),u(D),u(se),u(C)),ae(M,e),ae(L);for(let t=0;t<y.length;t+=1)y[t].d();for(let t=0;t<_.length;t+=1)_[t].d()}}}function Ie(n,s,l){let o,{collection:p}=s,b=200,i=[],f={},m=!1;v();async function v(){l(5,m=!0);try{l(4,f=await oe.collection(p.name).listAuthMethods())}catch(g){oe.error(g)}l(5,m=!1)}const w=g=>l(1,b=g.code);return n.$$set=g=>{"collection"in g&&l(0,p=g.collection)},n.$$.update=()=>{n.$$.dirty&48&&l(2,i=[{code:200,body:m?"...":JSON.stringify(f,null,2)},{code:404,body:`
                {
                  "status": 404,
                  "message": "Missing collection context.",
                  "data": {}
                }
            `}])},l(3,o=Ue.getApiExampleUrl(oe.baseURL)),[p,b,i,o,f,m,w]}class Qe extends Ce{constructor(s){super(),Be(this,s,Ie,He,Le,{collection:0})}}export{Qe as default};
