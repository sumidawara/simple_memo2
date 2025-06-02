'use client';

import React from 'react';
import { IMemoMeta } from '@/types/IMemoMeta';

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
    memometaArray: IMemoMeta[];
    currentId: string;
    onFileSelect: (file: string) => void;
    onDelete: (file: string) => void;
    onCreate: () => void;
};

export default function Sidebar({
    memometaArray,
    currentId,
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
                {memometaArray.map((memometa
                ) => {
                    const title = memometa.title;
                    const id = memometa._id;

                    return (
                        <ListItem key={id} disablePadding>
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <ListItemButton
                                    selected={currentId === id}
                                    onClick={() => onFileSelect(id)}
                                    sx={{ height: 48, px: 2 }}
                                >
                                    <ListItemText primary={title} />
                                </ListItemButton>

                                <IconButton
                                    aria-label="delete"
                                    onClick={() => onDelete(id)}
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
