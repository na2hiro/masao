import { ranking } from "@prisma/client";
import { VFC } from "react";

type Props = {
  scores: ranking[];
}
const RankingTable: VFC<Props> = ({ scores }) => {
  let tieCount = 0;
  let lastScore = Infinity;

  return (
    <table border="1">
      <thead>
      <tr>
        <th>順位</th>
        <th>名前</th>
        <th>得点</th>
        <th>コメント</th>
        <th>登録日時</th>
      </tr>
      </thead>
      <tbody>
      {scores.map((score, baseRank) => {
        let rank;
        if (score.score === lastScore) {
          tieCount++;
          rank = baseRank + 1 - tieCount;
        } else {
          tieCount = 0;
          rank = baseRank + 1;
          lastScore = score.score;
        }
        return (
          <tr key={score.id}>
            <td>{rank}</td>
            <td>{score.guestname}</td>
            <td>{score.score}</td>
            <td>{score.comment}</td>
            <td>{new Date(score.date * 1000).toLocaleDateString("ja")} {new Date(score.date * 1000).toLocaleTimeString("ja")}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};


export default RankingTable;