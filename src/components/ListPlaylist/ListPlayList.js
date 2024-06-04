import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlbumCard } from '../AlbumCard';
import Slider from 'react-slick';
import styles from './ListPlaylist.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const _settings_ = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
};

function ListPlaylist({ title, data, settings = _settings_ }) {
    const slider = useRef(null);
    return (
        <div className={`mt-6`}>
            <div className={` flex justify-between items-center text-white`}>
                <div className={`pt-2 pb-2`}>
                    <h1 className="font-semibold text-2xl">{title}</h1>
                </div>
                <div className={`flex items-center`}>
                    <button
                        onClick={() => slider?.current?.slickPrev()}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center mr-2`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={() => slider?.current?.slickNext()}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center`}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div>
                {/* <div className={`flex items-center`}>
                    {data?.map((item, index) => (
                        <AlbumCard key={index} data={item} />
                    ))}
                </div> */}
                <Slider ref={slider} {...settings}>
                    {data?.map((item, index) => (
                        <AlbumCard key={index} data={item} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ListPlaylist;
