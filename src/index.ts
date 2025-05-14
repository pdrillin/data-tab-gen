// src/index.ts
import "./styles.scss"

export interface TableOptions {
    headers: string[];
    rows: string[][];
    id?: string;
    className?: string;
    filterMode?: "none" | "global" | "column"; // 👈 choix du mode de filtrage
    resizable?: boolean; // Option pour redimenssionner les colonnes
}

export function generateHtmlTable({
                                      headers,
                                      rows,
                                      id = "my-table",
                                      className = "",
                                      filterMode = "none",
                                      resizable = false
                                  }: TableOptions): string {
    const tableIdAttr = `id="${id}"`;
    const classAttr = className ? `class="${className}"` : "";

    const headerRow = headers.map(h => `<th>${h}</th>`).join("");

    // Ligne de filtres par colonne
    const filterInputsRow = headers.map((_, i) =>
        `<th><input type="text" data-col="${i}" onkeyup="filterMultiColumn('${id}')" placeholder="Filtrer..."></th>`
    ).join("");

    // Barre de filtre global
    const globalFilterInput = `
    <input type="text" onkeyup="filterGlobal('${id}', this.value)" placeholder="Filtrer globalement..." style="margin-bottom: 10px; width: 100%; padding: 4px;">`;

    const filterRowHtml = filterMode === "column" ? `<tr>${filterInputsRow}</tr>` : "";
    const globalFilterHtml = filterMode === "global" ? globalFilterInput : "";

    const bodyRows = rows.map(row =>
        `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`
    ).join("");

    // Scripts JS injectés si nécessaire
    const scripts = `
    ${filterMode === "column" ? `
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
      </script>` : ""}
    
    ${filterMode === "global" ? `
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
      </script>` : ""}
      
      ${resizable === true ? `
      <script>
        (${enableResizableColumns.toString()})("${id}");
      </script>` : ""}
    `;



    return `
    ${globalFilterHtml}
    <table ${tableIdAttr} ${classAttr}>
      <thead>
        <tr>${headerRow}</tr>
        ${filterRowHtml}
      </thead>
      <tbody>${bodyRows}</tbody>
    </table>
    ${scripts}
  `.trim();
}

function enableResizableColumns(tableId :string) {
    const table = document.getElementById(tableId);
    const thElements = table.querySelectorAll("thead th");

    thElements.forEach(th => {
        th.style.position = "relative";

        const grip = document.createElement("div");
        grip.style.position = "absolute";
        grip.style.top = "0";
        grip.style.right = "0";
        grip.style.width = "5px";
        grip.style.cursor = "col-resize";
        grip.style.userSelect = "none";
        grip.style.height = "100%";

        let startX = 0;
        let startWidth = 0;

        grip.addEventListener("mousedown", (e) => {
            startX = e.clientX;
            startWidth = th.offsetWidth;

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            e.preventDefault();
        });

        function onMouseMove(e :MouseEvent) {
            const newWidth = startWidth + (e.clientX - startX);
            th.style.width = newWidth + "px";
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        th.appendChild(grip);
    });
}