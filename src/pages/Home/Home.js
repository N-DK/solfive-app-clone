import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ListPlaylist } from '~/components/ListPlaylist';
import { Trending } from '~/components/Trending';
import { useEffect, useState } from 'react';
import { getHome } from '~/service';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getHome();
            setData(res.data.data);
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
