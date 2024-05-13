import st from '@/styles/fallback.module.scss';

export function Fallback() {
  const reload = () => location.reload();
  return (
    <div className={st.container}>
      <div>error occured</div>
      <div>refresh the page</div>
      <button onClick={reload}>
        <span className="material-symbols-outlined">restart_alt</span>
      </button>
    </div>
  );
}
