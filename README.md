# RabbitQA — Pazarlama Sitesi

RabbitQA'nın satış / tanıtım sitesi. Bağımsız **Vite + React 19 + Tailwind CSS v4 + Framer Motion**
SPA; ürün turları gerçek uygulama ekranlarından (maskelenmiş) oluşturulan animasyonlardır, video
değildir.

## Kurulum

```bash
npm install
npm run dev       # geliştirme sunucusu (Vite)
npm run build     # production build → dist/
npm run preview   # build'i yerelde önizle
npm run lint      # oxlint
```

## Yayın (Vercel)

- GitHub reposu Vercel'e bağlı: `main` branch'ine her push **canlıya**, diğer branch'ler ve
  PR'lar **önizleme linkine** deploy edilir.
- Ayarlar: Framework **Vite**, Build `npm run build`, Output `dist`. Environment variable yok.
- `vercel.json` tüm yolları `index.html`'e yönlendirir; `/modules/autorunner` gibi derin linkler
  yenilendiğinde 404 vermez.
- Geri alma: Vercel → Deployments → önceki sürüm → **Promote to Production**.

## Yapı

```
src/components/   Sayfa bölümleri + LiveScreen (ürün turu oynatıcısı)
src/pages/        Rotalar: Home, Modules, Capabilities, Agents, Industry, Pricing, Company, Resources
src/data/         Tüm içerik (JSON + modules.js + scenes.js)
public/shots/     Maskelenmiş ürün ekran görüntüleri
public/landing/   Eski kurumsal siteden taşınan görseller
raw/              Ham çekimler ve çekim script'leri (git'e girmez)
```

## Dokümanlar

- [`CLAUDE.md`](CLAUDE.md) — geliştirme rehberi: marka, satış sitesi ilkeleri, sahne formatı,
  ekran görüntüsü / maskeleme kuralları, bilinen eksikler.
- [`docs/ICERIK_REHBERI.md`](docs/ICERIK_REHBERI.md) — pazarlama ekibi için: hangi metin hangi
  dosyada, blog yazısı ekleme, görsel değiştirme, yayınlama ve geri alma.

## Yeni ürün ekranı ekleme (özet)

1. Uygulamayı 1512×789 viewport'ta aç, gerçek kişi/müşteri adlarını maskele.
2. Chrome'da 4 çeyrek zoom çekimi al → `raw/grab.sh <ad>` → `public/shots/<ad>.webp`.
3. `src/data/scenes.js`'e sahne ekle ve ilgili akışa (`*_FLOW`) ya da modülün `scenes` dizisine bağla.
