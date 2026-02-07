import{S as X,i as Y,s as x,ai as ee,L as j,h as r,d as K,t as q,a as D,M as Z,N as te,C as se,P as le,D as ae,l as c,m as V,n as $,u as b,v as g,c as W,w as u,J as ie,p as oe,I as ne,k as A,o as re,A as ce,aj as pe}from"./index-BXdnPgBO.js";function z(p,l,s){const a=p.slice();return a[4]=l[s],a}function G(p,l,s){const a=p.slice();return a[4]=l[s],a}function O(p,l){let s,a=l[4].code+"",f,i,o,d;function h(){return l[3](l[4])}return{key:p,first:null,c(){s=b("button"),f=ce(a),i=g(),u(s,"type","button"),u(s,"class","tab-item"),A(s,"active",l[0]===l[4].code),this.first=s},m(_,v){c(_,s,v),$(s,f),$(s,i),o||(d=re(s,"click",h),o=!0)},p(_,v){l=_,v&2&&a!==(a=l[4].code+"")&&ne(f,a),v&3&&A(s,"active",l[0]===l[4].code)},d(_){_&&r(s),o=!1,d()}}}function Q(p,l){let s,a,f,i;return a=new pe({props:{content:l[4].body}}),{key:p,first:null,c(){s=b("div"),W(a.$$.fragment),f=g(),u(s,"class","tab-item"),A(s,"active",l[0]===l[4].code),this.first=s},m(o,d){c(o,s,d),V(a,s,null),$(s,f),i=!0},p(o,d){l=o;const h={};d&2&&(h.content=l[4].body),a.$set(h),(!i||d&3)&&A(s,"active",l[0]===l[4].code)},i(o){i||(D(a.$$.fragment,o),i=!0)},o(o){q(a.$$.fragment,o),i=!1},d(o){o&&r(s),K(a)}}}function de(p){let l,s,a,f,i,o,d,h,_,v,y,S,w,H,L,N,P,T,k=[],E=new Map,F,C,m=[],U=new Map,I;i=new ee({props:{js:`import PocketBase from 'pocketbase';

const pb = new PocketBase('${p[2]}');

const result = await pb.files.getList(1, 50, {
    filter: 'original_name ~ "image"',
});

console.log(result);
// { page: 1, perPage: 50, totalItems: 2, items: [...] }`,dart:`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${p[2]}');

final result = await pb.files.getList(
  page: 1,
  perPage: 50,
  filter: 'original_name ~ "image"',
);

print(result);
// { page: 1, perPage: 50, totalItems: 2, items: [...] }`}});let M=j(p[1]);const J=e=>e[4].code;for(let e=0;e<M.length;e+=1){let t=G(p,M,e),n=J(t);E.set(n,k[e]=O(n,t))}let B=j(p[1]);const R=e=>e[4].code;for(let e=0;e<B.length;e+=1){let t=z(p,B,e),n=R(t);U.set(n,m[e]=Q(n,t))}return{c(){l=b("h3"),l.textContent="List Files",s=g(),a=b("div"),a.innerHTML="<p>Fetch a paginated list of all standalone files.</p>",f=g(),W(i.$$.fragment),o=g(),d=b("h6"),d.textContent="API details",h=g(),_=b("div"),_.innerHTML='<strong class="label label-primary">GET</strong> <div class="content"><p>/api/files</p></div>',v=g(),y=b("div"),y.textContent="Query parameters",S=g(),w=b("table"),w.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th>Description</th></tr></thead> <tbody><tr><td>page</td> <td><span class="label">Number</span></td> <td>The page of the paginated list (default to 1).</td></tr> <tr><td>perPage</td> <td><span class="label">Number</span></td> <td>Max returned records per page (default to 30).</td></tr> <tr><td>filter</td> <td><span class="label">String</span></td> <td>Filter by file name. Ex.: <code>?filter=original_name~&quot;image&quot;</code></td></tr></tbody>',H=g(),L=b("div"),L.textContent="Responses",N=g(),P=b("div"),T=b("div");for(let e=0;e<k.length;e+=1)k[e].c();F=g(),C=b("div");for(let e=0;e<m.length;e+=1)m[e].c();u(l,"class","m-b-sm"),u(a,"class","content txt-lg m-b-sm"),u(d,"class","m-b-xs"),u(_,"class","alert alert-info"),u(y,"class","section-title"),u(w,"class","table-compact table-border m-b-base"),u(L,"class","section-title"),u(T,"class","tabs-header compact combined left"),u(C,"class","tabs-content"),u(P,"class","tabs")},m(e,t){c(e,l,t),c(e,s,t),c(e,a,t),c(e,f,t),V(i,e,t),c(e,o,t),c(e,d,t),c(e,h,t),c(e,_,t),c(e,v,t),c(e,y,t),c(e,S,t),c(e,w,t),c(e,H,t),c(e,L,t),c(e,N,t),c(e,P,t),$(P,T);for(let n=0;n<k.length;n+=1)k[n]&&k[n].m(T,null);$(P,F),$(P,C);for(let n=0;n<m.length;n+=1)m[n]&&m[n].m(C,null);I=!0},p(e,[t]){const n={};t&4&&(n.js=`import PocketBase from 'pocketbase';

const pb = new PocketBase('${e[2]}');

const result = await pb.files.getList(1, 50, {
    filter: 'original_name ~ "image"',
});

console.log(result);
// { page: 1, perPage: 50, totalItems: 2, items: [...] }`),t&4&&(n.dart=`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${e[2]}');

final result = await pb.files.getList(
  page: 1,
  perPage: 50,
  filter: 'original_name ~ "image"',
);

print(result);
// { page: 1, perPage: 50, totalItems: 2, items: [...] }`),i.$set(n),t&3&&(M=j(e[1]),k=Z(k,t,J,1,e,M,E,T,te,O,null,G)),t&3&&(B=j(e[1]),se(),m=Z(m,t,R,1,e,B,U,C,le,Q,null,z),ae())},i(e){if(!I){D(i.$$.fragment,e);for(let t=0;t<B.length;t+=1)D(m[t]);I=!0}},o(e){q(i.$$.fragment,e);for(let t=0;t<m.length;t+=1)q(m[t]);I=!1},d(e){e&&(r(l),r(s),r(a),r(f),r(o),r(d),r(h),r(_),r(v),r(y),r(S),r(w),r(H),r(L),r(N),r(P)),K(i,e);for(let t=0;t<k.length;t+=1)k[t].d();for(let t=0;t<m.length;t+=1)m[t].d()}}}function fe(p,l,s){let a,f=200,i=[];const o=d=>s(0,f=d.code);return s(2,a=ie.getApiExampleUrl(oe.baseURL)),s(1,i=[{code:200,body:JSON.stringify({page:1,perPage:30,totalPages:1,totalItems:2,items:[{id:"f_abc123def456",original_name:"example.jpg",stored_name:"f_abc123def456.jpg",mime:"image/jpeg",size:1024e3,protected:!1,created_by:"abc123",created_at:"2024-01-01T10:00:00Z",updated_at:"2024-01-01T10:00:00Z"}]},null,2)}]),[f,i,a,o]}class ue extends X{constructor(l){super(),Y(this,l,fe,de,x,{})}}export{ue as default};
