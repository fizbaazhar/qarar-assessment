import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectUnreadCount } from '../redux/notificationsSlice';
import bellIcon from '../assets/icons/notification-bell.svg';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Badge,
  Avatar,
  Box
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ChevronIcon
} from '@mui/icons-material';

const Header = ({ onLogout }) => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile);
  const unreadCount = useSelector(selectUnreadCount);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const avatarSrc = profile.avatar || null;
  const displayName = user?.name || user?.firstName || 'User';

  const isActive = (path) => location.pathname === path;

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Tasks', path: '/tasks', icon: <TaskIcon /> },
  ];

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' }, justifyContent: 'space-between' }}>
        {/* Left side - Logo */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            cursor: 'pointer',
            fontSize: { xs: '1.125rem', sm: '1.5rem' },
            fontWeight: 'bold',
            color: 'var(--color-primary)'
          }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </Typography>

        {/* Center - Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: isActive(item.path) ? 'var(--color-primary)' : '#6B7280',
                backgroundColor: isActive(item.path) ? 'var(--color-primary-10)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'var(--color-primary-10)',
                  color: 'var(--color-primary)'
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {/* Right side items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Notifications */}
          <IconButton
            onClick={() => navigate('/notifications')}
            sx={{
              color: isActive('/notifications') ? 'var(--color-primary)' : '#6B7280',
              transform: isActive('/notifications') ? 'scale(1.1)' : 'scale(1)',
              '&:hover': { transform: 'scale(1.1)' },
              p: { xs: 0.5, sm: 1 }
            }}
          >
            <Badge badgeContent={unreadCount} color="error" max={99}>
              <img src={bellIcon} alt="Notifications" style={{ width: '22px', height: '22px' }} />
            </Badge>
          </IconButton>

          {/* User Menu */}
          <Box ref={dropdownRef}>
            <IconButton
              onClick={() => setDropdownOpen(!dropdownOpen)}
              sx={{ 
                p: { xs: 0.5, sm: 1 },
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {avatarSrc ? (
                  <Avatar 
                    src={avatarSrc} 
                    sx={{ 
                      width: { xs: 30, sm: 38 }, 
                      height: { xs: 30, sm: 38 },
                      border: '2px solid var(--color-primary)'
                    }} 
                  />
                ) : (
                  <Avatar sx={{ 
                    width: { xs: 30, sm: 38 }, 
                    height: { xs: 30, sm: 38 },
                    border: '2px solid var(--color-primary)',
                    bgcolor: '#E5E7EB'
                  }}>
                    <PersonIcon sx={{ color: '#9CA3AF', fontSize: { xs: '1.125rem', sm: '1.625rem' } }} />
                  </Avatar>
                )}
                <ChevronIcon 
                  sx={{ 
                    ml: 0.5,
                    color: 'var(--color-primary)',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }} 
                />
              </Box>
            </IconButton>
            <Menu
              anchorEl={dropdownRef.current}
              open={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
              PaperProps={{
                sx: { 
                  mt: 1,
                  minWidth: { xs: '120px', sm: '160px' }
                }
              }}
            >
              <MenuItem 
                onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                <PersonIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                Profile
              </MenuItem>
              <MenuItem 
                onClick={() => { setDropdownOpen(false); onLogout(); }}
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                <LogoutIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              p: { xs: 0.5, sm: 1 }
            }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--color-primary)', fontWeight: 'bold' }}>
            Menu
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.path}
                button
                onClick={() => handleNavigation(item.path)}
                sx={{
                  backgroundColor: isActive(item.path) ? 'var(--color-primary-10)' : 'transparent',
                  color: isActive(item.path) ? 'var(--color-primary)' : '#374151',
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'var(--color-primary-10)',
                    color: 'var(--color-primary)'
                  }
                }}
              >
                <Box sx={{ mr: 2, color: 'inherit' }}>
                  {item.icon}
                </Box>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: isActive(item.path) ? 600 : 400
                    }
                  }}
                />
              </ListItem>
            ))}
            <ListItem 
              button
              onClick={() => handleNavigation('/profile')}
              sx={{
                backgroundColor: isActive('/profile') ? 'var(--color-primary-10)' : 'transparent',
                color: isActive('/profile') ? 'var(--color-primary)' : '#374151',
                borderRadius: 1,
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'var(--color-primary-10)',
                  color: 'var(--color-primary)'
                }
              }}
            >
              <Box sx={{ mr: 2, color: 'inherit' }}>
                <PersonIcon />
              </Box>
              <ListItemText 
                primary="Profile" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: isActive('/profile') ? 600 : 400
                  }
                }}
              />
            </ListItem>
            <ListItem 
              button
              onClick={() => { handleMobileMenuClose(); onLogout(); }}
              sx={{
                color: '#EF4444',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#DC2626'
                }
              }}
            >
              <Box sx={{ mr: 2, color: 'inherit' }}>
                <LogoutIcon />
              </Box>
              <ListItemText 
                primary="Logout" 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: 400
                  }
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header; 