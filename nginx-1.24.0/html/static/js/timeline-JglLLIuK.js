import{d as h,D as x,bb as d,c as j,w as o,b as m,e as u,f as l,i as r,k as f,l as _,h as w,B,F as y,bc as I,p as C,q as F,_ as R}from"./index-Zjjfkekr.js";import{u as q}from"./hooks-Cd3mbshJ.js";import{d as N}from"./iphone-CgGaW-_Y.js";function v(e){return h({name:"ReFlicker",render(){var i,t,c,a,s;return x("div",{class:"point point-flicker",style:{"--point-width":(i=e==null?void 0:e.width)!=null?i:"12px","--point-height":(t=e==null?void 0:e.height)!=null?t:"12px","--point-background":(c=e==null?void 0:e.background)!=null?c:"var(--el-color-primary)","--point-border-radius":(a=e==null?void 0:e.borderRadius)!=null?a:"50%","--point-scale":(s=e==null?void 0:e.scale)!=null?s:"2"}},{default:()=>[]})}})}var S={pkg:{name:"vue-pure-admin",version:"5.0.0",engines:{node:"^18.18.0 || ^20.9.0 || >=21.1.0",pnpm:">=8.6.10"},dependencies:{"@amap/amap-jsapi-loader":"^1.0.1","@howdyjs/mouse-menu":"2.0.9","@logicflow/core":"^1.2.22","@logicflow/extension":"^1.2.22","@pureadmin/descriptions":"^1.2.0","@pureadmin/table":"^3.0.2","@pureadmin/utils":"^2.4.4","@vueuse/core":"^10.8.0","@vueuse/motion":"^2.1.0","@wangeditor/editor":"^5.1.23","@wangeditor/editor-for-vue":"^5.1.12","@zxcvbn-ts/core":"^3.0.4","animate.css":"^4.1.1",axios:"^1.6.7","china-area-data":"^5.0.1",cropperjs:"^1.6.1",dayjs:"^1.11.10",echarts:"^5.5.0","el-table-infinite-scroll":"^3.0.3","element-plus":"^2.5.6","intro.js":"^7.2.0","js-cookie":"^3.0.5",jsbarcode:"^3.11.6",localforage:"^1.10.0","mint-filter":"^4.0.3",mitt:"^3.0.1",nprogress:"^0.2.0",path:"^0.12.7",pinia:"^2.1.7","pinyin-pro":"^3.19.6","plus-pro-components":"^0.0.1",qrcode:"^1.5.3",qs:"^6.11.2","responsive-storage":"^2.2.0",sortablejs:"^1.15.2",swiper:"^11.0.6",typeit:"8.7.1","v-contextmenu":"^3.2.0","v3-infinite-loading":"^1.3.1","version-rocket":"^1.7.1",vue:"3.4.14","vue-i18n":"^9.9.1","vue-json-pretty":"^2.3.0","vue-pdf-embed":"1.2.1","vue-router":"^4.3.0","vue-tippy":"^6.4.1","vue-types":"^5.1.1","vue-virtual-scroller":"2.0.0-beta.8","vue-waterfall-plugin-next":"^2.3.1","vue3-danmaku":"^1.6.0",vuedraggable:"^4.1.0","wavesurfer.js":"^7.7.3",xgplayer:"^3.0.13",xlsx:"^0.18.5"},devDependencies:{"@commitlint/cli":"^18.6.1","@commitlint/config-conventional":"^18.6.2","@commitlint/types":"^18.6.1","@eslint/js":"^8.57.0","@faker-js/faker":"^8.4.1","@iconify-icons/ep":"^1.2.12","@iconify-icons/ri":"^1.2.10","@iconify/vue":"^4.1.1","@intlify/unplugin-vue-i18n":"^2.0.0","@pureadmin/theme":"^3.2.0","@types/gradient-string":"^1.1.5","@types/intro.js":"^5.1.5","@types/js-cookie":"^3.0.6","@types/node":"^20.11.20","@types/nprogress":"^0.2.3","@types/qrcode":"^1.5.5","@types/qs":"^6.9.11","@types/sortablejs":"^1.15.8","@typescript-eslint/eslint-plugin":"^7.0.2","@typescript-eslint/parser":"^7.0.2","@vitejs/plugin-vue":"^5.0.4","@vitejs/plugin-vue-jsx":"^3.1.0",autoprefixer:"^10.4.17",boxen:"^7.1.1",cloc:"^2.11.0",cssnano:"^6.0.5",eslint:"^8.57.0","eslint-config-prettier":"^9.1.0","eslint-define-config":"^2.1.0","eslint-plugin-prettier":"^5.1.3","eslint-plugin-vue":"^9.22.0","gradient-string":"^2.0.2",husky:"^9.0.11","lint-staged":"^15.2.2",postcss:"^8.4.35","postcss-html":"^1.6.0","postcss-import":"^16.0.1","postcss-scss":"^4.0.9",prettier:"^3.2.5",rimraf:"^5.0.5","rollup-plugin-visualizer":"^5.12.0",sass:"^1.71.1",stylelint:"^16.2.1","stylelint-config-recess-order":"^4.6.0","stylelint-config-recommended-vue":"^1.5.0","stylelint-config-standard-scss":"^13.0.0","stylelint-prettier":"^5.0.0",svgo:"^3.2.0",tailwindcss:"^3.4.1",typescript:"^5.3.3",vite:"^5.1.4","vite-plugin-cdn-import":"^0.3.5","vite-plugin-compression":"^0.5.1","vite-plugin-fake-server":"^2.1.1","vite-plugin-remove-console":"^2.2.0","vite-plugin-router-warn":"^1.0.0","vite-svg-loader":"^5.1.0","vue-eslint-parser":"^9.4.2","vue-tsc":"^1.8.27"}},lastBuildTime:"2024-03-02 15:55:34"};const b=e=>(C("data-v-2a8d4575"),e=e(),F(),e),T=b(()=>l("div",{class:"card-header"},[l("span",{class:"font-medium"},"时间线")],-1)),z={class:"flex"},D=b(()=>l("div",{class:"message"}," vue-pure-admin 是一款开源免费且开箱即用的中后台管理系统模版 ",-1)),V=h({name:"TimeLine",__name:"timeline",setup(e){const{lastBuildTime:i}=S,t=[{content:"支持圆点发光",timestamp:i,icon:d(v())},{content:"支持方形发光",timestamp:i,icon:d(v({borderRadius:0,background:"#67C23A"}))},{content:"支持渐变发光",timestamp:i,icon:d(v({background:I({randomizeHue:!0})}))},{content:"支持默认颜色",timestamp:i},{content:"支持自定义颜色",timestamp:i,color:"#F56C6C"},{content:"支持自定义图标",timestamp:i,color:"transparent",icon:q(N,{color:"#0bbd87"})}];return(c,a)=>{const s=m("el-timeline-item"),g=m("el-timeline"),k=m("el-card");return u(),j(k,{shadow:"never"},{header:o(()=>[T]),default:o(()=>[l("div",z,[r(g,null,{default:o(()=>[(u(),f(y,null,_(t,(n,p)=>r(s,{key:p,icon:n.icon,color:n.color,timestamp:n.timestamp},{default:o(()=>[w(B(n.content),1)]),_:2},1032,["icon","color","timestamp"])),64))]),_:1}),r(g,{class:"pl-40"},{default:o(()=>[(u(),f(y,null,_(t,(n,p)=>r(s,{key:p,icon:n.icon,color:n.color,timestamp:n.timestamp,placement:"bottom"},{default:o(()=>[D]),_:2},1032,["icon","color","timestamp"])),64))]),_:1})])]),_:1})}}}),E=R(V,[["__scopeId","data-v-2a8d4575"]]);export{E as default};