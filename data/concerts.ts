export interface SocialMedia {
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bannerImage: string;
  socialMedia?: SocialMedia;
}

export interface Event {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  category: "music" | "exhibition" | "theater" | "festival" | "workshop";
  genre: string;
  price: {
    regular: number;
    vip: number;
    festival?: number;
  };
  description: string;
  terms?: string;
  isFeatured?: boolean;
  creator: Creator;
}

export interface CartItem {
  eventId: string;
  ticketType: "regular" | "vip" | "festival";
  quantity: number;
  price: number;
}

export const events: Event[] = [
  {
    id: "1",
    title: "NOISE FESTIVAL 2024",
    artist: "Various Artists",
    date: "2024-03-15",
    time: "18:00",
    venue: "Istora Senayan",
    city: "Jakarta",
    image: "https://picsum.photos/seed/1-festival-alternative/1600/900",
    category: "festival",
    genre: "Alternative",
    price: {
      regular: 350000,
      vip: 750000,
      festival: 1500000,
    },
    description:
      "Festival musik underground terbesar tahun ini. Menampilkan 20+ band indie dan alternative dari seluruh Indonesia. Nikmati pengalaman musik yang tak terlupakan dengan line-up artis terbaik dari berbagai genre.",
    terms:
      "1. Tiket yang sudah dibeli tidak dapat dikembalikan atau ditukar.\n2. Harap membawa identitas yang valid saat masuk venue.\n3. Dilarang membawa makanan dan minuman dari luar.\n4. Anak di bawah 12 tahun harus didampingi orang dewasa.\n5. Penyelenggara berhak menolak pengunjung yang tidak mematuhi aturan.",
    isFeatured: true,
    creator: {
      id: "c1",
      name: "Kolektif Noise",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Kolektif-Noise",
      bannerImage: "https://picsum.photos/seed/c1-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/kolektifnoise",
        twitter: "https://twitter.com/kolektifnoise",
        website: "https://kolektifnoise.com",
      },
    },
  },

  {
    id: "2",
    title: "BEDROOM POP NIGHT",
    artist: "Hindia, Niki, Pamungkas",
    date: "2024-03-22",
    time: "19:30",
    venue: "Tennis Indoor Senayan",
    city: "Jakarta",
    image: "https://picsum.photos/seed/2-music-indiepop/1600/900",
    category: "music",
    genre: "Indie Pop",
    price: {
      regular: 450000,
      vip: 950000,
    },
    description:
      "Malam yang intim dengan bintang-bintang bedroom pop Indonesia. Saksikan penampilan akustik dan storytelling dari para musisi favorit generasi ini.",
    terms:
      "1. Tiket yang sudah dibeli tidak dapat dikembalikan.\n2. Pintu dibuka 1 jam sebelum acara dimulai.\n3. Dress code: Smart casual.\n4. Dilarang merekam video selama pertunjukan.",
    creator: {
      id: "c2",
      name: "Soundwave ID",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Soundwave-ID",
      bannerImage: "https://picsum.photos/seed/c2-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/soundwaveid",
        website: "https://soundwave.id",
      },
    },
  },

  {
    id: "3",
    title: "PUNK NOT DEAD",
    artist: "Superman Is Dead, Rocket Rockers",
    date: "2024-04-05",
    time: "20:00",
    venue: "Lapangan Parkir Timur GBK",
    city: "Jakarta",
    image: "https://picsum.photos/seed/3-music-punkrock/1600/900",
    category: "music",
    genre: "Punk Rock",
    price: {
      regular: 250000,
      vip: 500000,
    },
    description:
      "Nostalgia era punk rock Indonesia. Mosh pit guaranteed. Bersiaplah untuk malam penuh energi dan semangat pemberontakan!",
    terms:
      "1. Tiket tidak dapat dikembalikan atau ditukar.\n2. Area mosh pit memiliki risiko tersendiri.\n3. Gunakan alas kaki yang nyaman.\n4. Tetap jaga keselamatan diri dan sesama.",
    creator: {
      id: "c3",
      name: "Rebel Sound",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rebel-Sound",
      bannerImage: "https://picsum.photos/seed/c3-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/rebelsound",
        twitter: "https://twitter.com/rebelsound_id",
      },
    },
  },

  {
    id: "4",
    title: "PAMERAN SENI RUPA: METAMORFOSIS",
    artist: "Heri Dono, Eko Nugroho",
    date: "2024-04-12",
    time: "10:00",
    venue: "Museum MACAN",
    city: "Jakarta",
    image: "https://picsum.photos/seed/4-exhibition-senirupa/1600/900",
    category: "exhibition",
    genre: "Seni Rupa",
    price: {
      regular: 150000,
      vip: 350000,
    },
    description:
      "Pameran seni kontemporer yang mengeksplorasi transformasi manusia dan alam dalam era digital. Menampilkan karya-karya terbaru dari seniman Indonesia terkemuka.",
    terms:
      "1. Dilarang menyentuh karya seni.\n2. Fotografi tanpa flash diperbolehkan.\n3. Tas besar harus dititipkan di loker.\n4. Anak di bawah 5 tahun gratis.",
    creator: {
      id: "c4",
      name: "Galeri Nusantara",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Galeri-Nusantara",
      bannerImage: "https://picsum.photos/seed/c4-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/galerinusantara",
        website: "https://galerinusantara.co.id",
      },
    },
  },

  {
    id: "5",
    title: "TEATER: BULAN DI ATAS KUBURAN",
    artist: "Teater Koma",
    date: "2024-04-20",
    time: "19:00",
    venue: "Graha Bhakti Budaya TIM",
    city: "Jakarta",
    image: "https://picsum.photos/seed/5-theater-drama/1600/900",
    category: "theater",
    genre: "Drama",
    price: {
      regular: 200000,
      vip: 500000,
    },
    description:
      "Adaptasi modern dari karya sastra klasik Indonesia dalam pertunjukan teater yang memukau. Sebuah kisah tentang cinta, pengorbanan, dan harapan.",
    terms:
      "1. Harap hadir 30 menit sebelum pertunjukan.\n2. Penonton yang terlambat akan ditempatkan saat jeda.\n3. Matikan ponsel selama pertunjukan.\n4. Durasi pertunjukan: 2 jam 30 menit dengan 1 kali istirahat.",
    creator: {
      id: "c5",
      name: "Teater Koma",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Teater-Koma",
      bannerImage: "https://picsum.photos/seed/c5-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/teaterkoma",
        website: "https://teaterkoma.org",
      },
    },
  },

  {
    id: "6",
    title: "ELECTRONIC WASTE",
    artist: "Bottlesmoker, Ragil Ginanjar",
    date: "2024-05-03",
    time: "21:00",
    venue: "Empirica Club",
    city: "Jakarta",
    image: "https://picsum.photos/seed/6-music-electronic/1600/900",
    category: "music",
    genre: "Electronic",
    price: {
      regular: 300000,
      vip: 600000,
    },
    description:
      "Eksperimentasi elektronik dan glitch art dalam satu malam. Pengalaman audiovisual yang akan menggetarkan seluruh indera.",
    terms:
      "1. Usia minimal 18 tahun.\n2. Wajib menunjukkan KTP saat masuk.\n3. Dress code: All black encouraged.\n4. Dilarang membawa kamera profesional.",
    creator: {
      id: "c6",
      name: "Synthetic Collective",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Synthetic-Collective",
      bannerImage: "https://picsum.photos/seed/c6-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/syntheticcollective",
        twitter: "https://twitter.com/synthetic_id",
      },
    },
  },

  {
    id: "7",
    title: "WORKSHOP FOTOGRAFI ANALOG",
    artist: "Komunitas Lomography ID",
    date: "2024-05-10",
    time: "14:00",
    venue: "Dia.Lo.Gue Artspace",
    city: "Jakarta",
    image: "https://picsum.photos/seed/7-workshop-film/1600/900",
    category: "workshop",
    genre: "Workshop",
    price: {
      regular: 500000,
      vip: 750000,
    },
    description:
      "Belajar fotografi film dari dasar hingga proses darkroom. Termasuk 1 roll film dan akses lab. Cocok untuk pemula maupun yang ingin refresh skill.",
    terms:
      "1. Peserta akan mendapat 1 roll film 35mm.\n2. Bawa kamera analog jika punya (tidak wajib).\n3. Workshop berlangsung selama 4 jam.\n4. Sertifikat akan diberikan di akhir workshop.",
    creator: {
      id: "c7",
      name: "Lomography ID",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Lomography-ID",
      bannerImage: "https://picsum.photos/seed/c7-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/lomographyid",
        website: "https://lomography.co.id",
      },
    },
  },

  {
    id: "8",
    title: "PAMERAN INSTALASI: RUANG DALAM",
    artist: "Joko Avianto",
    date: "2024-05-18",
    time: "11:00",
    venue: "Selasar Sunaryo Art Space",
    city: "Bandung",
    image: "https://picsum.photos/seed/8-exhibition-instalasi/1600/900",
    category: "exhibition",
    genre: "Instalasi",
    price: {
      regular: 100000,
      vip: 250000,
    },
    description:
      "Instalasi bambu monumental yang mengeksplorasi hubungan manusia dengan ruang dan alam. Sebuah meditasi visual tentang keberadaan kita di dunia.",
    terms:
      "1. Dilarang menyentuh instalasi.\n2. Fotografi diperbolehkan.\n3. Guided tour tersedia setiap jam 11:00 dan 15:00.\n4. Tersedia audio guide dalam Bahasa Indonesia dan Inggris.",
    creator: {
      id: "c8",
      name: "Selasar Sunaryo",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Selasar-Sunaryo",
      bannerImage: "https://picsum.photos/seed/c8-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/selasarsunaryo",
        website: "https://selasarsunaryo.com",
      },
    },
  },

  {
    id: "9",
    title: "INDIE VIBES FEST",
    artist: "Fourtwnty, Pamungkas, Reality Club",
    date: "2024-06-15",
    time: "18:30",
    venue: "Beach City International Stadium",
    city: "Jakarta",
    image: "https://picsum.photos/seed/9-music-indie/1600/900",
    category: "music",
    genre: "Indie",
    price: {
      regular: 300000,
      vip: 650000,
    },
    description:
      "Festival musik indie dengan suasana chill dan penuh ambience. Cocok untuk para penikmat musik santai dan estetik.",
    terms:
      "1. Tiket tidak dapat dikembalikan.\n2. Dilarang membawa makanan dan minuman dari luar.\n3. Datang lebih awal untuk mendapat spot terbaik.\n4. Jaga kebersihan area acara.",
    creator: {
      id: "c4",
      name: "Galeri Nusantara",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Galeri-Nusantara",
      bannerImage: "https://picsum.photos/seed/c4-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/galerinusantara",
        website: "https://galerinusantara.co.id",
      },
    },
  },

  {
    id: "10",
    title: "JAZZ NIGHT UNDER THE STARS",
    artist: "Barry Likumahuwa, Maliq & D'Essentials",
    date: "2024-07-22",
    time: "19:00",
    venue: "Pelataran Senayan Park",
    city: "Jakarta",
    image: "https://picsum.photos/seed/10-music-jazz/1600/900",
    category: "music",
    genre: "Jazz",
    price: {
      regular: 200000,
      vip: 450000,
    },
    description:
      "Malam penuh alunan jazz berkualitas dengan suasana outdoor yang romantis. Cocok untuk pasangan maupun pecinta musik klasik.",
    terms:
      "1. Acara berlangsung outdoor, siapkan perlengkapan sesuai cuaca.\n2. Tidak diperbolehkan merokok di area tertentu.\n3. Tiket bersifat non-refundable.\n4. Bawalah jaket atau selimut ringan.",
    creator: {
      id: "c5",
      name: "Teater Koma",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Teater-Koma",
      bannerImage: "https://picsum.photos/seed/c5-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/teaterkoma",
        website: "https://teaterkoma.org",
      },
    },
  },

  {
    id: "11",
    title: "K-POP DREAM STAGE",
    artist: "NewJeans, Stray Kids, IVE",
    date: "2024-09-10",
    time: "17:00",
    venue: "ICE BSD Hall 5–6",
    city: "Tangerang",
    image: "https://picsum.photos/seed/11-music-kpop/1600/900",
    category: "music",
    genre: "K-Pop",
    price: {
      regular: 750000,
      vip: 1500000,
    },
    description:
      "Sajian spektakuler dari grup K-Pop terpopuler. Full lighting, full energi, full fanservice!",
    terms:
      "1. Antrian masuk mengikuti nomor tiket.\n2. Fanlight resmi diperbolehkan.\n3. Dilarang membawa kamera profesional.\n4. Tiket tidak bisa ditukar jadwal.",
    creator: {
      id: "c6",
      name: "Synthetic Collective",
      avatar:
        "https://api.dicebear.com/7.x/notionists/svg?seed=Synthetic-Collective",
      bannerImage: "https://picsum.photos/seed/c6-banner/1600/600",
      socialMedia: {
        instagram: "https://instagram.com/syntheticcollective",
        twitter: "https://twitter.com/synthetic_id",
      },
    },
  },
];

export const categories = [
  { key: "all", label: "Semua" },
  { key: "music", label: "Musik" },
  { key: "festival", label: "Festival" },
  { key: "exhibition", label: "Pameran" },
  { key: "theater", label: "Teater" },
  { key: "workshop", label: "Workshop" },
];

export const genres = [
  "All",
  "Alternative",
  "Indie Pop",
  "Punk Rock",
  "Seni Rupa",
  "Drama",
  "Electronic",
  "Workshop",
  "Instalasi",
];
