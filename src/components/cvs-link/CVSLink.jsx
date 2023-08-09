import { CSVLink } from "react-csv";
import { headers } from "../../utils/headersCVS";
const CVSLink = ({ users }) => {
  return (
    <div>
      <CSVLink
        data={users}
        target="_blank"
        headers={headers}
        filename={"user_data.csv"}
      >
        <span className="hover:bg-gray-400/25 py-3 px-3 rounded cursor-pointer">
          Export to CSV
        </span>
      </CSVLink>
    </div>
  );
};

export default CVSLink;
