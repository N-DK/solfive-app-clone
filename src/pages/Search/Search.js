import { ListArtist } from '~/components/ListArtist';
import { ListPlaylist } from '~/components/ListPlaylist';
import { SongItem } from '~/components/SongItem';

const { useState, useEffect } = require('react');
const { useQuery } = require('~/hooks');
const { search } = require('~/service');

function Search() {
    const [data, setData] = useState();

    const query = useQuery();
    const q = query.get('q');

    useEffect(() => {
        const fetch = async () => {
            const res = await search(q);
            setData(res.data);
        };

        fetch();
    }, []);

    return (
        <>
            {data && (
                <div>
                    <div className='mt-12'>
                        <ListArtist data={data['artists']} title={'Nghệ sỹ'} />
                    </div>
                    <div className='mt-12'>
                        <h1 className="font-semibold text-2xl text-white">
                            Bài hát
                        </h1>
                        <div>
                            {data['songs'].map((item, index) => (
                                <SongItem
                                    key={index}
                                    data={item}
                                    playListId={data?.playlistId}
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
