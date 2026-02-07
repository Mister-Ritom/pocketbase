import{S as Re,i as Pe,s as Ee,ai as Te,L as U,h as p,d as $e,t as te,a as le,I as ee,M as he,N as Be,C as Ie,P as Oe,D as Ae,l as f,n as i,m as Ce,u as c,A as y,v as k,c as we,w as m,J as Me,p as Le,k as N,o as qe,aj as Se}from"./index-BXdnPgBO.js";function ke(a,l,s){const n=a.slice();return n[6]=l[s],n}function ge(a,l,s){const n=a.slice();return n[6]=l[s],n}function ve(a){let l;return{c(){l=c("p"),l.innerHTML="Requires superuser <code>Authorization:TOKEN</code> header",m(l,"class","txt-hint txt-sm txt-right")},m(s,n){f(s,l,n)},d(s){s&&p(l)}}}function ye(a,l){let s,n,h;function r(){return l[5](l[6])}return{key:a,first:null,c(){s=c("button"),s.textContent=`${l[6].code} `,m(s,"class","tab-item"),N(s,"active",l[2]===l[6].code),this.first=s},m(o,d){f(o,s,d),n||(h=qe(s,"click",r),n=!0)},p(o,d){l=o,d&20&&N(s,"active",l[2]===l[6].code)},d(o){o&&p(s),n=!1,h()}}}function De(a,l){let s,n,h,r;return n=new Se({props:{content:l[6].body}}),{key:a,first:null,c(){s=c("div"),we(n.$$.fragment),h=k(),m(s,"class","tab-item"),N(s,"active",l[2]===l[6].code),this.first=s},m(o,d){f(o,s,d),Ce(n,s,null),i(s,h),r=!0},p(o,d){l=o,(!r||d&20)&&N(s,"active",l[2]===l[6].code)},i(o){r||(le(n.$$.fragment,o),r=!0)},o(o){te(n.$$.fragment,o),r=!1},d(o){o&&p(s),$e(n)}}}function je(a){var fe,me;let l,s,n=a[0].name+"",h,r,o,d,D,$,z,L=a[0].name+"",F,se,J,C,K,E,G,g,q,ae,S,P,ne,Q,j=a[0].name+"",V,oe,W,ie,X,T,Y,B,Z,I,x,w,O,v=[],ce=new Map,re,A,b=[],de=new Map,R;C=new Te({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${a[3]}');

        ...

        await pb.collection('${(fe=a[0])==null?void 0:fe.name}').delete('RECORD_ID');
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${a[3]}');

        ...

        await pb.collection('${(me=a[0])==null?void 0:me.name}').delete('RECORD_ID');
    `}});let _=a[1]&&ve(),H=U(a[4]);const ue=e=>e[6].code;for(let e=0;e<H.length;e+=1){let t=ge(a,H,e),u=ue(t);ce.set(u,v[e]=ye(u,t))}let M=U(a[4]);const pe=e=>e[6].code;for(let e=0;e<M.length;e+=1){let t=ke(a,M,e),u=pe(t);de.set(u,b[e]=De(u,t))}return{c(){l=c("h3"),s=y("Delete ("),h=y(n),r=y(")"),o=k(),d=c("div"),D=c("p"),$=y("Delete a single "),z=c("strong"),F=y(L),se=y(" record."),J=k(),we(C.$$.fragment),K=k(),E=c("h6"),E.textContent="API details",G=k(),g=c("div"),q=c("strong"),q.textContent="DELETE",ae=k(),S=c("div"),P=c("p"),ne=y("/api/collections/"),Q=c("strong"),V=y(j),oe=y("/records/"),W=c("strong"),W.textContent=":id",ie=k(),_&&_.c(),X=k(),T=c("div"),T.textContent="Path parameters",Y=k(),B=c("table"),B.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="60%">Description</th></tr></thead> <tbody><tr><td>id</td> <td><span class="label">String</span></td> <td>ID of the record to delete.</td></tr></tbody>',Z=k(),I=c("div"),I.textContent="Responses",x=k(),w=c("div"),O=c("div");for(let e=0;e<v.length;e+=1)v[e].c();re=k(),A=c("div");for(let e=0;e<b.length;e+=1)b[e].c();m(l,"class","m-b-sm"),m(d,"class","content txt-lg m-b-sm"),m(E,"class","m-b-xs"),m(q,"class","label label-primary"),m(S,"class","content"),m(g,"class","alert alert-danger"),m(T,"class","section-title"),m(B,"class","table-compact table-border m-b-base"),m(I,"class","section-title"),m(O,"class","tabs-header compact combined left"),m(A,"class","tabs-content"),m(w,"class","tabs")},m(e,t){f(e,l,t),i(l,s),i(l,h),i(l,r),f(e,o,t),f(e,d,t),i(d,D),i(D,$),i(D,z),i(z,F),i(D,se),f(e,J,t),Ce(C,e,t),f(e,K,t),f(e,E,t),f(e,G,t),f(e,g,t),i(g,q),i(g,ae),i(g,S),i(S,P),i(P,ne),i(P,Q),i(Q,V),i(P,oe),i(P,W),i(g,ie),_&&_.m(g,null),f(e,X,t),f(e,T,t),f(e,Y,t),f(e,B,t),f(e,Z,t),f(e,I,t),f(e,x,t),f(e,w,t),i(w,O);for(let u=0;u<v.length;u+=1)v[u]&&v[u].m(O,null);i(w,re),i(w,A);for(let u=0;u<b.length;u+=1)b[u]&&b[u].m(A,null);R=!0},p(e,[t]){var be,_e;(!R||t&1)&&n!==(n=e[0].name+"")&&ee(h,n),(!R||t&1)&&L!==(L=e[0].name+"")&&ee(F,L);const u={};t&9&&(u.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${e[3]}');

        ...

        await pb.collection('${(be=e[0])==null?void 0:be.name}').delete('RECORD_ID');
    `),t&9&&(u.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${e[3]}');

        ...

        await pb.collection('${(_e=e[0])==null?void 0:_e.name}').delete('RECORD_ID');
    `),C.$set(u),(!R||t&1)&&j!==(j=e[0].name+"")&&ee(V,j),e[1]?_||(_=ve(),_.c(),_.m(g,null)):_&&(_.d(1),_=null),t&20&&(H=U(e[4]),v=he(v,t,ue,1,e,H,ce,O,Be,ye,null,ge)),t&20&&(M=U(e[4]),Ie(),b=he(b,t,pe,1,e,M,de,A,Oe,De,null,ke),Ae())},i(e){if(!R){le(C.$$.fragment,e);for(let t=0;t<M.length;t+=1)le(b[t]);R=!0}},o(e){te(C.$$.fragment,e);for(let t=0;t<b.length;t+=1)te(b[t]);R=!1},d(e){e&&(p(l),p(o),p(d),p(J),p(K),p(E),p(G),p(g),p(X),p(T),p(Y),p(B),p(Z),p(I),p(x),p(w)),$e(C,e),_&&_.d();for(let t=0;t<v.length;t+=1)v[t].d();for(let t=0;t<b.length;t+=1)b[t].d()}}}function He(a,l,s){let n,h,{collection:r}=l,o=204,d=[];const D=$=>s(2,o=$.code);return a.$$set=$=>{"collection"in $&&s(0,r=$.collection)},a.$$.update=()=>{a.$$.dirty&1&&s(1,n=(r==null?void 0:r.deleteRule)===null),a.$$.dirty&3&&r!=null&&r.id&&(d.push({code:204,body:`
                null
            `}),d.push({code:400,body:`
                {
                  "status": 400,
                  "message": "Failed to delete record. Make sure that the record is not part of a required relation reference.",
                  "data": {}
                }
            `}),n&&d.push({code:403,body:`
                    {
                      "status": 403,
                      "message": "Only superusers can access this action.",
                      "data": {}
                    }
                `}),d.push({code:404,body:`
                {
                  "status": 404,
                  "message": "The requested resource wasn't found.",
                  "data": {}
                }
            `}))},s(3,h=Me.getApiExampleUrl(Le.baseURL)),[r,n,o,h,d,D]}class Ne extends Re{constructor(l){super(),Pe(this,l,He,je,Ee,{collection:0})}}export{Ne as default};
