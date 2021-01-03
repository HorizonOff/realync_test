<template>
  <div class="row card-body">
    <div class="col-3">
      {{event.title}}
    </div>
    <div class="col-5">
      {{event.description}}
    </div>
    <div class="col-2">
      {{event.formattedStartDate}}
    </div>
    <div class="col-2">
      {{event.formattedEndDate}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {}
    },
    getEvents: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
