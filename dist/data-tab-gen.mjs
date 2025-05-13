function m({ headers: o, rows: n, className: e, id: a }) {
  const r = a ? ` id="${a}"` : "", d = e ? ` class="${e}"` : "", l = o.map((t) => `<th>${t}</th>`).join(""), $ = n.map(
    (t) => `<tr>${t.map((b) => `<td>${b}</td>`).join("")}</tr>`
  ).join("");
  return `
    <table${r}${d}>
      <thead><tr>${l}</tr></thead>
      <tbody>${$}</tbody>
    </table>
  `.trim();
}
export {
  m as generateHtmlTable
};
