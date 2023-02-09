import { IGithubUser } from "@/services/users/usersType";
import { context } from "@/store";
import { setToLocalStorage } from "@/store/local_storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface ISearchCard {
  data: IGithubUser;
}

const SearchCard: React.FC<ISearchCard> = ({ data }) => {
  const ctx = context();
  const router = useRouter();

  const handleClick = (data: IGithubUser) => {
    ctx.dispatch({
      userData: data,
    });
    setToLocalStorage({
      userData: data,
    });
    setTimeout(() => {
      router.push("/user/" + data.login);
    }, 1000);
  };
  return (
    <div className="search-card">
      <div className="search-card__image">
        <Image src={data.avatar_url} fill alt="user avatar" />
      </div>
      <div className="search-card__right">
        <p
          className="search-card__right__name"
          onClick={() => handleClick(data)}
        >
          {data.login}
        </p>
        {/* <p className="search-card__right__description">{data.}</p>
        <p className="search-card__right__location">{location}</p> */}
      </div>
    </div>
  );
};

export default SearchCard;
