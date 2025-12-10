// ==============================================
// Opvoedmaatje - App.js
// ==============================================

import React, { startTransition, useState } from "react";
import "./index.css";

// ==============================================
// STAP-INDICATOR BOLLETJES
// ==============================================
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
        gap: "8px",
        marginBottom: "24px",
      }}
    >
      {steps.map((s) => {
        const isActive = s.nr === step;
        const isCompleted = s.nr < step;

        const background = isActive
          ? "#1d4ed8"
          : isCompleted
          ? "#10b981"
          : "#e5e7eb";
        const color =
          isActive || isCompleted ? "#ffffff" : "#4b5563";

        return (
          <div
            key={s.nr}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 8px",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "9999px",
                background,
                color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              {s.nr}
            </div>
            <span
              style={{
                fontSize: "0.9rem",
                color: isActive ? "#111827" : "#6b7280",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ==============================================
// STAP 1 - WELKOM
// ==============================================
function WelcomeStep({ onNext }) {
  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
        Even kennismaken
      </h2>

      <p
        style={{
          marginBottom: "16px",
          color: "#4b5563",
          lineHeight: 1.5,
        }}
      >
        Opvoedmaatje is er om jou snel en praktisch te ondersteunen.
        Geen ingewikkelde woorden, gewoon iemand die met je meedenkt
        over het dagelijks gedoe thuis.
      </p>

      <ul
        style={{
          marginLeft: "18px",
          marginBottom: "16px",
          color: "#4b5563",
        }}
      >
        <li>Korte vragen over opvoeden stellen</li>
        <li>Concrete tips en voorbeelden krijgen</li>
        <li>Zien wat bij jouw gezin past</li>
      </ul>

      <p
        style={{
          marginBottom: "20px",
          color: "#4b5563",
          fontSize: "0.9rem",
        }}
      >
        In de volgende stappen vragen we alleen om{" "}
        <strong>voornamen, leeftijden</strong> en een paar{" "}
        <strong>doelen</strong>. Deze gegevens blijven op je eigen
        toestel en worden gebruikt om het gesprek persoonlijker te
        maken.
      </p>

      <button
        type="button"
        onClick={onNext}
        style={{
          padding: "10px 20px",
          borderRadius: "9999px",
          border: "none",
          background: "#1d4ed8",
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

// ==============================================
// STAP 2 - GEZIN
// ==============================================
function FamilyStep({ onNext, onBack, children, setChildren }) {
  const handleChange = (index, field, value) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };

  const addChild = () => {
    if (children.length >= 5) return; // max 5 kinderen
    setChildren([
      ...children,
      { firstName: "", age: "", gender: "" },
    ]);
  };

  const removeChild = (index) => {
    if (children.length === 1) return; // minstens 1 kind laten staan
    const updated = children.filter((_, i) => i !== index);
    setChildren(updated);
  };

  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
        Jouw gezin
      </h2>

      <p
        style={{
          marginBottom: "16px",
          color: "#4b5563",
          lineHeight: 1.5,
        }}
      >
        Vertel kort wie er in je gezin zitten. We vragen alleen om{" "}
        <strong>voornamen</strong>, leeftijd en of het een jongen of
        meisje is. Deze gegevens blijven op je eigen toestel en worden
        alleen gebruikt om het gesprek in Opvoedmaatje persoonlijker
        te maken.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "8px",
                fontSize: "1rem",
                color: "#374151",
              }}
            >
              Kind {index + 1}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                style={{
                  fontSize: "0.85rem",
                  color: "#4b5563",
                }}
              >
                Voornaam
                <input
                  type="text"
                  value={child.firstName}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "firstName",
                      e.target.value
                    )
                  }
                  placeholder="Bijv. Evi"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.95rem",
                  }}
                />
              </label>

              <label
                style={{
                  fontSize: "0.85rem",
                  color: "#4b5563",
                }}
              >
                Leeftijd
                <input
                  type="number"
                  min="0"
                  max="21"
                  value={child.age}
                  onChange={(e) =>
                    handleChange(index, "age", e.target.value)
                  }
                  placeholder="Bijv. 7"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.95rem",
                  }}
                />
              </label>

              <label
                style={{
                  fontSize: "0.85rem",
                  color: "#4b5563",
                }}
              >
                Jongen / meisje
                <select
                  value={child.gender}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "gender",
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    marginTop: "4px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.95rem",
                    background: "#ffffff",
                  }}
                >
                  <option value="">Maak een keuze</option>
                  <option value="jongen">Jongen</option>
                  <option value="meisje">Meisje</option>
                  <option value="anders">
                    Anders / zeg ik liever niet
                  </option>
                </select>
              </label>

              {children.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChild(index)}
                  style={{
                    marginTop: "4px",
                    padding: "4px 0",
                    border: "none",
                    background: "none",
                    color: "#b91c1c",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  Kind {index + 1} verwijderen
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addChild}
        style={{
          marginBottom: "24px",
          padding: "8px 14px",
          borderRadius: "9999px",
          border: "1px dashed #9ca3af",
          background: "#f9fafb",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}
      >
        + Nog een kind toevoegen
      </button>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#374151",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Terug
        </button>

        <button
          type="button"
          onClick={onNext}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "none",
            background: "#1d4ed8",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Doorgaan
        </button>
      </div>
    </section>
  );
}

