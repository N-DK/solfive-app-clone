import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import {
    faGlasses,
    faMagnifyingGlass,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import { search } from '~/service/searchService';
import { Modal } from '~/components/Modal';
import { ModalContext } from '../DefaultLayout';

const cx = classNames.bind(styles);

function Header() {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchText, 500);
    const searchContainerRef = useRef(null);
    const show = useContext(ModalContext);

    const handleInputClick = () => {
        if (searchContainerRef) {
            searchContainerRef.current.style.background = '#000000';
        }
    };

    const handleInputBlur = () => {
        if (searchContainerRef) {
            searchContainerRef.current.style.background = '#ffffff1a';
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            // setSongs([]);
            return;
        }

        const fetchAPI = async () => {
            const res = await search(debouncedValue);
            console.log(res.data);
            // setSongs(data);
        };

        fetchAPI();
    }, [debouncedValue]);

    return (
        <div className={`${cx('wrapper')} w-full`}>
            <div
                className={`${cx(
                    'container',
                )} flex justify-between items-center w-full`}
            >
                <div
                    ref={searchContainerRef}
                    className={`${cx(
                        'search',
                    )} border rounded p-3 relative text-white bg-white-opacity-20`}
                >
                    <FontAwesomeIcon
                        className="absolute top-1/2 -translate-y-1/2"
                        icon={faMagnifyingGlass}
                    />
                    <input
                        value={searchText}
                        className="border-0 bg-transparent outline-0 w-full pl-8 pr-8"
                        placeholder="Tìm bài hát, nghệ sỹ, danh sách phát"
                        onChange={(e) => setSearchText(e.target.value)}
                        onClick={handleInputClick}
                        onBlur={handleInputBlur}
                    />
                    {searchText.trim() !== '' && (
                        <button
                            className={`${cx(
                                'btn_clear',
                            )} absolute top-1/2 -translate-y-1/2 right-1 rounded-full w-10 h-10`}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                </div>
                <div>
                    <button
                        onClick={show}
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
