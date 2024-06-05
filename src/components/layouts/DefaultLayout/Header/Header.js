import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import {
    faMagnifyingGlass,
    faSpinner,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import { DefaultContext } from '../DefaultLayout';
import { Link } from 'react-router-dom';
import { search } from '~/service';

const cx = classNames.bind(styles);

function Header() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const debouncedValue = useDebounce(searchText, 500);
    const searchContainerRef = useRef(null);
    const value = useContext(DefaultContext);

    const handleInputClick = () => {
        if (searchContainerRef) {
            searchContainerRef.current.style.background = '#000000';
            setShowSearchResults(true);
        }
    };

    const handleInputBlur = () => {
        if (searchContainerRef) {
            searchContainerRef.current.style.background = '#ffffff1a';
            setShowSearchResults(false);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setData();
            return;
        }

        const fetchAPI = async () => {
            setLoading(true);
            const res = await search(debouncedValue);
            setData(res?.data);
            setLoading(false);
            console.log(res?.data);
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
                        onFocus={handleInputClick}
                        onBlur={handleInputBlur}
                    />
                    {searchText.trim() !== '' && (
                        <button
                            onClick={() => setSearchText('')}
                            className={`${cx(
                                'btn_clear',
                            )} absolute top-1/2 -translate-y-1/2 right-1 rounded-full w-10 h-10`}
                        >
                            {loading ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="loading"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faXmark} />
                            )}
                        </button>
                    )}
                    {showSearchResults && data && (
                        <div
                            className={`${cx(
                                'results_container',
                            )} w-full max-h-96 bg-black absolute z-20 top-full left-0 text-white`}
                        >
                            <Link
                                to={`/search?q=${searchText}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowSearchResults(false)}
                                className={`${cx(
                                    'search__list-result',
                                    'border-none',
                                )} flex items-center p-3`}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <p className="ml-4">{searchText}</p>
                            </Link>
                            {data.counter.song > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-semibold text-sm ml-2 mb-2">
                                        Nghệ sỹ
                                    </h3>
                                    {data['artists']?.map((item, index) => (
                                        <Link
                                            key={index}
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                setShowSearchResults(false)
                                            }
                                            to={`/artist?id=${item.alias}`}
                                            className={`${cx(
                                                'search__list-result',
                                            )} flex items-center p-3`}
                                        >
                                            <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                                                <img
                                                    className="w-full"
                                                    src={item.thumbnailM}
                                                />
                                            </div>
                                            <p>{item.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {data.counter.artist > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-semibold text-sm ml-2 mb-2">
                                        Bài hát
                                    </h3>
                                    {data['songs']?.map((item, index) => (
                                        <Link
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                setShowSearchResults(false)
                                            }
                                            key={index}
                                            className={`${cx(
                                                'search__list-result',
                                            )} flex items-center p-3`}
                                        >
                                            <div className="w-10 h-10 rounded overflow-hidden mr-4">
                                                <img
                                                    className="w-full"
                                                    src={item.thumbnailM}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm truncate text-white">
                                                    {item.artistsNames}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {data.counter.playlist > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-semibold text-sm ml-2 mb-2">
                                        Danh sách phát
                                    </h3>
                                    {data['playlists']?.map((item, index) => (
                                        <Link
                                            to={`/playlist?id=${item.encodeId}`}
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                setShowSearchResults(false)
                                            }
                                            key={index}
                                            className={`${cx(
                                                'search__list-result',
                                            )} flex items-center p-3`}
                                        >
                                            <div className="w-10 h-10 rounded overflow-hidden mr-4">
                                                <img
                                                    className="w-full"
                                                    src={item.thumbnailM}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm truncate">
                                                    {item.artistsNames}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <button
                        onClick={value.openModal}
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
