class Token {
  /**
   * from json
   * @param {*} params
   */
  fromJson(params) {
    this.id = params.id;
    this.userId = params.userId;
    this.refreshToken = params.refreshToken;
    this.expiresIn = params.expiresIn;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  /**
   * to json
   * @returns
   */
  toJson() {
    let result = { ...this };
    for (const [k, v] of Object.entries(result)) {
      if (!v) delete result[k];
    }
    return result;
  }
}

module.exports = { Token };
