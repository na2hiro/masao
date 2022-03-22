import { LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { list, series } from "@prisma/client";
import { H2 } from "~/components/Elements";
import GameTable from "~/components/GameTable";

const COUNT_PER_PAGE = 20;

type LoaderData = {
  games: list[],
  series: series,
  count: number,
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const series = await prisma.series.findFirst({
    where: {
      title: params.title
    }
  });
  if (!series) throw new Response("series not found", { status: 404 });

  let page = Number(new URL(request.url).searchParams.get("page"));
  if (isNaN(page)) page = 0;

  const games = await prisma.list.findMany({
    where: {
      title: {
        contains: series.title_s
      }
    },
    take: COUNT_PER_PAGE,
    skip: page * COUNT_PER_PAGE
  });
  const count = await prisma.list.count({
    where: {
      title: {
        contains: series.title_s
      }
    }
  });

  return { games, count, series };
};

export default function Series() {
  const { games, series, count } = useLoaderData<LoaderData>();
  return (
    <div>
      <H2>シリーズ「{series.title}」</H2>

      <GameTable totalCount={count} countPerPage={COUNT_PER_PAGE} games={games} />
    </div>
  );
}