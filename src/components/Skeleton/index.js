const SkeletonBlock = ({ className = '' }) => (
    <div
        aria-hidden="true"
        className={`animate-pulse rounded bg-white/10 ${className}`}
    />
);

const AlbumCardSkeleton = () => (
    <div className="w-44" aria-hidden="true">
        <SkeletonBlock className="w-44 h-44" />
        <div className="h-24 mt-4">
            <SkeletonBlock className="h-5 w-36 mb-3" />
            <SkeletonBlock className="h-4 w-28" />
        </div>
    </div>
);

const ArtistItemSkeleton = () => (
    <div
        className="flex flex-col justify-center items-center"
        aria-hidden="true"
    >
        <SkeletonBlock className="w-40 h-40 rounded-full" />
        <div className="w-full mt-3 flex flex-col items-center">
            <SkeletonBlock className="h-5 w-28 mb-3" />
            <SkeletonBlock className="h-4 w-20" />
        </div>
    </div>
);

const SongItemSkeleton = ({ size = 'large' }) => {
    const isLarge = size === 'large';

    return (
        <div
            className="text-white p-2 bg-black border-b border-[#171717]"
            aria-hidden="true"
        >
            <div className="flex items-center">
                <div className={`${isLarge ? 'flex-1' : ''}`}>
                    <div className="flex items-center">
                        <SkeletonBlock className="w-10 h-10 mr-2" />
                        <div>
                            <SkeletonBlock
                                className={`h-5 ${
                                    isLarge ? 'w-44' : 'w-36'
                                }`}
                            />
                            {!isLarge && (
                                <SkeletonBlock className="h-4 w-28 mt-2" />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div
                        className={`flex items-center ${
                            isLarge ? 'justify-between' : 'justify-end'
                        }`}
                    >
                        {isLarge && <SkeletonBlock className="h-4 w-40" />}
                        <SkeletonBlock className="h-4 w-12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlaylistHeroSkeleton = () => (
    <div className="flex" aria-hidden="true">
        <SkeletonBlock className="w-64 h-64 mr-8" />
        <div className="flex flex-col justify-between flex-1">
            <SkeletonBlock className="h-9 w-72 mt-4" />
            <div>
                <div className="mt-10">
                    <SkeletonBlock className="h-5 w-44 mb-4" />
                    <SkeletonBlock className="h-5 w-56 mb-4" />
                    <SkeletonBlock className="h-4 w-full max-w-xl" />
                </div>
                <div className="flex items-center mt-3">
                    <SkeletonBlock className="h-10 w-40 rounded-full mr-4" />
                    <SkeletonBlock className="h-10 w-10 rounded-full" />
                </div>
            </div>
        </div>
    </div>
);

export {
    AlbumCardSkeleton,
    ArtistItemSkeleton,
    PlaylistHeroSkeleton,
    SkeletonBlock,
    SongItemSkeleton,
};
