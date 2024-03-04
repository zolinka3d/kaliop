export default function Button({ children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="bg-primary text-xl text-white p-3 mt-5 rounded-md"
    >
      {children}
    </button>
  );
}
