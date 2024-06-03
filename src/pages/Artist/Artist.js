import { SongItem } from '~/components/SongItem';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ListPlaylist } from '~/components/ListPlaylist';

const cx = classNames.bind(styles);

function Artist() {
    return (
        <div className={`${cx('wrapper')} text-white`}>
            <div className={`${cx('container')}`}>
                <div className={`${cx('')} mt-16`}>
                    <div>
                        <h1 className={`${cx('')} mb-10 font-semibold`}>
                            Kai Đinh
                        </h1>
                        <p className="pb-2">Quốc gia: Việt Nam</p>
                        <p className="pb-2">Tên Thật: Đinh Lê Hoàng Vỹ</p>
                        <p className="pb-2">Năm sinh: 17/10/1992</p>
                        <div>
                            <p className="leading-6">
                                Kai tốt nghiệp đại học chuyên ngành Quản trị
                                Kinh doanh Quốc tế tại một trường Đại học ở Anh
                                Quốc. Ngày về nước, Kai tìm cho mình một công
                                việc an toàn, ổn định như bao người trẻ khác,
                                cho một tập đoàn lớn. Tuy nhiên, không thỏa đam
                                mê, Kai đã tìm đến với âm nhạc. Kai bắt đầu tập
                                tành sáng tác từ năm 13 tuổi. Là một
                                singer-songwriter trẻ, Kai Đinh được biết đến
                                khi tham gia 5 mùa chương trình Bài Hát Việt năm
                                từ năm 2011-2015. Ca khúc Cuối Đường của Kai
                                Đinh đã đạt giải “Bình chọn của Hội đồng các nhà
                                sản xuất âm nhạc” trong đêm Gala năm 2012 của
                                chương trình Bài Hát Việt, Đã từng đạt được các
                                giải thưởng "Bài hát do Hội đồng các nhà sản
                                xuất âm nhạc bình chọn gala năm 2012", "Ca sĩ
                                thể hiện hiệu quả", "Bài hát được khán giả bình
                                chọn",... Tháng 12/2013 release single đầu tiên
                                Tinh Cầu Cô Đơn. Ca khúc phổ biến nhất của Kai
                                là Như Loài Mèo - song ca với Tạ Quang Thắng,
                                thường được sử dụng trong các cuộc thi hát dành
                                cho trẻ em. Sau những sản phẩm nhỏ lẻ, Kai Đinh
                                chỉ thật sự mới bắt đầu tập trung viết nhạc từ
                                đầu năm 2015, sau khi quyết định tạm dừng công
                                việc kinh doanh. Các bài hát Kai Đinh đã viết
                                cho các nghệ sĩ khác: Điều Buồn Tênh - Quang
                                Vinh, Người Ta Nói - Trung Quân Idol, Stay With
                                Me - Chi Pu (nhạc phim Yêu), Cô Đơn - Jun Phạm
                                (nhạc phim Vẽ Đường Cho Yêu Chạy), Love Me More
                                - Gil Lê (nhạc phim Tỉnh Giấc Tôi Thấy Mình
                                Trong Ai), và một số ca khúc sắp phát hành trong
                                thời gian tới như Gọi Tên Em - Min, Đường Một
                                Chiều - Ái Phương. Từ năm 2015, Kai Đinh dần
                                khẳng định tên tuổi của mình với tư cách là một
                                ca sĩ với chất riêng được thể hiện qua các bài
                                hát lãng mạn do chính mình sáng tác và được các
                                bạn trẻ yêu thích như Điều Buồn Nhất, Phải Có
                                Em, Đừng Xa Anh. Nổi bật nhất trong số sáng tác
                                của Kai Đinh có lẽ là hai bản hit dành cho MIN:
                                Gọi Tên Em và Có Em Chờ, là số ít những bài hát
                                mang tính tích cực thay vì âu sầu, buồn bã, tâm
                                trạng gắn với Kai Đinh, dù mới chỉ tung teaser
                                đã nhận được hơn 50.000 lượt share, hơn 2,7
                                triệu lượt xem. Với Kai Đinh, âm nhạc phải lấy
                                cảm hứng từ các chất liệu cuộc sống và mang tính
                                cá nhân để khán giả có thể dễ dàng đồng cảm
                                nhưng cũng không đánh mất nét riêng của người
                                nghệ sĩ. Không coi trọng các chiêu trò đánh bóng
                                tên tuổi, Kai Đinh thu hút các khán giả bằng
                                chính năng lực và niềm đam mê âm nhạc của mình.
                                Giải thưởng Giải "Bình chọn của Hội đồng các nhà
                                sản xuất âm nhạc" tại Gala Bài hát Việt năm 2012
                                cho bài hát Cuối Đường Giải "Bài hát của tháng"
                                tại Gala Bài Hát Việt tháng 5/2015 cho bài hát
                                Đồng Dao Mùa Hè Giải "Bài hát được yêu thích
                                nhất" tại Gala Bài Hát Việt tháng 11/2015 cho
                                bài hát Tìm Nhau Các album đã phát hành: Tinh
                                Cầu Cô Đơn (2013) Như Loài Mèo (Single) (2014)
                                Tìm Nhau (2015) Nam Sinh Nữ Sinh (2016) Đừng Xa
                                Anh (Single) (2016) Phải Có Em (Single) (2017)
                                Điều Buồn Nhất (Single) (2017) Điều Buồn Nhất
                                (Remix) (2017) Chỉ Cần Là Mình Cùng Nhau (Here
                                We Go) (Single) (2017) Mùa Hè Vị Trái Cây
                                (Single) (2017)
                            </p>
                        </div>
                    </div>
                    <p className='font-semibold pt-4 cursor-pointer'>ẨN BỚT</p>
                </div>
                <div className={`${cx('')} mt-12`}>
                    <h1 className="font-semibold">Bài hát</h1>
                    <div>
                        <SongItem />
                        <SongItem />
                        <SongItem />
                        <SongItem />
                        <SongItem />
                        <SongItem />
                        <SongItem />
                    </div>
                    <Link
                        to={`/playlist?id=${'AVNIDLNISD'}`}
                        className={`${cx(
                            'btn-login',
                        )} border text-white p-2.5 text-sm font-semibold rounded-sm mt-3 inline-block`}
                    >
                        Xem tất cả bài hát
                    </Link>
                </div>
                <ListPlaylist title={'Album'} />
            </div>
        </div>
    );
}

export default Artist;
