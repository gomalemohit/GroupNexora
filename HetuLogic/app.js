/**
 * HETULOGIC — ANCIENT INDIAN LOGIC & MODERN AI
 * Core Modules:
 *  1. EpistemicAudio: Web Audio API synthesizer with localStorage persistence
 *  2. Toast Helper & ViewManager (Simulation Mode <-> Quiz Game Mode)
 *  3. InferenceSimulator: Custom & Preset Problem Solver across Nyaya sectors
 *  4. ReferenceGuide: Plain-English Terminology Cards with bidirectional linking
 *  5. QuizGameEngine: One-question-at-a-time Quiz with Unlimited Attempts & Auto-Progression
 *  6. LogicLabGame: 5-Step Syllogism Card Sorting Puzzle
 *  7. Extended Explorer: Mapping Cards, Fallacy Detective & Parchment Knowledge Graph
 *  8. Lexicon Modal & Navigation Setup
 */

// =============================================================================
// 1. EPISTEMIC AUDIO SYNTHESIZER (WEB AUDIO API)
// =============================================================================
class EpistemicAudio {
  constructor() {
    this.ctx = null;
    let saved = null;
    try {
      saved = localStorage.getItem("hetulogic_audio_enabled");
    } catch (e) {}
    this.soundEnabled = saved !== null ? saved === "true" : true;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported.", e);
    }
  }

  resumeCtx() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    try {
      localStorage.setItem("hetulogic_audio_enabled", this.soundEnabled.toString());
    } catch (e) {}
    return this.soundEnabled;
  }

  playVedicBell(stepNumber = 1) {
    if (!this.soundEnabled || !this.ctx) return;
    this.resumeCtx();

    const baseFreqs = [220, 261.63, 329.63, 392, 440];
    const freq = baseFreqs[(stepNumber - 1) % baseFreqs.length];

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.14, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.95);
    subOsc.stop(now + 0.95);
  }

  playAIChime(stepNumber = 1) {
    if (!this.soundEnabled || !this.ctx) return;
    this.resumeCtx();

    const pitches = [440, 523.25, 659.25, 783.99, 880];
    const freq = pitches[(stepNumber - 1) % pitches.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  playSuccessFanfare() {
    if (!this.soundEnabled || !this.ctx) return;
    this.resumeCtx();

    const notes = [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      }, idx * 95);
    });
  }
}

const audioSys = new EpistemicAudio();

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.2s ease";
    setTimeout(() => toast.remove(), 220);
  }, 2400);
}

// =============================================================================
// 2. VIEW SWITCHER (SIMULATION MODE <-> QUIZ GAME MODE)
// =============================================================================
class ViewManager {
  constructor(onSimulationShown = null) {
    this.onSimulationShown = onSimulationShown;
    this.simBtn = document.getElementById("switch-sim-btn");
    this.quizBtn = document.getElementById("switch-quiz-btn");
    this.simView = document.getElementById("view-simulation");
    this.quizView = document.getElementById("view-quiz");

    this.subMcqBtn = document.getElementById("submode-mcq-btn");
    this.subPuzzleBtn = document.getElementById("submode-puzzle-btn");
    this.mcqPanel = document.getElementById("quiz-mcq-panel");
    this.puzzlePanel = document.getElementById("quiz-puzzle-panel");

    this.bindEvents();
  }

  bindEvents() {
    if (this.simBtn) {
      this.simBtn.addEventListener("click", () => this.switchView("simulation"));
    }
    if (this.quizBtn) {
      this.quizBtn.addEventListener("click", () => this.switchView("quiz"));
    }
    if (this.subMcqBtn) {
      this.subMcqBtn.addEventListener("click", () => this.switchQuizSubmode("mcq"));
    }
    if (this.subPuzzleBtn) {
      this.subPuzzleBtn.addEventListener("click", () => this.switchQuizSubmode("puzzle"));
    }
  }

  switchView(viewName) {
    const isQuiz = viewName === "quiz";

    if (this.simView && this.quizView) {
      this.simView.hidden = isQuiz;
      this.quizView.hidden = !isQuiz;
    }

    if (this.simBtn && this.quizBtn) {
      this.simBtn.classList.toggle("active", !isQuiz);
      this.simBtn.setAttribute("aria-selected", String(!isQuiz));
      this.quizBtn.classList.toggle("active", isQuiz);
      this.quizBtn.setAttribute("aria-selected", String(isQuiz));
    }

    if (!isQuiz && typeof this.onSimulationShown === "function") {
      requestAnimationFrame(() => this.onSimulationShown());
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    audioSys.playAIChime(isQuiz ? 3 : 1);
  }

  switchQuizSubmode(submode) {
    const isPuzzle = submode === "puzzle";
    if (this.mcqPanel && this.puzzlePanel) {
      this.mcqPanel.style.display = isPuzzle ? "none" : "block";
      this.puzzlePanel.style.display = isPuzzle ? "block" : "none";
    }
    if (this.subMcqBtn && this.subPuzzleBtn) {
      this.subMcqBtn.classList.toggle("active", !isPuzzle);
      this.subPuzzleBtn.classList.toggle("active", isPuzzle);
    }
    audioSys.playAIChime(2);
  }
}

// =============================================================================
// 3. KNOWLEDGE BASE & PROBLEM SOLVER SIMULATOR (LEFT PANEL)
// =============================================================================
const INFERENCE_PRESETS = {
  mountain: {
    id: "mountain",
    title: "There is fire on the mountain",
    domain: "Classical Nyaya Example",
    paksha: "Mountain",
    sadhya: "Fire",
    hetu: "Smoke",
    drishtanta: "Kitchen Hearth",
    pratyakshaText: "Directly observed evidence: Smoke rising from the mountain ridge (matches AI camera/sensor input).",
    anumanaText: "Using the reliable rule linking smoke to fire to deduce hidden fire (matches AI rule-based inference).",
    stages: [
      {
        step: 1,
        statement: "The mountain has fire.",
        desc: "This is the starting claim we want to prove true. We name the subject (Paksha: Mountain) and the target property (Sadhya: Fire).",
        tags: { paksha: "Mountain", sadhya: "Fire" },
        aiCode: "?- query(mountain, has_property(fire))."
      },
      {
        step: 2,
        statement: "Because there is smoke.",
        desc: "The observable clue or evidence seen directly on the subject. Smoke acts as the logical indicator pointing toward fire.",
        tags: { hetu: "Smoke", status: "Directly Observed" },
        aiCode: 'WorkingMemory.assertFact("sensor_event", { entity: "mountain", sign: "smoke" });'
      },
      {
        step: 3,
        statement: "Wherever there is smoke, there is fire — as seen in a kitchen.",
        desc: "States the universal rule (Vyapti) connecting the clue to the outcome, supported by a clear real-world example everyone agrees on.",
        tags: { vyapti: "Smoke ➔ Fire", drishtanta: "Kitchen Hearth" },
        aiCode: "RULE_042: IF has_sign(?x, smoke) THEN assert(?x, fire);"
      },
      {
        step: 4,
        statement: "This mountain has smoke that always accompanies fire.",
        desc: "Connects the general rule directly to our specific situation: the observed clue on the mountain matches the universal rule.",
        tags: { sambandha: "Rule matched to Mountain" },
        aiCode: 'Unify(RULE_042(?x), "mountain") -> θ = { ?x / "mountain" };'
      },
      {
        step: 5,
        statement: "Therefore, the mountain has fire.",
        desc: "The claim is now a confirmed conclusion. Because both the evidence and universal rule hold true without error, the answer is proven.",
        tags: { pramiti: "Proven & Verified" },
        aiCode: 'WorkingMemory.commitFact("has_fire", "mountain"); Action.dispatch(FIRE_ALERT);'
      }
    ]
  },

  server: {
    id: "server",
    title: "Server is overheating",
    domain: "Cloud Infrastructure & Monitoring",
    paksha: "Server-07",
    sadhya: "Overheating Hazard",
    hetu: "CPU Temp > 98°C",
    drishtanta: "Load Stress Test",
    pratyakshaText: "Directly observed evidence: Hardware thermal sensor reports 98.4°C and maximum fan RPM.",
    anumanaText: "Applying hardware reliability rules to infer imminent thermal throttling before system failure occurs.",
    stages: [
      {
        step: 1,
        statement: "Server-07 is overheating.",
        desc: "We state the operational claim to verify: Server-07 (Paksha) is experiencing a thermal hazard (Sadhya).",
        tags: { paksha: "Server-07", sadhya: "Overheating Hazard" },
        aiCode: "?- query(server_07, status(critical_overheat))."
      },
      {
        step: 2,
        statement: "Because its CPU temperature exceeds 98°C at maximum fan speed.",
        desc: "Direct sensor telemetry gives us clear evidence (Hetu) present on the server right now.",
        tags: { hetu: "CPU Temp > 98°C", status: "Sensor Verified" },
        aiCode: 'WorkingMemory.assertFact("telemetry", { host: "srv-07", temp_c: 98.4, fan_max: true });'
      },
      {
        step: 3,
        statement: "Whenever a CPU exceeds 95°C under full cooling, overheating is occurring — as seen in stress benchmarks.",
        desc: "States the universal engineering rule (Vyapti) backed by documented hardware stress-test records.",
        tags: { vyapti: "Temp > 95°C ➔ Overheat", drishtanta: "Stress Test Logs" },
        aiCode: "RULE_SRE_99: IF temp_c(?s) > 95 AND fan_max(?s) THEN assert(?s, overheat);"
      },
      {
        step: 4,
        statement: "Server-07 has that exact high-temperature condition covered by the rule.",
        desc: "Links the general hardware threshold rule specifically to Server-07.",
        tags: { sambandha: "Rule matched to Server-07" },
        aiCode: 'Unify(RULE_SRE_99(?s), "server_07") -> θ = { ?s / "server_07" };'
      },
      {
        step: 5,
        statement: "Therefore, Server-07 is confirmed as overheating.",
        desc: "The diagnosis is logically proven, allowing the automated system to safely migrate workloads and throttle clock speed.",
        tags: { pramiti: "Confirmed — Throttle & Migrate" },
        aiCode: 'WorkingMemory.commitFact("overheat", "server_07"); Action.dispatch(THROTTLE_AND_MIGRATE);'
      }
    ]
  },

  packet_loss: {
    id: "packet_loss",
    title: "Network packet loss detected",
    domain: "Network Diagnostics",
    paksha: "Gateway Router-X",
    sadhya: "Packet Loss",
    hetu: "TCP Retransmissions > 35%",
    drishtanta: "Congested Transit Link",
    pratyakshaText: "Directly observed evidence: Flow telemetry measures a 38% spike in TCP retransmission packets.",
    anumanaText: "Deducing active packet drops on the link from retransmission spikes using network protocol rules.",
    stages: [
      {
        step: 1,
        statement: "Gateway Router-X is experiencing packet loss.",
        desc: "States the network issue we need to diagnose on Router-X (Paksha).",
        tags: { paksha: "Router-X", sadhya: "Packet Loss" },
        aiCode: "?- query(router_x, state(packet_loss))."
      },
      {
        step: 2,
        statement: "Because TCP retransmission rates jumped above 35%.",
        desc: "Observed network traffic data provides the clear clue (Hetu) showing packets are not arriving.",
        tags: { hetu: "Retransmissions > 35%", status: "Telemetry Observed" },
        aiCode: 'WorkingMemory.assertFact("netflow", { router: "router_x", retransmit_pct: 38.2 });'
      },
      {
        step: 3,
        statement: "Whenever retransmissions exceed 30% with high jitter, packet loss is occurring — as seen in congested links.",
        desc: "Establishes the universal networking rule (Vyapti) with a standard real-world example.",
        tags: { vyapti: "High Retransmit ➔ Drop", drishtanta: "Congested Link" },
        aiCode: "RULE_NET_07: IF retransmit(?r) > 30 THEN assert(?r, packet_loss);"
      },
      {
        step: 4,
        statement: "Router-X shows this exact retransmission pattern.",
        desc: "Applies the universal congestion rule directly to Gateway Router-X.",
        tags: { sambandha: "Rule matched to Router-X" },
        aiCode: 'Unify(RULE_NET_07(?r), "router_x") -> θ = { ?r / "router_x" };'
      },
      {
        step: 5,
        statement: "Therefore, Gateway Router-X has confirmed packet loss.",
        desc: "With the problem verified, the network controller can automatically shift traffic to a healthy backup route.",
        tags: { pramiti: "Confirmed — Reroute Traffic" },
        aiCode: 'WorkingMemory.commitFact("packet_loss", "router_x"); SDN.reroute("backup_gateway");'
      }
    ]
  },

  pneumonia: {
    id: "pneumonia",
    title: "Patient has acute pneumonia",
    domain: "Medical Decision Support AI",
    paksha: "Patient-402",
    sadhya: "Acute Pneumonia",
    hetu: "Chest X-Ray Shadow & Low Oxygen",
    drishtanta: "Verified Clinical Cases",
    pratyakshaText: "Directly observed evidence: Chest scan reveals lung fluid shadow and pulse oximeter reads 90% SpO2.",
    anumanaText: "Combining observable symptoms with established medical guidelines to confirm a diagnosis.",
    stages: [
      {
        step: 1,
        statement: "Patient-402 has acute pneumonia.",
        desc: "States the medical hypothesis to evaluate for the patient (Paksha).",
        tags: { paksha: "Patient-402", sadhya: "Acute Pneumonia" },
        aiCode: "?- query(patient_402, diagnosis(pneumonia))."
      },
      {
        step: 2,
        statement: "Because chest X-ray shows lung infiltration alongside fever and low oxygen.",
        desc: "Objective lab results and vital signs provide the direct clinical clue (Hetu).",
        tags: { hetu: "X-Ray Shadow + Low SpO2", status: "Clinically Measured" },
        aiCode: 'WorkingMemory.assertFact("ehr_vitals", { spo2: 90, cxr_infiltrate: true, fever: 39.1 });'
      },
      {
        step: 3,
        statement: "Whenever lung infiltration appears with fever and low oxygen, acute pneumonia is present — as verified in clinical studies.",
        desc: "States the evidence-based medical rule (Vyapti) backed by verified clinical records.",
        tags: { vyapti: "Infiltration + Fever ➔ Pneumonia", drishtanta: "Clinical Cohort" },
        aiCode: "RULE_MED_14: IF cxr_infiltrate(?p) AND hypoxia(?p) THEN assert(?p, pneumonia);"
      },
      {
        step: 4,
        statement: "Patient-402 displays these exact clinical signs.",
        desc: "Connects the verified medical rule directly to Patient-402's test results.",
        tags: { sambandha: "Rule matched to Patient-402" },
        aiCode: 'Unify(RULE_MED_14(?p), "patient_402") -> θ = { ?p / "patient_402" };'
      },
      {
        step: 5,
        statement: "Therefore, Patient-402 is diagnosed with acute pneumonia.",
        desc: "The clinical AI records an auditable diagnosis so doctors can begin targeted treatment immediately.",
        tags: { pramiti: "Confirmed Diagnosis" },
        aiCode: 'CDSS.commitDiagnosis("patient_402", "pneumonia"); CarePlan.suggestProtocol();'
      }
    ]
  },

  autonomous_brake: {
    id: "autonomous_brake",
    title: "Autonomous vehicle emergency brake",
    domain: "Robotics & Self-Driving Safety",
    paksha: "Autonomous Car",
    sadhya: "Emergency Stop Required",
    hetu: "Obstacle Within 5.4 Meters",
    drishtanta: "Safety Proving Ground",
    pratyakshaText: "Directly observed evidence: LiDAR and stereo cameras detect an obstacle 5.4 meters ahead closing rapidly.",
    anumanaText: "Applying deterministic collision-physics rules to trigger an immediate safety stop.",
    stages: [
      {
        step: 1,
        statement: "The autonomous vehicle must execute an emergency brake.",
        desc: "States the critical safety decision (Sadhya) being evaluated for the vehicle (Paksha).",
        tags: { paksha: "Autonomous Car", sadhya: "Emergency Stop" },
        aiCode: "?- query(vehicle_alpha, action(emergency_brake))."
      },
      {
        step: 2,
        statement: "Because forward LiDAR detects a pedestrian 5.4 meters ahead with closing speed.",
        desc: "Real-time sensor fusion supplies the direct physical evidence (Hetu).",
        tags: { hetu: "LiDAR Obstacle < 6m", status: "Sensor Fused" },
        aiCode: 'WorkingMemory.assertFact("lidar_track", { distance_m: 5.4, closing_mps: 12.0 });'
      },
      {
        step: 3,
        statement: "Whenever time-to-collision drops under 0.6 seconds, full braking is required — as proven on safety test tracks.",
        desc: "States the inviolable safety rule (Vyapti) verified in physics testing.",
        tags: { vyapti: "TTC < 0.6s ➔ Full Brake", drishtanta: "Safety Test Track" },
        aiCode: "RULE_AV_01: IF ttc(?v) < 0.6 THEN dispatch_override(?v, MAX_BRAKE);"
      },
      {
        step: 4,
        statement: "The autonomous vehicle is currently inside that critical stopping window.",
        desc: "Connects the safety guardrail directly to the car's live distance reading.",
        tags: { sambandha: "Rule matched to Vehicle" },
        aiCode: 'Unify(RULE_AV_01(?v), "vehicle_alpha") -> θ = { ?v / "vehicle_alpha" };'
      },
      {
        step: 5,
        statement: "Therefore, the autonomous vehicle triggers maximum emergency braking.",
        desc: "Deduction completes in milliseconds and commands the braking system to avert a collision.",
        tags: { pramiti: "Safety Stop Executed" },
        aiCode: 'Actuator.applyBrakes(100); Log.record("COLLISION_AVERTED");'
      }
    ]
  }
};

class InferenceSimulator {
  constructor(onStageHighlight = null) {
    this.onStageHighlight = onStageHighlight;
    this.currentPresetKey = "mountain";
    this.currentStep = 0;
    this.isRunning = false;
    this.stepInterval = null;
    this.speedMs = 800;

    this.cacheDOM();
    this.bindEvents();
    this.loadPreset("mountain");
  }

