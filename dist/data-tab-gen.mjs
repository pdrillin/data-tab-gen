function w({
  headers: n,
  rows: s,
  id: l = "my-table",
  className: r = "",
  filterMode: t = "none"
}) {
  const a = `id="${l}"`, c = r ? `class="${r}"` : "", i = n.map((e) => `<th>${e}</th>`).join(""), u = n.map(
    (e, o) => `<th><input type="text" data-col="${o}" onkeyup="filterMultiColumn('${l}')" placeholder="Filtrer..."></th>`
  ).join(""), p = `
    <input type="text" onkeyup="filterGlobal('${l}', this.value)" placeholder="Filtrer globalement..." style="margin-bottom: 10px; width: 100%; padding: 4px;">
  `, b = t === "column" ? `<tr>${u}</tr>` : "", d = t === "global" ? p : "", m = s.map(
    (e) => `<tr>${e.map((o) => `<td>${o}</td>`).join("")}</tr>`
  ).join("");
  return `
    ${d}
    <table ${a} ${c}>
      <thead>
        <tr>${i}</tr>
        ${b}
      </thead>
      <tbody>${m}</tbody>
    </table>
    ${`
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
      <\/script>
    ` : ""}
    
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
      <\/script>
    ` : ""}
  `}
  `.trim();
}
export {
  w as generateHtmlTable
};
