import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlbumCard } from '../AlbumCard';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function ListPlaylist({ title, data }) {
    return (
        <div className={`mt-6`}>
            <div className={` flex justify-between items-center text-white`}>
                <div className={`pt-2 pb-2`}>
                    <h1 className="font-semibold">{title}</h1>
                </div>
                <div className={`flex items-center`}>
                    <button
                        className={`w-10 h-10 border rounded-full flex items-center justify-center mr-4`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className={`w-10 h-10 border rounded-full flex items-center justify-center`}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div>
                <div className={`flex items-center`}>
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                </div>
            </div>
        </div>
    );
}

export default ListPlaylist;
