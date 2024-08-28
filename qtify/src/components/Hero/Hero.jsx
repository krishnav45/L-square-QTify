import React from "react";
import styles from "../Hero/Hero.module.css";

function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <p>100 Thousand Songs, ad-free</p>
        <p>Over thousands podcast episodes</p>
      </div>
      <div>
        <img
          src={require("../../assets/hero_headphones.png")}
          width={212}
          alt="headphones"
        />
      </div>
    </div>
  );
}

export default Hero;
