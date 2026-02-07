// ========================================
// i18n - Internationalization System
// ========================================

const i18n = {
    currentLang: 'fr',
    translations: {},

    languages: {
        fr: { name: 'Français', flag: 'FR' },
        en: { name: 'English', flag: 'EN' }
    },

    async init() {
        console.log('i18n: Initializing...');

        // Get saved language or default to French
        this.currentLang = localStorage.getItem('webrush-lang') || 'fr';
        console.log('i18n: Current language:', this.currentLang);

        // Load translations
        await this.loadTranslations(this.currentLang);

        // Apply translations
        this.applyTranslations();

        // Update selector UI
        this.updateSelector();

        // Setup dropdown event listeners
        this.setupDropdown();

        console.log('i18n: Initialization complete');
    },

    async loadTranslations(lang) {
        console.log('i18n: Loading translations for:', lang);
        try {
            const response = await fetch(`/lang/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
            console.log('i18n: Translations loaded successfully');
        } catch (error) {
            console.error('i18n: Error loading translations:', error);
        }
    },

    async switchLanguage(lang) {
        console.log('i18n: Switching to language:', lang);

        if (lang === this.currentLang) {
            console.log('i18n: Already using this language');
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('webrush-lang', lang);
        await this.loadTranslations(lang);
        this.applyTranslations();
        this.updateSelector();
        this.closeDropdown();

        console.log('i18n: Language switch complete');
    },

    applyTranslations() {
        console.log('i18n: Applying translations...');

        // Translate elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        console.log('i18n: Found', elements.length, 'elements to translate');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedValue(this.translations, key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getNestedValue(this.translations, key);
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Translate validation messages
        document.querySelectorAll('[data-i18n-error]').forEach(element => {
            const key = element.getAttribute('data-i18n-error');
            const translation = this.getNestedValue(this.translations, key);
            if (translation) {
                element.oninvalid = function () {
                    this.setCustomValidity(translation);
                };
                element.oninput = function () {
                    this.setCustomValidity('');
                };
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
        console.log('i18n: Translations applied');
    },

    updateSelector() {
        const currentLangData = this.languages[this.currentLang];

        // Update current language display
        const flagEl = document.querySelector('.lang-current .lang-flag');
        const codeEl = document.querySelector('.lang-current .lang-code');

        if (flagEl) flagEl.textContent = currentLangData.flag;
        if (codeEl) codeEl.textContent = this.currentLang.toUpperCase();

        // Update active state in dropdown
        document.querySelectorAll('.lang-option').forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.classList.toggle('active', lang === this.currentLang);
        });
    },

    setupDropdown() {
        const selector = document.querySelector('.lang-selector');
        const current = document.querySelector('.lang-current');

        if (!selector || !current) {
            console.log('i18n: Language selector not found on this page');
            return;
        }

        console.log('i18n: Setting up dropdown event listeners');

        // Toggle dropdown on click
        current.addEventListener('click', (e) => {
            e.stopPropagation();
            selector.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // Handle language option clicks
        const self = this; // Store reference to this
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function (e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                console.log('i18n: Option clicked, language:', lang);
                self.switchLanguage(lang);
            });
        });

        console.log('i18n: Dropdown setup complete');
    },

    closeDropdown() {
        const selector = document.querySelector('.lang-selector');
        if (selector) selector.classList.remove('open');
    },

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) =>
            current && current[key] !== undefined ? current[key] : null, obj);
    }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('i18n: DOM loaded, starting init');
    i18n.init();
});
