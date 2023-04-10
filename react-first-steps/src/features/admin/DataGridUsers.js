import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const MyCustomNoRowsOverlay = () => (
  <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
    No users for this project yet
  </Typography>
);

const fetcher = async () => {
  const response = await fetch('https://dummyjson.com/users')
  let data = await response.json();
  return data.users;
}

export default function DataGridUsers() {

  const { isLoading, error, data} = useQuery('usersData', fetcher, {refetchOnWindowFocus: false})

  if (error) {
    toast.error(error.message);
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={isLoading ? [] : data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: MyCustomNoRowsOverlay
        }}
      />
    </Box>
  );
}