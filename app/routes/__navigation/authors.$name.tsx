import { Link, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { idToPath } from "~/utils";
import { list, series } from "@prisma/client";
import { H2, H3 } from "~/components/Elements";
import GameTable from "~/components/GameTable";

const COUNT_PER_PAGE = 20;

type LoaderData = {
  name: string;
  count: number,
  games: list[],
  series: series[],
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const name = params.name!;
  const gameCount = await prisma.list.count({
    where: {
      author: name
    }
  });
  if (gameCount === 0) throw new Response("Uesr not found", { status: 404 });

  let page = Number(new URL(request.url).searchParams.get("page"));
  if (isNaN(page)) page = 0;

  const games = await prisma.list.findMany({
    where: {
      author: name
    },
    take: COUNT_PER_PAGE,
    skip: COUNT_PER_PAGE * page
  });

  const series = await prisma.series.findMany({
    where: {
      author: name
    }
  });

  return { name, count: gameCount, games, series };
};

export default function Authors() {
  const { name, count, games, series } = useLoaderData<LoaderData>();

  return (
    <div>
      <H2>{name} さんの概要</H2>
      <p>
        <Link to="/authors">作者一覧へ戻る</Link>
      </p>

      {series.length > 0 && (
        <>
          <H3>主要シリーズ一覧</H3>
          <ul>
            {series.map(s => (
              <li key={s.id}>
                <Link to={`/series/${encodeURIComponent(s.title)}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <GameTable totalCount={count} countPerPage={COUNT_PER_PAGE} games={games}>
        {name} さんの作品一覧
      </GameTable>

      <p>
        <Link to="/authors">作者一覧へ戻る</Link>
      </p>
    </div>
  );
}