import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/PlaceItem.module.css";

export default function PlaceItem({ place }) {
  return (
    <div className={styles.place}>
      <div className={styles.image}>
        <Image
          src={
            place.image
              ? place.image.formats.medium.url
              : "/images/place-default.svg"
          }
          width={375}
          height={250}
        />
      </div>
      <div className={styles.info}>
        <h3>{place.name}</h3>
      </div>
      <div>
        <Link href={`/${place.slug}`}>
          <a className="btn">More info</a>
        </Link>
      </div>
    </div>
  );
}
