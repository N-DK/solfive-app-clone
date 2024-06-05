import { Artist } from '~/pages/Artist';
import { Home } from '~/pages/Home';
import { Library } from '~/pages/Library';
import { Player } from '~/pages/Player';
import { Playlist } from '~/pages/Playlist';
import { Search } from '~/pages/Search';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/explore', component: Home },
    { path: '/playlist', component: Playlist },
    { path: '/library', component: Library },
    { path: '/artist', component: Artist },
    { path: '/player', component: Player },
    { path: '/search', component: Search },
];

export const privateRoutes = [];
