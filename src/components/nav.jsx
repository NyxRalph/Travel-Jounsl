import earth from "../assets/Earth Icon.svg";

function Nav (){
    return (
        <div className="nav">
            <img className="earth" src={earth} alt="earth" />
           <p className="nav_title">My Travel Journal</p>
        </div>
    )
}

export default Nav;