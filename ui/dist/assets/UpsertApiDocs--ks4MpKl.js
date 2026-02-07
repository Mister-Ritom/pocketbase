import{S as E,i as V,s as z,aj as S,H as I,h as s,d as j,t as q,a as L,l,m as M,u as i,v as n,c as U,w as o}from"./index-BXdnPgBO.js";function K(D){let a,C,m,_,r,T,u,A,v,H,b,w,f,P,d,k,$,B,p,O,x,R,c,y;return d=new S({props:{content:`{
  "vectors": [
    {
      "id": "string",
      "type": "text|image|video|file",
      "embedding": [0.1, 0.2, 0.3],
      "metadata": {
        "tags": ["example"],
        "source": "api"
      }
    }
  ]
}`}}),p=new S({props:{content:`{
  "message": "Vectors upserted successfully",
  "count": 1
}`}}),c=new S({props:{content:`curl -X POST http://localhost:8090/api/vectors/upsert \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vectors": [
      {
        "id": "vec1",
        "type": "text",
        "embedding": [0.1, 0.2, 0.3],
        "metadata": {"tags": ["flutter"]}
      }
    ]
  }'`}}),{c(){a=i("h3"),a.textContent="Upsert Vectors",C=n(),m=i("div"),m.innerHTML="<p>Add or update vectors in the database.</p>",_=n(),r=i("h6"),r.textContent="API details",T=n(),u=i("div"),u.innerHTML='<strong class="label label-primary">POST</strong> <div class="content"><p>/api/vectors/upsert</p></div>',A=n(),v=i("div"),v.textContent="Body Parameters",H=n(),b=i("table"),b.innerHTML='<thead><tr><th>Param</th> <th>Type</th> <th width="50%">Description</th></tr></thead> <tbody><tr><td><div class="inline-flex"><span class="label label-success">Required</span> <span>vectors</span></div></td> <td><span class="label">Array</span></td> <td>Array of vector objects to upsert</td></tr></tbody>',w=n(),f=i("div"),f.textContent="Request Body",P=n(),U(d.$$.fragment),k=n(),$=i("div"),$.textContent="Response",B=n(),U(p.$$.fragment),O=n(),x=i("div"),x.textContent="Example",R=n(),U(c.$$.fragment),o(a,"class","m-b-sm"),o(m,"class","content txt-lg m-b-sm"),o(r,"class","m-b-xs"),o(u,"class","alert alert-success"),o(v,"class","section-title"),o(b,"class","table-compact table-border m-b-base"),o(f,"class","section-title"),o($,"class","section-title"),o(x,"class","section-title")},m(t,e){l(t,a,e),l(t,C,e),l(t,m,e),l(t,_,e),l(t,r,e),l(t,T,e),l(t,u,e),l(t,A,e),l(t,v,e),l(t,H,e),l(t,b,e),l(t,w,e),l(t,f,e),l(t,P,e),M(d,t,e),l(t,k,e),l(t,$,e),l(t,B,e),M(p,t,e),l(t,O,e),l(t,x,e),l(t,R,e),M(c,t,e),y=!0},p:I,i(t){y||(L(d.$$.fragment,t),L(p.$$.fragment,t),L(c.$$.fragment,t),y=!0)},o(t){q(d.$$.fragment,t),q(p.$$.fragment,t),q(c.$$.fragment,t),y=!1},d(t){t&&(s(a),s(C),s(m),s(_),s(r),s(T),s(u),s(A),s(v),s(H),s(b),s(w),s(f),s(P),s(k),s($),s(B),s(O),s(x),s(R)),j(d,t),j(p,t),j(c,t)}}}class X extends E{constructor(a){super(),V(this,a,null,K,z,{})}}export{X as default};
