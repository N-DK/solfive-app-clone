import { ListArtist } from '~/components/ListArtist';
import { ListPlaylist } from '~/components/ListPlaylist';
import { SongItem } from '~/components/SongItem';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';

const { useState, useEffect, useContext } = require('react');
const { useQuery } = require('~/hooks');
const { search } = require('~/service');

function Search() {
    const [data, setData] = useState();
    const query = useQuery();
    const q = query.get('q');
    const { setProgress } = useContext(DefaultContext);

    useEffect(() => {
        const fetch = async () => {
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await search(q);
            console.log(res.data);
            setData(res.data);
            setProgress(100);
        };

        fetch();
    }, []);

    return (
        <>
            {data && (
                <div>
                    <div className="mt-12">
                        <ListArtist
                            data={data['artists']}
                            title={'Nghệ sỹ'}
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
                            {data['songs'].map((item, index) => (
                                <SongItem
                                    key={index}
                                    data={item}
                                    playListId={item?.album?.encodeId}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <ListPlaylist
                            data={data['playlists']}
                            title={'Danh sách phát'}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Search;
