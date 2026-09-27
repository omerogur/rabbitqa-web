# RabbitQA Website — İçerik Güncelleme Rehberi (Pazarlama Ekibi)

Eski sitede (rabbitqa-landing) içerikler **Studio** panelinden düzenleniyordu. Bu sitede panel
yok: metinler ve görseller proje içindeki dosyalarda duruyor. Bir değişiklik GitHub'a gönderildiği
anda Vercel siteyi otomatik günceller.

> Kod yazmadan düzenlemek için en kolay yol: GitHub'da dosyayı aç → kalem (✏️ Edit) simgesi →
> değiştir → **Commit changes**. 1–2 dakika içinde canlıda görünür.

## 1. Hangi Metin Nerede?

| Sitedeki yer                                   | Dosya                                         |
| ---------------------------------------------- | --------------------------------------------- |
| Modül detay sayfaları (`/modules/...`)         | `src/data/landingContent.json`                |
| Modül adları, kısa açıklamalar, agent grupları | `src/data/modules.js`                         |
| Agent sayfaları (`/agents/...`)                | `src/data/landingPages.json` → `agents`       |
| Sektör sayfaları (`/industry-solutions/...`)   | `src/data/landingPages.json` → `solutions`    |
| Capabilities sayfası                           | `src/data/landingPages.json` → `capabilities` |
| About, Partner, Certifications, Contact, News  | `src/data/companyPages.json`                  |
| Blog yazıları, FAQ, Compare, Resources         | `src/data/resourcesContent.json`              |
| Ana sayfa hero başlığı                         | `src/components/Hero.jsx`                     |
| Header menüsü                                  | `src/components/Nav.jsx`                      |
| Footer                                         | `src/components/Closing.jsx`                  |
| Fiyatlandırma                                  | `src/pages/PricingPage.jsx`                   |
| Google'da görünen başlık / açıklama            | `index.html` (`<title>`, `description`)       |

## 2. JSON Dosyalarında Düzenleme Kuralları

- Sadece **tırnak içindeki metni** değiştir: `"title": "Buradaki yazı"`.
- Tırnak, virgül ve süslü parantezleri silme — dosya bozulursa build başarısız olur ve site
  **güncellenmez** (canlıdaki eski sürüm kalır, site çökmez).
- Metin içinde çift tırnak gerekiyorsa `\"` yaz ya da tipografik tırnak (“ ”) kullan.
- `id`, `urlSlug`, `slug` alanlarını değiştirme — sayfa adresleri bunlardan oluşur.

## 3. Blog Yazısı Ekleme

`src/data/resourcesContent.json` → `posts` listesine mevcut bir yazıyı kopyalayıp ekle:

- `id`: adres olur (`/blog/<id>`), küçük harf ve tire ile.
- `title`, `excerpt`, `category`, `author`, `date`, `readTime`
- `cover` / `thumb` / `banner`: görsel yolları (`/landing/blog/...`)
- `content`: yazının kendisi, **Markdown** formatında (`## Başlık`, `**kalın**`, listeler, tablolar).
- `featured: true` → blog sayfasında öne çıkar.

## 4. Görsel Değiştirme / Ekleme

- Görseller `public/` altında. Sitedeki yolu `/` ile başlar: `public/landing/blog/x.webp` →
  `/landing/blog/x.webp`.
- Aynı adla yeni dosya yüklersen eskisinin yerine geçer; yeni adla yüklersen JSON'daki yolu da
  güncelle.
- Tercihen **WebP**, genişlik en fazla ~2000px (sayfa hızı için).
- Müşteri logosu eklerken: dosyayı `public/landing/clients/` altına koy ve `src/components/Proof.jsx`
  içindeki logo listesine ekle.

## 5. Ürün Ekranları (Canlı Turlar)

Hareketli ürün ekranları `public/shots/` altındaki görsellerden oluşur ve `src/data/scenes.js`
ile yönetilir. Yeni tur veya ekran değişikliği **geliştirme ekibi** işidir — ekran görüntülerinde
gerçek müşteri/kişi verisi maskelenmek zorunda.

## 6. Yayınlama

1. Değişikliği GitHub'da `main` branch'ine commit'le (veya yerelde `git push`).
2. Vercel otomatik build alır → **Deployments** sekmesinden takip edebilirsin.
3. Başka bir branch'e gönderirsen canlıya gitmez, sana ayrı bir **önizleme linki** verilir —
   büyük değişiklikleri önce orada kontrol et.

## 7. Geri Alma

- Vercel → **Deployments** → önceki çalışan sürüm → **⋯ → Promote to Production**: anında eski
  sürüme döner.
- Kalıcı düzeltme için GitHub'da ilgili commit'i geri al (Revert).

## 8. Sorun Giderme

- **Değişiklik canlıda yok:** Vercel'de son deploy'un durumu **Error** mı? Hata çoğu zaman JSON'da
  eksik virgül/tırnaktır; deploy log'unda satır numarası yazar.
- **Sayfa bulunamadı (404):** Linki `/modules/autorunner` gibi site içi yol olarak yazdığından ve
  `id`/`slug`'ın doğru olduğundan emin ol.
- **Form gelmiyor:** İletişim/demo formları şu an bir yere gönderilmiyor (bkz. `CLAUDE.md` →
  Bilinen Eksikler).
