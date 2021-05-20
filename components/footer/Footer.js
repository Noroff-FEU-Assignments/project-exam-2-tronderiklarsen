import styles from "../../styles/Footer.module.css";
import Image from "next/image"

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <a href="#" className={styles.socials} >
          <Image src="/images/facebook.svg" height={24} width={24}></Image>
        </a>
        <a href="#" className={styles.socials} >
          <Image src="/images/instagram.svg" height={24} width={24}></Image>
        </a>
      </div>
      <div>
        <p>Copyright © 2021 Holidaze Inc</p>
      </div>
    </div>
  );
}
