export interface IContactDetailUser {
  user_id: string;
  user_id_toko: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
  tko_address: string;
  community_name: string;
  kyc_level: number;
  kyc_status: boolean;
  status: number;
  whatsapp_number: string;
  image?: string;
  is_completed: boolean;
}

export interface IUpdateProfileRequestBody {
  first_name?: string;
  last_name?: string;
  nationality?: string;
  date_of_birth?: string;
  whatsapp_number?: string;
  community_name?: string;
  interested_hosting?: boolean;
}

export interface INationalList {
  Capital: string;
  Continent: string;
  Currency: string;
  Dial: string;
  Iso2: string;
  Iso3: string;
  Name: string;
  Unicode: string;
}

export interface INationalListResponse {
  countries: INationalList[];
}

export type ISorting = "followers" | "repositories" | "joined" | string;

export interface ISearchParams {
  q?: string;
  order?: "desc" | "asc";
  sort?: ISorting;
  per_page?: number;
  page?: number;
}

export interface IGithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  site_admin: true;
}

export interface ISearchUserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IGithubUser[];
}

export interface IUserRepositoriesParams {
  per_page?: number;
  page: number;
  q?: string;
}

export interface ILicense {
  key: string;
  name: string;
  node_id: string;
  spdx_id: string;
  url: string;
}

export interface IUserRepositoryListResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: IGithubUser;
  private: false;
  html_url: string;
  description: string;
  fork: false;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string;
  hooks_url: string;
  svn_url: string;
  homepage: string;
  language: null;
  forks_count: 9;
  stargazers_count: 80;
  watchers_count: 80;
  size: 108;
  default_branch: string;
  open_issues_count: 0;
  is_template: false;
  topics: string[];
  has_issues: true;
  has_projects: true;
  has_wiki: true;
  has_pages: false;
  has_downloads: true;
  has_discussions: false;
  archived: false;
  disabled: false;
  visibility: string;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions: {
    admin: false;
    push: false;
    pull: true;
  };
  license?: ILicense;
  security_and_analysis: {
    advanced_security: {
      status: string;
    };
    secret_scanning: {
      status: string;
    };
    secret_scanning_push_protection: {
      status: string;
    };
  };
}

export interface IGetRepoParam {
  page: number;
  limit: number;
  protected?: boolean;
}

export interface IGetUserRepoBranchListResponse {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: true;
  protection: {
    required_status_checks: {
      enforcement_level: string;
      contexts: [string, string];
    };
  };
  protection_url: string;
}

export interface IGetUserRepoBranchDetailResponse {
  name: string;
  commit: {
    sha: string;
    node_id: string;
    commit: {
      author: {
        name: string;
        email: string;
        date: string;
      };
      committer: {
        name: string;
        email: string;
        date: string;
      };
      message: string;
      tree: {
        sha: string;
        url: string;
      };
      url: string;
      comment_count: number;
      verification: {
        verified: false;
        reason: string;
        signature: null;
        payload: null;
      };
    };
    url: string;
    html_url: string;
    comments_url: string;
    author: IGithubUser;
    committer: {
      login: string;
      id: 583231;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: false;
    };
    parents: [
      {
        sha: string;
        url: string;
        html_url: string;
      },
      {
        sha: string;
        url: string;
        html_url: string;
      }
    ];
  };
  _links: {
    self: string;
    html: string;
  };
  protected: false;
  protection: {
    enabled: false;
    required_status_checks: {
      enforcement_level: string;
      contexts: [];
      checks: [];
    };
  };
  protection_url: string;
}

export interface IGetReadmeParams {
  ref?: string;
}

export interface IRenderMarkdownBody {
  text: string;
  mode?: "markdown" | "gfm";
  context?: string;
}

export interface IGetRepoTreeResponse {
  sha: string;
  url: string;
  tree: {
    path: string;
    mode: string;
    type: "blob" | "tree";
    size: number;
    sha: string;
    url: string;
  }[];
  truncated: boolean;
}

export interface IGetRepoReadmeResponse {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    git: string;
    self: string;
    html: string;
  };
}
