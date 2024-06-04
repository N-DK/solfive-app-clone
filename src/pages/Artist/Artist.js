import { SongItem } from '~/components/SongItem';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ListPlaylist } from '~/components/ListPlaylist';
import { useQuery } from '~/hooks';
import { useEffect, useRef, useState } from 'react';
import { getArtistById } from '~/service';
import { getSectionBySectionId } from '~/utils';

const cx = classNames.bind(styles);

function Artist() {
    const query = useQuery();
    let id = query.get('id');
    const contentRef = useRef();

    const [data, setData] = useState();
    const [showMore, setShowMore] = useState();

    const handleShowMore = () => {
        if (contentRef) {
            contentRef.current.style.height = !showMore
                ? '164px'
                : 'max-content';
            setShowMore((prev) => !prev);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await getArtistById(id);
            console.log(res.data);
            setData(res.data);
        };

        fetch();
    }, []);

    return (
        <div className={`${cx('wrapper')} text-white`}>
            <div className={`${cx('container')}`}>
                <div className={`${cx('')} mt-16`}>
                    <div>
                        <h1 className={`${cx('')} mb-10 font-semibold`}>
                            {data?.name}
                        </h1>
                        <div className="overflow-hidden" ref={contentRef}>
                            <p className="pb-2">Quốc gia: {data?.national}</p>
                            <p className="pb-2">Tên Thật: {data?.realname}</p>
                            <p className="pb-2">Năm sinh: {data?.birthday}</p>
                            <div
                                className="leading-7"
                                dangerouslySetInnerHTML={{
                                    __html: data?.biography,
                                }}
                            />
                        </div>
                    </div>
                    <p
                        onClick={handleShowMore}
                        className="font-semibold pt-4 cursor-pointer uppercase"
                    >
                        {!showMore ? 'ẩn bớt' : 'hiển thị thêm'}
                    </p>
                </div>
                <div className={`${cx('')} mt-12`}>
                    <h1 className="font-semibold">Bài hát</h1>
                    <div>
                        {getSectionBySectionId(data, 'aSongs')
                            ?.items?.slice(0, 10)
                            .map((item, index) => (
                                <SongItem
                                    key={index}
                                    data={item}
                                    playListId={data?.playlistId}
                                />
                            ))}
                    </div>
                    <Link
                        to={`/playlist?id=${data?.playlistId}`}
                        className={`${cx(
                            'btn-login',
                        )} border text-white p-2.5 text-sm font-semibold rounded-sm mt-3 inline-block`}
                    >
                        Xem tất cả bài hát
                    </Link>
                </div>
                <ListPlaylist
                    title={'Album'}
                    data={getSectionBySectionId('aSingle')?.items}
                />
            </div>
        </div>
    );
}

export default Artist;
