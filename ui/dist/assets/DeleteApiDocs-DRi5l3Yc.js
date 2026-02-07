import{S as X,i as Z,s as x,ai as ee,L as M,h as d,d as G,t as S,a as W,M as z,N as te,C as se,P as le,D as ae,l as c,m as Q,n as $,u as m,v as h,c as V,w as b,J as ie,p as oe,I as ne,k as E,o as de,A as ce,aj as re}from"./index-BXdnPgBO.js";function F(r,l,s){const a=r.slice();return a[4]=l[s],a}function J(r,l,s){const a=r.slice();return a[4]=l[s],a}function K(r,l){let s,a=l[4].code+"",p,i,o,f;function v(){return l[3](l[4])}return{key:r,first:null,c(){s=m("button"),p=ce(a),i=h(),b(s,"type","button"),b(s,"class","tab-item"),E(s,"active",l[0]===l[4].code),this.first=s},m(_,w){c(_,s,w),$(s,p),$(s,i),o||(f=de(s,"click",v),o=!0)},p(_,w){l=_,w&2&&a!==(a=l[4].code+"")&&ne(p,a),w&3&&E(s,"active",l[0]===l[4].code)},d(_){_&&d(s),o=!1,f()}}}function Y(r,l){let s,a,p,i;return a=new re({props:{content:l[4].body}}),{key:r,first:null,c(){s=m("div"),V(a.$$.fragment),p=h(),b(s,"class","tab-item"),E(s,"active",l[0]===l[4].code),this.first=s},m(o,f){c(o,s,f),Q(a,s,null),$(s,p),i=!0},p(o,f){l=o;const v={};f&2&&(v.content=l[4].body),a.$set(v),(!i||f&3)&&E(s,"active",l[0]===l[4].code)},i(o){i||(W(a.$$.fragment,o),i=!0)},o(o){S(a.$$.fragment,o),i=!1},d(o){o&&d(s),G(a)}}}function fe(r){let l,s,a,p,i,o,f,v,_,w,y,q,P,H,T,I,g,D,k=[],j=new Map,R,C,u=[],U=new Map,A;i=new ee({props:{js:`import PocketBase from 'pocketbase';

const pb = new PocketBase('${r[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

await pb.files.delete('f_abc123def456');
// file deleted`,dart:`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${r[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

await pb.files.delete('f_abc123def456');
// file deleted`}});let L=M(r[1]);const N=e=>e[4].code;for(let e=0;e<L.length;e+=1){let t=J(r,L,e),n=N(t);j.set(n,k[e]=K(n,t))}let B=M(r[1]);const O=e=>e[4].code;for(let e=0;e<B.length;e+=1){let t=F(r,B,e),n=O(t);U.set(n,u[e]=Y(n,t))}return{c(){l=m("h3"),l.textContent="Delete File",s=h(),a=m("div"),a.innerHTML="<p>Delete a file by its ID. Only the file owner or superusers can delete files.</p>",p=h(),V(i.$$.fragment),o=h(),f=m("h6"),f.textContent="API details",v=h(),_=m("div"),_.innerHTML='<strong class="label label-primary">DELETE</strong> <div class="content"><p>/api/files/{id}</p></div> <p class="txt-hint txt-sm txt-right">Requires <code>Authorization:TOKEN</code> header</p>',w=h(),y=m("div"),y.textContent="Path parameters",q=h(),P=m("table"),P.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th>Description</th></tr></thead> <tbody><tr><td>id</td> <td><span class="label">String</span></td> <td>The file ID (required).</td></tr></tbody>',H=h(),T=m("div"),T.textContent="Responses",I=h(),g=m("div"),D=m("div");for(let e=0;e<k.length;e+=1)k[e].c();R=h(),C=m("div");for(let e=0;e<u.length;e+=1)u[e].c();b(l,"class","m-b-sm"),b(a,"class","content txt-lg m-b-sm"),b(f,"class","m-b-xs"),b(_,"class","alert alert-info"),b(y,"class","section-title"),b(P,"class","table-compact table-border m-b-base"),b(T,"class","section-title"),b(D,"class","tabs-header compact combined left"),b(C,"class","tabs-content"),b(g,"class","tabs")},m(e,t){c(e,l,t),c(e,s,t),c(e,a,t),c(e,p,t),Q(i,e,t),c(e,o,t),c(e,f,t),c(e,v,t),c(e,_,t),c(e,w,t),c(e,y,t),c(e,q,t),c(e,P,t),c(e,H,t),c(e,T,t),c(e,I,t),c(e,g,t),$(g,D);for(let n=0;n<k.length;n+=1)k[n]&&k[n].m(D,null);$(g,R),$(g,C);for(let n=0;n<u.length;n+=1)u[n]&&u[n].m(C,null);A=!0},p(e,[t]){const n={};t&4&&(n.js=`import PocketBase from 'pocketbase';

const pb = new PocketBase('${e[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

await pb.files.delete('f_abc123def456');
// file deleted`),t&4&&(n.dart=`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${e[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

await pb.files.delete('f_abc123def456');
// file deleted`),i.$set(n),t&3&&(L=M(e[1]),k=z(k,t,N,1,e,L,j,D,te,K,null,J)),t&3&&(B=M(e[1]),se(),u=z(u,t,O,1,e,B,U,C,le,Y,null,F),ae())},i(e){if(!A){W(i.$$.fragment,e);for(let t=0;t<B.length;t+=1)W(u[t]);A=!0}},o(e){S(i.$$.fragment,e);for(let t=0;t<u.length;t+=1)S(u[t]);A=!1},d(e){e&&(d(l),d(s),d(a),d(p),d(o),d(f),d(v),d(_),d(w),d(y),d(q),d(P),d(H),d(T),d(I),d(g)),G(i,e);for(let t=0;t<k.length;t+=1)k[t].d();for(let t=0;t<u.length;t+=1)u[t].d()}}}function pe(r,l,s){let a,p=204,i=[];const o=f=>s(0,p=f.code);return s(2,a=ie.getApiExampleUrl(oe.baseURL)),s(1,i=[{code:204,body:""},{code:403,body:`{
  "status": 403,
  "message": "You don't have permission to delete this file",
  "data": {}
}`},{code:404,body:`{
  "status": 404,
  "message": "The requested resource wasn't found.",
  "data": {}
}`}]),[p,i,a,o]}class be extends X{constructor(l){super(),Z(this,l,pe,fe,x,{})}}export{be as default};
