import RepositoryList from "@/components/List/RepositoryList";
import { getRepositoriesByUser } from "@/services/users/usersService";
import {
  IUserRepositoriesParams,
  IUserRepositoryListResponse,
} from "@/services/users/usersType";
import { context } from "@/store";
import { getLocalStorage } from "@/store/local_storage";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserPage: NextPage = () => {
  const ctx = context();
  const router = useRouter();
  const [repositories, setrepositories] = useState<
    IUserRepositoryListResponse[] | [] | undefined
  >([]);
  const { name } = router.query;
  const [isLastPage, setisLastPage] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);

  const per_page = 6;

  // useEffect(() => {
  //   const userData = getLocalStorage()?.userData;
  //   if (userData) {
  //     ctx.dispatch({ userData });
  //   }
  // }, []);

  const handleNextPage = async () => {
    setcurrentPage(currentPage + 1);
    const data = await handleGetUserRepostitory(
      { page: currentPage + 1 },
      String(name)
    );
    if (repositories && data) {
      if (data.length < 6) {
        setisLastPage(true);
      }
      setrepositories([...repositories, ...data]);
    }
  };

  const handleGetInit = async (name: string) => {
    try {
      const data = await handleGetUserRepostitory({ page: 1 }, name);
      if (data && data.length < 6) {
        setisLastPage(true);
      }
      setrepositories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUserRepostitory = async (
    param: IUserRepositoriesParams,
    name: string
  ) => {
    try {
      const res = await getRepositoriesByUser({ per_page, ...param }, name);
      // setrepositories(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (name) {
      handleGetInit(String(name));
    }
  }, [name]);

  return (
    <div className="user-page">
      <div className="user-page__container">
        <div className="user-page__profile">
          <div className="user-page__profile__image">
            <Image
              fill
              src={ctx.state.userData?.avatar_url || ""}
              alt="profile avatar"
            />
          </div>
          <p className="user-page__profile__name">
            {ctx.state.userData?.login}
          </p>
        </div>
        <div className="user-page__repositories">
          <div className="user-page__repositories__head"></div>
          <div className="user-page__repositories__content">
            <RepositoryList repositories={repositories} />
          </div>
          {!isLastPage && (
            <p
              onClick={handleNextPage}
              className="user-page__repositories__show-more"
            >
              Show More
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
