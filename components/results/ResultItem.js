import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/ResultItem.module.css";

export default function ResultItem({ place }) {
  return (
    <div className={styles.place}>
      <div className={styles.image}>
        <Image src={place.image.formats.thumbnail.url} width={250} height={166} />
      </div>
      <div className={styles.info}>
        <h3>{place.name}</h3>
      </div>
      <div>
          <Link href={`/${place.slug}`}>
              <a className="btn">Info</a>
          </Link>
      </div>
    </div>
  );
}