import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Box, Pagination, FormControl, InputLabel, MenuItem, Select
} from '@mui/material';

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'number' | 'date';
}

interface EditableTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  selected: T | null;
  onSelect: (item: T) => void;
  onChange: (id: number, key: keyof T, value: any) => void;
  rowsPerPage: number;
  setRowsPerPage: (val: number) => void;
  page: number;
  setPage: (val: number) => void;
  getId: (item: T) => number;
}

function EditableTable<T>({
  data, columns, selected, onSelect, onChange,
  rowsPerPage, setRowsPerPage, page, setPage, getId
}: EditableTableProps<T>) {
  const paginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lp.</TableCell>
              {columns.map(col => (
                <TableCell key={col.key as string}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((item, i) => (
              <TableRow
                key={getId(item)}
                hover
                selected={selected ? getId(selected) === getId(item) : false}
                onClick={() => onSelect(item)}
              >
                <TableCell>{(page - 1) * rowsPerPage + i + 1}</TableCell>
                {columns.map(col => (
                  <TableCell key={col.key as string}>
                    <TextField
                      variant="standard"
                      type={col.type || 'text'}
                      value={String(item[col.key] ?? '')}
                      onChange={(e) => onChange(getId(item), col.key, col.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <FormControl size="small">
          <InputLabel>Rows</InputLabel>
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 15].map(n => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Pagination count={Math.ceil(data.length / rowsPerPage)} page={page} onChange={(_, p) => setPage(p)} />
      </Box>
    </>
  );
}

export default EditableTable;
