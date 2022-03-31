import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'num', headerName: 'N°', width: 70 },
  {
    field: 'produit',
    headerName: 'Produit',
    width: 280,
    editable: false,
  },
  {
    field: 'prix unitaire',
    headerName: 'P.U.',
    width: 120,
    type: 'number',
    editable: true,
  },
  {
    field: 'quantite',
    headerName: 'Q.',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 't.v.a.',
    headerName: 'TVA',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'prix total',
    headerName: 'P.T',
    type: "number",
    sortable: false,
    width: 150,
    // valueGetter: (params) =>
    //   `${params.row.quantite * params.row.prix_unitaire}`,
  },
];

export default function TableProduits({data}) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        hideFooterPagination={true}
        disableSelectionOnClick
        localeText={{
            noRowsLabel: ""
        }}
      />
    </div>
  );
}

// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const TAX_RATE = 0.07;

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { desc, qty, unit, price };
// }

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),
// ];

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

// export default function SpanningTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="spanning table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" colSpan={3}>
//               Details
//             </TableCell>
//             <TableCell align="right">Price</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Desc</TableCell>
//             <TableCell align="right">Qty.</TableCell>
//             <TableCell align="right">Unit</TableCell>
//             <TableCell align="right">Sum</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.desc}>
//               <TableCell>{row.desc}</TableCell>
//               <TableCell align="right">{row.qty}</TableCell>
//               <TableCell align="right">{row.unit}</TableCell>
//               <TableCell align="right">{ccyFormat(row.price)}</TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell rowSpan={3} />
//             <TableCell colSpan={2}>Subtotal</TableCell>
//             <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell>Tax</TableCell>
//             <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
//             <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={2}>Total</TableCell>
//             <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


// import * as React from 'react';
// import { styled } from '@mui/system';
// import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

// const blue = {
//   200: '#A5D8FF',
//   400: '#3399FF',
// };

// const grey = {
//   50: '#F3F6F9',
//   100: '#E7EBF0',
//   200: '#E0E3E7',
//   300: '#CDD2D7',
//   400: '#B2BAC2',
//   500: '#A0AAB4',
//   600: '#6F7E8C',
//   700: '#3E5060',
//   800: '#2D3843',
//   900: '#1A2027',
// };

// const Root = styled('div')(
//   ({ theme }) => `
//   table {
//     font-family: IBM Plex Sans, sans-serif;
//     font-size: 0.875rem;
//     border-collapse: collapse;
//     width: 100%;
//   }

//   td,
//   th {
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     text-align: left;
//     padding: 6px;
//   }

//   th {
//     background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
//   }
//   `,
// );

// const CustomTablePagination = styled(TablePaginationUnstyled)(
//   ({ theme }) => `
//   & .MuiTablePaginationUnstyled-spacer {
//     display: none;
//   }
//   & .MuiTablePaginationUnstyled-toolbar {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;

//     @media (min-width: 768px) {
//       flex-direction: row;
//       align-items: center;
//     }
//   }
//   & .MuiTablePaginationUnstyled-selectLabel {
//     margin: 0;
//   }
//   & .MuiTablePaginationUnstyled-select {
//     padding: 2px;
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     border-radius: 50px;
//     background-color: transparent;
//     &:hover {
//       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//     }
//     &:focus {
//       outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
//     }
//   }
//   & .MuiTablePaginationUnstyled-displayedRows {
//     margin: 0;

//     @media (min-width: 768px) {
//       margin-left: auto;
//     }
//   }
//   & .MuiTablePaginationUnstyled-actions {
//     padding: 2px;
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     border-radius: 50px;
//     text-align: center;
//   }
//   & .MuiTablePaginationUnstyled-actions > button {
//     margin: 0 8px;
//     border: transparent;
//     border-radius: 2px;
//     background-color: transparent;
//     &:hover {
//       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//     }
//     &:focus {
//       outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
//     }
//   }
//   `,
// );

// export default function UnstyledTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Root sx={{ width: 500, maxWidth: '100%' }}>
//       <table aria-label="custom pagination table">
//         <thead>
//           <tr>
//             <th>Dessert</th>
//             <th>Calories</th>
//             <th>Fat</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(rowsPerPage > 0
//             ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             : rows
//           ).map((row) => (
//             <tr key={row.name}>
//               <td>{row.name}</td>
//               <td style={{ width: 120 }} align="right">
//                 {row.calories}
//               </td>
//               <td style={{ width: 120 }} align="right">
//                 {row.fat}
//               </td>
//             </tr>
//           ))}

//           {emptyRows > 0 && (
//             <tr style={{ height: 41 * emptyRows }}>
//               <td colSpan={3} />
//             </tr>
//           )}
//         </tbody>
//         <tfoot>
//           <tr>
//             <CustomTablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={3}
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               componentsProps={{
//                 select: {
//                   'aria-label': 'rows per page',
//                 },
//                 actions: {
//                   showFirstButton: true,
//                   showLastButton: true,
//                 },
//               }}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </tr>
//         </tfoot>
//       </table>
//     </Root>
//   );
// }