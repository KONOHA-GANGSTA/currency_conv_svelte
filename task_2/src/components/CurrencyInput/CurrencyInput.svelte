<script lang='ts'>
    export let selected:string
    export let input_value:number
    export let rates

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    const updateValue = ()=>{
        dispatch("updateValue",{
            value: input_value
        })
    }
    const updateCurrency = ()=>{
        dispatch("updateCurrency",{
            currency:selected
        })
    }


</script>

<div class="currency_input">
    <div class="input">
        <input type="number" min="1" bind:value={input_value} on:input={updateValue}>
    </div>
    <div class="select">
        <select bind:value={selected} on:change={updateCurrency}>
            {#each Object.keys(rates) as rate}
                <option>{rate}</option>
            {/each}
        </select>
    </div>
</div>

<style>
    .currency_input{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;

    }
    .input input,
    .select select{
        font-size: 24px;
    }

    .select select{
        width: 50%;
    }

</style>