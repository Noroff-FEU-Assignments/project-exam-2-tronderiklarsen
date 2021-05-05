import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/PlaceItem.module.css";

export default function PlaceItem({ place }) {
  return (
    <div className={styles.place}>
      <div className={styles.image}>
        <Image src={place.image.formats.small.url} width={500} height={333} />
      </div>
      <div className={styles.info}>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
      </div>
      <div>
          <Link href={`/places/${place.slug}`}>
              <a className="btn">More info</a>
          </Link>
      </div>
    </div>
  );
}