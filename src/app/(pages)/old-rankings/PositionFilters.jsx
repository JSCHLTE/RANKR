const PositionFilters = ({
    positionFilter,
    handleFilter,
    resetFilters,
    POSITIONS
  }) => (
    <div className="filter-items flex">
      <span>Position:</span>
      <div className="filter-buttons flex">
        <button className={positionFilter.length <= 0 ? 'active' : ''} onClick={resetFilters}>
          All
        </button>
        {POSITIONS.map(pos => (
          <button
            key={pos}
            onClick={() => handleFilter(pos)}
            className={positionFilter.includes(pos) ? 'active' : ''}
          >
            {pos}
          </button>
        ))}
        <button
          onClick={() => handleFilter('Rookie')}
          className={positionFilter.includes('Rookie') ? 'active' : ''}
        >
          Rookie
        </button>
      </div>
    </div>
  );

  export default PositionFilters