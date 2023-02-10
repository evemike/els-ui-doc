<script setup lang="ts">
import {ref} from "vue"
import {ElsForm} from "../index"
import {Elem} from "../../ElsElem"
import {ElInputNumber,ElDivider, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup, ElSelect, ElSelectV2, ElDatePicker, ElTimePicker, ElTimeSelect, ElSwitch, ElSlider, ElCascader, ElCascaderPanel, ElTransfer, ElAutocomplete} from "element-plus"
//
const column = [
  {prop:'input',label:"INPUT",value:"this is a ElInput Elem"},
  {prop:'textarea',label:"TEXTAREA",type:"textarea"},
  {tag:ElInputNumber,prop:'inputnumber',label:"INPUT NUMBER"},
  {tag:ElRadio,prop:'radio',label:"radio1",cls:"this is a radio",elFormItem:{label:"RADIO"}},
  {tag:ElRadioGroup,prop:'radiogroup',label:"RADIO GROUP",cls:[{label:"radioA"},{label:"radioB",cls:"radio2"}]},
  {tag:ElCheckbox,prop:"checkbox",label:"checkbox1",elFormItem:{label:"CHECKBOX"}},
  {tag:ElCheckboxGroup,prop:"checkboxgroup",label:"CHECKBOX GROUP",cls:[{label:"checkboxA"},{label:"checkboxB",cls:"checkbox2"}]},
  {tag:ElSelect,prop:"select",label:"SELECT",cls:[{value:"selectA"},{value:"selectB",label:"select2"}]},
  {tag:ElSelectV2,prop:"selectV2",label:"SELECT V2",options:[{value:"selectA"},{value:"selectB",label:"select2"}]},
  {tag:ElDatePicker,prop:"datepicker",label:"DATE PICKER",type:"date",valueFormat:"YYYY-MM-DD HH:mm:ss"},
  {tag:ElDatePicker,prop:"datetimepicker",label:"DATE TIME PICKER",type:"datetime",valueFormat:"YYYY-MM-DD HH:mm:ss"},
  {tag:ElTimePicker,prop:"timepicker",label:"TIME PICKER",valueFormat:"YYYY-MM-DD HH:mm:ss"},
  {tag:ElTimeSelect,prop:"timeselect",label:"TIME SELECT"},
  {tag:ElSwitch,prop:"switch",label:"SWITCH"},
  {tag:ElSlider,prop:"slider",label:"SLIDER"},
  {tag:ElCascader,prop:"cascader",label:"CASCADER",options:[{value:"groupA",label:"GA",children:[{value:"A",label:"A"},{value:"b",label:"B"}]}]},
  {tag:ElCascaderPanel,prop:"cascaderpanel",label:"CASCADER PANEL",options:[{value:"groupA",label:"GA",children:[{value:"A",label:"A"},{value:"b",label:"B"}]}]},
  {tag:ElTransfer,prop:"transfer",label:"TRANSFER",data:[{key:1,label:"A"},{key:2,label:"B"},{key:3,label:"C",disabled:true},{key:4,label:"D"}]},
  {tag:ElAutocomplete,prop:"autocomplete",label:"AUTO COMPLETE",fetchSuggestions:(s:string,cb:(d:any) => void) => cb("abcdefghijklmn1234567890".split('').filter(v => v.includes(s)).map(value => ({value})))}
]

const data = ref<Record<string,any>>({})

</script>

<template>
  <div style="display:flex;justify-content:space-between">    
    <els-form style="width:49%;max-height:calc(100vh - 300px);overflow:auto;" v-model="data" :column="column" ></els-form>
    <el-divider direction="vertical" style="height:auto"></el-divider>
    <div style="width:49%;max-height:calc(100vh - 300px);overflow:auto;">
      <pre>{{ JSON.stringify(data,null,2) }}</pre>
    </div>
    
  </div>
</template>