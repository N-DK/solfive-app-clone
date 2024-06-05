import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuDetailsItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MenuDetailsItem({ icon, title, handle }) {
    return (
        <div>
            <button
                className={`${cx(
                    'container',
                )} border-none p-4 pl-5 pr-5 text-white flex justify-start items-center w-full`}
                onClick={handle}
            >
                <FontAwesomeIcon icon={icon} className="text-xl text--primary-color" />
                <span className="ml-3">{title}</span>
            </button>
        </div>
    );
}

export default MenuDetailsItem;
