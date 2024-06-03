import { SongItem } from '~/components/SongItem';
import styles from './Player.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const NextInPlayList = () => {
    return (
        <div>
            <div
                className={`${cx(
                    'playlist_name',
                )} flex items-center justify-between text--primary-color p-3 text-sm`}
            >
                <p>25/44</p>
                <p>Playlist ‧ Nhạc Hoa Lời Việt Nhẹ Nhàng</p>
            </div>
            <div className={`${cx('list-results')}`}>
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
                <SongItem size="medium" />
            </div>
        </div>
    );
};

const Lyric = () => {
    return (
        <div className='text-white leading-8'>
            <p>I wanna be with you</p>
            <p>And I wanna stay with you</p>
            <p>Just like the stars shining bright</p>
            <p>You're glowing once more</p>
            <p>Right here beside you, I'm still</p>
            <p>Walking wherever you go</p>
        </div>
    );
};

const tabs = [
    { id: 0, title: 'Tiếp theo', component: NextInPlayList },
    { id: 1, title: 'Lời Nhạc', component: Lyric },
    { id: 2, title: 'Liên quan' },
];

function Player() {
    const tabFirst = useRef(null);
    const line = useRef(null);
    const [tabActive, setTabActive] = useState(null);
    const [component, setComponent] = useState(NextInPlayList);

    useEffect(() => {
        if (tabActive && line.current) {
            const { offsetWidth, offsetLeft } = tabActive;
            line.current.style.width = `${offsetWidth}px`;
            line.current.style.transform = `translateX(${offsetLeft}px)`;
        }
    }, [tabActive]);

    useEffect(() => {
        if (tabFirst.current) {
            setTabActive(tabFirst.current);
        }
    }, [tabFirst]);

    return (
        <div
            className={`${cx(
                'wrapper',
            )} mt-20 fixed right-0 flex justify-between pr-48 pl-48 top-0`}
        >
            <div className={`${cx('container')} flex items-start`}>
                <div className={`w-7/12 mr-6 relative`}>
                    <div
                        style={{
                            backdropFilter: 'blur(5px)',
                            filter: 'blur(5px)',
                        }}
                        className={`mt-11`}
                    >
                        <img
                            className="w-full"
                            src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/1/6/9/b169724fb0b92bc70ee6ea2e5f9f4ef9.jpg"
                        />
                    </div>
                    <div className=" absolute flex items-center justify-center w-full h-full top-0 left-0">
                        <div className={`${cx('img_small')} h-1/2`}>
                            <img
                                className="h-full w-full"
                                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/1/6/9/b169724fb0b92bc70ee6ea2e5f9f4ef9.jpg"
                            />
                        </div>
                    </div>
                </div>
                <div className={`w-5/12`}>
                    {/* Tab */}
                    <div className="flex items-center text-white relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={(e) => {
                                    setTabActive(e.target);
                                    setComponent(tab.component);
                                }}
                                ref={tabFirst}
                                className={`${cx(
                                    'tabs',
                                )} uppercase flex-1 h-11 text-sm font-semibold text--primary-color`}
                            >
                                {tab.title}
                            </button>
                        ))}
                        {/* <button
                            onClick={(e) => setTabActive(e.target)}
                            className={`${cx(
                                'tabs',
                            )} uppercase flex-1 h-11 text-sm font-semibold text--primary-color`}
                        >
                            Lời nhạc
                        </button>
                        <button
                            onClick={(e) => setTabActive(e.target)}
                            className={`${cx(
                                'tabs',
                            )} uppercase flex-1 h-11 text-sm font-semibold text--primary-color`}
                        >
                            liên quan
                        </button> */}
                        <span ref={line} className={`${cx('line')}`}></span>
                    </div>
                    <div>{component}</div>
                </div>
            </div>
        </div>
    );
}

export default Player;
