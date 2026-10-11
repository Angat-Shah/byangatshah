export interface GameItem {
  id: string;
  title: string;
  platform: 'Console' | 'PSP' | 'PC' | 'Mobile';
  cover: string;
  tag?: string;
  isFavorite?: boolean;
}

export const GAMES_DATA: GameItem[] = [
  // Console (15)
  { id: 'spiderman', title: "Marvel's Spider-Man", platform: 'Console', cover: '/games/spiderman.webp' },
  { id: 'uncharted4', title: "Uncharted 4: A Thief's End", platform: 'Console', cover: '/games/uncharted4.webp' },
  { id: 'tasm', title: 'The Amazing Spider-Man', platform: 'Console', cover: '/games/tasm.webp' },
  { id: 'wwe2k16', title: 'WWE 2K16', platform: 'Console', cover: '/games/wwe2k16.webp' },
  { id: 'ac4', title: "Assassin's Creed IV: Black Flag", platform: 'Console', cover: '/games/ac4.webp' },
  { id: 'gta5', title: 'Grand Theft Auto V', platform: 'Console', cover: '/games/gta5.webp' },
  { id: 'nfs-payback', title: 'Need for Speed Payback', platform: 'Console', cover: '/games/nfs-payback.webp' },
  { id: 'gow3', title: 'God of War III Remastered', platform: 'Console', cover: '/games/gow3.webp' },
  { id: 'cod-mwr', title: 'Call of Duty: Modern Warfare Remastered', platform: 'Console', cover: '/games/cod-mwr.webp' },
  { id: 'tennis-world-tour', title: 'Tennis World Tour', platform: 'Console', cover: '/games/tennis-world-tour.webp' },
  { id: 'minecraft', title: 'Minecraft', platform: 'Console', cover: '/games/minecraft.webp' },
  { id: 'lego-batman3', title: 'LEGO Batman 3: Beyond Gotham', platform: 'Console', cover: '/games/lego-batman3.webp' },
  { id: 'batman-telltale', title: 'Batman: The Telltale Series', platform: 'Console', cover: '/games/batman-telltale.webp' },
  { id: 'hitman2', title: 'Hitman 2', platform: 'Console', cover: '/games/hitman2.webp' },
  { id: 'f1-24', title: 'F1 24', platform: 'Console', cover: '/games/f1-24.webp' },

  // PSP (3)
  { id: 'mk-psp', title: 'Mortal Kombat: Deception', platform: 'PSP', cover: '/games/mk-psp.webp' },
  { id: 'mgs-psp', title: 'Metal Gear Solid', platform: 'PSP', cover: '/games/mgs-psp.webp' },
  { id: 'ratchet-psp', title: 'Ratchet & Clank', platform: 'PSP', cover: '/games/ratchet-psp.webp' },

  // PC (8)
  { id: 'igi', title: 'Project I.G.I.', platform: 'PC', cover: '/games/igi.webp' },
  { id: 'nfs-mw', title: 'Need for Speed: Most Wanted', platform: 'PC', cover: '/games/nfs-mw.webp' },
  { id: 'csgo', title: 'Counter-Strike: Global Offensive', platform: 'PC', cover: '/games/csgo.webp' },
  { id: 'total-overdose', title: 'Total Overdose', platform: 'PC', cover: '/games/total-overdose.webp' },
  { id: 'among-us', title: 'Among Us', platform: 'PC', cover: '/games/among-us.webp' },
  { id: 'gta-vc', title: 'GTA: Vice City', platform: 'PC', cover: '/games/gta-vc.webp' },
  { id: 'ea-cricket', title: 'EA Sports Cricket', platform: 'PC', cover: '/games/ea-cricket.webp' },
  { id: 'freedom-fighters', title: 'Freedom Fighters', platform: 'PC', cover: '/games/freedom-fighters.webp' },

  // Mobile (3)
  {
    id: 'bgmi',
    title: 'PUBG / BGMI',
    platform: 'Mobile',
    cover: '/games/bgmi.webp',
    isFavorite: true,
    tag: '7 Years Active',
  },
  { id: 'codm', title: 'Call of Duty: Mobile', platform: 'Mobile', cover: '/games/codm.webp' },
  { id: 'free-fire', title: 'Free Fire', platform: 'Mobile', cover: '/games/free-fire.webp' },
];
