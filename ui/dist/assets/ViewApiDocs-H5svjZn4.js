import{S as X,i as Y,s as x,ai as ee,L as D,h as c,d as K,t as I,a as q,M as R,N as te,C as le,P as se,D as ae,l as d,m as Q,n as y,u as m,v as k,c as W,w as _,J as ie,p as ne,I as oe,k as L,o as ce,A as de,aj as fe}from"./index-BXdnPgBO.js";function V(f,s,l){const a=f.slice();return a[4]=s[l],a}function Z(f,s,l){const a=f.slice();return a[4]=s[l],a}function z(f,s){let l,a=s[4].code+"",p,i,n,r;function h(){return s[3](s[4])}return{key:f,first:null,c(){l=m("button"),p=de(a),i=k(),_(l,"type","button"),_(l,"class","tab-item"),L(l,"active",s[0]===s[4].code),this.first=l},m(u,v){d(u,l,v),y(l,p),y(l,i),n||(r=ce(l,"click",h),n=!0)},p(u,v){s=u,v&2&&a!==(a=s[4].code+"")&&oe(p,a),v&3&&L(l,"active",s[0]===s[4].code)},d(u){u&&c(l),n=!1,r()}}}function F(f,s){let l,a,p,i;return a=new fe({props:{content:s[4].body}}),{key:f,first:null,c(){l=m("div"),W(a.$$.fragment),p=k(),_(l,"class","tab-item"),L(l,"active",s[0]===s[4].code),this.first=l},m(n,r){d(n,l,r),Q(a,l,null),y(l,p),i=!0},p(n,r){s=n;const h={};r&2&&(h.content=s[4].body),a.$set(h),(!i||r&3)&&L(l,"active",s[0]===s[4].code)},i(n){i||(q(a.$$.fragment,n),i=!0)},o(n){I(a.$$.fragment,n),i=!1},d(n){n&&c(l),K(a)}}}function re(f){let s,l,a,p,i,n,r,h,u,v,w,O,T,S,j,H,$,P,g=[],U=new Map,E,C,b=[],G=new Map,M;i=new ee({props:{js:`import PocketBase from 'pocketbase';

const pb = new PocketBase('${f[2]}');

const file = await pb.files.getOne('f_abc123def456');

console.log(file);
// { id: "f_abc123def456", original_name: "example.jpg", ... }`,dart:`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${f[2]}');

final file = await pb.files.getOne('f_abc123def456');

print(file);
// { id: "f_abc123def456", original_name: "example.jpg", ... }`}});let A=D(f[1]);const J=e=>e[4].code;for(let e=0;e<A.length;e+=1){let t=Z(f,A,e),o=J(t);U.set(o,g[e]=z(o,t))}let B=D(f[1]);const N=e=>e[4].code;for(let e=0;e<B.length;e+=1){let t=V(f,B,e),o=N(t);G.set(o,b[e]=F(o,t))}return{c(){s=m("h3"),s.textContent="View File",l=k(),a=m("div"),a.innerHTML="<p>Get detailed information about a specific file by its ID.</p>",p=k(),W(i.$$.fragment),n=k(),r=m("h6"),r.textContent="API details",h=k(),u=m("div"),u.innerHTML='<strong class="label label-primary">GET</strong> <div class="content"><p>/api/files/{id}</p></div>',v=k(),w=m("div"),w.textContent="Path parameters",O=k(),T=m("table"),T.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th>Description</th></tr></thead> <tbody><tr><td>id</td> <td><span class="label">String</span></td> <td>The file ID (required).</td></tr></tbody>',S=k(),j=m("div"),j.textContent="Responses",H=k(),$=m("div"),P=m("div");for(let e=0;e<g.length;e+=1)g[e].c();E=k(),C=m("div");for(let e=0;e<b.length;e+=1)b[e].c();_(s,"class","m-b-sm"),_(a,"class","content txt-lg m-b-sm"),_(r,"class","m-b-xs"),_(u,"class","alert alert-info"),_(w,"class","section-title"),_(T,"class","table-compact table-border m-b-base"),_(j,"class","section-title"),_(P,"class","tabs-header compact combined left"),_(C,"class","tabs-content"),_($,"class","tabs")},m(e,t){d(e,s,t),d(e,l,t),d(e,a,t),d(e,p,t),Q(i,e,t),d(e,n,t),d(e,r,t),d(e,h,t),d(e,u,t),d(e,v,t),d(e,w,t),d(e,O,t),d(e,T,t),d(e,S,t),d(e,j,t),d(e,H,t),d(e,$,t),y($,P);for(let o=0;o<g.length;o+=1)g[o]&&g[o].m(P,null);y($,E),y($,C);for(let o=0;o<b.length;o+=1)b[o]&&b[o].m(C,null);M=!0},p(e,[t]){const o={};t&4&&(o.js=`import PocketBase from 'pocketbase';

const pb = new PocketBase('${e[2]}');

const file = await pb.files.getOne('f_abc123def456');

console.log(file);
// { id: "f_abc123def456", original_name: "example.jpg", ... }`),t&4&&(o.dart=`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${e[2]}');

final file = await pb.files.getOne('f_abc123def456');

print(file);
// { id: "f_abc123def456", original_name: "example.jpg", ... }`),i.$set(o),t&3&&(A=D(e[1]),g=R(g,t,J,1,e,A,U,P,te,z,null,Z)),t&3&&(B=D(e[1]),le(),b=R(b,t,N,1,e,B,G,C,se,F,null,V),ae())},i(e){if(!M){q(i.$$.fragment,e);for(let t=0;t<B.length;t+=1)q(b[t]);M=!0}},o(e){I(i.$$.fragment,e);for(let t=0;t<b.length;t+=1)I(b[t]);M=!1},d(e){e&&(c(s),c(l),c(a),c(p),c(n),c(r),c(h),c(u),c(v),c(w),c(O),c(T),c(S),c(j),c(H),c($)),K(i,e);for(let t=0;t<g.length;t+=1)g[t].d();for(let t=0;t<b.length;t+=1)b[t].d()}}}function pe(f,s,l){let a,p=200,i=[];const n=r=>l(0,p=r.code);return l(2,a=ie.getApiExampleUrl(ne.baseURL)),l(1,i=[{code:200,body:JSON.stringify({id:"f_abc123def456",original_name:"example.jpg",stored_name:"f_abc123def456.jpg",mime:"image/jpeg",size:1024e3,protected:!1,created_by:"abc123",created_at:"2024-01-01T10:00:00Z",updated_at:"2024-01-01T10:00:00Z"},null,2)},{code:404,body:`{
  "status": 404,
  "message": "The requested resource wasn't found.",
  "data": {}
}`}]),[p,i,a,n]}class _e extends X{constructor(s){super(),Y(this,s,pe,re,x,{})}}export{_e as default};
