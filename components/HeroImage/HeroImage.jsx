import Image from "next/image";
import styles from "./HeroImage.module.css";
import { MONTH_NAMES } from "@/lib/dateUtils";

export default function HeroImage({ src, month, year }) {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={`${MONTH_NAMES[month]} ${year} hero`}
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    </div>
  );
}
