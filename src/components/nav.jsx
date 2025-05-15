import earth from "../assets/Earth Icon.svg";

function Nav({ title, user }) {
  return (
    <div className="nav modern-nav">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img className="earth" src={earth} alt="earth" />
        <p className="nav_title">{title}</p>
      </div>
      {user && (
        <div className="nav__avatar">
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <span>{user.email ? user.email[0].toUpperCase() : "U"}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Nav;
