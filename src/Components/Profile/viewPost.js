import React, { useState, useEffect } from 'react';
import { Card, IconButton, CardHeader,Menu,CardMedia,CardContent,MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../css/profile/post.css';
import axios from 'axios';

export default function ViewPost({values, elements}){


   
    return(
        <Card className="mb-5 text-start">
            <CardHeader
                title={values.firstName+" "+values.lastName}
                subheader={elements.createdAt.substring(0,10)}
            />
            <CardMedia
                className="px-3"
                component="img"
                id = "imagecard"
                image={elements.image}
                alt="Two puppies"
            />
            <CardContent>{elements.caption}</CardContent>
        </Card>

    );
}