export default function CreadentialsDetails({ children, details }) {
  return (
    <div>
      <div className="text-2xl">{children}</div>
      <div>{details}</div>
    </div>
  );
}
