import { Link, Outlet } from "remix";
import { H2, H3 } from "~/components/Elements";

export default function Ranking() {
  return (
    <div>
      <H2>ランキングまとめ</H2>
      <H3>メニュー</H3>
      <ul className="list-disc pl-10">
        <li><Link to="/ranking">最近プレイされた20の正男</Link></li>
        <li><Link to="best-50">ランクイン数ベスト50</Link></li>
        <li><Link to="individual">個人の１位獲得数を照会</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}