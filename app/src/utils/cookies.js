const setCookie = (name, value, exdays=0) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = (exdays===0) ? "" : "expires="+d.toUTCString() + ";path=/";
  document.cookie = name + "=" + JSON.stringify(value) + ";" + expires;
};

const getCookie = (cname) => {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
};

const getRichCookie = (cname) => {
  const cookie = getCookie(cname);
  try {
    return JSON.parse(cookie)
  } catch {
    return cookie;
  }
};

export { setCookie, getCookie, getRichCookie };