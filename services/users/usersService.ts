import { AxiosResponse } from "axios";
import { instance } from "../instance";
import { IResponseTemplate } from "../types";
import {
  IGetReadmeParams,
  IGetRepoParam,
  IGetRepoReadmeResponse,
  IGetRepoTreeResponse,
  IGetUserRepoBranchDetailResponse,
  IGetUserRepoBranchListResponse,
  IRenderMarkdownBody,
  ISearchParams,
  ISearchUserResponse,
  IUserRepositoriesParams,
  IUserRepositoryListResponse,
} from "./usersType";

export const getGithubUsers = (params: ISearchParams) => {
  return new Promise<AxiosResponse<ISearchUserResponse>>((resolve, reject) => {
    instance
      .get("/search/users", {
        params,
        headers: {
          accept: "application/vnd.github+json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const getRepositoriesByUser = (
  params: IUserRepositoriesParams,
  username: string
) => {
  return new Promise<AxiosResponse<IUserRepositoryListResponse[]>>(
    (resolve, reject) => {
      instance
        .get("/users/" + username + "/repos", {
          params,
          headers: {
            accept: "application/vnd.github+json",
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    }
  );
};

export const getUserRepoBranchList = (
  params: IGetRepoParam,
  owner: string,
  repo: string
) => {
  return new Promise<AxiosResponse<IGetUserRepoBranchListResponse[]>>(
    (resolve, reject) => {
      instance
        .get(`/repos/${owner}/${repo}/branches`, {
          params,
          headers: {
            accept: "application/vnd.github+json",
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    }
  );
};

export const getUserRepoBranchDetail = (
  owner: string,
  repo: string,
  branch: string
) => {
  return new Promise<AxiosResponse<IGetUserRepoBranchDetailResponse>>(
    (resolve, reject) => {
      instance
        .get(`/repos/${owner}/${repo}/branches/${branch}`, {
          headers: {
            accept: "application/vnd.github+json",
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    }
  );
};

export const getRepoReadme = (
  owner: string,
  repo: string,
  params: IGetReadmeParams
) => {
  return new Promise<AxiosResponse<IGetRepoReadmeResponse>>(
    (resolve, reject) => {
      instance
        .get(`/repos/${owner}/${repo}/readme`, {
          params,
          headers: {
            accept: "application/vnd.github+json",
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    }
  );
};

export const renderMarkdown = (body: IRenderMarkdownBody) => {
  return new Promise<AxiosResponse<string>>((resolve, reject) => {
    instance
      .post(`/markdown`, body)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const getRepoTree = (owner: string, repo: string, tree_sha: string) => {
  return new Promise<AxiosResponse<IGetRepoTreeResponse>>((resolve, reject) => {
    instance
      .get(`/repos/${owner}/${repo}/git/trees/${tree_sha} `, {
        headers: {
          accept: "application/vnd.github+json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
