import React, {useState} from 'react'
import { useState } from 'react';

const userContext = React.createContext({
    user:null,
    jwt:null
});

export default userContext;