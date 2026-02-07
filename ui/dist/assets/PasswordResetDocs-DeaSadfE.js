import{S as se,i as ne,s as oe,L,h as b,t as z,a as Z,I as Q,M as ee,N as ye,C as te,P as Te,D as le,l as v,n as u,u as p,v as S,A as D,w as k,k as j,o as ae,aj as Ee,d as X,m as Y,c as x,ai as Ce,Z as fe,J as qe,p as Oe,ak as pe}from"./index-BXdnPgBO.js";function me(o,t,e){const n=o.slice();return n[4]=t[e],n}function _e(o,t,e){const n=o.slice();return n[4]=t[e],n}function he(o,t){let e,n=t[4].code+"",d,c,r,a;function f(){return t[3](t[4])}return{key:o,first:null,c(){e=p("button"),d=D(n),c=S(),k(e,"class","tab-item"),j(e,"active",t[1]===t[4].code),this.first=e},m(g,y){v(g,e,y),u(e,d),u(e,c),r||(a=ae(e,"click",f),r=!0)},p(g,y){t=g,y&4&&n!==(n=t[4].code+"")&&Q(d,n),y&6&&j(e,"active",t[1]===t[4].code)},d(g){g&&b(e),r=!1,a()}}}function be(o,t){let e,n,d,c;return n=new Ee({props:{content:t[4].body}}),{key:o,first:null,c(){e=p("div"),x(n.$$.fragment),d=S(),k(e,"class","tab-item"),j(e,"active",t[1]===t[4].code),this.first=e},m(r,a){v(r,e,a),Y(n,e,null),u(e,d),c=!0},p(r,a){t=r;const f={};a&4&&(f.content=t[4].body),n.$set(f),(!c||a&6)&&j(e,"active",t[1]===t[4].code)},i(r){c||(Z(n.$$.fragment,r),c=!0)},o(r){z(n.$$.fragment,r),c=!1},d(r){r&&b(e),X(n)}}}function Ae(o){let t,e,n,d,c,r,a,f=o[0].name+"",g,y,F,q,J,N,H,O,A,T,C,R=[],M=new Map,U,W,h=[],K=new Map,E,P=L(o[2]);const B=l=>l[4].code;for(let l=0;l<P.length;l+=1){let s=_e(o,P,l),_=B(s);M.set(_,R[l]=he(_,s))}let m=L(o[2]);const G=l=>l[4].code;for(let l=0;l<m.length;l+=1){let s=me(o,m,l),_=G(s);K.set(_,h[l]=be(_,s))}return{c(){t=p("div"),e=p("strong"),e.textContent="POST",n=S(),d=p("div"),c=p("p"),r=D("/api/collections/"),a=p("strong"),g=D(f),y=D("/confirm-password-reset"),F=S(),q=p("div"),q.textContent="Body Parameters",J=S(),N=p("table"),N.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>token</span></div></td> <td><span class="label">String</span></td> <td>The token from the password reset request email.</td></tr> <tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>password</span></div></td> <td><span class="label">String</span></td> <td>The new password to set.</td></tr> <tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>passwordConfirm</span></div></td> <td><span class="label">String</span></td> <td>The new password confirmation.</td></tr></tbody>',H=S(),O=p("div"),O.textContent="Responses",A=S(),T=p("div"),C=p("div");for(let l=0;l<R.length;l+=1)R[l].c();U=S(),W=p("div");for(let l=0;l<h.length;l+=1)h[l].c();k(e,"class","label label-primary"),k(d,"class","content"),k(t,"class","alert alert-success"),k(q,"class","section-title"),k(N,"class","table-compact table-border m-b-base"),k(O,"class","section-title"),k(C,"class","tabs-header compact combined left"),k(W,"class","tabs-content"),k(T,"class","tabs")},m(l,s){v(l,t,s),u(t,e),u(t,n),u(t,d),u(d,c),u(c,r),u(c,a),u(a,g),u(c,y),v(l,F,s),v(l,q,s),v(l,J,s),v(l,N,s),v(l,H,s),v(l,O,s),v(l,A,s),v(l,T,s),u(T,C);for(let _=0;_<R.length;_+=1)R[_]&&R[_].m(C,null);u(T,U),u(T,W);for(let _=0;_<h.length;_+=1)h[_]&&h[_].m(W,null);E=!0},p(l,[s]){(!E||s&1)&&f!==(f=l[0].name+"")&&Q(g,f),s&6&&(P=L(l[2]),R=ee(R,s,B,1,l,P,M,C,ye,he,null,_e)),s&6&&(m=L(l[2]),te(),h=ee(h,s,G,1,l,m,K,W,Te,be,null,me),le())},i(l){if(!E){for(let s=0;s<m.length;s+=1)Z(h[s]);E=!0}},o(l){for(let s=0;s<h.length;s+=1)z(h[s]);E=!1},d(l){l&&(b(t),b(F),b(q),b(J),b(N),b(H),b(O),b(A),b(T));for(let s=0;s<R.length;s+=1)R[s].d();for(let s=0;s<h.length;s+=1)h[s].d()}}}function Ne(o,t,e){let{collection:n}=t,d=204,c=[];const r=a=>e(1,d=a.code);return o.$$set=a=>{"collection"in a&&e(0,n=a.collection)},e(2,c=[{code:204,body:"null"},{code:400,body:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "token": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}]),[n,d,c,r]}class We extends se{constructor(t){super(),ne(this,t,Ne,Ae,oe,{collection:0})}}function ve(o,t,e){const n=o.slice();return n[4]=t[e],n}function ke(o,t,e){const n=o.slice();return n[4]=t[e],n}function ge(o,t){let e,n=t[4].code+"",d,c,r,a;function f(){return t[3](t[4])}return{key:o,first:null,c(){e=p("button"),d=D(n),c=S(),k(e,"class","tab-item"),j(e,"active",t[1]===t[4].code),this.first=e},m(g,y){v(g,e,y),u(e,d),u(e,c),r||(a=ae(e,"click",f),r=!0)},p(g,y){t=g,y&4&&n!==(n=t[4].code+"")&&Q(d,n),y&6&&j(e,"active",t[1]===t[4].code)},d(g){g&&b(e),r=!1,a()}}}function we(o,t){let e,n,d,c;return n=new Ee({props:{content:t[4].body}}),{key:o,first:null,c(){e=p("div"),x(n.$$.fragment),d=S(),k(e,"class","tab-item"),j(e,"active",t[1]===t[4].code),this.first=e},m(r,a){v(r,e,a),Y(n,e,null),u(e,d),c=!0},p(r,a){t=r;const f={};a&4&&(f.content=t[4].body),n.$set(f),(!c||a&6)&&j(e,"active",t[1]===t[4].code)},i(r){c||(Z(n.$$.fragment,r),c=!0)},o(r){z(n.$$.fragment,r),c=!1},d(r){r&&b(e),X(n)}}}function De(o){let t,e,n,d,c,r,a,f=o[0].name+"",g,y,F,q,J,N,H,O,A,T,C,R=[],M=new Map,U,W,h=[],K=new Map,E,P=L(o[2]);const B=l=>l[4].code;for(let l=0;l<P.length;l+=1){let s=ke(o,P,l),_=B(s);M.set(_,R[l]=ge(_,s))}let m=L(o[2]);const G=l=>l[4].code;for(let l=0;l<m.length;l+=1){let s=ve(o,m,l),_=G(s);K.set(_,h[l]=we(_,s))}return{c(){t=p("div"),e=p("strong"),e.textContent="POST",n=S(),d=p("div"),c=p("p"),r=D("/api/collections/"),a=p("strong"),g=D(f),y=D("/request-password-reset"),F=S(),q=p("div"),q.textContent="Body Parameters",J=S(),N=p("table"),N.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>email</span></div></td> <td><span class="label">String</span></td> <td>The auth record email address to send the password reset request (if exists).</td></tr></tbody>',H=S(),O=p("div"),O.textContent="Responses",A=S(),T=p("div"),C=p("div");for(let l=0;l<R.length;l+=1)R[l].c();U=S(),W=p("div");for(let l=0;l<h.length;l+=1)h[l].c();k(e,"class","label label-primary"),k(d,"class","content"),k(t,"class","alert alert-success"),k(q,"class","section-title"),k(N,"class","table-compact table-border m-b-base"),k(O,"class","section-title"),k(C,"class","tabs-header compact combined left"),k(W,"class","tabs-content"),k(T,"class","tabs")},m(l,s){v(l,t,s),u(t,e),u(t,n),u(t,d),u(d,c),u(c,r),u(c,a),u(a,g),u(c,y),v(l,F,s),v(l,q,s),v(l,J,s),v(l,N,s),v(l,H,s),v(l,O,s),v(l,A,s),v(l,T,s),u(T,C);for(let _=0;_<R.length;_+=1)R[_]&&R[_].m(C,null);u(T,U),u(T,W);for(let _=0;_<h.length;_+=1)h[_]&&h[_].m(W,null);E=!0},p(l,[s]){(!E||s&1)&&f!==(f=l[0].name+"")&&Q(g,f),s&6&&(P=L(l[2]),R=ee(R,s,B,1,l,P,M,C,ye,ge,null,ke)),s&6&&(m=L(l[2]),te(),h=ee(h,s,G,1,l,m,K,W,Te,we,null,ve),le())},i(l){if(!E){for(let s=0;s<m.length;s+=1)Z(h[s]);E=!0}},o(l){for(let s=0;s<h.length;s+=1)z(h[s]);E=!1},d(l){l&&(b(t),b(F),b(q),b(J),b(N),b(H),b(O),b(A),b(T));for(let s=0;s<R.length;s+=1)R[s].d();for(let s=0;s<h.length;s+=1)h[s].d()}}}function Me(o,t,e){let{collection:n}=t,d=204,c=[];const r=a=>e(1,d=a.code);return o.$$set=a=>{"collection"in a&&e(0,n=a.collection)},e(2,c=[{code:204,body:"null"},{code:400,body:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "email": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}]),[n,d,c,r]}class Be extends se{constructor(t){super(),ne(this,t,Me,De,oe,{collection:0})}}function $e(o,t,e){const n=o.slice();return n[5]=t[e],n[7]=e,n}function Re(o,t,e){const n=o.slice();return n[5]=t[e],n[7]=e,n}function Pe(o){let t,e,n,d,c;function r(){return o[4](o[7])}return{c(){t=p("button"),e=p("div"),e.textContent=`${o[5].title}`,n=S(),k(e,"class","txt"),k(t,"class","tab-item"),j(t,"active",o[1]==o[7])},m(a,f){v(a,t,f),u(t,e),u(t,n),d||(c=ae(t,"click",r),d=!0)},p(a,f){o=a,f&2&&j(t,"active",o[1]==o[7])},d(a){a&&b(t),d=!1,c()}}}function Se(o){let t,e,n,d;var c=o[5].component;function r(a,f){return{props:{collection:a[0]}}}return c&&(e=pe(c,r(o))),{c(){t=p("div"),e&&x(e.$$.fragment),n=S(),k(t,"class","tab-item"),j(t,"active",o[1]==o[7])},m(a,f){v(a,t,f),e&&Y(e,t,null),u(t,n),d=!0},p(a,f){if(c!==(c=a[5].component)){if(e){te();const g=e;z(g.$$.fragment,1,0,()=>{X(g,1)}),le()}c?(e=pe(c,r(a)),x(e.$$.fragment),Z(e.$$.fragment,1),Y(e,t,n)):e=null}else if(c){const g={};f&1&&(g.collection=a[0]),e.$set(g)}(!d||f&2)&&j(t,"active",a[1]==a[7])},i(a){d||(e&&Z(e.$$.fragment,a),d=!0)},o(a){e&&z(e.$$.fragment,a),d=!1},d(a){a&&b(t),e&&X(e)}}}function Ie(o){var l,s,_,ie;let t,e,n=o[0].name+"",d,c,r,a,f,g,y,F=o[0].name+"",q,J,N,H,O,A,T,C,R,M,U,W,h,K;A=new Ce({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${o[2]}');

        ...

        await pb.collection('${(l=o[0])==null?void 0:l.name}').requestPasswordReset('test@example.com');

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(s=o[0])==null?void 0:s.name}').confirmPasswordReset(
            'RESET_TOKEN',
            'NEW_PASSWORD',
            'NEW_PASSWORD_CONFIRM',
        );
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${o[2]}');

        ...

        await pb.collection('${(_=o[0])==null?void 0:_.name}').requestPasswordReset('test@example.com');

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(ie=o[0])==null?void 0:ie.name}').confirmPasswordReset(
          'RESET_TOKEN',
          'NEW_PASSWORD',
          'NEW_PASSWORD_CONFIRM',
        );
    `}});let E=L(o[3]),P=[];for(let i=0;i<E.length;i+=1)P[i]=Pe(Re(o,E,i));let B=L(o[3]),m=[];for(let i=0;i<B.length;i+=1)m[i]=Se($e(o,B,i));const G=i=>z(m[i],1,1,()=>{m[i]=null});return{c(){t=p("h3"),e=D("Password reset ("),d=D(n),c=D(")"),r=S(),a=p("div"),f=p("p"),g=D("Sends "),y=p("strong"),q=D(F),J=D(" password reset email request."),N=S(),H=p("p"),H.textContent=`On successful password reset all previously issued auth tokens for the specific record will be
        automatically invalidated.`,O=S(),x(A.$$.fragment),T=S(),C=p("h6"),C.textContent="API details",R=S(),M=p("div"),U=p("div");for(let i=0;i<P.length;i+=1)P[i].c();W=S(),h=p("div");for(let i=0;i<m.length;i+=1)m[i].c();k(t,"class","m-b-sm"),k(a,"class","content txt-lg m-b-sm"),k(C,"class","m-b-xs"),k(U,"class","tabs-header compact"),k(h,"class","tabs-content"),k(M,"class","tabs")},m(i,$){v(i,t,$),u(t,e),u(t,d),u(t,c),v(i,r,$),v(i,a,$),u(a,f),u(f,g),u(f,y),u(y,q),u(f,J),u(a,N),u(a,H),v(i,O,$),Y(A,i,$),v(i,T,$),v(i,C,$),v(i,R,$),v(i,M,$),u(M,U);for(let I=0;I<P.length;I+=1)P[I]&&P[I].m(U,null);u(M,W),u(M,h);for(let I=0;I<m.length;I+=1)m[I]&&m[I].m(h,null);K=!0},p(i,[$]){var ce,re,de,ue;(!K||$&1)&&n!==(n=i[0].name+"")&&Q(d,n),(!K||$&1)&&F!==(F=i[0].name+"")&&Q(q,F);const I={};if($&5&&(I.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${i[2]}');

        ...

        await pb.collection('${(ce=i[0])==null?void 0:ce.name}').requestPasswordReset('test@example.com');

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(re=i[0])==null?void 0:re.name}').confirmPasswordReset(
            'RESET_TOKEN',
            'NEW_PASSWORD',
            'NEW_PASSWORD_CONFIRM',
        );
    `),$&5&&(I.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${i[2]}');

        ...

        await pb.collection('${(de=i[0])==null?void 0:de.name}').requestPasswordReset('test@example.com');

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(ue=i[0])==null?void 0:ue.name}').confirmPasswordReset(
          'RESET_TOKEN',
          'NEW_PASSWORD',
          'NEW_PASSWORD_CONFIRM',
        );
    `),A.$set(I),$&10){E=L(i[3]);let w;for(w=0;w<E.length;w+=1){const V=Re(i,E,w);P[w]?P[w].p(V,$):(P[w]=Pe(V),P[w].c(),P[w].m(U,null))}for(;w<P.length;w+=1)P[w].d(1);P.length=E.length}if($&11){B=L(i[3]);let w;for(w=0;w<B.length;w+=1){const V=$e(i,B,w);m[w]?(m[w].p(V,$),Z(m[w],1)):(m[w]=Se(V),m[w].c(),Z(m[w],1),m[w].m(h,null))}for(te(),w=B.length;w<m.length;w+=1)G(w);le()}},i(i){if(!K){Z(A.$$.fragment,i);for(let $=0;$<B.length;$+=1)Z(m[$]);K=!0}},o(i){z(A.$$.fragment,i),m=m.filter(Boolean);for(let $=0;$<m.length;$+=1)z(m[$]);K=!1},d(i){i&&(b(t),b(r),b(a),b(O),b(T),b(C),b(R),b(M)),X(A,i),fe(P,i),fe(m,i)}}}function Fe(o,t,e){let n,{collection:d}=t;const c=[{title:"Request password reset",component:Be},{title:"Confirm password reset",component:We}];let r=0;const a=f=>e(1,r=f);return o.$$set=f=>{"collection"in f&&e(0,d=f.collection)},e(2,n=qe.getApiExampleUrl(Oe.baseURL)),[d,r,n,c,a]}class Le extends se{constructor(t){super(),ne(this,t,Fe,Ie,oe,{collection:0})}}export{Le as default};
