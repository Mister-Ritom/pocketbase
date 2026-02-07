import{S as Ue,i as xe,s as Ie,ai as Ke,aj as Je,L as I,h as d,d as K,t as N,a as V,I as de,M as Oe,N as Qe,C as We,P as Ge,D as Xe,l as u,n as o,m as Q,u as s,A as k,v as p,c as W,w as b,J as Ee,p as Ye,k as G,o as Ze}from"./index-BXdnPgBO.js";import{F as et}from"./FieldsQueryParam-B0vPSaUP.js";function Ne(r,a,l){const n=r.slice();return n[5]=a[l],n}function Ve(r,a,l){const n=r.slice();return n[5]=a[l],n}function je(r,a){let l,n=a[5].code+"",m,_,i,h;function g(){return a[4](a[5])}return{key:r,first:null,c(){l=s("button"),m=k(n),_=p(),b(l,"class","tab-item"),G(l,"active",a[1]===a[5].code),this.first=l},m(v,w){u(v,l,w),o(l,m),o(l,_),i||(h=Ze(l,"click",g),i=!0)},p(v,w){a=v,w&4&&n!==(n=a[5].code+"")&&de(m,n),w&6&&G(l,"active",a[1]===a[5].code)},d(v){v&&d(l),i=!1,h()}}}function ze(r,a){let l,n,m,_;return n=new Je({props:{content:a[5].body}}),{key:r,first:null,c(){l=s("div"),W(n.$$.fragment),m=p(),b(l,"class","tab-item"),G(l,"active",a[1]===a[5].code),this.first=l},m(i,h){u(i,l,h),Q(n,l,null),o(l,m),_=!0},p(i,h){a=i;const g={};h&4&&(g.content=a[5].body),n.$set(g),(!_||h&6)&&G(l,"active",a[1]===a[5].code)},i(i){_||(V(n.$$.fragment,i),_=!0)},o(i){N(n.$$.fragment,i),_=!1},d(i){i&&d(l),K(n)}}}function tt(r){var qe,Fe;let a,l,n=r[0].name+"",m,_,i,h,g,v,w,B,X,S,j,ue,z,D,pe,Y,J=r[0].name+"",Z,he,fe,U,ee,q,te,T,oe,be,F,C,ae,me,le,_e,f,ke,R,ge,ve,$e,se,ye,ne,Se,we,Te,re,Ce,Pe,A,ie,L,ce,P,H,y=[],Re=new Map,Ae,O,$=[],Me=new Map,M;v=new Ke({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${r[3]}');

        ...

        const authData = await pb.collection('${(qe=r[0])==null?void 0:qe.name}').authRefresh();

        // after the above you can also access the refreshed auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.record.id);
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${r[3]}');

        ...

        final authData = await pb.collection('${(Fe=r[0])==null?void 0:Fe.name}').authRefresh();

        // after the above you can also access the refreshed auth data from the authStore
        print(pb.authStore.isValid);
        print(pb.authStore.token);
        print(pb.authStore.record.id);
    `}}),R=new Je({props:{content:"?expand=relField1,relField2.subRelField"}}),A=new et({props:{prefix:"record."}});let x=I(r[2]);const Be=e=>e[5].code;for(let e=0;e<x.length;e+=1){let t=Ve(r,x,e),c=Be(t);Re.set(c,y[e]=je(c,t))}let E=I(r[2]);const De=e=>e[5].code;for(let e=0;e<E.length;e+=1){let t=Ne(r,E,e),c=De(t);Me.set(c,$[e]=ze(c,t))}return{c(){a=s("h3"),l=k("Auth refresh ("),m=k(n),_=k(")"),i=p(),h=s("div"),h.innerHTML=`<p>Returns a new auth response (token and record data) for an
        <strong>already authenticated record</strong>.</p> <p>This method is usually called by users on page/screen reload to ensure that the previously stored data
        in <code>pb.authStore</code> is still valid and up-to-date.</p>`,g=p(),W(v.$$.fragment),w=p(),B=s("h6"),B.textContent="API details",X=p(),S=s("div"),j=s("strong"),j.textContent="POST",ue=p(),z=s("div"),D=s("p"),pe=k("/api/collections/"),Y=s("strong"),Z=k(J),he=k("/auth-refresh"),fe=p(),U=s("p"),U.innerHTML="Requires <code>Authorization:TOKEN</code> header",ee=p(),q=s("div"),q.textContent="Query parameters",te=p(),T=s("table"),oe=s("thead"),oe.innerHTML='<tr><th>Param</th> <th>Type</th> <th width="60%">Description</th></tr>',be=p(),F=s("tbody"),C=s("tr"),ae=s("td"),ae.textContent="expand",me=p(),le=s("td"),le.innerHTML='<span class="label">String</span>',_e=p(),f=s("td"),ke=k(`Auto expand record relations. Ex.:
                `),W(R.$$.fragment),ge=k(`
                Supports up to 6-levels depth nested relations expansion. `),ve=s("br"),$e=k(`
                The expanded relations will be appended to the record under the
                `),se=s("code"),se.textContent="expand",ye=k(" property (eg. "),ne=s("code"),ne.textContent='"expand": {"relField1": {...}, ...}',Se=k(`).
                `),we=s("br"),Te=k(`
                Only the relations to which the request user has permissions to `),re=s("strong"),re.textContent="view",Ce=k(" will be expanded."),Pe=p(),W(A.$$.fragment),ie=p(),L=s("div"),L.textContent="Responses",ce=p(),P=s("div"),H=s("div");for(let e=0;e<y.length;e+=1)y[e].c();Ae=p(),O=s("div");for(let e=0;e<$.length;e+=1)$[e].c();b(a,"class","m-b-sm"),b(h,"class","content txt-lg m-b-sm"),b(B,"class","m-b-xs"),b(j,"class","label label-primary"),b(z,"class","content"),b(U,"class","txt-hint txt-sm txt-right"),b(S,"class","alert alert-success"),b(q,"class","section-title"),b(T,"class","table-compact table-border m-b-base"),b(L,"class","section-title"),b(H,"class","tabs-header compact combined left"),b(O,"class","tabs-content"),b(P,"class","tabs")},m(e,t){u(e,a,t),o(a,l),o(a,m),o(a,_),u(e,i,t),u(e,h,t),u(e,g,t),Q(v,e,t),u(e,w,t),u(e,B,t),u(e,X,t),u(e,S,t),o(S,j),o(S,ue),o(S,z),o(z,D),o(D,pe),o(D,Y),o(Y,Z),o(D,he),o(S,fe),o(S,U),u(e,ee,t),u(e,q,t),u(e,te,t),u(e,T,t),o(T,oe),o(T,be),o(T,F),o(F,C),o(C,ae),o(C,me),o(C,le),o(C,_e),o(C,f),o(f,ke),Q(R,f,null),o(f,ge),o(f,ve),o(f,$e),o(f,se),o(f,ye),o(f,ne),o(f,Se),o(f,we),o(f,Te),o(f,re),o(f,Ce),o(F,Pe),Q(A,F,null),u(e,ie,t),u(e,L,t),u(e,ce,t),u(e,P,t),o(P,H);for(let c=0;c<y.length;c+=1)y[c]&&y[c].m(H,null);o(P,Ae),o(P,O);for(let c=0;c<$.length;c+=1)$[c]&&$[c].m(O,null);M=!0},p(e,[t]){var Le,He;(!M||t&1)&&n!==(n=e[0].name+"")&&de(m,n);const c={};t&9&&(c.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${e[3]}');

        ...

        const authData = await pb.collection('${(Le=e[0])==null?void 0:Le.name}').authRefresh();

        // after the above you can also access the refreshed auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.record.id);
    `),t&9&&(c.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${e[3]}');

        ...

        final authData = await pb.collection('${(He=e[0])==null?void 0:He.name}').authRefresh();

        // after the above you can also access the refreshed auth data from the authStore
        print(pb.authStore.isValid);
        print(pb.authStore.token);
        print(pb.authStore.record.id);
    `),v.$set(c),(!M||t&1)&&J!==(J=e[0].name+"")&&de(Z,J),t&6&&(x=I(e[2]),y=Oe(y,t,Be,1,e,x,Re,H,Qe,je,null,Ve)),t&6&&(E=I(e[2]),We(),$=Oe($,t,De,1,e,E,Me,O,Ge,ze,null,Ne),Xe())},i(e){if(!M){V(v.$$.fragment,e),V(R.$$.fragment,e),V(A.$$.fragment,e);for(let t=0;t<E.length;t+=1)V($[t]);M=!0}},o(e){N(v.$$.fragment,e),N(R.$$.fragment,e),N(A.$$.fragment,e);for(let t=0;t<$.length;t+=1)N($[t]);M=!1},d(e){e&&(d(a),d(i),d(h),d(g),d(w),d(B),d(X),d(S),d(ee),d(q),d(te),d(T),d(ie),d(L),d(ce),d(P)),K(v,e),K(R),K(A);for(let t=0;t<y.length;t+=1)y[t].d();for(let t=0;t<$.length;t+=1)$[t].d()}}}function ot(r,a,l){let n,{collection:m}=a,_=200,i=[];const h=g=>l(1,_=g.code);return r.$$set=g=>{"collection"in g&&l(0,m=g.collection)},r.$$.update=()=>{r.$$.dirty&1&&l(2,i=[{code:200,body:JSON.stringify({token:"JWT_TOKEN",record:Ee.dummyCollectionRecord(m)},null,2)},{code:401,body:`
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
            `},{code:404,body:`
                {
                  "status": 404,
                  "message": "Missing auth record context.",
                  "data": {}
                }
            `}])},l(3,n=Ee.getApiExampleUrl(Ye.baseURL)),[m,_,i,n,h]}class st extends Ue{constructor(a){super(),xe(this,a,ot,tt,Ie,{collection:0})}}export{st as default};
