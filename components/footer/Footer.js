import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <img className={styles.socials} src="/images/facebook.svg" href="#"></img>
        <img className={styles.socials} src="/images/instagram.svg" href="#"></img>
      </div>
      <div>
        <p>Copyright © 2021 Holidaze Inc</p>
      </div>
    </div>
  );
}
