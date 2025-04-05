import earth from "../assets/Earth Icon.svg";

function Nav({ title }) {
  return (
    <div className="nav">
      <img className="earth" src={earth} alt="earth" />
      <p className="nav_title">{title}</p>
    </div>
  );
}

export default Nav;
