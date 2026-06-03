const translations = {
    en: {
        title: "Boring Social Media",
        pauseBtn: "5-Min Pause (Emergency)",
        paused: "Paused (5 Mins)",
        credit: "Developed by"
    },
    fa: {
        title: "شبکه‌های اجتماعی خسته‌کننده",
        pauseBtn: "توقف ۵ دقیقه‌ای (اضطراری)",
        paused: "متوقف شد (۵ دقیقه)",
        credit: "توسعه‌یافته توسط"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');
    const pauseBtn = document.getElementById('pauseBtn');
    const titleEl = document.getElementById('title');
    const creditEl = document.getElementById('credit');

    chrome.storage.local.get(['lang', 'isPaused'], (result) => {
        const currentLang = result.lang || 'en';
        langSelect.value = currentLang;
        updateUI(currentLang);

        if (result.isPaused) {
            pauseBtn.disabled = true;
            pauseBtn.style.background = "#cccccc";
            pauseBtn.innerText = translations[currentLang].paused;
        }
    });

    langSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        chrome.storage.local.set({ lang: selectedLang }, () => {
            updateUI(selectedLang);
        });
    });

    pauseBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "pause" }, () => {
            chrome.storage.local.get(['lang'], (result) => {
                const currentLang = result.lang || 'en';
                pauseBtn.disabled = true;
                pauseBtn.style.background = "#cccccc";
                pauseBtn.innerText = translations[currentLang].paused;
            });
        });
    });

    function updateUI(lang) {
        titleEl.innerText = translations[lang].title;
        creditEl.innerText = translations[lang].credit;

        chrome.storage.local.get(['isPaused'], (result) => {
            if (!result.isPaused) {
                pauseBtn.innerText = translations[lang].pauseBtn;
            } else {
                pauseBtn.innerText = translations[lang].paused;
            }
        });

        if (lang === 'fa') {
            document.body.style.direction = 'rtl';
            document.body.style.fontFamily = 'Tahoma, Arial, sans-serif';
        } else {
            document.body.style.direction = 'ltr';
            document.body.style.fontFamily = 'Arial, sans-serif';
        }
    }
});