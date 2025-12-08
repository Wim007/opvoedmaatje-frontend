// ================================
// Opvoedmaatje – App.js
// ================================

import React, { startTransition, useState } from "react";
import "./index.css";

// ================================
// STAP-INDICATOR BOLLETJES
// ================================
function StepIndicator({ step }) {
  const steps = [
    { nr: 1, label: "Welkom" },
    { nr: 2, label: "Gezin" },
    { nr: 3, label: "Doelen" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      {steps.map((s) => (
        <div
          key={s.nr}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "9999px",
            marginRight: s.nr === steps.length ? "0px" : "8px",
            background: step === s.nr ? "#14d4e8" : "#e5e7eb",
            color: step === s.nr ? "#ffffff" : "#374151",
            fontWeight: step === s.nr ? 600 : 400,
            fontSize: "0.9rem",
          }}
        >
          <span>{s.nr}.</span>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ================================
// STAP 1 – WELKOM
// ================================
function WelcomeStep({ onNext }) {
  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Even kennismaken</h2>
      <p style={{ marginBottom: "16px", color: "#4b5563" }}>
        Opvoedmaatje is er om jou snel en praktisch te ondersteunen. Geen
        ingewikkelde woorden – gewoon iemand die met je meedenkt.
      </p>

      <ul style={{ marginLeft: "18px", marginBottom: "16px", color: "#4b5563" }}>
        <li>Korte vragen over opvoeden stellen</li>
        <li>Concrete tips en voorbeelden krijgen</li>
        <li>Zien wat bij jouw gezin past</li>
      </ul>

      <button
        onClick={onNext}
        style={{
          padding: "10px 20px",
          borderRadius: "9999px",
          border: "none",
          background: "#14d4e8",
          color: "#ffffff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Doorgaan
      </button>
    </section>
  );
}

// ================================
// STAP 2 – GEZIN
// ================================
function FamilyStep({ onNext, onBack }) {
  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Jouw gezin</h2>
      <p style={{ marginBottom: "16px", color: "#4b5563" }}>
        In de volgende versie kun je hier aangeven wie er in je gezin zitten
        en hoe oud de kinderen zijn. Voor nu is dit een placeholder.
      </p>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#374151",
            cursor: "pointer",
          }}
        >
          Terug
        </button>

        <button
          onClick={onNext}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "none",
            background: "#14d4e8",
            color: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Verder naar doelen
        </button>
      </div>
    </section>
  );
}

// ================================
// STAP 3 – DOELEN
// ================================
function GoalStep({ onBack }) {
  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Wat wil je bereiken?</h2>
      <p style={{ marginBottom: "16px", color: "#4b5563" }}>
        Hier komt later de doelenpagina: rustigere avonden, minder strijd, beter
        contact met je kind – dat soort thema’s.
      </p>

      <button
        onClick={onBack}
        style={{
          padding: "10px 20px",
          borderRadius: "9999px",
          border: "1px solid #d1d5db",
          background: "#ffffff",
          color: "#374151",
          cursor: "pointer",
        }}
      >
        Terug
      </button>
    </section>
  );
}

// ================================
// HOOFD-COMPONENT – APP
// ================================
export default function App() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        margin: "40px auto",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px 24px 32px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
      }}
    >
      {/* HEADER: LOGO + TITEL + SUBTEKST */}
      <header style={{ marginBottom: "24px", textAlign: "center" }}>
        <img
          src="/logo-opvoedmaatje.png"
          alt="Opvoedmaatje logo"
          style={{ width: "120px", marginBottom: "12px" }}
        />
        <h1 style={{ margin: 0, fontSize: "1.8rem", color: "#14d4e8" }}>
          Opvoedmaatje
        </h1>
        <p style={{ marginTop: "8px", color: "#4b5563" }}>
          Je doet je best. Soms is dat zwaar. Opvoedmaatje denkt met je mee.
        </p>
      </header>

      {/* STAP INDICATOR */}
      <StepIndicator step={step} />

      {/* STAPPEN LOGICA */}
      {step === 1 && <WelcomeStep onNext={next} />}
      {step === 2 && <FamilyStep onNext={next} onBack={prev} />}
      {step === 3 && <GoalStep onBack={prev} />}
    </div>
  );
}
