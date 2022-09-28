const cookieParse = (cookieStr) => {
  let output = {};
  cookieStr.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    output[pair[0]] = pair.splice(1).join("=");
  });
  return JSON.stringify(output, null, 4);
};

module.exports = {
  cookieParse,
};
