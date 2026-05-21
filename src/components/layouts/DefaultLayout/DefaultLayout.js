import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useStore } from '~/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { createContext, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from '~/components/Modal';
import { getLyricSongById, login } from '~/service';
import { Player } from '~/pages/Player';
import { HistoryContext } from '~/components/HistoryProvider';
import { GoogleLogin } from '@react-oauth/google';
import { getUser } from '~/service/userService';
const cx = classNames.bind(styles);

export const DefaultContext = createContext();
const getLyricLineFromArrayWords = (words) => {
    return words.map((word) => word.data).join(' ');
};

function DefaultLayout({ children, setProgress }) {
    const [state] = useStore();
    const { currentSong, currentAudio, isPlaying } = state;
    const [openLyric, setOpenLyric] = useState(true);
    const [lyricLine, setLyricLine] = useState();
    const [sidebarState, setSidebarState] = useState(true);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openPlayer, setOpenPlayer] = useState(false);
    const { previousPath } = useContext(HistoryContext);
    const [dataUser, setDateUser] = useState();
    const [token, setToken] = useState();
    const location = useLocation();
    const isPlayerPath = location.pathname.includes('/player');

    useEffect(() => {
        let canceled = false;

        const fetch = async () => {
            const res = await getUser();
            if (!canceled) setDateUser(res?.data);
        };

        fetch();

        return () => {
            canceled = true;
        };
    }, [token, location.pathname, location.search]);

    const show = () => setOpen(true);

    const handleChangeWidthSidebar = () => {
        setSidebarState((prev) => !prev);
    };

    useEffect(() => {
        if (
            !previousPath &&
            !openPlayer &&
            isPlayerPath
        ) {
            setOpenPlayer(true);
        }
    }, [previousPath, openPlayer, isPlayerPath]);

    useEffect(() => {
        document.body.style.overflow = openPlayer ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openPlayer]);

    useEffect(() => {
        if (!currentSong?.encodeId || !currentAudio) {
            setLyricLine();
            return;
        }

        let canceled = false;
        let removeListener = () => {};

        const fetch = async () => {
            const res = await getLyricSongById(currentSong?.encodeId);
            const sentences = res?.data?.sentences ?? [];
            if (canceled || sentences.length === 0) return;

            let lastLine = '';
            const handleTimeUpdate = () => {
                const currentTime = currentAudio.currentTime * 1000;
                const activeSentence = sentences.find((sentence) => {
                    const firstWord = sentence?.words?.[0];
                    const lastWord =
                        sentence?.words?.[sentence?.words?.length - 1];

                    return (
                        firstWord &&
                        lastWord &&
                        currentTime >= firstWord.startTime &&
                        currentTime <= lastWord.endTime
                    );
                });

                if (!activeSentence) return;

                const nextLine = getLyricLineFromArrayWords(
                    activeSentence.words,
                );
                if (nextLine !== lastLine) {
                    lastLine = nextLine;
                    setLyricLine(nextLine);
                }
            };

            currentAudio.addEventListener('timeupdate', handleTimeUpdate);
            handleTimeUpdate();
            removeListener = () =>
                currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
        };

        fetch();

        return () => {
            canceled = true;
            removeListener();
        };
    }, [currentSong?.encodeId, currentAudio]);

    useEffect(() => {
        if (openPlayer && !isPlayerPath) {
            setOpenPlayer(false);
        }
    }, [openPlayer, isPlayerPath]);

    useEffect(() => {
        if (currentSong && isPlaying) {
            window.document.title = currentSong?.title;
        } else {
            window.document.title = 'Solfive - NDK';
        }
    }, [currentSong, isPlaying]);

    return (
        <DefaultContext.Provider
            value={{
                openModal: show,
                loading,
                setLoading,
                setProgress,
                openPlayer,
                setOpenPlayer,
                sidebarState,
                setLyricLine,
                lyricLine,
                dataUser,
            }}
        >
            <div className={`${cx('wrapper')} flex min-h-screen`}>
                <Sidebar sidebarState={sidebarState} />
                <div
                    className={`${cx('main')} pl-48 pt-3 pr-48 flex-1 z-40 ${
                        sidebarState ? 'ml-60' : 'ml-20'
                    }`}
                >
                    <div
                        className={`${cx('container')} ${
                            sidebarState ? 'max-w-7xl' : 'max-w-8xl'
                        } w-full`}
                    >
                        <Header />
                        <div
                            style={{ marginTop: '69px' }}
                            className={`bg-black fixed right-0 flex justify-end pr-48 pl-48 top-0 z-500 pt-4 left-0 bottom-0 w-full ${
                                openPlayer ? 'openPlayer' : 'closePlayer'
                            }`}
                        >
                            {openPlayer && <Player />}
                        </div>
                        {children}
                    </div>
                </div>
                <div
                    className="absolute h-80 top-0 left-0 bg-no-repeat bg-cover right-0"
                    style={{
                        backgroundImage: `url('https://solfive.app.tranviet.site/static/images/body-bg.jpg')`,
                        boxShadow: 'rgb(33, 33, 33) 0px 0px 30px 15px inset',
                    }}
                ></div>
                <div className="absolute h-80 top-0 left-0 right-0 bg-gradient-to-b from-from-body-bg-gradiant to-to-body-bg-gradiant"></div>
                {openPlayer && (
                    <div className="fixed h-80 top-0 left-0 right-0 bg-black"></div>
                )}
                {currentSong && <Footer />}
                <div
                    className={`${cx(
                        '',
                    )} fixed top-2 left-4 ml-0 z-100 p-2 pl-1 flex items-center`}
                >
                    <button
                        onClick={handleChangeWidthSidebar}
                        className={`${cx(
                            'btn_hover',
                        )} border-0 text-xl text-white p-2 rounded-full w-10 h-10 flex items-center justify-center`}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <Link to={'/'}>
                        <div className="flex justify-center items-center text-white ml-2">
                            <img
                                alt="logo"
                                src="https://solfive.travis.io.vn/static/logo.png"
                                className="h-7 w-7"
                            />
                            <div className="text-2xl tracking-[-3px] font-bold ml-1">
                                Solfive
                            </div>
                        </div>
                    </Link>
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className={`${cx('modal-content')}`}>
                        <div className="p-3 pr-32 pl-4">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    const fetch = async () => {
                                        const res =
                                            await login(credentialResponse);
                                        localStorage.setItem(
                                            'token',
                                            `${res.data.token}`,
                                        );
                                        setToken(res.data.token);
                                        setOpen(false);
                                    };

                                    fetch();
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                        <div className="float-right p-2">
                            <button
                                className={`${cx(
                                    'close-modal',
                                )} border-0 text-white rounded p-2`}
                                onClick={() => setOpen(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </Modal>
                {lyricLine && (
                    <div
                        className={` ${cx('lyric_container')} ${
                            openLyric ? 'w-80' : 'w-11 rounded-full'
                        } transition-all fixed bottom-24 overflow-hidden rounded bg-primary h-11 right-7 z-1000 flex items-center pl-4 text-white`}
                    >
                        <p
                            className={`transition-all ${
                                openLyric ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {openLyric ? lyricLine : ''}
                        </p>
                        <button
                            onClick={() => setOpenLyric((prev) => !prev)}
                            className={`${cx(
                                'btn_hover',
                            )} transition-all absolute right-0 top-0 bottom-0 bg-primary w-11 h-11 rounded border-none`}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                    </div>
                )}
            </div>
        </DefaultContext.Provider>
    );
}

export default DefaultLayout;
