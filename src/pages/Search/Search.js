import { ListArtist } from '~/components/ListArtist';
import { ListPlaylist } from '~/components/ListPlaylist';
import { SongItem } from '~/components/SongItem';
import { Undefined } from '~/components/Undefined';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';

const { useState, useEffect, useContext } = require('react');
const { useQuery } = require('~/hooks');
const { search } = require('~/service');

function Search() {
    const [data, setData] = useState();
    const query = useQuery();
    const q = query.get('q');
    const { setProgress } = useContext(DefaultContext);
    const [undefine, setUndefine] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await search(q);
            if (
                res.data.counter.song === 0 &&
                res.data.counter.artist === 0 &&
                res.data.counter.playlist === 0
            )
                setUndefine(true);
            setData(res.data);
            setProgress(100);
        };

        fetch();
    }, []);

    return (
        <>
            {data && !undefine && (
                <div>
                    <div className="mt-12">
                        {data.counter.artists && (
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
                            {data.counter.songs &&
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
                        {data.counter.playlists && (
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
