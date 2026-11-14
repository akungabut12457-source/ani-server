const express = require('express');
const cors = require('cors');
const { getServerList, getStreamResource } = require('animbus');

const app = express();
app.use(cors());

// Ini endpoint yang nanti dipanggil sama app.js kamu
app.get('/stream', async (req, res) => {
  try {
    const slug = req.query.judul;
    if (!slug) return res.status(400).json({ error: "Judul/slug episode harus diisi" });

    // Ambil daftar server dari Samehadaku via animbus
    const servers = await getServerList(`/${slug}/`);
    
    // Ambil link streaming dari server pertama
    const streamUrl = await getStreamResource(servers[0]); 
    
    // Kirim balik ke app.js kamu
    res.json({ url: streamUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));