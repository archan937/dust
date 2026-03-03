import Dust, { useState, useEffect } from 'dust';

const MAX_XP = 200;

export default function ProfilePage() {
  const [user, setUser] = useState({ name: 'Jane Doe', title: 'Junior Engineer', level: 1, xp: 0 });

  // Accessing a property on a getter returns a nested reactive getter.
  // Assign to a const so the identifier can be used in JSX for reactivity.
  const name  = user.name;
  const title = user.title;
  const level = user.level;
  const xp    = user.xp;

  // The XP bar width can't be expressed as a direct getter reference,
  // so we use useEffect to derive it.
  const xpFill = <div className="xp-fill" />;

  useEffect(() => {
    xpFill.style.width = `${Math.round((xp() / MAX_XP) * 100)}%`;
  }, [xp]);

  const gainXP = amount => setUser(u => ({ ...u, xp: u.xp + amount }));

  const levelUp = () => setUser(u => ({
    ...u,
    title: `Level ${u.level + 1} Engineer`,
    level: u.level + 1,
    xp: 0,
  }));

  const reset = () => setUser({ name: 'Jane Doe', title: 'Junior Engineer', level: 1, xp: 0 });

  return (
    <section>
      <div className="section-header">
        <h2>Profile</h2>
        <p>Object state · nested reactive getters · derived styles via useEffect</p>
      </div>
      <div className="demo">
        <div className="profile-card">
          <div className="avatar">🧑‍💻</div>
          <div className="profile-info">
            <div className="profile-name">{name}</div>
            <div className="profile-title">{title}</div>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-label">Level</span>
                <span className="stat-value">{level}</span>
              </div>
              <div className="stat">
                <span className="stat-label">XP</span>
                <span className="stat-value">{xp}</span>
                <span className="stat-label"> / {MAX_XP}</span>
              </div>
            </div>
            <div className="xp-bar">{xpFill}</div>
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={() => gainXP(25)}>+25 XP</button>
          <button onClick={() => gainXP(50)}>+50 XP</button>
          <button className="primary" onClick={() => levelUp()}>Level Up</button>
          <button className="danger" onClick={() => reset()}>Reset</button>
        </div>
      </div>
    </section>
  );
}
