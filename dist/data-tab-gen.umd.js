(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t["data-tab-gen"]={}))})(this,function(t){"use strict";function e({headers:i,rows:a,className:o,id:d}){const l=d?` id="${d}"`:"",r=o?` class="${o}"`:"",s=i.map(n=>`<th>${n}</th>`).join(""),b=a.map(n=>`<tr>${n.map(f=>`<td>${f}</td>`).join("")}</tr>`).join("");return`
    <table${l}${r}>
      <thead><tr>${s}</tr></thead>
      <tbody>${b}</tbody>
    </table>
  `.trim()}t.generateHtmlTable=e,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
