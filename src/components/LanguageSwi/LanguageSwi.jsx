import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { IconButton, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import '../../i18n/i18n';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'esp', name: 'Español' },
    { code: 'ita', name: 'Italiano' },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    handleClose(); // Close the menu after language selection
  };

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      <div style={{ position: 'fixed', right: 20, top: 20 }}>
        {/* Circular Icon Button with even smaller size */}
        <IconButton
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: '50%',
            padding: 1, // Reduced padding for a smaller button
            '&:hover': {
              backgroundColor: '#e8eaf6',
            },
          }}
        >
          <Languages size={25} /> {/* Smaller icon */}
        </IconButton>

        {/* Language Menu with smaller items */}
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              selected={i18n.language === lang.code}
              sx={{
                padding: '4px 8px', // Reduced padding for a more compact menu item
                '&:hover': {
                  backgroundColor: '#e8eaf6',
                },
              }}
            >
              <ListItemIcon>
                <Languages size={14} /> {/* Smaller icon for each item */}
              </ListItemIcon>
              <Typography variant="body2" sx={{ fontSize: '12px' }}>{lang.name}</Typography> {/* Smaller font size */}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};
