interface Props {
  color: string;
}
export default function ProjectIcon({ color }: Props) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 5C0.75 2.65279 2.65279 0.75 5 0.75H14C16.3472 0.75 18.25 2.65279 18.25 5V14C18.25 16.3472 16.3472 18.25 14 18.25H5C2.65279 18.25 0.75 16.3472 0.75 14V5Z"
        fill="white"
        stroke={color}
        stroke-width="1.5"
      />
      <path d="M11.75 1L11.75 17.5" stroke={color} stroke-width="1.5" />
      <line
        x1="11"
        y1="5.25"
        x2="18"
        y2="5.25"
        stroke={color}
        stroke-width="1.5"
      />
      <line
        x1="11"
        y1="9.25"
        x2="18"
        y2="9.25"
        stroke={color}
        stroke-width="1.5"
      />
      <path d="M11 13H18.1881" stroke={color} stroke-width="1.5" />
      <line x1="11" y1="8.75" y2="8.75" stroke={color} stroke-width="1.5" />
    </svg>
  );
}
