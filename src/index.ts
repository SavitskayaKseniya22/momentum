//import "./assets/js/settings"
//import "./assets/js/date"
import "./assets/js/backgroundImg"
import Footer from "./modules/footer/footer";
//import "./assets/js/weather"
//import "./assets/js/quotes"
//import "./assets/js/todo"
import "./style.scss";

class App {
  footer: string;
 
  constructor () {
    this.footer = new Footer().content();
    
  }

  render() {
    const body = document.querySelector("body");
    body?.insertAdjacentHTML("beforeend",this.footer)
  }
}

new App().render()



