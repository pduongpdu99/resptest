const cookieParse = (cookieStr) => {
  let output = {};
  cookieStr.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    output[pair[0]] = pair[1];
  });
  return output;
};

module.exports = {
  cookieParse,
};
