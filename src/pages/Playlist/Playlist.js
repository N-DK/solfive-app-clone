import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Playlist.module.scss';
import classNames from 'classnames/bind';
import {
    faEllipsisVertical,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { SongItem } from '~/components/SongItem';
import { useQuery } from '~/hooks';

const cx = classNames.bind(styles);

function Playlist() {
    let query = useQuery();
    let id = query.get('id');
    console.log(id);
    return (
        <div className={`${cx('wrapper')} mt-14`}>
            <div className={`${cx('container')}`}>
                <div className="flex ">
                    <div className={` w-64 h-64 rounded overflow-hidden mr-8`}>
                        <img
                            className="w-full h-full"
                            src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/4/d/8/d/4d8d4608e336c270994d31c59ee68179.jpg"
                        />
                    </div>
                    <div className={`flex flex-col justify-between`}>
                        <p className="text-white text-3xl font-semibold mt-4">
                            Nhạc Chill Hay Nhất
                        </p>
                        <div>
                            <div className={`text--primary-color mt-10`}>
                                <p className={`pt-2 pb-2`}>
                                    Danh sách phát • Solfive
                                </p>
                                <p className={`pt-2 pb-2`}>
                                    46 bài hát • 2 giờ 59 phút 58 giây
                                </p>
                                <p className={`pt-2 pb-2`}>
                                    Ở đây có những bản hit cực chill, vừa nghe
                                    vừa feel
                                </p>
                            </div>
                            <div className={`flex items-center mt-3`}>
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
                                    className={`${cx('btn_more')} text-white flex items-center w-10 h-10 rounded-full justify-center`}
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* List */}
                <div className="mt-14">
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                </div>
            </div>
        </div>
    );
}

export default Playlist;
