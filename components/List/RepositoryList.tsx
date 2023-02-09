import {
  IGithubUser,
  IUserRepositoryListResponse,
} from "@/services/users/usersType";
import SearchCard from "../card/SearchCard";
import RepositoryCard from "../card/RepositoryCard";

const RepositoryList: React.FC<{
  repositories?: IUserRepositoryListResponse[];
}> = ({ repositories }) => {
  return (
    <div className="repository-list">
      {repositories?.map((user, index) => (
        <div key={index} className="repository-list__item">
          <RepositoryCard data={user} />
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
