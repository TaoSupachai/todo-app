import React from "react";
import styles from "../styles/modules/navbar.module.scss";

function NavBar({ children }) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>{children}</ul>
    </nav>
  );
}

function NavItem({ children }) {
  return (
    <li className={styles.navItem}>
      <a href="#" className={styles.navDetail}>
        {children}
      </a>
    </li>
  );
}

export { NavBar, NavItem };
