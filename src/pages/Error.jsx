import { Link, useRouteError } from "react-router-dom";

export function Error({ style }) {
  const error = useRouteError();
  return (
    <div className="error" style={style}>
      <h1>Eroor Happened </h1>
      <p>{error.message}</p>
      <Link to="/">Back Home </Link>
    </div>
  );
}
