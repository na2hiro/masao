import { H3 } from "~/components/Elements";
import { Form, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";

export const loader: LoaderFunction = async ({request}) => {
  const name = new URL(request.url).searchParams.get("name");
  if(!name) return null;

  const ret: [{count: number}] = await prisma.$queryRaw`
SELECT count(*) as count
FROM ranking LEFT JOIN (
    SELECT gameid, MAX(score) AS max 
    FROM ranking 
    GROUP BY gameid
) AS hoge ON hoge.gameid = ranking.gameid
WHERE score = max AND guestname = ${name}
ORDER BY ranking.gameid
LIMIT 1000`;
  return {name, count: ret[0].count};
}

export default function Individual() {
  const {name, count} = useLoaderData()
  return(
    <>
      <H3>個人の１位獲得数を照会</H3>

      <Form>
        <label>
          名前: <input type="text" name="name" defaultValue={name} />
        </label>
        <button>照会</button>
      </Form>

      {name}さんの１位獲得数: {count}
    </>
  )
}