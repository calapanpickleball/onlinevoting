const firebaseConfig={apiKey:"AIzaSyB4IiCCQHtGeIT44n71oGlKk7PIOSWxfg8",authDomain:"ccpc-1943f.firebaseapp.com",databaseURL:"https://ccpc-1943f-default-rtdb.firebaseio.com",projectId:"ccpc-1943f",storageBucket:"ccpc-1943f.firebasestorage.app",messagingSenderId:"904942754236",appId:"1:904942754236:web:aecbec51d5cd0b745b33b9"};
firebase.initializeApp(firebaseConfig);
const db=firebase.database(),auth=firebase.auth();
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let off=0;db.ref('.info/serverTimeOffset').on('value',s=>off=s.val()||0);
const now=()=>Date.now()+off;
const fmt=ms=>{const s=Math.ceil(Math.max(0,ms)/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const ready=auth.signInAnonymously().then(c=>c.user);
const listen=(p,cb)=>db.ref(p).on('value',s=>cb(s.val()));
const once=p=>db.ref(p).once('value').then(s=>s.val());
const CATS=[
{k:'wo_funny',g:'outfit',t:'Funniest Outfit',e:'🤡'},
{k:'wo_creative',g:'outfit',t:'Most Creative Outfit',e:'🎨'},
{k:'wo_feel',g:'outfit',t:'Feel na Feel',e:'💃'},
{k:'wo_people',g:'outfit',t:"People's Choice (Outfit)",e:'❤️'},
{k:'wp_funny',g:'paddle',t:'Funniest Paddle',e:'😂'},
{k:'wp_unique',g:'paddle',t:'Most Unique Paddle',e:'🦄'},
{k:'wp_people',g:'paddle',t:"People's Choice (Paddle)",e:'❤️'}];
const elig=(P,g)=>Object.values(P||{}).filter(p=>g==='outfit'?p.wo:p.wp).sort((a,b)=>a.num-b.num);
function top5(V,k){const c={};Object.values(V||{}).forEach(v=>{const n=v[k];if(n&&n!=='none')c[n]=(c[n]||0)+1});
const r=Object.entries(c).map(([n,t])=>({n,t})).sort((a,b)=>b.t-a.t);let rk=0,pv=null;
r.forEach((x,i)=>{if(x.t!==pv){rk=i+1;pv=x.t}x.r=rk});return r.filter(x=>x.r<=5)}
const WORDS={a:['Little','Mighty','Sneaky','Fearless'],c:['Blue','Pink','Red','Green','Orange'],n:['Banger','Dinker','Lobber','Dropper']};
const SDK='https://www.gstatic.com/firebasejs/10.12.2/';
