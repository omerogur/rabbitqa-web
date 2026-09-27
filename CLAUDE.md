# RabbitQA Website — Claude Code Guide

> **ROL**: Bu proje RabbitQA'nın **satış / pazarlama sitesi**. Amaç ziyaretçiyi demo talebine
> götürmek: büyük başlıklar, net mesaj, her iddianın yanında ürünün gerçek ekranı. Kod tarafında
> landing engineer, görsel tarafta marketing odaklı UI tasarımcısı gibi davran.

## Proje Kimliği

- Bağımsız **Vite 8 + React 19 + Tailwind CSS v4 + Framer Motion** SPA. Next.js, shadcn/ui, i18n,
  CMS (Keystatic Studio) **yok** — `rabbitqa-landing`'deki bu altyapılar burada geçerli değil.
- Tüm metinler İngilizce (TR sürümü yok).
- Yayın: **Vercel**, GitHub `main` branch'ine her push'ta otomatik deploy (bkz. `README.md`).
- Dev sunucusu: `npm run dev` (Vite). Build: `npm run build` → `dist/`.

## Kardeş Projeler

| Proje              | Ne                                                        | Konum                        |
| ------------------ | --------------------------------------------------------- | ---------------------------- |
| rabbit-qa          | Ana platform (ekran görüntülerinin alındığı uygulama)     | `~/Desktop/rabbit-qa` (:3000) |
| rabbitqa-landing   | Eski kurumsal site (rabbitqa.com) — metin/görsel kaynağı  | `~/Desktop/rabbitqa-landing` |
| rabbitqa-website   | Bu proje                                                  | `~/Desktop/rabbitqa-website` |

İçerik `rabbitqa-landing`'den birebir taşındı. Oradaki metin güncellenirse ilgili JSON'u buradan
elle güncelle — otomatik senkron yok.

## Marka Sistemi

- **Tema koyu** (`ink-*` zemin), vurgu **RabbitQA mavisi / moru** (`brand-*`, ana renk `#3120ff`).
  Token'lar `src/index.css` içindeki `@theme` bloğunda.
- **Fontlar:** Inter Tight (başlık, `font-display`), Inter (gövde), JetBrains Mono (kod/URL).
  Serif veya italik vurgu kullanma — "premium değil" diye reddedildi.
- Hazır sınıflar: `.container-x` (max 1440px), `.h-display`, `.text-gradient`, `.card-surface`,
  `.glass`, `.btn-primary`, `.btn-ghost`, `.eyebrow`, `.hairline`.
- `.text-gradient` başlıklarda g/y/p harflerinin kesilmemesi için alt padding taşır — kaldırma.
- İkonlar: `lucide-react`. Class birleştirme: `src/lib/cn.js`.

## Satış Sitesi İlkeleri

- **Her özellik metninin yanında görsel kanıt** olsun: gerçek ürün ekranı (`LiveScreen`) ya da
  landing'den gelen fotoğraf. Düz metin konsolu / uydurma mock-up kullanma.
- Mesaj akışı rabbitqa.com ile aynı: _Multi-Agentic AI Platform for Digital Product Quality_ →
  Capabilities → Agents (Business / Planning / Technical) → Modules → Industries → Proof → Contact.
- Her sayfa bir CTA ile biter (`FinalCta` / `LeadForm`). Modül sayfalarında (`/modules/:id`) tepede
  "Request demo" tekrarlanmaz.
- Header linkleri **detay sayfalarına** gider (`/capabilities`, `/agents/...`,
  `/industry-solutions/...`), ana sayfadaki özet bölümlerine değil.
- Başlıklar geniş kullanılsın; içeriği gereksiz daraltma (`container-x` genişliğini koru).
- Metin taşmasına karşı `min-w-0` + `truncate` / `line-clamp-*` kullan.

## Proje Yapısı

