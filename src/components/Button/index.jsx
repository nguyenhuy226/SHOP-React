import { cn } from "@/utils";
import { LoadingOutlined } from "@ant-design/icons";
export const Button = ({ outline, primary, children, loading, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "btn btn-sm  flex items-center justify-center gap-2",
        {
          "disabled pointer-events-none": loading,
          "btn-dark": !outline,
          "btn-outline-dark": outline,
        },
        props.className
      )}
    >
      {loading && <LoadingOutlined />}
      {children}
    </button>
  );
};
