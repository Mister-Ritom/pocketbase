import{S as te,i as le,s as se,ai as ae,L,h as o,d as Y,t as R,a as x,M as K,N as oe,C as ne,P as ie,D as ce,l as n,m as Z,n as $,u as b,v as _,c as ee,w as p,J as de,p as re,I as fe,k as S,o as pe,A as be,aj as me}from"./index-BXdnPgBO.js";function O(r,s,l){const a=r.slice();return a[4]=s[l],a}function V(r,s,l){const a=r.slice();return a[4]=s[l],a}function W(r,s){let l,a=s[4].code+"",m,i,c,f;function g(){return s[3](s[4])}return{key:r,first:null,c(){l=b("button"),m=be(a),i=_(),p(l,"type","button"),p(l,"class","tab-item"),S(l,"active",s[0]===s[4].code),this.first=l},m(h,v){n(h,l,v),$(l,m),$(l,i),c||(f=pe(l,"click",g),c=!0)},p(h,v){s=h,v&2&&a!==(a=s[4].code+"")&&fe(m,a),v&3&&S(l,"active",s[0]===s[4].code)},d(h){h&&o(l),c=!1,f()}}}function X(r,s){let l,a,m,i;return a=new me({props:{content:s[4].body}}),{key:r,first:null,c(){l=b("div"),ee(a.$$.fragment),m=_(),p(l,"class","tab-item"),S(l,"active",s[0]===s[4].code),this.first=l},m(c,f){n(c,l,f),Z(a,l,null),$(l,m),i=!0},p(c,f){s=c;const g={};f&2&&(g.content=s[4].body),a.$set(g),(!i||f&3)&&S(l,"active",s[0]===s[4].code)},i(c){i||(x(a.$$.fragment,c),i=!0)},o(c){R(a.$$.fragment,c),i=!1},d(c){c&&o(l),Y(a)}}}function ue(r){let s,l,a,m,i,c,f,g,h,v,w,H,U,q,T,I,j,E,P,F,y,C,k=[],G=new Map,J,D,u=[],N=new Map,M;i=new ae({props:{js:`import PocketBase from 'pocketbase';

const pb = new PocketBase('${r[2]}');

// download file
const fileUrl = pb.files.getUrl('f_abc123def456', 'example.jpg');
console.log(fileUrl);
// http://localhost:8090/api/files/f_abc123def456/example.jpg`,dart:`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${r[2]}');

// download file
final fileUrl = pb.files.getUrl('f_abc123def456', 'example.jpg');
print(fileUrl);
// http://localhost:8090/api/files/f_abc123def456/example.jpg`}});let A=L(r[1]);const Q=e=>e[4].code;for(let e=0;e<A.length;e+=1){let t=V(r,A,e),d=Q(t);G.set(d,k[e]=W(d,t))}let B=L(r[1]);const z=e=>e[4].code;for(let e=0;e<B.length;e+=1){let t=O(r,B,e),d=z(t);N.set(d,u[e]=X(d,t))}return{c(){s=b("h3"),s.textContent="Download File",l=_(),a=b("div"),a.innerHTML="<p>Download a file by its ID and filename.</p>",m=_(),ee(i.$$.fragment),c=_(),f=b("h6"),f.textContent="API details",g=_(),h=b("div"),h.innerHTML='<strong class="label label-primary">GET</strong> <div class="content"><p>/api/files/{id}/{filename}</p></div>',v=_(),w=b("div"),w.textContent="Path parameters",H=_(),U=b("table"),U.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th>Description</th></tr></thead> <tbody><tr><td>id</td> <td><span class="label">String</span></td> <td>The file ID (required).</td></tr> <tr><td>filename</td> <td><span class="label">String</span></td> <td>The stored filename (required).</td></tr></tbody>',q=_(),T=b("div"),T.textContent="Query parameters",I=_(),j=b("table"),j.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th>Description</th></tr></thead> <tbody><tr><td>token</td> <td><span class="label">String</span></td> <td>Access token for protected files.</td></tr></tbody>',E=_(),P=b("div"),P.textContent="Responses",F=_(),y=b("div"),C=b("div");for(let e=0;e<k.length;e+=1)k[e].c();J=_(),D=b("div");for(let e=0;e<u.length;e+=1)u[e].c();p(s,"class","m-b-sm"),p(a,"class","content txt-lg m-b-sm"),p(f,"class","m-b-xs"),p(h,"class","alert alert-info"),p(w,"class","section-title"),p(U,"class","table-compact table-border m-b-base"),p(T,"class","section-title"),p(j,"class","table-compact table-border m-b-base"),p(P,"class","section-title"),p(C,"class","tabs-header compact combined left"),p(D,"class","tabs-content"),p(y,"class","tabs")},m(e,t){n(e,s,t),n(e,l,t),n(e,a,t),n(e,m,t),Z(i,e,t),n(e,c,t),n(e,f,t),n(e,g,t),n(e,h,t),n(e,v,t),n(e,w,t),n(e,H,t),n(e,U,t),n(e,q,t),n(e,T,t),n(e,I,t),n(e,j,t),n(e,E,t),n(e,P,t),n(e,F,t),n(e,y,t),$(y,C);for(let d=0;d<k.length;d+=1)k[d]&&k[d].m(C,null);$(y,J),$(y,D);for(let d=0;d<u.length;d+=1)u[d]&&u[d].m(D,null);M=!0},p(e,[t]){const d={};t&4&&(d.js=`import PocketBase from 'pocketbase';

const pb = new PocketBase('${e[2]}');

// download file
const fileUrl = pb.files.getUrl('f_abc123def456', 'example.jpg');
console.log(fileUrl);
// http://localhost:8090/api/files/f_abc123def456/example.jpg`),t&4&&(d.dart=`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${e[2]}');

// download file
final fileUrl = pb.files.getUrl('f_abc123def456', 'example.jpg');
print(fileUrl);
// http://localhost:8090/api/files/f_abc123def456/example.jpg`),i.$set(d),t&3&&(A=L(e[1]),k=K(k,t,Q,1,e,A,G,C,oe,W,null,V)),t&3&&(B=L(e[1]),ne(),u=K(u,t,z,1,e,B,N,D,ie,X,null,O),ce())},i(e){if(!M){x(i.$$.fragment,e);for(let t=0;t<B.length;t+=1)x(u[t]);M=!0}},o(e){R(i.$$.fragment,e);for(let t=0;t<u.length;t+=1)R(u[t]);M=!1},d(e){e&&(o(s),o(l),o(a),o(m),o(c),o(f),o(g),o(h),o(v),o(w),o(H),o(U),o(q),o(T),o(I),o(j),o(E),o(P),o(F),o(y)),Y(i,e);for(let t=0;t<k.length;t+=1)k[t].d();for(let t=0;t<u.length;t+=1)u[t].d()}}}function _e(r,s,l){let a,m=200,i=[];const c=f=>l(0,m=f.code);return l(2,a=de.getApiExampleUrl(re.baseURL)),l(1,i=[{code:200,body:"// File content (binary data)"},{code:404,body:`{
  "status": 404,
  "message": "The requested resource wasn't found.",
  "data": {}
}`}]),[m,i,a,c]}class ke extends te{constructor(s){super(),le(this,s,_e,ue,se,{})}}export{ke as default};
