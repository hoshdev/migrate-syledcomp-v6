export const TAGS = [
  "bgColor",
  "textColor",
  "hoverColor",
  "borderRadius",
  "customBorder",
];

export const TAGS_SET = new Set([
  "bgColor",
  "textColor",
  "hoverColor",
  "borderRadius",
  "customBorder",
]);

const WITHCONFIG_SETUP = {
  shouldForwardProp: (prop) => !TAGS_SET.has(prop),
};
