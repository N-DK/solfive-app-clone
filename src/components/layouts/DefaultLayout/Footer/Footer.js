import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import {
    faBackwardStep,
    faCaretDown,
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
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useStore } from '~/store/hooks';
import { pauseSong, playSong, setPlaylist } from '~/store/actions';
import { dropHeart, getSoundSongById } from '~/service';
import {
    convertSecondsToMMSS,
    formatTime,
    isExistFavoriteSongs,
    shufflePlaylist,
} from '~/utils';
import {
    faHeart,
    faPlayCircle,
    faUser,
} from '@fortawesome/free-regular-svg-icons';
import { MenuDetails } from '~/components/MenuDetails';
import { DefaultContext } from '../DefaultLayout';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { HistoryContext } from '~/components/HistoryProvider';

const cx = classNames.bind(styles);

const NEXT = 1;
const PREV = -1;
const stopAudio = (audio) => {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
};

function Footer() {
    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const { currentSong, playListId, isPlaying, currentAudio, playlist } =
        state;
    const [volume, setVolume] = useState(1);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [timeSong, setTimeSong] = useState();
    const [visible, setVisible] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const rangeRef = useRef(null);
    const volumeRef = useRef(null);
    const lastVolumeRef = useRef(1);
    const requestInProgressRef = useRef(false);
    const currentAudioRef = useRef(currentAudio);
    const currentSongRef = useRef(currentSong);
    const playlistRef = useRef(playlist);
    const navigationRequestRef = useRef(0);
    const {
        openModal,
        loading,
        setLoading,
        openPlayer,
        setOpenPlayer,
        dataUser,
    } = useContext(DefaultContext);
    const { previousPath } = useContext(HistoryContext);
    const [like, setLike] = useState(
        isExistFavoriteSongs(dataUser, currentSong),
    );
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    useEffect(() => {
        currentAudioRef.current = currentAudio;
        currentSongRef.current = currentSong;
        playlistRef.current = playlist;
    }, [currentAudio, currentSong, playlist]);

    useEffect(() => {
        setLike(isExistFavoriteSongs(dataUser, currentSong));
    }, [currentSong, dataUser]);

    const getFavoriteSongById = (data) => {
        const item = dataUser?.favoriteList?.song?.items?.find(
            (song) => song.encodeId === data?.encodeId,
        );

        return {
            ...(item ?? data),
            artists: data?.artists?.map((artist) => ({ name: artist?.name })),
            is_liked: 0,
        };
    };

    const handleLike = () => {
        const payload = like ? getFavoriteSongById(currentSong) : currentSong;
        const fetch = async () => {
            await dropHeart(payload);
        };

        setLike(!like);
        fetch();
    };

    const handlePause = useCallback(() => {
        const activeAudio = currentAudioRef.current;
        if (!activeAudio) return;

        dispatch(pauseSong(activeAudio));
        activeAudio.pause();
    }, [dispatch]);

    const handleNavigatorSong = useCallback(
        async (type) => {
            if (requestInProgressRef.current) {
                return;
            }

            const activeSong = currentSongRef.current;
            const activePlaylist = playlistRef.current;
            if (!activeSong || !Array.isArray(activePlaylist)) return;

            const index = activePlaylist.findIndex((song) => {
                return song.encodeId === activeSong.encodeId;
            });
            if (index < 0) return;

            const firstNextIndex = index + type;
            if (
                firstNextIndex < 0 ||
                firstNextIndex >= activePlaylist.length
            ) {
                return;
            }

            const requestId = navigationRequestRef.current + 1;
            navigationRequestRef.current = requestId;
            requestInProgressRef.current = true;
            setLoading(true);

            try {
                const activeAudio = currentAudioRef.current;
                if (activeAudio) {
                    stopAudio(activeAudio);
                    dispatch(pauseSong(activeAudio));
                }

                for (
                    let nextIndex = index + type;
                    nextIndex >= 0 && nextIndex < activePlaylist.length;
                    nextIndex += type
                ) {
                    const song = activePlaylist[nextIndex];
                    const res = await getSoundSongById(song?.encodeId);
                    if (requestId !== navigationRequestRef.current) return;

                    const URL = res?.data?.['128'];
                    if (!URL) continue;

                    const audio = new Audio(URL);
                    audio.volume = volume;
                    const nextPlayListId = playListId ?? song?.album?.encodeId;
                    currentAudioRef.current = audio;
                    currentSongRef.current = song;

                    dispatch(
                        playSong({
                            audio,
                            song,
                            playListId: nextPlayListId,
                            playlist: activePlaylist,
                        }),
                    );

                    if (window.location.pathname.includes('/player')) {
                        navigate(
                            `/player?id=${song?.encodeId}&listId=${nextPlayListId}`,
                        );
                    }

                    const playPromise = audio.play();
                    if (playPromise !== null) {
                        playPromise.catch(() => {});
                    }
                    return;
                }

                handlePause();
            } finally {
                if (requestId === navigationRequestRef.current) {
                    setLoading(false);
                    requestInProgressRef.current = false;
                }
            }
        },
        [
            dispatch,
            handlePause,
            navigate,
            playListId,
            setLoading,
            volume,
        ],
    );

    const handleDownload = (title) => {
        const fetch = async () => {
            const res = await getSoundSongById(currentSong?.encodeId);
            const url = res?.data?.['128'];
            if (!url) return;

            axios({
                url,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const blob = new Blob([response.data], { type: 'audio/mp3' });
                saveAs(blob, title + '.mp3');
            });
        };

        fetch();
    };

    const handlePlay = (e) => {
        e.stopPropagation();
        if (!currentAudio || !currentSong) return;

        dispatch(
            playSong({
                audio: currentAudio,
                song: currentSong,
                playListId: playListId,
                playlist,
            }),
        );
        if (currentAudio.paused) {
            const playPromise = currentAudio.play();
            if (playPromise !== null) playPromise.catch(() => {});
        }
    };

    const handleOpenPlayer = () => {
        if (!currentSong) return;

        if (!openPlayer) {
            if (playListId) {
                navigate(
                    `/player?id=${currentSong.encodeId}&listId=${playListId}`,
                );
            } else {
                navigate(`/player?id=${currentSong.encodeId}`);
            }
            setOpenPlayer(true);
        } else {
            setOpenPlayer(false);
            navigate(previousPath ?? '/');
        }
    };

    useEffect(() => {
        if (rangeRef.current && timeSong) {
            const valPercent =
                (rangeRef.current.value / rangeRef.current.max) * 100;
            rangeRef.current.style.background = `linear-gradient(to right, #67b9f9 ${valPercent}%, #515151 ${valPercent}%)`;
        }
    }, [timeSong]);

    useEffect(() => {
        if (volumeRef.current) {
            const valPercent =
                (volumeRef.current.value / volumeRef.current.max) * 100;
            volumeRef.current.style.background = `linear-gradient(to right, #67b9f9 ${valPercent}%, #515151 ${valPercent}%)`;
        }
    }, [volume]);

    useEffect(() => {
        setIsMute(volume === 0);
    }, [volume]);

    useEffect(() => {
        if (currentAudio) currentAudio.volume = volume;
    }, [currentAudio, volume]);

    useEffect(() => {
        if (!currentAudio) return;

        const handleTimeUpdate = () => {
            setTimeSong(currentAudio.currentTime);
        };

        currentAudio.addEventListener('timeupdate', handleTimeUpdate);
        handleTimeUpdate();

        return () => {
            currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [currentAudio]);

    useEffect(() => {
        const handleAudioEnd = () => {
            if (!currentAudio || !currentSong || !Array.isArray(playlist)) {
                return;
            }

            if (isRepeat) {
                const playPromise = currentAudio.play();
                if (playPromise !== null) playPromise.catch(() => {});
            } else {
                if (
                    currentSong.encodeId ===
                    playlist[playlist.length - 1]?.encodeId
                ) {
                    handlePause();
                } else {
                    handleNavigatorSong(NEXT);
                }
            }
        };

        if (!currentAudio) return;

        currentAudio.addEventListener('ended', handleAudioEnd);
        return () => {
            currentAudio.removeEventListener('ended', handleAudioEnd);
        };
    }, [
        currentAudio,
        currentSong,
        handleNavigatorSong,
        handlePause,
        isRepeat,
        playlist,
    ]);

    const handleToggleShuffle = () => {
        setIsShuffle((prev) => {
            const nextValue = !prev;
            if (nextValue && playlist?.length) {
                const songsTemp = [...playlist];
                const playListShuffled = shufflePlaylist(
                    songsTemp,
                    currentSong,
                );
                dispatch(setPlaylist(playListShuffled));
            }

            return nextValue;
        });
    };

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-1000"
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
                            alt={currentSong.title ?? ''}
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
                            if (dataUser) {
                                handleLike();
                            } else {
                                openModal();
                            }
                        }}
                        className={`${cx(
                            'btn',
                            'heart',
                            `${like && 'active'}`,
                        )} rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3`}
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
                                    const artistAlias =
                                        currentSong.artists?.[0]?.alias;
                                    if (artistAlias) {
                                        navigate(`/artist?id=${artistAlias}`);
                                    }
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
                            value={(currentAudio?.volume ?? volume) * 100}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                const nextVolume = e.target.value / 100;
                                setVolume(nextVolume);
                                if (nextVolume > 0) {
                                    lastVolumeRef.current = nextVolume;
                                }
                                if (currentAudio) {
                                    currentAudio.volume = nextVolume;
                                }
                            }}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!currentAudio) return;

                                const nextVolume =
                                    currentAudio.volume === 0
                                        ? lastVolumeRef.current || 0.7
                                        : 0;
                                if (currentAudio.volume > 0) {
                                    lastVolumeRef.current =
                                        currentAudio.volume;
                                }
                                currentAudio.volume = nextVolume;
                                setVolume(nextVolume);
                                setIsMute(nextVolume === 0);
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
                            handleToggleShuffle();
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
                        if (!currentAudio?.duration) return;

                        currentAudio.currentTime =
                            (currentAudio.duration * e.target.value) / 100;
                    }}
                />
            </div>
        </div>
    );
}

export default Footer;
