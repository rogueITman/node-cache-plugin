import Wrapper from "./lib/Wrapper.svelte"
import schema from "./schema.json"
import pkg from "./package.json"
import axios from 'axios';
import NodeCache from './node-cache-master/_src/lib/node_cache';

//const NodeCache = require('node-cache/lib/node_cache');

// Initialize the cache with the appropriate options.
const cache = new NodeCache({ stdTTL: 259200, checkperiod: 259200, useClones: true });

// Define your plugin's entry point function.
async function myPlugin(props) {
  console.log("NodeCache | myPlugin() | props: ",props);
  // Check if there is a cached result for the API call.
  const cachedResult = cache.get('apiResult');
  if (cachedResult) {
    // Use the cached result.
    return { data: cachedResult };
  } else {
    // Call the API and cache the result.
    const result = await callApi(props);
    cache.set('apiResult', result);
    // Return the result.
    return { data: result };
  }
}

// Define a funnction to call the API.
async function callApi(props) {
  console.log("NodeCache | callApi()...");
    const { url, params, headers } = props;

    // Make the API request using the axios library
    const response = await axios.get(url, { params, headers});

    console.log("NodeCache | myPlugin() | response: ",response);
    // Return the API response data.
    return response.data;
}

if (window) {
    const plugin = { Component: Wrapper, schema, version: pkg.version, myPlugin }
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
