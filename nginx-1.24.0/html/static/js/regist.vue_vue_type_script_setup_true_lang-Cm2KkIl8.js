var P=(C,t,d)=>new Promise((f,r)=>{var g=n=>{try{c(d.next(n))}catch(i){r(i)}},x=n=>{try{c(d.throw(n))}catch(i){r(i)}},c=n=>n.done?f(n.value):Promise.resolve(n.value).then(g,x);c((d=d.apply(C,t)).next())});import{M as m}from"./motion-17saR-Ei.js";import{d as S,H as z,r as R,K as A,b as _,e as F,c as I,w as a,i as l,u as e,a3 as w,dp as y,h as v,B as V,dH as U,A as h}from"./index-Zjjfkekr.js";import{a as M,u as N}from"./verifyCode-D0MZil0E.js";import{u as b}from"./hooks-Cd3mbshJ.js";import{d as B}from"./lock-fill-BZPnsoM7.js";const T={width:24,height:24,body:'<path fill="currentColor" d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2Zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z"/>'},j=S({__name:"regist",setup(C){const{t}=z(),d=R(!1),f=R(!1),r=A({username:"",phone:"",verifyCode:"",password:"",repeatPassword:""}),g=R(),x=[{validator:(i,o,u)=>{o===""?u(new Error(w(y("login.passwordSureReg")))):r.password!==o?u(new Error(w(y("login.passwordDifferentReg")))):u()},trigger:"blur"}],c=i=>P(this,null,function*(){f.value=!0,i&&(yield i.validate((o,u)=>{if(o)d.value?U().loginRegister({username:r.username,password:r.password}).then(s=>{s.errno===0?h("注册成功",{type:"success"}):h(s.message,{type:"error"})}).catch(s=>{h(s.message,{type:"error"})}).finally(()=>f.value=!1):(f.value=!1,h(w(y("login.tickPrivacy")),{type:"warning"}));else return f.value=!1,u}))});function n(){N().end(),U().SET_CURRENTPAGE(0)}return(i,o)=>{const u=_("el-input"),s=_("el-form-item"),E=_("el-checkbox"),k=_("el-button"),H=_("el-form");return F(),I(H,{ref_key:"ruleFormRef",ref:g,model:r,rules:e(M),size:"large"},{default:a(()=>[l(e(m),null,{default:a(()=>[l(s,{rules:[{required:!0,message:e(w)(e(y)("login.usernameReg")),trigger:"blur"}],prop:"username"},{default:a(()=>[l(u,{modelValue:r.username,"onUpdate:modelValue":o[0]||(o[0]=p=>r.username=p),clearable:"",placeholder:e(t)("login.username"),"prefix-icon":e(b)(e(T))},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["rules"])]),_:1}),l(e(m),{delay:200},{default:a(()=>[l(s,{prop:"password"},{default:a(()=>[l(u,{modelValue:r.password,"onUpdate:modelValue":o[1]||(o[1]=p=>r.password=p),clearable:"","show-password":"",placeholder:e(t)("login.password"),"prefix-icon":e(b)(e(B))},null,8,["modelValue","placeholder","prefix-icon"])]),_:1})]),_:1}),l(e(m),{delay:250},{default:a(()=>[l(s,{rules:x,prop:"repeatPassword"},{default:a(()=>[l(u,{modelValue:r.repeatPassword,"onUpdate:modelValue":o[2]||(o[2]=p=>r.repeatPassword=p),clearable:"","show-password":"",placeholder:e(t)("login.sure"),"prefix-icon":e(b)(e(B))},null,8,["modelValue","placeholder","prefix-icon"])]),_:1})]),_:1}),l(e(m),{delay:300},{default:a(()=>[l(s,null,{default:a(()=>[l(E,{modelValue:d.value,"onUpdate:modelValue":o[3]||(o[3]=p=>d.value=p)},{default:a(()=>[v(V(e(t)("login.readAccept")),1)]),_:1},8,["modelValue"]),l(k,{link:"",type:"primary"},{default:a(()=>[v(V(e(t)("login.privacyPolicy")),1)]),_:1})]),_:1})]),_:1}),l(e(m),{delay:350},{default:a(()=>[l(s,null,{default:a(()=>[l(k,{class:"w-full",size:"default",type:"primary",loading:f.value,onClick:o[4]||(o[4]=p=>c(g.value))},{default:a(()=>[v(V(e(t)("login.definite")),1)]),_:1},8,["loading"])]),_:1})]),_:1}),l(e(m),{delay:400},{default:a(()=>[l(s,null,{default:a(()=>[l(k,{class:"w-full",size:"default",onClick:n},{default:a(()=>[v(V(e(t)("login.back")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])}}});export{j as _,T as d};
