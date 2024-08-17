import { supabase } from "./supabase";

export const canGetInfo = async (userId) => {
    const { error } = await supabase 
        .from('info')
        .select('*')
        .eq('user_id', userId)
    
    if (error) {
        return false;
    }
    return true;
}
export const getInfo = async (userId) => {
    const { data, error } = await supabase
        .from('info')
        .select('*')
        .eq('user_id', userId)
    
    if (error) {
        throw new Error('Error getting user info')
    }

    return data[0];
}