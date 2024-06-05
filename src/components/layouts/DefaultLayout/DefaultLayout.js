import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useStore } from '~/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '~/components/Modal';

const cx = classNames.bind(styles);

export const ModalContext = createContext();

function DefaultLayout({ children }) {
    const [state, dispatch] = useStore();
    const { currentSong } = state;
    // True is Open, False is close
    const [sidebarState, setSidebarState] = useState(true);
    const [open, setOpen] = useState(false);

    const show = () => setOpen(true);

    const handleChangeWidthSidebar = () => {
        setSidebarState((prev) => !prev);
    };

    return (
        <ModalContext.Provider value={show}>
            <div className={`${cx('wrapper')} flex min-h-screen`}>
                <Sidebar sidebarState={sidebarState} />
                <div
                    className={`${cx('main')} pl-48 pt-3 pr-48 flex-1 ${
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
                {currentSong && <Footer />}
                <div
                    className={`${cx(
                        '',
                    )} fixed top-1 left-4 ml-1.5 z-40 p-2 flex items-center`}
                >
                    <button
                        onClick={handleChangeWidthSidebar}
                        className={`${cx('text-white')} border-0 text-xl`}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <Link to={'/'}>
                        <div className="flex justify-center items-center text-white ml-5">
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
            </div>
        </ModalContext.Provider>
    );
}

export default DefaultLayout;
