import logo from "../../assets/images/GitHub_Logo_White.png";
import "./footer.scss";

class Footer {
  static content() {
    return `<footer class="footer">
      <a href="https://github.com/SavitskayaKseniya22" target="_blank">
        <img src=${logo} alt="logo" class="footer__logo" />
      </a>
      <span>© 2023</span>
    </footer>`;
  }
}

export default Footer;
