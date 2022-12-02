import s from "./NotFoundView.module.css";

export default function NotFoundView() {
  return (
    <div className={s.container}>
      <h1 className={s.not_found}>404 Not Found</h1>
    </div>
  );
}
