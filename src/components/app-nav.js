import config_path from "../../config/config_path.js"

export default class NAV extends HTMLElement{
     static url = import.meta.url
     constructor() {
         super()
         this.attachShadow({mode: 'open'})
     }

     handleEvent(e) {
        e.preventDefault();
        (e.type == 'click') ? this.move_menu(e) : false
     }

     async changePropertys(div,c,r,l) {
        let state = false 
        let wait = new Promise(resolve => {
             resolve((!div.classList.contains(c)) ? 
            (div.style.animation = l, div.classList.add(c))
           :(div.style.animation = r), state = !state)
        })
    }

     move_menu(e){
        this.changePropertys(this.menu, 'active', 'moveRight 1.3s forwards', 'moveLeft 1.3s forwards')
     }

     static async component_nav() {
         return await ((await fetch(config_path.getPath(NAV.url)[0].replace('.js', '.html'))).text())
     }
     async connectedCallback(){
        let content = Promise.resolve(NAV.component_nav()).then(res => res)
        this.shadowRoot.innerHTML += await content   
        this.btn = this.shadowRoot.querySelector('.menu')
        this.menu = this.shadowRoot.querySelector('.content-responsive');
        this.btn.addEventListener('click', this.handleEvent.bind(this))
    }
 }

customElements.define(config_path.getPath(NAV.url)[1], NAV)

