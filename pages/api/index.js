import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          'X-RapidAPI-Key':
            '6317c75c26mshe20de65686ada37p1957adjsn89af3468170e',
        },
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

// export const getPlacesData = async (type, sw, ne) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(
//       `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
//       options
//     );
//     return data;
//   } catch (error) {
//     console.log(`Fetch data Error : ${error}`);
//   }
// };
