import "./App.css";
import Nav from "./components/nav";
import Journal from "./components/journal";
import data from "./assets/data.js";
import EntryLog from "./components/entry.jsx";
import React, { useState } from "react";
import Auth from "./components/Auth.jsx";

function App() {
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [user, setUser] = useState(null);
  const selectedLog = data.find((d) => d.id === selectedLogId);

  return (
    <>
      <section id="landing">
        {!user ? (
          <Auth onAuthChange={setUser} />
        ) : (
          <>
            <section id="journal">
              <Nav title=" My Travel Journal" />
              <section id="logs">
                {data.map((data) => (
                  <Journal
                    key={data.id}
                    data={data}
                    onClick={() => setSelectedLogId(data.id)}
                  />
                ))}
              </section>
            </section>
            <EntryLog log={selectedLog} />
          </>
        )}
      </section>
    </>
  );
}

export default App;
