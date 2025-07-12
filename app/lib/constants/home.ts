import { Calendar, Heart, Music, Users } from "lucide-react";

export interface IPlatformLink {
  name: string;
  url: string;
  logo: string;
  color: string; // Brand color for styling
  category: string; // Brand color for styling
}

// The Iron Roses band platform links
export const ironRosesPlatforms: IPlatformLink[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/4E39TiZAnl2g2uCpWI9L96",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg",
    color: "#1DB954",
    category: "streaming",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/the-iron-roses/1654902863",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/applemusic.svg",
    color: "#FA243C",
    category: "streaming",
  },
  {
    name: "Bandcamp",
    url: "https://theironroses.bandcamp.com/album/the-iron-roses",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bandcamp.svg",
    color: "#629AA0",
    category: "store",
  },
  {
    name: "Bandsintown",
    url: "https://www.bandsintown.com/a/15498963-the-iron-roses",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bandsintown.svg",
    color: "#00D4AA",
    category: "events",
  },
  {
    name: "YouTube",
    url: "https://music.youtube.com/channel/UCrgfyTO3wRoCI5_US5ONXWw",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
    color: "#FF0000",
    category: "streaming",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/theironroses/?hl=en",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    color: "#E4405F",
    category: "social",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/TheIronRoses",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
    color: "#1877F2",
    category: "social",
  },
];

export const categories = [
  { id: "all", name: "All", icon: Music },
  { id: "streaming", name: "Streaming", icon: Music },
  { id: "social", name: "Social", icon: Users },
  { id: "store", name: "Store", icon: Heart },
  { id: "events", name: "Events", icon: Calendar },
];

export const storeLinks = [
  { name: "US Store", url: "https://theironroses.bigcartel.com" },
  { name: "EU Store", url: "https://theironroses.bigcartel.com" },
];

export const contactLinks = [
  { name: "Manager", email: "manager@ironroses.com", role: "Management" },
  {
    name: "US Booking",
    email: "booking-us@ironroses.com",
    role: "US Booking Agent",
  },
  {
    name: "EU Booking",
    email: "booking-eu@ironroses.com",
    role: "EU Booking Agent",
  },
];

// Animation variants
export const fadeInUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: any = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const floatingAnimation: any = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const glowPulse: any = {
  scale: [1, 1.1, 1],
  opacity: [0.5, 0.8, 0.4],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const trackItemVariants: any = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const pulseVariants: any = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const floatingVariants: any = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const platformItemVariants: any = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    },
  },
};

export const glowVariants: any = {
  initial: { boxShadow: "0 0 0 rgba(236, 72, 153, 0)" },
  hover: {
    boxShadow:
      "0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.1)",
    transition: { duration: 0.3 },
  },
};
