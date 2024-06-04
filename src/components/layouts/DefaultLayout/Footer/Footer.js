import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import {
    faBackwardStep,
    faCaretDown,
    faCaretUp,
    faEllipsisV,
    faForwardStep,
    faHeart,
    faPause,
    faPlay,
    faRepeat,
    faShuffle,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '~/store/hooks';
import { pauseSong, playSong } from '~/store/actions';
import { getPlaylistById, getSoundSongById } from '~/service';
import { convertSecondsToMMSS, formatTime } from '~/utils';

const cx = classNames.bind(styles);

const NEXT = 1;
const PREV = -1;

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, dispatch] = useStore();
    const { currentSong, playListId, isPlaying, currentAudio, playlist } =
        state;
    const [navigationHistory, setNavigationHistory] = useState([]);
    const [volume, setVolume] = useState(1);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [timeSong, setTimeSong] = useState();
    const [isPlayerOpened, setIsPlayerOpened] = useState(
        location.pathname.includes('/player'),
    );

    const getIndexSongInPlaylist = (currentSong) => {
        return playlist?.findIndex((song) => {
            console.log(
                'song.encodeId',
                song.encodeId,
                'currentSong.encodeId',
                currentSong.encodeId,
                'RESULT: ',
                song.encodeId === currentSong.encodeId,
            );
            return song.encodeId === currentSong.encodeId;
        });
    };

    const handleNavigatorSong = (type) => {
        const handle = async () => {
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
        };
        handle();
    };

    const handlePlay = (e) => {
        e.stopPropagation();
        dispatch(
            playSong({
                audio: currentAudio,
                song: currentSong,
                playListId: playListId,
            }),
        );
        currentAudio.play();
    };

    const handlePause = () => {
        dispatch(pauseSong(currentAudio));
        currentAudio.pause();
    };

    const handleOpenPlayer = () => {
        if (!isPlayerOpened) {
            navigate(`/player?id=${currentSong.encodeId}&listId=${playListId}`);
            setIsPlayerOpened(true);
        } else {
            if (navigationHistory.length > 2) {
                navigate(-1);
            } else {
                navigate('/');
            }
            setIsPlayerOpened(false);
        }
    };

    useEffect(() => {
        if (currentSong) {
            currentAudio.volume = volume;
            currentAudio.addEventListener('timeupdate', () => {
                setTimeSong(currentAudio.currentTime);
            });
        }
    }, [currentSong]);

    useEffect(() => {
        setNavigationHistory((prevHistory) => [
            ...prevHistory,
            location.pathname,
        ]);
    }, [location]);

    useEffect(() => {
        const handleAudioEnd = (e) => {
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
            currentAudio.addEventListener('ended', handleAudioEnd);

            return () => {
                currentAudio.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, [isRepeat]);

    useEffect(() => {
        // if (isShuffle) {
        //     const songsTemp = [...playlist];
        //     const playListShuffled = shufflePlaylist(songsTemp, currentSong);
        //     setPlaylist();
        //     dispatch(shuffle({playListShuffled}))
        // } else {
        //     dispatch(shuffle(playlist));
        // }
    }, [isShuffle]);

    return (
        <div onClick={handleOpenPlayer}>
            <div
                className={`${cx(
                    'wrapper',
                )} fixed bottom-0 left-0 right-0 flex items-center justify-between pr-6 pl-6`}
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
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
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
                        <span>{formatTime(timeSong)} / </span>
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
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3"
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                </div>
                {/* Details */}
                <div className="flex items-center">
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </button>
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faRepeat} />
                    </button>
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faShuffle} />
                    </button>
                    <button
                        className={`${cx(
                            `${
                                isPlayerOpened
                                    ? 'isPlayerOpened'
                                    : 'isPlayerClosed'
                            }`,
                        )} rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center`}
                    >
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
