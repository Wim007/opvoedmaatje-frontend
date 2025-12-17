import React, { useState } from "react";
import "./index.css";

const GOAL_OPTIONS = [
  "Grenzen stellen",
  "Minder strijd",
  "Meer rust",
  "Betere communicatie",
  "Meer positiviteit",
  "Structuur aanbrengen",
];

function Logo({ klein }) {
  return (
    <img
      src="/logo-opvoedmaatje.png"
      alt="Opvoedmaatje"
      className={klein ? "logo-img logo-klein" : "logo-img"}
    />
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div className="screen-card welcome-screen">
      <div className="logo-row">
        <Logo />
      </div>
      <div className="card welcome-card">
        <h1>Welkom bij Opvoedmaatje</h1>
        <p className="muted">Samen vinden we rust in de opvoeding.</p>
        <button className="btn primary full no-motion" onClick={onStart}>
          Starten
        </button>
      </div>
    </div>
  );
}

function FamilyScreen({ onBack, onNext, parentName, setParentName, childNames, setChildNames, childAges, setChildAges }) {
  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo />
      </div>
      <div className="card">
        <h2>Gezinssamenstelling</h2>
        <div className="form-stack">
          <label className="form-label">
            Naam ouder/verzorger
            <input
              className="input"
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Bijv. Sam"
            />
          </label>
          <label className="form-label">
            Namen kinderen
            <input
              className="input"
              type="text"
              value={childNames}
              onChange={(e) => setChildNames(e.target.value)}
              placeholder="Bijv. Evi en Noor"
            />
          </label>
          <label className="form-label">
            Leeftijd kinderen
            <input
              className="input"
              type="text"
              value={childAges}
              onChange={(e) => setChildAges(e.target.value)}
              placeholder="Bijv. 5 en 8"
            />
          </label>
        </div>
        <div className="button-row">
          <button className="btn ghost" onClick={onBack}>
            Terug
          </button>
          <button className="btn primary" onClick={onNext}>
            Volgende stap
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalsScreen({ onBack, onFinish, selectedGoals, toggleGoal }) {
  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo />
      </div>
      <div className="card">
        <h2>Waar wil je hulp bij?</h2>
        <div className="chips">
          {GOAL_OPTIONS.map((goal) => (
            <button
              key={goal}
              className={`chip ${selectedGoals.includes(goal) ? "active" : ""}`}
              onClick={() => toggleGoal(goal)}
              type="button"
            >
              {goal}
            </button>
          ))}
        </div>
        <button className="btn primary full" onClick={onFinish}>
          Afronden en starten met chatten
        </button>
      </div>
    </div>
  );
}

function AccessCodeScreen({ code, setCode, onConfirm }) {
  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo />
      </div>
      <div className="card">
        <h2>Voer je toegangscode in</h2>
        <input
          className="input"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Bijv. 1234-5678"
        />
        <button className="btn primary full" onClick={onConfirm}>
          Bevestigen
        </button>
        <p className="muted small">
          Je krijgt deze code via je gemeente of zorgverzekeraar.
        </p>
      </div>
    </div>
  );
}

function LoginScreen({ email, setEmail, password, setPassword, onLogin, onRegister }) {
  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo />
      </div>
      <div className="card">
        <h2>Inloggen</h2>
        <div className="form-stack">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
          />
        </div>
        <button className="btn primary full" onClick={onLogin}>
          Inloggen
        </button>
        <button className="link" type="button">
          Wachtwoord vergeten?
        </button>
        <button className="link" type="button" onClick={onRegister}>
          Nog geen account? Registreren
        </button>
      </div>
    </div>
  );
}

function RegisterScreen({ name, setName, email, setEmail, password, setPassword, onCreate, onLogin }) {
  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo />
      </div>
      <div className="card">
        <h2>Account aanmaken</h2>
        <div className="form-stack">
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Naam"
          />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mailadres"
          />
          <div className="password-field">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wachtwoord"
            />
            <span className="eye-placeholder" aria-hidden="true">
              📷
            </span>
          </div>
        </div>
        <button className="btn primary full" onClick={onCreate}>
          Account aanmaken
        </button>
        <button className="link" type="button" onClick={onLogin}>
          Al een account? Inloggen
        </button>
      </div>
    </div>
  );
}

function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, author: "Opvoedmaatje", text: "Hoi! Ik ben er voor je. Waar lopen jullie nu tegenaan?" },
    { id: 2, author: "Jij", text: "We hebben veel strijd over schermtijd." },
    { id: 3, author: "Opvoedmaatje", text: "Dank je. Wat gebeurt er meestal vlak voordat de strijd begint?" },
    { id: 4, author: "Jij", text: "Als ik zeg dat het tijd is om te stoppen." },
    { id: 5, author: "Opvoedmaatje", text: "Helder. Ik geef je zo enkele ideeën om het rustiger te laten verlopen." },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage = { id: Date.now(), author: "Jij", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      const assistantMessage = { id: Date.now() + 1, author: "Opvoedmaatje", text: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <Logo small />
      </header>
      <div className="chat-card">
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bubble ${message.author === "Jij" ? "user" : "assistant"}`}
            >
              <p className="bubble-author">{message.author}</p>
              <p className="bubble-text">{message.text}</p>
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            className="chat-field"
            placeholder="Typ een bericht…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="send-button" type="submit">
            →
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [parentName, setParentName] = useState("");
  const [childNames, setChildNames] = useState("");
  const [childAges, setChildAges] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [accessCode, setAccessCode] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen onStart={() => setScreen("family")} />;
      case "family":
        return (
          <FamilyScreen
            onBack={() => setScreen("welcome")}
            onNext={() => setScreen("goals")}
            parentName={parentName}
            setParentName={setParentName}
            childNames={childNames}
            setChildNames={setChildNames}
            childAges={childAges}
            setChildAges={setChildAges}
          />
        );
      case "goals":
        return (
          <GoalsScreen
            onBack={() => setScreen("family")}
            onFinish={() => setScreen("access")}
            selectedGoals={selectedGoals}
            toggleGoal={toggleGoal}
          />
        );
      case "access":
        return (
          <AccessCodeScreen
            code={accessCode}
            setCode={setAccessCode}
            onConfirm={() => setScreen("login")}
          />
        );
      case "login":
        return (
          <LoginScreen
            email={loginEmail}
            setEmail={setLoginEmail}
            password={loginPassword}
            setPassword={setLoginPassword}
            onLogin={() => setScreen("chat")}
            onRegister={() => setScreen("register")}
          />
        );
      case "register":
        return (
          <RegisterScreen
            name={registerName}
            setName={setRegisterName}
            email={registerEmail}
            setEmail={setRegisterEmail}
            password={registerPassword}
            setPassword={setRegisterPassword}
            onCreate={() => setScreen("chat")}
            onLogin={() => setScreen("login")}
          />
        );
      case "chat":
      default:
        return <ChatScreen />;
    }
  };

  return <div className="app-shell">{renderScreen()}</div>;
}
