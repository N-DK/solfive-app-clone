const {
    faChevronLeft,
    faChevronRight,
} = require('@fortawesome/free-solid-svg-icons');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { Link } = require('react-router-dom');

const TrendingItem = () => {
    return (
        <Link>
            <div>
                <div
                    className={`w-80 h-44 mr-6 rounded flex justify-center items-center overflow-hidden cursor-pointer`}
                >
                    <img
                        className="w-full h-full"
                        src="https://photo-zmp3.zmdcdn.me/banner/e/0/e/5/e0e5e9a36cf8d9d3c92957c339ce533b.jpg"
                    />
                </div>
            </div>
        </Link>
    );
};

function Trending() {
    return (
        <div className={`mt-6`}>
            <div className={` flex justify-between items-center text-white`}>
                <div className='pt-2 pb-2'>
                    <h1 className="font-semibold">Thịnh hành</h1>
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
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                </div>
            </div>
        </div>
    );
}

export default Trending;
