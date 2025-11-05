import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, about, photoUrl } = user;

  return (
    <div className="card bg-base-100 w-70 shadow-xl border border-base-200 hover:shadow-xl m-5 hover:scale-[1.01] transition duration-200 cursor-pointer rounded-2xl">
      <figure className="h-56 overflow-hidden rounded-t-2xl p-4">
        <img src={photoUrl} alt="user" className="object-cover w-full h-full" />
      </figure>

      <div className="card-body space-y-2">
        <h2 className="card-title text-lg font-semibold">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-2">{about}</p>

       <div className="card-actions justify-between pt-2">
  <button className="btn btn-sm btn-error btn-outline rounded-full">Ignore</button>
  <button className="btn btn-sm btn-success rounded-full">Interested</button>
</div>
      </div>
    </div>
  );
};

export default UserCard;
