
document.addEventListener('alpine:init', () => {
    Alpine.data('geral', () => ({
        acessibility: false,
        isScrolled: false,
        theme: 'light',
        showAboutUs: false,
        toggleMobileMenu: false,
        
        toggleMenu(){
            this.toggleMobileMenu = !this.toggleMobileMenu
        },

        toggleAcessibility() {
            this.acessibility = !this.acessibility
        },

        toggleAboutUs(){
            this.showAboutUs = !this.showAboutUs
        },

        controllScroll() {
            const elInnerBody = document.querySelector('#body');
            const { debounceTime, distinct, pluck, tap } = rxjs.operators;
            rxjs.fromEvent(elInnerBody, 'scroll')
                .pipe(
                    // tap(console.log),
                    pluck('target', 'scrollTop'),
                    distinct()
                )
                .subscribe((scrollTop) => {
                    this.isScrolled = scrollTop > 64;
                })
        },

        init() {
            console.log('init');
            this.controllScroll();
            

        }

    }))
});