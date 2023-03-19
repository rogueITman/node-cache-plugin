<script>
  import { getContext } from "svelte"
  import { cacheApi } from '../index.js';


  export let text

  const { styleable } = getContext("sdk")
  const component = getContext("component")
  const url = "https://api.mashvisor.com/v1.1/client"
  const params = {
    state:"MO",
    page:1,
    items:50,
  } 
  const headers = {
    "x-api-key": "4ebea5e8-286d-492f-a2e4-137f97e1aa8d"
  }
  const key = "ListCities"
  console.log("Component.svelte | cacheApi ...", cacheApi)
  console.log("Component.svelte | Calling cacheApi() ...")
  cacheApi({url, params, headers, key})
</script>

<div use:styleable={$component.styles}>
  This is a custom component. The text setting is: {text}.
</div>
