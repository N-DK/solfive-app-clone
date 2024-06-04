import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useStore } from '~/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [state, dispatch] = useStore();
    const { currentSong } = state;
    // True is Open, False is close
    const [sidebarState, setSidebarState] = useState(true);

    const handleChangeWidthSidebar = () => {
        setSidebarState((prev) => !prev);
    };

    return (
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
        </div>
    );
}

export default DefaultLayout;
