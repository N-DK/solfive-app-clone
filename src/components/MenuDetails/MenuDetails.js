import HeadlessTippy from '@tippyjs/react/headless';
import { MenuDetailsItem } from '../MenuDetailsItem';
import styles from './MenuDetails.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MenuDetails({ children, items, visible = false, hide }) {
    return (
        <div>
            <HeadlessTippy
                placement="top-start"
                interactive
                visible={visible}
                render={(attrs) => (
                    <div
                        className={`${cx('container')} pt-4 pb-4 rounded w-max`}
                        tabIndex="-1"
                        {...attrs}
                    >
                        {items?.map((item, index) => (
                            <MenuDetailsItem
                                key={index}
                                title={item?.title}
                                icon={item?.icon}
                                handle={item?.handle}
                            />
                        ))}
                    </div>
                )}
                onClickOutside={hide}
            >
                {children}
            </HeadlessTippy>
        </div>
    );
}

export default MenuDetails;
