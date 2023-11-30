import {
  default as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material/Typography";

const propsMap = {
  display: {
    large: "h1",
    medium: "h2",
    small: "h3",
  },
  headline: {
    large: "h3",
    medium: "h4",
    small: "h5",
  },
  title: {
    large: "h6",
    medium: "subtitle1",
    small: "subtitle2",
  },
  body: {
    large: "body1",
    medium: "body2",
    small: "caption",
  },
  label: {
    large: "button",
    medium: "inherit",
    small: "overline",
  },
} as const satisfies {
  [key in NonNullable<TypographyProps["role"]>]: {
    [key in NonNullable<
      TypographyProps["size"]
    >]: MuiTypographyProps["variant"];
  };
};

export interface TypographyProps extends Omit<MuiTypographyProps, "variant"> {
  role?: "display" | "headline" | "title" | "body" | "label";
  size?: "large" | "medium" | "small";
}

export function Typography(props: TypographyProps) {
  const { role = "body", size = "large", children, ...rest } = props;

  return (
    <MuiTypography variant={propsMap[role][size]} {...rest}>
      {children}
    </MuiTypography>
  );
}
