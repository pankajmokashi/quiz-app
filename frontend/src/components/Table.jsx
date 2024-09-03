import PropTypes from "prop-types";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Category", "Difficulty", "Score", "Date"];

export function Table({ data }) {
  const convertDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  };

  return (
    <Card className="w-full max-w-3xl overflow-auto rounded-md mt-1 h-[calc(100vh-11.5rem)] static">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 text-xs sm:text-sm"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ category, difficulty, score, datetime }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-xs sm:text-sm"
                  >
                    {category}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-xs sm:text-sm"
                  >
                    {difficulty}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-xs sm:text-sm"
                  >
                    {score} / 10
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-xs sm:text-sm"
                  >
                    {convertDate(datetime)}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

Table.propTypes = {
  data: PropTypes.array,
};

export default Table;
