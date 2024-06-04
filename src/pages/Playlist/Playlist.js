import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Playlist.module.scss';
import classNames from 'classnames/bind';
import {
    faEllipsisVertical,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { SongItem } from '~/components/SongItem';
import { useQuery } from '~/hooks';
import { useEffect, useState } from 'react';
import { getPlaylistById } from '~/service';
import { convertSeconds } from '~/utils';

const cx = classNames.bind(styles);

function Playlist() {
    let query = useQuery();
    let id = query.get('id');

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getPlaylistById(id);
            setData(res?.data);
        };

        fetch();
    }, []);

    return (
        <div className={`${cx('wrapper')} mt-14`}>
            <div className={`${cx('container')}`}>
                <div className="flex ">
                    <div className={` w-64 h-64 rounded overflow-hidden mr-8`}>
                        <img className="w-full h-full" src={data?.thumbnailM} />
                    </div>
                    <div className={`flex flex-col justify-between flex-1`}>
                        <p className="text-white text-3xl font-semibold mt-4">
                            {data?.title}
                        </p>
                        <div>
                            <div className={`text--primary-color mt-10`}>
                                <p className={`pt-2 pb-2`}>
                                    Danh sách phát • Solfive
                                </p>
                                <p className={`pt-2 pb-2`}>
                                    {data?.song?.total} bài hát •{' '}
                                    {convertSeconds(data?.song?.totalDuration)}
                                </p>
                                <p className={`pt-2 pb-2 text-sm`}>
                                    {data?.sortDescription}
                                </p>
                            </div>
                            <div className={`flex items-center mt-3 z-40`}>
                                <button
                                    className={` bg-white rounded-full p-3 pt-2 pb-2 flex items-center mr-4`}
                                >
                                    <FontAwesomeIcon
                                        icon={faShuffle}
                                        className="mr-2"
                                    />
                                    <span className={`font-semibold text-sm`}>
                                        Phát ngẫu nhiên
                                    </span>
                                </button>
                                <button
                                    className={`${cx(
                                        'btn_more',
                                    )} text-white flex items-center w-10 h-10 rounded-full justify-center`}
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-14">
                    {data?.song?.items.map((item, index) => (
                        <SongItem key={index} data={item} playListId={id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
