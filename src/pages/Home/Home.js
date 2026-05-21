import { ListPlaylist } from '~/components/ListPlaylist';
import { useContext, useEffect, useState } from 'react';
import { getHome } from '~/service';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';

function Home() {
    const [data, setData] = useState([]);
    const { setProgress } = useContext(DefaultContext);

    useEffect(() => {
        let canceled = false;

        const fetch = async () => {
            setProgress(10);
            setProgress(40);
            setProgress(70);
            const res = await getHome();
            if (canceled) return;

            setData(res?.data?.data);
            setProgress(100);
        };

        fetch();

        return () => {
            canceled = true;
        };
    }, [setProgress]);

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
