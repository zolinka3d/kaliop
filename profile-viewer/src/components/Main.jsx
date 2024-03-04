import { getProfiles } from "../services";
import { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./Loader";
import Button from "./ui/Button";

export default function Main() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setPage(page + 1);
  };

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
      .catch(() => {
        setLoading(false);
      });
  }, [page]);

  return !loading ? (
    <div className="flex flex-col items-center p-5">
      <ul className="grid grid-cols-3 gap-4 w-4/5">
        {profiles.map((profile, index) => (
          <Card profile={profile} key={index} />
        ))}
      </ul>
      {profiles.length > 0 && (
        <Button handleClick={handleClick}>Load More</Button>
      )}
    </div>
  ) : (
    <Loader />
  );
}
