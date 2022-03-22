import { Link, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "~/db.server";
import { H2 } from "~/components/Elements";

type LoaderData = {
  users: {
    author: string,
    _count: number
  }[]
}

export const loader: LoaderFunction = async () => {
  const users = await prisma.list.groupBy({
    by: ['author'],
    _count: true,
    orderBy: {
      _count: {
        author: 'desc'
      }
    },
    having: {
      author: {
        _count: {
          gte: 10
        }
      }
    }
  })

  return {users};
}

export default function Authors() {
  const {users} = useLoaderData<LoaderData>();

  return (
    <div>
      <H2>作者一覧</H2>
      <p>
        スーパー正男の作者一覧です。カッコ内は作品数で、多い順に並んでいます。
      </p>
      <ol className="list-decimal pl-12">
        {users.map(user => (
          <li key={user.author}>
            <Link to={`/authors/${encodeURIComponent(user.author)}`}>{user.author}</Link> <span>({user._count})</span>
          </li>
        ))}
      </ol>
    </div>
  )
}