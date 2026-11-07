/* === VIEW NAVIGATION LOGIC === */
function switchTab(tab) {
    const simBtn = document.getElementById('btn-simulator');
    const quizBtn = document.getElementById('btn-quiz');
    const simView = document.getElementById('view-simulator');
    const quizView = document.getElementById('view-quiz');

    if (tab === 'simulator') {
        simBtn.className = "px-3 py-1.5 bg-amber-600 rounded text-white transition";
        quizBtn.className = "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded transition";
        simView.classList.remove('hidden');
        quizView.classList.add('hidden');
    } else {
        quizBtn.className = "px-3 py-1.5 bg-amber-600 rounded text-white transition";
        simBtn.className = "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded transition";
        quizView.classList.remove('hidden');
        simView.classList.add('hidden');
        initQuiz();
    }
}

/* === MODULE 1: SIMULATOR MAPPING ENGINE === */
const mappingData = {
    step1: {
        title: "1. Pratijna (The Proposition)",
        ancientContext: "The initial hypothesis or statement to be proven.",
        aiEquivalent: "Target Output / Hypothesis Framing",
        aiTechnical: "Corresponds to defining the label space or objective function before data processing."
    },
    step2: {
        title: "2. Hetu (The Reason / Observable Sign)",
        ancientContext: "The empirical evidence observed in the present moment.",
        aiEquivalent: "Feature Extraction / Data Ingestion",
        aiTechnical: "Mirrors ingestion of telemetry or sensor inputs converted into actionable feature vectors."
    },
    step3: {
        title: "3. Udaharana (The Universal Rule / Vyapti)",
        ancientContext: "An undisputed universal proposition demonstrating invariable relation.",
        aiEquivalent: "Knowledge Base / Training Weights",
        aiTechnical: "Represents model parameters or rule-bases established during training mapping inputs to outcomes."
    },
    step4: {
        title: "4. Upanaya (Application of the Rule)",
        ancientContext: "Applying the universal rule to the specific case under observation.",
        aiEquivalent: "Pattern Matching & Inference Execution",
        aiTechnical: "Computational phase evaluating input vectors against established weights to determine alignment."
    },
    step5: {
        title: "5. Nigamana (The Conclusion)",
        ancientContext: "The final confirmed truth derived from the successful application of the rule.",
        aiEquivalent: "Final Prediction / Automated Action",
        aiTechnical: "Output layer generation—final classification or automated trigger executed by the system."
    }
};

function runEngine() {
    const prop = document.getElementById('propInput').value;
    const reason = document.getElementById('reasonInput').value;
    
    const container = document.getElementById('stepsContainer');
    const placeholder = document.getElementById('contextPlaceholder');
    const activeDisplay = document.getElementById('activeContextDisplay');

    placeholder.classList.add('hidden');
    activeDisplay.classList.remove('hidden');

    const steps = [
        { id: 'step1', text: prop, highlight: 'border-amber-500/50 bg-amber-500/5 text-amber-300' },
        { id: 'step2', text: reason, highlight: 'border-blue-500/50 bg-blue-500/5 text-blue-300' },
        { id: 'step3', text: "Universal Rule (Vyapti): Operational failure is invariably preceded by resource exhaustion.", highlight: 'border-emerald-500/50 bg-emerald-500/5 text-emerald-300' },
        { id: 'step4', text: "Application (Upanaya): Connecting observed resource exhaustion to the universal rule of failure.", highlight: 'border-purple-500/50 bg-purple-500/5 text-purple-300' },
        { id: 'step5', text: "Conclusion (Nigamana): Confirmed valid inference. Production halt actively occurring.", highlight: 'border-red-500/60 bg-red-500/10 text-red-300 font-bold' }
    ];

    container.innerHTML = '<h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 font-mono">Execution Pipeline:</h3>';
    activeDisplay.innerHTML = '<h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 font-mono">Real-Time Paradigm Sync:</h3>';

    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepCard = document.createElement('div');
            stepCard.className = `step-card p-4 rounded-xl border ${step.highlight} space-y-1 animate-fadeIn`;
            stepCard.innerHTML = `
                <div class="flex justify-between text-xs font-semibold opacity-80">
                    <span>Step ${index + 1}</span>
                    <span>✓ Executed</span>
                </div>
                <p class="text-sm font-medium">${step.text}</p>
            `;
            container.appendChild(stepCard);

            const data = mappingData[step.id];
            const contextCard = document.createElement('div');
            contextCard.className = 'bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2 animate-fadeIn';
            contextCard.innerHTML = `
                <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 class="text-sm font-bold text-amber-400">${data.title}</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">${data.aiEquivalent}</span>
                </div>
                <p class="text-xs text-slate-300"><strong class="text-slate-400">IKS Context:</strong> ${data.ancientContext}</p>
                <p class="text-xs text-slate-400 pt-1 border-t border-slate-800/60"><strong class="text-cyan-400">Modern AI Mapping:</strong> ${data.aiTechnical}</p>
            `;
            activeDisplay.appendChild(contextCard);
            
            document.querySelectorAll('.overflow-y-auto').forEach(el => el.scrollTop = 99999);
        }, index * 800);
    });
}

