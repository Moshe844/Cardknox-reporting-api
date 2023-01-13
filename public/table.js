// eslint-disable-next-line no-unused-vars
function createTable(data) {
  const table = document.createElement("table");
  table.className = "reportTable";
  // createTable(data);

  // Add the headers to the table
  const headers = Object.keys(data[0]);
  const headerRow = table.insertRow();
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerHTML = header;
    headerRow.appendChild(th);
  });

  // Add the data to the table
  data.forEach((rowData) => {
    const row = table.insertRow();
    Object.values(rowData).forEach((value) => {
      const cell = row.insertCell();
      cell.innerHTML = value;
    });
  });

  // Append the table to the page
  document.getElementById("tableContainer").appendChild(table);
}
