import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ListPlaylist } from '~/components/ListPlaylist';
import { Trending } from '~/components/Trending';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <div>
                <ListPlaylist title={'Solfive đề xuất cho bạn'} />
                <Trending />
                <ListPlaylist title={'Chill'} />
                <ListPlaylist title={'Nhạc Remix cực bốc'} />
                <ListPlaylist title={'Top 100'} />
                <ListPlaylist title={'Album Hot'} />
            </div>
        </div>
    );
}

export default Home;
