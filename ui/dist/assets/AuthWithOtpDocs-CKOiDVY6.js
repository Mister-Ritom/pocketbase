import{S as be,i as _e,s as ve,aj as ge,L as Y,h as b,d as x,t as E,a as J,I as ce,M as de,N as Ee,C as ue,P as Qe,D as he,l as _,n as s,m as ee,u as d,v as T,A as R,c as te,w as g,J as ke,k as V,o as $e,ai as Ke,Z as Me,p as Ze,ak as De}from"./index-BXdnPgBO.js";import{F as ze}from"./FieldsQueryParam-B0vPSaUP.js";function Be(a,t,e){const l=a.slice();return l[4]=t[e],l}function Ie(a,t,e){const l=a.slice();return l[4]=t[e],l}function We(a,t){let e,l=t[4].code+"",h,i,c,n;function m(){return t[3](t[4])}return{key:a,first:null,c(){e=d("button"),h=R(l),i=T(),g(e,"class","tab-item"),V(e,"active",t[1]===t[4].code),this.first=e},m(v,C){_(v,e,C),s(e,h),s(e,i),c||(n=$e(e,"click",m),c=!0)},p(v,C){t=v,C&4&&l!==(l=t[4].code+"")&&ce(h,l),C&6&&V(e,"active",t[1]===t[4].code)},d(v){v&&b(e),c=!1,n()}}}function Fe(a,t){let e,l,h,i;return l=new ge({props:{content:t[4].body}}),{key:a,first:null,c(){e=d("div"),te(l.$$.fragment),h=T(),g(e,"class","tab-item"),V(e,"active",t[1]===t[4].code),this.first=e},m(c,n){_(c,e,n),ee(l,e,null),s(e,h),i=!0},p(c,n){t=c;const m={};n&4&&(m.content=t[4].body),l.$set(m),(!i||n&6)&&V(e,"active",t[1]===t[4].code)},i(c){i||(J(l.$$.fragment,c),i=!0)},o(c){E(l.$$.fragment,c),i=!1},d(c){c&&b(e),x(l)}}}function Ge(a){let t,e,l,h,i,c,n,m=a[0].name+"",v,C,F,B,I,M,Q,D,L,y,O,q,k,H,N,A,Z,j,o,$,P,G,u,p,S,w,z,we,Te,Pe,pe,Oe,ye,le,fe,oe,me,X,ae,K=[],Se=new Map,qe,ne,U=[],Ce=new Map,se;P=new ge({props:{content:"?expand=relField1,relField2.subRelField"}}),le=new ze({props:{prefix:"record."}});let re=Y(a[2]);const Ae=r=>r[4].code;for(let r=0;r<re.length;r+=1){let f=Ie(a,re,r),W=Ae(f);Se.set(W,K[r]=We(W,f))}let ie=Y(a[2]);const Re=r=>r[4].code;for(let r=0;r<ie.length;r+=1){let f=Be(a,ie,r),W=Re(f);Ce.set(W,U[r]=Fe(W,f))}return{c(){t=d("div"),e=d("strong"),e.textContent="POST",l=T(),h=d("div"),i=d("p"),c=R("/api/collections/"),n=d("strong"),v=R(m),C=R("/auth-with-otp"),F=T(),B=d("div"),B.textContent="Body Parameters",I=T(),M=d("table"),M.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>otpId</span></div></td> <td><span class="label">String</span></td> <td>The id of the OTP request.</td></tr> <tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>password</span></div></td> <td><span class="label">String</span></td> <td>The one-time password.</td></tr></tbody>',Q=T(),D=d("div"),D.textContent="Query parameters",L=T(),y=d("table"),O=d("thead"),O.innerHTML='<tr><th>Param</th> <th>Type</th> <th width="60%">Description</th></tr>',q=T(),k=d("tbody"),H=d("tr"),N=d("td"),N.textContent="expand",A=T(),Z=d("td"),Z.innerHTML='<span class="label">String</span>',j=T(),o=d("td"),$=R(`Auto expand record relations. Ex.:
                `),te(P.$$.fragment),G=R(`
                Supports up to 6-levels depth nested relations expansion. `),u=d("br"),p=R(`
                The expanded relations will be appended to the record under the
                `),S=d("code"),S.textContent="expand",w=R(" property (eg. "),z=d("code"),z.textContent='"expand": {"relField1": {...}, ...}',we=R(`).
                `),Te=d("br"),Pe=R(`
                Only the relations to which the request user has permissions to `),pe=d("strong"),pe.textContent="view",Oe=R(" will be expanded."),ye=T(),te(le.$$.fragment),fe=T(),oe=d("div"),oe.textContent="Responses",me=T(),X=d("div"),ae=d("div");for(let r=0;r<K.length;r+=1)K[r].c();qe=T(),ne=d("div");for(let r=0;r<U.length;r+=1)U[r].c();g(e,"class","label label-primary"),g(h,"class","content"),g(t,"class","alert alert-success"),g(B,"class","section-title"),g(M,"class","table-compact table-border m-b-base"),g(D,"class","section-title"),g(y,"class","table-compact table-border m-b-base"),g(oe,"class","section-title"),g(ae,"class","tabs-header compact combined left"),g(ne,"class","tabs-content"),g(X,"class","tabs")},m(r,f){_(r,t,f),s(t,e),s(t,l),s(t,h),s(h,i),s(i,c),s(i,n),s(n,v),s(i,C),_(r,F,f),_(r,B,f),_(r,I,f),_(r,M,f),_(r,Q,f),_(r,D,f),_(r,L,f),_(r,y,f),s(y,O),s(y,q),s(y,k),s(k,H),s(H,N),s(H,A),s(H,Z),s(H,j),s(H,o),s(o,$),ee(P,o,null),s(o,G),s(o,u),s(o,p),s(o,S),s(o,w),s(o,z),s(o,we),s(o,Te),s(o,Pe),s(o,pe),s(o,Oe),s(k,ye),ee(le,k,null),_(r,fe,f),_(r,oe,f),_(r,me,f),_(r,X,f),s(X,ae);for(let W=0;W<K.length;W+=1)K[W]&&K[W].m(ae,null);s(X,qe),s(X,ne);for(let W=0;W<U.length;W+=1)U[W]&&U[W].m(ne,null);se=!0},p(r,[f]){(!se||f&1)&&m!==(m=r[0].name+"")&&ce(v,m),f&6&&(re=Y(r[2]),K=de(K,f,Ae,1,r,re,Se,ae,Ee,We,null,Ie)),f&6&&(ie=Y(r[2]),ue(),U=de(U,f,Re,1,r,ie,Ce,ne,Qe,Fe,null,Be),he())},i(r){if(!se){J(P.$$.fragment,r),J(le.$$.fragment,r);for(let f=0;f<ie.length;f+=1)J(U[f]);se=!0}},o(r){E(P.$$.fragment,r),E(le.$$.fragment,r);for(let f=0;f<U.length;f+=1)E(U[f]);se=!1},d(r){r&&(b(t),b(F),b(B),b(I),b(M),b(Q),b(D),b(L),b(y),b(fe),b(oe),b(me),b(X)),x(P),x(le);for(let f=0;f<K.length;f+=1)K[f].d();for(let f=0;f<U.length;f+=1)U[f].d()}}}function Xe(a,t,e){let{collection:l}=t,h=200,i=[];const c=n=>e(1,h=n.code);return a.$$set=n=>{"collection"in n&&e(0,l=n.collection)},a.$$.update=()=>{a.$$.dirty&1&&e(2,i=[{code:200,body:JSON.stringify({token:"JWT_TOKEN",record:ke.dummyCollectionRecord(l)},null,2)},{code:400,body:`
                {
                  "status": 400,
                  "message": "Failed to authenticate.",
                  "data": {
                    "otpId": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}])},[l,h,i,c]}class xe extends be{constructor(t){super(),_e(this,t,Xe,Ge,ve,{collection:0})}}function Le(a,t,e){const l=a.slice();return l[4]=t[e],l}function Ue(a,t,e){const l=a.slice();return l[4]=t[e],l}function He(a,t){let e,l=t[4].code+"",h,i,c,n;function m(){return t[3](t[4])}return{key:a,first:null,c(){e=d("button"),h=R(l),i=T(),g(e,"class","tab-item"),V(e,"active",t[1]===t[4].code),this.first=e},m(v,C){_(v,e,C),s(e,h),s(e,i),c||(n=$e(e,"click",m),c=!0)},p(v,C){t=v,C&4&&l!==(l=t[4].code+"")&&ce(h,l),C&6&&V(e,"active",t[1]===t[4].code)},d(v){v&&b(e),c=!1,n()}}}function Ne(a,t){let e,l,h,i;return l=new ge({props:{content:t[4].body}}),{key:a,first:null,c(){e=d("div"),te(l.$$.fragment),h=T(),g(e,"class","tab-item"),V(e,"active",t[1]===t[4].code),this.first=e},m(c,n){_(c,e,n),ee(l,e,null),s(e,h),i=!0},p(c,n){t=c;const m={};n&4&&(m.content=t[4].body),l.$set(m),(!i||n&6)&&V(e,"active",t[1]===t[4].code)},i(c){i||(J(l.$$.fragment,c),i=!0)},o(c){E(l.$$.fragment,c),i=!1},d(c){c&&b(e),x(l)}}}function et(a){let t,e,l,h,i,c,n,m=a[0].name+"",v,C,F,B,I,M,Q,D,L,y,O,q=[],k=new Map,H,N,A=[],Z=new Map,j,o=Y(a[2]);const $=u=>u[4].code;for(let u=0;u<o.length;u+=1){let p=Ue(a,o,u),S=$(p);k.set(S,q[u]=He(S,p))}let P=Y(a[2]);const G=u=>u[4].code;for(let u=0;u<P.length;u+=1){let p=Le(a,P,u),S=G(p);Z.set(S,A[u]=Ne(S,p))}return{c(){t=d("div"),e=d("strong"),e.textContent="POST",l=T(),h=d("div"),i=d("p"),c=R("/api/collections/"),n=d("strong"),v=R(m),C=R("/request-otp"),F=T(),B=d("div"),B.textContent="Body Parameters",I=T(),M=d("table"),M.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>email</span></div></td> <td><span class="label">String</span></td> <td>The auth record email address to send the OTP request (if exists).</td></tr></tbody>',Q=T(),D=d("div"),D.textContent="Responses",L=T(),y=d("div"),O=d("div");for(let u=0;u<q.length;u+=1)q[u].c();H=T(),N=d("div");for(let u=0;u<A.length;u+=1)A[u].c();g(e,"class","label label-primary"),g(h,"class","content"),g(t,"class","alert alert-success"),g(B,"class","section-title"),g(M,"class","table-compact table-border m-b-base"),g(D,"class","section-title"),g(O,"class","tabs-header compact combined left"),g(N,"class","tabs-content"),g(y,"class","tabs")},m(u,p){_(u,t,p),s(t,e),s(t,l),s(t,h),s(h,i),s(i,c),s(i,n),s(n,v),s(i,C),_(u,F,p),_(u,B,p),_(u,I,p),_(u,M,p),_(u,Q,p),_(u,D,p),_(u,L,p),_(u,y,p),s(y,O);for(let S=0;S<q.length;S+=1)q[S]&&q[S].m(O,null);s(y,H),s(y,N);for(let S=0;S<A.length;S+=1)A[S]&&A[S].m(N,null);j=!0},p(u,[p]){(!j||p&1)&&m!==(m=u[0].name+"")&&ce(v,m),p&6&&(o=Y(u[2]),q=de(q,p,$,1,u,o,k,O,Ee,He,null,Ue)),p&6&&(P=Y(u[2]),ue(),A=de(A,p,G,1,u,P,Z,N,Qe,Ne,null,Le),he())},i(u){if(!j){for(let p=0;p<P.length;p+=1)J(A[p]);j=!0}},o(u){for(let p=0;p<A.length;p+=1)E(A[p]);j=!1},d(u){u&&(b(t),b(F),b(B),b(I),b(M),b(Q),b(D),b(L),b(y));for(let p=0;p<q.length;p+=1)q[p].d();for(let p=0;p<A.length;p+=1)A[p].d()}}}function tt(a,t,e){let{collection:l}=t,h=200,i=[];const c=n=>e(1,h=n.code);return a.$$set=n=>{"collection"in n&&e(0,l=n.collection)},e(2,i=[{code:200,body:JSON.stringify({otpId:ke.randomString(15)},null,2)},{code:400,body:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "email": {
                      "code": "validation_is_email",
                      "message": "Must be a valid email address."
                    }
                  }
                }
            `},{code:429,body:`
                {
                  "status": 429,
                  "message": "You've send too many OTP requests, please try again later.",
                  "data": {}
                }
            `}]),[l,h,i,c]}class lt extends be{constructor(t){super(),_e(this,t,tt,et,ve,{collection:0})}}function Ye(a,t,e){const l=a.slice();return l[5]=t[e],l[7]=e,l}function Je(a,t,e){const l=a.slice();return l[5]=t[e],l[7]=e,l}function Ve(a){let t,e,l,h,i;function c(){return a[4](a[7])}return{c(){t=d("button"),e=d("div"),e.textContent=`${a[5].title}`,l=T(),g(e,"class","txt"),g(t,"class","tab-item"),V(t,"active",a[1]==a[7])},m(n,m){_(n,t,m),s(t,e),s(t,l),h||(i=$e(t,"click",c),h=!0)},p(n,m){a=n,m&2&&V(t,"active",a[1]==a[7])},d(n){n&&b(t),h=!1,i()}}}function je(a){let t,e,l,h;var i=a[5].component;function c(n,m){return{props:{collection:n[0]}}}return i&&(e=De(i,c(a))),{c(){t=d("div"),e&&te(e.$$.fragment),l=T(),g(t,"class","tab-item"),V(t,"active",a[1]==a[7])},m(n,m){_(n,t,m),e&&ee(e,t,null),s(t,l),h=!0},p(n,m){if(i!==(i=n[5].component)){if(e){ue();const v=e;E(v.$$.fragment,1,0,()=>{x(v,1)}),he()}i?(e=De(i,c(n)),te(e.$$.fragment),J(e.$$.fragment,1),ee(e,t,l)):e=null}else if(i){const v={};m&1&&(v.collection=n[0]),e.$set(v)}(!h||m&2)&&V(t,"active",n[1]==n[7])},i(n){h||(e&&J(e.$$.fragment,n),h=!0)},o(n){e&&E(e.$$.fragment,n),h=!1},d(n){n&&b(t),e&&x(e)}}}function ot(a){var N,A,Z,j;let t,e,l=a[0].name+"",h,i,c,n,m,v,C,F,B,I,M,Q,D,L;v=new Ke({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${a[2]}');

        ...

        // send OTP email to the provided auth record
        const req = await pb.collection('${(N=a[0])==null?void 0:N.name}').requestOTP('test@example.com');

        // ... show a screen/popup to enter the password from the email ...

        // authenticate with the requested OTP id and the email password
        const authData = await pb.collection('${(A=a[0])==null?void 0:A.name}').authWithOTP(
            req.otpId,
            "YOUR_OTP",
        );

        // after the above you can also access the auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${a[2]}');

        ...

        // send OTP email to the provided auth record
        final req = await pb.collection('${(Z=a[0])==null?void 0:Z.name}').requestOTP('test@example.com');

        // ... show a screen/popup to enter the password from the email ...

        // authenticate with the requested OTP id and the email password
        final authData = await pb.collection('${(j=a[0])==null?void 0:j.name}').authWithOTP(
            req.otpId,
            "YOUR_OTP",
        );

        // after the above you can also access the auth data from the authStore
        print(pb.authStore.isValid);
        print(pb.authStore.token);
        print(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `}});let y=Y(a[3]),O=[];for(let o=0;o<y.length;o+=1)O[o]=Ve(Je(a,y,o));let q=Y(a[3]),k=[];for(let o=0;o<q.length;o+=1)k[o]=je(Ye(a,q,o));const H=o=>E(k[o],1,1,()=>{k[o]=null});return{c(){t=d("h3"),e=R("Auth with OTP ("),h=R(l),i=R(")"),c=T(),n=d("div"),n.innerHTML=`<p>Authenticate with an one-time password (OTP).</p> <p>Note that when requesting an OTP we return an <code>otpId</code> even if a user with the provided email
        doesn&#39;t exist as a very basic enumeration protection.</p>`,m=T(),te(v.$$.fragment),C=T(),F=d("h6"),F.textContent="API details",B=T(),I=d("div"),M=d("div");for(let o=0;o<O.length;o+=1)O[o].c();Q=T(),D=d("div");for(let o=0;o<k.length;o+=1)k[o].c();g(t,"class","m-b-sm"),g(n,"class","content txt-lg m-b-sm"),g(F,"class","m-b-xs"),g(M,"class","tabs-header compact"),g(D,"class","tabs-content"),g(I,"class","tabs")},m(o,$){_(o,t,$),s(t,e),s(t,h),s(t,i),_(o,c,$),_(o,n,$),_(o,m,$),ee(v,o,$),_(o,C,$),_(o,F,$),_(o,B,$),_(o,I,$),s(I,M);for(let P=0;P<O.length;P+=1)O[P]&&O[P].m(M,null);s(I,Q),s(I,D);for(let P=0;P<k.length;P+=1)k[P]&&k[P].m(D,null);L=!0},p(o,[$]){var G,u,p,S;(!L||$&1)&&l!==(l=o[0].name+"")&&ce(h,l);const P={};if($&5&&(P.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${o[2]}');

        ...

        // send OTP email to the provided auth record
        const req = await pb.collection('${(G=o[0])==null?void 0:G.name}').requestOTP('test@example.com');

        // ... show a screen/popup to enter the password from the email ...

        // authenticate with the requested OTP id and the email password
        const authData = await pb.collection('${(u=o[0])==null?void 0:u.name}').authWithOTP(
            req.otpId,
            "YOUR_OTP",
        );

        // after the above you can also access the auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `),$&5&&(P.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${o[2]}');

        ...

        // send OTP email to the provided auth record
        final req = await pb.collection('${(p=o[0])==null?void 0:p.name}').requestOTP('test@example.com');

        // ... show a screen/popup to enter the password from the email ...

        // authenticate with the requested OTP id and the email password
        final authData = await pb.collection('${(S=o[0])==null?void 0:S.name}').authWithOTP(
            req.otpId,
            "YOUR_OTP",
        );

        // after the above you can also access the auth data from the authStore
        print(pb.authStore.isValid);
        print(pb.authStore.token);
        print(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `),v.$set(P),$&10){y=Y(o[3]);let w;for(w=0;w<y.length;w+=1){const z=Je(o,y,w);O[w]?O[w].p(z,$):(O[w]=Ve(z),O[w].c(),O[w].m(M,null))}for(;w<O.length;w+=1)O[w].d(1);O.length=y.length}if($&11){q=Y(o[3]);let w;for(w=0;w<q.length;w+=1){const z=Ye(o,q,w);k[w]?(k[w].p(z,$),J(k[w],1)):(k[w]=je(z),k[w].c(),J(k[w],1),k[w].m(D,null))}for(ue(),w=q.length;w<k.length;w+=1)H(w);he()}},i(o){if(!L){J(v.$$.fragment,o);for(let $=0;$<q.length;$+=1)J(k[$]);L=!0}},o(o){E(v.$$.fragment,o),k=k.filter(Boolean);for(let $=0;$<k.length;$+=1)E(k[$]);L=!1},d(o){o&&(b(t),b(c),b(n),b(m),b(C),b(F),b(B),b(I)),x(v,o),Me(O,o),Me(k,o)}}}function at(a,t,e){let l,{collection:h}=t;const i=[{title:"OTP Request",component:lt},{title:"OTP Auth",component:xe}];let c=0;const n=m=>e(1,c=m);return a.$$set=m=>{"collection"in m&&e(0,h=m.collection)},e(2,l=ke.getApiExampleUrl(Ze.baseURL)),[h,c,l,i,n]}class it extends be{constructor(t){super(),_e(this,t,at,ot,ve,{collection:0})}}export{it as default};
