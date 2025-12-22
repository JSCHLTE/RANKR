import styles from "./filters.module.css";
import Positions from "./Positions";

const Filters = ({ activeFilter, setActiveFilter }) => {
    return (
        <div className={styles.filtersWrapper}>
            <Positions />
        </div>
    );
};

export default Filters;