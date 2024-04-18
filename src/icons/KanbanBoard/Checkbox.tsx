interface Props {
  strokeWidth: number;
  viewBox: string;
}

export default function Checkbox({
  strokeWidth = 1.2,
  viewBox = "0 0 27 27",
}: Props) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={viewBox}
        strokeWidth={strokeWidth}
        color="#9199a5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M915 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