/* === MODULE 2: QUIZ DRAG & DROP LOGIC === */
const masterCards = [
    { id: 1, stage: "Pratijna (Proposition)", text: "The mountain has fire.", tag: "Claim" },
    { id: 2, stage: "Hetu (Reason)", text: "Because there is smoke.", tag: "Observation" },
    { id: 3, stage: "Udaharana (Universal Rule)", text: "Wherever there is smoke, there is fire.", tag: "Rule Base" },
    { id: 4, stage: "Upanaya (Application)", text: "The mountain has smoke.", tag: "Pattern Match" },
    { id: 5, stage: "Nigamana (Conclusion)", text: "Therefore, the mountain has fire.", tag: "Inference" }
];

let currentCards = [];
let dragSrcIndex = null;

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initQuiz() {
    currentCards = shuffleArray(masterCards);
    renderCardOrder();
}

function renderCardOrder() {
    const container = document.getElementById('quizList');
    const resultBox = document.getElementById('resultBox');
    const scoreBadge = document.getElementById('scoreBadge');
    
    if(!container) return;

    resultBox.classList.add('hidden');
    scoreBadge.classList.add('hidden');
    container.innerHTML = '';

    currentCards.forEach((card, index) => {
        const el = document.createElement('div');
        el.className = 'card-item bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-700';
        el.draggable = true;
        el.dataset.index = index;

        el.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-slate-600 font-mono text-sm select-none cursor-grab">⋮⋮</span>
                <span class="text-sm text-slate-200 font-medium">${card.text}</span>
            </div>
            <span class="text-xs px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded">${card.tag}</span>
        `;

        el.addEventListener('dragstart', handleDragStart);
        el.addEventListener('dragover', handleDragOver);
        el.addEventListener('drop', handleDrop);
        el.addEventListener('dragend', handleDragEnd);

        container.appendChild(el);
    });
}

function handleDragStart(e) {
    dragSrcIndex = this.dataset.index;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    const targetIndex = this.dataset.index;

    if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
        const movedItem = currentCards.splice(dragSrcIndex, 1)[0];
        currentCards.splice(targetIndex, 0, movedItem);
        renderCardOrder();
    }
    return false;
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function submitQuiz() {
    let correctCount = 0;
    currentCards.forEach((card, index) => {
        if (card.id === masterCards[index].id) {
            correctCount++;
        }
    });

    const score = correctCount * 100;
    const resultBox = document.getElementById('resultBox');
    const scoreVal = document.getElementById('scoreVal');
    const scoreBadge = document.getElementById('scoreBadge');

    scoreVal.textContent = score;
    scoreBadge.classList.remove('hidden');
    resultBox.classList.remove('hidden');

    if (correctCount === 5) {
        resultBox.className = "p-4 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 space-y-1 animate-fadeIn";
        resultBox.innerHTML = `
            <div class="font-bold text-sm">🎉 Perfect! 500 / 500 Points</div>
            <p class="text-xs">You have correctly constructed the 5-step Anumana logical deduction sequence!</p>
        `;
    } else {
        resultBox.className = "p-4 rounded-xl border border-amber-500/50 bg-amber-500/10 text-amber-300 space-y-1 animate-fadeIn";
        resultBox.innerHTML = `
            <div class="font-bold text-sm">⚠️ Score: ${score} / 500 (${correctCount}/5 Correct Positions)</div>
            <p class="text-xs">Remember the Nyaya order: 1. Proposition (Pratijna) ➔ 2. Reason (Hetu) ➔ 3. Rule (Udaharana) ➔ 4. Application (Upanaya) ➔ 5. Conclusion (Nigamana).</p>
        `;
    }
}

function resetQuiz() {
    initQuiz();
}