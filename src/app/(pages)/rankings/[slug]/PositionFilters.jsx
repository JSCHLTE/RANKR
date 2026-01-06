import styles from './positionFilters.module.css'

const PositionFilters = ({
  positionFilter,
  handleFilter,
  resetFilters,
  POSITIONS,
  setTeamFilter
}) => (
  <div className={`${styles.filterItems} flex`}>
    <div className={`${styles.filterButtons} flex`}>
      <button className={positionFilter.length <= 0 ? `${styles.active}` : ''} onClick={resetFilters}>
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
      ))}
      <button
        onClick={() => handleFilter('Rookie')}
        className={positionFilter.includes('Rookie') ? `${styles.active}` : ''}
      >
        Rookie
      </button>
      <button
        onClick={() => setTeamFilter(true)}
      >
        Team
      </button>
    </div>
  </div>
);

export default PositionFilters