
interface MovieDetails {
  title: string;
}

interface MovieTitleProps {
  movieDetails: MovieDetails | null;
}

export default function MovieTitle({ movieDetails }: MovieTitleProps) {
  return (
    <div className="h-fit">
        <h1 className="text-[#FF3131] text-md sm:text-4xl font-bold ml-3 sm:ml-5 ">{movieDetails?.title}</h1>
    </div>
  );
}
