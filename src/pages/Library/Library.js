import styles from './Library.module.scss';
import classNames from 'classnames/bind';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { DefaultContext } from '~/components/layouts/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function Library() {
    const { setProgress } = useContext(DefaultContext);

    useEffect(() => {
        setProgress(10);
        setProgress(40);
        setProgress(70);
        setTimeout(() => {
            setProgress(100);
        }, 500);
    }, []);

    return (
        <div className="mt-14 text-white">
            <h1 className="font-semibold">Danh sách phát của bạn</h1>
            <div>
                <button className={`h-28 w-28 rounded ${cx('btn_add')}`}>
                    <FontAwesomeIcon icon={faPlus} className="text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default Library;
