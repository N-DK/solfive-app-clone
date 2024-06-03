import styles from './Library.module.scss';
import classNames from 'classnames/bind';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const cx = classNames.bind(styles);

function Library() {
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
