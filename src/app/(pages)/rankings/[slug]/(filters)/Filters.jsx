import styles from "./filters.module.css";
import Positions from "./Positions";

const Filters = ({ handleFilter }) => {
    return (
        <div className={styles.filtersWrapper}>
            <Positions handleFilter={handleFilter} />
        </div>
    );
};

export default Filters;