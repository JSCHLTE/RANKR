import styles from './positionFilters.module.css'

const PositionFilters = ({
  positionFilter,
  handleFilter,
  resetFilters,
  POSITIONS
}) => (
  <div className={`${styles.filterItems} flex`}>
    <span>Filters:</span>
    <div className={`${styles.filterButtons} flex`}>
      <button>Position</button>
      <button>Team</button>
      {/* <button className={positionFilter.length <= 0 ? `${styles.active}` : ''} onClick={resetFilters}>
        All
      </button>
      {POSITIONS.map(pos => (
        <button
          key={pos}
          onClick={() => handleFilter(pos)}
          className={positionFilter.includes(pos) ? `${styles.active}` : ''}
        >
          {pos}
        </button>
      ))} */}
      <button
        onClick={() => handleFilter('Rookie')}
        className={positionFilter.includes('Rookie') ? `${styles.active}` : ''}
      >
        Rookie
      </button>
    </div>
  </div>
);

export default PositionFilters