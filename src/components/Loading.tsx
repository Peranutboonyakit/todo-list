interface LoadingIconProps {
  size: number;
}

const LoadingIcon = (props: LoadingIconProps) => {
  const { size } = props;
  return (
    <div
      className="container-loading"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
export default LoadingIcon;
