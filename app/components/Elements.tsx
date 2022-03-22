import { FC } from "react";

export const H1: FC<{}> = ({children}) => (
  <h1 className="text-4xl font-bold">{children}</h1>
)

export const H2: FC<{}> = ({children}) => (
  <h2 className="text-2xl font-bold">{children}</h2>
)

export const H3: FC<{}> = ({children}) => (
  <h3 className="text-xl font-bold">{children}</h3>
)
