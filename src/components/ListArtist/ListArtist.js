import { Link } from 'react-router-dom';
import styles from './ArtistList.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const _settings_ = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
};

function Artist({ data }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden">
                <img width="100%" height="100%" src={data?.thumbnailM} />
            </div>
            <div className="w-full mt-3">
                <Link
                    to={`/artist?id=${data?.alias}`}
                    className="text-white text-base text-center font-semibold block"
                >
                    {data?.name}
                </Link>
                <p className="text--primary-color text-center block mt-2">
                    {data?.totalFollow} follower
                </p>
            </div>
        </div>
    );
}

function ListArtist({ data, title = 'Nghệ sỹ tương tự' }) {
    const slider = useRef(null);
    return (
        <div className={`${cx('wrapper')}`}>
            <div className="flex justify-between items-center">
                <div className={`pt-2 pb-2`}>
                    <h1 className="font-semibold text-2xl text-white">
                        {title}
                    </h1>
                </div>
                <div className={`flex items-center`}>
                    <button
                        onClick={() => slider?.current?.slickPrev()}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center mr-2 text-white`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={() => slider?.current?.slickNext()}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center text-white`}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div>
                <Slider ref={slider} {..._settings_}>
                    {data?.map((artist, index) => (
                        <Artist key={index} data={artist} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ListArtist;
