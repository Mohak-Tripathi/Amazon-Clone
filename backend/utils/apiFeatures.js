class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    // console.log(this.queryStr)
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            //name here is one of the field in model so we are searching in there
            $regex: this.queryStr.keyword,
            $options: "i", //case-insensitive
          },
        }
      : {};

    // console.log(keyword)

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    console.log(queryCopy);

    // Removing fields from the query

    //This removeFields logic is now kind of redundent after mongoose upgradation
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    console.log(queryCopy);

    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // whole process to add "$" sign before query.

    console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    //    this.query = this.query.find(queryCopy);  /initially we wrote this line then moved to above line when we wrote "advance filter"
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this; 
  }
}

module.exports = APIFeatures;