  cacheDOM() {
    this.presetSelect = document.getElementById("preset-select");
    this.customInput = document.getElementById("custom-proposition-input");
    this.presetChips = document.querySelectorAll(".preset-chip");
    this.runBtn = document.getElementById("run-inference-btn");
    this.stepBtn = document.getElementById("step-inference-btn");
    this.stepPrevBtn = document.getElementById("step-prev-btn");
    this.resetBtn = document.getElementById("reset-inference-btn");
    this.speedBtns = document.querySelectorAll(".speed-btn");
    this.progressBar = document.getElementById("stepper-progress-bar");
    this.stepperNodes = document.querySelectorAll(".stepper-node");

    this.nyayaStatusPill = document.getElementById("nyaya-status-pill");
    this.bridgeBar = document.getElementById("epistemic-bridge-bar");
    this.bridgeNyayaLabel = document.getElementById("bridge-nyaya-label");
    this.bridgeAiLabel = document.getElementById("bridge-ai-label");

    this.pratyakshaTextEl = document.getElementById("sector-pratyaksha-text");
    this.anumanaTextEl = document.getElementById("sector-anumana-text");

    this.logTerminal = document.getElementById("inference-log-terminal");
    this.copyTraceBtn = document.getElementById("copy-trace-btn");
    this.clearTraceBtn = document.getElementById("clear-trace-btn");

    this.exportReportBtn = document.getElementById("export-report-btn");
    this.exportModal = document.getElementById("export-modal");
    this.closeExportBtn = document.getElementById("close-export-btn");
    this.reportPre = document.getElementById("report-text-pre");
    this.copyReportBtn = document.getElementById("copy-report-markdown-btn");
    this.downloadReportBtn = document.getElementById("download-report-btn");
  }

  bindEvents() {
    if (this.presetSelect) {
      this.presetSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        this.syncPresetChips(val);
        if (val === "custom") {
          this.setupCustomPreset();
        } else {
          this.loadPreset(val);
        }
      });
    }

