function Card({ title, value, icon, tone = "violet" }) {
  return (
    <div className="card stat-card">
      {icon && <div className={`stat-icon icon-${tone}`}>{icon}</div>}

      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
}

export default Card;
