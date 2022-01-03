import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <ul className="social">
        <li className="social-list">
          <a
            aria-label="gmail icon"
            target="_blank"
            rel="noreferrer"
            href="mailto: prnvbirajdar@gmail.com"
            className="social-link"
          >
            <i className="far fa-envelope"></i>
          </a>
        </li>
        <li className="social-list">
          <a
            aria-label="github icon"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/prnvbirajdar"
            className="social-link"
          >
            <i className="fab fa-github-alt"></i>
          </a>
        </li>
        <li className="social-list">
          <a
            aria-label="linkedin icon"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/prnvbirajdar/"
            className="social-link"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
      <div className="copyright__div">
        <p className="copyright__p">
          <a className="copyright" href="#top" aria-label="copyright">
            ©{new Date().getFullYear()} Made with ❤️ by Pranav Birajdar
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
