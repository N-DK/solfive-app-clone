import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import {
    faBackwardStep,
    faCaretDown,
    faCaretUp,
    faDownload,
    faEllipsisV,
    faForwardStep,
    faPause,
    faPlay,
    faPlusCircle,
    faRepeat,
    faShare,
    faShuffle,
    faSpinner,
    faVolumeHigh,
    faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { useStore } from '~/store/hooks';
import { pauseSong, playSong, setPlaylist } from '~/store/actions';
import { getPlaylistById, getSoundSongById } from '~/service';
import { convertSecondsToMMSS, formatTime, shufflePlaylist } from '~/utils';
import {
    faHeart,
    faPlayCircle,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import { MenuDetails } from '~/components/MenuDetails';
import { DefaultContext } from '../DefaultLayout';
import axios from 'axios';
import { saveAs } from 'file-saver';

const cx = classNames.bind(styles);

const NEXT = 1;
const PREV = -1;

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, dispatch] = useStore();
    const { currentSong, playListId, isPlaying, currentAudio, playlist } =
        state;
    const [volume, setVolume] = useState(1);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(0);
    const [timeSong, setTimeSong] = useState();
    const [visible, setVisible] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const rangeRef = useRef(null);
    const volumeRef = useRef(null);
    const [backward, setBackward] = useState([]);
    const { openModal, loading, setLoading, openPlayer, setOpenPlayer } =
        useContext(DefaultContext);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const getIndexSongInPlaylist = (currentSong) => {
        return playlist?.findIndex((song) => {
            return song.encodeId === currentSong.encodeId;
        });
    };

    const handleNavigatorSong = (type) => {
        const handle = async () => {
            setLoading(true);
            const index = getIndexSongInPlaylist(currentSong);
            if (index + type >= 0 && index + type < playlist.length) {
                const song = playlist[index + type];
                if (window.location.pathname.includes('/player')) {
                    navigate(
                        `/player?id=${song?.encodeId}&listId=${playListId}`,
                    );
                }
                const res = await getSoundSongById(song?.encodeId);
                const URL = res?.data['128'];
                handlePause();
                var audio = new Audio(URL);
                dispatch(
                    playSong({
                        audio,
                        song,
                        playListId,
                        playlist,
                    }),
                );
                audio.play();
            }
            setLoading(false);
        };
        handle();
    };

    const handleDownload = (title) => {
        // setDownloading(true);
        console.log('Đang chuẩn bị file');
        const fetch = async () => {
            const res = await getSoundSongById(currentSong?.encodeId);
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

    const handlePlay = (e) => {
        e.stopPropagation();
        dispatch(
            playSong({
                audio: currentAudio,
                song: currentSong,
                playListId: playListId,
                playlist,
            }),
        );
        currentAudio.play();
    };

    const handlePause = () => {
        dispatch(pauseSong(currentAudio));
        currentAudio.pause();
    };

    const handleOpenPlayer = () => {
        if (!openPlayer) {
            if (!location.pathname.includes('/player')) {
                setBackward((prev) => [
                    ...prev,
                    location.pathname + location.search,
                ]);
            }
            navigate(`/player?id=${currentSong.encodeId}&listId=${playListId}`);
            setOpenPlayer(true);
        } else {
            setOpenPlayer(false);
            setTimeout(() => {
                navigate(backward[0] ?? '/');
                setBackward([]);
            }, 200);
        }
    };

    useEffect(() => {
        if (!backward[0] && location.pathname.includes('/player')) {
            handleOpenPlayer();
        }
    }, []);

    useEffect(() => {
        if (rangeRef && timeSong) {
            const valPercent =
                (rangeRef.current.value / rangeRef.current.max) * 100;
            rangeRef.current.style.background = `linear-gradient(to right, #67b9f9 ${valPercent}%, #515151 ${valPercent}%)`;
        }
    }, [timeSong]);

    useEffect(() => {
        if (volumeRef) {
            const valPercent =
                (volumeRef.current.value / volumeRef.current.max) * 100;
            volumeRef.current.style.background = `linear-gradient(to right, #67b9f9 ${valPercent}%, #515151 ${valPercent}%)`;
        }
    }, [currentAudio.volume]);

    useEffect(() => {
        if (currentSong) {
            currentAudio.volume = volume;
            currentAudio.addEventListener('timeupdate', () => {
                setTimeSong(currentAudio.currentTime);
            });
        }
    }, [currentSong, currentAudio]);

    useEffect(() => {
        const handleAudioEnd = () => {
            if (isRepeat) {
                currentAudio.play();
            } else {
                if (
                    currentSong.encodeId ===
                    playlist[playlist.length - 1].encodeId
                ) {
                    handlePause();
                } else {
                    handleNavigatorSong(NEXT);
                }
            }
        };

        if (currentSong) {
            currentAudio?.addEventListener('ended', handleAudioEnd);
            return () => {
                currentAudio.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, [isRepeat, currentAudio, currentSong]);

    useEffect(() => {
        if (isShuffle > 0) {
            const songsTemp = [...playlist];
            const playListShuffled = shufflePlaylist(songsTemp, currentSong);
            dispatch(setPlaylist(playListShuffled));
        }
    }, [isShuffle]);

    return (
        <div
            className="fixed bottom-0 left-0 right-0"
            onClick={handleOpenPlayer}
        >
            <div
                className={`${cx(
                    'wrapper',
                )} flex items-center justify-between pr-6 pl-6`}
            >
                {/* Controls */}
                <div className="flex items-center text-white">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigatorSong(PREV);
                        }}
                        className="text-2xl w-10 h-10 rounded-full"
                    >
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    <button
                        onClick={
                            !isPlaying
                                ? handlePlay
                                : (e) => {
                                      e.stopPropagation();
                                      handlePause();
                                  }
                        }
                        className="text-3xl w-14 h-14 mr-6 ml-6 rounded-full"
                    >
                        {loading ? (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="loading"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={isPlaying ? faPause : faPlay}
                            />
                        )}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigatorSong(NEXT);
                        }}
                        className="text-2xl w-10 h-10 rounded-full"
                    >
                        <FontAwesomeIcon icon={faForwardStep} />
                    </button>
                    <p className="ml-8 text-sm text--primary-color">
                        <span>{formatTime(timeSong) || '00:00'} / </span>
                        <span>
                            {convertSecondsToMMSS(currentSong.duration)}
                        </span>
                    </p>
                </div>
                {/* Song */}
                <div className={` flex items-center flex-1 justify-center`}>
                    <div className={`rounded overflow-hidden w-11 h-11 mr-3`}>
                        <img
                            className="w-full h-full"
                            src={currentSong.thumbnailM}
                        />
                    </div>
                    <div className="mr-4">
                        <p className="text-white text-base font-semibold pb-1">
                            {currentSong.title}
                        </p>
                        <p className="text--primary-color">
                            {currentSong.artistsNames}
                        </p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openModal();
                        }}
                        className="rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3"
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
                                handle: handlePlay,
                            },
                            {
                                title: 'Thêm vào danh sách phát',
                                icon: faPlusCircle,
                                handle: function (e) {
                                    e.stopPropagation();
                                    openModal();
                                },
                            },
                            {
                                title: 'Chuyển đến trang nghệ sĩ',
                                icon: faUser,
                                handle: (e) => {
                                    e.stopPropagation();
                                    navigate(
                                        `/artist?id=${currentSong.artists[0].alias}`,
                                    );
                                },
                            },
                            {
                                title: 'Tải nhạc',
                                icon: faDownload,
                                handle: (e) => {
                                    e.stopPropagation();
                                    handleDownload(
                                        `Solfive - ${currentSong.title}`,
                                    );
                                },
                            },
                            {
                                title: 'Chia sẻ',
                                icon: faShare,
                                handle: () => {},
                            },
                        ]}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                visible ? hide() : show();
                            }}
                            className="rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3"
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                    </MenuDetails>
                </div>
                {/* Details */}
                <div className="flex items-center">
                    <div
                        className={`${cx(
                            'volume-container',
                        )} flex items-center w-36`}
                    >
                        <input
                            ref={volumeRef}
                            className={`${cx('volume-progress')} flex-1`}
                            type="range"
                            min={0}
                            max={100}
                            value={currentAudio.volume * 100}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                setVolume(e.target.value / 100);
                                currentAudio.volume = e.target.value / 100;
                            }}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                currentAudio.volume =
                                    currentAudio.volume === 0 ? volume : 0;
                                setIsMute(currentAudio.volume === 0);
                            }}
                            className="ml-2 rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3 "
                        >
                            <FontAwesomeIcon
                                icon={isMute ? faVolumeMute : faVolumeHigh}
                            />
                        </button>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRepeat((prev) => !prev);
                        }}
                        className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3"
                    >
                        <FontAwesomeIcon
                            icon={faRepeat}
                            className={`${cx(
                                `${isRepeat ? 'is-repeat' : ''}`,
                            )}`}
                        />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShuffle((prev) => prev + 1);
                        }}
                        className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3"
                    >
                        <FontAwesomeIcon
                            icon={faShuffle}
                            className={`${cx(
                                `${
                                    isShuffle
                                        ? 'is-shuffle'
                                        : 'is-shuffle-reserver'
                                }`,
                            )}`}
                        />
                    </button>
                    <button
                        className={`${cx(
                            `${
                                openPlayer ? 'isPlayerOpened' : 'isPlayerClosed'
                            }`,
                        )} rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center`}
                    >
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </div>
            <div className="progress absolute -top-0 z-40 w-full">
                <input
                    ref={rangeRef}
                    className="w-full left-0"
                    type="range"
                    min={0}
                    max={100}
                    value={
                        (timeSong / currentAudio?.duration) * 100
                            ? (timeSong / currentAudio?.duration) * 100
                            : 0
                    }
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onChange={(e) => {
                        currentAudio.currentTime =
                            (currentAudio?.duration * e.target.value) / 100;
                    }}
                />
            </div>
        </div>
    );
}

export default Footer;
