/**
 * @class DG_Takeover
 * @description A refacterd version of the original takeover.js. DG_Takeover is a JS plugin for easily creating stable and accessible takeover navigations, build to enhance takeover animations and not be jQuery dependent. 
 * @auther Durkan Group
 * @version 0.1.0
 */
class DG_Takeover {
    constructor(_id, options) {
        this.id = _id;
        this.defaults = {
            duration: 0.5,
        }
        this.settings = Object.assign({}, this.defaults, options);
        this.step_duration = this.settings.duration * 1000;
        this.events = [
            new Event('dg_takeover_init'),
            new Event('dg_takeover_opening'),
            new Event('dg_takeover_open'),
            new Event('dg_takeover_closing'),
            new Event('dg_takeover_close'),
            new Event('dg_takeover_toggle'),
            new Event('dg_takeover_toggle_open'),
            new Event('dg_takeover_toggle_close')
        ];
        this.toggle_buttons = document.querySelectorAll('[data-dgtakeover-toggle="' + this.id + '"]') || [];
        this.menu = document.querySelector('[data-dgtakeover-menu="' + this.id + '"]') || null;
        console.log('DG_Takeover: Initializing Takeover with ID:', this.id);
        
        this.html = document.querySelector('html') || null;
        this.body = document.querySelector('body') || null;
        this.is_animating = false; // prevent bounce
        this.is_open = false;
        this.init();
    }

    /**
     * Toggle Takeover
     * @param {int} action - 0 = toggle, 1 = open, 2 = close
     * @return {void} 
     */
    toggle_takeover(action = 0) {
        this.is_animating = true;
        if (action === 1) {
            this.is_open = false;
        } else if (action === 2) {
            this.is_open = true;
        }
        if (!this.is_open) { // open
            document.dispatchEvent(this.events[1]); // dg_takeover_before_open
            this.html.classList.add('js-no-scroll');
            this.body.classList.add('js-no-scroll');
            this.menu.classList.add('takeover__opening');
            for (let i = 0; i < this.toggle_buttons.length; i++) {
                this.toggle_buttons[i].classList.add('takeover__opening');
            }
            setTimeout(() => {
                this.menu.classList.add('takeover__open');
                this.menu.setAttribute('aria-hidden', 'false');
                for (let i = 0; i < this.toggle_buttons.length; i++) {
                    this.toggle_buttons[i].classList.add('takeover__open');
                    this.toggle_buttons[i].setAttribute('aria-expanded', 'true');
                }
                this.is_open = true;
                this.is_animating = false;
                document.dispatchEvent(this.events[2]); // dg_takeover_after_open
            }, this.step_duration);
                
        } else {
            document.dispatchEvent(this.events[3]); // dg_takeover_before_close
            this.menu.classList.remove('takeover__open');
            for (let i = 0; i < this.toggle_buttons.length; i++) {
                this.toggle_buttons[i].classList.remove('takeover__open');
            }
            setTimeout(() => {
                this.menu.classList.remove('takeover__opening');
                this.menu.setAttribute('aria-hidden', 'true');
                for (let i = 0; i < this.toggle_buttons.length; i++) {
                    this.toggle_buttons[i].classList.remove('takeover__opening');
                    this.toggle_buttons[i].setAttribute('aria-expanded', 'false');
                }
                this.html.classList.remove('js-no-scroll');
                this.body.classList.remove('js-no-scroll');
                this.is_open = false;
                this.is_animating = false;
                document.dispatchEvent(this.events[4]); // dg_takeover_after_close
            }, this.step_duration);
        }   
    }

    /**
     * Bind Events
     * @return {void}
     */
    bind_events() {
        for (let i = 0; i < this.toggle_buttons.length; i++) {
            this.toggle_buttons[i].addEventListener("click", (e) => {
                if (this.is_animating === true) return;
                this.toggle_takeover();
            });
            this.toggle_buttons[i].addEventListener("keyup", (e) => {
                e.preventDefault();
                if (e.key === "Enter" || e.key === " ") {
                    if (this.is_animating === true) return;
                    this.toggle_takeover();
                }
            });
        }
        document.addEventListener('keydown', (e) => { // close with escape
            if (e.key === "Escape" && this.is_open) {
                if (this.is_animating === true) return;
                if (!this.is_open) return;
                this.toggle_takeover(2);
            }
        });
        document.addEventListener('dg_takeover_toggle', (e) => {
            this.toggle_takeover();
        });
        document.addEventListener('dg_takeover_toggle_open', (e) => {
            if (this.is_open) return;
            this.toggle_takeover(1);
        });
        document.addEventListener('dg_takeover_toggle_close', (e) => {
            if (!this.is_open) return;
            this.toggle_takeover(2);
        });
    }

    /**
     * Initialize the DG_Takeover
     * @description Init plus validate some stuff.
     * @return {void}
     */
    init() {
        // Validate
        if (this.html === null) {
            console.error('DG_Takeover: html not found. (dg_takeover.js:134)');
            return;
        }
        if (this.body === null) {
            console.error('DG_Takeover: body not found. (dg_takeover.js:138)');
            return;
        }
        if (this.toggle_buttons < 0 || this.toggle_buttons === null) {
            console.error('DG_Takeover: [data-dgtakeover-toggle] not found. (dg_takeover.js:142)');
            return;
        }
        if (this.menu === null) {
            console.error('DG_Takeover: [data-dgtakeover-menu] not found. (dg_takeover.js:146)');
            return;
        }

        // ADA stuff
        for (let i = 0; i < this.toggle_buttons.length; i++) {
            this.toggle_buttons[i].setAttribute('role', 'button');
            this.toggle_buttons[i].setAttribute('aria-haspopup', 'true');
            this.toggle_buttons[i].setAttribute('aria-expanded', 'false');
            this.toggle_buttons[i].setAttribute('aria-controls', this.id);
            this.toggle_buttons[i].setAttribute('tabindex', '0');
        }
        this.menu.setAttribute('role', 'navigation');
        this.menu.setAttribute('aria-hidden', 'true');
        this.menu.setAttribute('aria-label', 'Takeover Navigation');

        // init
        document.dispatchEvent(this.events[0]);
        this.bind_events();
    }
}
