import { LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { H3 } from "~/components/Elements";


type LoaderData = {
  rankings: {
    count: number;
    guestname: string;
  }[];
}

export const loader: LoaderFunction = async () => {
  const rankings = await prisma.$queryRaw`
SELECT COUNT(distinct gameid) as count, guestname
FROM ranking
WHERE score >= 100
GROUP BY guestname
ORDER BY count DESC
LIMIT 50`;

  return { rankings };
};

export default function Best50() {
  const { rankings } = useLoaderData<LoaderData>();

  return (
    <>
      <H3>ランクイン数ベスト50</H3>
      <ol className="list-decimal pl-10">
        {rankings.map(({ guestname, count }) => {
          return <li>{guestname} ({count})</li>;
        })}
      </ol>
    </>
  );
}