import { SongItem } from '~/components/SongItem';
import styles from './Player.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '~/hooks';
import {
    getArtistById,
    getLyricSongById,
    getPlaylistById,
    getSongById,
    getSoundSongById,
} from '~/service';
import { ListPlaylist } from '~/components/ListPlaylist';
import { ListArtist } from '~/components/ListArtist';
import {
    faChevronLeft,
    faChevronRight,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import { useStore } from '~/store/hooks';
import { chunkArray, getSectionBySectionId } from '~/utils';
import { pauseSong, playSong } from '~/store/actions';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function NextInPlayList({ data, songs }) {
    const [state, dispatch] = useStore();
    const { currentSong, playlist } = state;
    const getIndexSongInPlaylist = (currentSong) => {
        return playlist?.findIndex((song) => {
            return song.encodeId === currentSong.encodeId;
        });
    };

    return (
        <div>
            <div
                className={`${cx(
                    'playlist_name',
                )} flex items-center justify-between text--primary-color p-3 text-sm`}
            >
                <p>
                    {getIndexSongInPlaylist(currentSong) + 1}/
                    {data?.song?.total}
                </p>
                <p>Playlist ‧ {data?.title}</p>
            </div>
            <div className={`${cx('list-results')}`}>
                {songs?.map((item, index) => (
                    <SongItem key={index} size="medium" data={item} />
                ))}
            </div>
        </div>
    );
}

const Lyric = ({ data }) => {
    const [state, dispatch] = useStore();
    const { currentAudio, currentSong } = state;
    const [timeSong, setTimeSong] = useState();
    const lyricActiveRef = useRef(null);

    useEffect(() => {
        if (lyricActiveRef) {
            lyricActiveRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [timeSong]);

    useEffect(() => {
        if (currentAudio) {
            currentAudio.addEventListener('timeupdate', () => {
                setTimeSong(currentAudio.currentTime);
            });
        }
    }, [currentSong, currentAudio]);

    return (
        <div className={`${cx('list-results')} mt-4`}>
            <div className="text-white leading-8">
                {chunkArray(data?.sentences, 8).map((data, index) => (
                    <div key={index} className="pb-7">
                        {data?.map((sentence, index) => {
                            const active =
                                timeSong * 1000 >=
                                    sentence?.words[0]?.startTime &&
                                timeSong * 1000 <=
                                    sentence?.words[sentence?.words?.length - 1]
                                        ?.endTime;
                            return (
                                <p
                                    ref={active ? lyricActiveRef : null}
                                    key={index}
                                    className={`${cx(
                                        `${active ? 'active-lyric' : ''}`,
                                    )}`}
                                >
                                    {sentence?.words?.map((word, index) => (
                                        <span
                                            key={index}
                                        >{`${word?.data} `}</span>
                                    ))}
                                </p>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

function Relate({ artist, similarArtist, songs }) {
    const slider = useRef(null);

    const _settings_ = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const getSectionBySectionType = (sectionType) => {
        var data = [];
        artist?.sections?.forEach((section) => {
            if (section.sectionType === sectionType) {
                data.push(...section.items);
            }
        });
        return data;
    };

    return (
        <div className={`${cx('list-results')} text-white`}>
            <div>
                <div className="flex justify-between items-center">
                    <div className={`pt-2 pb-2`}>
                        <h1 className="font-semibold text-2xl">
                            Có thể bạn cũng thích
                        </h1>
                    </div>
                    <div className={`flex items-center`}>
                        <button
                            onClick={() => slider?.current?.slickPrev()}
                            className={`w-10 h-10 border rounded-full flex items-center justify-center mr-2`}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                            onClick={() => slider?.current?.slickNext()}
                            className={`w-10 h-10 border rounded-full flex items-center justify-center`}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="custom-carousel">
                    <Slider ref={slider} {..._settings_}>
                        {chunkArray(songs, 4)?.map((arrMini, index) => (
                            <div key={index}>
                                {arrMini?.map((item, index) => (
                                    <SongItem
                                        key={index}
                                        size="small"
                                        data={item}
                                        playListId={artist?.playlistId}
                                    />
                                ))}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="mb-8">
                <ListPlaylist
                    title={'Danh sách phát đề xuất'}
                    data={getSectionBySectionType('playlist')}
                    settings={{
                        dots: false,
                        infinite: false,
                        speed: 500,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                        marginRight: 2,
                    }}
                />
            </div>
            <div className="mb-8">
                <ListArtist data={similarArtist} />
            </div>
            {artist?.national && (
                <div>
                    <h1 className="text-2xl font-semibold">
                        Giới thiệu nghệ sĩ
                    </h1>
                    <p className="pb-2">Quốc gia: {artist?.national}</p>
                    <p className="pb-2">Tên Thật: {artist?.realname}</p>
                    {artist?.birthday && (
                        <p className="pb-2">Năm sinh: {artist?.birthday}</p>
                    )}
                    <div
                        className="leading-7"
                        dangerouslySetInnerHTML={{
                            __html: artist?.biography,
                        }}
                    />
                </div>
            )}
        </div>
    );
}

const tabs = [
    { id: 0, title: 'Tiếp theo', component: NextInPlayList },
    { id: 1, title: 'Lời Nhạc', component: Lyric },
    { id: 2, title: 'Liên quan', component: Relate },
];

function Player() {
    const [tabActive, setTabActive] = useState(null);
    const [component, setComponent] = useState(0);
    const [dataSongNextInPlayList, setDataSongInNextPlaylist] = useState([]);
    const [dataArtist, setDataArtist] = useState();
    const [loading, setLoading] = useState(false);
    const [dataPlaylistArtist, setDataPlaylistArtist] = useState();
    const [dataLyric, setDataLyric] = useState();
    const [song, setSong] = useState();
    const [state, dispatch] = useStore();

    const { currentSong, playlist, currentAudio, isPlaying } = state;
    const tabFirst = useRef(null);
    const line = useRef(null);

    const query = useQuery();
    const id = query.get('id');
    const listId = query.get('listId');
    const { openPlayer, setOpenPlayer } = useContext(DefaultContext);

    useState(() => {
        const fetch = async () => {
            setLoading(true);
            const songRes = await getSongById(id);
            const res = await getSoundSongById(id);
            const playlist = await getPlaylistById(listId);
            const song = songRes.data;
            const songs = playlist?.data?.song?.items;
            const URL = res?.data['128'];

            var audio = new Audio(URL);

            if (currentAudio) {
                if (id === currentSong.encodeId) {
                    audio = currentAudio;
                } else {
                    currentAudio.pause();
                }
            }
            dispatch(
                playSong({
                    audio,
                    song,
                    playListId: listId,
                    playlist: songs,
                }),
            );
            if (audio.paused) dispatch(pauseSong(audio));
            setLoading(false);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const res = await getPlaylistById(listId);
            setDataSongInNextPlaylist(res.data);
            setLoading(false);
        };
        fetch();
    }, [listId]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getLyricSongById(id);
            setDataLyric(res.data);
        };

        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getSongById(id);
            setSong(res.data);
        };
        fetch();
    }, [id]);

    useEffect(() => {
        // setLoading(true);
        if (component === 2) {
            const artist = song?.artists[0];
            const fetch = async () => {
                setLoading(true);
                const artistResult = await getArtistById(artist.alias);
                const playlistResults = await getPlaylistById(
                    artist.playlistId,
                );
                setDataPlaylistArtist(playlistResults.data);
                setDataArtist(artistResult.data);
                setLoading(false);
            };

            fetch();
        }
        // setLoading(false);
    }, [component, song]);

    useEffect(() => {
        if (tabActive && line.current) {
            const { offsetWidth, offsetLeft } = tabActive;
            line.current.style.width = `${offsetWidth}px`;
            line.current.style.transform = `translateX(${offsetLeft}px)`;
        }
    }, [tabActive]);

    useEffect(() => {
        if (tabFirst.current) {
            setTabActive(tabFirst.current);
        }
    }, [tabFirst]);

    return (
        <div
            className={`${cx(
                'wrapper',
                `${openPlayer ? 'in' : 'out'}`,
            )} mt-20 fixed right-0 flex justify-between pr-48 pl-48 top-0`}
        >
            <div className={`${cx('container')} flex items-start`}>
                <div className={`w-7/12 mr-6 relative`}>
                    <div
                        style={{
                            backdropFilter: 'blur(5px)',
                            filter: 'blur(5px)',
                        }}
                        className={`mt-11`}
                    >
                        <img className="w-full" src={song?.thumbnailM} />
                    </div>
                    <div className=" absolute flex items-center justify-center w-full h-full top-0 left-0">
                        <div
                            className={`${cx(
                                'img_small',
                            )} h-1/2 rounded overflow-hidden`}
                        >
                            <img
                                className="h-full w-full"
                                src={song?.thumbnailM}
                            />
                        </div>
                    </div>
                </div>
                <div className={`w-5/12 overflow-hidden`}>
                    {/* Tab */}
                    <div
                        className={`${cx(
                            'tabs',
                        )} flex items-center text-white relative`}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={(e) => {
                                    setTabActive(e.target);
                                    setComponent(tab.id);
                                }}
                                ref={tab.id === 0 ? tabFirst : null}
                                className={` uppercase flex-1 h-11 text-sm font-semibold text--primary-color border-0`}
                            >
                                {tab.title}
                            </button>
                        ))}
                        <span ref={line} className={`${cx('line')}`}></span>
                    </div>
                    <div className="w-full">
                        {component === 0 &&
                            (loading ? (
                                <div>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="loading"
                                    />
                                </div>
                            ) : (
                                <NextInPlayList
                                    data={dataSongNextInPlayList}
                                    songs={
                                        playlist?.length === 0 || !playlist
                                            ? dataSongNextInPlayList?.song
                                                  ?.items
                                            : playlist
                                    }
                                />
                            ))}
                        {component === 1 && <Lyric data={dataLyric} />}
                        {component === 2 &&
                            (loading ? (
                                <div className="text-white flex justify-center text-3xl mt-10">
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className="loading"
                                    />
                                </div>
                            ) : (
                                <Relate
                                    artist={dataArtist}
                                    similarArtist={
                                        dataSongNextInPlayList?.artists
                                    }
                                    songs={dataPlaylistArtist?.song?.items}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
