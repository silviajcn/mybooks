import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { useLibraryStore } from '../../hooks';

export const ReadingSection = ({ onBookClick }) => {
    const { books } = useLibraryStore();
    const readingBooks = books.filter(book => book.status === 'Leyendo');

    return (
      <div className="bg-white border border-[#EFE6DD] rounded-[10px] h-[300px] shadow flex flex-row relative transition-all duration-300 w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-center py-4 px-2 bg-[#EFE6DD] border-r-2 border-[#EFE6DD] rounded-l-[10px] mr-4">
          <span
            className="text-[1.2rem] text-gray-800 font-bold"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Leyendo
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <Swiper
            slidesPerView={2}
            spaceBetween={0}
            breakpoints={{
              500: { slidesPerView: 1, spaceBetween: 0 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 4, spaceBetween: 10 },
              1024: { slidesPerView: 5, spaceBetween: 10 },
              1280: { slidesPerView: 5, spaceBetween: 10 },
              1536: { slidesPerView: 6, spaceBetween: 0 },
            }}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {readingBooks.map((book) => (
              <SwiperSlide key={book._id}>
                <div className="bg-indigo-50 rounded-2xl flex justify-center items-center w-[120px] h-[180px] mx-auto">
                  <img
                    src={book.cover}
                    alt={`Portada de ${book.title}`}
                    className="w-full h-full object-cover rounded-[4px] shadow-[4px_4px_3px_0_rgba(0,0,0,0.15)] cursor-pointer"
                    onClick={() => onBookClick(book)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
};