<script lang="ts">
  import CurrencyInput from "./components/CurrencyInput/CurrencyInput.svelte";
import { getConvRates } from "./utils/getConvRates";
  let rates = getConvRates("USD")
  let currency1 = "USD"
  let currency2 = "USD"
  let input1 = 1
  let input2 = 1

  interface CurrencyDetail {
    currency: string;
    value: number;
  }

  interface Rates {
    [currency: string]: number;
  }


  const upperUpdateValue = (event: CustomEvent<CurrencyDetail>,dict:Rates)=>{
    input2= event.detail.value * dict[currency2];
  }

  const lowerUpdateValue = (event: CustomEvent<CurrencyDetail>,dict:Rates)=>{
    input1= event.detail.value / dict[currency2];
  }

  const upperUpdateCurency = (event: CustomEvent<CurrencyDetail>,dict:Rates)=>{
    currency1 = event.detail.currency
    rates = getConvRates(event.detail.currency)
    input1 = input2/dict[event.detail.currency]
  }

  const lowerUpdateCurrency = (event: CustomEvent<CurrencyDetail>,dict:Rates)=>{
    currency2 = event.detail.currency
    input2 = input1*dict[event.detail.currency]
  }

</script>

<div class="header">
  КОНВЕРТЕР ВАЛЮТ
</div>

<main>
  <div class="currencyConverter">
    {#await rates}
      <div>LOADING...</div>
    {:then rates}
      <CurrencyInput
       input_value={input1} 
       selected={currency1} 
       rates={rates}
       on:updateValue={(ev)=>upperUpdateValue(ev,rates)}
       on:updateCurrency={(ev)=>upperUpdateCurency(ev,rates)}
       />
      <CurrencyInput 
      input_value={input2} 
      selected={currency2} 
      rates={rates} 
      on:updateValue={(ev)=>lowerUpdateValue(ev,rates)}
      on:updateCurrency={(ev)=>lowerUpdateCurrency(ev,rates)}
      />
    {/await}
  </div>
</main>

<style>
  .currencyConverter{
    display: flex;
    flex-direction: column;
    gap:20px;
  }
  
  .header{
    font-size: 64px;
    text-align: center;
    margin-bottom: 50px;
  }
</style>
