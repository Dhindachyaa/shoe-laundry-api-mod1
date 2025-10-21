import { supabase } from "../config/supabaseClient.js";

export const ItemModel = {
    async getAll(statusFilter) {
        let query = supabase.from("items").select("*");

        if (statusFilter) {
            query = query.eq("status", statusFilter);
        }

        const { data, error } = await query.order("tanggalMasuk", { ascending: false });
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from("items")
            .select("*")
            .eq("id", id)
            .limit(1) 
            .single(); 
        
        if (error && error.code !== 'PGRST116') throw error; 
        if (!data) throw new Error("Item not found");
        
        return data;
    },

    async create(payload) {
        const { nama, status, tanggalSelesai } = payload;
        
        const insertPayload = { nama };
        if (status) insertPayload.status = status;
        if (tanggalSelesai) insertPayload.tanggalSelesai = tanggalSelesai;
        
        const { data, error } = await supabase
            .from("items")
            .insert([insertPayload])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async update(id, payload) {
        if (payload.name) {
            payload.nama = payload.name;
            delete payload.name;
        }

        const { data, error } = await supabase
            .from("items")
            .update(payload)
            .eq("id", id) 
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    async remove(id) {
        const { error } = await supabase
            .from("items")
            .delete()
            .eq("id", id);
        
        if (error) throw error;
        return { message: "Item deleted successfully" };
    },
};