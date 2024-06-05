import { Link, useNavigate } from 'react-router-dom';
import styles from './SongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faEllipsisVertical,
    faPause,
    faPlay,
    faPlusCircle,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHeart,
    faPlayCircle,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import { useStore } from '~/store/hooks';
import { getPlaylistById, getSoundSongById } from '~/service';
import { useContext, useState } from 'react';
import { pauseSong, playSong } from '~/store/actions';
import { convertSecondsToMMSS } from '~/utils';
import { useQuery } from '~/hooks';
import { MenuDetails } from '../MenuDetails';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { ModalContext } from '../layouts/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function SongItem({ data, size = 'large', playListId }) {
    const isLarge = size === 'large';
    const navigator = useNavigate();
    const [state, dispatch] = useStore();
    const { isPlaying, currentAudio, currentSong } = state;
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const query = useQuery();
    const listId = query.get('listId');
    const openModal = useContext(ModalContext);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handlePlaySong = () => {
        const fetch = async () => {
            setLoading(true);
            if (window.location.pathname.includes('/player')) {
                navigator(
                    `/player?id=${data.encodeId}&listId=${
                        playListId ?? listId
                    }`,
                );
            }
            const res = await getSoundSongById(data.encodeId);
            const playlist = await getPlaylistById(playListId ?? listId);
            const songs = playlist?.data?.song?.items;
            const URL = res.data['128'];

            var audio = new Audio(URL);

            if (currentAudio) {
                if (data.encodeId === currentSong.encodeId) {
                    audio = currentAudio;
                } else {
                    currentAudio.pause();
                }
            }
            dispatch(
                playSong({
                    audio,
                    song: data,
                    playListId: playListId ?? listId,
                    playlist: songs,
                }),
            );
            audio.play();
            setLoading(false);
        };
        fetch();
    };

    const handlePauseSong = () => {
        dispatch(pauseSong(currentAudio));
        currentAudio.pause();
    };

    const handleDownload = (title) => {
        // setDownloading(true);
        console.log('Đang chuẩn bị file');
        const fetch = async () => {
            const res = await getSoundSongById(data?.encodeId);
            const url = res.data['128'];
            axios({
                url,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const blob = new Blob([response.data], { type: 'audio/mp3' });
                saveAs(blob, title + '.mp3');
                console.log('Đã hoàn tất');
                // setDownloading(false);
            });
        };

        fetch();
    };

    return (
        <div
            className={`${cx(
                'wrapper',
                `${
                    data.encodeId === state.currentSong?.encodeId
                        ? 'active'
                        : ''
                }`,
            )} text-white p-2`}
        >
            <div className={`${cx('container')} flex items-center`}>
                <div className={`${isLarge && 'flex-1'}`}>
                    <div className={`flex items-center `}>
                        <div className="w-10 h-10 rounded overflow-hidden mr-2 relative">
                            <img
                                className="w-full h-full object-cover"
                                src={data.thumbnail}
                            />
                            <button
                                onClick={
                                    isPlaying &&
                                    data.encodeId ===
                                        state.currentSong?.encodeId
                                        ? handlePauseSong
                                        : handlePlaySong
                                }
                                className={`${cx(
                                    'details',
                                    'btn_play',
                                )} absolute top-0 left-0 right-0 bottom-0 border-0`}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isPlaying &&
                                        data.encodeId ===
                                            state.currentSong?.encodeId
                                            ? faPause
                                            : faPlay
                                    }
                                />
                            </button>
                        </div>

                        {!isLarge ? (
                            <div>
                                <p className={`font-semibold`}>{data.title}</p>
                                <p className={`text--primary-color text-sm`}>
                                    {data?.artists?.map((artist, index) => (
                                        <Link
                                            to={`/artist?id=${artist.alias}`}
                                            key={index}
                                        >
                                            {artist.name ===
                                            data.artists[
                                                data.artists.length - 1
                                            ].name
                                                ? artist.name
                                                : `${artist.name}, `}
                                        </Link>
                                    ))}
                                </p>
                            </div>
                        ) : (
                            <p className={`font-semibold`}>{data.title}</p>
                        )}
                    </div>
                </div>
                <div className={`flex-1 relative`}>
                    <div
                        className={`flex items-center ${
                            isLarge ? 'justify-between' : 'justify-end'
                        } text--primary-color text-sm`}
                    >
                        {isLarge && (
                            <p className={`text--primary-color`}>
                                {data?.artists?.map((artist, index) => (
                                    <Link
                                        to={`/artist?id=${artist.alias}`}
                                        key={index}
                                    >
                                        {artist.name ===
                                        data.artists[data.artists.length - 1]
                                            .name
                                            ? artist.name
                                            : `${artist.name}, `}
                                    </Link>
                                ))}
                            </p>
                        )}
                        {size !== 'small' && (
                            <p>{convertSecondsToMMSS(data.duration)}</p>
                        )}
                        <div
                            className={`${cx(
                                'details',
                            )} absolute right-0 flex items-center bg-black  ${
                                isLarge ? 'mr-12' : ''
                            }`}
                        >
                            <button
                                onClick={openModal}
                                className={`${cx(
                                    'btn',
                                )} flex items-center justify-center text-white text-xl w-10 h-10 text--primary-color rounded-full mr-2`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <MenuDetails
                                visible={visible}
                                hide={hide}
                                items={[
                                    {
                                        title: 'Bắt đầu phát nhạc',
                                        icon: faPlayCircle,
                                        handle: handlePlaySong,
                                    },
                                    {
                                        title: 'Thêm vào danh sách phát',
                                        icon: faPlusCircle,
                                        handle: openModal,
                                    },
                                    {
                                        title: 'Chuyển đến trang nghệ sĩ',
                                        icon: faUser,
                                        handle: () => {
                                            navigator(
                                                `/artist?id=${data?.artists[0].alias}`,
                                            );
                                        },
                                    },
                                    {
                                        title: 'Tải nhạc',
                                        icon: faDownload,
                                        handle: () =>
                                            handleDownload(
                                                `Solfive - ${data.title}`,
                                            ),
                                    },
                                    {
                                        title: 'Chia sẻ',
                                        icon: faShare,
                                        handle: () => {},
                                    },
                                ]}
                            >
                                <button
                                    onClick={visible ? hide : show}
                                    className={`${cx(
                                        'btn',
                                    )} justify-center text-white text-xl flex items-center w-10 h-10 text--primary-color rounded-full`}
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                    />
                                </button>
                            </MenuDetails>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
