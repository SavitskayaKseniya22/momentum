import logo from "../../assets/svg/rs_school_js.svg"
import "./footer.scss"

class Footer {
  
  content() {
    return `<footer class="footer">
      <a href="https://rs.school/js/" target="_blank">
        <img src=${logo} alt="logo" class="footer__logo" />
      </a>
      <a href="https://github.com/SavitskayaKseniya22" target="_blank">
        KSENIYA SAVITSKAYA
      </a>
      <span>© 2023</span>
    </footer>`
  }
}

export default Footer