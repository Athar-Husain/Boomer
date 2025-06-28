import React, { useState } from 'react';
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
  tableCellClasses
} from '@mui/material';
// import {  } from '@mui/material';

import { Edit, Visibility } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

// Styled TableCell and TableRow
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#365463',
    color: theme.palette.common.white,
    fontSize: 14,
    padding:'8px 16px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding:'5px 16px'
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

const ExpiredCoupons = () => {
  const [expiredCoupons, setExpiredCoupons] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      phoneNumber: '123-456-7890',
      couponCode: 'SAVE20',
      expiryDate: '2025-01-01'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
      couponCode: 'DISCOUNT15',
      expiryDate: '2024-12-31'
    },
    {
      id: 3,
      customerName: 'Michael Johnson',
      phoneNumber: '555-123-4567',
      couponCode: 'FREESHIP',
      expiryDate: '2023-11-30'
    }
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Handle Edit Click
  const handleEditClick = (coupon) => {
    setSelectedCoupon(coupon);
    setEditDialogOpen(true);
  };

  // Handle Dialog Close
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedCoupon(null);
  };

  // Handle Input Change in Edit Dialog
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedCoupon((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Save Edited Coupon
  const handleSaveEdit = () => {
    if (selectedCoupon) {
      // In a real-world scenario, you would send the updated data to the backend here.
      setExpiredCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === selectedCoupon.id ? selectedCoupon : coupon
        )
      );
      setEditDialogOpen(false);
    }
  };

  return (
    <MainCard title="Expired Coupons">
   
      <Box component="form" noValidate>
        <TableContainer style={{ marginTop: '20px', borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>Customer Name</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell>Expiry Date</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expiredCoupons.map((coupon, index) => (
                <StyledTableRow key={coupon.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{coupon.customerName}</StyledTableCell>
                  <StyledTableCell>{coupon.phoneNumber}</StyledTableCell>
                  <StyledTableCell>{coupon.couponCode}</StyledTableCell>
                  <StyledTableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title="View">
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditClick(coupon)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Coupon</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Customer Name"
            name="customerName"
            fullWidth
            value={selectedCoupon?.customerName || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            value={selectedCoupon?.phoneNumber || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Coupon Code"
            name="couponCode"
            fullWidth
            value={selectedCoupon?.couponCode || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Expiry Date"
            name="expiryDate"
            fullWidth
            value={selectedCoupon?.expiryDate || ''}
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
   </MainCard>
 
  );
};

export default ExpiredCoupons;
