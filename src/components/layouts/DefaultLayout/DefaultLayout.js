import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={`${cx('wrapper')} flex min-h-screen`}>
            <Sidebar />
            <div className={`${cx('')} pl-48 pt-3 pr-48 flex-1 ml-60`}>
                <div className={`${cx('container')} w-full `}>
                    <Header />
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
