import logo from '../../assets/images/GitHub_Logo_White.png';
import './footer.scss';

class Footer extends HTMLDivElement {
  constructor() {
    super();

    this.className = 'footer';
  }

  render() {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <a href="https://github.com/SavitskayaKseniya22" target="_blank">
        <img src=${logo} alt="logo" class="footer__logo" />
      </a>
      <span>© 2023</span>
    `
    );
  }

  connectedCallback() {
    this.render();
  }
}

export default Footer;
