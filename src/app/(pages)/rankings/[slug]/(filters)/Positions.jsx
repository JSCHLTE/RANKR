"use client";

import { useState } from "react";
import styles from "./filters.module.css";

const Positions = () => {

    const [positions, setPositions] = useState({
        QB: false,
        RB: false,
        WR: false,
        TE: false
    });

    const handlePositions = (pos) => {
        setPositions(prev => ({ ...prev, [pos]: !prev[pos] }));
    };

    return (
        <div>
            <h1>Positions</h1>
            <div className={`${styles.positionsWrapper} flex`}>
                <div className={styles.positions}>
                    <label htmlFor="QB">
                        Quarterback
                        <input type="checkbox" value={positions.QB} onChange={() => handlePositions('QB')} id="QB" />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <div className={styles.positions}>
                    <label htmlFor="RB">
                        Running back
                        <input type="checkbox" value={positions.RB} onChange={() => handlePositions('RB')} id="RB" />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <div className={styles.positions}>
                    <label htmlFor="WR">
                        Wide receiver
                        <input type="checkbox" value={positions.WR} onChange={() => handlePositions('WR')} id="WR" />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <div className={styles.positions}>
                    <label htmlFor="TE">
                        Tight end
                        <input type="checkbox" value={positions.TE} onChange={() => handlePositions('TE')} id="TE" />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Positions;