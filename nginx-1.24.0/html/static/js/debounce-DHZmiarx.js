import{d as m,k as h,i as t,w as e,b as l,e as f,u as c,h as a,f as o,Y as _,z as b,A as k}from"./index-Zjjfkekr.js";const p=o("div",{class:"font-medium"},"防抖：debounce",-1),C=o("div",{class:"mb-5"}," 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 ",-1),v=o("div",{class:"font-medium"},"节流：throttle",-1),w=o("div",{class:"mb-5"}," 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。 ",-1),D=m({name:"Debounce",__name:"debounce",setup(x){const n=()=>k("恭喜你，这是一条成功消息",{type:"success"}),i=_(n,1e3,!0),r=_(n,1e3),u=b(n);return(B,N)=>{const s=l("el-button"),d=l("el-card");return f(),h("div",null,[t(d,{class:"mb-5",shadow:"never"},{header:e(()=>[p]),default:e(()=>[C,t(s,{onClick:c(i)},{default:e(()=>[a(" 连续点击我，只会执行第一次点击事件，立即执行 ")]),_:1},8,["onClick"]),t(s,{onClick:c(r)},{default:e(()=>[a(" 连续点击我，只会执行最后一次点击事件，延后执行 ")]),_:1},8,["onClick"])]),_:1}),t(d,{shadow:"never"},{header:e(()=>[v]),default:e(()=>[w,t(s,{onClick:c(u)},{default:e(()=>[a(" 连续点击我，每一秒只会执行一次点击事件 ")]),_:1},8,["onClick"])]),_:1})])}}});export{D as default};
