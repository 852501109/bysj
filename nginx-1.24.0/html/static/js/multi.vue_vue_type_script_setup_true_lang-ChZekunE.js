import{R as h}from"./index-BmD-sjfu.js";import{T as C,E as g}from"./index.esm-DSUQmD19.js";import{d as R,r as w,bk as y,a as b,b as k,e as l,c as u,w as d,k as E,F as V,l as x,u as r,f as B,i}from"./index-Zjjfkekr.js";const L={class:"wangeditor"},c="default",T=R({name:"MultiEditor",__name:"multi",setup(U){const f=[{value:"<p>测试一</p>"},{value:"<p>测试二</p>"},{value:"<p>测试三</p>"},{value:"<p>测试四</p>"}],o=w([]);f.forEach(e=>{o.value.push({value:e.value,editorRef:y()})});const p={excludeKeys:"fullScreen"},m={placeholder:"请输入内容..."},v=(e,n)=>{o.value[n].editorRef=e};return b(()=>o.value.map(e=>{e.editorRef!=null&&e.editorRef.destroy()})),(e,n)=>{const _=k("el-row");return l(),u(_,{gutter:30,justify:"space-around"},{default:d(()=>[(l(!0),E(V,null,x(o.value,(t,s)=>(l(),u(r(h),{key:s,value:11},{default:d(()=>[B("div",L,[i(r(C),{editor:t.editorRef,defaultConfig:p,mode:c,style:{"border-bottom":"1px solid #ccc"}},null,8,["editor"]),i(r(g),{modelValue:t.value,"onUpdate:modelValue":a=>t.value=a,defaultConfig:m,mode:c,style:{height:"300px","overflow-y":"hidden"},onOnCreated:a=>v(a,s)},null,8,["modelValue","onUpdate:modelValue","onOnCreated"])])]),_:2},1024))),128))]),_:1})}}});export{T as _};
