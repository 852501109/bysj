var W=Object.defineProperty,X=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var E=(o,t,n)=>t in o?W(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n,v=(o,t)=>{for(var n in t||(t={}))Z.call(t,n)&&E(o,n,t[n]);if(B)for(var n of B(t))ee.call(t,n)&&E(o,n,t[n]);return o},x=(o,t)=>X(o,Y(t));import{e as w,k as y,f as g,d as te,r as m,V as oe,a7 as ne,b as i,j as le,m as N,i as a,w as d,R as ae,E as R,u as p,h as j,B as z,aI as L,P as re,_ as se}from"./index-Zjjfkekr.js";import{u as ie}from"./hooks-Cd3mbshJ.js";import{d as ce}from"./git-branch-line-BhusJOme.js";import{d as de}from"./more-2-fill-iTOisMwj.js";import{O as ue,L as pe}from"./add-location-DJZJt-We.js";const he={width:"32",height:"32",viewBox:"0 0 24 24"},_e=g("path",{fill:"currentColor",d:"M22 4V2H2v2h9v14.17l-5.5-5.5-1.42 1.41L12 22l7.92-7.92-1.42-1.41-5.5 5.5V4z"},null,-1),fe=[_e];function me(o,t){return w(),y("svg",he,[...fe])}const ge={render:me},ve={width:"32",height:"32",viewBox:"0 0 24 24"},xe=g("path",{fill:"currentColor",d:"M4 2H2v20h2v-9h14.17l-5.5 5.5 1.41 1.42L22 12l-7.92-7.92-1.41 1.42 5.5 5.5H4z"},null,-1),we=[xe];function ye(o,t){return w(),y("svg",ve,[...we])}const be={render:ye},ke={class:"flex items-center h-[34px]"},Ce=te({__name:"tree",props:{treeLoading:Boolean,treeData:Array},emits:["tree-select"],setup(o,{expose:t,emit:n}){const b=o,D=n,k=m(),h=m(!0),u=m(""),r=m({}),{proxy:H}=re(),A={children:"children",label:"name"},M=oe(()=>["!h-[20px]","reset-margin","!text-gray-500","dark:!text-white","dark:hover:!text-primary"]),S=(l,e)=>l?e.name.includes(l):!0;function P(l){var s,_;const e=l.$treeNodeId;r.value[e]=(s=r.value[e])!=null&&s.highlight?Object.assign({id:e},r.value[e],{highlight:!1}):Object.assign({id:e},r.value[e],{highlight:!0}),Object.values(r.value).forEach(f=>{f.id!==e&&(f.highlight=!1)}),D("tree-select",(_=r.value[e])!=null&&_.highlight?Object.assign(x(v({},l),{selected:!0})):Object.assign(x(v({},l),{selected:!1})))}function C(l){h.value=l;const e=H.$refs.treeRef.store._getAllNodes();for(let s=0;s<e.length;s++)e[s].expanded=l}function T(){r.value={},u.value="",C(!0)}return ne(u,l=>{k.value.filter(l)}),t({onTreeReset:T}),(l,e)=>{const s=i("IconifyIconOffline"),_=i("el-icon"),f=i("el-input"),U=i("el-button"),q=i("el-dropdown-item"),F=i("el-dropdown-menu"),G=i("el-dropdown"),J=i("el-divider"),K=i("el-tree"),Q=le("loading");return N((w(),y("div",{class:"h-full bg-bg_color overflow-auto",style:L({minHeight:"calc(100vh - 145px)"})},[g("div",ke,[a(f,{modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=c=>u.value=c),class:"ml-2",size:"small",placeholder:"请输入部门名称",clearable:""},{suffix:d(()=>[a(_,{class:"el-input__icon"},{default:d(()=>[N(a(s,{icon:"ri:search-line"},null,512),[[ae,u.value.length===0]])]),_:1})]),_:1},8,["modelValue"]),a(G,{"hide-on-click":!1},{dropdown:d(()=>[a(F,null,{default:d(()=>[a(q,null,{default:d(()=>[a(U,{class:R(M.value),link:"",type:"primary",icon:p(ie)(h.value?p(ge):p(be)),onClick:e[1]||(e[1]=c=>C(!h.value))},{default:d(()=>[j(z(h.value?"折叠全部":"展开全部"),1)]),_:1},8,["class","icon"])]),_:1})]),_:1})]),default:d(()=>[a(s,{class:"w-[28px] cursor-pointer",width:"18px",icon:p(de)},null,8,["icon"])]),_:1})]),a(J),a(K,{ref_key:"treeRef",ref:k,data:b.treeData,"node-key":"id",size:"small",props:A,"default-expand-all":"","expand-on-click-node":!1,"filter-node-method":S,onNodeClick:P},{default:d(({node:c,data:I})=>{var V,O,$;return[g("span",{class:R(["pl-1","pr-1","rounded","flex","items-center","select-none","hover:text-primary",u.value.trim().length>0&&c.label.includes(u.value)&&"text-red-500",(V=r.value[c.id])!=null&&V.highlight?"dark:text-primary":""]),style:L({color:(O=r.value[c.id])!=null&&O.highlight?"var(--el-color-primary)":"",background:($=r.value[c.id])!=null&&$.highlight?"var(--el-color-primary-light-7)":"transparent"})},[a(s,{icon:I.type===1?p(ue):I.type===2?p(pe):p(ce)},null,8,["icon"]),j(" "+z(c.label),1)],6)]}),_:1},8,["data"])],4)),[[Q,b.treeLoading]])}}}),Ne=se(Ce,[["__scopeId","data-v-2f351ec8"]]);export{Ne as default};
