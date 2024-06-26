import styles from './AlbumCard.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AlbumCard({ data }) {
    return (
        <div className={`w-44`}>
            <Link to={`/playlist?id=${data?.encodeId}`}>
                <div className="w-44 h-44 rounded relative">
                    <div className={` rounded overflow-hidden w-44 h-44`}>
                        <img className="w-full h-full" src={data?.thumbnailM} />
                    </div>
                    <div
                        className={`card_backdrop
                        duration-300 transition-all opacity-0 top-0 rounded absolute w-full h-full cursor-pointer bg-gradient-to-b from-from-body-bg-gradiant to-transparent
                    `}
                    ></div>
                </div>
            </Link>
            <div className="h-24 mt-4">
                <Link
                    to={`/playlist?id=${data?.encodeId}`}
                    className={`${cx(
                        'name',
                    )} text-white leading-normal inline-block`}
                >
                    {data?.title}
                </Link>
                <p
                    className={`${cx(
                        'artists',
                    )} text--primary-color text-sm mt-2 truncate`}
                >
                    {data?.artists?.length > 1 ? (
                        data?.artists?.map((artist, index) => (
                            <Link key={index} to={`/artist?id=${artist.alias}`}>
                                {artist.name ===
                                data.artists[data.artists.length - 1].name
                                    ? artist.name
                                    : `${artist.name}, `}
                            </Link>
                        ))
                    ) : (
                        <>{data?.artistsNames}</>
                    )}
                </p>
            </div>
        </div>
    );
}

export default AlbumCard;
