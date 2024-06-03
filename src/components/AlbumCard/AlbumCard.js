import styles from './AlbumCard.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AlbumCard() {
    return (
        <div className={`mr-4 w-44`}>
            <div className={` rounded overflow-hidden w-44 h-44`}>
                <img
                    className="w-full h-full"
                    src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/4/5/4/9/45493e859cde749c75fb4377c14d0db3.jpg"
                />
            </div>
            <Link
                to={`/playlist?id=${'ZOCIIUWW'}`}
                className={`${cx('name')} text-white mt-4 block leading-normal`}
            >
                Nhạc Lofi Chill Gây Nghiện
            </Link>
            <p className={`${cx('artists')} text--primary-color text-sm mt-2 truncate`}>
                <Link to={'/artist?id=Kai-Dinh'}>Hoài Lâm, </Link>
                <Link>Hoài Lâm, </Link>
                <Link>Hoài Lâm, </Link>
                <Link>Hồ Quan Hiếu</Link>
            </p>
        </div>
    );
}

export default AlbumCard;
