import { ItemModel } from "../models/itemModel.js";

export const ItemController = {
    async getAll(req, res) {
        try {
            const { status } = req.query; 
            const items = await ItemModel.getAll(status);
            res.json(items);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch items: " + err.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const item = await ItemModel.getById(id);
            res.json(item);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
    try {
        const { nama } = req.body;
        if (!nama) {
            return res.status(400).json({ error: "Kolom 'nama' sepatu wajib diisi." });
        }

        await ItemModel.create(req.body);
        res.status(201).json({ message: "Data sepatu berhasil ditambahkan." });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Gagal menambahkan data: " + err.message });
    }
},

    async update(req, res) {
    try {
        const { id } = req.params;
        await ItemModel.update(id, req.body);
        res.json({ message: "Status sepatu berhasil diperbarui." });
    } catch (err) {
        res.status(400).json({ error: "Gagal memperbarui data: " + err.message });
    }
},

    async remove(req, res) {
    try {
        const { id } = req.params;
        await ItemModel.remove(id);
        res.json({ message: "Data sepatu berhasil dihapus." });
    } catch (err) {
        res.status(400).json({ error: "Gagal menghapus data: " + err.message });
    }
  },
};