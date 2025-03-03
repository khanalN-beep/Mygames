import styles from './Store.module.scss';
import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_RWAG_API_KEY;

const Stores = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setPromos(data.results || []))
      .catch(error => console.error("Error fetching promos:", error));
  }, []);

  return (
    <div className={styles.Container}>
      {promos.map(promo => (
        <div key={promo.id} className={styles.promoCard}>
          <div className={styles.promoImageContainer}>
            <img
              src={promo.background_image}
              alt={promo.name}
              className={styles.promoImage}
            />
          </div>
          <div className={styles.promoContent}>
            <h2 className={styles.promoTitle}>{promo.name}</h2>
            <p className={styles.promoDescription}>
              {promo.released ? `Released on: ${promo.released}` : "Release date unknown"}
            </p>
            <div className={styles.promoFooter}>
              <span className={styles.promoRating}>Rating: {promo.rating}/5</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stores;