    this.presetChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const presetKey = chip.getAttribute("data-preset");
        this.syncPresetChips(presetKey);
        if (this.presetSelect) this.presetSelect.value = presetKey;
        this.loadPreset(presetKey);
      });
    });

    if (this.customInput) {
      this.customInput.addEventListener("input", () => {
        const typed = this.customInput.value.trim();
        const activeData = INFERENCE_PRESETS[this.currentPresetKey];
        if (!activeData || typed !== activeData.title) {
          if (this.presetSelect) this.presetSelect.value = "custom";
          this.syncPresetChips("custom");
        }
      });
      this.customInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.setupCustomPreset(this.customInput.value);
          this.runFullInference();
        }
      });
    }

    if (this.runBtn) this.runBtn.addEventListener("click", () => this.toggleRunInference());
    if (this.stepBtn) this.stepBtn.addEventListener("click", () => this.stepInference());
    if (this.stepPrevBtn) this.stepPrevBtn.addEventListener("click", () => this.stepPrevInference());
    if (this.resetBtn) this.resetBtn.addEventListener("click", () => this.resetInference());

    window.addEventListener("keydown", (e) => {
      const simView = document.getElementById("view-simulation");
      if (simView && simView.hidden) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
      if (document.querySelector(".modal-overlay.open")) {
        if (e.key === "Escape") {
          document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
        }
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        this.toggleRunInference();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        this.stepInference();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        this.stepPrevInference();
      }
    });

    this.speedBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.speedBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.speedMs = parseInt(btn.getAttribute("data-speed"), 10) || 800;
      });
    });

    this.stepperNodes.forEach(node => {
      node.addEventListener("click", () => {
        const step = parseInt(node.getAttribute("data-step"), 10);
        this.jumpToStep(step);
      });
    });

    if (this.copyTraceBtn) this.copyTraceBtn.addEventListener("click", () => this.copyTraceLog());
    if (this.clearTraceBtn) {
      this.clearTraceBtn.addEventListener("click", () => {
        if (this.logTerminal) {
          this.logTerminal.innerHTML = '<div class="log-line system-line">[Ready] Log cleared.</div>';
        }
      });
    }

    if (this.exportReportBtn) this.exportReportBtn.addEventListener("click", () => this.openExportModal());
    if (this.closeExportBtn) {
      this.closeExportBtn.addEventListener("click", () => {
        if (this.exportModal) this.exportModal.classList.remove("open");
      });
    }
    if (this.exportModal) {
      this.exportModal.addEventListener("click", (e) => {
        if (e.target === this.exportModal) this.exportModal.classList.remove("open");
      });
    }
    if (this.copyReportBtn) this.copyReportBtn.addEventListener("click", () => this.copyReport());
    if (this.downloadReportBtn) this.downloadReportBtn.addEventListener("click", () => this.downloadReport());
  }

  syncPresetChips(presetKey) {
    this.presetChips.forEach(c => {
      c.classList.toggle("active", c.getAttribute("data-preset") === presetKey);
    });
  }

  ensureCustomInputSynced() {
    if (!this.customInput) return;
    const typed = this.customInput.value.trim();
    const activeData = INFERENCE_PRESETS[this.currentPresetKey];
    if (typed && (!activeData || typed !== activeData.title)) {
      this.setupCustomPreset(typed);
    }
  }

  loadPreset(presetKey) {
    this.resetInference();
    const data = INFERENCE_PRESETS[presetKey] || INFERENCE_PRESETS.mountain;
    this.currentPresetKey = presetKey;
    this.syncPresetChips(presetKey);

    if (this.customInput) {
      this.customInput.value = data.title;
    }

    if (this.pratyakshaTextEl) this.pratyakshaTextEl.textContent = data.pratyakshaText;
    if (this.anumanaTextEl) this.anumanaTextEl.textContent = data.anumanaText;

    for (let i = 1; i <= 5; i++) {
      const stage = data.stages[i - 1];
      if (!stage) continue;

      const stmtEl = document.getElementById(`nyaya-sutra-${i}`);
      const descEl = document.getElementById(`nyaya-desc-${i}`);
      const aiCodeEl = document.getElementById(`ai-code-${i}`);
      if (stmtEl) stmtEl.textContent = stage.statement;
      if (descEl) descEl.textContent = stage.desc;
      if (aiCodeEl) aiCodeEl.textContent = stage.aiCode;
    }

    const tagPaksha = document.getElementById("tag-paksha");
    const tagSadhya = document.getElementById("tag-sadhya");
    const tagHetu = document.getElementById("tag-hetu");
    const tagHetuStatus = document.getElementById("tag-hetu-status");
    const tagVyapti = document.getElementById("tag-vyapti");
    const tagDrishtanta = document.getElementById("tag-drishtanta");
    const tagSambandha = document.getElementById("tag-sambandha");
    const tagPramiti = document.getElementById("tag-pramiti");

    if (tagPaksha) tagPaksha.textContent = data.paksha;
    if (tagSadhya) tagSadhya.textContent = data.sadhya;
    if (tagHetu) tagHetu.textContent = data.hetu;
    if (tagHetuStatus) tagHetuStatus.textContent = data.stages[1]?.tags?.status || "Observed";
    if (tagVyapti) tagVyapti.textContent = data.stages[2]?.tags?.vyapti || "Clue ➔ Result";
    if (tagDrishtanta) tagDrishtanta.textContent = data.drishtanta;
    if (tagSambandha) tagSambandha.textContent = data.stages[3]?.tags?.sambandha || "Rule matched";
    if (tagPramiti) tagPramiti.textContent = data.stages[4]?.tags?.pramiti || "Verified";

    this.log(`[Loaded] Scenario: "${data.title}" (${data.domain})`);
  }

  parseCustomProposition(rawText) {
    const clean = (rawText || "Custom Scenario").trim();
    let proposition = clean;
    let reason = "observed empirical sign";

    const reasonSplit = clean.match(/^(.+?)\s+(?:because|since|due to)\s+(.+)$/i);
    if (reasonSplit) {
      proposition = reasonSplit[1].trim();
      reason = reasonSplit[2].trim();
    }

    let subject = "Subject";
    let predicate = proposition;

    const thereIsMatch = proposition.match(/^there\s+(?:is|are)\s+(.+?)\s+(?:on|in|at)\s+(?:the\s+)?(.+)$/i);
    const isMatch = proposition.match(/^(?:the\s+)?(.+?)\s+(?:is|are|has|have)\s+(.+)$/i);

    if (thereIsMatch) {
      predicate = thereIsMatch[1].trim();
      subject = thereIsMatch[2].trim();
    } else if (isMatch) {
      subject = isMatch[1].trim();
      predicate = isMatch[2].trim();
    } else {
      const words = proposition.split(/\s+/);
      subject = words[0] || "Subject";
      predicate = words.slice(1).join(" ") || "target condition";
    }

    const toSlug = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "item";
    return {
      proposition,
      subject,
      predicate,
      reason,
      subSlug: toSlug(subject),
      predSlug: toSlug(predicate),
      reasonSlug: toSlug(reason)
    };
  }

  setupCustomPreset(customText = null) {
    const raw = (customText !== null ? customText : (this.customInput ? this.customInput.value : "")).trim() || "Custom Scenario";
    const p = this.parseCustomProposition(raw);
    this.resetInference();
    this.currentPresetKey = "custom";
    if (this.presetSelect) this.presetSelect.value = "custom";
    this.syncPresetChips("custom");

    const isClause = /\b(is|are|was|were|has|have|had|can|will|exceeds|exceeded|stopped|failed|dropped|detected)\b/i.test(p.reason) || p.reason.split(/\s+/).length >= 3;
    const hetuStatement = isClause ? `Because ${p.reason}.` : `Because of ${p.reason}.`;
    const lowercaseLead = p.proposition.replace(/^(The|A|An)\s+/i, (m) => m.toLowerCase());

    INFERENCE_PRESETS.custom = {
      id: "custom",
      title: raw,
      domain: "Custom Logical Problem",
      paksha: p.subject,
      sadhya: p.predicate,
      hetu: p.reason,
      drishtanta: "Verified Real-World Case",
      pratyakshaText: `Directly observed evidence: "${p.reason}" noticed for "${p.subject}" (matches AI sensor/data input).`,
      anumanaText: `Using the pattern linking "${p.reason}" to "${p.predicate}" to solve whether "${p.proposition}" holds true.`,
      stages: [
        {
          step: 1,
          statement: p.proposition,
          desc: `We state the claim to test: does "${p.subject}" have the condition "${p.predicate}"?`,
          tags: { paksha: p.subject, sadhya: p.predicate },
          aiCode: `?- query(${p.subSlug}, state(${p.predSlug})).`
        },
        {
          step: 2,
          statement: hetuStatement,
          desc: `This is our observed clue (Hetu) detected directly on "${p.subject}".`,
          tags: { hetu: p.reason, status: "Directly Observed" },
          aiCode: `WorkingMemory.assertFact("observation", { entity: "${p.subSlug}", sign: "${p.reasonSlug}" });`
        },
        {
          step: 3,
          statement: `Wherever "${p.reason}" occurs, "${p.predicate}" consistently follows — as confirmed in past verified cases.`,
          desc: `States the universal rule (Vyapti) connecting the clue to the outcome with an agreed example.`,
          tags: { vyapti: `${p.reason} ➔ ${p.predicate}`, drishtanta: "Verified Past Case" },
          aiCode: `RULE_CUSTOM: IF has_sign(?x, ${p.reasonSlug}) THEN assert(?x, ${p.predSlug});`
        },
        {
          step: 4,
          statement: `"${p.subject}" currently matches "${p.reason}", fitting that universal rule.`,
          desc: `Applies the general rule specifically to "${p.subject}".`,
          tags: { sambandha: `Rule matched to ${p.subject}` },
          aiCode: `Unify(RULE_CUSTOM(?x), "${p.subSlug}") -> θ = { ?x / "${p.subSlug}" };`
        },
        {
          step: 5,
          statement: `Therefore, ${lowercaseLead}.`,
          desc: `The claim is now logically concluded and ready for action.`,
          tags: { pramiti: "Proven & Verified" },
          aiCode: `WorkingMemory.commitFact("${p.predSlug}", "${p.subSlug}"); Action.emit("PROVEN");`
        }
      ]
    };

    this.loadPreset("custom");
  }

  toggleRunInference() {
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Resume</span>';
      }
      this.log(`[Paused] Analysis paused at Step ${this.currentStep}.`);
    } else {
      this.ensureCustomInputSynced();
      if (this.currentStep >= 5) {
        this.resetInference();
      }
      this.runFullInference();
    }
  }

  runFullInference() {
    if (this.isRunning) return;
    if (this.currentStep >= 5) {
      this.resetInference();
    }
    this.isRunning = true;

    if (this.runBtn) {
      this.runBtn.innerHTML = '<span class="btn-icon">⏸</span><span class="btn-text">Pause</span>';
    }

    this.setStatusActive(true);
    if (this.currentStep === 0) {
      const activeData = INFERENCE_PRESETS[this.currentPresetKey] || INFERENCE_PRESETS.mountain;
      this.log(`[Start] Solving "${activeData.title}" across 5 Nyaya steps...`);
    }

    this.stepInterval = setInterval(() => {
      if (this.currentStep < 5) {
        this.currentStep++;
        this.renderStep(this.currentStep);
      } else {
        clearInterval(this.stepInterval);
        this.stepInterval = null;
        this.isRunning = false;
        if (this.runBtn) {
          this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Solve</span>';
        }
        this.log("[Complete] Nigamana reached. Logical proof finished.");
      }
    }, this.speedMs);
  }

  stepPrevInference() {
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Solve</span>';
      }
    }

    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderStep(this.currentStep);
    } else {
      this.resetInference();
    }
  }

  stepInference() {
    this.ensureCustomInputSynced();
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Solve</span>';
      }
    }

    if (this.currentStep >= 5) {
      this.resetInference();
    }

    this.currentStep++;
    this.setStatusActive(true);
    this.renderStep(this.currentStep);
  }

  jumpToStep(targetStep) {
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.isRunning = false;
    }
    if (this.runBtn) {
      this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Solve</span>';
    }
    this.resetInference();
    this.setStatusActive(true);
    for (let s = 1; s <= targetStep; s++) {
      this.currentStep = s;
      this.renderStep(s, false);
    }
    audioSys.playVedicBell(targetStep);
  }

  renderStep(stepNum, withSound = true) {
    const stageTerms = ["pratijna", "hetu", "udaharana", "upanaya", "nigamana"];
    const stageTitles = ["Pratijna (Proposition)", "Hetu (Reason)", "Udaharana (Rule & Example)", "Upanaya (Application)", "Nigamana (Conclusion)"];
    const aiStages = ["Target Goal Query", "Sensor Fact Input", "IF-THEN Rule", "Pattern Unification", "Engine Output"];

    if (this.bridgeBar && this.bridgeNyayaLabel && this.bridgeAiLabel) {
      this.bridgeBar.classList.add("active");
      this.bridgeNyayaLabel.textContent = `Step ${stepNum}/5: ${stageTitles[stepNum - 1]}`;
      this.bridgeAiLabel.textContent = `AI: ${aiStages[stepNum - 1]}`;
    }

    if (this.progressBar) {
      this.progressBar.style.width = `${(stepNum / 5) * 100}%`;
    }

    this.stepperNodes.forEach(node => {
      const s = parseInt(node.getAttribute("data-step"), 10);
      node.classList.toggle("completed", s < stepNum);
      node.classList.toggle("active", s === stepNum);
    });

    for (let i = 1; i <= 5; i++) {
      const nyayaCard = document.getElementById(`nyaya-step-${i}`);
      if (!nyayaCard) continue;
      const badge = nyayaCard.querySelector(".step-state-badge");

      if (i < stepNum) {
        nyayaCard.classList.remove("active-stage");
        nyayaCard.classList.add("completed-stage");
        if (badge) badge.textContent = "Verified ✓";
      } else if (i === stepNum) {
        nyayaCard.classList.add("active-stage");
        nyayaCard.classList.remove("completed-stage");
        if (badge) badge.textContent = "Active";
      } else {
        nyayaCard.classList.remove("active-stage", "completed-stage");
        if (badge) badge.textContent = "Pending";
      }
    }

    if (typeof this.onStageHighlight === "function") {
      this.onStageHighlight(stageTerms[stepNum - 1], false);
    }

    if (withSound) {
      audioSys.playVedicBell(stepNum);
      setTimeout(() => audioSys.playAIChime(stepNum), 120);
    }

    const data = INFERENCE_PRESETS[this.currentPresetKey] || INFERENCE_PRESETS.mountain;
    const stageData = data.stages[stepNum - 1];
    if (stageData) {
      this.log(`[Step ${stepNum}] ${stageTitles[stepNum - 1]}: ${stageData.statement}`);
      this.log(`   ↳ AI Equivalent: ${stageData.aiCode}`, "sub-log");
    }
  }

  resetInference() {
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }
    this.isRunning = false;
    this.currentStep = 0;

    if (this.runBtn) {
      this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Solve</span>';
    }
    if (this.progressBar) this.progressBar.style.width = "0%";

    this.stepperNodes.forEach(node => node.classList.remove("active", "completed"));

    for (let i = 1; i <= 5; i++) {
      const nyayaCard = document.getElementById(`nyaya-step-${i}`);
      if (nyayaCard) {
        nyayaCard.classList.remove("active-stage", "completed-stage");
        const b = nyayaCard.querySelector(".step-state-badge");
        if (b) b.textContent = "Pending";
      }
    }

    this.setStatusActive(false);
    if (this.bridgeBar && this.bridgeNyayaLabel && this.bridgeAiLabel) {
      this.bridgeBar.classList.remove("active");
      this.bridgeNyayaLabel.textContent = "Nyaya Step: Standby";
      this.bridgeAiLabel.textContent = "Symbolic AI: Ready to Solve";
    }
  }

  setStatusActive(active) {
    if (!this.nyayaStatusPill) return;
    this.nyayaStatusPill.classList.toggle("active", active);
    const label = this.nyayaStatusPill.querySelector(".status-text");
    if (label) label.textContent = active ? "Solving" : "Ready";
  }

  log(msg, customClass = "system-line") {
    if (!this.logTerminal) return;
    const time = new Date().toISOString().substring(11, 19);
    const line = document.createElement("div");
    line.className = `log-line ${customClass}`;
    line.textContent = `[${time}] ${msg}`;
    this.logTerminal.appendChild(line);
    this.logTerminal.scrollTop = this.logTerminal.scrollHeight;
  }

  copyTraceLog() {
    if (!this.logTerminal) return;
    navigator.clipboard.writeText(this.logTerminal.innerText).then(() => {
      showToast("✓ Reasoning trace copied to clipboard.");
    }).catch(() => {
      showToast("⚠️ Clipboard access unavailable in this browser.");
    });
  }

  openExportModal() {
    const data = INFERENCE_PRESETS[this.currentPresetKey] || INFERENCE_PRESETS.mountain;
    const dateStr = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";

    const reportMarkdown = `# HetuLogic Reasoning Report
Generated: ${dateStr}
Domain: ${data.domain}
Problem Statement: "${data.title}"

## 1. Epistemic Sectors
- Pratyaksha (Observation): ${data.pratyakshaText}
- Anumana (Inference): ${data.anumanaText}

## 2. 5-Step Nyaya Proof & Modern AI Mapping
1. Pratijna (Proposition): ${data.stages[0].statement}
   - AI Query: ${data.stages[0].aiCode}
2. Hetu (Reason / Sign): ${data.stages[1].statement}
   - AI Fact Input: ${data.stages[1].aiCode}
3. Udaharana (Universal Rule & Example): ${data.stages[2].statement}
   - AI Rule: ${data.stages[2].aiCode}
4. Upanaya (Application): ${data.stages[3].statement}
   - AI Unification: ${data.stages[3].aiCode}
5. Nigamana (Conclusion): ${data.stages[4].statement}
   - AI Output: ${data.stages[4].aiCode}
`;

    if (this.reportPre) this.reportPre.textContent = reportMarkdown;
    if (this.exportModal) this.exportModal.classList.add("open");
    audioSys.playAIChime(1);
  }

  copyReport() {
    if (!this.reportPre) return;
    navigator.clipboard.writeText(this.reportPre.textContent).then(() => {
      showToast("✓ Reasoning report copied as Markdown.");
    }).catch(() => {
      showToast("⚠️ Clipboard access unavailable.");
    });
  }

  downloadReport() {
    if (!this.reportPre) return;
    const blob = new Blob([this.reportPre.textContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `HetuLogic_Report_${this.currentPresetKey}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    audioSys.playAIChime(2);
  }
}

// =============================================================================
// 4. TERMINOLOGY REFERENCE GUIDE (RIGHT PANEL) + CROSS-PANEL INTERACTIVITY
// =============================================================================
const REFERENCE_TERMS = [
  {
    id: "pratyaksha",
    term: "Pratyaksha",
    subtitle: "Direct Perception",
    category: "epistemology",
    catLabel: "Way of Knowing",
    plainDef: "Knowledge gained directly through your senses or physical measurement—seeing smoke, hearing an alarm, or reading a temperature sensor.",
    aiLink: "Matches Computer Vision, LiDAR, microphones, and live IoT telemetry."
  },
  {
    id: "anumana",
    term: "Anumana",
    subtitle: "Logical Inference",
    category: "epistemology",
    catLabel: "Way of Knowing",
    plainDef: "Figuring out something you cannot directly see by combining a visible clue with a trusted rule from experience.",
    aiLink: "Matches deductive AI inference engines and predictive machine learning models."
  },
  {
    id: "pratijna",
    term: "Pratijna",
    subtitle: "Proposition / Claim",
    category: "syllogism",
    catLabel: "Step 1",
    plainDef: "The clear opening statement you want to prove—for example, 'The mountain has fire.'",
    aiLink: "Matches the Target Goal or Query submitted to an AI reasoning engine."
  },
  {
    id: "hetu",
    term: "Hetu",
    subtitle: "Reason / Observed Sign",
    category: "syllogism",
    catLabel: "Step 2",
    plainDef: "The visible evidence or clue that supports your claim—for example, 'Because there is smoke.'",
    aiLink: "Matches the active input feature, signal, or condition trigger in an AI system."
  },
  {
    id: "udaharana",
    term: "Udaharana",
    subtitle: "Rule with Real Example",
    category: "syllogism",
    catLabel: "Step 3",
    plainDef: "States a general rule backed by a familiar, real-world example—such as 'Wherever there is smoke, there is fire, like in a kitchen.'",
    aiLink: "Matches an IF-THEN Knowledge Base rule validated against verified training data."
  },
  {
    id: "upanaya",
    term: "Upanaya",
    subtitle: "Application to Current Case",
    category: "syllogism",
    catLabel: "Step 4",
    plainDef: "Connects the general rule directly to the specific situation in front of you—showing that this mountain has that exact type of smoke.",
    aiLink: "Matches Pattern Matching and Variable Unification in rule engines."
  },
  {
    id: "nigamana",
    term: "Nigamana",
    subtitle: "Final Conclusion",
    category: "syllogism",
    catLabel: "Step 5",
    plainDef: "The final verified answer after every step and example checks out—'Therefore, the mountain has fire.'",
    aiLink: "Matches the final audited output and action dispatched by an Explainable AI system."
  },
  {
    id: "vyapti",
    term: "Vyapti",
    subtitle: "Unbreakable Rule / Connection",
    category: "ontology",
    catLabel: "Core Concept",
    plainDef: "A dependable relationship where one clue always accompanies another outcome without exception (smoke always comes from fire).",
    aiLink: "Matches strict IF-THEN logical rules and reliable causal features."
  },
  {
    id: "paksha",
    term: "Paksha & Sadhya",
    subtitle: "Subject & Target Property",
    category: "ontology",
    catLabel: "Core Concept",
    plainDef: "Paksha is the thing you are investigating (the mountain), while Sadhya is the hidden property you are trying to prove (fire).",
    aiLink: "Matches the Entity/Node (Paksha) and the Target Prediction Label (Sadhya)."
  },
  {
    id: "upamana",
    term: "Upamana",
    subtitle: "Comparison / Analogy",
    category: "epistemology",
    catLabel: "Way of Knowing",
    plainDef: "Recognizing something unfamiliar by comparing its features to something you already know well.",
    aiLink: "Matches Vector Embeddings, Cosine Similarity, and Few-Shot Learning."
  },
  {
    id: "shabda",
    term: "Shabda",
    subtitle: "Trusted Testimony",
    category: "epistemology",
    catLabel: "Way of Knowing",
    plainDef: "Knowledge learned from a reliable, verified expert, document, or authoritative source.",
    aiLink: "Matches Retrieval-Augmented Generation (RAG) and verified Knowledge Bases."
  },
  {
    id: "hetvabhasa",
    term: "Hetvabhasa & Padarthas",
    subtitle: "Fallacies & Categories",
    category: "ontology",
    catLabel: "Core Concept",
    plainDef: "Hetvabhasa are misleading clues that cause wrong conclusions; Padarthas (Vaisheshika) are the 7 basic building blocks used to organize reality.",
    aiLink: "Matches AI hallucinations/bias (Hetvabhasa) and Knowledge Graph schemas (Padarthas)."
  }
];

class ReferenceGuide {
  constructor() {
    this.listEl = document.getElementById("reference-cards-list");
    this.searchInput = document.getElementById("ref-search-input");
    this.filterPills = document.querySelectorAll("#ref-filter-pills .ref-pill");
    this.countPill = document.getElementById("ref-count-pill");
    this.activeBanner = document.getElementById("ref-active-banner");

    this.activeCategory = "all";
    this.searchQuery = "";
    this.activeTermId = null;

    this.render();
    this.bindEvents();
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    this.filterPills.forEach(pill => {
      pill.addEventListener("click", () => {
        this.filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.activeCategory = pill.getAttribute("data-cat") || "all";
        this.render();
      });
    });

    // Left Panel -> Right Panel interactive linking
    const leftSources = document.querySelectorAll(".interactive-term-source");
    leftSources.forEach(el => {
      const termId = el.getAttribute("data-term");
      if (!termId) return;

      el.addEventListener("mouseenter", () => this.highlightTerm(termId, false));
      el.addEventListener("click", () => {
        this.highlightTerm(termId, true);
        audioSys.playAIChime(1);
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.highlightTerm(termId, true);
        }
      });
    });
  }

  render() {
    if (!this.listEl) return;

    const filtered = REFERENCE_TERMS.filter(item => {
      const catMatch = this.activeCategory === "all" || item.category === this.activeCategory;
      const q = this.searchQuery;
      const textMatch = !q ||
        item.term.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.plainDef.toLowerCase().includes(q) ||
        item.aiLink.toLowerCase().includes(q);
      return catMatch && textMatch;
    });

    if (this.countPill) {
      this.countPill.textContent = `${filtered.length} Term${filtered.length === 1 ? "" : "s"}`;
    }

    if (filtered.length === 0) {
      this.listEl.innerHTML = `<div style="padding:1.5rem; text-align:center; color:#7C6B62;">No matching terms found. Try clearing your filter.</div>`;
      return;
    }

    this.listEl.innerHTML = filtered.map(item => `
      <article class="ref-card${this.activeTermId === item.id ? " highlighted" : ""}" data-ref-term="${item.id}" tabindex="0">
        <div class="ref-card-top">
          <h3 class="ref-term-title">${item.term} — ${item.subtitle}</h3>
          <span class="ref-cat-badge">${item.catLabel}</span>
        </div>
        <p class="ref-plain-def">${item.plainDef}</p>
        <div class="ref-ai-link"><strong>In AI:</strong> ${item.aiLink}</div>
      </article>
    `).join("");

    // Right Panel -> Left Panel interactive linking
    this.listEl.querySelectorAll(".ref-card").forEach(card => {
      const termId = card.getAttribute("data-ref-term");
      const activateFromRight = () => {
        this.highlightTerm(termId, false);
        this.pulseLeftSource(termId);
        audioSys.playAIChime(2);
      };
      card.addEventListener("click", activateFromRight);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activateFromRight();
        }
      });
    });
  }

  highlightTerm(termId, shouldScrollRight = true) {
    this.activeTermId = termId;
    const item = REFERENCE_TERMS.find(t => t.id === termId);
    if (!item) return;

    if (this.activeCategory !== "all" && item.category !== this.activeCategory) {
      this.activeCategory = "all";
      this.filterPills.forEach(p => p.classList.toggle("active", p.getAttribute("data-cat") === "all"));
      this.render();
    }

    if (this.searchQuery) {
      this.searchQuery = "";
      if (this.searchInput) this.searchInput.value = "";
      this.render();
    }

    if (this.listEl) {
      this.listEl.querySelectorAll(".ref-card").forEach(card => {
        const isMatch = card.getAttribute("data-ref-term") === termId;
        card.classList.toggle("highlighted", isMatch);
        if (isMatch && shouldScrollRight) {
          card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }

    if (this.activeBanner) {
      this.activeBanner.innerHTML = `<strong>Spotlight:</strong> ${item.term} (${item.subtitle}) — ${item.plainDef}`;
    }
  }

  pulseLeftSource(termId) {
    document.querySelectorAll(".interactive-term-source").forEach(el => {
      const match = el.getAttribute("data-term") === termId;
      el.classList.toggle("source-active", match);
      if (match) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
}

// =============================================================================
// 5. QUIZ GAME MODE (1 QUESTION AT A TIME, UNLIMITED ATTEMPTS, AUTO-ADVANCE)
// =============================================================================
const QUIZ_QUESTIONS = [
  {
    category: "Nyaya Epistemology",
    question: "In Nyaya logic, which term refers to knowledge gained directly through sensory observation—such as seeing smoke or reading a live temperature sensor in AI?",
    options: [
      "Pratyaksha (Direct Perception)",
      "Anumana (Logical Inference)",
      "Nigamana (Final Conclusion)",
      "Upanaya (Application)"
    ],
    correctIndex: 0,
    wrongHints: [
      "",
      "Close, but Anumana uses clues and rules to deduce hidden things rather than direct observation.",
      "Nigamana is the final step at the end of a proof, not the initial direct observation.",
      "Upanaya connects a general rule to a specific case—try looking for the term meaning direct perception."
    ],
    successExplanation: "Pratyaksha is direct sensory observation. In modern AI, it corresponds to raw input from cameras, LiDAR, or hardware sensors."
  },
  {
    category: "5-Step Nyaya Proof",
    question: "You state your opening hypothesis: 'Server-07 is overheating.' Which step of the 5-part Nyaya syllogism is this?",
    options: [
      "Hetu (Observed Reason)",
      "Pratijna (Proposition)",
      "Udaharana (Rule & Example)",
      "Nigamana (Conclusion)"
    ],
    correctIndex: 1,
    wrongHints: [
      "Hetu gives the clue or reason ('because...'). Here we are only stating the opening claim.",
      "",
      "Udaharana states the universal rule along with a familiar example—try the step for an opening claim.",
      "Nigamana is the proven final conclusion at Step 5, whereas this is the opening claim at Step 1."
    ],
    successExplanation: "Pratijna is Step 1: stating the proposition you intend to prove, just like registering a Target Goal Query in Symbolic AI."
  },
  {
    category: "Nyaya & AI Features",
    question: "In the statement 'The mountain has fire because there is smoke,' what role does smoke play, and what is its AI equivalent?",
    options: [
      "Paksha — matches the final AI output action",
      "Vyapti — matches a database backup",
      "Hetu — matches an observable input feature or sensor trigger",
      "Sadhya — matches an unverified assumption"
    ],
    correctIndex: 2,
    wrongHints: [
      "Paksha is the subject being examined (the mountain), not the clue.",
      "Vyapti is the universal rule linking clues to conclusions, not the clue itself.",
      "",
      "Sadhya is the hidden target property we want to prove (fire), not the clue we already observe."
    ],
    successExplanation: "Smoke is the Hetu (the observed clue or sign). In AI, Hetu maps directly to input features or sensor triggers."
  },
  {
    category: "Universal Rules & AI",
    question: "What does 'Vyapti' represent in Nyaya logic, and how is it written in a modern rule-based AI system?",
    options: [
      "An unbreakable rule linking a clue to a result — written as an IF-THEN Knowledge Base rule",
      "A single lucky guess — written as a random seed",
      "A contradictory error — written as a syntax bug",
      "A direct camera snapshot — written as a raw pixel buffer"
    ],
    correctIndex: 0,
    wrongHints: [
      "",
      "Vyapti is never a guess; it is an invariable relationship tested against positive and negative examples.",
      "Contradictory errors are fallacies (Hetvabhasa), whereas Vyapti is a valid universal rule.",
      "Raw sensor snapshots correspond to Pratyaksha, not a universal rule."
    ],
    successExplanation: "Vyapti is a universal, exception-free relationship—exactly how expert systems store IF-THEN production rules."
  },
  {
    category: "Nyaya vs. Aristotle",
    question: "Why does the 3rd step of Nyaya (Udaharana) require a concrete real-world example like a kitchen hearth?",
    options: [
      "To make the argument longer for ceremonial speeches",
      "To ground the universal rule in real-world evidence so the AI or thinker doesn't build false conclusions on abstract rules",
      "Because ancient thinkers did not understand mathematics",
      "To replace the need for a final conclusion"
    ],
    correctIndex: 1,
    wrongHints: [
      "Every step in Nyaya serves a strict logical check, never mere decoration.",
      "",
      "Indian logicians developed rigorous formal rules; the example serves an important empirical purpose.",
      "Nigamana (Step 5) is still needed to finalize the conclusion after applying the rule."
    ],
    successExplanation: "Requiring a verified real-world example (Udaharana) combines deductive logic with real-world evidence, helping prevent AI hallucinations."
  },
  {
    category: "Step 4: Application",
    question: "Which Nyaya step matches 'Pattern Matching & Variable Unification' in a Symbolic AI engine?",
    options: [
      "Upanaya — applying the universal rule directly to the specific case in front of us",
      "Pratijna — stating the initial question",
      "Abhava — detecting missing data",
      "Pratyaksha — reading raw sensor inputs"
    ],
    correctIndex: 0,
    wrongHints: [
      "",
      "Pratijna only introduces the claim; it doesn't bind the general rule to the current entity.",
      "Abhava refers to absence or non-existence in Vaisheshika ontology.",
      "Pratyaksha captures direct observations before applying general rules."
    ],
    successExplanation: "Upanaya (Step 4) maps the general rule onto our specific subject—identical to variable unification in rule engines."
  },
  {
    category: "Logical Fallacies & AI Safety",
    question: "An autonomous car thinks a puddle reflection is a green light, even though its radar clearly detects a solid obstacle ahead. Which Nyaya fallacy is this?",
    options: [
      "Badhita — an inferred guess overruled by direct observation",
      "Asiddha — a missing subject",
      "Upamana — comparing two similar animals",
      "Nigamana — a valid conclusion"
    ],
    correctIndex: 0,
    wrongHints: [
      "",
      "The road and obstacle physically exist here, so it's not an ungrounded imaginary subject.",
      "Upamana is a valid way of learning by comparison, not a logical error.",
      "Nigamana refers to a valid final conclusion, whereas this is a dangerous error."
    ],
    successExplanation: "Badhita happens when an indirect inference contradicts direct observation (Pratyaksha). In both Nyaya and AI safety, live sensors override guesses."
  },
  {
    category: "Knowledge Graphs",
    question: "In Vaisheshika philosophy, 'Dravya' (like a Mountain) and 'Guna' (like Heat) map directly to what parts of a modern AI Knowledge Graph?",
    options: [
      "Entities (Nodes) and their Properties (Attributes)",
      "Random noise and dropout layers",
      "Keyboard shortcuts and scrollbars",
      "Compiler syntax warnings"
    ],
    correctIndex: 0,
    wrongHints: [
      "",
      "Dravya and Guna organize structured knowledge rather than neural network noise.",
      "Think about how a Knowledge Graph stores objects and their traits.",
      "These terms describe real-world structure, not programming compiler errors."
    ],
    successExplanation: "Vaisheshika categorizes objects (Dravya) and qualities (Guna) just like modern Knowledge Graphs store Entity Nodes and Node Properties."
  }
];

class QuizGameEngine {
  constructor(onBackToSim = null) {
    this.onBackToSim = onBackToSim;
    this.currentIndex = 0;
    this.currentAttempts = 0;
    this.totalAttempts = 0;
    this.firstTryCount = 0;
    this.solvedCount = 0;
    this.isTransitioning = false;
    this.autoAdvanceTimer = null;

    this.cacheDOM();
    this.bindEvents();
    this.renderQuestion();
  }

  cacheDOM() {
    this.categoryBadge = document.getElementById("quiz-category-badge");
    this.counterEl = document.getElementById("quiz-question-counter");
    this.attemptsEl = document.getElementById("quiz-current-attempts");
    this.solvedEl = document.getElementById("quiz-solved-count");
    this.progressFill = document.getElementById("quiz-progress-fill");
    this.questionText = document.getElementById("quiz-question-text");
    this.optionsGrid = document.getElementById("quiz-options-grid");
    this.feedbackBanner = document.getElementById("quiz-feedback-banner");
    this.feedbackIcon = document.getElementById("quiz-feedback-icon");
    this.feedbackTitle = document.getElementById("quiz-feedback-title");
    this.feedbackMsg = document.getElementById("quiz-feedback-msg");
    this.manualNextBtn = document.getElementById("quiz-manual-next-btn");
    this.restartBtn = document.getElementById("quiz-restart-btn");

    this.activeArea = document.getElementById("quiz-active-area");
    this.completeArea = document.getElementById("quiz-complete-area");
    this.finalTotalEl = document.getElementById("quiz-final-total");
    this.finalSolvedEl = document.getElementById("quiz-final-solved");
    this.finalFirstTryEl = document.getElementById("quiz-final-first-try");
    this.finalAttemptsEl = document.getElementById("quiz-final-attempts");
    this.playAgainBtn = document.getElementById("quiz-play-again-btn");
    this.backSimBtn = document.getElementById("quiz-back-sim-btn");
  }

  bindEvents() {
    if (this.restartBtn) this.restartBtn.addEventListener("click", () => this.restartQuiz());
    if (this.playAgainBtn) this.playAgainBtn.addEventListener("click", () => this.restartQuiz());
    if (this.manualNextBtn) {
      this.manualNextBtn.addEventListener("click", () => {
        this.clearAdvanceTimer();
        this.advanceQuestion();
      });
    }
    if (this.backSimBtn) {
      this.backSimBtn.addEventListener("click", () => {
        if (typeof this.onBackToSim === "function") this.onBackToSim();
      });
    }
  }

  clearAdvanceTimer() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  restartQuiz() {
    this.clearAdvanceTimer();
    this.currentIndex = 0;
    this.currentAttempts = 0;
    this.totalAttempts = 0;
    this.firstTryCount = 0;
    this.solvedCount = 0;
    this.isTransitioning = false;

    if (this.activeArea) this.activeArea.style.display = "block";
    if (this.completeArea) this.completeArea.style.display = "none";

    this.renderQuestion();
    audioSys.playAIChime(1);
  }

  renderQuestion() {
    this.clearAdvanceTimer();
    this.isTransitioning = false;
    this.currentAttempts = 0;

    const total = QUIZ_QUESTIONS.length;
    const q = QUIZ_QUESTIONS[this.currentIndex];
    if (!q) return;

    if (this.categoryBadge) this.categoryBadge.textContent = q.category;
    if (this.counterEl) this.counterEl.textContent = `Question ${this.currentIndex + 1} of ${total}`;
    if (this.attemptsEl) this.attemptsEl.textContent = "0";
    if (this.solvedEl) this.solvedEl.textContent = `${this.solvedCount} / ${total}`;
    if (this.progressFill) {
      this.progressFill.style.width = `${((this.currentIndex + 1) / total) * 100}%`;
    }
    if (this.questionText) this.questionText.textContent = q.question;

    if (this.feedbackBanner) {
      this.feedbackBanner.style.display = "none";
      this.feedbackBanner.classList.remove("feedback-wrong", "feedback-correct");
    }
    if (this.manualNextBtn) this.manualNextBtn.style.display = "none";

    if (this.optionsGrid) {
      const letters = ["A", "B", "C", "D"];
      this.optionsGrid.innerHTML = "";
      q.options.forEach((optText, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option-btn";
        btn.setAttribute("data-opt-index", idx);
        btn.innerHTML = `
          <span class="quiz-option-letter">${letters[idx]}</span>
          <span class="quiz-option-label"></span>
        `;
        btn.querySelector(".quiz-option-label").textContent = optText;
        btn.addEventListener("click", () => this.handleAnswer(idx, btn));
        this.optionsGrid.appendChild(btn);
      });
    }
  }

  handleAnswer(selectedIndex, btnEl) {
    if (this.isTransitioning) return;

    const q = QUIZ_QUESTIONS[this.currentIndex];
    if (!q) return;

    // Ignore re-clicking an already eliminated wrong option
    if (btnEl.classList.contains("wrong-attempt")) return;

    this.currentAttempts++;
    this.totalAttempts++;
    if (this.attemptsEl) this.attemptsEl.textContent = String(this.currentAttempts);

    if (selectedIndex === q.correctIndex) {
      // Correct! Show brief confirmation and auto-advance
      this.isTransitioning = true;
      this.solvedCount++;
      if (this.currentAttempts === 1) {
        this.firstTryCount++;
      }

      if (this.solvedEl) {
        this.solvedEl.textContent = `${this.solvedCount} / ${QUIZ_QUESTIONS.length}`;
      }

      btnEl.classList.add("correct-attempt");
      if (this.optionsGrid) {
        this.optionsGrid.querySelectorAll(".quiz-option-btn").forEach(b => {
          b.disabled = true;
        });
      }

      if (this.feedbackBanner) {
        this.feedbackBanner.style.display = "flex";
        this.feedbackBanner.classList.remove("feedback-wrong");
        this.feedbackBanner.classList.add("feedback-correct");
        if (this.feedbackIcon) this.feedbackIcon.textContent = "✓";
        const isLast = this.currentIndex >= QUIZ_QUESTIONS.length - 1;
        if (this.feedbackTitle) {
          this.feedbackTitle.textContent = isLast
            ? "Correct! Finishing quiz..."
            : "Correct! Advancing to the next question...";
        }
        if (this.feedbackMsg) this.feedbackMsg.textContent = q.successExplanation;
      }

      if (this.manualNextBtn) {
        this.manualNextBtn.style.display = "inline-flex";
      }

      audioSys.playSuccessFanfare();
      this.autoAdvanceTimer = setTimeout(() => {
        this.advanceQuestion();
      }, 1750);
    } else {
      // Incorrect -> Unlimited tries: highlight wrong attempt gently, provide hint, keep other options unlocked
      btnEl.classList.add("wrong-attempt");
      btnEl.disabled = true;

      if (this.feedbackBanner) {
        this.feedbackBanner.style.display = "flex";
        this.feedbackBanner.classList.remove("feedback-correct");
        this.feedbackBanner.classList.add("feedback-wrong");
        if (this.feedbackIcon) this.feedbackIcon.textContent = "!";
        if (this.feedbackTitle) {
          this.feedbackTitle.textContent = "Not quite — keep trying! (Unlimited attempts)";
        }
        if (this.feedbackMsg) {
          this.feedbackMsg.textContent = q.wrongHints[selectedIndex] || "Take another look at the clues in the question and try a different option.";
        }
      }

      audioSys.playVedicBell(2);
    }
  }

  advanceQuestion() {
    if (this.currentIndex < QUIZ_QUESTIONS.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    } else {
      this.showCompletion();
    }
  }

  showCompletion() {
    this.clearAdvanceTimer();
    const total = QUIZ_QUESTIONS.length;
    if (this.activeArea) this.activeArea.style.display = "none";
    if (this.completeArea) this.completeArea.style.display = "block";

    if (this.finalTotalEl) this.finalTotalEl.textContent = String(total);
    if (this.finalSolvedEl) this.finalSolvedEl.textContent = `${this.solvedCount} / ${total}`;
    if (this.finalFirstTryEl) this.finalFirstTryEl.textContent = `${this.firstTryCount} / ${total}`;
    if (this.finalAttemptsEl) this.finalAttemptsEl.textContent = String(this.totalAttempts);

    launchConfetti();
    audioSys.playSuccessFanfare();
  }
}

function launchConfetti() {
  const colors = ["#9E3B24", "#B8860B", "#266A3E", "#D4A017", "#2C221E"];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "confetti-particle";
    p.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    p.style.setProperty("--x", `${(Math.random() - 0.5) * 560}px`);
    p.style.setProperty("--y", `${(Math.random() - 1) * 340 - 40}px`);
    p.style.setProperty("--rot", `${Math.random() * 720}deg`);
    p.style.left = "50%";
    p.style.top = "50%";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1650);
  }
}

// =============================================================================
// 6. LOGIC LAB: 5-STEP SYLLOGISM CARD SORTING PUZZLE (QUIZ SUB-MODE B)
// =============================================================================
const LAB_SCENARIOS = {
  mountain: {
    id: "mountain",
    title: 'Question: "Is there fire on the mountain?"',
    instruction: "Arrange these 5 statements from Step 1 to Step 5 using the ▲ / ▼ buttons or drag-and-drop, then click Submit Answer.",
    correctOrder: [
      { id: "step1", stepNum: 1, text: "The mountain has fire.", sanskrit: "1. Pratijna (Proposition)", role: "Opening Claim" },
      { id: "step2", stepNum: 2, text: "Because there is smoke.", sanskrit: "2. Hetu (Observed Sign)", role: "Observed Clue" },
      { id: "step3", stepNum: 3, text: "Wherever there is smoke, there is fire (like in a kitchen).", sanskrit: "3. Udaharana (Rule & Example)", role: "Universal Rule" },
      { id: "step4", stepNum: 4, text: "The mountain has smoke that is pervaded by fire.", sanskrit: "4. Upanaya (Application)", role: "Applying the Rule" },
      { id: "step5", stepNum: 5, text: "Therefore, the mountain has fire.", sanskrit: "5. Nigamana (Conclusion)", role: "Proven Conclusion" }
    ]
  },
  server: {
    id: "server",
    title: 'Question: "Is Server-07 overheating?"',
    instruction: "Order the diagnostic steps from opening hypothesis to automated cooling action.",
    correctOrder: [
      { id: "step1", stepNum: 1, text: "Server-07 is overheating.", sanskrit: "1. Pratijna (Goal)", role: "Diagnostic Goal" },
      { id: "step2", stepNum: 2, text: "Because CPU temperature exceeds 98°C with fans at maximum.", sanskrit: "2. Hetu (Sensor Evidence)", role: "Sensor Telemetry" },
      { id: "step3", stepNum: 3, text: "Whenever CPU temperature exceeds 95°C under full cooling, overheating occurs (like in stress benchmarks).", sanskrit: "3. Udaharana (Rule & Example)", role: "Reliability Rule" },
      { id: "step4", stepNum: 4, text: "Server-07 currently has that exact high-temperature condition.", sanskrit: "4. Upanaya (Application)", role: "Rule Match" },
      { id: "step5", stepNum: 5, text: "Therefore, Server-07 is confirmed as overheating and should throttle.", sanskrit: "5. Nigamana (Conclusion)", role: "Final Action" }
    ]
  },
  autonomous: {
    id: "autonomous",
    title: 'Question: "Must the autonomous car trigger emergency braking?"',
    instruction: "Arrange the safety reasoning steps from sensor clue to braking command.",
    correctOrder: [
      { id: "step1", stepNum: 1, text: "The autonomous vehicle must execute an emergency brake.", sanskrit: "1. Pratijna (Safety Goal)", role: "Decision Target" },
      { id: "step2", stepNum: 2, text: "Because forward LiDAR detects an obstacle at 5.4 meters.", sanskrit: "2. Hetu (Sensor Clue)", role: "LiDAR Observation" },
      { id: "step3", stepNum: 3, text: "Whenever time-to-collision drops below 0.6s, full braking is required (proven on test tracks).", sanskrit: "3. Udaharana (Safety Rule)", role: "Physics Guardrail" },
      { id: "step4", stepNum: 4, text: "The vehicle is inside that critical stopping distance.", sanskrit: "4. Upanaya (Application)", role: "State Binding" },
      { id: "step5", stepNum: 5, text: "Therefore, apply maximum emergency brake torque.", sanskrit: "5. Nigamana (Conclusion)", role: "Safety Command" }
    ]
  }
};

class LogicLabGame {
  constructor() {
    this.currentScenarioKey = "mountain";
    this.cards = [];
    this.draggedIndex = null;
    this.hasSubmitted = false;
    this.attempts = 0;

    this.cacheDOM();
    this.bindEvents();
    this.loadScenario("mountain");
  }

  cacheDOM() {
    this.titleEl = document.getElementById("lab-scenario-title");
    this.instructionEl = document.querySelector(".lab-challenge-instruction");
    this.cardsContainer = document.getElementById("sorting-cards-container");
    this.scoreEl = document.getElementById("lab-score");
    this.scorePercentEl = document.getElementById("lab-percent");
    this.attemptsEl = document.getElementById("lab-attempts");
    this.submitBtn = document.getElementById("submit-order-btn");
    this.shuffleBtn = document.getElementById("shuffle-cards-btn");
    this.revealBtn = document.getElementById("reveal-solution-btn");
    this.feedbackPanel = document.getElementById("lab-feedback-panel");
    this.scenarioBtns = document.querySelectorAll(".scenario-btn");
    this.hintBtn = document.getElementById("lab-hint-btn");
    this.hintBox = document.getElementById("lab-hint-box");
  }

  bindEvents() {
    this.scenarioBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.scenarioBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.loadScenario(btn.getAttribute("data-scenario"));
      });
    });

    if (this.submitBtn) this.submitBtn.addEventListener("click", () => this.evaluateAnswer());
    if (this.shuffleBtn) this.shuffleBtn.addEventListener("click", () => this.shuffleCards(true));
    if (this.revealBtn) this.revealBtn.addEventListener("click", () => this.revealSolution());
    if (this.hintBtn) this.hintBtn.addEventListener("click", () => this.toggleHint());
  }

  loadScenario(key) {
    this.currentScenarioKey = key;
    const scenario = LAB_SCENARIOS[key] || LAB_SCENARIOS.mountain;

    if (this.titleEl) this.titleEl.textContent = scenario.title;
    if (this.instructionEl) this.instructionEl.textContent = scenario.instruction;

    this.hasSubmitted = false;
    this.attempts = 0;
    if (this.attemptsEl) this.attemptsEl.textContent = "0";
    if (this.scoreEl) this.scoreEl.textContent = "0 / 5";
    if (this.scorePercentEl) this.scorePercentEl.textContent = "(Not Submitted)";
    if (this.feedbackPanel) this.feedbackPanel.style.display = "none";
    if (this.hintBox) this.hintBox.style.display = "none";

    this.cards = JSON.parse(JSON.stringify(scenario.correctOrder));
    this.shuffleCards(false);
  }

  shuffleCards(withSound = false) {
    const arr = [...this.cards];
    let isSame = true;

    while (isSame && arr.length > 1) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      isSame = arr.every((item, idx) => item.stepNum === idx + 1);
    }

    this.cards = arr;
    this.hasSubmitted = false;
    if (this.feedbackPanel) this.feedbackPanel.style.display = "none";
    if (this.hintBox) this.hintBox.style.display = "none";
    if (this.scoreEl) this.scoreEl.textContent = "0 / 5";
    if (this.scorePercentEl) this.scorePercentEl.textContent = "(Not Submitted)";

    this.renderCards();
    if (withSound) audioSys.playAIChime(2);
  }

  renderCards() {
    if (!this.cardsContainer) return;
    this.cardsContainer.innerHTML = "";

    this.cards.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "sortable-card";
      card.setAttribute("draggable", "true");
      card.setAttribute("data-index", index);

      if (this.hasSubmitted) {
        card.classList.add(item.stepNum === index + 1 ? "card-correct" : "card-incorrect");
      }

      card.innerHTML = `
        <div class="card-left-group">
          <span class="drag-handle" title="Drag to reorder">⠿</span>
          <div class="slot-position-badge">Step ${index + 1}</div>
          <div class="card-text-group">
            <span class="card-premise-text"></span>
            <span class="card-sanskrit-preview"></span>
          </div>
        </div>
        <div class="card-arrow-controls">
          <button type="button" class="arrow-btn move-up" title="Move Up" ${index === 0 ? "disabled" : ""}>▲</button>
          <button type="button" class="arrow-btn move-down" title="Move Down" ${index === this.cards.length - 1 ? "disabled" : ""}>▼</button>
        </div>
      `;

      card.querySelector(".card-premise-text").textContent = item.text;
      card.querySelector(".card-sanskrit-preview").textContent = item.sanskrit;

      card.querySelector(".move-up").addEventListener("click", (e) => {
        e.stopPropagation();
        this.swap(index, index - 1);
      });

      card.querySelector(".move-down").addEventListener("click", (e) => {
        e.stopPropagation();
        this.swap(index, index + 1);
      });

      card.addEventListener("dragstart", (e) => {
        this.draggedIndex = index;
        card.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        this.cardsContainer.querySelectorAll(".sortable-card").forEach(c => c.classList.remove("drag-over"));
      });

      card.addEventListener("dragover", (e) => {
        e.preventDefault();
        card.classList.add("drag-over");
      });

      card.addEventListener("dragleave", () => card.classList.remove("drag-over"));

      card.addEventListener("drop", (e) => {
        e.preventDefault();
        card.classList.remove("drag-over");
        if (this.draggedIndex !== null && this.draggedIndex !== index) {
          const moved = this.cards.splice(this.draggedIndex, 1)[0];
          this.cards.splice(index, 0, moved);
          this.renderCards();
          audioSys.playAIChime(1);
        }
      });

      this.cardsContainer.appendChild(card);
    });
  }

  swap(i, j) {
    if (i < 0 || i >= this.cards.length || j < 0 || j >= this.cards.length) return;
    [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    this.renderCards();
    audioSys.playAIChime(1);
  }

  evaluateAnswer(isReveal = false) {
    this.hasSubmitted = true;
    if (!isReveal) {
      this.attempts++;
      if (this.attemptsEl) this.attemptsEl.textContent = String(this.attempts);
    }

    let score = 0;
    this.cards.forEach((card, index) => {
      if (card.stepNum === index + 1) score++;
    });

    const percent = Math.round((score / 5) * 100);
    if (this.scoreEl) this.scoreEl.textContent = `${score} / 5`;
    if (this.scorePercentEl) {
      this.scorePercentEl.textContent = isReveal ? "(Solution Revealed)" : `(${percent}% Correct)`;
    }

    this.renderCards();

    if (this.feedbackPanel) {
      this.feedbackPanel.style.display = "block";
      const icon = document.getElementById("feedback-icon");
      const title = document.getElementById("feedback-title");
      const stars = document.getElementById("score-stars");
      const summary = document.getElementById("feedback-summary");
      const breakdown = document.getElementById("breakdown-rows-container");

      if (score === 5) {
        audioSys.playSuccessFanfare();
        launchConfetti();
        if (icon) {
          icon.textContent = "✓";
          icon.style.background = "var(--emerald)";
        }
        if (title) {
          title.textContent = isReveal ? "Correct 5-Step Nyaya Sequence" : "Perfect 5/5! Valid Nyaya Sequence";
          title.style.color = "var(--emerald)";
        }
        if (stars) stars.textContent = "★★★★★";
        if (summary) {
          summary.textContent = "Well done! You arranged the proposition, clue, universal rule with example, application, and final conclusion in exact order.";
        }
      } else {
        audioSys.playVedicBell(3);
        if (icon) {
          icon.textContent = "!";
          icon.style.background = "var(--terracotta)";
        }
        if (title) {
          title.textContent = `${score} of 5 Steps in Right Place — Try Adjusting Red Cards`;
          title.style.color = "var(--terracotta)";
        }
        if (stars) stars.textContent = "★".repeat(score) + "☆".repeat(5 - score);
        if (summary) {
          summary.textContent = "You have unlimited tries! Cards in red are out of order—remember: Claim ➔ Clue ➔ Rule + Example ➔ Application ➔ Conclusion.";
        }
      }

      if (breakdown) {
        const scenario = LAB_SCENARIOS[this.currentScenarioKey];
        breakdown.innerHTML = scenario.correctOrder.map(item => `
          <div class="breakdown-row-item">
            <span class="breakdown-step-num">#${item.stepNum}</span>
            <span class="breakdown-sanskrit">${item.sanskrit}</span>
            <span class="breakdown-role">${item.role}</span>
            <span class="breakdown-text">"${item.text}"</span>
          </div>
        `).join("");
      }
    }
  }

  revealSolution() {
    const scenario = LAB_SCENARIOS[this.currentScenarioKey];
    this.cards = JSON.parse(JSON.stringify(scenario.correctOrder));
    if (this.hintBox) this.hintBox.style.display = "none";
    this.evaluateAnswer(true);
    audioSys.playAIChime(2);
  }

  toggleHint() {
    if (!this.hintBox) return;
    if (this.hintBox.style.display === "none") {
      let hintText = "";
      if (this.cards[0].stepNum !== 1) {
        hintText = "<strong>Hint for Step 1 (Pratijna):</strong> Start with the opening claim you want to prove—without words like 'because' or 'therefore'.";
      } else if (this.cards[1].stepNum !== 2) {
        hintText = "<strong>Hint for Step 2 (Hetu):</strong> Step 1 is correct! Next comes the observed clue or reason—look for the card starting with 'Because...'.";
      } else if (this.cards[2].stepNum !== 3) {
        hintText = "<strong>Hint for Step 3 (Udaharana):</strong> Next is the universal rule backed by a real-world example (e.g., 'Wherever there is...').";
      } else if (this.cards[3].stepNum !== 4) {
        hintText = "<strong>Hint for Step 4 (Upanaya):</strong> Connect that general rule specifically to the current situation before concluding.";
      } else {
        hintText = "<strong>Hint for Step 5 (Nigamana):</strong> Finish with the final proven conclusion starting with 'Therefore...'.";
      }
      this.hintBox.innerHTML = hintText;
      this.hintBox.style.display = "block";
      audioSys.playAIChime(1);
    } else {
      this.hintBox.style.display = "none";
    }
  }
}

// =============================================================================
// 7. EXTENDED EXPLORER: MAPPING CARDS, FALLACY DETECTIVE & KNOWLEDGE GRAPH
// =============================================================================
function initMappingCards() {
  const vyaptiPills = document.querySelectorAll(".vyapti-tester .test-pill");
  const vyaptiResultBox = document.getElementById("vyapti-test-result");

  vyaptiPills.forEach(pill => {
    pill.addEventListener("click", () => {
      vyaptiPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const test = pill.getAttribute("data-test");

      if (test === "smoke-fire") {
        vyaptiResultBox.innerHTML = `
          <span class="result-badge valid">VALID RULE</span>
          <span class="result-text">Smoke reliably indicates fire. Clear lakes (negative cases) never produce smoke.</span>
        `;
        audioSys.playAIChime(1);
      } else {
        vyaptiResultBox.innerHTML = `
          <span class="result-badge invalid">INVALID REVERSE RULE</span>
          <span class="result-text">Fire does NOT always produce smoke (for example, a glowing red-hot iron ball has fire with no smoke).</span>
        `;
        audioSys.playVedicBell(2);
      }
    });
  });

  const critButtons = document.querySelectorAll("#hetu-criteria-list .crit-item");
  const critDetailBox = document.getElementById("hetu-crit-detail");
  const hetuCriteriaDetails = {
    pakshadharmata: {
      title: "Pakshadharmata",
      desc: "The clue must genuinely exist in the specific case being tested, preventing ungrounded guesses."
    },
    sapakshasattva: {
      title: "Sapakshasattva",
      desc: "The clue should appear in positive examples where the target condition is known to exist (like smoke in a kitchen)."
    },
    vipaksha: {
      title: "Vipaksha-Abhava",
      desc: "The clue must be absent from negative cases (like a lake), preventing misleading coincidences."
    },
    abadhitatva: {
      title: "Abadhitatva",
      desc: "The clue cannot lead to a conclusion that contradicts direct physical evidence or safety sensors."
    },
    asatpratipaksha: {
      title: "Asatpratipakshatva",
      desc: "No equally strong opposing evidence can exist pointing to the opposite answer."
    }
  };

  critButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      critButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const detail = hetuCriteriaDetails[btn.getAttribute("data-crit")];
      if (detail && critDetailBox) {
        critDetailBox.innerHTML = `
          <span class="result-badge valid">${detail.title}</span>
          <span class="result-text">${detail.desc}</span>
        `;
        audioSys.playAIChime(1);
      }
    });
  });

  const toggleSyllogismBtn = document.getElementById("toggle-syllogism-btn");
  const syllogismBox = document.getElementById("syllogism-model-box");
  if (toggleSyllogismBtn && syllogismBox) {
    toggleSyllogismBtn.addEventListener("click", () => {
      const isHidden = syllogismBox.style.display === "none";
      syllogismBox.style.display = isHidden ? "block" : "none";
      toggleSyllogismBtn.textContent = isHidden ? "Hide Comparison" : "Compare Models";
      audioSys.playAIChime(1);
    });
  }
}

function initExplorerTabs(onVaisheshikaShown = null) {
  const tabBtns = document.querySelectorAll(".explorer-tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      const targetPane = document.getElementById(tabId);
      if (targetPane) targetPane.classList.add("active");
      if (tabId === "tab-vaisheshika" && typeof onVaisheshikaShown === "function") {
        requestAnimationFrame(() => onVaisheshikaShown());
      }
      audioSys.playAIChime(2);
    });
  });

  const detectiveBtns = document.querySelectorAll(".detective-btn");
  const diagnosisBox = document.getElementById("detective-diagnosis");
  const fallacyScenarios = {
    hallucination: {
      badge: "Diagnosis: Badhita (Overruled by Direct Observation)",
      text: "The AI's guess is directly disproven by immediate sensor reality (Pratyaksha). In Nyaya logic, direct perception always overrides indirect inference."
    },
    bias: {
      badge: "Diagnosis: Savyabhichara (Inconsistent Clue)",
      text: "Low medical bills do not reliably indicate good health—patients without insurance also have low bills. This causes unfair model bias."
    },
    poison: {
      badge: "Diagnosis: Viruddha (Contradictory Clue)",
      text: "The adversarial sticker causes the model to predict the exact opposite of reality—turning a STOP command into a high-speed command."
    },
    asiddha: {
      badge: "Diagnosis: Asiddha (Unproven / False Ground)",
      text: "The location 'Atlantis Island' does not exist in reality—acting on corrupt telemetry produces groundless conclusions."
    },
    satpratipaksha: {
      badge: "Diagnosis: Satpratipaksha (Tied Opposing Evidence)",
      text: "Two equally strong rules fire opposite outputs ('Share' vs. 'Block'), leaving the AI system stuck without a tiebreaker."
    }
  };

  detectiveBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      detectiveBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const data = fallacyScenarios[btn.getAttribute("data-scenario")];
      if (data && diagnosisBox) {
        diagnosisBox.innerHTML = `
          <div class="diagnosis-badge">${data.badge}</div>
          <p class="diagnosis-text">${data.text}</p>
        `;
        audioSys.playAIChime(3);
      }
    });
  });
}

class VaisheshikaGraphVisualizer {
  constructor() {
    this.canvas = document.getElementById("knowledge-graph-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.tooltip = document.getElementById("canvas-node-tooltip");
    this.activeSubEl = document.getElementById("triple-sub");
    this.activeObjEl = document.getElementById("triple-obj");
    this.tripleCodeEl = document.getElementById("triple-code-preview");
    this.resetBtn = document.getElementById("reset-graph-btn");
    this.toggleThemeBtn = document.getElementById("toggle-graph-theme-btn");

    this.dpr = window.devicePixelRatio || 1;
    this.height = 420;
    this.width = this.canvas.parentElement.clientWidth || 900;
    this.needsInitialLayout = this.canvas.parentElement.clientWidth === 0;
    this.applyCanvasDimensions();

    this.isAIMode = false;
    this.draggedNode = null;
    this.hoveredNode = null;
    this.pulsingNode = null;
    this.pulseRadius = 0;
    this.pulseAlpha = 0;
    this.isVisible = true;

    this.initNodes();
    this.initParticles();
    this.bindEvents();
    this.bindPadarthaCards();
    this.setupIntersectionObserver();
    this.startSimulation();
  }

  applyCanvasDimensions() {
    if (!this.canvas) return;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = "100%";
    this.canvas.style.height = `${this.height}px`;
  }

  resize(recenterIfNeeded = false) {
    if (!this.canvas || !this.canvas.parentElement) return;
    const measured = this.canvas.parentElement.clientWidth;
    if (measured <= 0) return;

    const prevWidth = this.width || measured;
    this.width = measured;
    this.applyCanvasDimensions();

    if (recenterIfNeeded && this.needsInitialLayout) {
      this.needsInitialLayout = false;
      this.initNodes();
      return;
    }

    if (prevWidth > 0 && prevWidth !== this.width && this.nodes) {
      const ratio = this.width / prevWidth;
      this.nodes.forEach(n => {
        n.x = Math.max(n.radius + 14, Math.min(this.width - n.radius - 14, n.x * ratio));
      });
    }
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(this.canvas);
  }

  initNodes() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const sx = Math.min(1, this.width / 760);

    this.nodes = [
      { id: "dravya", label: "Dravya", aiLabel: "Entity: Mountain", type: "Substance", color: "#9E3B24", radius: 28, x: cx - 180 * sx, y: cy - 35, desc: "Dravya: Core object or entity (Mountain / Server)" },
      { id: "guna", label: "Guna", aiLabel: "Property: Heat", type: "Quality", color: "#B8860B", radius: 24, x: cx + 175 * sx, y: cy - 75, desc: "Guna: Trait attached to an object (Fire / Temperature)" },
      { id: "hetu", label: "Hetu", aiLabel: "Feature: Smoke", type: "Clue", color: "#7A2B18", radius: 26, x: cx, y: cy - 110, desc: "Hetu: Observable evidence connecting object to property" },
      { id: "karma", label: "Karma", aiLabel: "Action: Heat Spike", type: "Action", color: "#A85532", radius: 22, x: cx + 125 * sx, y: cy + 95, desc: "Karma: Activity or state transition event" },
      { id: "samanya", label: "Samanya", aiLabel: "Class: Terrain", type: "Category", color: "#3C5A72", radius: 24, x: cx - 120 * sx, y: cy + 105, desc: "Samanya: Shared group or class schema" },
      { id: "vishesha", label: "Vishesha", aiLabel: "ID: Peak-01", type: "Unique Key", color: "#266A3E", radius: 21, x: cx - 270 * sx, y: cy + 30, desc: "Vishesha: Unique identifier distinguishing one object" },
      { id: "samavaya", label: "Samavaya", aiLabel: "Edge: Inheres_In", type: "Link", color: "#8C6514", radius: 23, x: cx + 15 * sx, y: cy + 55, desc: "Samavaya: Inseparable link between object and trait" },
      { id: "abhava", label: "Abhava", aiLabel: "Check: NOT_EXISTS", type: "Absence", color: "#5C4B43", radius: 22, x: cx + 255 * sx, y: cy + 35, desc: "Abhava: Detecting when a property is missing" }
    ];

    this.edges = [
      { from: "dravya", to: "hetu", label: "has clue", aiLabel: "hasSensorEvent" },
      { from: "hetu", to: "guna", label: "implies (Vyapti)", aiLabel: "impliesPredicate" },
      { from: "dravya", to: "samanya", label: "belongs to", aiLabel: "rdf:type" },
      { from: "dravya", to: "vishesha", label: "identified by", aiLabel: "hasUUID" },
      { from: "guna", to: "karma", label: "triggers", aiLabel: "triggersEvent" },
      { from: "samavaya", to: "guna", label: "connects", aiLabel: "inheresIn" },
      { from: "dravya", to: "samavaya", label: "holds", aiLabel: "hasRelation" },
      { from: "guna", to: "abhava", label: "checked by", aiLabel: "notExists" }
    ];
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 18; i++) {
      const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      this.particles.push({
        edge,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.004,
        size: 2.4 + Math.random() * 1.4,
        color: Math.random() > 0.5 ? "#9E3B24" : "#B8860B"
      });
    }
  }

  updateParticles() {
    this.particles.forEach(p => {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      }
    });

    if (this.pulsingNode) {
      this.pulseRadius += 1.4;
      this.pulseAlpha -= 0.025;
      if (this.pulseAlpha <= 0) this.pulsingNode = null;
    }
  }

  bindPadarthaCards() {
    document.querySelectorAll(".padartha-card").forEach(card => {
      const activate = () => {
        const id = card.getAttribute("data-padartha");
        const node = this.nodes.find(n => n.id === id);
        if (node) {
          this.pulsingNode = node;
          this.pulseRadius = node.radius + 2;
          this.pulseAlpha = 1.0;
          this.selectNodeTriple(node);
          this.canvas.scrollIntoView({ behavior: "smooth", block: "center" });
          audioSys.playAIChime(2);
        }
      };
      card.addEventListener("click", activate);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize(false));
    if (typeof ResizeObserver !== "undefined" && this.canvas.parentElement) {
      new ResizeObserver(() => this.resize(true)).observe(this.canvas.parentElement);
    }

    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("mouseup", () => { this.draggedNode = null; });

    this.canvas.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      this.onMouseDown({ clientX: t.clientX, clientY: t.clientY, rect: this.canvas.getBoundingClientRect() });
    });
    this.canvas.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      this.onMouseMove({ clientX: t.clientX, clientY: t.clientY, rect: this.canvas.getBoundingClientRect() });
    });
    this.canvas.addEventListener("touchend", () => { this.draggedNode = null; });

    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => {
        this.initNodes();
        audioSys.playAIChime(1);
      });
    }
    if (this.toggleThemeBtn) {
      this.toggleThemeBtn.addEventListener("click", () => {
        this.isAIMode = !this.isAIMode;
        this.toggleThemeBtn.textContent = this.isAIMode ? "Mode: AI Graph Labels" : "Mode: Sanskrit Terms";
        audioSys.playAIChime(2);
      });
    }
  }

  getMousePos(e) {
    const rect = e.rect || this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  findNodeAt(pos) {
    return this.nodes.find(n => Math.hypot(n.x - pos.x, n.y - pos.y) <= n.radius + 6);
  }

  onMouseDown(e) {
    const pos = this.getMousePos(e);
    const node = this.findNodeAt(pos);
    if (node) {
      this.draggedNode = node;
      this.selectNodeTriple(node);
      audioSys.playAIChime(1);
    }
  }

  onMouseMove(e) {
    const pos = this.getMousePos(e);
    if (this.draggedNode) {
      this.draggedNode.x = Math.max(30, Math.min(this.width - 30, pos.x));
      this.draggedNode.y = Math.max(30, Math.min(this.height - 30, pos.y));
      this.canvas.style.cursor = "grabbing";
    } else {
      const node = this.findNodeAt(pos);
      this.hoveredNode = node;
      this.canvas.style.cursor = node ? "pointer" : "grab";
      if (node && this.tooltip) {
        this.tooltip.style.display = "block";
        this.tooltip.style.left = `${Math.min(this.width - 210, pos.x + 14)}px`;
        this.tooltip.style.top = `${Math.max(12, pos.y - 34)}px`;
        this.tooltip.innerHTML = `<strong>${this.isAIMode ? node.aiLabel : node.label}</strong><br><span style="color:#5C4B43;">${node.desc}</span>`;
      } else if (this.tooltip) {
        this.tooltip.style.display = "none";
      }
    }
  }

  selectNodeTriple(node) {
    document.querySelectorAll(".padartha-card").forEach(card => {
      card.classList.toggle("selected", card.getAttribute("data-padartha") === node.id);
    });
    if (!this.activeSubEl || !this.activeObjEl || !this.tripleCodeEl) return;

    const triples = {
      dravya: ["(Mountain: Dravya / Entity)", "(Fire: Guna / Property)", "SPARQL: :Mountain :hasProperty :Fire ."],
      hetu: ["(Smoke: Hetu / Feature)", "(Fire: Sadhya / Outcome)", 'Cypher: MATCH (f:Feature {name:"smoke"})-[:VYAPTI]->(p:Outcome) RETURN p'],
      karma: ["(Server: Dravya / Entity)", "(Heat Spike: Karma / Action)", 'JSON-LD: { "@type": "ActionEvent", "target": "server-07" }'],
      samanya: ["(Mountain-01: Instance)", "(Terrain: Samanya / Class)", "RDF: :mountain_01 rdf:type :VolcanicTerrain ."],
      vishesha: ["(Server-07: Entity)", "(UUID-9842: Vishesha / Key)", "OWL: :Server_07 owl:sameAs <urn:uuid:7c9e6679> ."],
      samavaya: ["(Mountain: Substance)", "(Heat: Samavaya / Inherent Link)", 'GraphEdge: (Mountain)-[:INHERES_IN {permanent: true}]->(Heat)'],
      abhava: ["(Server: Entity)", "(Coolant: Abhava / Missing)", "SPARQL: FILTER NOT EXISTS { ?server :hasCoolant true }"]
    };

    const t = triples[node.id] || [`(${node.label})`, `(${node.type})`, `GraphTriple: <${node.id}> :type <${node.type}> .`];
    this.activeSubEl.textContent = t[0];
    this.activeObjEl.textContent = t[1];
    this.tripleCodeEl.textContent = t[2];
  }

  startSimulation() {
    const loop = () => {
      if (this.isVisible) {
        this.updatePhysics();
        this.updateParticles();
        this.draw();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  updatePhysics() {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.hypot(dx, dy) || 1;
        const minDist = n1.radius + n2.radius + 70;
        if (dist < minDist) {
          const force = (minDist - dist) * 0.02;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          if (n1 !== this.draggedNode) { n1.x -= fx; n1.y -= fy; }
          if (n2 !== this.draggedNode) { n2.x += fx; n2.y += fy; }
        }
      }
    }

    this.nodes.forEach(n => {
      n.x = Math.max(n.radius + 14, Math.min(this.width - n.radius - 14, n.x));
      n.y = Math.max(n.radius + 14, Math.min(this.height - n.radius - 26, n.y));
    });
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle manuscript ruled grid
    this.ctx.strokeStyle = "rgba(184, 134, 11, 0.1)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Edges & arrowheads
    this.edges.forEach(edge => {
      const n1 = this.nodes.find(n => n.id === edge.from);
      const n2 = this.nodes.find(n => n.id === edge.to);
      if (!n1 || !n2) return;

      this.ctx.beginPath();
      this.ctx.moveTo(n1.x, n1.y);
      this.ctx.lineTo(n2.x, n2.y);
      this.ctx.strokeStyle = "rgba(92, 75, 67, 0.35)";
      this.ctx.lineWidth = 1.75;
      this.ctx.stroke();

      const angle = Math.atan2(n2.y - n1.y, n2.x - n1.x);
      const tipX = n2.x - Math.cos(angle) * (n2.radius + 5);
      const tipY = n2.y - Math.sin(angle) * (n2.radius + 5);
      const arrowLen = 7;
      this.ctx.beginPath();
      this.ctx.moveTo(tipX, tipY);
      this.ctx.lineTo(tipX - arrowLen * Math.cos(angle - Math.PI / 6), tipY - arrowLen * Math.sin(angle - Math.PI / 6));
      this.ctx.lineTo(tipX - arrowLen * Math.cos(angle + Math.PI / 6), tipY - arrowLen * Math.sin(angle + Math.PI / 6));
      this.ctx.closePath();
      this.ctx.fillStyle = "rgba(158, 59, 36, 0.65)";
      this.ctx.fill();

      const midX = (n1.x + n2.x) / 2;
      const midY = (n1.y + n2.y) / 2;
      this.ctx.fillStyle = "#5C4B43";
      this.ctx.font = "600 10px Inter, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.isAIMode ? edge.aiLabel : edge.label, midX, midY - 6);
    });

    // Edge particles
    if (this.particles) {
      this.particles.forEach(p => {
        const n1 = this.nodes.find(n => n.id === p.edge.from);
        const n2 = this.nodes.find(n => n.id === p.edge.to);
        if (!n1 || !n2) return;
        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;
        this.ctx.beginPath();
        this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      });
    }

    // Pulse ring
    if (this.pulsingNode && this.pulseAlpha > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pulsingNode.x, this.pulsingNode.y, this.pulseRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(158, 59, 36, ${this.pulseAlpha})`;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }

    // Nodes
    this.nodes.forEach(node => {
      const isHovered = node === this.hoveredNode;
      const isDragged = node === this.draggedNode;
      const isPulsing = node === this.pulsingNode;

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius + (isHovered || isPulsing ? 6 : 3), 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered || isPulsing ? "rgba(158, 59, 36, 0.2)" : "rgba(184, 134, 11, 0.14)";
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isDragged ? "#D4A017" : node.color;
      this.ctx.fill();
      this.ctx.strokeStyle = "#FFFDF8";
      this.ctx.lineWidth = isHovered || isPulsing ? 2.5 : 1.5;
      this.ctx.stroke();

      this.ctx.fillStyle = "#FFFDF8";
      this.ctx.font = "bold 11px Inter, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      const displayText = this.isAIMode ? node.aiLabel.split(":")[0] : node.label;
      this.ctx.fillText(displayText, node.x, node.y);

      this.ctx.fillStyle = "#2C221E";
      this.ctx.font = "600 10px Inter, sans-serif";
      this.ctx.fillText(node.type, node.x, node.y + node.radius + 14);
    });

    this.ctx.restore();
  }
}

