"use client";

import { useState } from "react";
import styles from "./filters.module.css";
import { teams } from "../../../../providers/teams/TeamProvider";

const Positions = () => {

    const [positions, setPositions] = useState({
        QB: false,
        RB: false,
        WR: false,
        TE: false,
        ROOKIE: false
    });

    const [teamList, setTeamList] = useState({
        ARI: false,
        ATL: false,
        BAL: false,
        BUF: false,
        CAR: false,
        CHI: false,
        CIN: false,
        CLE: false,
        DAL: false,
        DEN: false,
        DET: false,
        GB: false,
        HOU: false,
        IND: false,
        JAX: false,
        KC: false,
        MIA: false,
        MIN: false,
        NE: false,
        NO: false,
        NYG: false,
        NYJ: false,
        LV: false,
        PHI: false,
        PIT: false,
        LAC: false,
        SF: false,
        SEA: false,
        LA: false,
        TB: false,
        TEN: false,
        WAS: false
    });

    const handleTeams = (team) => {
        setTeamList(prev => ({ ...prev, [team]: !prev[team] }));
    };

    const handlePositions = (pos) => {
        setPositions(prev => ({ ...prev, [pos]: !prev[pos] }));
    };

    const handleResetPositions = () => {
        setPositions({
            QB: false,
            RB: false,
            WR: false,
            TE: false,
            ROOKIE: false
        });
    };

    return (
        <>
            <div className={styles.positionsContainer}>
                <h2>Positions & Rookies</h2>
                <div className={`${styles.positionsWrapper} flex`}>
                    <div className={styles.positions}>
                        <label htmlFor="QB">
                            Quarterback
                            <input type="checkbox" checked={positions.QB} onChange={() => handlePositions('QB')} id="QB" />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                    <div className={styles.positions}>
                        <label htmlFor="RB">
                            Running back
                            <input type="checkbox" checked={positions.RB} onChange={() => handlePositions('RB')} id="RB" />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                    <div className={styles.positions}>
                        <label htmlFor="WR">
                            Wide receiver
                            <input type="checkbox" checked={positions.WR} onChange={() => handlePositions('WR')} id="WR" />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                    <div className={styles.positions}>
                        <label htmlFor="TE">
                            Tight end
                            <input type="checkbox" checked={positions.TE} onChange={() => handlePositions('TE')} id="TE" />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                    <div className={styles.positions}>
                        <label htmlFor="ROOKIE">
                            Rookie
                            <input type="checkbox" checked={positions.ROOKIE} onChange={() => handlePositions('ROOKIE')} id="ROOKIE" />
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>
                </div>
                <button className={`${styles.resetButton} arc custom rounded`} onClick={handleResetPositions}>Reset Positions & Rookies</button>
            </div>
            <div className={styles.positionsContainer}>
                <h2>Teams</h2>
                <div className={`${styles.positionsWrapper} flex`}>
                    {teams.map(team => (
                        console.log(team.id),
                        <div className={styles.positions} key={team.id}>
                            <label htmlFor={team.id}>
                                {team.city} {team.name}
                                <input type="checkbox" id={team.id} checked={teamList[team.id.toUpperCase()]} onChange={() => handleTeams(team.id.toUpperCase())} />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                    ))}
                </div>
                <button className={`${styles.resetButton} arc custom rounded`} onClick={handleResetPositions}>Reset Teams</button>
            </div>
        </>
    );
};

export default Positions;