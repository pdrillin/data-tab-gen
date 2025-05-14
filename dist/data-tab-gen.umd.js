(function(o,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(o=typeof globalThis<"u"?globalThis:o||self,n(o["data-tab-gen"]={}))})(this,function(o){"use strict";function n({headers:r,rows:b,id:s="my-table",className:e="",filterMode:t="none",resizable:i=!1}){const a=`id="${s}"`,c=e?`class="${e}"`:"",u=r.map(d=>`<th>${d}</th>`).join(""),l=r.map((d,m)=>`<th><input type="text" data-col="${m}" onkeyup="filterMultiColumn('${s}')" placeholder="Filtrer..."></th>`).join(""),p=`
    <input type="text" onkeyup="filterGlobal('${s}', this.value)" placeholder="Filtrer globalement..." style="margin-bottom: 10px; width: 100%; padding: 4px;">`,y=t==="column"?`<tr>${l}</tr>`:"",h=t==="global"?p:"",w=b.map(d=>`<tr>${d.map(m=>`<td>${m}</td>`).join("")}</tr>`).join(""),g=`
    ${t==="column"?`
      <script>
        function filterMultiColumn(tableId) {
          const table = document.getElementById(tableId);
          const filters = table.querySelectorAll("thead input");
          const rows = table.querySelectorAll("tbody tr");

          rows.forEach(row => {
            const cells = row.getElementsByTagName("td");
            let visible = true;

            filters.forEach((input) => {
              const filterValue = input.value.toLowerCase();
              const colIndex = parseInt(input.dataset.col);
              const cellText = cells[colIndex]?.textContent?.toLowerCase() || "";

              if (filterValue && !cellText.includes(filterValue)) {
                visible = false;
              }
            });

            row.style.display = visible ? "" : "none";
          });
        }
      <\/script>`:""}
    
    ${t==="global"?`
      <script>
        function filterGlobal(tableId, value) {
          const table = document.getElementById(tableId);
          const rows = table.querySelectorAll("tbody tr");
          const filter = value.toLowerCase();

          rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
          });
        }
      <\/script>`:""}
      
      ${i===!0?`
      <script>
        (${f.toString()})("${s}");
      <\/script>`:""}
    `;return`
    ${h}
    <table ${a} ${c}>
      <thead>
        <tr>${u}</tr>
        ${y}
      </thead>
      <tbody>${w}</tbody>
    </table>
    ${g}
  `.trim()}function f(r){document.getElementById(r).querySelectorAll("thead th").forEach(e=>{e.style.position="relative";const t=document.createElement("div");t.style.position="absolute",t.style.top="0",t.style.right="0",t.style.width="5px",t.style.cursor="col-resize",t.style.userSelect="none",t.style.height="100%";let i=0,a=0;t.addEventListener("mousedown",l=>{i=l.clientX,a=e.offsetWidth,document.addEventListener("mousemove",c),document.addEventListener("mouseup",u),l.preventDefault()});function c(l){const p=a+(l.clientX-i);e.style.width=p+"px"}function u(){document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",u)}e.appendChild(t)})}o.generateHtmlTable=n,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
