// src/index.ts
import "./styles.scss"
export interface TableOptions {
    headers: string[];
    rows: string[][];
    className?: string;
    id?: string;
}

export function generateHtmlTable({ headers, rows, className, id }: TableOptions): string {
    const tableId = id ? ` id="${id}"` : "";
    const tableClass = className ? ` class="${className}"` : "";

    const headerHtml = headers.map(header => `<th>${header}</th>`).join("");
    const bodyHtml = rows.map(row =>
        `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`
    ).join("");

    return `
    <table${tableId}${tableClass}>
      <thead><tr>${headerHtml}</tr></thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  `.trim();
}