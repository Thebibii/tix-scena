export interface Concert {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  genre: string;
  price: {
    regular: number;
    vip: number;
    festival?: number;
  };
  description: string;
  isFeatured?: boolean;
}

export interface CartItem {
  concertId: string;
  ticketType: "regular" | "vip" | "festival";
  quantity: number;
  price: number;
}

export const concerts: Concert[] = [
  {
    id: "1",
    title: "NOISE FESTIVAL 2024",
    artist: "Various Artists",
    date: "2024-03-15",
    time: "18:00",
    venue: "Istora Senayan",
    city: "Jakarta",
    image: "/concerts/noise-festival.jpg",
    genre: "Alternative",
    price: {
      regular: 350000,
      vip: 750000,
      festival: 1500000,
    },
    description:
      "Festival musik underground terbesar tahun ini. Menampilkan 20+ band indie dan alternative dari seluruh Indonesia.",
    isFeatured: true,
  },
  {
    id: "2",
    title: "BEDROOM POP NIGHT",
    artist: "Hindia, Niki, Pamungkas",
    date: "2024-03-22",
    time: "19:30",
    venue: "Tennis Indoor Senayan",
    city: "Jakarta",
    image: "/concerts/bedroom-pop.jpg",
    genre: "Indie Pop",
    price: {
      regular: 450000,
      vip: 950000,
    },
    description:
      "Malam yang intim dengan bintang-bintang bedroom pop Indonesia.",
  },
  {
    id: "3",
    title: "PUNK NOT DEAD",
    artist: "Superman Is Dead, Rocket Rockers",
    date: "2024-04-05",
    time: "20:00",
    venue: "Lapangan Parkir Timur GBK",
    city: "Jakarta",
    image: "/concerts/punk-night.jpg",
    genre: "Punk Rock",
    price: {
      regular: 250000,
      vip: 500000,
    },
    description: "Nostalgia era punk rock Indonesia. Mosh pit guaranteed.",
  },
  {
    id: "4",
    title: "JAZZ TIDAK UNTUK SEMUA",
    artist: "Monita Tahalea, Sandhy Sondoro",
    date: "2024-04-12",
    time: "19:00",
    venue: "The Kasablanka Hall",
    city: "Jakarta",
    image: "/concerts/jazz-night.jpg",
    genre: "Jazz",
    price: {
      regular: 550000,
      vip: 1200000,
    },
    description:
      "Eksplorasi jazz kontemporer Indonesia dalam suasana intimate.",
  },
  {
    id: "5",
    title: "SHOEGAZE DREAMS",
    artist: "Sigmun, Silampukau",
    date: "2024-04-20",
    time: "20:00",
    venue: "Rossi Musik",
    city: "Jakarta",
    image: "/concerts/shoegaze.jpg",
    genre: "Shoegaze",
    price: {
      regular: 200000,
      vip: 400000,
    },
    description: "Tenggelam dalam wall of sound dan reverb yang memabukkan.",
  },
  {
    id: "6",
    title: "ELECTRONIC WASTE",
    artist: "Bottlesmoker, Ragil Ginanjar",
    date: "2024-05-03",
    time: "21:00",
    venue: "Empirica Club",
    city: "Jakarta",
    image: "/concerts/electronic.jpg",
    genre: "Electronic",
    price: {
      regular: 300000,
      vip: 600000,
    },
    description: "Eksperimentasi elektronik dan glitch art dalam satu malam.",
  },
];

export const genres = [
  "All",
  "Alternative",
  "Indie Pop",
  "Punk Rock",
  "Jazz",
  "Shoegaze",
  "Electronic",
];
