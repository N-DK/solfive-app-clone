import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import {
    faGlasses,
    faMagnifyingGlass,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={`${cx('wrapper')} w-full`}>
            <div
                className={`${cx(
                    'container',
                )} flex justify-between items-center w-full`}
            >
                <div
                    className={`${cx(
                        'search',
                    )} border rounded p-3 relative text-white bg-white-opacity-20`}
                >
                    <FontAwesomeIcon
                        className="absolute top-1/2 -translate-y-1/2"
                        icon={faMagnifyingGlass}
                    />
                    <input
                        className="border-0 bg-transparent outline-0 w-full pl-8 pr-8"
                        placeholder="Tìm bài hát, nghệ sỹ, danh sách phát"
                    />
                    <button className={`${cx('btn_clear')} absolute top-1/2 -translate-y-1/2 right-1 rounded-full w-10 h-10`}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div>
                    <button
                        className={`${cx(
                            'btn-login',
                        )} border text-white w-full p-3 rounded-sm`}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
