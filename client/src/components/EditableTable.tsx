import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Box, Pagination, FormControl, InputLabel, MenuItem, Select, TableSortLabel
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
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue === undefined || bValue === undefined) return 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      // fallback
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const paginated = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lp.</TableCell>
              {columns.map(col => (
                <TableCell key={col.key as string}>
                  <TableSortLabel
                    active={sortKey === col.key}
                    direction={sortKey === col.key ? sortDirection : 'asc'}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
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
                    {col.key === 'tenants' && Array.isArray((item as any).tenants) ? (
                      (() => {
                        const names = (item as any).tenants
                          .map((t: any) => t.name)
                          .sort((a: string, b: string) => a.localeCompare(b));
                        const namesStr = names.join(', ');
                        const maxLen = 100;
                        return (
                          <span title={namesStr} style={{
                            display: 'inline-block',
                            maxWidth: 200,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            verticalAlign: 'bottom'
                          }}>
                            {namesStr.length > maxLen ? namesStr.slice(0, maxLen) + '...' : namesStr}
                          </span>
                        );
                      })()
                    ) : (
                      <TextField
                        variant="standard"
                        type={col.type || 'text'}
                        value={String(item[col.key] ?? '')}
                        onChange={(e) => onChange(getId(item), col.key, col.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <FormControl size="small" sx={{ minWidth: 80, mt: 1 }}>
          <InputLabel sx={{ mt: -1 }}>Rows</InputLabel>
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