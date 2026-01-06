"use client";

import { useEffect, useState } from "react";
import styles from "./teams.module.css";
import { teams } from "../../../../providers/teams/TeamProvider";

const Teams = ({ setTeamFilter, teamList, setTeamList }) => {

    const handleTeams = (team) => {
        setTeamList(prev => ({ ...prev, [team]: !prev[team] }));
    };

    const closeTeamFilter = () => {
        setTeamFilter(false);
    };

    const handleResetTeams = () => {
        const resetTeams = {};
        teams.forEach(team => {
            resetTeams[team.id.toUpperCase()] = false;
        });
        setTeamList(resetTeams);
    };

    return (
        <>
            <div className={styles.overlay} onClick={closeTeamFilter}></div>
            <div className={styles.positionsContainer}>
                <div className={styles.positionsInner}>
                    <div className={styles.buttonsWrapper}>
                        <button className={`${styles.resetButton} arc custom rounded`} onClick={handleResetTeams}>Reset Teams</button>
                        <button className={`${styles.closeButton} arc custom rounded`} onClick={closeTeamFilter}>Close Filter</button>
                    </div>
                    <div className={`${styles.positionsWrapper} flex`}>
                        {teams.map(team => (
                            <div className={styles.positions} key={team.id}>
                                <label htmlFor={team.id}>
                                    {team.city} {team.name}
                                    <input type="checkbox" id={team.id} checked={teamList[team.id.toUpperCase()]} onChange={() => handleTeams(team.id.toUpperCase())} />
                                    <span className={styles.checkmark}></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teams;