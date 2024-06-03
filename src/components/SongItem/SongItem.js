import { Link } from 'react-router-dom';
import styles from './SongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SongItem({ size = 'large' }) {
    const isLarge = size === 'large';

    return (
        <div className={`${cx('wrapper')} text-white pt-2 pb-2`}>
            <div className={`${cx('container')} flex items-center`}>
                <div className={`flex-1`}>
                    <div className={`flex items-center `}>
                        <div className="w-10 h-10 rounded overflow-hidden mr-2 relative">
                            <img
                                className="w-full h-full"
                                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/4/f/b/9/4fb924899d76d856fab409c930dd454c.jpg"
                            />
                            <button
                                className={`${cx(
                                    'details',
                                    'btn_play',
                                )} absolute top-0 left-0 right-0 bottom-0 bg-opacity-60`}
                            >
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                        </div>

                        {!isLarge ? (
                            <div>
                                <p className={`font-semibold`}>3 1 0 7</p>
                                <p className={`text--primary-color`}>
                                    <Link>Duongg, </Link>
                                    <Link>Nau, </Link>
                                    <Link>W/N</Link>
                                </p>
                            </div>
                        ) : (
                            <p className={`font-semibold`}>3 1 0 7</p>
                        )}
                    </div>
                </div>
                <div className={`flex-1 relative`}>
                    <div
                        className={`flex items-center ${
                            isLarge ? 'justify-between' : 'justify-end'
                        } text--primary-color text-sm`}
                    >
                        {isLarge && (
                            <p className={`text--primary-color`}>
                                <Link>Duongg, </Link>
                                <Link>Nau, </Link>
                                <Link>W/N</Link>
                            </p>
                        )}
                        <p>03:52</p>
                        <div
                            className={`${cx('details')} absolute right-${
                                isLarge ? 12 : 0
                            } flex items-center bg-black`}
                        >
                            <button
                                className={`${cx(
                                    'btn',
                                )} flex items-center justify-center text-white text-xl w-10 h-10 text--primary-color rounded-full mr-2`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button
                                className={`${cx(
                                    'btn',
                                )} justify-center text-white text-xl flex items-center w-10 h-10 text--primary-color rounded-full`}
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
