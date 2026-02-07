import{S as ie,i as oe,s as ne,ai as de,aj as se,L as A,h as i,d as W,t as S,a as U,M as Y,N as re,C as ce,P as fe,D as pe,l as o,m as O,n as v,u as p,v as m,c as J,w as u,J as ue,p as me,I as be,k as I,o as _e,A as he}from"./index-BXdnPgBO.js";function ee(c,l,a){const s=c.slice();return s[4]=l[a],s}function te(c,l,a){const s=c.slice();return s[4]=l[a],s}function ae(c,l){let a,s=l[4].code+"",b,n,d,f;function k(){return l[3](l[4])}return{key:c,first:null,c(){a=p("button"),b=he(s),n=m(),u(a,"type","button"),u(a,"class","tab-item"),I(a,"active",l[0]===l[4].code),this.first=a},m(h,y){o(h,a,y),v(a,b),v(a,n),d||(f=_e(a,"click",k),d=!0)},p(h,y){l=h,y&2&&s!==(s=l[4].code+"")&&be(b,s),y&3&&I(a,"active",l[0]===l[4].code)},d(h){h&&i(a),d=!1,f()}}}function le(c,l){let a,s,b,n;return s=new se({props:{content:l[4].body}}),{key:c,first:null,c(){a=p("div"),J(s.$$.fragment),b=m(),u(a,"class","tab-item"),I(a,"active",l[0]===l[4].code),this.first=a},m(d,f){o(d,a,f),O(s,a,null),v(a,b),n=!0},p(d,f){l=d;const k={};f&2&&(k.content=l[4].body),s.$set(k),(!n||f&3)&&I(a,"active",l[0]===l[4].code)},i(d){n||(U(s.$$.fragment,d),n=!0)},o(d){S(s.$$.fragment,d),n=!1},d(d){d&&i(a),W(s)}}}function ge(c){let l,a,s,b,n,d,f,k,h,y,T,L,w,H,Z,D,R,P,z,j,E,C,N,$,M,g=[],K=new Map,G,B,_=[],Q=new Map,q;n=new de({props:{js:`import PocketBase from 'pocketbase';

const pb = new PocketBase('${c[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

// upload a single file
const formData = new FormData();
formData.append('files', fileInput.files[0]);

const result = await pb.files.upload(formData);

console.log(result);
// { files: [...] }`,dart:`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${c[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

// upload a single file
final formData = FormData();
formData.files.add(MapEntry(
  'files',
  MultipartFile.fromBytes(
    'example.jpg',
    await file.readAsBytes(),
    filename: 'example.jpg',
  ),
));

final result = await pb.files.upload(formData);

print(result);
// { files: [...] }`}}),D=new se({props:{content:`
            Content-Type: multipart/form-data; boundary=...

            --boundary
            Content-Disposition: form-data; name="files"; filename="example.jpg"
            Content-Type: image/jpeg

            ...file content...
            --boundary--
        `}});let x=A(c[1]);const V=e=>e[4].code;for(let e=0;e<x.length;e+=1){let t=te(c,x,e),r=V(t);K.set(r,g[e]=ae(r,t))}let F=A(c[1]);const X=e=>e[4].code;for(let e=0;e<F.length;e+=1){let t=ee(c,F,e),r=X(t);Q.set(r,_[e]=le(r,t))}return{c(){l=p("h3"),l.textContent="Upload Files",a=m(),s=p("div"),s.innerHTML=`<p>Upload one or more files to create standalone file records.
        Files are stored independently and can be referenced by collections later.</p>`,b=m(),J(n.$$.fragment),d=m(),f=p("h6"),f.textContent="API details",k=m(),h=p("div"),h.innerHTML='<strong class="label label-primary">POST</strong> <div class="content"><p>/api/files/upload</p></div> <p class="txt-hint txt-sm txt-right">Requires <code>Authorization:TOKEN</code> header</p>',y=m(),T=p("div"),T.textContent="Request body",L=m(),w=p("div"),H=p("p"),H.innerHTML="The request body should be a <code>multipart/form-data</code> with one or more files under the <code>files</code> field.",Z=m(),J(D.$$.fragment),R=m(),P=p("div"),P.textContent="Notes",z=m(),j=p("div"),j.innerHTML="<ul><li>Files are uploaded with randomly generated IDs (prefixed with <code>f_</code>)</li> <li>Maximum file size is configurable in Settings → Files storage</li> <li>Files are not automatically associated with any collection</li> <li>Use the returned file IDs to reference files in collection records</li></ul>",E=m(),C=p("div"),C.textContent="Responses",N=m(),$=p("div"),M=p("div");for(let e=0;e<g.length;e+=1)g[e].c();G=m(),B=p("div");for(let e=0;e<_.length;e+=1)_[e].c();u(l,"class","m-b-sm"),u(s,"class","content txt-lg m-b-sm"),u(f,"class","m-b-xs"),u(h,"class","alert alert-info"),u(T,"class","section-title"),u(w,"class","content m-b-base"),u(P,"class","section-title"),u(j,"class","content m-b-base"),u(C,"class","section-title"),u(M,"class","tabs-header compact combined left"),u(B,"class","tabs-content"),u($,"class","tabs")},m(e,t){o(e,l,t),o(e,a,t),o(e,s,t),o(e,b,t),O(n,e,t),o(e,d,t),o(e,f,t),o(e,k,t),o(e,h,t),o(e,y,t),o(e,T,t),o(e,L,t),o(e,w,t),v(w,H),v(w,Z),O(D,w,null),o(e,R,t),o(e,P,t),o(e,z,t),o(e,j,t),o(e,E,t),o(e,C,t),o(e,N,t),o(e,$,t),v($,M);for(let r=0;r<g.length;r+=1)g[r]&&g[r].m(M,null);v($,G),v($,B);for(let r=0;r<_.length;r+=1)_[r]&&_[r].m(B,null);q=!0},p(e,[t]){const r={};t&4&&(r.js=`import PocketBase from 'pocketbase';

const pb = new PocketBase('${e[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

// upload a single file
const formData = new FormData();
formData.append('files', fileInput.files[0]);

const result = await pb.files.upload(formData);

console.log(result);
// { files: [...] }`),t&4&&(r.dart=`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${e[2]}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

// upload a single file
final formData = FormData();
formData.files.add(MapEntry(
  'files',
  MultipartFile.fromBytes(
    'example.jpg',
    await file.readAsBytes(),
    filename: 'example.jpg',
  ),
));

final result = await pb.files.upload(formData);

print(result);
// { files: [...] }`),n.$set(r),t&3&&(x=A(e[1]),g=Y(g,t,V,1,e,x,K,M,re,ae,null,te)),t&3&&(F=A(e[1]),ce(),_=Y(_,t,X,1,e,F,Q,B,fe,le,null,ee),pe())},i(e){if(!q){U(n.$$.fragment,e),U(D.$$.fragment,e);for(let t=0;t<F.length;t+=1)U(_[t]);q=!0}},o(e){S(n.$$.fragment,e),S(D.$$.fragment,e);for(let t=0;t<_.length;t+=1)S(_[t]);q=!1},d(e){e&&(i(l),i(a),i(s),i(b),i(d),i(f),i(k),i(h),i(y),i(T),i(L),i(w),i(R),i(P),i(z),i(j),i(E),i(C),i(N),i($)),W(n,e),W(D);for(let t=0;t<g.length;t+=1)g[t].d();for(let t=0;t<_.length;t+=1)_[t].d()}}}function ke(c,l,a){let s,b=200,n=[];const d=f=>a(0,b=f.code);return a(2,s=ue.getApiExampleUrl(me.baseURL)),a(1,n=[{code:200,body:JSON.stringify({files:[{id:"f_abc123def456",original_name:"example.jpg",stored_name:"f_abc123def456.jpg",mime:"image/jpeg",size:1024e3,protected:!1,created_by:"abc123",created_at:"2024-01-01T10:00:00Z",updated_at:"2024-01-01T10:00:00Z"}]},null,2)},{code:400,body:`
                {
                  "status": 400,
                  "message": "Something went wrong while processing your request.",
                  "data": {}
                }
            `},{code:403,body:`
                {
                  "status": 403,
                  "message": "The request requires valid authorization token.",
                  "data": {}
                }
            `},{code:413,body:`
                {
                  "status": 413,
                  "message": "Request entity too large",
                  "data": {}
                }
            `}]),[b,n,s,d]}class ve extends ie{constructor(l){super(),oe(this,l,ke,ge,ne,{})}}export{ve as default};
