import { Routes, Route } from "react-router-dom";

import {
    Login,
    Home,
    Public,
    Personal,
    Album,
    Playlist,
    WeekRank,
    Search,
    SearchSongs,
    SearchAll,
    SearchArtist,
    SearchPlaylist,
    SearchVideo,
    ZingChart,
    Follow
} from "./pages/public";
import path from "./ultis/path";
import bgImage from '../src/assets/eiffel.png'

function App() {
    return (
        <>
            <div className="bg-[#282828] relative overflow-hidden">
                <img src={bgImage} alt="bg" className="absolute top-0 left-0" />
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route path={path.ZING_CHART} element={<ZingChart />} />
                        <Route path={path.FOLLOW} element={<Follow />} />
                        <Route
                            path={path.ALBUM__TITTLE__PLAYLISTID}
                            element={<Album />}
                        />
                        <Route
                            path={path.PLAYLIST_TITTLE__PLAYLISTID}
                            element={<Playlist />}
                        />
                        <Route
                            path={path.PLAYLIST_TITTLE__CHARTID}
                            element={<WeekRank />}
                        />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.SONG} element={<SearchSongs />} />
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.ARTIST} element={<SearchArtist />} />
                            <Route path={path.PLAYLIST} element={<SearchPlaylist />} />
                            <Route path={path.VIDEO} element={<SearchVideo />} />
                        </Route>

                        <Route path={path.START} element={<Home />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
