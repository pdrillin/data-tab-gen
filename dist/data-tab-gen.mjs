function w({
  headers: n,
  rows: p,
  id: o = "my-table",
  className: e = "",
  filterMode: t = "none",
  resizable: s = !1
}) {
  const r = `id="${o}"`, i = e ? `class="${e}"` : "", a = n.map((c) => `<th>${c}</th>`).join(""), l = n.map(
    (c, d) => `<th><input type="text" data-col="${d}" onkeyup="filterMultiColumn('${o}')" placeholder="Filtrer..."></th>`
  ).join(""), u = `
    <input type="text" onkeyup="filterGlobal('${o}', this.value)" placeholder="Filtrer globalement..." style="margin-bottom: 10px; width: 100%; padding: 4px;">`, m = t === "column" ? `<tr>${l}</tr>` : "", b = t === "global" ? u : "", y = p.map(
    (c) => `<tr>${c.map((d) => `<td>${d}</td>`).join("")}</tr>`
  ).join(""), f = `
    ${t === "column" ? `
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
      <\/script>` : ""}
    
    ${t === "global" ? `
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
      <\/script>` : ""}
      
      ${s === !0 ? `
      <script>
        (${h.toString()})("${o}");
      <\/script>` : ""}
    `;
  return `
    ${b}
    <table ${r} ${i}>
      <thead>
        <tr>${a}</tr>
        ${m}
      </thead>
      <tbody>${y}</tbody>
    </table>
    ${f}
  `.trim();
}
function h(n) {
  document.getElementById(n).querySelectorAll("thead th").forEach((e) => {
    e.style.position = "relative";
    const t = document.createElement("div");
    t.style.position = "absolute", t.style.top = "0", t.style.right = "0", t.style.width = "5px", t.style.cursor = "col-resize", t.style.userSelect = "none", t.style.height = "100%";
    let s = 0, r = 0;
    t.addEventListener("mousedown", (l) => {
      s = l.clientX, r = e.offsetWidth, document.addEventListener("mousemove", i), document.addEventListener("mouseup", a), l.preventDefault();
    });
    function i(l) {
      const u = r + (l.clientX - s);
      e.style.width = u + "px";
    }
    function a() {
      document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", a);
    }
    e.appendChild(t);
  });
}
export {
  w as generateHtmlTable
};
