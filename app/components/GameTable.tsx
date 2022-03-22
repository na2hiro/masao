import { Link } from "remix";
import { H2 } from "~/components/Elements";
import { idToPath, idToString } from "~/utils";
import { list } from "@prisma/client";
import { FC, VFC } from "react";

type Props = {
  totalCount?: number,
  countPerPage?: number,
  games: list[],
}
const GameTable: FC<Props> = ({totalCount, countPerPage, games, children}) => {
  return (
    <>
      {totalCount && countPerPage && <Nav totalCount={totalCount} countPerPage={countPerPage} />}
      <table>
        <thead>
        {!!children && (
          <tr>
            <th colSpan={4}><H2>{children}</H2></th>
          </tr>
        )}
        <tr>
          <th>No.</th>
          <th>ステージ名</th>
          <th>サブタイトル・特徴</th>
          <th>作者</th>
        </tr>
        </thead>
        <tbody>
        {games.map(game => (
          <tr key={game.id}>
            <td>{idToString(game.id)}</td>
            <td><Link to={idToPath(game.id)}>{game.title}</Link></td>
            <td>{game.comment}</td>
            <td><Link to={`/authors/${encodeURIComponent(game.author)}`}>{game.author}</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
      {totalCount && countPerPage && <Nav totalCount={totalCount} countPerPage={countPerPage} />}
    </>
  );
};

export default GameTable;

type NavProps = {
  totalCount: number,
  countPerPage: number,
}
const Nav: VFC<NavProps> = ({totalCount, countPerPage}) => {
  return(
    <p>全{totalCount}件 {[...Array(Math.floor(totalCount / countPerPage))].map((_, idx) => (
      <><Link key={idx} to={`?page=${idx}`}>{idx + 1}</Link>{" "}</>
    ))}</p>
  )
}