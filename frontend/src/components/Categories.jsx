import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function Categories({ value, handleChange }) {
  const { categories } = useSelector((state) => state.data);

  const categoryChange = (e) => {
    const id = e.target.value;
    const result = categories.filter((item) => item.id == id);
    handleChange(id, result[0].name);
  };

  return (
    <select
      value={value}
      onChange={categoryChange}
      className="max-w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

Categories.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default Categories;
