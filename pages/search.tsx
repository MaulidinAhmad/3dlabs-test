import SearchList from "@/components/List/SearchList";
import {
  getGithubUsers,
  getRepositoriesByUser,
} from "@/services/users/usersService";
import {
  IGithubUser,
  ISearchParams,
  ISearchUserResponse,
  ISorting,
  IUserRepositoriesParams,
} from "@/services/users/usersType";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  SelectHTMLAttributes,
  useEffect,
  useState,
} from "react";
import ReactPaginate from "react-paginate";

const Search: NextPage = () => {
  const { query } = useRouter();
  const [users, setusers] = useState<ISearchUserResponse>();
  const [page, setpage] = useState(1);
  const [sort, setsort] = useState<ISorting>();
  const limit = 10;

  const handleGetRepository = async (params: ISearchParams) => {
    try {
      const res = await getGithubUsers({
        per_page: limit,
        page,
        sort: sort,
        q: String(query.username),
        ...params,
      });
      console.log(res, "res");
      setusers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSorting = (event: ChangeEvent<HTMLSelectElement>) => {
    try {
      const res = handleGetRepository({ sort: event.target.value });
    } catch (error) {}
  };

  const handlePageChange = ({ selected }: any) => {
    console.log(selected, "e");
    setpage(selected + 1);
    handleGetRepository({ page: selected + 1, q: String(query.username) });
  };

  useEffect(() => {
    if (query.username) {
      handleGetRepository({ page: 1, q: String(query.username) });
    }
  }, [query.username]);

  return (
    <>
      <Head>
        <title>Github Kali</title>
        <meta name="description" content="Github Kali is clone from github" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="search-page">
        <div className="search-page__container">
          <div className="search-page__content">
            <div className="search-page__content__head">
              <p>{Intl.NumberFormat().format(users?.total_count || 0)} users</p>
              <select onChange={handleChangeSorting}>
                <option value="">sort</option>
                <option value="followers">followers</option>
                <option value="repositories">repositories</option>
                <option value="joined">joined</option>
              </select>
            </div>
            <div className="search-page__content__data">
              <SearchList users={users?.items} />
            </div>
            <div className="search-page__content__pagination">
              <ReactPaginate
                onPageChange={handlePageChange}
                pageCount={
                  (users && Math.floor(users.total_count / limit)) || 0
                }
                forcePage={page - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
