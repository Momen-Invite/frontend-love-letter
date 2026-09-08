# Momen Invite — Theme: Love Letter (`frontend-love-letter`)

Tema undangan digital interaktif kategori **Birthday & Romantic Celebration** untuk platform **Momen Invite**.

## 🌟 Fitur Tema
- **Hero Section**: Animasi floating particle, foto profil oval berbingkai dinamis, badge personal, dan pemutar musik latar (*background audio*).
- **Letter Section**: Amplop surat cinta interaktif dengan segel lilin (*wax seal*) yang dapat dibuka, dilengkapi foto polaroid kenangan.
- **Timeline Section**: Linimasa momen tak terlupakan dengan lightbox modal foto yang proporsional dan responsif.
- **Wishes Cards Section**: Kartu ucapan & doa dengan ikon interaktif.
- **Gallery Section**: Galeri foto dan video kenangan (14 foto + 1 video) dengan masonry layout, tab kategori, serta lightbox preview.
- **Quotes Carousel**: Slider kutipan kata-kata manis yang berpindah secara otomatis.
- **Final Section**: Bagian penutup berlatar sunset dengan tombol selebrasi konfeti dan kredit pembuat.

## 🚀 Arsitektur & Deployment
- **Framework**: Next.js 16 (App Router, React 19, Tailwind CSS v4, Lucide Icons)
- **Routing Subpath**: Pola URL `https://momeninvite.web.id/love-letter/:slug`
- **Next.js BasePath**: `basePath: "/love-letter"` di `next.config.ts`
- **Data Source**: Backend REST API `https://api.momeninvite.web.id/api/public/invitations/:slug`
- **Asset Storage & CDN**: Cloudflare R2 CDN `https://cdn.momeninvite.web.id/events/:slug/...`
- **Hosting**: Vercel (`https://love-letter-five-gamma.vercel.app`)

## 🛠️ Perintah Pengembangan
```bash
npm run dev         # Jalankan development server lokal (http://localhost:3000/love-letter)
npm run build       # Build bundle Next.js untuk produksi
npm run lint        # Cek kualitas kode dengan ESLint
npm run typecheck   # Validasi tipe TypeScript
npm run check       # Jalankan lint + typecheck + build sebelum push
```

## 🌿 Struktur Branch Git
- `master`: Branch pengembangan / staging
- `production`: Branch rilis produksi yang otomatis di-deploy oleh Vercel
