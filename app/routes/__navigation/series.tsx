import { series } from "@prisma/client";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { H2 } from "~/components/Elements";

type LoaderData = {
  series: series[];
}

export const loader: LoaderFunction  = async () => {
  const series = await prisma.series.findMany();

  return {series};
}

export default function Series(){
  const {series} = useLoaderData<LoaderData>();

  return (
    <div>
      <H2>シリーズ一覧</H2>
      <ol className="list-decimal pl-10">
        {series.map(serie => (
          <li key={serie.id}>
            <Link to={`/series/${encodeURIComponent(serie.title)}`}>{serie.title}</Link>{' '}
            (<Link to={`/authors/${encodeURIComponent(serie.author)}`}>{serie.author}</Link> 作)
          </li>
        ))}
      </ol>
    </div>
  )
}