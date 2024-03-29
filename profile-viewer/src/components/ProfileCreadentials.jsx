import CreadentialsDetails from "./CreadentialsDetails";

export default function ProfileCreadentials({ profile }) {
  return (
    <div className="flex justify-center items-center p-5 ">
      <div className="bg-light flex flex-col p-10 rounded gap-2 shadow-lg">
        <img
          className="rounded-full w-30 h-30 m-auto"
          src={profile.picture.large}
          alt="Profile"
        />
        <div className="flex gap-3 text-3xl ">
          <div>{profile.name.first}</div>
          <div>{profile.name.last}</div>
        </div>
        <div>{profile.email}</div>

        <CreadentialsDetails
          details={profile.location.country + ", " + profile.location.state}
        >
          Location:
        </CreadentialsDetails>
        <CreadentialsDetails
          details={
            profile.registered.date.slice(0, 10) +
            ", " +
            profile.registered.date.slice(11, 16)
          }
        >
          Registered:
        </CreadentialsDetails>
        <CreadentialsDetails details={profile.dob.date.slice(0, 10)}>
          Born:
        </CreadentialsDetails>
      </div>
    </div>
  );
}
