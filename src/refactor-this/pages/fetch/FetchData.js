import axios from "axios";
const FetchData = async ({ page, category }) => {
  // fetch data with category and page variable

  var arr = [];
  const one = `http://localhost:8888/images?category=${category.toLowerCase()}&page=${
    page * 3
  }`;
  const two = `http://localhost:8888/images?category=${category.toLowerCase()}&page=${
    page * 3 - 1
  }`;
  const three = `http://localhost:8888/images?category=${category.toLowerCase()}&page=${
    page * 3 - 2
  }`;

  console.log(three);
  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);

  // multiple fetch at once
  await axios
    .all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        arr = [];
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data;
        const responesThree = responses[2].data;
        arr.push(...responseOne, ...responseTwo, ...responesThree);
      })
    )
    .catch((errors) => {
      console.log(errors);
    });

  return arr;
};

export default FetchData;
