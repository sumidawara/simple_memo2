'use client';

import React from 'react';
import {
    Paper,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    IconButton,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type SidebarProps = {
    files: string[];
    currentFile: string;
    onFileSelect: (file: string) => void;
    onDelete: (file: string) => void;
    onCreate: () => void;
};

export default function Sidebar({
    files,
    currentFile,
    onFileSelect,
    onDelete,
    onCreate,
}: SidebarProps) {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '20%',
                minWidth: 200,
                height: '100vh',
                p: 2,
                bgcolor: 'background.sidebar',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                Simple Memo
            </Typography>

            <List>
                {files.map((file) => {
                    const fileNameWithoutExt = file.replace(/\.md$/, '');

                    return (
                        <ListItem key={file} disablePadding>
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <ListItemButton
                                    selected={currentFile === file}
                                    onClick={() => onFileSelect(file)}
                                    sx={{ height: 48, px: 2 }}
                                >
                                    <ListItemText primary={fileNameWithoutExt} />
                                </ListItemButton>

                                <IconButton
                                    aria-label="delete"
                                    onClick={() => onDelete(file)}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 4,
                                        zIndex: 1,
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </ListItem>
                    );
                })}

                <Box height={12} />

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={onCreate}
                        sx={{
                            height: 35,
                            px: 2,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            mx: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <AddIcon sx={{ color: 'white' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Paper>
    );
}
