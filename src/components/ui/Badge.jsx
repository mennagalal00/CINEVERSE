function Badge({ children, className = "" }) {
  return (
    <span className={"text-xs font-semibold px-2.5 py-0.5 rounded-full " + className}>
      {children}
    </span>
  );
}
export default Badge;
