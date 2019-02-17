export const isClient: boolean =
  typeof window !== "undefined" && !!window.document && !!window.document.createElement;
