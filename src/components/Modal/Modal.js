import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Modal({ open, onClose, children }) {
    return (
        <div
            onClick={onClose}
            className={`
          fixed inset-0 flex justify-center items-center transition-colors
          ${open ? 'visible bg-black/20' : 'invisible'}
        `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
            rounded shadow transition-all w-max ${cx('bg')}
            ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
          `}
            >
                <p className="text-lg font-semibold text-white p-2 pl-4">Đăng nhập</p>
                {children}
            </div>
        </div>
    );
}

export default Modal;
