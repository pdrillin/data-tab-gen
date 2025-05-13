(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t.genGrid={}))})(this,function(t){"use strict";function e({headers:i,rows:l,className:o,id:d}){const a=d?` id="${d}"`:"",r=o?` class="${o}"`:"",s=i.map(n=>`<th>${n}</th>`).join(""),f=l.map(n=>`<tr>${n.map(b=>`<td>${b}</td>`).join("")}</tr>`).join("");return`
    <table${a}${r}>
      <thead><tr>${s}</tr></thead>
      <tbody>${f}</tbody>
    </table>
  `.trim()}t.generateHtmlTable=e,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
