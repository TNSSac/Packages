// export const isSilkBrowser = () => {
//   // Logic to determine if the browser is Silk
//   return navigator.userAgent.includes("Silk");
// };

export const isSilkBrowser = () => {
  const ua = navigator.userAgent;

  // Detects standalone Silk, the integrated web platform, and Fire TV hardware codes
  return (
    /\bSilk\b/.test(ua) ||
    ua.includes("AmazonWebAppPlatform") ||
    /\bAFT[BSTM]\b/.test(ua)
  );

  //uncomment below for testing, and comment out the actual detection logic above
  // return true;
};
