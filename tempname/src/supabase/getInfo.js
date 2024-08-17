import { supabase } from "./supabase";

export const getInfo = async (userId) => {
    const { data, error } = await supabase
        .from('info')
        .select('*')
        .eq('user_id', userId)
    
    if (error) {
        console.log(error)
        return null;
    }

    return data[0];
}