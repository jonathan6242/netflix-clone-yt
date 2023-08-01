import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/typings";
import Image from "next/image";
import { useRecoilState } from "recoil";

interface Props {
  movie: Movie;
  // movie: Movie || DocumentData
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative scrollbar-hide h-28 min-w-[180px] cursor-pointer duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill={true}
        sizes="100vw"
        alt=""
      />
    </div>
  );
}
export default Thumbnail;
