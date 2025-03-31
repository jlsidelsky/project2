import { HTMLAttributes, ReactNode } from "react";
import styles from "./Box.module.css";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  childProps?: HTMLAttributes<HTMLDivElement>;
}

const Box = ({ title, children, childProps, ...props }: BoxProps) => {
  return (
    <div {...props} className={styles.container}>
      <div>
        <h6>{title}</h6>
      </div>
      <div {...childProps}>{children}</div>
    </div>
  );
};

export default Box;
// import { ReactNode } from "react";
// import styles from "./Box.module.css";

// interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
//   title: string;
//   children: ReactNode;
//   childProps?: React.HTMLProps<HTMLDivElement>;
// }

// const Box = ({ title, children, childProps = {}, ...props }: BoxProps) => {
//   // Pull `ref` out so we can assign it directly
//   const { ref: childRef, ...restChildProps } = childProps;

//   return (
//     <div {...props} className={styles.container}>
//       <header>
//         <h6>{title}</h6>
//       </header>
//       <div ref={childRef} {...restChildProps}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Box;
