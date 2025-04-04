import "./App.css";
import Nav from "./components/nav";
import Journal from "./components/journal";
import data from "./assets/data.js";

function App() {
  return (
    <>
      <section id="journal">
        <Nav />
        <section id="logs">
          {data.map((data) => (
            <Journal key={data.id} data={data} />
          ))}
        </section>
      </section>
    </>
  );
}

export default App;
