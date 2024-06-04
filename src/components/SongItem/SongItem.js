import { Link, useNavigate } from 'react-router-dom';
import styles from './SongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faPause,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useStore } from '~/store/hooks';
import { getPlaylistById, getSoundSongById } from '~/service';
import { useState } from 'react';
import { pauseSong, playSong } from '~/store/actions';
import { convertSecondsToMMSS } from '~/utils';

const cx = classNames.bind(styles);

function SongItem({ data, size = 'large', playListId, playlist }) {
    const isLarge = size === 'large';
    const navigator = useNavigate();
    const [state, dispatch] = useStore();
    const { isPlaying, currentAudio } = state;
    const [loading, setLoading] = useState(false);

    const handlePlaySong = () => {
        const fetch = async () => {
            setLoading(true);
            if (window.location.pathname.includes('/player')) {
                navigator(`/player?id=${data.encodeId}&listId=${playListId}`);
            }
            const res = await getSoundSongById(data.encodeId);
            const playlist = await getPlaylistById(playListId);
            const songs = playlist?.data?.song?.items;
            const URL = res.data['128'];
            if (currentAudio) {
                currentAudio.pause();
            }

            var audio = new Audio(URL);
            dispatch(
                playSong({
                    audio,
                    song: data,
                    playListId,
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
                                            {artist.name ==
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
                                        {artist.name ==
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
                                className={`${cx(
                                    'btn',
                                )} flex items-center justify-center text-white text-xl w-10 h-10 text--primary-color rounded-full mr-2`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button
                                className={`${cx(
                                    'btn',
                                )} justify-center text-white text-xl flex items-center w-10 h-10 text--primary-color rounded-full`}
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
