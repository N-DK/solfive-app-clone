import { ListArtist } from '~/components/ListArtist';
import { ListPlaylist } from '~/components/ListPlaylist';
import { SongItem } from '~/components/SongItem';
import { Undefined } from '~/components/Undefined';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '~/hooks';
import { search } from '~/service';
import { SongItemSkeleton } from '~/components/Skeleton';

function Search() {
    const [data, setData] = useState();
    const query = useQuery();
    const q = query.get('q');
    const { setProgress } = useContext(DefaultContext);
    const [undefine, setUndefine] = useState(false);
    const isLoading = !!q && !data && !undefine;
    const skeletonSongs = Array.from({ length: 8 });

    useEffect(() => {
        let canceled = false;

        const fetch = async () => {
            setData();
            setUndefine(false);
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await search(q);
            if (canceled) return;

            const result = res?.data;
            if (!result) {
                setUndefine(true);
                setProgress(100);
                return;
            }

            if (
                result?.counter?.song === 0 &&
                result?.counter?.artist === 0 &&
                result?.counter?.playlist === 0
            )
                setUndefine(true);
            setData(result);
            setProgress(100);
        };

        if (q) {
            fetch();
        } else {
            setData();
            setUndefine(false);
        }

        return () => {
            canceled = true;
        };
    }, [q, setProgress]);

    return (
        <>
            {isLoading && (
                <div>
                    <div className="mt-12">
                        <ListArtist
                            title={'Nghệ sỹ'}
                            isLoading
                            settingMore={{
                                slidesToShow: 7,
                            }}
                        />
                    </div>
                    <div className="mt-12">
                        <h1 className="font-semibold text-2xl text-white">
                            Bài hát
                        </h1>
                        <div>
                            {skeletonSongs.map((_, index) => (
                                <SongItemSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <ListPlaylist title={'Danh sách phát'} isLoading />
                    </div>
                </div>
            )}
            {data && !undefine && (
                <div>
                    <div className="mt-12">
                        {data.counter.artist > 0 && (
                            <ListArtist
                                data={data['artists']}
                                title={'Nghệ sỹ'}
                                settingMore={{
                                    slidesToShow: 7,
                                }}
                            />
                        )}
                    </div>
                    <div className="mt-12">
                        <h1 className="font-semibold text-2xl text-white">
                            Bài hát
                        </h1>
                        <div>
                            {data.counter.song > 0 &&
                                data['songs'].map((item, index) => (
                                    <SongItem
                                        key={index}
                                        data={item}
                                        playListId={item?.album?.encodeId}
                                    />
                                ))}
                        </div>
                    </div>
                    <div>
                        {data.counter.playlist > 0 && (
                            <ListPlaylist
                                data={data['playlists']}
                                title={'Danh sách phát'}
                            />
                        )}
                    </div>
                </div>
            )}
            {undefine && <Undefined message={'Không tìm thấy kết quả'} />}
        </>
    );
}

export default Search;
