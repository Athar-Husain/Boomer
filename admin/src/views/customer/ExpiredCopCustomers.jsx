import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Pagination,
  MenuItem,
  Select,
  Table,
  // TableRow,
  TableBody,
  // StyledTableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableCell,
  tableCellClasses
} from '@mui/material';
import { Search } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomersWithNoCoupons } from 'redux/features/Customers/customerSlice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#365463',
    color: theme.palette.common.white,
    fontSize: 14,
    padding: '8px 16px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '5px 16px'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));





const ExpiredCopCustomers = () => {
  const dispatch = useDispatch();
  const { NoCouponsCustomers } = useSelector((state) => state.Customer);

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minExpiredCount, setMinExpiredCount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getCustomersWithNoCoupons());
  }, [dispatch]);

  useEffect(() => {
    let filtered = NoCouponsCustomers;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (c.phoneNumber && c.phoneNumber.includes(searchTerm))
      );
    }

    if (minExpiredCount > 0) {
      filtered = filtered.filter((c) => {
        if (!c.lastCouponExpiryDate) return false;

        const lastExpiry = new Date(c.lastCouponExpiryDate);
        const today = new Date();

        const diffInMs = today - lastExpiry;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        return diffInDays > minExpiredCount;
      });
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [NoCouponsCustomers, searchTerm, minExpiredCount]);

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  const getDaysSinceExpiry = (expiryDate) => {
    if (!expiryDate) return '—';
    const today = new Date();
    const expiredDate = new Date(expiryDate);
    const diff = Math.floor((today - expiredDate) / (1000 * 60 * 60 * 24));
    return `${diff} day${diff !== 1 ? 's' : ''} ago`;
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCustomers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expired Customers');
    XLSX.writeFile(workbook, 'Expired_Customers.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Expired Customers Report', 14, 10);
    const tableColumn = ['Name', 'Phone Number', 'Last Expiry Date'];
    const tableRows = [];

    filteredCustomers.forEach((customer) => {
      tableRows.push([
        customer.name || 'N/A',
        customer.phoneNumber,
        customer.lastCouponExpiryDate?.split('T')[0] || 'N/A'
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });
    doc.save('Expired_Customers.pdf');
  };

  return (


    <MainCard title="Expired Coupons">

      {/* 🔎 Filters */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            placeholder="Search by Name or Phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Min Days Since Last Expiry"
            value={minExpiredCount}
            onChange={(e) => setMinExpiredCount(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={5} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={handleExportExcel}>
            Export Excel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </Grid>
      </Grid>

      {/* 📊 Stats */}
      <Typography variant="body1" mb={1}>
        Total Expired Customers: {filteredCustomers.length}
      </Typography>

      {filteredCustomers.length === 0 ? (
        <Typography color="error" variant="h6">
          No Customers Found
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ mt: 2, borderRadius: '10px' }}>
            <Table>
              <TableHead style={{ backgroundColor: '#365463' }}>
                <TableRow>
                  <StyledTableCell >#</StyledTableCell>
                  <StyledTableCell >Name</StyledTableCell>
                  <StyledTableCell >Phone Number</StyledTableCell>
                  <StyledTableCell>Expired On</StyledTableCell>
                  <StyledTableCell >Days Since Expiry</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCustomers.map((customer, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{(currentPage - 1) * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell>{customer.name || 'N/A'}</StyledTableCell>
                    <StyledTableCell>{customer.phoneNumber}</StyledTableCell>
                    <StyledTableCell>
                      {customer.lastCouponExpiryDate
                        ? customer.lastCouponExpiryDate
                        : 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell>{getDaysSinceExpiry(customer.lastCouponExpiryDate)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 📄 Pagination */}
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography>Rows per page:</Typography>
            <Select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ marginRight: '1rem' }}
            >
              {[10, 25, 50, 100].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>

            <Pagination
              count={Math.ceil(filteredCustomers.length / rowsPerPage)}
              page={currentPage}
              onChange={(e, val) => setCurrentPage(val)}
              color="primary"
            />
          </Box>
        </>
      )}
    </MainCard>

  );
};

export default ExpiredCopCustomers;
