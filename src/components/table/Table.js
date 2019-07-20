import React from 'react';

const Table = ({ config, colConfig, data }) => {
  const theadMarkup = (
    <tr>
      {colConfig.map((col, index) => (
        <th key={index}>{col.display}</th>
      ))}
    </tr>
  );

  const tbodyMarkup = data.map((row, index) => (
    <tr key={index}>
      {colConfig.map((col, index) => (
        <td key={index}>{row[col.id]}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>{theadMarkup}</thead>
      <tbody>{tbodyMarkup}</tbody>
    </table>
  );
};

export default Table;
