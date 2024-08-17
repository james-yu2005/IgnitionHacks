import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const SignUp = async () => {
    // validate email
    const validate_email = () => {

    }
    
    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }]);

    if (error) {
        setStatus(`Error: ${error.message}`);
    } else {
        setStatus('User added successfully!');
    }
    
    const handleSubmit = () => {

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder='Enter email'>
                </input>
            </form>
        </div>
    )
}