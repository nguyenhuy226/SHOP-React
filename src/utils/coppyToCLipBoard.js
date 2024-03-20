export const coppyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {}
};
