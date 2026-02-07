import{S as se,i as oe,s as ie,L as K,h as g,t as F,a as Z,I as V,M as le,N as Re,C as ne,P as Se,D as ae,l as v,n as u,u as p,v as y,A as U,w as b,k as G,o as ce,aj as Oe,d as x,m as ee,c as te,ai as Me,Z as _e,J as Be,p as De,ak as be}from"./index-BXdnPgBO.js";function ge(n,e,t){const l=n.slice();return l[4]=e[t],l}function ve(n,e,t){const l=n.slice();return l[4]=e[t],l}function ke(n,e){let t,l=e[4].code+"",d,i,r,a;function m(){return e[3](e[4])}return{key:n,first:null,c(){t=p("button"),d=U(l),i=y(),b(t,"class","tab-item"),G(t,"active",e[1]===e[4].code),this.first=t},m(k,T){v(k,t,T),u(t,d),u(t,i),r||(a=ce(t,"click",m),r=!0)},p(k,T){e=k,T&4&&l!==(l=e[4].code+"")&&V(d,l),T&6&&G(t,"active",e[1]===e[4].code)},d(k){k&&g(t),r=!1,a()}}}function $e(n,e){let t,l,d,i;return l=new Oe({props:{content:e[4].body}}),{key:n,first:null,c(){t=p("div"),te(l.$$.fragment),d=y(),b(t,"class","tab-item"),G(t,"active",e[1]===e[4].code),this.first=t},m(r,a){v(r,t,a),ee(l,t,null),u(t,d),i=!0},p(r,a){e=r;const m={};a&4&&(m.content=e[4].body),l.$set(m),(!i||a&6)&&G(t,"active",e[1]===e[4].code)},i(r){i||(Z(l.$$.fragment,r),i=!0)},o(r){F(l.$$.fragment,r),i=!1},d(r){r&&g(t),x(l)}}}function Ne(n){let e,t,l,d,i,r,a,m=n[0].name+"",k,T,Y,H,J,W,j,B,D,S,N,A=[],O=new Map,q,z,P=[],L=new Map,w,E=K(n[2]);const M=c=>c[4].code;for(let c=0;c<E.length;c+=1){let f=ve(n,E,c),s=M(f);O.set(s,A[c]=ke(s,f))}let _=K(n[2]);const Q=c=>c[4].code;for(let c=0;c<_.length;c+=1){let f=ge(n,_,c),s=Q(f);L.set(s,P[c]=$e(s,f))}return{c(){e=p("div"),t=p("strong"),t.textContent="POST",l=y(),d=p("div"),i=p("p"),r=U("/api/collections/"),a=p("strong"),k=U(m),T=U("/confirm-email-change"),Y=y(),H=p("div"),H.textContent="Body Parameters",J=y(),W=p("table"),W.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>token</span></div></td> <td><span class="label">String</span></td> <td>The token from the change email request email.</td></tr> <tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>password</span></div></td> <td><span class="label">String</span></td> <td>The account password to confirm the email change.</td></tr></tbody>',j=y(),B=p("div"),B.textContent="Responses",D=y(),S=p("div"),N=p("div");for(let c=0;c<A.length;c+=1)A[c].c();q=y(),z=p("div");for(let c=0;c<P.length;c+=1)P[c].c();b(t,"class","label label-primary"),b(d,"class","content"),b(e,"class","alert alert-success"),b(H,"class","section-title"),b(W,"class","table-compact table-border m-b-base"),b(B,"class","section-title"),b(N,"class","tabs-header compact combined left"),b(z,"class","tabs-content"),b(S,"class","tabs")},m(c,f){v(c,e,f),u(e,t),u(e,l),u(e,d),u(d,i),u(i,r),u(i,a),u(a,k),u(i,T),v(c,Y,f),v(c,H,f),v(c,J,f),v(c,W,f),v(c,j,f),v(c,B,f),v(c,D,f),v(c,S,f),u(S,N);for(let s=0;s<A.length;s+=1)A[s]&&A[s].m(N,null);u(S,q),u(S,z);for(let s=0;s<P.length;s+=1)P[s]&&P[s].m(z,null);w=!0},p(c,[f]){(!w||f&1)&&m!==(m=c[0].name+"")&&V(k,m),f&6&&(E=K(c[2]),A=le(A,f,M,1,c,E,O,N,Re,ke,null,ve)),f&6&&(_=K(c[2]),ne(),P=le(P,f,Q,1,c,_,L,z,Se,$e,null,ge),ae())},i(c){if(!w){for(let f=0;f<_.length;f+=1)Z(P[f]);w=!0}},o(c){for(let f=0;f<P.length;f+=1)F(P[f]);w=!1},d(c){c&&(g(e),g(Y),g(H),g(J),g(W),g(j),g(B),g(D),g(S));for(let f=0;f<A.length;f+=1)A[f].d();for(let f=0;f<P.length;f+=1)P[f].d()}}}function Le(n,e,t){let{collection:l}=e,d=204,i=[];const r=a=>t(1,d=a.code);return n.$$set=a=>{"collection"in a&&t(0,l=a.collection)},t(2,i=[{code:204,body:"null"},{code:400,body:`
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
            `}]),[l,d,i,r]}class He extends se{constructor(e){super(),oe(this,e,Le,Ne,ie,{collection:0})}}function we(n,e,t){const l=n.slice();return l[4]=e[t],l}function Ce(n,e,t){const l=n.slice();return l[4]=e[t],l}function ye(n,e){let t,l=e[4].code+"",d,i,r,a;function m(){return e[3](e[4])}return{key:n,first:null,c(){t=p("button"),d=U(l),i=y(),b(t,"class","tab-item"),G(t,"active",e[1]===e[4].code),this.first=t},m(k,T){v(k,t,T),u(t,d),u(t,i),r||(a=ce(t,"click",m),r=!0)},p(k,T){e=k,T&4&&l!==(l=e[4].code+"")&&V(d,l),T&6&&G(t,"active",e[1]===e[4].code)},d(k){k&&g(t),r=!1,a()}}}function Ee(n,e){let t,l,d,i;return l=new Oe({props:{content:e[4].body}}),{key:n,first:null,c(){t=p("div"),te(l.$$.fragment),d=y(),b(t,"class","tab-item"),G(t,"active",e[1]===e[4].code),this.first=t},m(r,a){v(r,t,a),ee(l,t,null),u(t,d),i=!0},p(r,a){e=r;const m={};a&4&&(m.content=e[4].body),l.$set(m),(!i||a&6)&&G(t,"active",e[1]===e[4].code)},i(r){i||(Z(l.$$.fragment,r),i=!0)},o(r){F(l.$$.fragment,r),i=!1},d(r){r&&g(t),x(l)}}}function We(n){let e,t,l,d,i,r,a,m=n[0].name+"",k,T,Y,H,J,W,j,B,D,S,N,A,O,q=[],z=new Map,P,L,w=[],E=new Map,M,_=K(n[2]);const Q=s=>s[4].code;for(let s=0;s<_.length;s+=1){let h=Ce(n,_,s),R=Q(h);z.set(R,q[s]=ye(R,h))}let c=K(n[2]);const f=s=>s[4].code;for(let s=0;s<c.length;s+=1){let h=we(n,c,s),R=f(h);E.set(R,w[s]=Ee(R,h))}return{c(){e=p("div"),t=p("strong"),t.textContent="POST",l=y(),d=p("div"),i=p("p"),r=U("/api/collections/"),a=p("strong"),k=U(m),T=U("/request-email-change"),Y=y(),H=p("p"),H.innerHTML="Requires <code>Authorization:TOKEN</code>",J=y(),W=p("div"),W.textContent="Body Parameters",j=y(),B=p("table"),B.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>newEmail</span></div></td> <td><span class="label">String</span></td> <td>The new email address to send the change email request.</td></tr></tbody>',D=y(),S=p("div"),S.textContent="Responses",N=y(),A=p("div"),O=p("div");for(let s=0;s<q.length;s+=1)q[s].c();P=y(),L=p("div");for(let s=0;s<w.length;s+=1)w[s].c();b(t,"class","label label-primary"),b(d,"class","content"),b(H,"class","txt-hint txt-sm txt-right"),b(e,"class","alert alert-success"),b(W,"class","section-title"),b(B,"class","table-compact table-border m-b-base"),b(S,"class","section-title"),b(O,"class","tabs-header compact combined left"),b(L,"class","tabs-content"),b(A,"class","tabs")},m(s,h){v(s,e,h),u(e,t),u(e,l),u(e,d),u(d,i),u(i,r),u(i,a),u(a,k),u(i,T),u(e,Y),u(e,H),v(s,J,h),v(s,W,h),v(s,j,h),v(s,B,h),v(s,D,h),v(s,S,h),v(s,N,h),v(s,A,h),u(A,O);for(let R=0;R<q.length;R+=1)q[R]&&q[R].m(O,null);u(A,P),u(A,L);for(let R=0;R<w.length;R+=1)w[R]&&w[R].m(L,null);M=!0},p(s,[h]){(!M||h&1)&&m!==(m=s[0].name+"")&&V(k,m),h&6&&(_=K(s[2]),q=le(q,h,Q,1,s,_,z,O,Re,ye,null,Ce)),h&6&&(c=K(s[2]),ne(),w=le(w,h,f,1,s,c,E,L,Se,Ee,null,we),ae())},i(s){if(!M){for(let h=0;h<c.length;h+=1)Z(w[h]);M=!0}},o(s){for(let h=0;h<w.length;h+=1)F(w[h]);M=!1},d(s){s&&(g(e),g(J),g(W),g(j),g(B),g(D),g(S),g(N),g(A));for(let h=0;h<q.length;h+=1)q[h].d();for(let h=0;h<w.length;h+=1)w[h].d()}}}function Ue(n,e,t){let{collection:l}=e,d=204,i=[];const r=a=>t(1,d=a.code);return n.$$set=a=>{"collection"in a&&t(0,l=a.collection)},t(2,i=[{code:204,body:"null"},{code:400,body:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "newEmail": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `},{code:401,body:`
                {
                  "status": 401,
                  "message": "The request requires valid record authorization token to be set.",
                  "data": {}
                }
            `},{code:403,body:`
                {
                  "status": 403,
                  "message": "The authorized record model is not allowed to perform this action.",
                  "data": {}
                }
            `}]),[l,d,i,r]}class Ie extends se{constructor(e){super(),oe(this,e,Ue,We,ie,{collection:0})}}function Ae(n,e,t){const l=n.slice();return l[5]=e[t],l[7]=t,l}function Pe(n,e,t){const l=n.slice();return l[5]=e[t],l[7]=t,l}function Te(n){let e,t,l,d,i;function r(){return n[4](n[7])}return{c(){e=p("button"),t=p("div"),t.textContent=`${n[5].title}`,l=y(),b(t,"class","txt"),b(e,"class","tab-item"),G(e,"active",n[1]==n[7])},m(a,m){v(a,e,m),u(e,t),u(e,l),d||(i=ce(e,"click",r),d=!0)},p(a,m){n=a,m&2&&G(e,"active",n[1]==n[7])},d(a){a&&g(e),d=!1,i()}}}function qe(n){let e,t,l,d;var i=n[5].component;function r(a,m){return{props:{collection:a[0]}}}return i&&(t=be(i,r(n))),{c(){e=p("div"),t&&te(t.$$.fragment),l=y(),b(e,"class","tab-item"),G(e,"active",n[1]==n[7])},m(a,m){v(a,e,m),t&&ee(t,e,null),u(e,l),d=!0},p(a,m){if(i!==(i=a[5].component)){if(t){ne();const k=t;F(k.$$.fragment,1,0,()=>{x(k,1)}),ae()}i?(t=be(i,r(a)),te(t.$$.fragment),Z(t.$$.fragment,1),ee(t,e,l)):t=null}else if(i){const k={};m&1&&(k.collection=a[0]),t.$set(k)}(!d||m&2)&&G(e,"active",a[1]==a[7])},i(a){d||(t&&Z(t.$$.fragment,a),d=!0)},o(a){t&&F(t.$$.fragment,a),d=!1},d(a){a&&g(e),t&&x(t)}}}function Ke(n){var c,f,s,h,R,re;let e,t,l=n[0].name+"",d,i,r,a,m,k,T,Y=n[0].name+"",H,J,W,j,B,D,S,N,A,O,q,z,P,L;D=new Me({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${n[2]}');

        ...

        await pb.collection('${(c=n[0])==null?void 0:c.name}').authWithPassword('test@example.com', '1234567890');

        await pb.collection('${(f=n[0])==null?void 0:f.name}').requestEmailChange('new@example.com');

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(s=n[0])==null?void 0:s.name}').confirmEmailChange(
            'EMAIL_CHANGE_TOKEN',
            'YOUR_PASSWORD',
        );
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${n[2]}');

        ...

        await pb.collection('${(h=n[0])==null?void 0:h.name}').authWithPassword('test@example.com', '1234567890');

        await pb.collection('${(R=n[0])==null?void 0:R.name}').requestEmailChange('new@example.com');

        ...

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(re=n[0])==null?void 0:re.name}').confirmEmailChange(
          'EMAIL_CHANGE_TOKEN',
          'YOUR_PASSWORD',
        );
    `}});let w=K(n[3]),E=[];for(let o=0;o<w.length;o+=1)E[o]=Te(Pe(n,w,o));let M=K(n[3]),_=[];for(let o=0;o<M.length;o+=1)_[o]=qe(Ae(n,M,o));const Q=o=>F(_[o],1,1,()=>{_[o]=null});return{c(){e=p("h3"),t=U("Email change ("),d=U(l),i=U(")"),r=y(),a=p("div"),m=p("p"),k=U("Sends "),T=p("strong"),H=U(Y),J=U(" email change request."),W=y(),j=p("p"),j.textContent=`On successful email change all previously issued auth tokens for the specific record will be
        automatically invalidated.`,B=y(),te(D.$$.fragment),S=y(),N=p("h6"),N.textContent="API details",A=y(),O=p("div"),q=p("div");for(let o=0;o<E.length;o+=1)E[o].c();z=y(),P=p("div");for(let o=0;o<_.length;o+=1)_[o].c();b(e,"class","m-b-sm"),b(a,"class","content txt-lg m-b-sm"),b(N,"class","m-b-xs"),b(q,"class","tabs-header compact"),b(P,"class","tabs-content"),b(O,"class","tabs")},m(o,C){v(o,e,C),u(e,t),u(e,d),u(e,i),v(o,r,C),v(o,a,C),u(a,m),u(m,k),u(m,T),u(T,H),u(m,J),u(a,W),u(a,j),v(o,B,C),ee(D,o,C),v(o,S,C),v(o,N,C),v(o,A,C),v(o,O,C),u(O,q);for(let I=0;I<E.length;I+=1)E[I]&&E[I].m(q,null);u(O,z),u(O,P);for(let I=0;I<_.length;I+=1)_[I]&&_[I].m(P,null);L=!0},p(o,[C]){var de,ue,fe,me,he,pe;(!L||C&1)&&l!==(l=o[0].name+"")&&V(d,l),(!L||C&1)&&Y!==(Y=o[0].name+"")&&V(H,Y);const I={};if(C&5&&(I.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${o[2]}');

        ...

        await pb.collection('${(de=o[0])==null?void 0:de.name}').authWithPassword('test@example.com', '1234567890');

        await pb.collection('${(ue=o[0])==null?void 0:ue.name}').requestEmailChange('new@example.com');

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(fe=o[0])==null?void 0:fe.name}').confirmEmailChange(
            'EMAIL_CHANGE_TOKEN',
            'YOUR_PASSWORD',
        );
    `),C&5&&(I.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${o[2]}');

        ...

        await pb.collection('${(me=o[0])==null?void 0:me.name}').authWithPassword('test@example.com', '1234567890');

        await pb.collection('${(he=o[0])==null?void 0:he.name}').requestEmailChange('new@example.com');

        ...

        // ---
        // (optional) in your custom confirmation page:
        // ---

        // note: after this call all previously issued auth tokens are invalidated
        await pb.collection('${(pe=o[0])==null?void 0:pe.name}').confirmEmailChange(
          'EMAIL_CHANGE_TOKEN',
          'YOUR_PASSWORD',
        );
    `),D.$set(I),C&10){w=K(o[3]);let $;for($=0;$<w.length;$+=1){const X=Pe(o,w,$);E[$]?E[$].p(X,C):(E[$]=Te(X),E[$].c(),E[$].m(q,null))}for(;$<E.length;$+=1)E[$].d(1);E.length=w.length}if(C&11){M=K(o[3]);let $;for($=0;$<M.length;$+=1){const X=Ae(o,M,$);_[$]?(_[$].p(X,C),Z(_[$],1)):(_[$]=qe(X),_[$].c(),Z(_[$],1),_[$].m(P,null))}for(ne(),$=M.length;$<_.length;$+=1)Q($);ae()}},i(o){if(!L){Z(D.$$.fragment,o);for(let C=0;C<M.length;C+=1)Z(_[C]);L=!0}},o(o){F(D.$$.fragment,o),_=_.filter(Boolean);for(let C=0;C<_.length;C+=1)F(_[C]);L=!1},d(o){o&&(g(e),g(r),g(a),g(B),g(S),g(N),g(A),g(O)),x(D,o),_e(E,o),_e(_,o)}}}function Ge(n,e,t){let l,{collection:d}=e;const i=[{title:"Request email change",component:Ie},{title:"Confirm email change",component:He}];let r=0;const a=m=>t(1,r=m);return n.$$set=m=>{"collection"in m&&t(0,d=m.collection)},t(2,l=Be.getApiExampleUrl(De.baseURL)),[d,r,l,i,a]}class je extends se{constructor(e){super(),oe(this,e,Ge,Ke,ie,{collection:0})}}export{je as default};
