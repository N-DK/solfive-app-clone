import { SongItem } from '~/components/SongItem';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ListPlaylist } from '~/components/ListPlaylist';
import { useQuery } from '~/hooks';
import { useContext, useEffect, useRef, useState } from 'react';
import { getArtistById } from '~/service';
import { getSectionBySectionId } from '~/utils';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';
import { SkeletonBlock, SongItemSkeleton } from '~/components/Skeleton';

const cx = classNames.bind(styles);

function Artist() {
    const query = useQuery();
    let id = query.get('id');
    const contentRef = useRef();

    const [data, setData] = useState();
    const [showMore, setShowMore] = useState();
    const { setProgress } = useContext(DefaultContext);
    const isLoading = !data;
    const skeletonSongs = Array.from({ length: 8 });

    const handleShowMore = () => {
        if (contentRef) {
            contentRef.current.style.height = !showMore
                ? '164px'
                : 'max-content';
            setShowMore((prev) => !prev);
        }
    };

    useEffect(() => {
        let canceled = false;

        const fetch = async () => {
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await getArtistById(id);
            if (canceled) return;

            setData(res?.data);
            setProgress(100);
        };

        if (id) fetch();

        return () => {
            canceled = true;
        };
    }, [id, setProgress]);

    return (
        <div className={`${cx('wrapper')} text-white`}>
            <div className={`${cx('container')}`}>
                <div className={`${cx('')} mt-16`}>
                    <div>
                        <h1 className={`${cx('')} mb-10 font-semibold`}>
                            {isLoading ? (
                                <SkeletonBlock className="h-10 w-72" />
                            ) : (
                                data?.name
                            )}
                        </h1>
                        <div className="overflow-hidden" ref={contentRef}>
                            {isLoading ? (
                                <div>
                                    <SkeletonBlock className="h-5 w-40 mb-3" />
                                    <SkeletonBlock className="h-5 w-52 mb-3" />
                                    <SkeletonBlock className="h-5 w-36 mb-5" />
                                    <SkeletonBlock className="h-4 w-full mb-3" />
                                    <SkeletonBlock className="h-4 w-11/12 mb-3" />
                                    <SkeletonBlock className="h-4 w-10/12" />
                                </div>
                            ) : (
                                <>
                                    <p className="pb-2">
                                        Quốc gia: {data?.national}
                                    </p>
                                    <p className="pb-2">
                                        Tên Thật: {data?.realname}
                                    </p>
                                    <p className="pb-2">
                                        Năm sinh: {data?.birthday}
                                    </p>
                                    <div
                                        className="leading-7"
                                        dangerouslySetInnerHTML={{
                                            __html: data?.biography,
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    {!isLoading && (
                        <p
                            onClick={handleShowMore}
                            className="font-semibold pt-4 cursor-pointer uppercase"
                        >
                            {!showMore ? 'ẩn bớt' : 'hiển thị thêm'}
                        </p>
                    )}
                </div>
                <div className={`${cx('')} mt-12`}>
                    <h1 className="font-semibold">Bài hát</h1>
                    <div>
                        {isLoading
                            ? skeletonSongs.map((_, index) => (
                                  <SongItemSkeleton key={index} />
                              ))
                            : getSectionBySectionId(data, 'aSongs')
                                  ?.items?.slice(0, 10)
                                  .map((item, index) => (
                                      <SongItem
                                          key={index}
                                          data={item}
                                          playListId={data?.playlistId}
                                      />
                                  ))}
                    </div>
                    {!isLoading && (
                        <Link
                            to={`/playlist?id=${data?.playlistId}`}
                            className={`${cx(
                                'btn-login',
                            )} border text-white p-2.5 text-sm font-semibold rounded-sm mt-3 inline-block`}
                        >
                            Xem tất cả bài hát
                        </Link>
                    )}
                </div>
                <ListPlaylist
                    title={'Album'}
                    data={getSectionBySectionId(data, 'aSingle')?.items}
                    isLoading={isLoading}
                />
            </div>
            <div
                style={{
                    backgroundImage: `url(${data?.thumbnailM})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
                className="fixed flex justify-center -z-30 top-0 bottom-0  left-0  right-0"
            ></div>
            <div className="fixed -z-10 top-0 bottom-0 left-0 right-0  bg-gradient-to-b from-from-body-bg-gradiant to-to-body-bg-gradiant"></div>
        </div>
    );
}

export default Artist;
