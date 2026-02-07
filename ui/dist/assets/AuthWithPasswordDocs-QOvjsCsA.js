import{S as kt,i as gt,s as vt,ai as St,L as B,aj as _t,h as c,d as ae,Z as wt,t as Z,a as z,I as G,M as ct,N as yt,C as $t,P as Pt,D as Ct,l as d,n as t,m as oe,u as s,A as f,v as u,c as se,w as k,J as dt,p as Rt,k as ne,o as Ot}from"./index-BXdnPgBO.js";import{F as Tt}from"./FieldsQueryParam-B0vPSaUP.js";function pt(i,o,a){const n=i.slice();return n[7]=o[a],n}function ut(i,o,a){const n=i.slice();return n[7]=o[a],n}function ht(i,o,a){const n=i.slice();return n[12]=o[a],n[14]=a,n}function At(i){let o;return{c(){o=f("or")},m(a,n){d(a,o,n)},d(a){a&&c(o)}}}function bt(i){let o,a,n=i[12]+"",m,b=i[14]>0&&At();return{c(){b&&b.c(),o=u(),a=s("strong"),m=f(n)},m(r,h){b&&b.m(r,h),d(r,o,h),d(r,a,h),t(a,m)},p(r,h){h&2&&n!==(n=r[12]+"")&&G(m,n)},d(r){r&&(c(o),c(a)),b&&b.d(r)}}}function ft(i,o){let a,n=o[7].code+"",m,b,r,h;function g(){return o[6](o[7])}return{key:i,first:null,c(){a=s("button"),m=f(n),b=u(),k(a,"class","tab-item"),ne(a,"active",o[2]===o[7].code),this.first=a},m($,_){d($,a,_),t(a,m),t(a,b),r||(h=Ot(a,"click",g),r=!0)},p($,_){o=$,_&8&&n!==(n=o[7].code+"")&&G(m,n),_&12&&ne(a,"active",o[2]===o[7].code)},d($){$&&c(a),r=!1,h()}}}function mt(i,o){let a,n,m,b;return n=new _t({props:{content:o[7].body}}),{key:i,first:null,c(){a=s("div"),se(n.$$.fragment),m=u(),k(a,"class","tab-item"),ne(a,"active",o[2]===o[7].code),this.first=a},m(r,h){d(r,a,h),oe(n,a,null),t(a,m),b=!0},p(r,h){o=r;const g={};h&8&&(g.content=o[7].body),n.$set(g),(!b||h&12)&&ne(a,"active",o[2]===o[7].code)},i(r){b||(z(n.$$.fragment,r),b=!0)},o(r){Z(n.$$.fragment,r),b=!1},d(r){r&&c(a),ae(n)}}}function Dt(i){var ot,st;let o,a,n=i[0].name+"",m,b,r,h,g,$,_,X=i[1].join("/")+"",ie,De,re,Me,ce,C,de,q,pe,R,x,We,ee,H,Fe,ue,te=i[0].name+"",he,Le,be,j,fe,O,me,Ue,N,T,_e,Be,ke,qe,Y,ge,He,ve,Se,E,we,A,ye,je,V,D,$e,Ne,Pe,Ye,v,Ee,F,Ve,Ie,Je,Ce,Qe,Re,Ke,Ze,ze,Oe,Ge,Xe,L,Te,I,Ae,M,J,P=[],xe=new Map,et,Q,w=[],tt=new Map,W;C=new St({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${i[5]}');

        ...

        const authData = await pb.collection('${(ot=i[0])==null?void 0:ot.name}').authWithPassword(
            '${i[4]}',
            'YOUR_PASSWORD',
        );

        // after the above you can also access the auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${i[5]}');

        ...

        final authData = await pb.collection('${(st=i[0])==null?void 0:st.name}').authWithPassword(
          '${i[4]}',
          'YOUR_PASSWORD',
        );

        // after the above you can also access the auth data from the authStore
        print(pb.authStore.isValid);
        print(pb.authStore.token);
        print(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `}});let U=B(i[1]),S=[];for(let e=0;e<U.length;e+=1)S[e]=bt(ht(i,U,e));F=new _t({props:{content:"?expand=relField1,relField2.subRelField"}}),L=new Tt({props:{prefix:"record."}});let le=B(i[3]);const lt=e=>e[7].code;for(let e=0;e<le.length;e+=1){let l=ut(i,le,e),p=lt(l);xe.set(p,P[e]=ft(p,l))}let K=B(i[3]);const at=e=>e[7].code;for(let e=0;e<K.length;e+=1){let l=pt(i,K,e),p=at(l);tt.set(p,w[e]=mt(p,l))}return{c(){o=s("h3"),a=f("Auth with password ("),m=f(n),b=f(")"),r=u(),h=s("div"),g=s("p"),$=f(`Authenticate with combination of
        `),_=s("strong"),ie=f(X),De=f(" and "),re=s("strong"),re.textContent="password",Me=f("."),ce=u(),se(C.$$.fragment),de=u(),q=s("h6"),q.textContent="API details",pe=u(),R=s("div"),x=s("strong"),x.textContent="POST",We=u(),ee=s("div"),H=s("p"),Fe=f("/api/collections/"),ue=s("strong"),he=f(te),Le=f("/auth-with-password"),be=u(),j=s("div"),j.textContent="Body Parameters",fe=u(),O=s("table"),me=s("thead"),me.innerHTML='<tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr>',Ue=u(),N=s("tbody"),T=s("tr"),_e=s("td"),_e.innerHTML='<div class="inline-flex"><span class="label label-success">Required</span> <span>identity</span></div>',Be=u(),ke=s("td"),ke.innerHTML='<span class="label">String</span>',qe=u(),Y=s("td");for(let e=0;e<S.length;e+=1)S[e].c();ge=f(`
                of the record to authenticate.`),He=u(),ve=s("tr"),ve.innerHTML='<td><div class="inline-flex"><span class="label label-success">Required</span> <span>password</span></div></td> <td><span class="label">String</span></td> <td>The auth record password.</td>',Se=u(),E=s("div"),E.textContent="Query parameters",we=u(),A=s("table"),ye=s("thead"),ye.innerHTML='<tr><th>Param</th> <th>Type</th> <th width="60%">Description</th></tr>',je=u(),V=s("tbody"),D=s("tr"),$e=s("td"),$e.textContent="expand",Ne=u(),Pe=s("td"),Pe.innerHTML='<span class="label">String</span>',Ye=u(),v=s("td"),Ee=f(`Auto expand record relations. Ex.:
                `),se(F.$$.fragment),Ve=f(`
                Supports up to 6-levels depth nested relations expansion. `),Ie=s("br"),Je=f(`
                The expanded relations will be appended to the record under the
                `),Ce=s("code"),Ce.textContent="expand",Qe=f(" property (eg. "),Re=s("code"),Re.textContent='"expand": {"relField1": {...}, ...}',Ke=f(`).
                `),Ze=s("br"),ze=f(`
                Only the relations to which the request user has permissions to `),Oe=s("strong"),Oe.textContent="view",Ge=f(" will be expanded."),Xe=u(),se(L.$$.fragment),Te=u(),I=s("div"),I.textContent="Responses",Ae=u(),M=s("div"),J=s("div");for(let e=0;e<P.length;e+=1)P[e].c();et=u(),Q=s("div");for(let e=0;e<w.length;e+=1)w[e].c();k(o,"class","m-b-sm"),k(h,"class","content txt-lg m-b-sm"),k(q,"class","m-b-xs"),k(x,"class","label label-primary"),k(ee,"class","content"),k(R,"class","alert alert-success"),k(j,"class","section-title"),k(O,"class","table-compact table-border m-b-base"),k(E,"class","section-title"),k(A,"class","table-compact table-border m-b-base"),k(I,"class","section-title"),k(J,"class","tabs-header compact combined left"),k(Q,"class","tabs-content"),k(M,"class","tabs")},m(e,l){d(e,o,l),t(o,a),t(o,m),t(o,b),d(e,r,l),d(e,h,l),t(h,g),t(g,$),t(g,_),t(_,ie),t(g,De),t(g,re),t(g,Me),d(e,ce,l),oe(C,e,l),d(e,de,l),d(e,q,l),d(e,pe,l),d(e,R,l),t(R,x),t(R,We),t(R,ee),t(ee,H),t(H,Fe),t(H,ue),t(ue,he),t(H,Le),d(e,be,l),d(e,j,l),d(e,fe,l),d(e,O,l),t(O,me),t(O,Ue),t(O,N),t(N,T),t(T,_e),t(T,Be),t(T,ke),t(T,qe),t(T,Y);for(let p=0;p<S.length;p+=1)S[p]&&S[p].m(Y,null);t(Y,ge),t(N,He),t(N,ve),d(e,Se,l),d(e,E,l),d(e,we,l),d(e,A,l),t(A,ye),t(A,je),t(A,V),t(V,D),t(D,$e),t(D,Ne),t(D,Pe),t(D,Ye),t(D,v),t(v,Ee),oe(F,v,null),t(v,Ve),t(v,Ie),t(v,Je),t(v,Ce),t(v,Qe),t(v,Re),t(v,Ke),t(v,Ze),t(v,ze),t(v,Oe),t(v,Ge),t(V,Xe),oe(L,V,null),d(e,Te,l),d(e,I,l),d(e,Ae,l),d(e,M,l),t(M,J);for(let p=0;p<P.length;p+=1)P[p]&&P[p].m(J,null);t(M,et),t(M,Q);for(let p=0;p<w.length;p+=1)w[p]&&w[p].m(Q,null);W=!0},p(e,[l]){var nt,it;(!W||l&1)&&n!==(n=e[0].name+"")&&G(m,n),(!W||l&2)&&X!==(X=e[1].join("/")+"")&&G(ie,X);const p={};if(l&49&&(p.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${e[5]}');

        ...

        const authData = await pb.collection('${(nt=e[0])==null?void 0:nt.name}').authWithPassword(
            '${e[4]}',
            'YOUR_PASSWORD',
        );

        // after the above you can also access the auth data from the authStore
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `),l&49&&(p.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${e[5]}');

        ...

        final authData = await pb.collection('${(it=e[0])==null?void 0:it.name}').authWithPassword(
          '${e[4]}',
          'YOUR_PASSWORD',
        );

        // after the above you can also access the auth data from the authStore
        print(pb.authStore.isValid);
        print(pb.authStore.token);
        print(pb.authStore.record.id);

        // "logout"
        pb.authStore.clear();
    `),C.$set(p),(!W||l&1)&&te!==(te=e[0].name+"")&&G(he,te),l&2){U=B(e[1]);let y;for(y=0;y<U.length;y+=1){const rt=ht(e,U,y);S[y]?S[y].p(rt,l):(S[y]=bt(rt),S[y].c(),S[y].m(Y,ge))}for(;y<S.length;y+=1)S[y].d(1);S.length=U.length}l&12&&(le=B(e[3]),P=ct(P,l,lt,1,e,le,xe,J,yt,ft,null,ut)),l&12&&(K=B(e[3]),$t(),w=ct(w,l,at,1,e,K,tt,Q,Pt,mt,null,pt),Ct())},i(e){if(!W){z(C.$$.fragment,e),z(F.$$.fragment,e),z(L.$$.fragment,e);for(let l=0;l<K.length;l+=1)z(w[l]);W=!0}},o(e){Z(C.$$.fragment,e),Z(F.$$.fragment,e),Z(L.$$.fragment,e);for(let l=0;l<w.length;l+=1)Z(w[l]);W=!1},d(e){e&&(c(o),c(r),c(h),c(ce),c(de),c(q),c(pe),c(R),c(be),c(j),c(fe),c(O),c(Se),c(E),c(we),c(A),c(Te),c(I),c(Ae),c(M)),ae(C,e),wt(S,e),ae(F),ae(L);for(let l=0;l<P.length;l+=1)P[l].d();for(let l=0;l<w.length;l+=1)w[l].d()}}}function Mt(i,o,a){let n,m,b,{collection:r}=o,h=200,g=[];const $=_=>a(2,h=_.code);return i.$$set=_=>{"collection"in _&&a(0,r=_.collection)},i.$$.update=()=>{var _;i.$$.dirty&1&&a(1,m=((_=r==null?void 0:r.passwordAuth)==null?void 0:_.identityFields)||[]),i.$$.dirty&2&&a(4,b=m.length==0?"NONE":"YOUR_"+m.join("_OR_").toUpperCase()),i.$$.dirty&1&&a(3,g=[{code:200,body:JSON.stringify({token:"JWT_TOKEN",record:dt.dummyCollectionRecord(r)},null,2)},{code:400,body:`
                {
                  "status": 400,
                  "message": "Failed to authenticate.",
                  "data": {
                    "identity": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}])},a(5,n=dt.getApiExampleUrl(Rt.baseURL)),[r,m,h,g,b,n,$]}class Lt extends kt{constructor(o){super(),gt(this,o,Mt,Dt,vt,{collection:0})}}export{Lt as default};
