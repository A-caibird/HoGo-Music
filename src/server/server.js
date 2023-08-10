import axios from 'axios';

const getData = async () => {
  try {
    const response = await axios.get('https://apis.bemfa.com/va/getmsg?uid=7c102391cca1495d9aa6267c6570eb99&topic=val&type=1');
    let data = response.data.data[0];
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


setInterval(getData, 1000);
