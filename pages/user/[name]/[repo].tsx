import {
  getRepoReadme,
  getRepoTree,
  getUserRepoBranchDetail,
  getUserRepoBranchList,
  renderMarkdown,
} from "@/services/users/usersService";
import {
  IGetRepoReadmeResponse,
  IGetRepoTreeResponse,
  IGetUserRepoBranchListResponse,
} from "@/services/users/usersType";
import { context } from "@/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, EventHandler, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const parse = require("html-react-parser");

const RepoPage: NextPage = () => {
  const ctx = context();
  const { query } = useRouter();

  const [branchs, setbranchs] = useState<IGetUserRepoBranchListResponse[]>();
  const [tree, settree] = useState<IGetRepoTreeResponse>();
  const [readme, setreadme] = useState<string>();

  useEffect(() => {
    // console.log(ctx.state.userData);
    if (query.repo) {
      handleGetBranchList(String(query.repo));
    }
  }, [query.repo]);

  const handleGetRepoTree = async (
    owner: string,
    repo: string,
    tree_sha: string
  ) => {
    try {
      const res = await getRepoTree(owner, repo, tree_sha);
      settree(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRepoDetail = async (
    owner: string,
    repo: string,
    branch: string
  ) => {
    try {
      const res = await getUserRepoBranchDetail(owner, repo, branch);
      return res.data;
    } catch (error) {}
  };

  const handleGetBranchList = async (repo: string) => {
    try {
      const res = await getUserRepoBranchList(
        { page: 1, limit: 100 },
        ctx.state.userData?.login || "",
        repo
      );
      setbranchs(res.data);

      const repoDetail = await handleGetRepoDetail(
        ctx.state.userData?.login || "",
        repo,
        res.data[0].name
      );
      //   console.log(repoDetail, "detail");
      handleGetRepoTree(
        ctx.state.userData?.login || "",
        repo,
        (repoDetail && repoDetail.commit.sha) || ""
      );

      handleGetReadme(ctx.state.userData?.login || "", repo, res.data[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetReadme = async (
    owner: string,
    repo: string,
    branch: string
  ) => {
    try {
      const res = await getRepoReadme(owner, repo, { ref: branch });
      const buff = Buffer.from(res.data.content, "base64");
      const str = buff.toString("utf8");
      const renderMd = await renderMarkdown({ text: str, mode: "gfm" });

      setreadme(renderMd.data || undefined);
    } catch (error) {
      setreadme(undefined);
    }
  };

  const handleChangeBranch = async (event: ChangeEvent<HTMLSelectElement>) => {
    try {
      if (query.repo) {
        const branch = event.target.value;
        const repoDetail = await handleGetRepoDetail(
          ctx.state.userData?.login || "",
          String(query.repo),
          branch
        );
        //   console.log(repoDetail, "detail");
        handleGetRepoTree(
          ctx.state.userData?.login || "",
          String(query.repo),
          (repoDetail && repoDetail.commit.sha) || ""
        );

        handleGetReadme(
          ctx.state.userData?.login || "",
          String(query.repo),
          branch
        );
      }
    } catch (error) {}
  };

  return (
    <div className="repo-page">
      <div className="repo-page__container">
        <div className="repo-page__head"></div>
        <div className="repo-page__content">
          <div className="repo-page__content__head">
            <div className="repo-page__content__left">
              <select onChange={handleChangeBranch} name="" id="">
                <option disabled>Branch</option>
                {branchs?.map((branch, index) => (
                  <option key={index} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
              {/* <div>Branch</div> */}
            </div>

            <div className="repo-page__content__right"></div>
          </div>
          <div className="repo-page__content__tree">
            <div className="repo-page__content__tree__head">
              <div className="repo-page__content__tree__head__image">
                <Image
                  src={ctx.state.userData?.avatar_url || ""}
                  alt="avatar"
                  fill
                />
              </div>
              <p className="repo-page__content__tree__head__user">
                {ctx.state.userData?.login}
              </p>
            </div>
            {tree?.tree.map((item, index) => (
              <div key={index} className="repo-page__content__tree__item">
                <i>
                  {item.type === "blob" ? (
                    <FontAwesomeIcon size="1x" icon={faFile} />
                  ) : (
                    <FontAwesomeIcon icon={faFolder} />
                  )}
                </i>
                <p>{item.path}</p>
              </div>
            ))}
          </div>
          {readme && (
            <div className="repo-page__content__readme">
              <div className="repo-page__content__readme__head">README.md</div>
              <div className="repo-page__content__readme__data">
                {parse(readme || "")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
