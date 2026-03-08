const timelineData = [
    { id: 'A', text: "Ce jour, au McDo ✨" },
    { id: 'B', text: "La petite maisonette ❤️" },
    { id: 'C', text: "Photobooth 💐" },
    { id: 'D', text: "Première sortie avec Arusan🌙" },
    { id: 'E', text: "Ce bon vieu clair de lune.. ✈️" },
    { id: 'F', text: "Shopping 😂" },
    { id: 'G', text: "Oh ce musée !! 😍" },
    { id: 'H', text: "Tout premier pic-nic 📸" },
    { id: 'I', text: "Il était pas mal ce restau non ? 🤝" },
    { id: 'J', text: "Faut sourire rohh ❤️" },
    { id: 'K', text: "Ton amour me rechauffe plus que ce feu ✨" },
    { id: 'L', text: "Nous hihi 💍" }
];

function initTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = '';
    
    const shuffled = [...timelineData].sort(() => Math.random() - 0.5);

    shuffled.forEach(item => {
        const div = document.createElement('div');
        div.className = "timeline-item bg-white/10 p-3 rounded-2xl border border-white/20 flex items-center gap-4 mb-3 shadow-lg transition-all duration-500";
        div.dataset.id = item.id;
        
        div.innerHTML = `
            <div class="w-12 h-12 flex-shrink-0">
                <input type="number" 
                       min="1" max="12" 
                       placeholder="#" 
                       onchange="reorderTimeline()" 
                       class="timeline-input w-full h-full bg-white text-black font-black text-center rounded-xl border-none outline-none focus:ring-4 focus:ring-pink-500 text-lg">
            </div>
            <div class="w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/30">
                <img src="img/${item.id}.jpg" class="w-full h-full object-cover pointer-events-none">
            </div>
            <div class="flex-grow">
                <p class="text-white font-bold text-[11px] uppercase tracking-tighter leading-tight">${item.text}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function reorderTimeline() {
    const container = document.getElementById('timeline-container');
    const items = [...container.querySelectorAll('.timeline-item')];
    
    items.sort((a, b) => {
        const valA = parseInt(a.querySelector('input').value) || 999;
        const valB = parseInt(b.querySelector('input').value) || 999;
        return valA - valB;
    });

    items.forEach(item => container.appendChild(item));
}

function checkTimeline() {
    const container = document.getElementById('timeline-container');
    const items = [...container.querySelectorAll('.timeline-item')];
    const winningOrder = "ABCDEFGHIJKL";
    let currentOrder = "";

    items.forEach((item, index) => {
        const itemId = item.dataset.id;
        currentOrder += itemId;
        const input = item.querySelector('input');

        item.classList.remove('bg-green-500/40', 'bg-red-500/40', 'border-green-400', 'border-red-400');

        if (itemId === winningOrder[index]) {
            item.classList.add('bg-green-500/40', 'border-green-400');
        } else {
            item.classList.add('bg-red-500/40', 'border-red-400');
        }
    });

    if (currentOrder === winningOrder) {
        setTimeout(showTimelineVictory, 600);
    } else {
        const statusEl = document.getElementById('timeline-status');
        statusEl.innerText = "Regarde les cases rouges, elles ne sont pas à la bonne place ! ❤️";
        statusEl.className = "mb-6 p-4 rounded-2xl font-bold uppercase text-xs shadow-2xl bg-red-600/80 text-white border border-white/20 animate-bounce block text-center";
        statusEl.classList.remove('hidden');
        setTimeout(() => statusEl.classList.add('hidden'), 3500);
    }
}

function showTimelineVictory() {
    const container = document.getElementById('timeline-container').parentElement;
    container.innerHTML = `
        <div class="text-center py-10">
            <span class="text-7xl mb-6 block animate-bounce">🏆</span>
            <h2 class="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Bravo mon amour !</h2>
            <p class="text-white opacity-90 mb-10 italic px-6 leading-relaxed">Tu connais notre histoire sur le bout des doigts ❤️</p>
            <button onclick="goBack()" class="w-full bg-white text-black font-extrabold py-5 rounded-2xl shadow-xl uppercase tracking-widest">Retour au menu</button>
        </div>
    `;
}