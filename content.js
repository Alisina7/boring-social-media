const facts = {
  en: [
    "Did you know? Endless scrolling triggers the exact same neurochemical process in the brain as a slot machine.",
    "Fact: The average person spends over 2 hours a day on social media. That's 5 years of a lifetime.",
    "Science says: Reducing social media usage to 30 minutes a day significantly lowers clinical depression and loneliness."
  ],
  fa: [
    "آیا می‌دانستید؟ اسکرول کردن بی‌نهایت، دقیقاً همان فرآیند عصبی‌شیمیایی را در مغز فعال می‌کند که ماشین‌های قمار فعال می‌کنند.",
    "حقیقت: یک فرد عادی روزانه بیش از ۲ ساعت را در شبکه‌های اجتماعی می‌گذراند. این یعنی ۵ سال از کل عمر!",
    "علم می‌گوید: کاهش استفاده از شبکه‌های اجتماعی به ۳۰ دقیقه در روز، افسردگی بالینی و احساس تنهایی را به شدت کاهش می‌دهد."
  ]
};

chrome.storage.local.get(['isPaused', 'lang'
], function (result) {
  if (!result.isPaused) {
    document.documentElement.classList.add('boring-grayscale');
    showFact(result.lang || 'en');
  }
});

function showFact(lang) {
  const langFacts = facts[lang
  ];
  const randomFact = langFacts[Math.floor(Math.random() * langFacts.length)
  ];

  const toast = document.createElement('div');
  toast.innerText = randomFact;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 999999;
    background: #222; color: #fff; padding: 15px; border-radius: 8px;
    font-family: sans-serif; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 6px rgba(0,
    0,
    0,
    0.3); direction: ${lang === 'fa' ? 'rtl' : 'ltr'
    };
    transition: opacity 0.5s ease-in-out;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(),
      500);
  },
    10000);
}