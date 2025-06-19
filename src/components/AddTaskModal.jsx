import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Button from './Button';
import { showToast } from '../utils/toaster';

const AddTaskModal = ({ open, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskTitle.trim()) {
      setError('Please enter a task title');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      completed: false,
    };

    onAddTask(newTask);
    showToast({
      type: 'SUCCESS',
      message: 'Task added successfully'
    });
    setTaskTitle('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setTaskTitle('');
    setError('');
    onClose();
  };

  const handleChange = (e) => {
    setTaskTitle(e.target.value);
    if (error) setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: { xs: 'auto', sm: '300px' }
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
          Add New Task
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ 
            color: '#6B7280',
            '&:hover': { color: '#374151' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 2 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              autoFocus
              fullWidth
              label="Task Title"
              placeholder="Enter task title..."
              value={taskTitle}
              onChange={handleChange}
              error={!!error}
              helperText={error}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                },
                '& .MuiFormHelperText-root': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
            />
          </Box>
          
          <Typography variant="body2" sx={{ 
            color: '#6B7280',
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}>
            Tip: Keep your task titles clear and specific for better organization.
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
          >
            Add Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTaskModal; 