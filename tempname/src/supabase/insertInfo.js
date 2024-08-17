import { supabase } from "./supabase"

export const insertInfo = async (payload) => {
    const { data, error } = await supabase
        .from('info')
        .insert(payload)

    if (error) {
        console.log(error)
    }
    return data;
}