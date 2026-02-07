import{S,i as j,s as q,aj as H,H as z,h as s,d as V,t as B,a as D,l,n as _,m as I,u as n,v as i,c as O,w as o}from"./index-BXdnPgBO.js";function K(R){let a,b,m,C,r,w,c,f,G,x,T,y,u,E,p,k,v,A,d,$;return p=new H({props:{content:`{
  "id": "vec1",
  "type": "text",
  "ref_id": null,
  "embedding": [0.1, 0.2, 0.3],
  "metadata": {
    "tags": ["flutter"]
  },
  "created_at": "2024-01-01T00:00:00Z"
}`}}),d=new H({props:{content:`curl -X GET http://localhost:8090/api/vectors/vec1 \\
  -H "Authorization: Bearer YOUR_TOKEN"`}}),{c(){a=n("h3"),a.textContent="View Vector",b=i(),m=n("div"),m.innerHTML="<p>Get a vector by its ID.</p>",C=i(),r=n("h6"),r.textContent="API details",w=i(),c=n("div"),f=n("strong"),f.textContent="GET",G=i(),x=n("div"),T=n("p"),T.textContent="/api/vectors/{id}",y=i(),u=n("div"),u.textContent="Response",E=i(),O(p.$$.fragment),k=i(),v=n("div"),v.textContent="Example",A=i(),O(d.$$.fragment),o(a,"class","m-b-sm"),o(m,"class","content txt-lg m-b-sm"),o(r,"class","m-b-xs"),o(f,"class","label label-primary"),o(x,"class","content"),o(c,"class","alert alert-success"),o(u,"class","section-title"),o(v,"class","section-title")},m(t,e){l(t,a,e),l(t,b,e),l(t,m,e),l(t,C,e),l(t,r,e),l(t,w,e),l(t,c,e),_(c,f),_(c,G),_(c,x),_(x,T),l(t,y,e),l(t,u,e),l(t,E,e),I(p,t,e),l(t,k,e),l(t,v,e),l(t,A,e),I(d,t,e),$=!0},p:z,i(t){$||(D(p.$$.fragment,t),D(d.$$.fragment,t),$=!0)},o(t){B(p.$$.fragment,t),B(d.$$.fragment,t),$=!1},d(t){t&&(s(a),s(b),s(m),s(C),s(r),s(w),s(c),s(y),s(u),s(E),s(k),s(v),s(A)),V(p,t),V(d,t)}}}class M extends S{constructor(a){super(),j(this,a,null,K,q,{})}}export{M as default};
