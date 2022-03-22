import { Link, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { list } from "@prisma/client";
import { H2} from "~/components/Elements";
import { idToPath } from "~/utils";
import GameTable from "~/components/GameTable";

const COUNT_PER_PAGE = 20;

type LoaderData = {
  games?: list[],
  count?: number,
  q: string,
  author: string,
}

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  let q = searchParams.get("q");
  let author = searchParams.get("author");
  if(typeof q !== "string" || typeof author !== "string") {
    throw new Response("Invalid search params", { status: 400 });
  }
  q = q.trim();
  author = author.trim();

  if(q ==="" && author === "") {
    return {
      q,
      author,
    };
  }

  let page = Number(searchParams.get("page"));
  if (isNaN(page)) page = 0;

  const games = await prisma.list.findMany({
    where: {
      OR: {
        title: {
          contains: q
        },
        comment: {
          contains: q
        },
      },
      author: {
        contains: author
      }
    },
    take: COUNT_PER_PAGE,
    skip: page * COUNT_PER_PAGE
  });
  const count = await prisma.list.count({
    where: {
      title: {
        contains: q
      },
      author: {
        contains: author
      }
    }
  });

  return { games, count, q, author };
};

export default function Search() {
  const { games , count, q, author} = useLoaderData<LoaderData>();

  if(!games || !count) {
    return <Description />;
  }

  return (
    <>
      <GameTable totalCount={count} countPerPage={COUNT_PER_PAGE} games={games}>
        {q} {author ? ` (${author})` : ""}の検索結果
      </GameTable>
    </>
  );
}

const Description = () =>{
  return (
    <h1>正男検索について</h1>
  )
}