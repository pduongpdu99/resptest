class User {
  /**
   * from json
   * @param {*} params
   */
  fromJson(params) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.password = params.password;
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

module.exports = { User };
