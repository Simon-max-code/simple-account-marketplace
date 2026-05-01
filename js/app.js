// Toast Notification System
function showToast(message, type = 'primary') {
    const container = document.getElementById('toast-container');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'toast-container';
        document.body.appendChild(div);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    document.getElementById('toast-container').appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Typewriter Effect
class TypeWriter {
    constructor(el, words, wait = 3000) {
        this.el = el;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter
    const typeElement = document.querySelector('.typewriter-text');
    if (typeElement) {
        const words = JSON.parse(typeElement.getAttribute('data-words'));
        new TypeWriter(typeElement, words);
    }

    // 2. Populate Grid (if on index.html)
    const grid = document.getElementById('accounts-grid');
    if (grid) {
        accounts.forEach((account, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.onclick = () => window.location.href = `account.html?id=${account.id}`;
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${account.image}" alt="${account.title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=300&fit=crop'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${account.title}</h3>
                    <p class="card-price">$${account.price}</p>
                    <button class="btn">Details</button>
                </div>
            `;
            grid.appendChild(card);
        });
        showToast('Welcome to AccountMarket! Browse our latest deals.');
    }
});
