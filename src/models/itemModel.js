import { supabase } from "../config/supabaseClient.js";

export const ItemModel = {
    // READ (All Items with Optional Status Filter)
    async getAll(statusFilter) {
        let query = supabase.from("items").select("*");

        if (statusFilter) {
            query = query.eq("status", statusFilter);
        }

        // Mengurutkan berdasarkan tanggalMasuk (diubah dari received_at)
        const { data, error } = await query.order("tanggalMasuk", { ascending: false });
        if (error) throw error;
        return data;
    },

    // READ (Item by ID)
    async getById(id) {
        const { data, error } = await supabase
            .from("items")
            .select("*")
            .eq("id", id)
            // Penting: Supabase akan mengembalikan array jika PK-nya serial, 
            // kita harus memastikan hanya ada satu hasil.
            .limit(1) 
            .single(); 
        
        if (error && error.code !== 'PGRST116') throw error; 
        if (!data) throw new Error("Item not found");
        
        return data;
    },

    // CREATE
    async create(payload) {
        // payload sekarang harus berisi 'nama', bukan 'name' atau 'customer_name'
        // Kolom id akan diisi otomatis oleh SERIAL.
        // Kolom status, tanggalMasuk, created_at punya nilai default.
        
        // Hapus payload yang tidak sesuai skema (jika ada)
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

    // UPDATE
    async update(id, payload) {
        // Ubah payload: jika ada 'name', ubah ke 'nama'
        if (payload.name) {
            payload.nama = payload.name;
            delete payload.name;
        }

        const { data, error } = await supabase
            .from("items")
            .update(payload)
            // Catatan: Karena ID Anda adalah SERIAL, ini masih bisa berfungsi, 
            // tetapi pastikan ID yang dikirim adalah integer.
            .eq("id", id) 
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    // DELETE
    async remove(id) {
        const { error } = await supabase
            .from("items")
            .delete()
            .eq("id", id);
        
        if (error) throw error;
        return { message: "Item deleted successfully" };
    },
};