import{S as $l,i as _l,s as yl,H as pl,h as m,l as h,o as kl,u as e,v as l,R as vl,w as n,n as t,A as g,ai as Fl,aj as nl,L as Ae,d as qt,Z as Ll,t as ut,a as mt,I as ol,M as fl,N as Al,C as Tl,P as Pl,D as Rl,m as Ht,c as Mt,J as dl,p as Sl,k as rl}from"./index-BXdnPgBO.js";import{F as Ol}from"./FieldsQueryParam-B0vPSaUP.js";function El(d){let o,i,r;return{c(){o=e("span"),o.textContent="Show details",i=l(),r=e("i"),n(o,"class","txt"),n(r,"class","ri-arrow-down-s-line")},m(f,b){h(f,o,b),h(f,i,b),h(f,r,b)},d(f){f&&(m(o),m(i),m(r))}}}function Nl(d){let o,i,r;return{c(){o=e("span"),o.textContent="Hide details",i=l(),r=e("i"),n(o,"class","txt"),n(r,"class","ri-arrow-up-s-line")},m(f,b){h(f,o,b),h(f,i,b),h(f,r,b)},d(f){f&&(m(o),m(i),m(r))}}}function ul(d){let o,i,r,f,b,p,u,$,w,C,a,st,Dt,xe,q,we,B,ht,O,nt,Te,Q,W,Pe,bt,It,ot,Bt,Re,gt,xt,at,H,Ce,Gt,_,it,jt,$e,Ut,Z,rt,zt,_e,Jt,A,wt,Kt,Se,Ct,Oe,G,Qt,ct,Wt,T,$t,Ee,V,Zt,ye,Vt,ke,Xt,Ne,P,_t,qe,yt,He,j,Me,S,Yt,dt,te,X,kt,De,U,ee,k,le,pt,se,Ie,Y,vt,Be,Ft,Ge,ne,je,z,oe,Ue,J,ze,M,ve,tt,Lt,Je,R,Ke,ae,Qe,At,ie,We,re,ft,Tt,Pt,Fe,et,Le,E,lt,N,ce,Ze,K,v,Ve,D,L,I,y,de,pe,Rt,St,fe,Xe,ue,Ye,Ot,me,s,c,x,Et,he,tl,be,el,Nt,F,ll,al,cl,il;return{c(){o=e("p"),o.innerHTML=`The syntax basically follows the format
        <code><span class="txt-success">OPERAND</span> <span class="txt-danger">OPERATOR</span> <span class="txt-success">OPERAND</span></code>, where:`,i=l(),r=e("ul"),f=e("li"),f.innerHTML=`<code class="txt-success">OPERAND</code> - could be any of the above field literal, string (single
            or double quoted), number, null, true, false`,b=l(),p=e("li"),u=e("code"),u.textContent="OPERATOR",$=g(` - is one of:
            `),w=e("br"),C=l(),a=e("ul"),st=e("li"),Dt=e("code"),Dt.textContent="=",xe=l(),q=e("span"),q.textContent="Equal",we=l(),B=e("li"),ht=e("code"),ht.textContent="!=",O=l(),nt=e("span"),nt.textContent="NOT equal",Te=l(),Q=e("li"),W=e("code"),W.textContent=">",Pe=l(),bt=e("span"),bt.textContent="Greater than",It=l(),ot=e("li"),Bt=e("code"),Bt.textContent=">=",Re=l(),gt=e("span"),gt.textContent="Greater than or equal",xt=l(),at=e("li"),H=e("code"),H.textContent="<",Ce=l(),Gt=e("span"),Gt.textContent="Less than",_=l(),it=e("li"),jt=e("code"),jt.textContent="<=",$e=l(),Ut=e("span"),Ut.textContent="Less than or equal",Z=l(),rt=e("li"),zt=e("code"),zt.textContent="~",_e=l(),Jt=e("span"),Jt.textContent=`Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)`,A=l(),wt=e("li"),Kt=e("code"),Kt.textContent="!~",Se=l(),Ct=e("span"),Ct.textContent=`NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)`,Oe=l(),G=e("li"),Qt=e("code"),Qt.textContent="?=",ct=l(),Wt=e("em"),Wt.textContent="Any/At least one of",T=l(),$t=e("span"),$t.textContent="Equal",Ee=l(),V=e("li"),Zt=e("code"),Zt.textContent="?!=",ye=l(),Vt=e("em"),Vt.textContent="Any/At least one of",ke=l(),Xt=e("span"),Xt.textContent="NOT equal",Ne=l(),P=e("li"),_t=e("code"),_t.textContent="?>",qe=l(),yt=e("em"),yt.textContent="Any/At least one of",He=l(),j=e("span"),j.textContent="Greater than",Me=l(),S=e("li"),Yt=e("code"),Yt.textContent="?>=",dt=l(),te=e("em"),te.textContent="Any/At least one of",X=l(),kt=e("span"),kt.textContent="Greater than or equal",De=l(),U=e("li"),ee=e("code"),ee.textContent="?<",k=l(),le=e("em"),le.textContent="Any/At least one of",pt=l(),se=e("span"),se.textContent="Less than",Ie=l(),Y=e("li"),vt=e("code"),vt.textContent="?<=",Be=l(),Ft=e("em"),Ft.textContent="Any/At least one of",Ge=l(),ne=e("span"),ne.textContent="Less than or equal",je=l(),z=e("li"),oe=e("code"),oe.textContent="?~",Ue=l(),J=e("em"),J.textContent="Any/At least one of",ze=l(),M=e("span"),M.textContent=`Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)`,ve=l(),tt=e("li"),Lt=e("code"),Lt.textContent="?!~",Je=l(),R=e("em"),R.textContent="Any/At least one of",Ke=l(),ae=e("span"),ae.textContent=`NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)`,Qe=l(),At=e("li"),ie=e("code"),ie.textContent="contains",We=l(),re=e("span"),re.textContent="Array/string contains value",ft=l(),Tt=e("li"),Pt=e("code"),Pt.textContent="containsAny",Fe=l(),et=e("span"),et.textContent="Array contains any of the values",Le=l(),E=e("li"),lt=e("code"),lt.textContent="containsAll",N=l(),ce=e("span"),ce.textContent="Array contains all of the values",Ze=l(),K=e("li"),v=e("code"),v.textContent="notContains",Ve=l(),D=e("span"),D.textContent="Array/string does not contain value",L=l(),I=e("li"),y=e("code"),y.textContent="startsWith",de=l(),pe=e("span"),pe.textContent="String starts with prefix",Rt=l(),St=e("li"),fe=e("code"),fe.textContent="endsWith",Xe=l(),ue=e("span"),ue.textContent="String ends with suffix",Ye=l(),Ot=e("li"),me=e("code"),me.textContent="regex",s=l(),c=e("span"),c.textContent="String matches regex pattern",x=l(),Et=e("li"),he=e("code"),he.textContent="lengthGt",tl=l(),be=e("span"),be.textContent="Array/string length greater than",el=l(),Nt=e("li"),F=e("code"),F.textContent="lengthLt",ll=l(),al=e("span"),al.textContent="Array/string length less than",cl=l(),il=e("p"),il.innerHTML=`To group and combine several expressions you could use brackets
        <code>(...)</code>, <code>&amp;&amp;</code> (AND) and <code>||</code> (OR) tokens.`,n(u,"class","txt-danger"),n(Dt,"class","filter-op svelte-1w7s5nw"),n(q,"class","txt"),n(ht,"class","filter-op svelte-1w7s5nw"),n(nt,"class","txt"),n(W,"class","filter-op svelte-1w7s5nw"),n(bt,"class","txt"),n(Bt,"class","filter-op svelte-1w7s5nw"),n(gt,"class","txt"),n(H,"class","filter-op svelte-1w7s5nw"),n(Gt,"class","txt"),n(jt,"class","filter-op svelte-1w7s5nw"),n(Ut,"class","txt"),n(zt,"class","filter-op svelte-1w7s5nw"),n(Jt,"class","txt"),n(Kt,"class","filter-op svelte-1w7s5nw"),n(Ct,"class","txt"),n(Qt,"class","filter-op svelte-1w7s5nw"),n(Wt,"class","txt-hint"),n($t,"class","txt"),n(Zt,"class","filter-op svelte-1w7s5nw"),n(Vt,"class","txt-hint"),n(Xt,"class","txt"),n(_t,"class","filter-op svelte-1w7s5nw"),n(yt,"class","txt-hint"),n(j,"class","txt"),n(Yt,"class","filter-op svelte-1w7s5nw"),n(te,"class","txt-hint"),n(kt,"class","txt"),n(ee,"class","filter-op svelte-1w7s5nw"),n(le,"class","txt-hint"),n(se,"class","txt"),n(vt,"class","filter-op svelte-1w7s5nw"),n(Ft,"class","txt-hint"),n(ne,"class","txt"),n(oe,"class","filter-op svelte-1w7s5nw"),n(J,"class","txt-hint"),n(M,"class","txt"),n(Lt,"class","filter-op svelte-1w7s5nw"),n(R,"class","txt-hint"),n(ae,"class","txt"),n(ie,"class","filter-op svelte-1w7s5nw"),n(re,"class","txt"),n(Pt,"class","filter-op svelte-1w7s5nw"),n(et,"class","txt"),n(lt,"class","filter-op svelte-1w7s5nw"),n(ce,"class","txt"),n(v,"class","filter-op svelte-1w7s5nw"),n(D,"class","txt"),n(y,"class","filter-op svelte-1w7s5nw"),n(pe,"class","txt"),n(fe,"class","filter-op svelte-1w7s5nw"),n(ue,"class","txt"),n(me,"class","filter-op svelte-1w7s5nw"),n(c,"class","txt"),n(he,"class","filter-op svelte-1w7s5nw"),n(be,"class","txt"),n(F,"class","filter-op svelte-1w7s5nw"),n(al,"class","txt")},m(ge,sl){h(ge,o,sl),h(ge,i,sl),h(ge,r,sl),t(r,f),t(r,b),t(r,p),t(p,u),t(p,$),t(p,w),t(p,C),t(p,a),t(a,st),t(st,Dt),t(st,xe),t(st,q),t(a,we),t(a,B),t(B,ht),t(B,O),t(B,nt),t(a,Te),t(a,Q),t(Q,W),t(Q,Pe),t(Q,bt),t(a,It),t(a,ot),t(ot,Bt),t(ot,Re),t(ot,gt),t(a,xt),t(a,at),t(at,H),t(at,Ce),t(at,Gt),t(a,_),t(a,it),t(it,jt),t(it,$e),t(it,Ut),t(a,Z),t(a,rt),t(rt,zt),t(rt,_e),t(rt,Jt),t(a,A),t(a,wt),t(wt,Kt),t(wt,Se),t(wt,Ct),t(a,Oe),t(a,G),t(G,Qt),t(G,ct),t(G,Wt),t(G,T),t(G,$t),t(a,Ee),t(a,V),t(V,Zt),t(V,ye),t(V,Vt),t(V,ke),t(V,Xt),t(a,Ne),t(a,P),t(P,_t),t(P,qe),t(P,yt),t(P,He),t(P,j),t(a,Me),t(a,S),t(S,Yt),t(S,dt),t(S,te),t(S,X),t(S,kt),t(a,De),t(a,U),t(U,ee),t(U,k),t(U,le),t(U,pt),t(U,se),t(a,Ie),t(a,Y),t(Y,vt),t(Y,Be),t(Y,Ft),t(Y,Ge),t(Y,ne),t(a,je),t(a,z),t(z,oe),t(z,Ue),t(z,J),t(z,ze),t(z,M),t(a,ve),t(a,tt),t(tt,Lt),t(tt,Je),t(tt,R),t(tt,Ke),t(tt,ae),t(a,Qe),t(a,At),t(At,ie),t(At,We),t(At,re),t(a,ft),t(a,Tt),t(Tt,Pt),t(Tt,Fe),t(Tt,et),t(a,Le),t(a,E),t(E,lt),t(E,N),t(E,ce),t(a,Ze),t(a,K),t(K,v),t(K,Ve),t(K,D),t(a,L),t(a,I),t(I,y),t(I,de),t(I,pe),t(a,Rt),t(a,St),t(St,fe),t(St,Xe),t(St,ue),t(a,Ye),t(a,Ot),t(Ot,me),t(Ot,s),t(Ot,c),t(a,x),t(a,Et),t(Et,he),t(Et,tl),t(Et,be),t(a,el),t(a,Nt),t(Nt,F),t(Nt,ll),t(Nt,al),h(ge,cl,sl),h(ge,il,sl)},d(ge){ge&&(m(o),m(i),m(r),m(cl),m(il))}}}function ql(d){let o,i,r,f,b;function p(C,a){return C[0]?Nl:El}let u=p(d),$=u(d),w=d[0]&&ul();return{c(){o=e("button"),$.c(),i=l(),w&&w.c(),r=vl(),n(o,"class","btn btn-sm btn-secondary m-t-10")},m(C,a){h(C,o,a),$.m(o,null),h(C,i,a),w&&w.m(C,a),h(C,r,a),f||(b=kl(o,"click",d[1]),f=!0)},p(C,[a]){u!==(u=p(C))&&($.d(1),$=u(C),$&&($.c(),$.m(o,null))),C[0]?w||(w=ul(),w.c(),w.m(r.parentNode,r)):w&&(w.d(1),w=null)},i:pl,o:pl,d(C){C&&(m(o),m(i),m(r)),$.d(),w&&w.d(C),f=!1,b()}}}function Hl(d,o,i){let r=!1;function f(){i(0,r=!r)}return[r,f]}class Ml extends $l{constructor(o){super(),_l(this,o,Hl,ql,yl,{})}}function ml(d,o,i){const r=d.slice();return r[8]=o[i],r}function hl(d,o,i){const r=d.slice();return r[8]=o[i],r}function bl(d,o,i){const r=d.slice();return r[13]=o[i],r[15]=i,r}function gl(d){let o;return{c(){o=e("p"),o.innerHTML="Requires superuser <code>Authorization:TOKEN</code> header",n(o,"class","txt-hint txt-sm txt-right")},m(i,r){h(i,o,r)},d(i){i&&m(o)}}}function xl(d){let o,i=d[13]+"",r,f=d[15]<d[4].length-1?", ":"",b;return{c(){o=e("code"),r=g(i),b=g(f)},m(p,u){h(p,o,u),t(o,r),h(p,b,u)},p(p,u){u&16&&i!==(i=p[13]+"")&&ol(r,i),u&16&&f!==(f=p[15]<p[4].length-1?", ":"")&&ol(b,f)},d(p){p&&(m(o),m(b))}}}function wl(d,o){let i,r,f;function b(){return o[7](o[8])}return{key:d,first:null,c(){i=e("button"),i.textContent=`${o[8].code} `,n(i,"type","button"),n(i,"class","tab-item"),rl(i,"active",o[2]===o[8].code),this.first=i},m(p,u){h(p,i,u),r||(f=kl(i,"click",b),r=!0)},p(p,u){o=p,u&36&&rl(i,"active",o[2]===o[8].code)},d(p){p&&m(i),r=!1,f()}}}function Cl(d,o){let i,r,f,b;return r=new nl({props:{content:o[8].body}}),{key:d,first:null,c(){i=e("div"),Mt(r.$$.fragment),f=l(),n(i,"class","tab-item"),rl(i,"active",o[2]===o[8].code),this.first=i},m(p,u){h(p,i,u),Ht(r,i,null),t(i,f),b=!0},p(p,u){o=p,(!b||u&36)&&rl(i,"active",o[2]===o[8].code)},i(p){b||(mt(r.$$.fragment,p),b=!0)},o(p){ut(r.$$.fragment,p),b=!1},d(p){p&&m(i),qt(r)}}}function Dl(d){var fe,Xe,ue,Ye,Ot,me;let o,i,r=d[0].name+"",f,b,p,u,$,w,C,a=d[0].name+"",st,Dt,xe,q,we,B,ht,O,nt,Te,Q,W,Pe,bt,It=d[0].name+"",ot,Bt,Re,gt,xt,at,H,Ce,Gt,_,it,jt,$e,Ut,Z,rt,zt,_e,Jt,A,wt,Kt,Se,Ct,Oe,G,Qt,ct,Wt,T,$t,Ee,V,Zt,ye,Vt,ke,Xt,Ne,P,_t,qe,yt,He,j,Me,S,Yt,dt,te,X,kt,De,U,ee,k,le,pt,se,Ie,Y,vt,Be,Ft,Ge,ne,je,z,oe,Ue,J,ze,M,ve,tt,Lt,Je,R,Ke,ae,Qe,At,ie,We,re,ft,Tt,Pt,Fe,et,Le,E,lt,N=[],ce=new Map,Ze,K,v=[],Ve=new Map,D;q=new Fl({props:{js:`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${d[3]}');

        ...

        // fetch a paginated records list
        const resultList = await pb.collection('${(fe=d[0])==null?void 0:fe.name}').getList(1, 50, {
            filter: 'someField1 != someField2',
        });

        // you can also fetch all records at once via getFullList
        const records = await pb.collection('${(Xe=d[0])==null?void 0:Xe.name}').getFullList({
            sort: '-someField',
        });

        // or fetch only the first record that matches the specified filter
        const record = await pb.collection('${(ue=d[0])==null?void 0:ue.name}').getFirstListItem('someField="test"', {
            expand: 'relField1,relField2.subRelField',
        });
    `,dart:`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${d[3]}');

        ...

        // fetch a paginated records list
        final resultList = await pb.collection('${(Ye=d[0])==null?void 0:Ye.name}').getList(
          page: 1,
          perPage: 50,
          filter: 'someField1 != someField2',
        );

        // you can also fetch all records at once via getFullList
        final records = await pb.collection('${(Ot=d[0])==null?void 0:Ot.name}').getFullList(
          sort: '-someField',
        );

        // or fetch only the first record that matches the specified filter
        final record = await pb.collection('${(me=d[0])==null?void 0:me.name}').getFirstListItem(
          'someField="test"',
          expand: 'relField1,relField2.subRelField',
        );
    `}});let L=d[1]&&gl();ct=new nl({props:{content:`
                        // DESC by created and ASC by id
                        ?sort=-created,id
                    `}});let I=Ae(d[4]),y=[];for(let s=0;s<I.length;s+=1)y[s]=xl(bl(d,I,s));S=new nl({props:{content:`
                        ?filter=(id='abc' && created>'2022-01-01')
                    `}}),dt=new Ml({}),pt=new nl({props:{content:"?expand=relField1,relField2.subRelField"}}),J=new Ol({}),ft=new nl({props:{content:"?search=lorem ipsum"}});let de=Ae(d[5]);const pe=s=>s[8].code;for(let s=0;s<de.length;s+=1){let c=hl(d,de,s),x=pe(c);ce.set(x,N[s]=wl(x,c))}let Rt=Ae(d[5]);const St=s=>s[8].code;for(let s=0;s<Rt.length;s+=1){let c=ml(d,Rt,s),x=St(c);Ve.set(x,v[s]=Cl(x,c))}return{c(){o=e("h3"),i=g("List/Search ("),f=g(r),b=g(")"),p=l(),u=e("div"),$=e("p"),w=g("Fetch a paginated "),C=e("strong"),st=g(a),Dt=g(" records list, supporting sorting and filtering."),xe=l(),Mt(q.$$.fragment),we=l(),B=e("h6"),B.textContent="API details",ht=l(),O=e("div"),nt=e("strong"),nt.textContent="GET",Te=l(),Q=e("div"),W=e("p"),Pe=g("/api/collections/"),bt=e("strong"),ot=g(It),Bt=g("/records"),Re=l(),L&&L.c(),gt=l(),xt=e("div"),xt.textContent="Query parameters",at=l(),H=e("table"),Ce=e("thead"),Ce.innerHTML='<tr><th>Param</th> <th>Type</th> <th width="60%">Description</th></tr>',Gt=l(),_=e("tbody"),it=e("tr"),it.innerHTML='<td>page</td> <td><span class="label">Number</span></td> <td>The page (aka. offset) of the paginated list (default to 1).</td>',jt=l(),$e=e("tr"),$e.innerHTML='<td>perPage</td> <td><span class="label">Number</span></td> <td>Specify the max returned records per page (default to 30).</td>',Ut=l(),Z=e("tr"),rt=e("td"),rt.textContent="sort",zt=l(),_e=e("td"),_e.innerHTML='<span class="label">String</span>',Jt=l(),A=e("td"),wt=g("Specify the records order attribute(s). "),Kt=e("br"),Se=g(`
                Add `),Ct=e("code"),Ct.textContent="-",Oe=g(" / "),G=e("code"),G.textContent="+",Qt=g(` (default) in front of the attribute for DESC / ASC order.
                Ex.:
                `),Mt(ct.$$.fragment),Wt=l(),T=e("p"),$t=e("strong"),$t.textContent="Supported record sort fields:",Ee=l(),V=e("br"),Zt=l(),ye=e("code"),ye.textContent="@random",Vt=g(`,
                    `),ke=e("code"),ke.textContent="@rowid",Xt=g(`,
                    `);for(let s=0;s<y.length;s+=1)y[s].c();Ne=l(),P=e("tr"),_t=e("td"),_t.textContent="filter",qe=l(),yt=e("td"),yt.innerHTML='<span class="label">String</span>',He=l(),j=e("td"),Me=g(`Filter the returned records. Ex.:
                `),Mt(S.$$.fragment),Yt=l(),Mt(dt.$$.fragment),te=l(),X=e("tr"),kt=e("td"),kt.textContent="expand",De=l(),U=e("td"),U.innerHTML='<span class="label">String</span>',ee=l(),k=e("td"),le=g(`Auto expand record relations. Ex.:
                `),Mt(pt.$$.fragment),se=g(`
                Supports up to 6-levels depth nested relations expansion. `),Ie=e("br"),Y=g(`
                The expanded relations will be appended to each individual record under the
                `),vt=e("code"),vt.textContent="expand",Be=g(" property (eg. "),Ft=e("code"),Ft.textContent='"expand": {"relField1": {...}, ...}',Ge=g(`).
                `),ne=e("br"),je=g(`
                Only the relations to which the request user has permissions to `),z=e("strong"),z.textContent="view",oe=g(" will be expanded."),Ue=l(),Mt(J.$$.fragment),ze=l(),M=e("tr"),ve=e("td"),ve.textContent="search",tt=l(),Lt=e("td"),Lt.innerHTML='<span class="label">String</span>',Je=l(),R=e("td"),Ke=g("Perform a full-text search on records with searchable text fields. "),ae=e("br"),Qe=g(`
                The search is performed using the database's full-text search capabilities and supports natural language queries.
                `),At=e("br"),ie=g(`
                Only text fields marked as "searchable" in the collection schema will be included in the search index.
                `),We=e("br"),re=g(`
                Example: `),Mt(ft.$$.fragment),Tt=l(),Pt=e("tr"),Pt.innerHTML=`<td id="query-page">skipTotal</td> <td><span class="label">Boolean</span></td> <td>If it is set the total counts query will be skipped and the response fields
                <code>totalItems</code> and <code>totalPages</code> will have <code>-1</code> value.
                <br/>
                This could drastically speed up the search queries when the total counters are not needed or cursor
                based pagination is used.
                <br/>
                For optimization purposes, it is set by default for the
                <code>getFirstListItem()</code>
                and
                <code>getFullList()</code> SDKs methods.</td>`,Fe=l(),et=e("div"),et.textContent="Responses",Le=l(),E=e("div"),lt=e("div");for(let s=0;s<N.length;s+=1)N[s].c();Ze=l(),K=e("div");for(let s=0;s<v.length;s+=1)v[s].c();n(o,"class","m-b-sm"),n(u,"class","content txt-lg m-b-sm"),n(B,"class","m-b-xs"),n(nt,"class","label label-primary"),n(Q,"class","content"),n(O,"class","alert alert-info"),n(xt,"class","section-title"),n(H,"class","table-compact table-border m-b-base"),n(et,"class","section-title"),n(lt,"class","tabs-header compact combined left"),n(K,"class","tabs-content"),n(E,"class","tabs")},m(s,c){h(s,o,c),t(o,i),t(o,f),t(o,b),h(s,p,c),h(s,u,c),t(u,$),t($,w),t($,C),t(C,st),t($,Dt),h(s,xe,c),Ht(q,s,c),h(s,we,c),h(s,B,c),h(s,ht,c),h(s,O,c),t(O,nt),t(O,Te),t(O,Q),t(Q,W),t(W,Pe),t(W,bt),t(bt,ot),t(W,Bt),t(O,Re),L&&L.m(O,null),h(s,gt,c),h(s,xt,c),h(s,at,c),h(s,H,c),t(H,Ce),t(H,Gt),t(H,_),t(_,it),t(_,jt),t(_,$e),t(_,Ut),t(_,Z),t(Z,rt),t(Z,zt),t(Z,_e),t(Z,Jt),t(Z,A),t(A,wt),t(A,Kt),t(A,Se),t(A,Ct),t(A,Oe),t(A,G),t(A,Qt),Ht(ct,A,null),t(A,Wt),t(A,T),t(T,$t),t(T,Ee),t(T,V),t(T,Zt),t(T,ye),t(T,Vt),t(T,ke),t(T,Xt);for(let x=0;x<y.length;x+=1)y[x]&&y[x].m(T,null);t(_,Ne),t(_,P),t(P,_t),t(P,qe),t(P,yt),t(P,He),t(P,j),t(j,Me),Ht(S,j,null),t(j,Yt),Ht(dt,j,null),t(_,te),t(_,X),t(X,kt),t(X,De),t(X,U),t(X,ee),t(X,k),t(k,le),Ht(pt,k,null),t(k,se),t(k,Ie),t(k,Y),t(k,vt),t(k,Be),t(k,Ft),t(k,Ge),t(k,ne),t(k,je),t(k,z),t(k,oe),t(_,Ue),Ht(J,_,null),t(_,ze),t(_,M),t(M,ve),t(M,tt),t(M,Lt),t(M,Je),t(M,R),t(R,Ke),t(R,ae),t(R,Qe),t(R,At),t(R,ie),t(R,We),t(R,re),Ht(ft,R,null),t(_,Tt),t(_,Pt),h(s,Fe,c),h(s,et,c),h(s,Le,c),h(s,E,c),t(E,lt);for(let x=0;x<N.length;x+=1)N[x]&&N[x].m(lt,null);t(E,Ze),t(E,K);for(let x=0;x<v.length;x+=1)v[x]&&v[x].m(K,null);D=!0},p(s,[c]){var Et,he,tl,be,el,Nt;(!D||c&1)&&r!==(r=s[0].name+"")&&ol(f,r),(!D||c&1)&&a!==(a=s[0].name+"")&&ol(st,a);const x={};if(c&9&&(x.js=`
        import PocketBase from 'pocketbase';

        const pb = new PocketBase('${s[3]}');

        ...

        // fetch a paginated records list
        const resultList = await pb.collection('${(Et=s[0])==null?void 0:Et.name}').getList(1, 50, {
            filter: 'someField1 != someField2',
        });

        // you can also fetch all records at once via getFullList
        const records = await pb.collection('${(he=s[0])==null?void 0:he.name}').getFullList({
            sort: '-someField',
        });

        // or fetch only the first record that matches the specified filter
        const record = await pb.collection('${(tl=s[0])==null?void 0:tl.name}').getFirstListItem('someField="test"', {
            expand: 'relField1,relField2.subRelField',
        });
    `),c&9&&(x.dart=`
        import 'package:pocketbase/pocketbase.dart';

        final pb = PocketBase('${s[3]}');

        ...

        // fetch a paginated records list
        final resultList = await pb.collection('${(be=s[0])==null?void 0:be.name}').getList(
          page: 1,
          perPage: 50,
          filter: 'someField1 != someField2',
        );

        // you can also fetch all records at once via getFullList
        final records = await pb.collection('${(el=s[0])==null?void 0:el.name}').getFullList(
          sort: '-someField',
        );

        // or fetch only the first record that matches the specified filter
        final record = await pb.collection('${(Nt=s[0])==null?void 0:Nt.name}').getFirstListItem(
          'someField="test"',
          expand: 'relField1,relField2.subRelField',
        );
    `),q.$set(x),(!D||c&1)&&It!==(It=s[0].name+"")&&ol(ot,It),s[1]?L||(L=gl(),L.c(),L.m(O,null)):L&&(L.d(1),L=null),c&16){I=Ae(s[4]);let F;for(F=0;F<I.length;F+=1){const ll=bl(s,I,F);y[F]?y[F].p(ll,c):(y[F]=xl(ll),y[F].c(),y[F].m(T,null))}for(;F<y.length;F+=1)y[F].d(1);y.length=I.length}c&36&&(de=Ae(s[5]),N=fl(N,c,pe,1,s,de,ce,lt,Al,wl,null,hl)),c&36&&(Rt=Ae(s[5]),Tl(),v=fl(v,c,St,1,s,Rt,Ve,K,Pl,Cl,null,ml),Rl())},i(s){if(!D){mt(q.$$.fragment,s),mt(ct.$$.fragment,s),mt(S.$$.fragment,s),mt(dt.$$.fragment,s),mt(pt.$$.fragment,s),mt(J.$$.fragment,s),mt(ft.$$.fragment,s);for(let c=0;c<Rt.length;c+=1)mt(v[c]);D=!0}},o(s){ut(q.$$.fragment,s),ut(ct.$$.fragment,s),ut(S.$$.fragment,s),ut(dt.$$.fragment,s),ut(pt.$$.fragment,s),ut(J.$$.fragment,s),ut(ft.$$.fragment,s);for(let c=0;c<v.length;c+=1)ut(v[c]);D=!1},d(s){s&&(m(o),m(p),m(u),m(xe),m(we),m(B),m(ht),m(O),m(gt),m(xt),m(at),m(H),m(Fe),m(et),m(Le),m(E)),qt(q,s),L&&L.d(),qt(ct),Ll(y,s),qt(S),qt(dt),qt(pt),qt(J),qt(ft);for(let c=0;c<N.length;c+=1)N[c].d();for(let c=0;c<v.length;c+=1)v[c].d()}}}function Il(d,o,i){let r,f,b,p,{collection:u}=o,$=200,w=[];const C=a=>i(2,$=a.code);return d.$$set=a=>{"collection"in a&&i(0,u=a.collection)},d.$$.update=()=>{d.$$.dirty&1&&i(4,r=dl.getAllCollectionIdentifiers(u)),d.$$.dirty&1&&i(1,f=(u==null?void 0:u.listRule)===null),d.$$.dirty&1&&i(6,p=dl.dummyCollectionRecord(u)),d.$$.dirty&67&&u!=null&&u.id&&(w.push({code:200,body:JSON.stringify({page:1,perPage:30,totalPages:1,totalItems:2,items:[p,Object.assign({},p,{id:p.id+"2"})]},null,2)}),w.push({code:400,body:`
                {
                  "status": 400,
                  "message": "Something went wrong while processing your request. Invalid filter.",
                  "data": {}
                }
            `}),f&&w.push({code:403,body:`
                    {
                      "status": 403,
                      "message": "Only superusers can access this action.",
                      "data": {}
                    }
                `}))},i(3,b=dl.getApiExampleUrl(Sl.baseURL)),[u,f,$,b,r,w,p,C]}class jl extends $l{constructor(o){super(),_l(this,o,Il,Dl,yl,{collection:0})}}export{jl as default};
