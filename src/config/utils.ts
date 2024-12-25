const BASE_URL =
  process.env.MODE === "production"
    ? process.env.MAIN_DOMAIN
    : process.env.LOCAL_DOMAIN;



  export {BASE_URL}