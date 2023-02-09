import { IUserRepositoryListResponse } from "@/services/users/usersType";
import { context } from "@/store";
import Image from "next/image";
import Link from "next/link";

const RepositoryCard: React.FC<{ data: IUserRepositoryListResponse }> = ({
  data,
}) => {
  const {
    description,
    name,
    license,
    language,
    updated_at,
    forks_count,
    visibility,
    stargazers_count,
    topics,
  } = data;

  const ctx = context();

  return (
    <div className="repository-card">
      <div className="repository-card__container">
        <div className="repository-card__head">
          <Link
            className="repository-card__head__title"
            href={"/user/" + ctx.state.userData?.login + "/" + name}
          >
            {name}
          </Link>
          <div className="repository-card__head__visibility">{visibility}</div>
        </div>
        <p className="repository-card__description">{description}</p>
        <p className="repository-card__topics">
          {topics.map((topic, index) => (
            <div key={index} className="repository-card__topics__item">
              {topic}
            </div>
          ))}
        </p>
        <div className="repository-card__detail">
          <p className="repository-card__detail__language">{language}</p>
          <p className="repository-card__detail__star">{stargazers_count}</p>
          <p className="repository-card__detail__fork">{forks_count}</p>
          {license && <p className="repository-card__detail__license"></p>}
          <p className="repository-card__detail__updated">{updated_at}</p>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
