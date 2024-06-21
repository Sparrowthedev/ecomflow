import Airtable from "airtable";
import { getSession } from "./lib";

const API_KEY="patJdIiBbm41UKdxS.9c9562d3d0818232c152b3ff1d8f0e05481e12804f54ce91f4311d777707824d"
const BASE_ID="appzrJrTNKVqEJ5fw"

const base = new Airtable({apiKey: API_KEY}).base(BASE_ID);

export const getUserByUsername = async (username: string) => {
  const records = await base('Users').select({
    filterByFormula: `{username} = '${username}'`,
  }).firstPage();
  return records.length ? { id: records[0].id, fields: records[0].fields } : null;
};

export const getPayments = async (id: number) => {
  const records = await base('Payments').select({
    sort: [{ field: 'date', direction: 'desc' }],
    filterByFormula: `{user} = '${id}'`
  }).all();
  return records.map(record => ({
    id: record.id,
    fields: record.fields,
  }));
};
