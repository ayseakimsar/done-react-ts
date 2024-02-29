interface Props {
  color: string;
}

export default function CircleIcon({ color }: Props) {
  return (
    <div className={`w-[13px] h-[13px] rounded-full ${color} shadow-md`}></div>
  );
}
