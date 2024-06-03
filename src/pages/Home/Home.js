import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div>
            <h1 className={`${cx('test')} text-cyan-100`}>Hello world!</h1>
        </div>
    );
}

export default Home;
