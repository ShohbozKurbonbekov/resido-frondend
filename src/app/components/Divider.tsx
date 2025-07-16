type DividerProp = {
  height: string;
  bgColor: string;
  width: string;
  marginTop: string;
};
export default function Divider({
  bgColor,
  height = "1px",
  width,
  marginTop = "5px",
}: DividerProp) {
  return (
    <div
      style={{
        height,
        width,
        marginTop,
        backgroundColor: `${bgColor}`,
      }}
    ></div>
  );
}
