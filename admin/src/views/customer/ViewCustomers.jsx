import React, { useEffect, useState, useMemo } from 'react';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  tableCellClasses,
  TablePagination
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers, updateCustomer, } from '../../redux/features/Customers/customerSlice';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Styled components
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

const ViewCustomers = () => {
  const dispatch = useDispatch();
  const { allCustomers, isCustomerLoading, isCustomerError } = useSelector((state) => state.Customer);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [filterText, setFilterText] = useState('');
  const [customers, setCustomers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    setCustomers(allCustomers);
  }, [allCustomers]);

  const filtered = useMemo(() => {
    const lower = filterText.toLowerCase();
    return customers.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.phoneNumber.toLowerCase().includes(lower)
    );
  }, [filterText, customers]);

  // Edit handlers
  const handleEditClick = (customer) => {
    setSelectedCustomer({ ...customer });
    setEditDialogOpen(true);
  };

  // const handleCloseEditDialog = () => {
  //   setEditDialogOpen(false);
  //   setSelectedCustomer(null);
  // };


  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);

    setSelectedCustomer(null);
    // Optional: return focus to a known button (e.g., the edit button)
    // Use a ref or document.activeElement.blur() to clear focus
    setTimeout(() => {
      document.activeElement.blur(); // clears focus from the icon button
    }, 0);
  };

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setSelectedCustomer(prev => ({ ...prev, [name]: value }));
  };






  const handleSaveEdit = async () => {
    try {
      const userData = {
        id: selectedCustomer._id,
        phoneNumber: selectedCustomer.phoneNumber,
        name: selectedCustomer.name
      };

      console.log("user data ", userData);

      // Await the result of the updateCustomer dispatch
      const result = await dispatch(updateCustomer(userData));

      // Check if the action was fulfilled successfully
      if (updateCustomer.fulfilled.match(result)) {
        // Refresh customers list
        await dispatch(getAllCustomers());

        // Close the dialog
        setEditDialogOpen(false);
      } else {
        console.error('Update failed:', result.payload || 'Unknown error');
      }

    } catch (error) {
      console.log("Error in submit:", error.message);
    }
  };


  const exportPDF = () => {

    const doc = new jsPDF();
    const tableColumn = ["SL", "Name", "Phone"];
    const tableRows = filtered.map((c, idx) => [idx + 1, c.name, c.phoneNumber]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows
    });
    doc.save('customers.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filtered.map((c, idx) => ({
        SL: idx + 1,
        Name: c.name,
        Phone: c.phoneNumber
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, 'customers.xlsx');
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <MainCard title="Customers">
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search Customers..."
            variant="outlined"
            fullWidth
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} textAlign="right">
          <Button variant="contained" onClick={exportExcel} sx={{ mr: 1 }}>
            Download Excel
          </Button>
          <Button variant="contained" onClick={exportPDF}>
            Download PDF
          </Button>
        </Grid>
      </Grid>

      <TableContainer sx={{ borderRadius: '10px' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>SL</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((c, idx) => (
                <StyledTableRow key={c.id || idx}>
                  <StyledTableCell>{page * rowsPerPage + idx + 1}</StyledTableCell>
                  <StyledTableCell>{c.name}</StyledTableCell>
                  <StyledTableCell>{c.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEditClick(c)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography textAlign="center">No customers found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[25, 50, 100]}
        />

      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Customer Name"
            name="name"
            fullWidth
            value={selectedCustomer?.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={selectedCustomer?.phoneNumber || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ViewCustomers;
