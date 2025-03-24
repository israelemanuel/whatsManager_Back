
document.addEventListener('alpine:init', () => {
    Alpine.data('geral', () => ({
        acessibility: false,
        isScrolled: false,
        theme: 'light',

        toggleAcessibility() {
            this.acessibility = !this.acessibility
        },

        loadColorScheme(){
            if(localStorage.getItem('darkMode') === 'enabled'){
                this.theme = 'dark'
            }
            else{
                this.theme = 'light'
            }
        },

        checkColorScheme(){

            if(this.theme === 'light'){
                this.theme = 'dark'
            }
            else{
                this.theme = 'light'
            }
            
            console.log(this.theme);
            
        },

        controllScroll() {
            const elInnerBody = document.querySelector('#innerBody');
            const { debounceTime, distinct, pluck, tap } = rxjs.operators;
            rxjs.fromEvent(elInnerBody, 'scroll')
                .pipe(
                    // tap(console.log),
                    pluck('target', 'scrollTop'),
                    distinct()
                )
                .subscribe((scrollTop) => {
                    this.isScrolled = scrollTop > 200;
                })
        },

        init() {
            console.log('init');
            this.loadColorScheme();


        }

    }))

    Alpine.data('carro', () => ({
        carros: [
            { marca: 'Chevrolet', modelo: 'Onix', preco: 'R$} 60.000,00' },
            { marca: 'Fiat', modelo: 'Argo', preco: 'R$} 65.000,00' },
            { marca: 'Ford', modelo: 'Ka', preco: 'R$} 55.000,00' },
        ]
    }))
});