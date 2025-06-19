import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Button from './Button';
import { showToast } from '../utils/toaster';

const ConfirmDeleteModal = ({ open, onClose, onConfirm, taskTitle }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" sx={{ 
          fontSize: { xs: '1.125rem', sm: '1.25rem' },
          fontWeight: 600,
          color: 'var(--color-primary)'
        }}>
          Confirm Delete
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ 
            color: '#6B7280',
            '&:hover': { color: '#374151' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Typography variant="body1" sx={{ 
          color: '#4B5563',
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}>
          Are you sure you want to delete this task?
          <br />
          <span className="font-medium">"{taskTitle}"</span>
        </Typography>
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        pb: 3,
        gap: 2,
        '& .MuiButton-root': {
          flex: 1,
          minWidth: '120px'
        }
      }}>
        <Button
          variant="secondary"
          size="md"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          size="md"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
