import "./App.css";
import Nav from "./components/nav";
import Journal from "./components/journal";
import data from "./assets/data.js";
import EntryLog from "./components/entry.jsx";

function App() {
  return (
    <>
      <section id="landing">
        <section id="journal">
          <Nav title=" My Travel Journal" />
          <section id="logs">
            {data.map((data) => (
              <Journal key={data.id} data={data} />
            ))}
          </section>
        </section>
        <EntryLog />
      </section>
    </>
  );
}

export default App;
