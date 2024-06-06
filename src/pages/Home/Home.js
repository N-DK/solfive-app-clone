import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ListPlaylist } from '~/components/ListPlaylist';
import { Trending } from '~/components/Trending';
import { useContext, useEffect, useState } from 'react';
import { getHome } from '~/service';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);
    const { setProgress } = useContext(DefaultContext);

    useEffect(() => {
        const fetch = async () => {
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await getHome();
            setData(res?.data?.data);
            setProgress(100);
        };

        fetch();
    }, []);

    return (
        <div>
            <div>
                {data?.items?.map(
                    (section, index) =>
                        section.sectionType !== 'new-release' &&
                        section.title &&
                        section.items &&
                        (section.items.length <= 5 ? (
                            <ListPlaylist
                                key={index}
                                title={section?.title}
                                data={section.items}
                                settings={{
                                    dots: false,
                                    infinite: false,
                                    speed: 500,
                                    slidesToShow: 5,
                                    slidesToScroll: 1,
                                    arrows: false,
                                }}
                            />
                        ) : (
                            <ListPlaylist
                                key={index}
                                title={section?.title}
                                data={section.items}
                            />
                        )),
                )}
            </div>
        </div>
    );
}

export default Home;