// ==============================================
// STAP 3 - DOELEN
// ==============================================

// Veelvoorkomende opvoedthema's als standaardopties
const PRESET_GOALS = [
  {
    id: "schermtijd",
    label: "Mijn kind zit te veel op telefoon/tablet/computer",
  },
  {
    id: "niet_luisteren",
    label:
      "Mijn kind luistert vaak niet / reageert pas na 10x vragen",
  },
  {
    id: "driftbuien",
    label: "Driftbuien / woede-uitbarstingen",
  },
  {
    id: "grenzen",
    label: "Grenzen stellen en consequent blijven",
  },
  {
    id: "broers_zussen",
    label: "Ruzie tussen broers/zussen (veel strijd in huis)",
  },
  {
    id: "bedtijd",
    label: "Gedoe rond bedtijd / inslapen",
  },
  {
    id: "school",
    label: "Problemen rond school / huiswerk / motivatie",
  },
  {
    id: "zelfvertrouwen",
    label:
      "Onzekerheid / weinig zelfvertrouwen / veel piekeren",
  },
];

function GoalStep({ onBack, goals, setGoals, onFinish }) {
  const handleChange = (field, value) => {
    setGoals((prev) => ({ ...prev, [field]: value }));
  };

  const togglePreset = (id) => {
    setGoals((prev) => {
      const current = prev.presets || [];
      const exists = current.includes(id);
      const updated = exists
        ? current.filter((item) => item !== id)
        : [...current, id];

      return { ...prev, presets: updated };
    });
  };

  const isSelected = (id) => (goals.presets || []).includes(id);

  return (
    <section>
      <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
        Jouw doelen
      </h2>

      <p
        style={{
          marginBottom: "12px",
          color: "#4b5563",
          lineHeight: 1.5,
        }}
      >
        Waar hoop je dat Opvoedmaatje je het meest mee helpt?
        Kies hieronder situaties die bij jullie passen. Daarna kun je
        jouw eigen situatie in je eigen woorden toelichten.
      </p>

      {/* STANDAARDDOELEN - CHECKBOXEN */}
      <div
        style={{
          marginBottom: "20px",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <p
          style={{
            marginTop: 0,
            marginBottom: "8px",
            fontSize: "0.85rem",
            color: "#4b5563",
            fontWeight: 500,
          }}
        >
          Kies wat bij jullie past (meerdere opties mogelijk):
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {PRESET_GOALS.map((item) => (
            <label
              key={item.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "0.9rem",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={() => togglePreset(item.id)}
                style={{ marginTop: "2px" }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* VRIJE TEKSTVELDEN */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <label
          style={{
            fontSize: "0.85rem",
            color: "#4b5563",
          }}
        >
          In je eigen woorden: wat is nu het belangrijkste waar je
          hulp bij wilt?
          <textarea
            value={goals.main}
            onChange={(e) =>
              handleChange("main", e.target.value)
            }
            placeholder="Bijvoorbeeld: ik wil minder strijd over schermtijd met mijn 10-jarige zoon."
            rows={3}
            style={{
              width: "100%",
              padding: "8px 10px",
              marginTop: "4px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              resize: "vertical",
            }}
          />
        </label>

        <label
          style={{
            fontSize: "0.85rem",
            color: "#4b5563",
          }}
        >
          Wat vind je het belangrijkste op korte termijn?
          <textarea
            value={goals.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value)
            }
            placeholder="Bijvoorbeeld: meer rust aan tafel, minder geschreeuw, één moment dat nu het zwaarst voelt."
            rows={2}
            style={{
              width: "100%",
              padding: "8px 10px",
              marginTop: "4px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              resize: "vertical",
            }}
          />
        </label>

        <label
          style={{
            fontSize: "0.85rem",
            color: "#4b5563",
          }}
        >
          Iets specifieks waar je tegenaan loopt? (optioneel)
          <textarea
            value={goals.notes}
            onChange={(e) =>
              handleChange("notes", e.target.value)
            }
            placeholder="Bijvoorbeeld: mijn dochter van 15 blowt, of: mijn zoon met ADHD explodeert bij kleine dingen."
            rows={2}
            style={{
              width: "100%",
              padding: "8px 10px",
              marginTop: "4px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "0.95rem",
              resize: "vertical",
            }}
          />
        </label>
      </div>

      {/* KNOPPEN TERUG / AFRONDEN */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#374151",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Terug
        </button>

        <button
          type="button"
          onClick={onFinish}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "none",
            background: "#16a34a",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Afronden
        </button>
      </div>
    </section>
  );
}

// ==============================================
// HOOFD-COMPONENT - APP
// ==============================================
export default function App() {
  const [step, setStep] = useState(1);

  // Gezin: lijst van kinderen
  const [children, setChildren] = useState([
    { firstName: "", age: "", gender: "" },
  ]);

  // Doelen: vrije tekst + gekozen standaarddoelen
  const [goals, setGoals] = useState({
    main: "",
    priority: "",
    notes: "",
    presets: [],
  });

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
    // Hier kun je later:
    // - gegevens lokaal opslaan
    // - of doorgeven aan de Assistants API
    console.log("GEZIN:", children);
    console.log("DOELEN:", goals);
    alert(
      "Dank je wel. Je gegevens zijn ingevuld. Ze blijven op je eigen toestel en helpen om het gesprek persoonlijker te maken."
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "24px 12px",
        boxSizing: "border-box",
      }}
    >
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
        {/* HEADER LOGO + TITEL + SUBTEKST */}
        <header
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          <img
            src="/logo-opvoedmaatje.png"
            alt="Opvoedmaatje logo"
            style={{ width: "120px", marginBottom: "12px" }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: "1.8rem",
              color: "#1f2937",
            }}
          >
            Opvoedmaatje
          </h1>
          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#4b5563",
            }}
          >
            Je doet je best. Soms is dat zwaar. Opvoedmaatje denkt
            met je mee.
          </p>
        </header>

        {/* STAP INDICATOR */}
        <StepIndicator step={step} />

        {/* STAPPEN LOGICA */}
        {step === 1 && <WelcomeStep onNext={next} />}
        {step === 2 && (
          <FamilyStep
            onNext={next}
            onBack={prev}
            children={children}
            setChildren={setChildren}
          />
        )}
        {step === 3 && (
          <GoalStep
            onBack={prev}
            goals={goals}
            setGoals={setGoals}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
}