import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";

type SearchParams = {
  page: number;
  pageSize: number;
};

type Character = {
  url: string;
  name: string;
  gender: string;
  titles: string[];
  aliases: string[];
};


export function Characters() {
  const [searchParams] = useSearchParams();

  const params: SearchParams = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 5,
  };

  const enablePreviousButton = (params.page ? params.page > 1 : false);

  const { data, isLoading } = useQuery({
    queryKey: ["characters", params],
    queryFn: async () => {
      const response = await fetch(`https://anapioficeandfire.com/api/characters?page=${params.page}&pageSize=${params.pageSize}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data: Character[] = await response.json();
        return data;
      }
    }
  });

  if (data) {
    return (
      <>
        <h2 className="text-2xl font-bold">Characters</h2>
        <p className="mb-3">A list of all characters:</p>
        {data.map((character) => {
          const id = character.url.split('/').at(-1);
          return (
            <div key={`character-${id}`} className="border-black border-2 rounded-md mb-4 p-2 w-150">
              <p>Name: {character.name}</p>
              <p>Gender: {character.gender}</p>
              <p>Culture: {character.aliases.length > 0 ? character.aliases[0] : 'None'}</p>
              <Link type="button" to={`/characters/${id}`} className="bg-gray-300 border-1 border-black rounded-md p-1 my-1 w-25 inline-block">View details</Link>
            </div>
          );
        })}
        <div className="w-150 text-center">
          <Link
            className="bg-gray-300 border-1 border-black rounded-md p-2 m-1 w-20"
            style={{
              pointerEvents: enablePreviousButton ? "auto" : "none",
            }}
            to={enablePreviousButton ? `/characters?page=${params.page - 1}` : "/characters"}>Previous
          </Link>
          <Link type="button"
            className="bg-gray-300 border-1 border-black rounded-md p-2 m-1 w-20"
            to={params.page ? `/characters?page=${+params.page + 1}` : "/characters?page=2"}>Next
          </Link>
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <h2 className="text-2xl font-bold">Characters</h2>
        <p className="mb-3">Loading</p>
      </>
    );

  } else {
    return (
      <>
        <h2 className="text-2xl font-bold">Characters</h2>
        <p className="mb-3">We could not load the characters.</p>
      </>
    );
  }
};
