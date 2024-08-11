interface Props {
  color: string;
}

export default function CircleIcon({ color }: Props) {
  return (
    <div
      className={`h-[13px] w-[13px] rounded-full ${color} shadow-md`}
      style={{ backgroundColor: color }}
    ></div>
  );
}
