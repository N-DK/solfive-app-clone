import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useStore } from '~/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '~/components/Modal';
import { getLyricSongById } from '~/service';

const cx = classNames.bind(styles);

export const DefaultContext = createContext();

function DefaultLayout({ children, setProgress }) {
    const [state, dispatch] = useStore();
    const { currentSong, currentAudio, isPlaying } = state;
    const [openLyric, setOpenLyric] = useState(true);
    const [lyricLine, setLyricLine] = useState();
    // True is Open, False is close
    const [sidebarState, setSidebarState] = useState(true);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openPlayer, setOpenPlayer] = useState(false);

    const show = () => setOpen(true);

    const handleChangeWidthSidebar = () => {
        setSidebarState((prev) => !prev);
    };

    const getLyricLineFromArrayWords = (words) => {
        return words.map((word) => word.data).join(' ');
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await getLyricSongById(currentSong?.encodeId);
            if (currentAudio) {
                currentAudio.addEventListener('timeupdate', () => {
                    res?.data?.sentences?.forEach((sentence) => {
                        const active =
                            currentAudio.currentTime * 1000 >=
                                sentence?.words[0]?.startTime &&
                            currentAudio.currentTime * 1000 <=
                                sentence?.words[sentence?.words?.length - 1]
                                    ?.endTime;
                        if (active) {
                            setLyricLine(
                                getLyricLineFromArrayWords(sentence?.words),
                            );
                        }
                    });
                });
            }
        };

        fetch();
    }, [currentSong, currentAudio]);

    useEffect(() => {
        if (openPlayer && !window.location.pathname.includes('/player')) {
            setOpenPlayer(false);
        }
    }, [window.location.pathname]);

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
                                src="https://solfive.app.tranviet.site/static/logo.png"
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
                            <button
                                className={`${cx(
                                    '',
                                )} rounded bg-white flex items-center p-2`}
                            >
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    className="LgbsSe-Bz112c"
                                    width={20}
                                    height={20}
                                >
                                    <g>
                                        <path
                                            fill="#EA4335"
                                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                        ></path>
                                        <path
                                            fill="#4285F4"
                                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                        ></path>
                                        <path
                                            fill="#FBBC05"
                                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                        ></path>
                                        <path
                                            fill="#34A853"
                                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                        ></path>
                                        <path
                                            fill="none"
                                            d="M0 0h48v48H0z"
                                        ></path>
                                    </g>
                                </svg>
                                <span className="font-semibold text-sm ml-3">
                                    Đăng nhập bằng Google
                                </span>
                            </button>
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
