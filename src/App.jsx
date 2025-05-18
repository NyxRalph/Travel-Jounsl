import "./App.css";
import Nav from "./components/nav";
import Journal from "./components/journal";
import EntryLog from "./components/entry.jsx";
import React, { useState, useEffect } from "react";
import Auth from "./components/Auth.jsx";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!user) return setEntries([]);
    const fetchEntries = async () => {
      const q = query(
        collection(db, "journalEntries"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      setEntries(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchEntries();
  }, [user]);

  const selectedLog = entries.find((d) => d.id === selectedLogId);

  const handleAddEntry = async (entry) => {
    if (!user) return;
    const docRef = await addDoc(collection(db, "journalEntries"), {
      ...entry,
      uid: user.uid,
      createdAt: new Date(),
    });
    setEntries((prev) => [{ id: docRef.id, ...entry }, ...prev]);
    setShowModal(false);
  };

  const handleDeleteEntry = async (entryId) => {
    if (!user) return;
    await deleteDoc(doc(db, "journalEntries", entryId));
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    setSelectedLogId(null);
  };

  return (
    <>
      <Nav title=" My Travel Journal" user={user} />
      <div className="main-content-wrapper">
        <section id="landing">
          {!user ? (
            <Auth onAuthChange={setUser} />
          ) : (
            <>
              <section id="journal">
                <button
                  style={{
                    margin: "18px 0 10px 0",
                    padding: "10px 22px",
                    background: "#b24646",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(178,70,70,0.07)",
                  }}
                  onClick={() => setShowModal(true)}
                >
                  + New Entry
                </button>
                <section id="logs">
                  {entries.map((data) => (
                    <Journal
                      key={data.id}
                      data={data}
                      onClick={() => setSelectedLogId(data.id)}
                    />
                  ))}
                </section>
              </section>
              <EntryLog
                log={selectedLog}
                entries={entries}
                user={user}
                onDelete={handleDeleteEntry}
              />
              {showModal && (
                <NewEntryModal
                  onClose={() => setShowModal(false)}
                  onAdd={handleAddEntry}
                />
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

function NewEntryModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [dates, setDates] = useState("");
  const [text, setText] = useState("");
  const [experience, setExperience] = useState("");
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqkcwbxs9/upload";
  const CLOUDINARY_PRESET = "travel_journal";

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      try {
        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          setMedia((prev) => [
            ...prev,
            { url: data.secure_url, type: file.type.split("/")[0] },
          ]);
        }
      } catch (err) {
        alert("Upload failed: " + err.message);
      }
    }
    setUploading(false);
    e.target.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !country || !dates || !text) {
      alert("Please fill in all required fields.");
      return;
    }
    onAdd({
      title,
      country,
      dates,
      text,
      experience: {
        text: experience,
        photos: media.filter((m) => m.type === "image").map((m) => m.url),
      },
      latitude: 0,
      longitude: 0,
      img: {
        src: media.find((m) => m.type === "image")?.url || "",
        alt: title,
      },
      // Optionally add video/audio support here
      media,
    });
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-card">
        <h2 style={{ margin: 0, color: "#b24646" }}>New Journal Entry</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1.5px solid #e0e0e0",
          }}
        />
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1.5px solid #e0e0e0",
          }}
        />
        <input
          placeholder="Dates (e.g. 1 Jan, 2023 - 10 Jan, 2023)"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1.5px solid #e0e0e0",
          }}
        />
        <textarea
          placeholder="About this trip..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1.5px solid #e0e0e0",
            minHeight: 60,
          }}
        />
        <textarea
          placeholder="Personal experience..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1.5px solid #e0e0e0",
            minHeight: 60,
          }}
        />
        <label style={{ fontWeight: 600 }}>
          Add Media (photo, video, audio):
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            multiple
            onChange={handleUpload}
            style={{ display: "block", marginTop: 8 }}
            disabled={uploading}
          />
        </label>
        {uploading && (
          <div style={{ color: "#b24646", marginTop: 8 }}>Uploading...</div>
        )}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {media.map((m, i) =>
            m.type === "image" ? (
              <img
                key={i}
                src={m.url}
                alt="uploaded"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            ) : m.type === "video" ? (
              <video
                key={i}
                src={m.url}
                controls
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            ) : m.type === "audio" ? (
              <audio key={i} src={m.url} controls style={{ width: "100%" }} />
            ) : null
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 10,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              background: "#eee",
              color: "#b24646",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              background: "#b24646",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
