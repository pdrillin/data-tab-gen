(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t["data-tab-gen"]={}))})(this,function(t){"use strict";function e({headers:s,rows:a,id:n="my-table",className:i="",filterMode:l="none"}){const c=`id="${n}"`,u=i?`class="${i}"`:"",d=s.map(o=>`<th>${o}</th>`).join(""),p=s.map((o,r)=>`<th><input type="text" data-col="${r}" onkeyup="filterMultiColumn('${n}')" placeholder="Filtrer..."></th>`).join(""),b=`
    <input type="text" onkeyup="filterGlobal('${n}', this.value)" placeholder="Filtrer globalement..." style="margin-bottom: 10px; width: 100%; padding: 4px;">
  `,f=l==="column"?`<tr>${p}</tr>`:"",m=l==="global"?b:"",y=a.map(o=>`<tr>${o.map(r=>`<td>${r}</td>`).join("")}</tr>`).join("");return`
    ${m}
    <table ${c} ${u}>
      <thead>
        <tr>${d}</tr>
        ${f}
      </thead>
      <tbody>${y}</tbody>
    </table>
    ${`
    ${l==="column"?`
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
      <\/script>
    `:""}
    
    ${l==="global"?`
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
      <\/script>
    `:""}
  `}
  `.trim()}t.generateHtmlTable=e,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
