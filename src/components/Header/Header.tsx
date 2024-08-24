import React from "react";
import styles from "@/components/Header/Header.module.css";

export const Header: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <img src="/logo.png" alt="Logo" />
        <img src="/logo_v2.png" alt="Aero Trip" />
      </div>
      <ul>
        <li>Home</li>
        <li>Offers</li>
        <li>My trips</li>
        <li>Support</li>
      </ul>
      <div>Log in/Sign up</div>
    </nav>
  );
};
