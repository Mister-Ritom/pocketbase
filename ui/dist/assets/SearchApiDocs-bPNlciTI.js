import{S as E,i as V,s as z,aj as R,H as F,h as s,d as q,t as L,a as M,l,m as N,u as i,v as n,c as j,w as a}from"./index-BXdnPgBO.js";function I(D){let d,_,r,C,m,S,b,T,u,w,v,H,f,O,p,P,x,k,o,A,$,B,c,y;return p=new R({props:{content:`{
  "embedding": [0.1, 0.2, 0.3],
  "top": 10,
  "type": "text"
}`}}),o=new R({props:{content:`{
  "results": [
    {
      "id": "vec1",
      "score": 0.95,
      "ref_id": null
    }
  ]
}`}}),c=new R({props:{content:`curl -X POST http://localhost:8090/api/vectors/search \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "embedding": [0.1, 0.2, 0.3],
    "top": 10,
    "type": "text"
  }'`}}),{c(){d=i("h3"),d.textContent="Search Vectors",_=n(),r=i("div"),r.innerHTML="<p>Search for similar vectors using cosine similarity.</p>",C=n(),m=i("h6"),m.textContent="API details",S=n(),b=i("div"),b.innerHTML='<strong class="label label-primary">POST</strong> <div class="content"><p>/api/vectors/search</p></div>',T=n(),u=i("div"),u.textContent="Body Parameters",w=n(),v=i("table"),v.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>embedding</span></div></td> <td><span class="label">Array</span></td> <td>Vector embedding to search for</td></tr> <tr><td><div class="inline-flex"><span class="label label-warning">Optional</span> <span>top</span></div></td> <td><span class="label">Number</span></td> <td>Number of results to return (default: 10, max: 100)</td></tr> <tr><td><div class="inline-flex"><span class="label label-warning">Optional</span> <span>type</span></div></td> <td><span class="label">String</span></td> <td>Filter by vector type</td></tr></tbody>',H=n(),f=i("div"),f.textContent="Request Body",O=n(),j(p.$$.fragment),P=n(),x=i("div"),x.textContent="Response",k=n(),j(o.$$.fragment),A=n(),$=i("div"),$.textContent="Example",B=n(),j(c.$$.fragment),a(d,"class","m-b-sm"),a(r,"class","content txt-lg m-b-sm"),a(m,"class","m-b-xs"),a(b,"class","alert alert-success"),a(u,"class","section-title"),a(v,"class","table-compact table-border m-b-base"),a(f,"class","section-title"),a(x,"class","section-title"),a($,"class","section-title")},m(t,e){l(t,d,e),l(t,_,e),l(t,r,e),l(t,C,e),l(t,m,e),l(t,S,e),l(t,b,e),l(t,T,e),l(t,u,e),l(t,w,e),l(t,v,e),l(t,H,e),l(t,f,e),l(t,O,e),N(p,t,e),l(t,P,e),l(t,x,e),l(t,k,e),N(o,t,e),l(t,A,e),l(t,$,e),l(t,B,e),N(c,t,e),y=!0},p:F,i(t){y||(M(p.$$.fragment,t),M(o.$$.fragment,t),M(c.$$.fragment,t),y=!0)},o(t){L(p.$$.fragment,t),L(o.$$.fragment,t),L(c.$$.fragment,t),y=!1},d(t){t&&(s(d),s(_),s(r),s(C),s(m),s(S),s(b),s(T),s(u),s(w),s(v),s(H),s(f),s(O),s(P),s(x),s(k),s(A),s($),s(B)),q(p,t),q(o,t),q(c,t)}}}class U extends E{constructor(d){super(),V(this,d,null,I,z,{})}}export{U as default};
