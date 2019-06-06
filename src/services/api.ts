import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello');
}
export async function queryHeroList() {
  return request('/api/herolist.json');
}
export async function getHeroDetails(params) {
  console.info(params);
  return request('/api/herodetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export async function queryItemList() {
  return request('/api/itemList.json');
}
export async function queryItemDetail(params) {
  console.info(params);
  return request('/api/itemDetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export async function querySummonerList() {
  return request('/api/summonerList.json');
}
export async function querySummonerDetail(params) {
  console.info(params);
  return request('/api/summonerDetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export async function getFreeHeros(params) {
  return request('/api/freeheros.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}