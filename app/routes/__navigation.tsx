import { Form, Link, LoaderFunction, Outlet, useLoaderData, useLocation } from "remix";
import { prisma } from "~/db.server";
import { H1 } from "~/components/Elements";
import { VFC } from "react";

type LoaderData = {
  count: number;
}

export const loader: LoaderFunction = async () => {
  const count = await prisma.list.count();

  return { count };
};

export default function Navigation() {
  const { count } = useLoaderData<LoaderData>();
  const searchParams = new URLSearchParams(useLocation().search);

  return (
    <div>
      <H1><Link to={"/"}>スーパー正男</Link></H1>
      <Nav count={count} />
      <Form action="/search">
        <label>
          キーワード<input type="text" name="q" defaultValue={searchParams.get("q") ?? ""} />
        </label>
        <label>
          作者<input type="text" name="author" defaultValue={searchParams.get("author") ?? ""} />
        </label>
        <button>検索</button>
      </Form>
      <Outlet />
      <Nav count={count} />
    </div>
  );
}

type NavProps = {
  count: number;
}
const Nav: VFC<NavProps> = ({ count }) => {
  return (
    <>
      <hr />
      <ul>
        {[...Array(Math.ceil(count / 100))].map((_, i) => (
          <li key={i} className="inline">
            <Link to={`/${i}`}>{`${(i+1).toString().padStart(2, "0")}`}</Link>{" "}
          </li>
        ))}
      </ul>
      <ul className="flex gap-1">
        <li>
          <Link to="/series">シリーズ一覧</Link>
        </li>
        <li>
          <Link to="/authors">作者一覧</Link>
        </li>
        <li>
          <Link to="/random">ランダム</Link>
        </li>
        <li>
          <Link to="/ranking">ランキング</Link>
        </li>
      </ul>
      <hr />
    </>
  );
};