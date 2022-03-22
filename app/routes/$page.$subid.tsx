import { Link, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { list, ranking } from "@prisma/client";
import RankingTable from "~/components/RankingTable";
import { H1 } from "~/components/Elements";

type LoaderData = {
  game: list & { ranking: ranking[] }
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.page) * 100 + Number(params.subid);
  if (isNaN(id)) throw new Response("invalid id", { status: 400 });

  const game = await prisma.list.findUnique({
    where: {
      id
    },
    include: {
      ranking: {
        take: 5,
        orderBy: [
          { score: "desc" },
          { id: "desc" }
        ]
      }
    }
  });
  if (!game) throw new Response("game not found", { status: 404 });

  return {
    game
  };
};

export default function Game() {
  const {game} = useLoaderData<LoaderData>();

  return (
    <div>
      <H1>{game.title}</H1>
      <p>{game.comment}</p>
      <p>{game.author}</p>

      TODO: render game itself after importing from php files

      <RankingTable scores={game.ranking} />
      <Link to="ranking">すべてのランキングを表示</Link>
    </div>
  );
}