import styles from "./teams.module.css";
import Teams from "./Teams";

const TeamFilter = ({ setTeamFilter, teamList, setTeamList }) => {

    return (
        <div className={styles.filtersWrapper}>
            <Teams setTeamFilter={setTeamFilter} teamList={teamList} setTeamList={setTeamList} />
        </div>
    );
};

export default TeamFilter;