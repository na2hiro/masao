import { LoaderFunction, redirect } from "remix";
import { prisma } from "~/db.server";
import { idToPath } from "~/utils";

export const loader: LoaderFunction = async () => {
  const count = await prisma.list.count();
  const randomId = Math.floor(Math.random()*count);

  return redirect(idToPath(randomId));
}