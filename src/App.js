import { toast, ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import { Login, Home, Public, Personal, Album, Playlist } from "./pages/public";
import path from "./ultis/path";

function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route
                            path={path.ALBUM__TITTLE__PLAYLISTID}
                            element={<Album />}
                        />
                        <Route
                            path={path.PLAYLIST_TITTLE__PLAYLISTID}
                            element={<Playlist />}
                        />

                        <Route path={path.START} element={<Home />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;