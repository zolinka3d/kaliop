import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-10 text-3xl">
      <FaSpinner icon="spinner" />
    </div>
  );
}