// =============================================================================
// 8. LEXICON MODAL & INITIALIZATION
// =============================================================================
function initGlossaryModal() {
  const modal = document.getElementById("glossary-modal");
  const openBtn = document.getElementById("glossary-modal-btn");
  const closeBtn = document.getElementById("close-glossary-btn");
  const searchInput = document.getElementById("glossary-search-input");
  const listContainer = document.getElementById("glossary-list");

  if (!modal || !listContainer) return;

  const renderList = (filter = "") => {
    const q = filter.toLowerCase().trim();
    const filtered = REFERENCE_TERMS.filter(item =>
      item.term.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.plainDef.toLowerCase().includes(q) ||
      item.aiLink.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      listContainer.innerHTML = '<div style="padding:1.5rem; text-align:center; color:#7C6B62;">No matching terms found.</div>';
      return;
    }

    listContainer.innerHTML = filtered.map(item => `
      <div class="glossary-item">
        <div class="glossary-item-top">
          <span class="glossary-sanskrit-term">${item.term} (${item.subtitle})</span>
          <span class="glossary-translit">${item.catLabel}</span>
        </div>
        <p class="glossary-definition">${item.plainDef}</p>
        <div class="glossary-ai-analogy"><strong>AI Equivalent:</strong> ${item.aiLink}</div>
      </div>
    `).join("");
  };

  renderList();

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("open");
      if (searchInput) searchInput.focus();
      audioSys.playAIChime(1);
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
  if (searchInput) {
    searchInput.addEventListener("input", (e) => renderList(e.target.value));
  }
}

