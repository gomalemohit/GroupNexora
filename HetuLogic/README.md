# HetuLogic (PRAMANAX): Ancient Indian Logic Meets Modern AI

> **"॥ यतोऽभ्युदयनिःश्रेयससिद्धिः स धर्मः ॥ • PRAMANA-DRIVEN COGNITIVE COMPUTING"**

An interactive web application bridging 2,500 years of **Nyaya-Vaisheshika Philosophy** with contemporary **Symbolic AI, Knowledge Graphs, and Rule-Based Inference Engines**.

---

## 🌟 Architectural Overview

HetuLogic demonstrates that the epistemological formalisms codified by Maharshi Akshapada Gautama (*Nyaya Sutras*) and Maharshi Kanada (*Vaisheshika Sutras*) anticipate modern knowledge representation, automated theorem proving, forward-chaining deduction (Rete algorithm), and safe explainable AI (XAI).

The application is structured into four primary interactive modules:

### 1. Live Inference Engine (Anumana Simulator)
- **Interactive Scenarios**:
  - `Server is overheating` (Cloud DevOps & Predictive Maintenance)
  - `There is fire on the mountain` (Classical *Parvata & Dhuma* scenario)
  - `Network packet loss detected` (Cybersecurity & Routing Diagnostics)
  - `Patient has acute pneumonia` (Clinical Decision Support / CDSS)
  - `Autonomous vehicle emergency brake` (Robotics & Sensor Fusion)
  - `Custom Proposition` (User-defined Paksha & Hetu)
- **Synchronous 5-Member Nyaya vs. Symbolic AI Deduction**:
  1. **Pratijna (प्रतिज्ञा)** ⇌ Target Goal / Query Hypothesis
  2. **Hetu (हेतु)** ⇌ Ground-Truth Fact / Sensor Telemetry Assertion
  3. **Udaharana (उदाहरण / व्याप्ति)** ⇌ IF-THEN Knowledge Base Rule (Definite Horn Clause)
  4. **Upanaya (उपनय)** ⇌ Pattern Matching & Variable Unification (Rete Node Activation)
  5. **Nigamana (निगमन)** ⇌ Inference Engine Conclusion & Autonomous Action Dispatch
- **Controls**: Auto-Run with speed governance (Slow / Normal / Fast), Step-by-Step traversal, live progress bar, and timestamped terminal trace with one-click clipboard export.

### 2. Permanent IKS-to-AI Mapping Cards
Three in-depth interactive cards highlighting the direct mapping:
1. **Vyapti (व्याप्ति)** ⟷ **Rule-Based Expert Systems**: Interactive falsification tester examining unconditional invariant co-presence vs. conditional defects (*Upadhi*).
2. **Hetu (हेतु)** ⟷ **Feature & Condition Triggers**: Interactive 5-fold validity criteria (*Pancha-Rupa Hetu*) guardrail inspector.
3. **Nigamana (निगमन)** ⟷ **Final Inference Output & XAI**: Comparative analysis of Nyaya’s 5-step inductive-deductive syllogism vs. Aristotle’s 3-step formal deduction.

### 3. Logic Lab (Anumana 5-Card Sorting Game)
- **Interactive Epistemic Challenge**: "Question: Is there fire on the mountain?"
- **5 Scrambled Cards**:
  1. *"The mountain has fire."* (Pratijna - Proposition)
  2. *"Because there is smoke."* (Hetu - Reason)
  3. *"Wherever there is smoke, there is fire (like in a kitchen)."* (Udaharana - Example/Rule)
  4. *"The mountain has smoke that is pervaded by fire."* (Upanaya - Application)
  5. *"Therefore, the mountain has fire."* (Nigamana - Conclusion)
- **Ordering Mechanics**: Drag-and-drop HTML5 interface and accessible **▲ Up** / **▼ Down** buttons.
- **Scoring & Verification**: Instant evaluation with real-time score display (out of 5), emerald green for correctly placed steps, crimson red for misplaced steps, pedagogical sequence breakdown, celebratory confetti on 5/5, and alternative scenario modes.

### 4. Nyaya & Vaisheshika Knowledge Explorer (PramanaX)
- **Tab 1 — 4 Pramanas (प्रमाणानि)**:
  - *Pratyaksha* (Direct Perception) ⇌ Computer Vision & IoT Telemetry
  - *Anumana* (Inference) ⇌ Machine Learning & Automated Deduction
  - *Upamana* (Analogy) ⇌ Vector Embeddings & Few-Shot Learning
  - *Shabda* (Verbal Testimony) ⇌ Verified Knowledge Graphs & RAG
- **Tab 2 — 5 Hetvabhasa (हेत्वाभासाः - Fallacies)**:
  - *Savyabhichara*, *Viruddha*, *Satpratipaksha*, *Asiddha*, *Badhita* mapped to modern AI failure modes (hallucinations, data poisoning, conflicting safety constraints, OOD shifts, and sensor overrides) with an interactive **Fallacy Detective** tool.
- **Tab 3 — 7 Vaisheshika Padarthas (पदार्थाः & Knowledge Graphs)**:
  - *Dravya* (Substance), *Guna* (Quality), *Karma* (Action), *Samanya* (Generality), *Vishesha* (Particularity), *Samavaya* (Inherence), and *Abhava* (Non-existence / Negation).
  - **Interactive Physics Canvas**: Draggable nodes, animated semantic edges, live RDF/SPARQL/Cypher triple generator, and toggle between Vedic and AI display modes.

---

## 🎨 Design & Aesthetics

- **Dark Obsidian / Slate Base**: Deep slate backgrounds (`#060911`, `#0f172a`) with glassmorphism cards (`backdrop-filter: blur(16px)`).
- **Vedic Amber / Gold Accents**: Radiant golds (`#f59e0b`, `#fbbf24`) symbolizing classical Indian epistemological shastras.
- **Symbolic AI Cyan & Indigo**: Glowing cyan (`#22d3ee`, `#06b6d4`) and indigo (`#6366f1`) nodes and telemetry bars.
- **Typography**: `Cinzel`, `Inter`, `JetBrains Mono`, and `Noto Sans Devanagari`.
- **Epistemic Audio Synthesizer**: Web Audio API synthesizing authentic Indian harmonic bell/tanpura resonances for ancient stages and clean digital chimes for modern AI unification.

---

## 🚀 How to Run

HetuLogic is written in pure vanilla **HTML5, CSS3, and JavaScript** with zero external runtime dependencies.

### Option 1: Open Directly in Browser
Simply double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Run via Local HTTP Server
```bash
# Using Python 3
python -m http.server 8000

# Or using npm
npm start

# Open in browser:
http://localhost:8000
```

---

## 🌐 Public Hosting & Deployment

The project is pre-configured with scripts and CI/CD workflows for instant hosting:

### 1. Instant 10-Second Free Hosting (Surge.sh)
```bash
npm run deploy:surge
# Or run directly:
npx surge .
```

### 2. Automated GitHub Pages (Pre-Configured CI/CD)
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`):
```bash
git remote add origin https://github.com/<your-username>/HetuLogic.git
git push -u origin main
```
As soon as you push to GitHub, the workflow automatically deploys the site live to `https://<your-username>.github.io/HetuLogic/` with zero manual configuration.

### 3. Vercel or Netlify
```bash
# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify
npm run deploy:netlify
```

