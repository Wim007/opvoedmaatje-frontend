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
        <p className="muted">Opvoeden is mooi, maar soms ook gewoon zwaar. Herken je die twijfels, frustratie of zorgen? Je bent niet de enige – en je hoeft het niet alleen te doen. Hier vind je een luisterend oor, zonder oordeel.</p>
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
        <Logo klein />
      </div>
      <div className="card form-card">
        <h2>Stel je gezin voor</h2>
        <p className="muted">Wij willen graag weten hoe we jullie kunnen aanspreken.</p>
        <label className="form-label">
          Jouw naam
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
        <div className="btn-row">
          <button className="btn secondary" onClick={onBack}>
            Terug
          </button>
          <button className="btn primary" onClick={onNext} disabled={!parentName.trim() || !childNames.trim()}>
            Volgende
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalScreen({ onBack, onNext, parentName, childNames, goals, setGoals }) {
  const toggleGoal = (goal) => {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  };

  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo klein />
      </div>
      <div className="card form-card">
        <h2>Waar wil je naartoe?</h2>
        <p className="muted">
          Kies één of meer doelen die voor jou nu belangrijk zijn. Je kunt dit later altijd aanpassen.
        </p>
        <div className="goal-list">
          {GOAL_OPTIONS.map((goal) => (
            <label key={goal} className="goal-label">
              <input
                className="goal-checkbox"
                type="checkbox"
                checked={goals.includes(goal)}
                onChange={() => toggleGoal(goal)}
              />
              <span className="goal-text">{goal}</span>
            </label>
          ))}
        </div>
        <div className="btn-row">
          <button className="btn secondary" onClick={onBack}>
            Terug
          </button>
          <button className="btn primary" onClick={onNext} disabled={goals.length === 0}>
            Starten
          </button>
        </div>
      </div>
    </div>
  );
}

function IntroScreen({ parentName, childNames, goals, onNext }) {
  const goalsText = goals.length > 0 ? goals.join(", ") : "je opvoeddoelen";

  return (
    <div className="screen-card">
      <div className="logo-row">
        <Logo klein />
      </div>
      <div className="card welcome-card">
        <h2>Gezellig dat je er bent, {parentName}!</h2>
        <p className="muted">
          Het is fijn dat je wilt werken aan {goalsText} in de opvoeding van {childNames}. Laten we samen
          beginnen met de eerste stap.
        </p>
        <button className="btn primary full no-motion" onClick={onNext}>
          Start gesprek
        </button>
      </div>
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, i) => (
        <div key={i} className={msg.author === "Jij" ? "message-row user" : "message-row assistant"}>
          {msg.author !== "Jij" && <div className="message-sender">{msg.author}</div>}
          <div className={msg.author === "Jij" ? "message user" : "message assistant"}>{msg.text}</div>
        </div>
      ))}
    </div>
  );
}

function ChatScreen({ parentName, childNames, childAges, goals }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Opvoedmaatje",
      text: `Helder. Ik begrijp dat je opvoeddoelen gaan over ${goals.join(", ")}. Hoe kan ik je helpen?`,
    },
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
      const assistantMessage = { id: Date.now() + 1, author: "Opvoedmaatje", text: data.message };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="screen-card chat-screen">
      <div className="logo-row">
        <Logo klein />
      </div>
      <div className="chat-container">
        <MessageList messages={messages} />
        <form className="input-row" onSubmit={handleSubmit}>
          <input
            className="input-message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Typ een bericht..."
          />
          <button className="btn primary send-btn" type="submit" disabled={!input.trim()}>
            Verzenden
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("welcome");
  const [parentName, setParentName] = useState("");
  const [childNames, setChildNames] = useState("");
  const [childAges, setChildAges] = useState("");
  const [goals, setGoals] = useState([]);

  return (
    <div className="app">
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("family")} />}
      {step === "family" && (
        <FamilyScreen
          onBack={() => setStep("welcome")}
          onNext={() => setStep("goals")}
          parentName={parentName}
          setParentName={setParentName}
          childNames={childNames}
          setChildNames={setChildNames}
          childAges={childAges}
          setChildAges={setChildAges}
        />
      )}
      {step === "goals" && (
        <GoalScreen
          onBack={() => setStep("family")}
          onNext={() => setStep("intro")}
          parentName={parentName}
          childNames={childNames}
          goals={goals}
          setGoals={setGoals}
        />
      )}
      {step === "intro" && (
        <IntroScreen
          parentName={parentName}
          childNames={childNames}
          goals={goals}
          onNext={() => setStep("chat")}
        />
      )}
      {step === "chat" && (
        <ChatScreen
          parentName={parentName}
          childNames={childNames}
          childAges={childAges}
          goals={goals}
        />
      )}
    </div>
  );
}
