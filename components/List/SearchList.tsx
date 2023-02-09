import { IGithubUser } from "@/services/users/usersType";
import SearchCard from "../card/SearchCard";

const SearchList: React.FC<{ users?: IGithubUser[] }> = ({ users }) => {
  return (
    <div className="search-list">
      {users?.map((user, index) => (
        <div className="search-list__item">
          <SearchCard data={user} />
        </div>
      ))}
    </div>
  );
};

export default SearchList;
