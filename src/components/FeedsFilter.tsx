import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilter } from '../store/feedSlice';
import '../styles/Filter.scss';
import { transformString } from '../utils/helper';

const FeedsFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.feed.filters);
  const filterOptions = useSelector((state: RootState) => state.feed.filterOptions);

  const handleCheckboxChange = (filterType: keyof typeof filters, option: string) => {
    const selectedOptions = filters[filterType].includes(option)
      ? filters[filterType].filter((item) => item !== option)
      : [...filters[filterType], option];

    dispatch(setFilter({ filterType, selectedOptions }));
  };
console.log('filterOptions',filterOptions);

  return (
    <div className="filters">

      {Object.keys(filterOptions).map((filterType) => (
        <div key={filterType} className="filter">
          <p className='filter-title'>{filterType ==='sortBy'? filterType.replace(/([A-Z])/g, ' $1').trim() : filterType}</p>
          {filterOptions[filterType as keyof typeof filterOptions].map((option) => (
            <div key={option} className="filter-option">
              <input
                type="checkbox"
                id={`${filterType}-${option}`}
                value={option}
                checked={filters[filterType as keyof typeof filters].includes(option)}
                onChange={() => handleCheckboxChange(filterType as keyof typeof filters, option)}
              />
              <label style={{color:'#171A1F'}} htmlFor={`${filterType}-${option}`}>{option==='Date' ? `${option } (Earliest to Latest)` : transformString(option)}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FeedsFilter;
