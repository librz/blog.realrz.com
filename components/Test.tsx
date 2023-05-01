export default ({ text }: { text: string }) => {
  return (
    <div style={{ fontSize: 20, color: "orange" }}>{text.repeat(10)}</div>
  )
}