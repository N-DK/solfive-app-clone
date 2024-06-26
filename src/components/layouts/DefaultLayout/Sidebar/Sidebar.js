import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { DefaultContext } from '../DefaultLayout';
import {
    ExploreIcon,
    HomeIcon,
    LibraryIcon,
    HomeIconActive,
    ExploreIconActive,
    LibraryIconActive,
} from '~/icon';

const cx = classNames.bind(styles);

const paths = [
    {
        path: '/',
        pageName: 'Trang chủ',
        icon: <HomeIcon />,
        iconActive: <HomeIconActive />,
    },
    {
        path: '/explore',
        pageName: 'Khám phá',
        icon: <ExploreIcon />,
        iconActive: <ExploreIconActive />,
    },
    {
        path: '/library',
        pageName: 'Thư viện',
        icon: <LibraryIcon />,
        iconActive: <LibraryIconActive />,
    },
];

function Sidebar({ sidebarState }) {
    const [path, setPath] = useState(window.location.pathname);
    const { openModal, dataUser } = useContext(DefaultContext);
    useEffect(() => {
        setPath(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <div
            className={`${cx(
                'wrapper',
            )} bg-black top-0 bottom-0 p-2 fixed left-0 z-50 ${
                !sidebarState
                    ? 'border-transparent bg-transparent w-20'
                    : `${cx('border-r')} w-60`
            }`}
        >
            <div className={`${cx('container')} pt-20`}>
                <div className={` pb-8 mb-4`}>
                    <ul>
                        {paths.map((route, index) => (
                            <li
                                key={index}
                                className={`${cx(
                                    'tab',
                                    `${path === route.path && 'active'}`,
                                )} text-white mb-1 font-semibold`}
                            >
                                <Link
                                    className={`${cx(
                                        '',
                                    )} text-white flex items-center ${
                                        sidebarState
                                            ? 'p-5 pt-3.5 pb-3.5'
                                            : 'flex flex-col justify-center items-center pt-3 pb-3'
                                    } rounded mb-1 block`}
                                    to={route.path}
                                >
                                    {path === route.path
                                        ? route.iconActive
                                        : route.icon}
                                    <span
                                        className={`${
                                            !sidebarState
                                                ? 'text-xs text-center pt-2'
                                                : 'ml-3'
                                        }`}
                                    >
                                        {route.pageName}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {sidebarState && (
                    <div>
                        <div className={`${cx('border-t')} p-4 pt-8`}>
                            {!dataUser && (
                                <>
                                    <button
                                        onClick={openModal}
                                        className={`${cx(
                                            'btn-login',
                                        )} border text-white w-full p-2.5 rounded-sm`}
                                    >
                                        Đăng nhập
                                    </button>
                                    <p
                                        className={`${cx(
                                            '',
                                        )} py-3 text-xs text--primary-color`}
                                    >
                                        Đăng nhập để tạo và chia sẻ danh sách
                                        phát, nhận các đề xuất được cá nhân hóa,
                                        v.v.
                                    </p>
                                </>
                            )}
                        </div>
                        {dataUser && (
                            <div
                                className={`${cx(
                                    'tab',
                                    `${
                                        window.location.pathname +
                                            window.location.search ===
                                            '/playlist?id=favorite' && 'active'
                                    }`,
                                )}`}
                            >
                                <Link
                                    to={'/playlist?id=favorite'}
                                    className={` rounded overflow-hidden text-white flex items-center pt-3 pb-3 p-2 justify-between -mt-4`}
                                >
                                    <p className="flex flex-col">
                                        <span className="text-sm font-semibold pb-1">
                                            Danh sách bạn yêu thích
                                        </span>
                                        <span className="text-xs">
                                            Danh sách tự động
                                        </span>
                                    </p>
                                    <FontAwesomeIcon icon={faThumbTack} />
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
