import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import {
    faBackwardStep,
    faCaretDown,
    faCaretUp,
    faEllipsisV,
    faForwardStep,
    faHeart,
    faPause,
    faPlay,
    faRepeat,
    faShuffle,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPlayerOpened, setIsPlayerOpened] = useState(
        location.pathname.includes('/player'),
    );
    const [navigationHistory, setNavigationHistory] = useState([]);

    useEffect(() => {
        setNavigationHistory((prevHistory) => [
            ...prevHistory,
            location.pathname,
        ]);
    }, [location]);

    const handleOpenPlayer = () => {
        if (!isPlayerOpened) {
            navigate(`/player?id=Z7IBO8FC&listId=6I8UAFZA`);
            setIsPlayerOpened(true);
        } else {
            if (navigationHistory.length > 2) {
                navigate(-1);
            } else {
                navigate('/');
            }
            setIsPlayerOpened(false);
        }
    };

    return (
        <div onClick={handleOpenPlayer}>
            <div
                className={`${cx(
                    'wrapper',
                )} fixed bottom-0 left-0 right-0 flex items-center justify-between pr-6 pl-6`}
            >
                {/* Controls */}
                <div className="flex items-center text-white">
                    <button className="text-2xl w-10 h-10 rounded-full">
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    <button className="text-3xl w-14 h-14 mr-6 ml-6 rounded-full">
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    {/* <button>
                        <FontAwesomeIcon icon={faPause} />
                    </button> */}
                    <button className="text-2xl w-10 h-10 rounded-full">
                        <FontAwesomeIcon icon={faForwardStep} />
                    </button>
                    <p className="ml-8 text-sm text--primary-color">
                        <span>0:00 / </span>
                        <span>03:14</span>
                    </p>
                </div>
                {/* Song */}
                <div className={` flex items-center flex-1 justify-center`}>
                    <div className={`rounded overflow-hidden w-11 h-11 mr-3`}>
                        <img
                            className="w-full h-full"
                            src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/banner/4/a/e/1/4ae1d8230755ee0fbe1acff06048324e.jpg"
                        />
                    </div>
                    <div className="mr-4">
                        <p className="text-white text-base font-semibold pb-1">
                            Trái đất ôm mặt trời
                        </p>
                        <p className="text--primary-color">
                            <Link>Kai Đinh, </Link>
                            <Link>GREY D, </Link>
                            <Link>Hoàng Thùy Linh</Link>
                        </p>
                    </div>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3"
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl lex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                </div>
                {/* Details */}
                <div className="flex items-center">
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </button>
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faRepeat} />
                    </button>
                    <button className="rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center mr-3">
                        <FontAwesomeIcon icon={faShuffle} />
                    </button>
                    <button
                        className={`${cx(
                            `${
                                isPlayerOpened
                                    ? 'isPlayerOpened'
                                    : 'isPlayerClosed'
                            }`,
                        )} rounded-full w-10 h-10 text--primary-color text-xl flex justify-center items-center`}
                    >
                        <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
