
import herolist from './herolist.json'
import itemList from './item.json'
import summonerList from './summoner.json'
export default {
  '/api/herolist.json': herolist,
  'POST /api/herodetails.json': (req, res) => {
    const { ename } = req.body;
    const hero = herolist.filter(item => item.ename === parseInt(ename, 10))[0];
    res.send(hero);
  },
  '/api/itemList.json': itemList,
  'POST /api/itemDetails.json': (req, res) => {
    const { item_id } = req.body;
    const itemDetail = itemList.filter(item => item.item_id === parseInt(item_id, 10))[0];
    res.send(itemDetail);
  },
  '/api/summonerList.json': summonerList,
  'POST /api/summonerDetails.json': (req, res) => {
    const { summoner_id } = req.body;
    const summonerDetail = summonerList.filter(item => item.summoner_id === parseInt(summoner_id, 10))[0];
    res.send(summonerDetail);
  },
  'POST /api/freeheros.json':(req,res)=>{
    const { number } = req.body;
    function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  },
};