function initAudioControls() {
  const soundBtn = document.getElementById("sound-toggle-btn");
  const soundIcon = document.getElementById("sound-icon");
  if (!soundBtn) return;

  const syncSoundUI = (isOn) => {
    if (soundIcon) soundIcon.textContent = isOn ? "🔔" : "🔕";
    const label = soundBtn.querySelector(".sound-label");
    if (label) label.textContent = isOn ? "Audio: ON" : "Audio: MUTED";
    soundBtn.setAttribute("aria-pressed", String(isOn));
  };
  syncSoundUI(audioSys.soundEnabled);

  soundBtn.addEventListener("click", () => {
    const isOn = audioSys.toggleSound();
    syncSoundUI(isOn);
    if (isOn) audioSys.playAIChime(1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAudioControls();
  const referenceGuide = new ReferenceGuide();
  const simulator = new InferenceSimulator((termId, shouldScroll) => {
    referenceGuide.highlightTerm(termId, shouldScroll);
  });
  const graphViz = new VaisheshikaGraphVisualizer();
  const viewManager = new ViewManager(() => graphViz.resize(true));
  const quizEngine = new QuizGameEngine(() => viewManager.switchView("simulation"));
  const logicLab = new LogicLabGame();
  initMappingCards();
  initExplorerTabs(() => graphViz.resize(true));
  initGlossaryModal();
});
