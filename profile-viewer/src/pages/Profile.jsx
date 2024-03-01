import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import ProfileCreadentials from "../components/ProfileCreadentials";

export default function Profile() {
  const location = useLocation();
  const profile = location.state?.profile;

  if (!profile) {
    return (
      <div>
        <Navbar>Profile</Navbar>
        <p>Loading profile or profile not found...</p>
      </div>
    );
  }
  return (
    <div>
      <Navbar>Profile</Navbar>
      {profile.name ? <ProfileCreadentials profile={profile} /> : "Loading..."}
    </div>
  );
}
