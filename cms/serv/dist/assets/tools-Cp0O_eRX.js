function u(t){try{const r=t.trim();return r?(new URL(r),!0):!1}catch{return!1}}const c=(t,r,n)=>[...t].sort((s,e)=>s[r]<e[r]?n==="asc"?1:-1:s[r]>e[r]?n==="asc"?-1:1:0);export{u as i,c as s};
