<template>
  <div class="bridge column-flex">
    <span class="fl2 bold-500 bottom-margin">Bridge</span>
    <div class="flex flex-end-align bottom-margin">
      <bridge-route-token flow="From"></bridge-route-token>
      <base-icon
        class="side-margin cursor-pointer bridge__converter-icon"
        color="nero"
        icon-path="general/converter"
      ></base-icon>
      <bridge-route-token flow="To"></bridge-route-token>
    </div>
    <bridge-route-currency
      flow="from"
      @amount-value="amountValue"
    ></bridge-route-currency>
    <bridge-route-currency
      flow="to"
      @amount-value="amountValue"
    ></bridge-route-currency>
    <button class="button--full bold-500">Select Route</button>
  </div>
</template>

<script>
export default {
  methods: {
    amountValue() {},
  },
}
</script>
