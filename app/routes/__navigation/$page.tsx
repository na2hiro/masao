import { list } from "@prisma/client";
import { LoaderFunction, useLoaderData, useParams } from "remix";
import { prisma } from "~/db.server";
import GameTable from "~/components/GameTable";

type LoaderData = {
  games: list[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const page = Number(params.page);
  if (isNaN(page)) throw new Response("Invalid page", { status: 400 });
  const games = await prisma.list.findMany({
    where: {
      id: {
        gt: page * 100,
        lte: (page + 1) * 100
      }
    }
  });
  return { games };
};

export default function Page() {
  const { page } = useParams();

  const { games } = useLoaderData<LoaderData>();

  return (
    <div>
      <GameTable games={games}>
        その{Number(page) + 1}
      </GameTable>
    </div>
  );
}