import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        setPath(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <div
            className={`${cx(
                'wrapper',
            )} bg-black top-0 bottom-0 w-60 p-2 fixed left-0`}
        >
            <div className={`${cx('container')} pt-14`}>
                <div className={`${cx('border-b')} pb-12 mb-4`}>
                    <ul>
                        <li
                            className={`${cx(
                                'tab',
                                `${path === '/' && 'active'}`,
                            )} text-white mb-1 font-semibold`}
                        >
                            <Link
                                className={`${cx(
                                    '',
                                )} text-white p-5 pt-3.5 pb-3.5 rounded mb-1 block`}
                                to={'/'}
                            >
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className={`mr-3`}
                                />
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li
                            className={`${cx(
                                'tab',
                                `${path === '/explore' && 'active'}`,
                            )} text-white mb-1 font-semibold`}
                        >
                            <Link
                                className={`${cx(
                                    '',
                                )} text-white p-5 pt-3.5 pb-3.5 rounded mb-1 block`}
                                to={'/explore'}
                            >
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className={`mr-3`}
                                />
                                <span>Khám phá</span>
                            </Link>
                        </li>
                        <li
                            className={`${cx(
                                'tab',
                                `${path === '/library' && 'active'}`,
                            )} text-white mb-1 font-semibold`}
                        >
                            <Link
                                className={`${cx(
                                    '',
                                )} text-white p-5 pt-3.5 pb-3.5 rounded mb-1 block`}
                                to={'/library'}
                            >
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className={`mr-3`}
                                />
                                <span>Thư viện</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={`${cx('')} p-4`}>
                    <button
                        className={`${cx(
                            'btn-login',
                        )} border text-white w-full p-2.5 rounded-sm`}
                    >
                        Đăng nhập
                    </button>
                    <p className={`${cx('')} py-3 text-xs text--primary-color`}>
                        Đăng nhập để tạo và chia sẻ danh sách phát, nhận các đề
                        xuất được cá nhân hóa, v.v.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
