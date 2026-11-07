  /**
 * HETULOGIC (PRAMANAX) - Ancient Indian Logic Meets Modern AI
 * Core Application Logic:
 *  1. Epistemic Sound Synthesizer (Web Audio API)
 *  2. Knowledge Base & 5-Stage Dynamic Anumana Simulator
 *  3. Modern Symbolic AI Expert System Synchronized Engine
 *  4. IKS-to-AI Interactive Comparison Cards & Vyapti Tester
 *  5. Logic Lab: Drag & Drop + Accessible Arrow Card Sorting Game
 *  6. Nyaya & Vaisheshika Explorer (4 Pramanas, 5 Fallacies, 7 Padarthas)
 *  7. Interactive Canvas Knowledge Graph with Physics & Triples
 *  8. Sanskrit Logic Lexicon & Search Modal
 *  9. Navigation ScrollSpy & Mobile Drawer
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
      console.warn("Web Audio API not supported in this browser.", e);
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

  // Ancient resonant temple bell / tanpura harmonic tone for Sanskrit logic steps
  playVedicBell(stepNumber = 1) {
    if (!this.soundEnabled || !this.ctx) return;
    this.resumeCtx();

    const baseFreqs = [216, 256, 324, 384, 432]; // Ancient Indian Shadja & Panchama harmonic tunings
    const freq = baseFreqs[(stepNumber - 1) % baseFreqs.length];

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime); // Perfect fifth overtone

    const now = this.ctx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 1.25);
    subOsc.stop(now + 1.25);
  }

  // Modern digital crisp AI unification blip
  playAIChime(stepNumber = 1) {
    if (!this.soundEnabled || !this.ctx) return;
    this.resumeCtx();

    const aiPitches = [440, 554.37, 659.25, 880, 1108.73];
    const freq = aiPitches[(stepNumber - 1) % aiPitches.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, this.ctx.currentTime + 0.15);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Triumphant harmonic chime for Logic Lab 5/5 score
  playSuccessFanfare() {
    if (!this.soundEnabled || !this.ctx) return;
    this.resumeCtx();

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.85);
      }, idx * 110);
    });
  }
}

const audioSys = new EpistemicAudio();

// =============================================================================
// 2. KNOWLEDGE BASE DEFINITIONS (ANUMANA & MODERN AI DATASETS)
// =============================================================================
const INFERENCE_PRESETS = {
  mountain: {
    id: "mountain",
    title: "There is fire on the mountain",
    sanskritName: "पर्वतो वह्निमान्",
    domain: "Classical Nyaya Epistemology (Akshapada Gautama)",
    paksha: "पर्वतः (The Mountain - Locus)",
    sadhya: "वह्निः (Fire - Predicate to prove)",
    hetu: "धूमः (Smoke - Observed Sign)",
    drishtanta: "महानसः (Kitchen Hearth - Corroborated Positive Instance)",
    vipaksha: "महाह्रदः (Deep Lake - Negative Counter-Instance)",
    stages: [
      {
        step: 1,
        nyayaSutra: "प्रतिज्ञा: पर्वतो वह्निमान्",
        nyayaDesc: "The mountain possesses fire. The proposition (Pratijna) asserts the presence of the unobserved target property (Sadhya = Fire) on the specific subject/locus (Paksha = Mountain).",
        nyayaTags: { paksha: "पर्वतः (Mountain)", sadhya: "वह्निः (Fire)" },
        aiTerm: "Target Goal / Query Hypothesis",
        aiCode: "?- query(mountain, has_property(fire)).",
        aiDesc: "The Symbolic Engine registers a goal query in working memory. It queries whether Entity('mountain') satisfies the boolean predicate has_property('fire').",
        aiMetrics: { node: "Entity(Mountain)", pred: "fire == true" }
      },
      {
        step: 2,
        nyayaSutra: "हेतु: धूमवत्त्वात्",
        nyayaDesc: "Because it possesses smoke. The Hetu (Linga / Mark) is directly perceived on the subject (Paksha-dharmata), providing the evidentiary ground for inference.",
        nyayaTags: { hetu: "धूमः (Smoke)", status: "प्रत्यक्ष-सिद्ध (Direct Observation)" },
        aiTerm: "Fact / Sensor Telemetry Assertion",
        aiCode: 'WorkingMemory.assertFact("sensor_event", { entity: "mountain", telemetry: "smoke", confidence: 1.0 });',
        aiDesc: "A physical sensor (computer vision / camera telemetry) fires a high-confidence feature event: smoke signature detected at Mountain coordinates.",
        aiMetrics: { feature: "smoke_detected == 1.0", source: "PerceptualStream.Optical" }
      },
      {
        step: 3,
        nyayaSutra: "उदाहरण: यो यो धूमवान् स स वह्निमान्, यथा महानसः",
        nyayaDesc: "Wherever there is smoke, there is fire, as in a kitchen hearth (Mahanasa). The universal invariant concomitance (Vyapti) is corroborated by undisputed positive examples and verified absence in water bodies (Mahahrada).",
        nyayaTags: { vyapti: "धूम ➔ वह्नि (Smoke ➔ Fire)", drishtanta: "महानसः (Hearth)" },
        aiTerm: "IF-THEN Knowledge Base Rule (Horn Clause)",
        aiCode: "RULE_042: IF has_telemetry(?x, smoke) ∧ Vyapti(smoke, fire) THEN assert(?x, fire) [Weight: 1.0];",
        aiDesc: "The deductive knowledge base loads the invariant Horn clause: universal implication linking smoke to combustion, verified across ground-truth training corpora.",
        aiMetrics: { rule: "RULE_KB_COMBUSTION_01", weight: "1.0 (Strict Implication)" }
      },
      {
        step: 4,
        nyayaSutra: "उपनय: तथा चायं पर्वतः",
        nyayaDesc: "And this mountain has smoke that is inseparably pervaded by fire. The universal rule is mapped to the individual case (Vyapti-vishishta-paksha-dharmata-jnanam).",
        nyayaTags: { sambandha: "व्याप्तिविशिष्टपक्षधर्मताज्ञानम्" },
        aiTerm: "Pattern Matching & Variable Unification",
        aiCode: 'Unify(Rule_Premise(?x), Fact("mountain")) -> θ = { ?x / "mountain" } -> Activated in Agenda;',
        aiDesc: "The Rete algorithm resolves variable bindings. Variable '?x' successfully unifies with entity 'mountain', satisfying all antecedent conditions for activation.",
        aiMetrics: { unify: "θ = { ?x / mountain }", state: "Conflict Set Resolved" }
      },
      {
        step: 5,
        nyayaSutra: "निगमन: तस्मात् तथा",
        nyayaDesc: "Therefore, the mountain possesses fire. The proposition is formally demonstrated and established as indubitable truth (Pramiti), free from all five fallacies (Hetvabhasa).",
        nyayaTags: { pramiti: "सिद्धम् (Rationally Verified)" },
        aiTerm: "Inference Engine Conclusion & Action",
        aiCode: 'WorkingMemory.commitFact("has_fire", "mountain"); ActionController.dispatch(FIRE_ALERT);',
        aiDesc: "Deduction finalized. The inference engine commits the verified state to the knowledge graph and dispatches an autonomous wildfire alert to emergency services.",
        aiMetrics: { result: "Goal PROVEN (Deterministic 100%)" }
      }
    ]
  },

  server: {
    id: "server",
    title: "Server is overheating",
    sanskritName: "यन्त्र-अतितापोत्पत्तिः",
    domain: "Cloud Infrastructure & Predictive DevOps",
    paksha: "अभिकलक-यन्त्रम् (Server-Node-07)",
    sadhya: "अतितापः (Thermal Overheating Hazard)",
    hetu: "तापमान-वृद्धिः (CPU Temp > 98°C)",
    drishtanta: "भार-परीक्षण-केन्द्रम् (Stress-testing Benchmarks)",
    vipaksha: "शीत-कक्षः (Sub-zero Liquid Cooling Chamber)",
    stages: [
      {
        step: 1,
        nyayaSutra: "प्रतिज्ञा: अयं सर्वर-नोडः अतिताप-युक्तः",
        nyayaDesc: "Proposition: Server-Node-07 is undergoing critical overheating. The target state (Sadhya = Thermal Hazard) is hypothesized on the compute node (Paksha).",
        nyayaTags: { paksha: "यन्त्रम् (Server-07)", sadhya: "अतितापः (Thermal Hazard)" },
        aiTerm: "Target Goal / Query Hypothesis",
        aiCode: "?- query(server_node_07, status(critical_overheat)).",
        aiDesc: "The DevOps autonomous agent instantiates a diagnostic goal: Determine whether Server-Node-07 requires immediate thermal throttling or VM migration.",
        aiMetrics: { node: "ServerNode(07)", pred: "thermal_hazard == true" }
      },
      {
        step: 2,
        nyayaSutra: "हेतु: तापमान-संवेदक-उल्लंघनात् (T > ९८°C)",
        nyayaDesc: "Because its thermal sensor reads 98°C with fan speed saturation. The observed Hetu is a factual telemetry metric present on the compute instance.",
        nyayaTags: { hetu: "संवेदक-दत्तम् (Temp > 98°C)", status: "प्रत्यक्ष-सिद्ध (IoT Telemetry)" },
        aiTerm: "Fact / Sensor Telemetry Assertion",
        aiCode: 'WorkingMemory.assertFact("telemetry", { host: "srv-07", core_temp_c: 98.4, rpm: 8500 });',
        aiDesc: "Prometheus / BMC sensor stream pushes a threshold violation into the active event bus: Core temperature exceeds safe operating margin (98.4°C).",
        aiMetrics: { feature: "core_temp > 95.0", source: "HardwareMonitoring.BMC" }
      },
      {
        step: 3,
        nyayaSutra: "उदाहरण: यत्र यत्र तापमान-वृद्धिः तत्र अतिताप-नियमः",
        nyayaDesc: "Wherever semiconductor junction temperature exceeds 95°C under continuous load, silicon thermal degradation is inevitable (Vyapti), as witnessed in stress test benches.",
        nyayaTags: { vyapti: "ताप > ९५°C ➔ संक्षयः", drishtanta: "भार-परीक्षण (Stress Benchmark)" },
        aiTerm: "IF-THEN Knowledge Base Rule (Horn Clause)",
        aiCode: "RULE_DEVOPS_99: IF core_temp(?s) > 95.0 ∧ fan_max(?s) THEN assert(?s, state(overheat));",
        aiDesc: "System reliability engineering rule: If silicon temperature exceeds maximum threshold and cooling is maxed out, catastrophic thermal throttling occurs.",
        aiMetrics: { rule: "RULE_THERMAL_GOVERNOR", weight: "1.0 (Deterministic SRE Law)" }
      },
      {
        step: 4,
        nyayaSutra: "उपनय: तथा चायं सर्वर-नोडः",
        nyayaDesc: "And Server-Node-07 exhibits that exact junction temperature spike pervaded by thermal degradation (Upanaya: subsumption of the individual machine under the thermal law).",
        nyayaTags: { sambandha: "संबन्ध-योजन (Rule-to-Node Binding)" },
        aiTerm: "Pattern Matching & Variable Unification",
        aiCode: 'Unify(core_temp(?s), "srv-07") -> θ = { ?s / srv-07 } -> Trigger Action Pipeline;',
        aiDesc: "Rule engine unifies variable '?s' with 'srv-07'. Condition criteria satisfied with zero conflict; thermal mitigation rule enters execution agenda.",
        aiMetrics: { unify: "θ = { ?s / srv-07 }", state: "Conflict Set Resolved" }
      },
      {
        step: 5,
        nyayaSutra: "निगमन: तस्मात् अयं अतिताप-युक्तः",
        nyayaDesc: "Therefore, Server-Node-07 is verified as critically overheating. The proposition is established with mathematical certainty; failsafe actions are sanctioned.",
        nyayaTags: { pramiti: "सिद्धम् (Verified Thermal State)" },
        aiTerm: "Inference Engine Conclusion & Action",
        aiCode: 'ExecuteAction(EVACUATE_CONTAINERS, "srv-07"); ThrottleClockSpeed("srv-07", -500MHz);',
        aiDesc: "Conclusion committed to infrastructure Knowledge Graph. Kubernetes cluster orchestrator migrates pods and applies CPU clock throttling.",
        aiMetrics: { result: "Action Dispatched: Evacuate & Throttle" }
      }
    ]
  },

  packet_loss: {
    id: "packet_loss",
    title: "Network packet loss detected",
    sanskritName: "जाल-दत्त-क्षति-अनुमानम्",
    domain: "Cybersecurity & Routing Diagnostics",
    paksha: "सञ्चार-मार्गः (BGP Gateway Router-X)",
    sadhya: "दत्त-क्षति / प्रतिबन्धः (Network Congestion / Drop Attack)",
    hetu: "पुनः-प्रेषण-वृद्धिः (TCP Retransmission Spike > 35%)",
    drishtanta: "सञ्चय-कन्ठः (Congested Bottleneck Router)",
    vipaksha: "स्थिर-तन्तुः (Isolated Fiber Loopback)",
    stages: [
      {
        step: 1,
        nyayaSutra: "प्रतिज्ञा: अयं सञ्चार-मार्गः दत्त-हानि-ग्रस्तः",
        nyayaDesc: "Proposition: Gateway Router-X is suffering critical packet loss. The target predicate (Sadhya = Traffic Drop) is hypothesized on the ingress node (Paksha).",
        nyayaTags: { paksha: "सञ्चार-मार्गः (Router-X)", sadhya: "दत्त-क्षतिः (Packet Drop)" },
        aiTerm: "Target Goal / Query Hypothesis",
        aiCode: "?- query(gateway_router_x, state(packet_loss_critical)).",
        aiDesc: "Network telemetry agent initializes a diagnostics query to determine if ingress interface is dropping traffic due to buffer exhaustion or upstream DDoS.",
        aiMetrics: { node: "Router(X)", pred: "loss_rate > 30%" }
      },
      {
        step: 2,
        nyayaSutra: "हेतु: पुनः-प्रेषण-दर-वृद्धेः (Retransmit > ३५%)",
        nyayaDesc: "Because TCP retransmission rate has spiked to 38% with exponential ACK timeouts. The Hetu is an observable network anomaly present on Router-X.",
        nyayaTags: { hetu: "पुनः-प्रेषणम् (TCP Retransmit)", status: "प्रत्यक्ष-सिद्ध (Flow Telemetry)" },
        aiTerm: "Fact / Sensor Telemetry Assertion",
        aiCode: 'WorkingMemory.assertFact("flow_metric", { device: "router_x", retransmit_pct: 38.2 });',
        aiDesc: "sFlow/NetFlow packet collectors report that TCP SYN/ACK retransmissions jumped past standard threshold (38.2%), asserted into working memory.",
        aiMetrics: { feature: "retransmit_pct == 38.2", source: "Telemetry.NetFlow" }
      },
      {
        step: 3,
        nyayaSutra: "उदाहरण: यत्र यत्र तीव्र-पुनःप्रेषणम् तत्र दत्त-हानिः",
        nyayaDesc: "Wherever TCP retransmissions exceed 30%, severe link packet loss is invariably present (Vyapti), as corroborated in congested transit links.",
        nyayaTags: { vyapti: "पुनःप्रेषण ➔ दत्त-हानि", drishtanta: "सञ्चय-कन्ठ (Congested Pipe)" },
        aiTerm: "IF-THEN Knowledge Base Rule (Horn Clause)",
        aiCode: "RULE_NET_07: IF retransmits(?r) > 30% ∧ rtt_jitter(?r) > 120ms THEN assert(?r, packet_loss);",
        aiDesc: "RFC-compliant networking knowledge base encodes invariant implication: excessive retransmission combined with jitter guarantees packet drop.",
        aiMetrics: { rule: "RULE_NETWORK_CONGESTION", weight: "0.99 (Empirical Telemetry Law)" }
      },
      {
        step: 4,
        nyayaSutra: "उपनय: तथा चायं सञ्चार-मार्गः",
        nyayaDesc: "And Gateway Router-X exhibits this exact retransmission surge pervaded by link drop (Upanaya: connecting the telemetry of Router-X to the universal rule).",
        nyayaTags: { sambandha: "दत्त-संबन्ध-योजन (Fact Unification)" },
        aiTerm: "Pattern Matching & Variable Unification",
        aiCode: 'Unify(Rule_Antecedent(?r), "router_x") -> θ = { ?r / "router_x" } -> Fire Rule;',
        aiDesc: "Unification algorithm matches Router-X telemetry against the premise of Rule_NET_07, resolving variable bindings with complete satisfaction.",
        aiMetrics: { unify: "θ = { ?r / router_x }", state: "Active Transition" }
      },
      {
        step: 5,
        nyayaSutra: "निगमन: तस्मात् अयं दत्त-हानि-ग्रस्तः",
        nyayaDesc: "Therefore, Gateway Router-X has critical packet loss. Established as verified fact; rerouting policies and traffic shaping are immediately authorized.",
        nyayaTags: { pramiti: "सिद्धम् (Confirmed Packet Loss)" },
        aiTerm: "Inference Engine Conclusion & Action",
        aiCode: 'SDN_Controller.rerouteTraffic("router_x", "backup_gateway_y"); AlertOps("LINK_DEGRADATION");',
        aiDesc: "Autonomous SDN orchestrator diverts mission-critical packet routes to alternate backup gateway and files automated incident ticket.",
        aiMetrics: { result: "Action: Dynamic SDN Reroute Dispatched" }
      }
    ]
  },

  pneumonia: {
    id: "pneumonia",
    title: "Patient has acute pneumonia",
    sanskritName: "रुग्ण-फुफ्फुस-शोथ-अनुमानम्",
    domain: "Clinical Decision Support Systems (CDSS)",
    paksha: "रुग्णः (Patient-402)",
    sadhya: "फुफ्फुस-शोथः (Acute Pneumonia)",
    hetu: "एक्स-रे श्वेत-छाया (Chest X-Ray Infiltration + Hypoxia)",
    drishtanta: "सत्यापित-रोगी (Clinically Confirmed Cohort)",
    vipaksha: "स्वस्थ-फुफ्फुस (Clear Healthy Lungs)",
    stages: [
      {
        step: 1,
        nyayaSutra: "प्रतिज्ञा: अयं रोगी फुफ्फुस-शोथ-ग्रस्तः",
        nyayaDesc: "Proposition: Patient-402 has acute pneumonia. The clinical diagnosis (Sadhya) is asserted on the admitted patient (Paksha).",
        nyayaTags: { paksha: "रोगी (Patient-402)", sadhya: "फुफ्फुस-शोथः (Pneumonia)" },
        aiTerm: "Target Goal / Query Hypothesis",
        aiCode: "?- query(patient_402, diagnosis(acute_pneumonia)).",
        aiDesc: "Diagnostic expert system instantiates a medical query to validate clinical suspicion of bacterial pneumonia.",
        aiMetrics: { node: "Patient(402)", pred: "condition == pneumonia" }
      },
      {
        step: 2,
        nyayaSutra: "हेतु: एक्स-रे छाया-दर्शनात् + श्वास-कष्टात्",
        nyayaDesc: "Because chest radiograph reveals bilateral consolidation and pulse oximetry shows SpO2 < 91% (Hetu: direct objective clinical signs).",
        nyayaTags: { hetu: "एक्स-रे छाया + SpO2 < ९१%", status: "प्रत्यक्ष-सिद्ध (Radiology & Vitals)" },
        aiTerm: "Fact / Sensor Telemetry Assertion",
        aiCode: 'WorkingMemory.assertFact("vital_signs", { spo2: 90, cxr_infiltrate: true, fever_c: 39.1 });',
        aiDesc: "EHR ingest pipeline asserts observed medical telemetry: high fever, hypoxia, and radiological alveolar consolidation.",
        aiMetrics: { feature: "cxr_consolidation == 1", source: "EHR.Radiology & Vitals" }
      },
      {
        step: 3,
        nyayaSutra: "उदाहरण: यत्र यत्र फुफ्फुस-छाया तत्र शोथ-नियमः",
        nyayaDesc: "Wherever alveolar consolidation coincides with fever and hypoxia, acute pneumonia is invariably indicated (Vyapti), as documented in medical case studies.",
        nyayaTags: { vyapti: "छाया ➔ शोथ-नियमः", drishtanta: "सत्यापित-रोगी (Confirmed Cohort)" },
        aiTerm: "IF-THEN Knowledge Base Rule (Horn Clause)",
        aiCode: "RULE_MED_14: IF cxr_consolidation(?p) ∧ fever(?p) ∧ hypoxia(?p) THEN assert(?p, pneumonia);",
        aiDesc: "Evidence-based clinical guidelines (Gold Standard Knowledge Base) declare universal diagnostic criteria for pulmonary inflammation.",
        aiMetrics: { rule: "RULE_CLINICAL_GUIDELINE_2026", weight: "0.98 (Gold Standard)" }
      },
      {
        step: 4,
        nyayaSutra: "उपनय: तथा चायं रोगी",
        nyayaDesc: "And Patient-402 possesses these exact clinical markers pervaded by pneumonia (Upanaya: subsumption of the individual patient under medical law).",
        nyayaTags: { sambandha: "लक्षण-योजन (Clinical Subsumption)" },
        aiTerm: "Pattern Matching & Variable Unification",
        aiCode: 'Unify(RULE_MED_14(?p), "patient_402") -> θ = { ?p / patient_402 } -> Rule Activated;',
        aiDesc: "Rule engine unifies variables with Patient-402 records, confirming that all prerequisite antecedent medical criteria are satisfied.",
        aiMetrics: { unify: "θ = { ?p / patient_402 }", state: "Verified Match" }
      },
      {
        step: 5,
        nyayaSutra: "निगमन: तस्मात् अयं रोगी फुफ्फुस-शोथ-ग्रस्तः",
        nyayaDesc: "Therefore, Patient-402 is diagnosed with acute pneumonia. The conclusion is verified with medical rigor, allowing targeted antibiotic therapy.",
        nyayaTags: { pramiti: "सिद्धम् (Confirmed Medical Diagnosis)" },
        aiTerm: "Inference Engine Conclusion & Action",
        aiCode: 'CDSS.commitDiagnosis("acute_pneumonia"); OrderPrescription("IV_Antibiotics", "patient_402");',
        aiDesc: "Clinical Decision Support System signs off on diagnosis, schedules oxygen therapy, and recommends appropriate antibacterial regimen.",
        aiMetrics: { result: "Diagnosis Confirmed: Protocol Dispatched" }
      }
    ]
  },

  autonomous_brake: {
    id: "autonomous_brake",
    title: "Autonomous vehicle emergency brake",
    sanskritName: "स्वायत्त-वाहन-आकस्मिक-निरोधः",
    domain: "Autonomous Robotics & LiDAR Sensor Fusion",
    paksha: "स्वायत्त-वाहनम् (RoboCar-Alpha)",
    sadhya: "आकस्मिक-निरोधनम् (Emergency Collision Avoidance Brake)",
    hetu: "मार्गे सहसा अवरोध-दर्शनम् (Pedestrian within 6m & Distance Shrinking)",
    drishtanta: "परीक्षण-भूमि (Safety Test Proving Ground)",
    vipaksha: "मुक्त-राजमार्गः (Clear Open Highway)",
    stages: [
      {
        step: 1,
        nyayaSutra: "प्रतिज्ञा: स्वायत्त-वाहनेन आकस्मिक-निरोधः कर्तव्यः",
        nyayaDesc: "Proposition: RoboCar-Alpha must execute an immediate emergency stop. The safety action (Sadhya) is asserted for the vehicle (Paksha).",
        nyayaTags: { paksha: "वाहनम् (RoboCar-Alpha)", sadhya: "निरोधनम् (Emergency Brake)" },
        aiTerm: "Target Goal / Query Hypothesis",
        aiCode: "?- query(robocar_alpha, action(emergency_brake_required)).",
        aiDesc: "The vehicle trajectory safety executive queries whether trajectory continuation presents an imminent collision hazard.",
        aiMetrics: { node: "RoboCar(Alpha)", pred: "brake_action == required" }
      },
      {
        step: 2,
        nyayaSutra: "हेतु: समीपे अवरोध-प्रत्यक्षात् (दूरे < ६ मी.)",
        nyayaDesc: "Because multi-modal LiDAR and radar detect an obstacle at 5.4 meters with closing velocity of 12 m/s (Hetu: direct sensor perception).",
        nyayaTags: { hetu: "लीडार-संकेतः (LiDAR < 6m)", status: "प्रत्यक्ष-सिद्ध (Sensor Fusion)" },
        aiTerm: "Fact / Sensor Telemetry Assertion",
        aiCode: 'WorkingMemory.assertFact("fusion_track", { id: "obstacle_9", distance_m: 5.4, rel_speed: -12.0 });',
        aiDesc: "Perception stack fuses camera bounding box and LiDAR point cloud into an obstacle track vector asserted into the active world model.",
        aiMetrics: { feature: "distance < 6.0m ∧ closing", source: "Perception.LiDAR_Fusion" }
      },
      {
        step: 3,
        nyayaSutra: "उदाहरण: यत्र यत्र अन्तराल-लोपः तत्र निरोध-नियमः",
        nyayaDesc: "Wherever time-to-collision drops below 0.6 seconds, maximum friction braking is universally mandatory to preserve life (Vyapti), as proved on safety test tracks.",
        nyayaTags: { vyapti: "सन्निकर्ष ➔ निरोध-नियमः", drishtanta: "परीक्षण-मार्ग (Proving Ground)" },
        aiTerm: "IF-THEN Knowledge Base Rule (Horn Clause)",
        aiCode: "RULE_AV_01: IF TTC(?v, ?obs) < 0.6s THEN execute_override(?v, MAX_EMERGENCY_BRAKE);",
        aiDesc: "Deterministic safety guardrail certified under ISO 26262: If Time-To-Collision < 600ms, immediately command maximum braking deceleration.",
        aiMetrics: { rule: "RULE_COLLISION_AVOIDANCE", weight: "1.0 (Critical Guardrail)" }
      },
      {
        step: 4,
        nyayaSutra: "उपनय: तथा चायं स्वायत्त-वाहन-मार्गः",
        nyayaDesc: "And RoboCar-Alpha faces this exact critical distance breach pervaded by the collision prevention law (Upanaya: mapping current telemetry to the rule).",
        nyayaTags: { sambandha: "सन्निकर्ष-योजन (Rule Mapping)" },
        aiTerm: "Pattern Matching & Variable Unification",
        aiCode: 'Unify(RULE_AV_01(?v), "robocar_alpha") -> θ = { ?v / robocar_alpha } -> Override Engaged;',
        aiDesc: "Real-time microcontroller pattern-matches input telemetry; condition predicates evaluate TRUE; emergency interrupt takes control.",
        aiMetrics: { unify: "θ = { ?v / robocar_alpha }", state: "Priority Override" }
      },
      {
        step: 5,
        nyayaSutra: "निगमन: तस्मात् आकस्मिक-निरोधः सिद्धः",
        nyayaDesc: "Therefore, RoboCar-Alpha executes emergency stop. The deduction is certified in under 12 milliseconds, averting physical collision.",
        nyayaTags: { pramiti: "सिद्धम् (Collision Averted)" },
        aiTerm: "Inference Engine Conclusion & Action",
        aiCode: 'ActuatorController.applyTorque(MAX_HYDRAULIC_BRAKE); PublishTelemetry("SAFE_STOP_ACHIEVED");',
        aiDesc: "CAN bus commands hydraulic brake calipers at 100% pressure. Vehicle comes to complete halt safely; collision successfully prevented.",
        aiMetrics: { result: "Action: 100% Emergency Deceleration" }
      }
    ]
  }
};

// =============================================================================
// 3. SIMULATOR CONTROLLER (SECTION 1)
// =============================================================================
class InferenceSimulator {
  constructor() {
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
    this.aiStatusPill = document.getElementById("ai-status-pill");
    this.logTerminal = document.getElementById("inference-log-terminal");
    this.copyTraceBtn = document.getElementById("copy-trace-btn");
    this.clearTraceBtn = document.getElementById("clear-trace-btn");

    // Export Report Modal elements
    this.exportReportBtn = document.getElementById("export-report-btn");
    this.exportModal = document.getElementById("export-modal");
    this.closeExportBtn = document.getElementById("close-export-btn");
    this.reportPre = document.getElementById("report-text-pre");
    this.copyReportBtn = document.getElementById("copy-report-markdown-btn");
    this.downloadReportBtn = document.getElementById("download-report-btn");
  }

  bindEvents() {
    // Preset dropdown
    if (this.presetSelect) {
      this.presetSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "custom") {
          this.setupCustomPreset();
        } else {
          this.loadPreset(val);
        }
      });
    }

    // Preset chips
    this.presetChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const presetKey = chip.getAttribute("data-preset");
        this.presetChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        if (this.presetSelect) this.presetSelect.value = presetKey;
        this.loadPreset(presetKey);
      });
    });

    // Custom proposition input
    if (this.customInput) {
      this.customInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.setupCustomPreset(this.customInput.value);
        }
      });
    }

    // Engine Control Buttons
    if (this.runBtn) {
      this.runBtn.addEventListener("click", () => this.toggleRunInference());
    }
    if (this.stepBtn) {
      this.stepBtn.addEventListener("click", () => this.stepInference());
    }
    if (this.stepPrevBtn) {
      this.stepPrevBtn.addEventListener("click", () => this.stepPrevInference());
    }
    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.resetInference());
    }

    // Keyboard Navigation Shortcuts
    window.addEventListener("keydown", (e) => {
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

    // Speed Controls
    this.speedBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.speedBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.speedMs = parseInt(btn.getAttribute("data-speed"), 10) || 800;
      });
    });

    // Stepper node click jump
    this.stepperNodes.forEach(node => {
      node.addEventListener("click", () => {
        const step = parseInt(node.getAttribute("data-step"), 10);
        this.jumpToStep(step);
      });
    });

    // Terminal Trace actions
    if (this.copyTraceBtn) {
      this.copyTraceBtn.addEventListener("click", () => this.copyTraceLog());
    }
    if (this.clearTraceBtn) {
      this.clearTraceBtn.addEventListener("click", () => {
        if (this.logTerminal) {
          this.logTerminal.innerHTML = '<div class="log-line system-line">[SYSTEM] Console cleared. Engine ready.</div>';
        }
      });
    }

    // Export Report Events
    if (this.exportReportBtn) {
      this.exportReportBtn.addEventListener("click", () => this.openExportModal());
    }
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
    if (this.copyReportBtn) {
      this.copyReportBtn.addEventListener("click", () => this.copyReport());
    }
    if (this.downloadReportBtn) {
      this.downloadReportBtn.addEventListener("click", () => this.downloadReport());
    }
  }

  loadPreset(presetKey) {
    this.resetInference();
    const data = INFERENCE_PRESETS[presetKey] || INFERENCE_PRESETS.mountain;
    this.currentPresetKey = presetKey;

    if (this.customInput) {
      this.customInput.value = data.title;
    }

    // Update Stage UI contents with preset data
    for (let i = 1; i <= 5; i++) {
      const stage = data.stages[i - 1];
      if (!stage) continue;

      // Nyaya column
      const nyayaSutraEl = document.getElementById(`nyaya-sutra-${i}`);
      const nyayaDescEl = document.getElementById(`nyaya-desc-${i}`);
      if (nyayaSutraEl) nyayaSutraEl.textContent = stage.nyayaSutra;
      if (nyayaDescEl) nyayaDescEl.textContent = stage.nyayaDesc;

      // AI column
      const aiCodeEl = document.getElementById(`ai-code-${i}`);
      const aiDescEl = document.getElementById(`ai-desc-${i}`);
      if (aiCodeEl) aiCodeEl.textContent = stage.aiCode;
      if (aiDescEl) aiDescEl.textContent = stage.aiDesc;
    }

    // Specific tags
    const tagPaksha = document.getElementById("tag-paksha");
    const tagSadhya = document.getElementById("tag-sadhya");
    const tagHetu = document.getElementById("tag-hetu");
    const tagVyapti = document.getElementById("tag-vyapti");
    const tagDrishtanta = document.getElementById("tag-drishtanta");

    if (tagPaksha) tagPaksha.textContent = data.paksha;
    if (tagSadhya) tagSadhya.textContent = data.sadhya;
    if (tagHetu) tagHetu.textContent = data.hetu;
    if (tagVyapti) tagVyapti.textContent = data.stages[2].nyayaTags.vyapti || "Hetu ➔ Sadhya";
    if (tagDrishtanta) tagDrishtanta.textContent = data.drishtanta;

    // AI Metrics
    const nodeMetric = document.getElementById("ai-metric-node");
    const predMetric = document.getElementById("ai-metric-pred");
    const featureMetric = document.getElementById("ai-metric-feature");
    const unifyMetric = document.getElementById("ai-metric-unify");
    const resultMetric = document.getElementById("ai-metric-result");

    if (nodeMetric && data.stages[0]?.aiMetrics?.node) nodeMetric.textContent = data.stages[0].aiMetrics.node;
    if (predMetric && data.stages[0]?.aiMetrics?.pred) predMetric.textContent = data.stages[0].aiMetrics.pred;
    if (featureMetric && data.stages[1]?.aiMetrics?.feature) featureMetric.textContent = data.stages[1].aiMetrics.feature;
    if (unifyMetric && data.stages[3]?.aiMetrics?.unify) unifyMetric.textContent = data.stages[3].aiMetrics.unify;
    if (resultMetric && data.stages[4]?.aiMetrics?.result) resultMetric.textContent = data.stages[4].aiMetrics.result;

    this.log(`[KB_LOAD] Loaded Knowledge Domain: ${data.domain}`);
    this.log(`[PREMISE] Target Proposition: "${data.title}" (Paksha: ${data.paksha}, Sadhya: ${data.sadhya})`);
  }

  setupCustomPreset(customText = null) {
    const text = customText || (this.customInput ? this.customInput.value.trim() : "Custom Hypothesis");
    this.resetInference();
    this.currentPresetKey = "custom";

    const customData = {
      id: "custom",
      title: text || "Custom Proposition",
      domain: "User-Defined Knowledge Graph Query",
      paksha: `Entity(${text.split(" ")[0] || "Target"})`,
      sadhya: "AssertedProperty(True)",
      hetu: "EmpiricalTelemetrySignal(Present)",
      drishtanta: "GroundTruthCorpus.VerifiedInstance",
      stages: [
        {
          step: 1,
          nyayaSutra: `प्रतिज्ञा: "${text}" इति साध्य-प्रतिज्ञा`,
          nyayaDesc: `Proposition: Demonstrating whether ${text} holds true with epistemic certainty.`,
          aiCode: `?- query(target_instance, hypothesis("${text}")).`,
          aiDesc: "Instantiating target goal state in working memory agenda.",
          aiMetrics: { node: "CustomEntity", pred: "target_predicate == true" }
        },
        {
          step: 2,
          nyayaSutra: `हेतु: प्रत्यक्ष-चिह्न-उपलब्धेः (Observable Indicator Present)`,
          nyayaDesc: "The middle term / evidentiary indicator observed on the target entity.",
          aiCode: `WorkingMemory.assertFact("feature_event", { indicator: "observed", confidence: 1.0 });`,
          aiDesc: "Direct sensory/feature ingestion asserts ground-truth indicator into graph.",
          aiMetrics: { feature: "indicator_detected == 1", source: "TelemetryStream" }
        },
        {
          step: 3,
          nyayaSutra: `उदाहरण: यत्र यत्र हेतुः तत्र साध्यम् (Universal Invariant Law)`,
          nyayaDesc: "Wherever this indicator manifests, the conclusion is invariant (Vyapti), backed by positive exemplars.",
          aiCode: `RULE_CUSTOM: IF indicator(?x) ∧ Vyapti(indicator, target) THEN assert(?x, goal);`,
          aiDesc: "Horn clause implication loaded from ontology constraints.",
          aiMetrics: { rule: "RULE_CUSTOM_01", weight: "1.0" }
        },
        {
          step: 4,
          nyayaSutra: `उपनय: तथा चायं विषयः (Subsumption of Current Case)`,
          nyayaDesc: "Application of the invariant law to the specific target entity.",
          aiCode: `Unify(RULE_CUSTOM(?x), "target_instance") -> θ = { ?x / target_instance };`,
          aiDesc: "Unification algorithm binds entity variables to rule parameters.",
          aiMetrics: { unify: "θ = { ?x / target_instance }", state: "Active Transition" }
        },
        {
          step: 5,
          nyayaSutra: `निगमन: तस्मात् तथा (Formally Proven Conclusion)`,
          nyayaDesc: "The proposition is certified as indubitably established without fallacy.",
          aiCode: `WorkingMemory.commitFact("proven", "${text}"); Action.dispatch();`,
          aiDesc: "State committed to persistent store; downstream autonomous action executed.",
          aiMetrics: { result: "Status: Validated Deduction" }
        }
      ]
    };

    INFERENCE_PRESETS.custom = customData;
    this.loadPreset("custom");
  }

  toggleRunInference() {
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Resume</span><span class="btn-sanskrit-sub">अनुवर्तनम्</span>';
      }
      this.log(`[PAUSE] Inference paused at Step ${this.currentStep}.`);
    } else {
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
      this.runBtn.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">Pause</span><span class="btn-sanskrit-sub">विरामः</span>';
      this.runBtn.disabled = false;
    }

    this.setStatusActive(true);
    if (this.currentStep === 0) {
      this.log(`[ANUMANA_START] Initiating 5-Member Nyaya Syllogism for: "${INFERENCE_PRESETS[this.currentPresetKey].title}"`);
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
          this.runBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">Run Inference</span><span class="btn-sanskrit-sub">अनुमान चालन</span>';
          this.runBtn.disabled = false;
        }
        this.log(`[ANUMANA_COMPLETE] Nigamana reached. All 5 members verified. Epistemic certainty established.`);
      }
    }, this.speedMs);
  }

  stepPrevInference() {
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">Run Inference</span><span class="btn-sanskrit-sub">अनुमान चालन</span>';
        this.runBtn.disabled = false;
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
    if (this.isRunning) {
      clearInterval(this.stepInterval);
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">Run Inference</span><span class="btn-sanskrit-sub">अनुमान चालन</span>';
        this.runBtn.disabled = false;
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
      if (this.runBtn) this.runBtn.disabled = false;
    }
    this.resetInference();
    for (let s = 1; s <= targetStep; s++) {
      this.currentStep = s;
      this.renderStep(s, false); // Don't re-chime on jump
    }
    audioSys.playVedicBell(targetStep);
  }

  renderStep(stepNum, withSound = true) {
    const stageNames = ["Pratijna", "Hetu", "Udaharana", "Upanaya", "Nigamana"];
    const stageSanskrit = ["प्रतिज्ञा", "हेतु", "उदाहरण", "उपनय", "निगमन"];
    const aiStages = ["Goal Setup", "Fact Ingestion", "Horn Rule Match", "Rete Unification", "Assertion Commit"];

    // Update progress bar
    if (this.progressBar) {
      const pct = (stepNum / 5) * 100;
      this.progressBar.style.width = `${pct}%`;
    }

    // Update stepper node badges
    this.stepperNodes.forEach(node => {
      const s = parseInt(node.getAttribute("data-step"), 10);
      if (s < stepNum) {
        node.classList.remove("active");
        node.classList.add("completed");
      } else if (s === stepNum) {
        node.classList.add("active");
        node.classList.remove("completed");
      } else {
        node.classList.remove("active", "completed");
      }
    });

    // Update step cards in both Nyaya & AI columns
    for (let i = 1; i <= 5; i++) {
      const nyayaCard = document.getElementById(`nyaya-step-${i}`);
      const aiCard = document.getElementById(`ai-step-${i}`);

      if (i < stepNum) {
        if (nyayaCard) {
          nyayaCard.classList.remove("active-stage");
          nyayaCard.classList.add("completed-stage");
          const badge = nyayaCard.querySelector(".step-state-badge");
          if (badge) badge.textContent = "Verified ✓";
        }
        if (aiCard) {
          aiCard.classList.remove("active-stage");
          aiCard.classList.add("completed-stage");
          const badge = aiCard.querySelector(".step-state-badge");
          if (badge) badge.textContent = "Resolved ✓";
        }
      } else if (i === stepNum) {
        if (nyayaCard) {
          nyayaCard.classList.add("active-stage");
          nyayaCard.classList.remove("completed-stage");
          const badge = nyayaCard.querySelector(".step-state-badge");
          if (badge) badge.textContent = "Active Stage";
          nyayaCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        if (aiCard) {
          aiCard.classList.add("active-stage");
          aiCard.classList.remove("completed-stage");
          const badge = aiCard.querySelector(".step-state-badge");
          if (badge) badge.textContent = "Active Evaluation";
        }
      } else {
        if (nyayaCard) {
          nyayaCard.classList.remove("active-stage", "completed-stage");
          const badge = nyayaCard.querySelector(".step-state-badge");
          if (badge) badge.textContent = "Pending";
        }
        if (aiCard) {
          aiCard.classList.remove("active-stage", "completed-stage");
          const badge = aiCard.querySelector(".step-state-badge");
          if (badge) badge.textContent = "Awaiting";
        }
      }
    }

    // Audio Feedback
    if (withSound) {
      audioSys.playVedicBell(stepNum);
      setTimeout(() => audioSys.playAIChime(stepNum), 150);
    }

    // Log to terminal trace
    const data = INFERENCE_PRESETS[this.currentPresetKey] || INFERENCE_PRESETS.mountain;
    const stageData = data.stages[stepNum - 1];
    this.log(`[STAGE_${stepNum}] ${stageSanskrit[stepNum - 1]} (${stageNames[stepNum - 1]}): ${stageData.nyayaSutra}`);
    this.log(`       ↳ AI Equivalent [${aiStages[stepNum - 1]}]: ${stageData.aiCode}`, "sub-log");
  }

  resetInference() {
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }
    this.isRunning = false;
    this.currentStep = 0;

    if (this.runBtn) {
      this.runBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">Run Inference</span><span class="btn-sanskrit-sub">अनुमान चालन</span>';
      this.runBtn.disabled = false;
    }

    if (this.progressBar) this.progressBar.style.width = "0%";

    this.stepperNodes.forEach(node => {
      node.classList.remove("active", "completed");
    });

    for (let i = 1; i <= 5; i++) {
      const nyayaCard = document.getElementById(`nyaya-step-${i}`);
      const aiCard = document.getElementById(`ai-step-${i}`);
      if (nyayaCard) {
        nyayaCard.classList.remove("active-stage", "completed-stage");
        const b = nyayaCard.querySelector(".step-state-badge");
        if (b) b.textContent = "Pending";
      }
      if (aiCard) {
        aiCard.classList.remove("active-stage", "completed-stage");
        const b = aiCard.querySelector(".step-state-badge");
        if (b) b.textContent = "Awaiting";
      }
    }

    this.setStatusActive(false);
  }

  setStatusActive(active) {
    if (this.nyayaStatusPill) {
      if (active) {
        this.nyayaStatusPill.classList.add("active");
        this.nyayaStatusPill.querySelector(".status-text").textContent = "Inferring...";
      } else {
        this.nyayaStatusPill.classList.remove("active");
        this.nyayaStatusPill.querySelector(".status-text").textContent = "Standby";
      }
    }
    if (this.aiStatusPill) {
      if (active) {
        this.aiStatusPill.classList.add("active");
        this.aiStatusPill.querySelector(".status-text").textContent = "Rete Engine Active";
      } else {
        this.aiStatusPill.classList.remove("active");
        this.aiStatusPill.querySelector(".status-text").textContent = "Standby";
      }
    }
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
    const text = this.logTerminal.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("HetuLogic Execution Trace copied to clipboard!");
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  }

  openExportModal() {
    const data = INFERENCE_PRESETS[this.currentPresetKey] || INFERENCE_PRESETS.mountain;
    const now = new Date();
    const dateStr = now.toISOString().replace("T", " ").substring(0, 19) + " UTC";

    const reportMarkdown = `# PRAMANAX INFERENCE AUDIT REPORT
Generated: ${dateStr}
Framework: HetuLogic (Nyaya-Vaisheshika ⇌ Symbolic AI)
Domain: ${data.domain}
Active Proposition: "${data.title}"

=============================================================================
I. NYAYA PANCHA-AVAYAVA (पञ्चावयव अनुमान - 5-Member Deductive Syllogism)
=============================================================================
1. PRATIJNA (प्रतिज्ञा - Thesis / Hypothesis):
   • Sanskrit Formula: ${data.stages[0].nyayaSutra}
   • Subject (Paksha / पक्ष): ${data.paksha}
   • Target Predicate (Sadhya / साध्य): ${data.sadhya}
   • Epistemic Role: ${data.stages[0].nyayaDesc}

2. HETU (हेतु - Observed Sign / Ground):
   • Sanskrit Formula: ${data.stages[1].nyayaSutra}
   • Observable Mark (Linga / लिङ्ग): ${data.hetu}
   • Epistemic Status: ${data.stages[1].nyayaTags.status}
   • Grounding: ${data.stages[1].nyayaDesc}

3. UDAHARANA (उदाहरण - Universal Rule / Vyapti & Exemplar):
   • Sanskrit Formula: ${data.stages[2].nyayaSutra}
   • Invariant Concomitance (Vyapti): ${data.stages[2].nyayaTags.vyapti || "Hetu ➔ Sadhya"}
   • Positive Corroboration (Sapaksha / सपक्ष): ${data.drishtanta}
   • Negative Counter-Check (Vipaksha / विपक्ष): ${data.vipaksha || "Negative class absence"}
   • Falsification: Free from unstated conditions (Upadhi-rahita)

4. UPANAYA (उपनय - Subsumption / Application):
   • Sanskrit Formula: ${data.stages[3].nyayaSutra}
   • Cognitive Nexus: Vyapti-vishishta-paksha-dharmata-jnanam
   • Application: ${data.stages[3].nyayaDesc}

5. NIGAMANA (निगमन - Certified Deduction):
   • Sanskrit Formula: ${data.stages[4].nyayaSutra}
   • Epistemic Status: Pramiti-Siddham (Rationally Certified Q.E.D.)
   • Conclusion: ${data.stages[4].nyayaDesc}

=============================================================================
II. MODERN SYMBOLIC AI & EXPERT SYSTEM EQUIVALENCE TRACE
=============================================================================
• Target Goal Specification:
  ${data.stages[0].aiCode}
  ↳ Semantics: ${data.stages[0].aiDesc}

• Ground Fact / Ingestion Event:
  ${data.stages[1].aiCode}
  ↳ Semantics: ${data.stages[1].aiDesc}

• Production Rule / Horn Clause:
  ${data.stages[2].aiCode}
  ↳ Semantics: ${data.stages[2].aiDesc}

• Pattern Matching & Rete Variable Unification:
  ${data.stages[3].aiCode}
  ↳ Semantics: ${data.stages[3].aiDesc}

• Committed Deduction & Actuator Execution:
  ${data.stages[4].aiCode}
  ↳ Semantics: ${data.stages[4].aiDesc}

=============================================================================
III. HETVABHASA (FALLACY) AUDIT CHECKLIST
=============================================================================
[✓] Savyabhichara (Irregular Reason / Hallucination): PASSED (Invariant Co-presence verified)
[✓] Viruddha (Contradictory Reason / Poisoning):     PASSED (Premise affirms conclusion)
[✓] Satpratipaksha (Counterbalanced Conflict):       PASSED (No equal opposing thesis)
[✓] Asiddha (Unproved Premise / OOD):               PASSED (Sensory telemetry established)
[✓] Badhita (Contradicted by Perception):           PASSED (Direct Pratyaksha alignment)

CERTIFICATION: Sound inference established. Free from hallucinations.
`;

    if (this.reportPre) {
      this.reportPre.textContent = reportMarkdown;
    }
    if (this.exportModal) {
      this.exportModal.classList.add("open");
    }
    audioSys.playAIChime(1);
  }

  copyReport() {
    if (!this.reportPre) return;
    const text = this.reportPre.textContent;
    navigator.clipboard.writeText(text).then(() => {
      alert("PramanaX Deduction Report copied to clipboard as Markdown!");
    }).catch(err => {
      console.error("Could not copy report: ", err);
    });
  }

  downloadReport() {
    if (!this.reportPre) return;
    const text = this.reportPre.textContent;
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PramanaX_Audit_${this.currentPresetKey}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    audioSys.playAIChime(2);
  }
}

// =============================================================================
// 4. SECTION 2: IKS-TO-AI MAPPING CARDS & VYAPTI FALSIFICATION TESTER
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
          <span class="result-badge valid">VALID VYAPTI (व्याप्ति-सत्यम्)</span>
          <span class="result-text">Where there is smoke, fire is unconditionally guaranteed. Counter-instances (Vipaksha like deep lakes) never possess smoke without fire.</span>
        `;
        audioSys.playAIChime(1);
      } else {
        vyaptiResultBox.innerHTML = `
          <span class="result-badge invalid">INVALID VYAPTI / उपाधि-दोष (Upadhi Error)</span>
          <span class="result-text">"Where there is fire, there is smoke" FAILS. A glowing red-hot iron ball has fire but NO smoke. Smoke requires an extra unstated condition (Upadhi): moist fuel (आर्ध्रेन्धन-संयोग).</span>
        `;
        audioSys.playAIChime(4);
      }
    });
  });

  // Toggle Syllogism Model View in Card 3
  const toggleSyllogismBtn = document.getElementById("toggle-syllogism-btn");
  const syllogismBox = document.getElementById("syllogism-model-box");
  if (toggleSyllogismBtn && syllogismBox) {
    toggleSyllogismBtn.addEventListener("click", () => {
      const isHidden = syllogismBox.style.display === "none";
      syllogismBox.style.display = isHidden ? "block" : "none";
      toggleSyllogismBtn.textContent = isHidden ? "Hide Formal Comparison" : "Compare Models";
      audioSys.playAIChime(1);
    });
  }
}

// =============================================================================
// 5. SECTION 3: LOGIC LAB (ANUMANA 5-CARD SORTING GAME)
// =============================================================================
const LAB_SCENARIOS = {
  mountain: {
    id: "mountain",
    title: 'Question: "Is there fire on the mountain?" (पर्वतो वह्निमान् न वा?)',
    instruction: "Rearrange the cards below from Step 1 to Step 5 using the ▲ Up / ▼ Down buttons or by dragging and dropping cards. Then click 'Submit Answer' to validate your epistemic sequence.",
    correctOrder: [
      {
        id: "step1",
        stepNum: 1,
        text: 'The mountain has fire.',
        sanskrit: '१. प्रतिज्ञा: पर्वतो वह्निमान् (Proposition)',
        role: 'Pratijna (Thesis to be proved)'
      },
      {
        id: "step2",
        stepNum: 2,
        text: 'Because there is smoke.',
        sanskrit: '२. हेतु: धूमवत्त्वात् (Observed Reason)',
        role: 'Hetu (Empirical Sign / Mark)'
      },
      {
        id: "step3",
        stepNum: 3,
        text: 'Wherever there is smoke, there is fire (like in a kitchen).',
        sanskrit: '३. उदाहरण: यो यो धूमवान् स स वह्निमान्, यथा महानसः (Universal Rule)',
        role: 'Udaharana (Vyapti + Verified Drishtanta)'
      },
      {
        id: "step4",
        stepNum: 4,
        text: 'The mountain has smoke that is pervaded by fire.',
        sanskrit: '४. उपनय: तथा चायं पर्वतः (Subsumption / Application)',
        role: 'Upanaya (Rule applied to current locus)'
      },
      {
        id: "step5",
        stepNum: 5,
        text: 'Therefore, the mountain has fire.',
        sanskrit: '५. निगमन: तस्मात् तथा (Validated Deduction)',
        role: 'Nigamana (Epistemic Q.E.D.)'
      }
    ]
  },

  server: {
    id: "server",
    title: 'Question: "Is the cloud server overheating?" (सर्वर-नोडः अतिताप-युक्तः न वा?)',
    instruction: "Assemble the diagnostic rule trace from Hypothesis to Automated Throttling Action.",
    correctOrder: [
      {
        id: "step1",
        stepNum: 1,
        text: 'Server-Node-07 is undergoing thermal throttling hazard.',
        sanskrit: '१. प्रतिज्ञा: सर्वर-नोडः अतिताप-युक्तः (Target Goal)',
        role: 'Pratijna (SRE Diagnostic Goal)'
      },
      {
        id: "step2",
        stepNum: 2,
        text: 'Because its CPU core temperature exceeds 98°C with saturated cooling fans.',
        sanskrit: '२. हेतु: तापमान-संवेदक-उल्लंघनात् (Telemetry Metric)',
        role: 'Hetu (Hardware Monitoring Fact)'
      },
      {
        id: "step3",
        stepNum: 3,
        text: 'Whenever silicon temperature exceeds 95°C under continuous load, thermal shutdown is inevitable (like in stress benchmark tests).',
        sanskrit: '३. उदाहरण: ताप-वृद्धि-व्याप्ति-नियमः (Production Rule)',
        role: 'Udaharana (Universal SRE Horn Clause)'
      },
      {
        id: "step4",
        stepNum: 4,
        text: 'And Server-Node-07 has that exact critical thermal spike governed by this reliability law.',
        sanskrit: '४. उपनय: यन्त्रे नियम-योजनम् (Variable Unification)',
        role: 'Upanaya (Rete Node Match)'
      },
      {
        id: "step5",
        stepNum: 5,
        text: 'Therefore, Server-Node-07 is confirmed as overheating; execute container migration and clock throttle.',
        sanskrit: '५. निगमन: तस्मात् अतिताप-सिद्धान्तः (Action Commit)',
        role: 'Nigamana (Autonomous Actuator Execution)'
      }
    ]
  },

  autonomous: {
    id: "autonomous",
    title: 'Question: "Must the autonomous vehicle trigger emergency braking?" (वाहन-निरोधः कर्तव्यः न वा?)',
    instruction: "Arrange the real-time sensor-fusion decision pipeline into the valid Nyaya sequence.",
    correctOrder: [
      {
        id: "step1",
        stepNum: 1,
        text: 'RoboCar-Alpha must trigger emergency braking immediately.',
        sanskrit: '१. प्रतिज्ञा: आकस्मिक-निरोधः कर्तव्यः (Safety Goal)',
        role: 'Pratijna (Autonomous Decision Target)'
      },
      {
        id: "step2",
        stepNum: 2,
        text: 'Because forward LiDAR detects an unexpected pedestrian at 5.4 meters.',
        sanskrit: '२. हेतु: समीपे अवरोध-प्रत्यक्षात् (Perceptual Track)',
        role: 'Hetu (Fused Sensor Observation)'
      },
      {
        id: "step3",
        stepNum: 3,
        text: 'Whenever time-to-collision is under 0.6 seconds, maximum emergency friction braking is universally mandatory (demonstrated on test proving grounds).',
        sanskrit: '३. उदाहरण: सन्निकर्ष-निरोध-नियमः (Safety Guardrail)',
        role: 'Udaharana (Universal Safety Invariant)'
      },
      {
        id: "step4",
        stepNum: 4,
        text: 'And RoboCar-Alpha faces this exact critical distance breach governed by collision prevention physics.',
        sanskrit: '४. उपनय: सन्निकर्ष-योजनम् (Subsumption)',
        role: 'Upanaya (Trajectory State Binding)'
      },
      {
        id: "step5",
        stepNum: 5,
        text: 'Therefore, RoboCar-Alpha applies 100% hydraulic brake torque to prevent collision.',
        sanskrit: '५. निगमन: निरोध-सिद्धिः (Verified Safety Command)',
        role: 'Nigamana (Certified Braking Output)'
      }
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
    // Scenario Switchers
    this.scenarioBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.scenarioBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.getAttribute("data-scenario");
        this.loadScenario(key);
      });
    });

    // Submit & Shuffle & Hint & Reveal
    if (this.submitBtn) {
      this.submitBtn.addEventListener("click", () => this.evaluateAnswer());
    }
    if (this.shuffleBtn) {
      this.shuffleBtn.addEventListener("click", () => this.shuffleCards(true));
    }
    if (this.revealBtn) {
      this.revealBtn.addEventListener("click", () => this.revealSolution());
    }
    if (this.hintBtn) {
      this.hintBtn.addEventListener("click", () => this.toggleHint());
    }
  }

  loadScenario(key) {
    this.currentScenarioKey = key;
    const scenario = LAB_SCENARIOS[key] || LAB_SCENARIOS.mountain;

    if (this.titleEl) this.titleEl.textContent = scenario.title;
    if (this.instructionEl) this.instructionEl.textContent = scenario.instruction;

    // Reset status, attempts & score
    this.hasSubmitted = false;
    this.attempts = 0;
    if (this.attemptsEl) this.attemptsEl.textContent = "0";
    if (this.scoreEl) this.scoreEl.textContent = "0 / 5";
    if (this.scorePercentEl) this.scorePercentEl.textContent = "(Not Submitted)";
    if (this.feedbackPanel) this.feedbackPanel.style.display = "none";
    if (this.hintBox) this.hintBox.style.display = "none";

    // Shuffle fresh cards
    this.cards = JSON.parse(JSON.stringify(scenario.correctOrder));
    this.shuffleCards(false);
  }

  shuffleCards(withSound = false) {
    // Fisher-Yates shuffle
    const arr = [...this.cards];
    let isSame = true;

    // Ensure it's not accidentally in the perfect 1-2-3-4-5 order
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
      card.setAttribute("data-step-id", item.id);

      // Check validation classes if already submitted
      if (this.hasSubmitted) {
        if (item.stepNum === index + 1) {
          card.classList.add("card-correct");
        } else {
          card.classList.add("card-incorrect");
        }
      }

      card.innerHTML = `
        <div class="card-left-group">
          <span class="drag-handle" title="Drag to reorder">⠿</span>
          <div class="slot-position-badge">Slot ${index + 1}</div>
          <div class="card-text-group">
            <span class="card-premise-text">${item.text}</span>
            <span class="card-sanskrit-preview">${item.sanskrit}</span>
          </div>
        </div>
        <div class="card-arrow-controls">
          <button class="arrow-btn move-up" title="Move Up" ${index === 0 ? "disabled" : ""}>▲</button>
          <button class="arrow-btn move-down" title="Move Down" ${index === this.cards.length - 1 ? "disabled" : ""}>▼</button>
        </div>
      `;

      // Up / Down Button Handlers
      const upBtn = card.querySelector(".move-up");
      const downBtn = card.querySelector(".move-down");

      upBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.swap(index, index - 1);
      });

      downBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.swap(index, index + 1);
      });

      // HTML5 Drag & Drop Listeners
      card.addEventListener("dragstart", (e) => {
        this.draggedIndex = index;
        card.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index);
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        this.cardsContainer.querySelectorAll(".sortable-card").forEach(c => c.classList.remove("drag-over"));
      });

      card.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        card.classList.add("drag-over");
      });

      card.addEventListener("dragleave", () => {
        card.classList.remove("drag-over");
      });

      card.addEventListener("drop", (e) => {
        e.preventDefault();
        card.classList.remove("drag-over");
        const targetIndex = index;
        if (this.draggedIndex !== null && this.draggedIndex !== targetIndex) {
          const moved = this.cards.splice(this.draggedIndex, 1)[0];
          this.cards.splice(targetIndex, 0, moved);
          this.renderCards();
          audioSys.playAIChime(1);
        }
      });

      this.cardsContainer.appendChild(card);
    });
  }

  swap(i, j) {
    if (i < 0 || i >= this.cards.length || j < 0 || j >= this.cards.length) return;
    const temp = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = temp;
    this.renderCards();
    audioSys.playAIChime(1);
  }

  evaluateAnswer(isReveal = false) {
    this.hasSubmitted = true;
    if (!isReveal) {
      this.attempts++;
      if (this.attemptsEl) this.attemptsEl.textContent = this.attempts.toString();
    }
    let score = 0;

    this.cards.forEach((card, index) => {
      if (card.stepNum === index + 1) {
        score++;
      }
    });

    const percent = Math.round((score / 5) * 100);
    if (this.scoreEl) this.scoreEl.textContent = `${score} / 5`;
    if (this.scorePercentEl) this.scorePercentEl.textContent = isReveal ? "(Solution Revealed)" : `(${percent}% Valid Sequence)`;

    // Re-render cards with green/red highlight classes
    this.renderCards();

    // Populate feedback panel
    if (this.feedbackPanel) {
      this.feedbackPanel.style.display = "block";
      const icon = document.getElementById("feedback-icon");
      const title = document.getElementById("feedback-title");
      const stars = document.getElementById("score-stars");
      const summary = document.getElementById("feedback-summary");
      const breakdownContainer = document.getElementById("breakdown-rows-container");

      if (score === 5) {
        audioSys.playSuccessFanfare();
        this.launchConfetti();
        icon.textContent = "✓";
        icon.style.background = "var(--emerald-success)";
        title.textContent = isReveal ? "Classical Nyaya Sequence Revealed" : "Flawless Epistemic Proof! 5/5 Valid Nyaya Anumana Sequence";
        title.style.color = "var(--emerald-success)";
        stars.textContent = "★★★★★";
        summary.innerHTML = isReveal 
          ? `Here is the canonical sequence codified in the <em>Nyaya Sutras</em> by Maharshi Akshapada Gautama. Study each stage and its epistemological role below!`
          : `<strong>Outstanding!</strong> You have successfully constructed the inviolable 5-member deductive-inductive syllogism (<em>Pancha-Avayava</em>). 
             The proposition (Pratijna) was introduced, grounded by the empirical sign (Hetu), certified by universal invariant law with positive exemplars (Udaharana/Vyapti), 
             subsumed to the specific locus (Upanaya), and formally established with non-fallacious certainty (Nigamana).`;
      } else {
        audioSys.playVedicBell(4);
        icon.textContent = "!";
        icon.style.background = "var(--gold-primary)";
        title.textContent = `Sequence Needs Calibration: ${score}/5 Valid Stages Positioned (Attempt #${this.attempts})`;
        title.style.color = "var(--gold-light)";
        stars.textContent = "★".repeat(score) + "☆".repeat(5 - score);
        summary.innerHTML = `
          You have placed ${score} of the 5 epistemic members correctly. The cards highlighted in <span style="color:var(--crimson-error); font-weight:700;">red</span> 
          are out of order. Nyaya demands an exact sequence: you cannot apply an invariant rule (Upanaya) before establishing the universal law (Udaharana), 
          nor can you declare deduction (Nigamana) before demonstrating the middle term (Hetu)!
        `;
      }

      // Populate detailed breakdown table
      if (breakdownContainer) {
        const scenario = LAB_SCENARIOS[this.currentScenarioKey];
        breakdownContainer.innerHTML = scenario.correctOrder.map(item => `
          <div class="breakdown-row-item">
            <span class="breakdown-step-num">#${item.stepNum}</span>
            <span class="breakdown-sanskrit">${item.sanskrit.split(":")[0]}</span>
            <span class="breakdown-role">${item.role}</span>
            <span class="breakdown-text">"${item.text}"</span>
          </div>
        `).join("");
      }

      this.feedbackPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  revealSolution() {
    const scenario = LAB_SCENARIOS[this.currentScenarioKey];
    this.cards = JSON.parse(JSON.stringify(scenario.correctOrder));
    this.evaluateAnswer(true);
    audioSys.playAIChime(2);
  }

  launchConfetti() {
    const colors = ["#f59e0b", "#fbbf24", "#22d3ee", "#6366f1", "#10b981", "#ffffff"];
    for (let i = 0; i < 45; i++) {
      const p = document.createElement("div");
      p.className = "confetti-particle";
      p.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
      p.style.setProperty("--x", `${(Math.random() - 0.5) * 600}px`);
      p.style.setProperty("--y", `${(Math.random() - 1) * 360 - 40}px`);
      p.style.setProperty("--rot", `${Math.random() * 720}deg`);
      p.style.left = "50%";
      p.style.top = "50%";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1700);
    }
  }

  toggleHint() {
    if (!this.hintBox) return;
    if (this.hintBox.style.display === "none") {
      const scenario = LAB_SCENARIOS[this.currentScenarioKey];
      let hintText = "";

      if (this.cards[0].stepNum !== 1) {
        hintText = `💡 <strong>Hint for Slot 1 (Pratijna)</strong>: In Nyaya logic, you must always open with the <em>Pratijna</em> (the proposition to be proved). Look for the statement that formulates the primary claim without saying "because" or "therefore"!`;
      } else if (this.cards[1].stepNum !== 2) {
        hintText = `💡 <strong>Hint for Slot 2 (Hetu)</strong>: Slot 1 is set! Next comes the <em>Hetu</em> (the observed sign or empirical reason). Look for the card beginning with "Because..."!`;
      } else if (this.cards[2].stepNum !== 3) {
        hintText = `💡 <strong>Hint for Slot 3 (Udaharana)</strong>: Next is the universal invariant rule (<em>Vyapti</em>) with a verified example (e.g. "Wherever there is smoke, there is fire... like in a kitchen")!`;
      } else if (this.cards[3].stepNum !== 4) {
        hintText = `💡 <strong>Hint for Slot 4 (Upanaya)</strong>: Step 4 is <em>Upanaya</em> (subsumption: affirming that this specific case possesses that exact pervaded mark)!`;
      } else {
        hintText = `💡 <strong>Hint for Slot 5 (Nigamana)</strong>: Finally, Step 5 is <em>Nigamana</em> (the formal Q.E.D. deduction: "Therefore...")!`;
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
// 6. SECTION 4: NYAYA & VAISHESHIKA KNOWLEDGE EXPLORER (PRAMANAX)
// =============================================================================
function initExplorerTabs() {
  const tabBtns = document.querySelectorAll(".explorer-tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
      audioSys.playAIChime(2);
    });
  });

  // Fallacy Detective Interactive Tool
  const detectiveBtns = document.querySelectorAll(".detective-btn");
  const diagnosisBox = document.getElementById("detective-diagnosis");

  const fallacyScenarios = {
    hallucination: {
      badge: "DIAGNOSIS: बाधित (Badhita - Refuted by Stronger Pramana)",
      text: "The model's inferential conclusion (safe to proceed) is directly overturned by direct sensory perception (Pratyaksha / Radar obstacle detection). In Nyaya, perception is the most fundamental Pramana and overrules inferential guessing!"
    },
    bias: {
      badge: "DIAGNOSIS: सव्यभिचार (Savyabhichara - Irregular / Confounding Reason)",
      text: "Low hospital bills do NOT invariably co-occur with good health (it could signify lack of insurance, rural isolation, or poverty). The Hetu is irregular and commits the fallacy of spurious correlation / ML model bias!"
    },
    poison: {
      badge: "DIAGNOSIS: विरुद्ध (Viruddha - Contradictory Reason / Inverted Gradient)",
      text: "The adversarial patch causes the feature extractor to prove the exact contradiction of reality: interpreting a full stop as a high-speed command. The reason directly disproves the intended proposition!"
    },
    asiddha: {
      badge: "DIAGNOSIS: असिद्ध (Asiddha - Unproved / Non-Existent Ground)",
      text: "The Hetu itself does not exist in reality: 'Atlantis Island' is an imaginary locus (Ashraya-Asiddha) caused by corrupted telemetry. An inference engine cannot derive valid conclusions from fictitious or out-of-distribution inputs!"
    },
    satpratipaksha: {
      badge: "DIAGNOSIS: सत्प्रतिपक्ष (Satpratipaksha - Counterbalanced Conflict)",
      text: "Two independent inference rules fire opposing conclusions with identical evidentiary weight ('Disclose' vs 'Redact'). Without a higher-order tiebreaker or authoritative Pramana, the system stalls in decision deadlock!"
    }
  };

  detectiveBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      detectiveBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const scen = btn.getAttribute("data-scenario");
      const data = fallacyScenarios[scen];
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

// =============================================================================
// 7. INTERACTIVE KNOWLEDGE GRAPH VISUALIZER (CANVAS PHYSICS SIMULATOR)
// =============================================================================
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
    this.width = this.canvas.parentElement.clientWidth || 900;
    this.height = 420;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

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

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(this.canvas);
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 24; i++) {
      const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      this.particles.push({
        edge: edge,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        size: 2.2 + Math.random() * 1.8,
        color: Math.random() > 0.5 ? "#22d3ee" : "#f59e0b"
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
      this.pulseRadius += 1.5;
      this.pulseAlpha -= 0.025;
      if (this.pulseAlpha <= 0) {
        this.pulsingNode = null;
      }
    }
  }

  bindPadarthaCards() {
    const cards = document.querySelectorAll(".padartha-card");
    cards.forEach(card => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-padartha");
        const node = this.nodes.find(n => n.id === id);
        if (node) {
          this.pulseNode(node);
          this.selectNodeTriple(node);
          this.canvas.scrollIntoView({ behavior: "smooth", block: "center" });
          audioSys.playAIChime(2);
        }
      });
    });
  }

  pulseNode(node) {
    this.pulsingNode = node;
    this.pulseRadius = node.radius + 2;
    this.pulseAlpha = 1.0;
  }

  initNodes() {
    const cx = this.width / 2;
    const cy = this.height / 2;

    this.nodes = [
      {
        id: "dravya",
        label: "द्रव्य (Dravya)",
        aiLabel: "Entity: Mountain",
        type: "Substance",
        color: "#f59e0b",
        radius: 28,
        x: cx - 180,
        y: cy - 40,
        vx: 0,
        vy: 0,
        desc: "Dravya / Entity: The metaphysical substrate (Mountain / Compute Node)"
      },
      {
        id: "guna",
        label: "गुण (Guna)",
        aiLabel: "Property: Hot / Temp",
        type: "Quality",
        color: "#22d3ee",
        radius: 24,
        x: cx + 180,
        y: cy - 80,
        vx: 0,
        vy: 0,
        desc: "Guna / Property: Intrinsic quality inhering in substance (Fire / Temperature)"
      },
      {
        id: "hetu",
        label: "हेतु (Hetu / Linga)",
        aiLabel: "Feature: Smoke",
        type: "Logical Mark",
        color: "#fbbf24",
        radius: 26,
        x: cx,
        y: cy - 110,
        vx: 0,
        vy: 0,
        desc: "Hetu / Feature Trigger: The middle term connecting entity to unobserved quality"
      },
      {
        id: "karma",
        label: "कर्म (Karma)",
        aiLabel: "Action: Combustion",
        type: "Motion / Event",
        color: "#ef4444",
        radius: 22,
        x: cx + 130,
        y: cy + 100,
        vx: 0,
        vy: 0,
        desc: "Karma / Event: Dynamic state transition causing physical change"
      },
      {
        id: "samanya",
        label: "सामान्य (Samanya)",
        aiLabel: "Class: VolcanoClass",
        type: "Ontology Class",
        color: "#6366f1",
        radius: 25,
        x: cx - 120,
        y: cy + 110,
        vx: 0,
        vy: 0,
        desc: "Samanya / Class Schema: The universal type shared across all instances"
      },
      {
        id: "vishesha",
        label: "विशेष (Vishesha)",
        aiLabel: "UUID: Parvata-01",
        type: "Unique Key",
        color: "#10b981",
        radius: 20,
        x: cx - 290,
        y: cy + 30,
        vx: 0,
        vy: 0,
        desc: "Vishesha / Primary Key: The ultimate differentiator guaranteeing uniqueness"
      },
      {
        id: "samavaya",
        label: "समवाय (Samavaya)",
        aiLabel: "Relation: Inheres_In",
        type: "Inseparable Link",
        color: "#d97706",
        radius: 24,
        x: cx + 20,
        y: cy + 60,
        vx: 0,
        vy: 0,
        desc: "Samavaya / Inseparable Edge: Eternal ontological link between part & whole"
      },
      {
        id: "abhava",
        label: "अभाव (Abhava)",
        aiLabel: "Negation: NOT_EXISTS",
        type: "Non-Existence",
        color: "#64748b",
        radius: 22,
        x: cx + 260,
        y: cy + 40,
        vx: 0,
        vy: 0,
        desc: "Abhava / Negation as Failure: Ontological absence of a property (e.g. absence of coolant / NOT EXISTS)"
      }
    ];

    this.edges = [
      { from: "dravya", to: "hetu", label: "possesses (पक्षधर्मता)", aiLabel: "hasSensorEvent" },
      { from: "hetu", to: "guna", label: "Vyapti (व्याप्ति-नियमः)", aiLabel: "impliesPredicate" },
      { from: "dravya", to: "samanya", label: "isA (जाति-संबन्ध)", aiLabel: "rdf:type" },
      { from: "dravya", to: "vishesha", label: "individuatedBy", aiLabel: "hasUUID" },
      { from: "guna", to: "karma", label: "generates (कार्य-कारण)", aiLabel: "triggersEvent" },
      { from: "samavaya", to: "guna", label: "inheres (समवाय-संबन्ध)", aiLabel: "owl:sameAs" },
      { from: "dravya", to: "samavaya", label: "substrateOf", aiLabel: "subsumes" },
      { from: "guna", to: "abhava", label: "negatedBy (अभाव-प्रतियोगी)", aiLabel: "notExists" }
    ];
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      if (!this.canvas) return;
      this.dpr = window.devicePixelRatio || 1;
      this.width = this.canvas.parentElement.clientWidth || 900;
      this.height = 420;
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
    });

    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("mouseup", () => this.onMouseUp());

    // Touch events for mobile
    this.canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.onMouseDown({ clientX: touch.clientX, clientY: touch.clientY, rect });
    });

    this.canvas.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY, rect });
    });

    this.canvas.addEventListener("touchend", () => this.onMouseUp());

    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => {
        this.initNodes();
        audioSys.playAIChime(1);
      });
    }

    if (this.toggleThemeBtn) {
      this.toggleThemeBtn.addEventListener("click", () => {
        this.isAIMode = !this.isAIMode;
        this.toggleThemeBtn.textContent = this.isAIMode ? "Mode: Symbolic AI Graph" : "Mode: Sanskrit Vaisheshika";
        audioSys.playAIChime(2);
      });
    }
  }

  getMousePos(e) {
    const rect = e.rect || this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  findNodeAt(pos) {
    return this.nodes.find(n => {
      const dx = n.x - pos.x;
      const dy = n.y - pos.y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    });
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
    } else {
      const node = this.findNodeAt(pos);
      this.hoveredNode = node;
      if (node && this.tooltip) {
        this.tooltip.style.display = "block";
        this.tooltip.style.left = `${pos.x + 15}px`;
        this.tooltip.style.top = `${pos.y - 35}px`;
        this.tooltip.innerHTML = `<strong>${this.isAIMode ? node.aiLabel : node.label}</strong><br><span style="color:#94a3b8;">${node.desc}</span>`;
      } else if (this.tooltip) {
        this.tooltip.style.display = "none";
      }
    }
  }

  onMouseUp() {
    this.draggedNode = null;
  }

  selectNodeTriple(node) {
    if (!this.activeSubEl || !this.activeObjEl || !this.tripleCodeEl) return;

    if (node.id === "dravya") {
      this.activeSubEl.textContent = "(Mountain: Dravya / Entity)";
      this.activeObjEl.textContent = "(Fire: Guna / Property)";
      this.tripleCodeEl.textContent = "SPARQL: :Mountain :inheres_in :FireProperty . FILTER(?state = :Active)";
    } else if (node.id === "hetu") {
      this.activeSubEl.textContent = "(Smoke: Hetu / Feature)";
      this.activeObjEl.textContent = "(Fire: Sadhya / Implication)";
      this.tripleCodeEl.textContent = 'Cypher: MATCH (f:Feature {name:"smoke"})-[:VYAPTI]->(p:Predicate {name:"fire"}) RETURN p';
    } else if (node.id === "karma") {
      this.activeSubEl.textContent = "(Server: Dravya / Substance)";
      this.activeObjEl.textContent = "(Overheat: Karma / Event)";
      this.tripleCodeEl.textContent = 'JSON-LD: { "@type": "KarmaEvent", "agent": "srv-07", "action": "ThrottleCPU" }';
    } else if (node.id === "samanya") {
      this.activeSubEl.textContent = "(Server_01: Vishesha / Instance)";
      this.activeObjEl.textContent = "(ComputeNode: Samanya / Class)";
      this.tripleCodeEl.textContent = "RDF: :srv_01 rdf:type :ComputeClusterNode ; rdfs:subClassOf :Hardware .";
    } else if (node.id === "abhava") {
      this.activeSubEl.textContent = "(Server: Dravya / Substance)";
      this.activeObjEl.textContent = "(CoolantFlow: Abhava / Absence)";
      this.tripleCodeEl.textContent = 'SPARQL: FILTER NOT EXISTS { ?server :hasCoolantFlow true }';
    } else if (node.id === "vishesha") {
      this.activeSubEl.textContent = "(Server_01: Dravya / Entity)";
      this.activeObjEl.textContent = "(UUID-9842: Vishesha / Key)";
      this.tripleCodeEl.textContent = 'OWL: :Server_01 owl:sameAs <urn:uuid:7c9e6679-7425-40de> .';
    } else if (node.id === "samavaya") {
      this.activeSubEl.textContent = "(Mountain: Substance)";
      this.activeObjEl.textContent = "(Heat: Quality / Samavaya)";
      this.tripleCodeEl.textContent = 'GraphEdge: (Parvata)-[:INHERES_IN {type: "Samavaya", eternal: true}]->(Tejas)';
    } else {
      this.activeSubEl.textContent = `(${node.label})`;
      this.activeObjEl.textContent = `(${node.type})`;
      this.tripleCodeEl.textContent = `GraphTriple: <${node.id}> :hasPadarthaType <${node.type}> ; :confidence 1.0 .`;
    }
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
    // Gentle spring & repulsive forces between nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
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
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Edges with subtle glow
    this.edges.forEach(edge => {
      const n1 = this.nodes.find(n => n.id === edge.from);
      const n2 = this.nodes.find(n => n.id === edge.to);
      if (!n1 || !n2) return;

      this.ctx.beginPath();
      this.ctx.moveTo(n1.x, n1.y);
      this.ctx.lineTo(n2.x, n2.y);
      this.ctx.strokeStyle = "rgba(34, 211, 238, 0.22)";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Edge Label
      const midX = (n1.x + n2.x) / 2;
      const midY = (n1.y + n2.y) / 2;
      this.ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
      this.ctx.font = "10px Inter, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.isAIMode ? edge.aiLabel : edge.label, midX, midY - 6);
    });

    // 2. Draw Information Flow Particles along Edges
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
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = p.color;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      });
    }

    // 3. Draw Pulsing Ring for Selected Padartha Node
    if (this.pulsingNode && this.pulseAlpha > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pulsingNode.x, this.pulsingNode.y, this.pulseRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(245, 158, 11, ${this.pulseAlpha})`;
      this.ctx.lineWidth = 3;
      this.ctx.shadowBlur = 14;
      this.ctx.shadowColor = "#f59e0b";
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }

    // 4. Draw Nodes
    this.nodes.forEach(node => {
      const isHovered = (node === this.hoveredNode);
      const isDragged = (node === this.draggedNode);
      const isPulsing = (node === this.pulsingNode);

      // Outer Glow
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius + (isHovered || isPulsing ? 8 : 4), 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered || isPulsing ? "rgba(245, 158, 11, 0.4)" : "rgba(34, 211, 238, 0.12)";
      this.ctx.fill();

      // Node Body
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isDragged ? "#fbbf24" : node.color;
      this.ctx.fill();
      this.ctx.strokeStyle = isPulsing ? "#f59e0b" : "#ffffff";
      this.ctx.lineWidth = isHovered || isPulsing ? 2.5 : 1.5;
      this.ctx.stroke();

      // Node Label
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = `bold 11px Inter, Noto Sans Devanagari, sans-serif`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";

      const displayText = this.isAIMode ? node.aiLabel.split(":")[0] : node.label.split(" ")[0];
      this.ctx.fillText(displayText, node.x, node.y);

      // Secondary subtitle below node
      this.ctx.fillStyle = "#94a3b8";
      this.ctx.font = "9px Inter, sans-serif";
      this.ctx.fillText(node.type, node.x, node.y + node.radius + 14);
    });

    this.ctx.restore();
  }
}

// =============================================================================
// 8. SANSKRIT LOGIC LEXICON (GLOSSARY MODAL & SEARCH)
// =============================================================================
const GLOSSARY_TERMS = [
  {
    sanskrit: "प्रमाण (Pramana)",
    translit: "Pramāṇa",
    def: "Valid means of acquiring true knowledge. Nyaya recognizes 4: Pratyaksha (perception), Anumana (inference), Upamana (analogy), and Shabda (testimony).",
    ai: "AI Analogy: Perceptual sensors, inference engines, vector similarity models, and verified knowledge bases."
  },
  {
    sanskrit: "प्रतिज्ञा (Pratijna)",
    translit: "Pratijñā",
    def: "The initial proposition or thesis that needs to be logically established (first member of the 5-member Anumana).",
    ai: "AI Analogy: Target Goal state, hypothesis query, or classification objective to evaluate."
  },
  {
    sanskrit: "हेतु (Hetu / Linga)",
    translit: "Hetu / Liṅga",
    def: "The observable sign or middle term that serves as rational ground for inference. Must satisfy 5 conditions (Pancha-Rupa Hetu).",
    ai: "AI Analogy: Discriminative feature trigger, input sensor telemetry, or antecedent clause."
  },
  {
    sanskrit: "उदाहरण (Udaharana)",
    translit: "Udāharaṇa",
    def: "The universal rule (Vyapti) illustrated with an indisputable empirical exemplar (Drishtanta). Inductive-deductive bridge.",
    ai: "AI Analogy: Production Rule, definite Horn clause, or training set ground truth."
  },
  {
    sanskrit: "उपनय (Upanaya)",
    translit: "Upanaya",
    def: "The application or subsumption of the universal rule to the specific subject/locus under current examination.",
    ai: "AI Analogy: Variable unification in Rete algorithm; binding parameters to active facts."
  },
  {
    sanskrit: "निगमन (Nigamana)",
    translit: "Nigamana",
    def: "The final formal deduction restating the proposition with certified epistemic certainty.",
    ai: "AI Analogy: Inference engine assertion committed to working memory; autonomous action dispatch."
  },
  {
    sanskrit: "व्याप्ति (Vyapti)",
    translit: "Vyāpti",
    def: "Invariant, unconditional concomitance between Hetu and Sadhya ('Where there is smoke, there is fire'). Free of unstated conditions (Upadhi).",
    ai: "AI Analogy: Deterministic IF-THEN implication in expert systems: ∀x (P(x) → Q(x))."
  },
  {
    sanskrit: "पक्ष (Paksha)",
    translit: "Pakṣa",
    def: "The subject or locus in which the unobserved target quality is suspected and needs to be proved (e.g., the mountain, the server).",
    ai: "AI Analogy: Entity instance, node ID, or data subject."
  },
  {
    sanskrit: "साध्य (Sadhya)",
    translit: "Sādhya",
    def: "The major term or property that is sought to be proved on the subject (e.g., fire, overheating).",
    ai: "AI Analogy: Target class label, Boolean state, or predicted attribute value."
  },
  {
    sanskrit: "हेत्वाभास (Hetvabhasa)",
    translit: "Hetvābhāsa",
    def: "Defective, fallacious pseudo-reasons that simulate valid inference but result in false conclusions (5 classical types).",
    ai: "AI Analogy: Model hallucinations, spurious correlations, data poisoning, and distribution shift."
  },
  {
    sanskrit: "द्रव्य (Dravya)",
    translit: "Dravya",
    def: "Substance / entity: The foundational substrate in Vaisheshika ontology in which qualities and actions inhere.",
    ai: "AI Analogy: Knowledge Graph Entity / Node."
  },
  {
    sanskrit: "गुण (Guna)",
    translit: "Guṇa",
    def: "Quality / attribute: Inherent static properties residing in substances (color, temperature, magnitude, number).",
    ai: "AI Analogy: Graph Node properties, literal key-value attributes."
  },
  {
    sanskrit: "कर्म (Karma)",
    translit: "Karma",
    def: "Action / motion: Dynamic events and operations causing conjunction and disjunction.",
    ai: "AI Analogy: State transition event, dynamic edge, or API method call."
  },
  {
    sanskrit: "समवाय (Samavaya)",
    translit: "Samavāya",
    def: "Inseparable inherence: The eternal, structural relationship between substance and quality, part and whole.",
    ai: "AI Analogy: Invariant structural edge in ontologies (`owl:sameAs`, `hasPart`)."
  },
  {
    sanskrit: "अभाव (Abhava)",
    translit: "Abhāva",
    def: "Non-existence or negation: The ontological reality of absence (prior, posterior, mutual, and absolute).",
    ai: "AI Analogy: Negation as Failure (NAF) in Prolog; `NOT EXISTS` filters in SPARQL/SQL."
  }
];

function initGlossaryModal() {
  const modal = document.getElementById("glossary-modal");
  const openBtn = document.getElementById("glossary-modal-btn");
  const closeBtn = document.getElementById("close-glossary-btn");
  const searchInput = document.getElementById("glossary-search-input");
  const listContainer = document.getElementById("glossary-list");

  if (!modal || !listContainer) return;

  const renderList = (filter = "") => {
    const q = filter.toLowerCase().trim();
    const filtered = GLOSSARY_TERMS.filter(item => 
      item.sanskrit.toLowerCase().includes(q) ||
      item.translit.toLowerCase().includes(q) ||
      item.def.toLowerCase().includes(q) ||
      item.ai.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      listContainer.innerHTML = '<div style="padding:1.5rem; text-align:center; color:#64748b;">No matching Sanskrit logic terms found.</div>';
      return;
    }

    listContainer.innerHTML = filtered.map(item => `
      <div class="glossary-item">
        <div class="glossary-item-top">
          <span class="glossary-sanskrit-term">${item.sanskrit}</span>
          <span class="glossary-translit">[${item.translit}]</span>
        </div>
        <p class="glossary-definition">${item.def}</p>
        <div class="glossary-ai-analogy">${item.ai}</div>
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

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderList(e.target.value);
    });
  }
}

// =============================================================================
// 9. NAVIGATION SCROLL-SPY, SOUND TOGGLE & MOBILE DRAWER
// =============================================================================
function initNavigation() {
  const soundBtn = document.getElementById("sound-toggle-btn");
  const soundIcon = document.getElementById("sound-icon");
  const navItems = document.querySelectorAll(".nav-item");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Audio Toggle
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const isSoundOn = audioSys.toggleSound();
      if (soundIcon) soundIcon.textContent = isSoundOn ? "🔔" : "🔕";
      soundBtn.querySelector(".sound-label").textContent = isSoundOn ? "Audio: ON" : "Audio: MUTED";
      if (isSoundOn) audioSys.playAIChime(1);
    });
  }

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navMenu.classList.remove("mobile-open");
      });
    });
  }

  // ScrollSpy with IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(item => {
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: "-20% 0px -65% 0px",
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
}

// =============================================================================
// 10. DOM READY INITIALIZATION
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("॥ हेतु-लॉजिक (PRAMANAX) प्रारब्धम् ॥ HetuLogic Initialized.");

  initNavigation();
  const simulator = new InferenceSimulator();
  initMappingCards();
  const logicLab = new LogicLabGame();
  initExplorerTabs();
  const graphViz = new VaisheshikaGraphVisualizer();
  initGlossaryModal();
});
