import { supabase } from "./supabase";

export const updateInfo = async (payload, userId) => {
    const { error } = await supabase
        .from('info')
        .update(payload)
        .eq('user_id', userId);

    if (error) {
        console.log(error)
    }
}