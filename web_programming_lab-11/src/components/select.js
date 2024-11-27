import React from 'react';
import './Catalog/catalog.css'

const SortSelect = ({ sortOrder, onSortChange }) => {
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  };

  return (
    <select onChange={handleSortChange} value={sortOrder} className="sort-select">
      <option value="ascTitle">Сортувати: А-Я</option> {/* Сортування за алфавітом (А-Я) */}
      <option value="descTitle">Сортувати: Я-А</option> {/* Сортування за алфавітом (Я-А) */}
      <option value="ascPrice">Сортувати за ціною: від дешевших</option>
      <option value="descPrice">Сортувати за ціною: від дорожчих</option>
    </select>
  );
};

export default SortSelect;
