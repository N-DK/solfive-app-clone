import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Playlist.module.scss';
import classNames from 'classnames/bind';
import {
    faEllipsisVertical,
    faShare,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { SongItem } from '~/components/SongItem';
import { useQuery } from '~/hooks';
import { useContext, useEffect, useState } from 'react';
import { getPlaylistById, getSoundSongById } from '~/service';
import { convertSeconds, isExistFavoriteSongs } from '~/utils';
import { MenuDetails } from '~/components/MenuDetails';
import { useStore } from '~/store/hooks';
import { playSong } from '~/store/actions';
import { useNavigate } from 'react-router-dom';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';
import { Undefined } from '~/components/Undefined';
import { HistoryContext } from '~/components/HistoryProvider';

const cx = classNames.bind(styles);

function Playlist() {
    let query = useQuery();
    let id;
    if (window.location.pathname.includes('/playlist')) {
        id = query.get('id');
    }

    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const navigator = useNavigate();
    const [state, dispatch] = useStore();
    const [undefine, setUndefine] = useState(false);
    const { currentAudio, currentSong } = state;
    const { setLoading, setProgress, dataUser, setOpenPlayer } =
        useContext(DefaultContext);
    const { previousPath } = useContext(HistoryContext);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handlePlayRandom = () => {
        const fetch = async () => {
            setLoading(true);
            const playlist = await getPlaylistById(id);
            const songs = playlist?.data?.song?.items;
            const data = songs[Math.floor(Math.random() * songs.length)];
            const res = await getSoundSongById(data.encodeId);
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
                    playListId: id,
                    playlist: songs,
                }),
            );
            if (currentAudio?.paused || !currentAudio) {
                const playPromise = audio.play();
                if (playPromise !== null) {
                    playPromise.catch(() => {
                        audio.play();
                    });
                }
            }
            navigator(`/player?id=${data.encodeId}&listId=${id}`);
            setOpenPlayer(true);
            setLoading(false);
        };
        fetch();
    };

    useEffect(() => {
        const fetch = async () => {
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await getPlaylistById(id);
            setUndefine(res ? false : true);
            setData(res?.data);
            setProgress(100);
        };
        if (
            id &&
            !(
                window.location.pathname + window.location.search ===
                previousPath
            )
        ) {
            fetch();
        }
    }, [id]);

    return (
        <>
            {!undefine ? (
                <div className={`${cx('wrapper')} mt-14`}>
                    <div className={`${cx('container')} relative z-100`}>
                        <div className="flex ">
                            <div
                                className={` w-64 h-64 rounded overflow-hidden mr-8 flex flex-wrap`}
                            >
                                {data?.thumbnailM ? (
                                    <img
                                        className="w-full h-full"
                                        src={data?.thumbnailM}
                                    />
                                ) : (
                                    data?.song?.items?.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`w-32 h-32`}
                                        >
                                            <img
                                                className="w-full h-full object-contain"
                                                src={item.thumbnailM}
                                            ></img>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div
                                className={`flex flex-col justify-between flex-1`}
                            >
                                <p className="text-white text-3xl font-semibold mt-4">
                                    {data?.title}
                                </p>
                                <div>
                                    <div
                                        className={`text--primary-color mt-10`}
                                    >
                                        <p className={`pt-2 pb-2`}>
                                            Danh sách phát • Solfive
                                        </p>
                                        <p className={`pt-2 pb-2`}>
                                            {data?.song?.total} bài hát •{' '}
                                            {convertSeconds(
                                                data?.song?.totalDuration,
                                            )}
                                        </p>
                                        <p className={`pt-2 pb-2 text-sm`}>
                                            {data?.sortDescription}
                                        </p>
                                    </div>
                                    <div
                                        className={`flex items-center mt-3 z-40`}
                                    >
                                        <button
                                            onClick={handlePlayRandom}
                                            className={` bg-white rounded-full p-3 pt-2 pb-2 flex items-center mr-4`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faShuffle}
                                                className="mr-2"
                                            />
                                            <span
                                                className={`font-semibold text-sm`}
                                            >
                                                Phát ngẫu nhiên
                                            </span>
                                        </button>
                                        <MenuDetails
                                            hide={hide}
                                            visible={visible}
                                            items={[
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
                                                    'btn_more',
                                                )} text-white flex items-center w-10 h-10 rounded-full justify-center`}
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
                        <div className="mt-14">
                            {data?.song?.items.map((item, index) => (
                                <SongItem
                                    key={item.encodeId}
                                    data={item}
                                    playListId={id}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className="absolute h-80 top-0 left-0 bg-no-repeat bg-cover right-0"
                        style={{
                            backgroundImage: `url(${
                                data?.thumbnailM
                                    ? data?.thumbnailM
                                    : 'https://solfive.app.tranviet.site/static/images/body-bg.jpg'
                            })`,
                            boxShadow:
                                'rgb(33, 33, 33) 0px 0px 30px 15px inset',
                        }}
                    ></div>
                    <div className="absolute h-80 top-0 left-0 right-0 bg-gradient-to-b from-from-body-bg-gradiant to-to-body-bg-gradiant"></div>
                </div>
            ) : (
                <Undefined message="Playlist không tồn tại hoặc bị xoá" />
            )}
        </>
    );
}

export default Playlist;
