import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlbumCard } from '../AlbumCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { AlbumCardSkeleton, SkeletonBlock } from '~/components/Skeleton';

const _settings_ = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
};

function ListPlaylist({
    title,
    data,
    settings = _settings_,
    isLoading = data == null,
}) {
    const slider = useRef(null);
    const skeletonCount = settings?.slidesToShow ?? _settings_.slidesToShow;
    const skeletonItems = Array.from({ length: skeletonCount });

    return (
        <div className={`mt-6`}>
            <div className={` flex justify-between items-center text-white`}>
                <div className={`pt-2 pb-2`}>
                    {title ? (
                        <h1 className="font-semibold text-2xl">{title}</h1>
                    ) : (
                        <SkeletonBlock className="h-8 w-52" />
                    )}
                </div>
                <div className={`flex items-center`}>
                    <button
                        disabled={isLoading}
                        onClick={() => slider?.current?.slickPrev()}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center mr-2`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => slider?.current?.slickNext()}
                        className={`w-10 h-10 border rounded-full flex items-center justify-center`}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div>
                <Slider ref={slider} {...settings}>
                    {isLoading
                        ? skeletonItems.map((_, index) => (
                              <AlbumCardSkeleton key={index} />
                          ))
                        : data?.map((item, index) => (
                              <AlbumCard key={index} data={item} />
                          ))}
                </Slider>
            </div>
        </div>
    );
}

export default ListPlaylist;