```
src/
  App.jsx               Router + ScrollManager (hash scroll)
  index.css             Tema token'ları ve ortak sınıflar
  components/
    LiveScreen.jsx      Sahne oynatıcı (tarayıcı çerçevesi, imleç, zoom, toast, bölüm sekmeleri)
    Hero, Capabilities, AgentsFlow, ModulesBand, Industries, Proof, Enterprise,
    Contact (LeadForm), Closing (FinalCta, Footer), Nav, PageHero, ModuleDetails, Markdown …
  pages/                Home, Modules/ModulePage, Capabilities, Agents, Industry, Pricing,
                        Company (about/news/partner/certifications/contact), Resources
  data/
    modules.js          AGENTS, MODULES, modül turları; contentById = landingContent.json
    scenes.js           Tüm LiveScreen sahneleri + akışlar (HERO_SCENES, *_FLOW)
    landingContent.json Modül detay metinleri (13 modül)
    landingPages.json   agents, solutions (industry), capabilities, hero metinleri
    companyPages.json   about, partner, certifications, contact, news, ctaForm
    resourcesContent.json posts (blog markdown), resources, blog, faq, compare
    featureIcons.js     Metin → ikon eşlemesi
public/
  shots/                Maskelenmiş ürün ekran görüntüleri (webp)
  landing/              rabbitqa-landing'den gelen görseller (logolar, sektör, blog, sertifika…)
raw/                    Ham çekimler + çekim script'leri — GIT'E GİRMEZ (maskesiz veri içerir)
vercel.json             SPA rewrite (derin linkler 404 vermesin)
```

## LiveScreen Sahneleri

Sahne: `{ id, chapter?, src, url, label, duration, camera[{t,x,y,s}], cursor[{t,x,y,click}],
exit{to,t,x,y}, scroll{src,x,y,w,h,ratio,keys[{t,p}]}, toasts[{from,to,title,body,tone}] }`

- Koordinatlar ekran görüntüsünün **yüzdesi** (1512×789 çerçeve), `t` sahne içinde 0 → 1.
- `exit` tıklaması **yalnızca** sıradaki sahnenin `id`'si `exit.to` ise oynar — imleç, bir sonraki
  karede açılmayan bir şeye asla tıklamaz. Tıklanan kart ile açılan ekran tutarlı olmalı.
- Aynı `chapter`'ı paylaşan ardışık sahneler oynatıcıda tek sekme olur (ör. MobileHub'da tüm live
  session tek sekme).
- `scroll`: uzun sayfalar için dikişli "tall" görsel; kaydırma `keys` ile yapılır.

## Ekran Görüntüsü Kuralları (ZORUNLU)

- Kaynak: yerel uygulama `http://localhost:3000` (Chrome). Dev sunucusunu kullanıcı yönetir —
  başlatma/durdurma.
- **Gerçek kişi, müşteri, şirket, banka adları ve e-postalar maskelenir** (ör. "Alex Morgan",
  "Acme Bank", "RideShare"). Türkçe içerik İngilizceye çevrilir. Anlamsız test verisi gerçekçi
  başlıklarla değiştirilir. Kimlik bilgisi, token, şifre hiçbir karede görünmez.
- Viewport 1512×789 (4 çeyrek zoom → `raw/grab.sh <ad>` ile `public/shots/<ad>.webp`).
- Cihaz çiftliği (MobileHub) oturumları iş bitince **End session** ile kapatılır; test cihazına
  izinsiz uygulama kurulmaz.
- Ham çekimler yalnızca `raw/` altında kalır ve yayına girmez.

## Performans

- Sitede video yok; tüm hareket WebP görsel + transform animasyonu. Ekranda olmayan oynatıcılar
  duraklar (`useInView`).
- Bilinen iyileştirme alanları: oynatıcılar mount'ta tüm sahne görsellerini önceden yüklüyor;
  ana JS paketi büyük (react-markdown) → sayfa bazlı lazy-load ile bölünebilir.

## Bilinen Eksikler

- `LeadForm` (Contact / Demo / Partner) hiçbir yere gönderim yapmıyor, sadece başarı mesajı
  gösteriyor — HubSpot / Formspree / Vercel function bağlanmalı.
- Diğer modüller için (SmartAPI, DataCrate, Healthcheck…) canlı tur yok; sadece metin + görsel.

## Çalışma Kuralları

- **Mevcut dosyayı düzenle**, `ComponentNew.jsx` gibi varyant dosya açma.
- Commit: conventional commits (`feat:`, `fix:`, `style:`, `chore:`), İngilizce, tek mantıksal
  değişiklik. Commit öncesi `npm run lint` ve `npm run build` temiz geçmeli.
- Kısa ve az yorum; sadece gerçekten kritik/karmaşık kodu açıkla.
