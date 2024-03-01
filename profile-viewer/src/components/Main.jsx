import { getProfiles } from "../services";
import { useState, useEffect } from "react";
import Card from "./Card";
import { FaSpinner } from "react-icons/fa";

export default function Main() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profiles.length === 0) {
      setLoading(true);
    }
    getProfiles(page)
      .then((data) => {
        if (page === 1) {
          setLoading(false);
          setProfiles(data.results);
        } else {
          setLoading(false);
          setProfiles([...profiles, ...data.results]);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [page]);

  return !loading ? (
    <div className="flex flex-col items-center p-5 ">
      <ul className="grid grid-cols-3 gap-4 w-4/5">
        {profiles.map((profile, index) => (
          <li key={index} className="bg-light rounded">
            <Card profile={profile} />
          </li>
        ))}
      </ul>
      {profiles.length > 0 && (
        <button
          onClick={() => setPage(page + 1)}
          className="bg-primary text-3xl text-white p-5 mt-5 rounded-md"
        >
          Load more
        </button>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center p-10 text-3xl">
      <FaSpinner icon="spinner" />
    </div>
  );
}
