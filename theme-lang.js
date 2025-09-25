// Theme and Language Management
class ThemeLanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.applyLanguage();
        this.setupEventListeners();
        this.createControls();
    }

    createControls() {
        // Find the navigation container
        const nav = document.querySelector('nav .flex.justify-between.items-center');
        if (!nav) return;

        // Create settings dropdown container
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'relative ml-4';
        settingsContainer.id = 'settings-dropdown';

        // Settings button (gear icon)
        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'settings-toggle';
        settingsBtn.className = 'p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';
        settingsBtn.innerHTML = '<i class="fas fa-cog text-lg"></i>';
        settingsBtn.title = 'Settings';

        // Dropdown menu
        const dropdown = document.createElement('div');
        dropdown.id = 'settings-menu';
        dropdown.className = 'absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible transform translate-y-[-10px] transition-all duration-200 ease-out z-50';

        // Dropdown content
        dropdown.innerHTML = `
            <div class="py-2">
                <!-- Theme Section -->
                <div class="px-4 py-2">
                    <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Theme</h3>
                    <div class="space-y-1">
                        <button id="theme-light" class="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentTheme === 'light' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}">
                            <i class="fas fa-sun text-yellow-500 mr-3 w-4"></i>
                            <span data-translate="lightMode">Light Mode</span>
                            ${this.currentTheme === 'light' ? '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>' : ''}
                        </button>
                        <button id="theme-dark" class="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentTheme === 'dark' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}">
                            <i class="fas fa-moon text-blue-400 mr-3 w-4"></i>
                            <span data-translate="darkMode">Dark Mode</span>
                            ${this.currentTheme === 'dark' ? '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>' : ''}
                        </button>
                    </div>
                </div>
                
                <!-- Divider -->
                <hr class="my-2 border-gray-200 dark:border-gray-600">
                
                <!-- Language Section -->
                <div class="px-4 py-2">
                    <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Language</h3>
                    <div class="space-y-1">
                        <button id="lang-en" class="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentLang === 'en' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}">
                            <span class="mr-3 w-4 text-center font-bold text-xs">EN</span>
                            <span>English</span>
                            ${this.currentLang === 'en' ? '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>' : ''}
                        </button>
                        <button id="lang-ar" class="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentLang === 'ar' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}">
                            <span class="mr-3 w-4 text-center font-bold text-xs">عر</span>
                            <span data-translate="language">العربية</span>
                            ${this.currentLang === 'ar' ? '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>' : ''}
                        </button>
                    </div>
                </div>
            </div>
        `;

        settingsContainer.appendChild(settingsBtn);
        settingsContainer.appendChild(dropdown);

        // Add to navigation - find the right place to insert
        const navLinks = nav.querySelector('.hidden.md\\:flex');
        if (navLinks) {
            // Add after the navigation links
            navLinks.parentNode.insertBefore(settingsContainer, navLinks.nextSibling);
        } else {
            // Fallback: add to the end of nav
            nav.appendChild(settingsContainer);
        }

        // Add mobile version
        this.createMobileControls();

        // Add click outside to close dropdown
        document.addEventListener('click', (e) => {
            if (!settingsContainer.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Add resize listener to update dropdown positioning
        window.addEventListener('resize', () => {
            const dropdown = document.getElementById('settings-menu');
            if (dropdown && !dropdown.classList.contains('opacity-0')) {
                // If dropdown is open, update its position
                this.closeDropdown();
            }
        });
    }

    createMobileControls() {
        // Find mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;

        // Create mobile settings section
        const mobileSettings = document.createElement('div');
        mobileSettings.className = 'border-t border-gray-200 dark:border-gray-600 mt-4 pt-4';
        mobileSettings.innerHTML = `
            <div class="px-4 mb-3">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settings</h3>
                
                <!-- Mobile Theme Toggle -->
                <div class="mb-4">
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Theme</p>
                    <div class="flex gap-2">
                        <button id="mobile-theme-light" class="flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentTheme === 'light' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}">
                            <i class="fas fa-sun mr-2"></i>
                            Light
                        </button>
                        <button id="mobile-theme-dark" class="flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentTheme === 'dark' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}">
                            <i class="fas fa-moon mr-2"></i>
                            Dark
                        </button>
                    </div>
                </div>
                
                <!-- Mobile Language Toggle -->
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Language</p>
                    <div class="flex gap-2">
                        <button id="mobile-lang-en" class="flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentLang === 'en' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}">
                            EN
                        </button>
                        <button id="mobile-lang-ar" class="flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentLang === 'ar' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}">
                            عر
                        </button>
                    </div>
                </div>
            </div>
        `;

        mobileMenu.appendChild(mobileSettings);
    }

    setupEventListeners() {
        // Use event delegation for dynamically created buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('#settings-toggle')) {
                this.toggleDropdown();
            } else if (e.target.closest('#theme-light') || e.target.closest('#mobile-theme-light')) {
                this.setTheme('light');
                this.closeDropdown();
            } else if (e.target.closest('#theme-dark') || e.target.closest('#mobile-theme-dark')) {
                this.setTheme('dark');
                this.closeDropdown();
            } else if (e.target.closest('#lang-en') || e.target.closest('#mobile-lang-en')) {
                this.setLanguage('en');
                this.closeDropdown();
            } else if (e.target.closest('#lang-ar') || e.target.closest('#mobile-lang-ar')) {
                this.setLanguage('ar');
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        const dropdown = document.getElementById('settings-menu');
        const settingsBtn = document.getElementById('settings-toggle');
        
        if (dropdown && settingsBtn) {
            const isVisible = !dropdown.classList.contains('opacity-0');
            
            if (isVisible) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        }
    }

    openDropdown() {
        const dropdown = document.getElementById('settings-menu');
        const settingsBtn = document.getElementById('settings-toggle');
        const settingsContainer = document.getElementById('settings-dropdown');
        
        if (dropdown && settingsBtn && settingsContainer) {
            // Get viewport and container dimensions
            const rect = settingsContainer.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const dropdownWidth = 224; // w-56 = 14rem = 224px
            const isRTL = document.documentElement.dir === 'rtl';
            const isMobile = screenWidth <= 640;
            const isTablet = screenWidth > 640 && screenWidth <= 1024;
            
            // Debug logging (remove after testing)
            console.log('Dropdown positioning:', {
                screenWidth,
                isRTL,
                isMobile,
                isTablet,
                rect: { left: rect.left, right: rect.right, width: rect.width }
            });
            
            // Clear any previous positioning
            dropdown.style.right = '';
            dropdown.style.left = '';
            dropdown.style.transform = '';
            dropdown.style.transformOrigin = '';
            
            if (isMobile) {
                // Mobile positioning - use JavaScript to handle RTL/LTR properly
                if (isRTL) {
                    dropdown.style.left = '0';
                    dropdown.style.right = 'auto';
                    dropdown.style.transformOrigin = 'top left';
                    console.log('Mobile RTL: left = 0, transform-origin = top left');
                } else {
                    dropdown.style.right = '0';
                    dropdown.style.left = 'auto';
                    dropdown.style.transformOrigin = 'top right';
                    console.log('Mobile LTR: right = 0, transform-origin = top right');
                }
            } else if (isTablet) {
                // Tablet positioning
                if (isRTL) {
                    if (rect.left < dropdownWidth) {
                        dropdown.style.right = '0';
                        dropdown.style.left = 'auto';
                        dropdown.style.transformOrigin = 'top right';
                        console.log('Tablet RTL: right = 0 (overflow protection), transform-origin = top right');
                    } else {
                        dropdown.style.left = '0';
                        dropdown.style.right = 'auto';
                        dropdown.style.transformOrigin = 'top left';
                        console.log('Tablet RTL: left = 0, transform-origin = top left');
                    }
                } else {
                    if (rect.right + dropdownWidth > screenWidth) {
                        dropdown.style.right = '0';
                        dropdown.style.left = 'auto';
                        dropdown.style.transformOrigin = 'top right';
                        const translateX = Math.max(0, (rect.right + dropdownWidth) - screenWidth + 16);
                        dropdown.style.transform = `translateX(-${translateX}px)`;
                        console.log('Tablet LTR: right = 0, translateX =', `-${translateX}px, transform-origin = top right`);
                    } else {
                        dropdown.style.right = '0';
                        dropdown.style.left = 'auto';
                        dropdown.style.transformOrigin = 'top right';
                        console.log('Tablet LTR: right = 0, transform-origin = top right');
                    }
                }
            } else {
                // Desktop positioning
                if (isRTL) {
                    dropdown.style.left = '0';
                    dropdown.style.right = 'auto';
                    dropdown.style.transformOrigin = 'top left';
                    console.log('Desktop RTL: left = 0, transform-origin = top left');
                } else {
                    dropdown.style.right = '0';
                    dropdown.style.left = 'auto';
                    dropdown.style.transformOrigin = 'top right';
                    console.log('Desktop LTR: right = 0, transform-origin = top right');
                }
            }
            
            dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-[-10px]');
            dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
            settingsBtn.classList.add('text-blue-600', 'dark:text-blue-400');
        }
    }

    closeDropdown() {
        const dropdown = document.getElementById('settings-menu');
        const settingsBtn = document.getElementById('settings-toggle');
        
        if (dropdown && settingsBtn) {
            dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
            dropdown.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]');
            settingsBtn.classList.remove('text-blue-600', 'dark:text-blue-400');
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        this.updateDropdownContent();
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', this.currentLang);
        this.applyLanguage();
        this.updateDropdownContent();
    }

    updateDropdownContent() {
        // Update desktop theme buttons
        const lightBtn = document.getElementById('theme-light');
        const darkBtn = document.getElementById('theme-dark');
        const enBtn = document.getElementById('lang-en');
        const arBtn = document.getElementById('lang-ar');

        // Update mobile theme buttons
        const mobileLightBtn = document.getElementById('mobile-theme-light');
        const mobileDarkBtn = document.getElementById('mobile-theme-dark');
        const mobileEnBtn = document.getElementById('mobile-lang-en');
        const mobileArBtn = document.getElementById('mobile-lang-ar');

        if (lightBtn && darkBtn) {
            // Reset classes
            lightBtn.className = `w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentTheme === 'light' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`;
            darkBtn.className = `w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentTheme === 'dark' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`;
            
            // Update checkmarks
            const lightCheck = lightBtn.querySelector('.fa-check');
            const darkCheck = darkBtn.querySelector('.fa-check');
            
            if (lightCheck) lightCheck.remove();
            if (darkCheck) darkCheck.remove();
            
            if (this.currentTheme === 'light') {
                lightBtn.innerHTML += '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>';
            } else {
                darkBtn.innerHTML += '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>';
            }
        }

        if (enBtn && arBtn) {
            // Reset classes
            enBtn.className = `w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentLang === 'en' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`;
            arBtn.className = `w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${this.currentLang === 'ar' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`;
            
            // Update checkmarks
            const enCheck = enBtn.querySelector('.fa-check');
            const arCheck = arBtn.querySelector('.fa-check');
            
            if (enCheck) enCheck.remove();
            if (arCheck) arCheck.remove();
            
            if (this.currentLang === 'en') {
                enBtn.innerHTML += '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>';
            } else {
                arBtn.innerHTML += '<i class="fas fa-check ml-auto text-blue-600 dark:text-blue-400"></i>';
            }
        }

        // Update mobile buttons
        if (mobileLightBtn && mobileDarkBtn) {
            mobileLightBtn.className = `flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentTheme === 'light' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`;
            mobileDarkBtn.className = `flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentTheme === 'dark' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`;
        }

        if (mobileEnBtn && mobileArBtn) {
            mobileEnBtn.className = `flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentLang === 'en' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`;
            mobileArBtn.className = `flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-md transition-colors ${this.currentLang === 'ar' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`;
        }
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Update theme-specific classes
        this.updateThemeClasses();
    }

    updateThemeClasses() {
        const body = document.body;
        
        if (this.currentTheme === 'dark') {
            // Update body background
            body.className = body.className.replace('bg-gray-50', 'bg-gray-900 dark');
            
            // Update header background
            const headers = document.querySelectorAll('header');
            headers.forEach(header => {
                header.className = header.className.replace('bg-white', 'bg-gray-800 dark:bg-gray-800');
            });

            // Update section backgrounds
            const whiteSections = document.querySelectorAll('section');
            whiteSections.forEach(section => {
                if (section.className.includes('bg-white')) {
                    section.className = section.className.replace('bg-white', 'bg-gray-800 dark:bg-gray-800');
                }
                if (section.className.includes('bg-gray-50')) {
                    section.className = section.className.replace('bg-gray-50', 'bg-gray-700 dark:bg-gray-700');
                }
            });

            // Update text colors
            const textElements = document.querySelectorAll('.text-gray-800, .text-gray-700, .text-gray-600');
            textElements.forEach(el => {
                if (el.className.includes('text-gray-800')) {
                    el.className = el.className.replace('text-gray-800', 'text-gray-100 dark:text-gray-100');
                } else if (el.className.includes('text-gray-700')) {
                    el.className = el.className.replace('text-gray-700', 'text-gray-200 dark:text-gray-200');
                } else if (el.className.includes('text-gray-600')) {
                    el.className = el.className.replace('text-gray-600', 'text-gray-300 dark:text-gray-300');
                }
            });

            // Update cards and containers
            const cards = document.querySelectorAll('.bg-white, .bg-gray-50');
            cards.forEach(card => {
                if (card.className.includes('bg-white') && !card.className.includes('bg-gradient')) {
                    card.className = card.className.replace('bg-white', 'bg-gray-800 dark:bg-gray-800');
                }
                if (card.className.includes('bg-gray-50') && !card.className.includes('bg-gradient')) {
                    card.className = card.className.replace('bg-gray-50', 'bg-gray-700 dark:bg-gray-700');
                }
            });

        } else {
            // Reset to light theme classes
            body.className = body.className.replace('bg-gray-900 dark', 'bg-gray-50').replace(' dark', '');
            
            // Reset headers
            const headers = document.querySelectorAll('header');
            headers.forEach(header => {
                header.className = header.className.replace('bg-gray-800 dark:bg-gray-800', 'bg-white');
            });

            // Reset sections
            const darkSections = document.querySelectorAll('section');
            darkSections.forEach(section => {
                section.className = section.className.replace('bg-gray-800 dark:bg-gray-800', 'bg-white');
                section.className = section.className.replace('bg-gray-700 dark:bg-gray-700', 'bg-gray-50');
            });

            // Reset text colors
            const textElements = document.querySelectorAll('.text-gray-100, .text-gray-200, .text-gray-300');
            textElements.forEach(el => {
                if (el.className.includes('text-gray-100 dark:text-gray-100')) {
                    el.className = el.className.replace('text-gray-100 dark:text-gray-100', 'text-gray-800');
                } else if (el.className.includes('text-gray-200 dark:text-gray-200')) {
                    el.className = el.className.replace('text-gray-200 dark:text-gray-200', 'text-gray-700');
                } else if (el.className.includes('text-gray-300 dark:text-gray-300')) {
                    el.className = el.className.replace('text-gray-300 dark:text-gray-300', 'text-gray-600');
                }
            });

            // Reset cards
            const cards = document.querySelectorAll('.bg-gray-800, .bg-gray-700');
            cards.forEach(card => {
                if (card.className.includes('bg-gray-800 dark:bg-gray-800')) {
                    card.className = card.className.replace('bg-gray-800 dark:bg-gray-800', 'bg-white');
                }
                if (card.className.includes('bg-gray-700 dark:bg-gray-700')) {
                    card.className = card.className.replace('bg-gray-700 dark:bg-gray-700', 'bg-gray-50');
                }
            });
        }
    }

    applyLanguage() {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';

        // Update text content based on translations
        this.updateTextContent();
        this.updateLayoutForRTL();
    }

    updateTextContent() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[this.currentLang] && translations[this.currentLang][key]) {
                element.textContent = translations[this.currentLang][key];
            }
        });
    }

    updateLayoutForRTL() {
        const html = document.documentElement;
        const body = document.body;
        
        if (this.currentLang === 'ar') {
            // Set RTL direction on html element
            html.setAttribute('dir', 'rtl');
            body.classList.add('rtl');
            
            // Update font family for better Arabic support
            body.style.fontFamily = 'Tahoma, Arial, "Segoe UI", sans-serif';
            
            // Fix navigation spacing for RTL
            const navSpaces = document.querySelectorAll('nav .space-x-5, nav .space-x-6, nav .space-x-4');
            navSpaces.forEach(nav => {
                nav.style.direction = 'rtl';
            });

            // Fix button spacing for RTL
            const buttonContainers = document.querySelectorAll('.flex.gap-3, .flex.gap-4');
            buttonContainers.forEach(container => {
                // Gap works naturally with RTL, no need to override direction
            });

            // Note: Hero buttons now use gap-4 which works naturally with RTL

        } else {
            // Reset to LTR
            html.setAttribute('dir', 'ltr');
            body.classList.remove('rtl');
            
            // Reset font family
            body.style.fontFamily = '';
            
            // Reset navigation spacing
            const navSpaces = document.querySelectorAll('nav .space-x-5, nav .space-x-6, nav .space-x-4');
            navSpaces.forEach(nav => {
                nav.style.direction = '';
            });

            // Reset button spacing
            const buttonContainers = document.querySelectorAll('.flex.gap-3, .flex.gap-4');
            buttonContainers.forEach(container => {
                // Gap works naturally in both LTR and RTL, no reset needed
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        this.updateDropdownContent();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', this.currentLang);
        this.applyLanguage();
        this.updateDropdownContent();
    }
}

// Custom CSS for RTL and dark mode
const customStyles = `
    <style>
        /* RTL Direction Support */
        [dir="rtl"] {
            direction: rtl;
        }
        
        [dir="ltr"] {
            direction: ltr;
        }
        
        /* RTL Navigation Fixes */
        [dir="rtl"] .rtl-nav-space > :not([hidden]) ~ :not([hidden]) {
            margin-right: 1.25rem;
            margin-left: 0;
        }
        
        /* Settings dropdown RTL positioning */
        [dir="rtl"] #settings-dropdown {
            direction: rtl;
        }
        
        /* Remove conflicting RTL styles - we'll handle positioning via JavaScript */
        
        /* RTL Button spacing fixes */
        [dir="rtl"] .rtl-button-space > :not([hidden]) ~ :not([hidden]) {
            margin-right: 0.75rem;
            margin-left: 0;
        }
        
        /* RTL Icon fixes */
        [dir="rtl"] .fas,
        [dir="rtl"] .fab {
            margin-left: 0.5rem;
            margin-right: 0;
        }
        
        [dir="rtl"] .rtl\\:mr-0 {
            margin-right: 0 !important;
        }
        
        [dir="rtl"] .rtl\\:ml-2 {
            margin-left: 0.5rem !important;
        }
        
        [dir="rtl"] .rtl\\:rotate-180 {
            transform: rotate(180deg);
        }
        
        [dir="rtl"] .fa-arrow-left::before {
            content: "\\f061"; /* arrow-right icon */
        }
        
        [dir="rtl"] .fa-external-link-alt {
            margin-left: 0.5rem;
            margin-right: 0;
        }
        
        [dir="rtl"] .fa-github {
            margin-left: 0.5rem;
            margin-right: 0;
        }
        
        [dir="rtl"] .fa-envelope {
            margin-left: 0.5rem;
            margin-right: 0;
        }
        
        [dir="rtl"] .fa-link {
            margin-left: 0.5rem;
            margin-right: 0;
        }
        
        /* RTL Activity/Interest icons */
        [dir="rtl"] .activities-list .fas {
            margin-right: 0.75rem;
            margin-left: 0;
        }
        
        /* Dark mode transitions */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Ensure gradients work in dark mode */
        .dark .bg-gradient-to-br,
        .dark .bg-gradient-to-r {
            opacity: 1;
        }
        
        /* Custom scrollbar for dark mode */
        .dark ::-webkit-scrollbar {
            width: 8px;
        }
        
        .dark ::-webkit-scrollbar-track {
            background: #374151;
        }
        
        .dark ::-webkit-scrollbar-thumb {
            background: #6B7280;
            border-radius: 4px;
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
            background: #9CA3AF;
        }
        
        /* Settings dropdown styles */
        #settings-dropdown {
            z-index: 1000;
        }
        
        /* Dropdown animations and responsive positioning */
        #settings-menu {
            backdrop-filter: blur(10px);
            max-width: 90vw; /* Prevent overflow on very small screens */
            /* Transform origin and positioning handled by JavaScript */
        }
        
        /* RTL-specific positioning - JavaScript will override these as needed */
        [dir="rtl"] #settings-menu {
            left: 0 !important;
            right: auto !important;
            transform-origin: top left !important;
        }
        
        /* Mobile responsive positioning */
        @media (max-width: 640px) {
            #settings-menu {
                width: calc(100vw - 2rem); /* Full width minus padding on mobile */
                max-width: 280px;
                /* Positioning will be handled entirely by JavaScript */
            }
            
            [dir="rtl"] #settings-menu {
                /* JavaScript will handle mobile RTL positioning */
            }
        }
        
        /* Tablet responsive positioning */
        @media (min-width: 641px) and (max-width: 1024px) {
            #settings-menu {
                /* Positioning will be handled by JavaScript */
            }
        }
        
        /* JavaScript will handle transform-origin dynamically */
        
        /* Hover effects for dropdown items */
        #settings-menu button:hover {
            transform: translateX(-2px);
        }
        
        [dir="rtl"] #settings-menu button:hover {
            transform: translateX(2px);
        }
        
        /* Mobile settings styles */
        #mobile-menu .border-t {
            background: rgba(255, 255, 255, 0.02);
        }
        
        /* Smooth transitions for mobile buttons */
        #mobile-menu button {
            transition: all 0.2s ease;
        }
        
        #mobile-menu button:active {
            transform: scale(0.95);
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0; 
                transform: translateY(-10px) scale(0.95); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }
        
        #settings-toggle {
            animation: fadeIn 0.5s ease-out;
        }
        
        #settings-menu.opacity-100 {
            animation: slideIn 0.2s ease-out;
        }
        
        /* Arabic font improvements */
        [dir="rtl"] body,
        [dir="rtl"] .font-arabic {
            font-family: 'Tahoma', 'Arial', 'Segoe UI', sans-serif;
        }
        
        /* RTL text alignment fixes */
        [dir="rtl"] p,
        [dir="rtl"] .text-left {
            text-align: right;
        }
        
        [dir="rtl"] .text-center {
            text-align: center !important;
        }
        
        /* RTL List fixes */
        [dir="rtl"] ul li,
        [dir="rtl"] ol li {
            text-align: right;
        }
        
        /* RTL Project cards spacing */
        [dir="rtl"] .project-buttons {
            flex-direction: row-reverse;
        }
        
        [dir="rtl"] .project-buttons > * {
            margin-left: 0.75rem;
            margin-right: 0;
        }
        
        [dir="rtl"] .project-buttons > *:first-child {
            margin-left: 0;
        }
    </style>
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add custom styles
    document.head.insertAdjacentHTML('beforeend', customStyles);
    
    // Initialize theme and language manager
    window.themeManager = new ThemeLanguageManager();
});