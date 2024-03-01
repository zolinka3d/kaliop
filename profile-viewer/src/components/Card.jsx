import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function Card({ profile }) {
  const navigate = useNavigate();

  const [seenProfile, setSeenProfile] = useState(false);

  const handleClick = () => {
    let retArray = localStorage.getItem("seenProfiles");

    retArray = retArray ? JSON.parse(retArray) : [];

    if (!retArray.includes(profile.email)) {
      retArray.push(profile.email);
    }
    localStorage.setItem("seenProfiles", JSON.stringify(retArray));

    console.log(localStorage.getItem("seenProfiles"));

    navigate("/profile", { state: { profile } });
  };

  useEffect(() => {
    let retArray = localStorage.getItem("seenProfiles");
    retArray = retArray ? JSON.parse(retArray) : [];

    if (retArray.includes(profile.email)) {
      setSeenProfile(true);
    }
  }, []);

  return (
    <div className="flex flex-col p-5 justify-center items-center">
      <img
        className="rounded-full w-30 h-30 m-auto"
        src={profile.picture.large}
        alt="Profile"
      />
      <div className="p-5 flex gap-3 text-3xl ">
        <div>{profile.name.first}</div>
        <div>{profile.name.last}</div>
      </div>
      <div>{profile.email}</div>
      <button
        className="bg-primary text-white p-3 rounded-md mt-5"
        onClick={handleClick}
      >
        View Profile
      </button>
      {seenProfile && (
        <div className="flex gap-1 items-center p-1">
          <div>Seen</div>
          <FaCheck />
        </div>
      )}
    </div>
  );
}
