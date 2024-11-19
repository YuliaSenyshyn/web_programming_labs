import React from 'react';
import './Catalog/catalog.css'

const SortSelect = ({ sortOrder, onSortChange }) => {
  return (
    <select onChange={(e) => onSortChange(e.target.value)} value={sortOrder} className="sort-select">
      <option value="asc">Сортувати: А-Я</option>
      <option value="desc">Сортувати: Я-А</option>
    </select>
  );
};

export default SortSelect;

