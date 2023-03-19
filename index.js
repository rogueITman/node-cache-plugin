import Wrapper from "./lib/Wrapper.svelte"
import schema from "./schema.json"
import pkg from "./package.json"
import axios from 'axios';
import NodeCache from 'node-cache';
//import NodeCache from './node-cache-master/node_modules/node-cache/lib/node_cache';
//const NodeCache = require('node-cache/lib/node_cache');
console.log("Logging NodeCache: ...", NodeCache);
// Initialize the cache with the appropriate options.
const cache = new NodeCache({ stdTTL: 259200, checkperiod: 259200, useClones: true });
console.log("Logging Cache: ...", cache);

// Define your plugin's entry point function.
export async function cacheApi(props) {
  console.log("Index.js | NodeCache | cacheApi() | props: ",props);
  // Check if there is a cached result for the API call.
  const cachedResult = cache.get(props.key);
  if (cachedResult) {
    // Use the cached result.
    return { data: cachedResult };
  } else {
    // Call the API and cache the result.
    const result = await callApi(props);
    cache.set(props.key, result);
    // Return the result.
    return { data: result };
  }
}

// Define a function to call the API.
async function callApi(props) {
    console.log("Index.js | NodeCache | callApi()...");
    const { url, headers } = props;
    console.log("Index.js | NodeCache | url ...", url);
    console.log("Index.js | NodeCache | headers ...", headers);
    debugger;
    // Make the API request using the axios library
    const response = await axios.get({"url":url, headers});

    console.log("Index.js | NodeCache | callApi() | response: ",response);
    // Return the API response data.
    return response.data;
}

if (window) {
    const plugin = { Component: Wrapper, schema, version: pkg.version, cacheApi }
    if (!window["##BUDIBASE_CUSTOM_COMPONENTS##"]) {
        window["##BUDIBASE_CUSTOM_COMPONENTS##"] = []
    }
    window["##BUDIBASE_CUSTOM_COMPONENTS##"].push(plugin)
    if (window.registerCustomComponent) {
        window.registerCustomComponent(plugin)
    }
}

export const Component = Wrapper
export const version = pkg.version
export { schema }
