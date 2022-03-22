import { Link, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { H3 } from "~/components/Elements";
import { idToPath, idToString } from "~/utils";

export const loader: LoaderFunction = async () => {
  const scores = await prisma.ranking.findMany({
    select: {
      id: true,
      guestname: true,
      game: {
        select: {
          id: true,
          title: true,
        },
      }
    },
    orderBy: {
      date: "desc",
    },
    take: 20
  });

  return {scores};
}

export default function Recent() {
  const {scores} = useLoaderData();

  return (
    <>
      <H3>最近プレイされた20の正男</H3>
      <ol className="list-decimal pl-10">
        {scores.map(score => (
          <li key={score.id}>
            {idToString(score.game.id)} 「<Link to={idToPath(score.game.id)}>{score.game.title}</Link>」
            played by {score.guestname}
          </li>
        ))}
      </ol>
    </>
  )
}