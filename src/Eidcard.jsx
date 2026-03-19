import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import music from "./eid_music.mp3";

export default function EidCard() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  // Stars & confetti arrays
  const [stars] = useState(() => Array.from({ length: 80 }));
  const [confetti] = useState(() => Array.from({ length: 25 }));

  useEffect(() => {
    if (!started) return;

    // Play AI voice once
    const msg = new SpeechSynthesisUtterance(
      "Eid-ul-Fitr Mubarak! Wishing peace, joy, and happiness."
    );
    msg.rate = 0.9;
    msg.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);

    // Play music once
    if (!audioRef.current) {
      audioRef.current = new Audio(music);
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {
        console.warn("Autoplay prevented by browser");
      });
    }

    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [started]);

  return (
    <div
      className="bg"
      onClick={() => {
        if (!started) setStarted(true);
      }}
      style={{ cursor: started ? "default" : "pointer" }}
      title={started ? "" : "Click to start Eid music and greeting"}
    >
      {/* Moon */}
      <div className="moon" />

      {/* Stars */}
      {stars.map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
        />
      ))}

      {/* Confetti */}
      {confetti.map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 4 + "s",
          }}
        />
      ))}

      {/* Text */}
      <div className="text">
        <h1>عيد الفطر مبارك</h1>
        <p>
          Eid-ul-Fitr 🌙✨ <br />
          Wishing happiness and peace on this blessed day <br />
          By - Ifraah Tabassum
        </p>
      </div>

      {/* Mosque */}
      <div className="mosque-wrap">
        <div className="mosque">
          <div className="base"></div>
          <div className="dome"></div>
          <div className="crescent"></div>
          <div className="minaret left"></div>
          <div className="minaret right"></div>

          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="arch" style={{ left: 40 + i * 60 }} />
          ))}

          {/* People */}
          <div className="person left-person"></div>
          <div className="person right-person"></div>

          {[0, 1, 2].map((i) => (
            <div key={i} className="sit" style={{ left: 90 + i * 20 }} />
          ))}
        </div>
      </div>
    </div>
  );
}