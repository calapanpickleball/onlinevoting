// ===== SOUND EFFECTS =====
// Synthesized ang lahat by default. Para gumamit ng mp3, ilagay ang path, hal. 'sounds/reg-start.mp3'.
// Iwanang '' para gamitin ang synthesized na tunog.
const SFX_FILES={
'reg-start':'',        // nagsimula ang registration
'voter-join':'',       // may bagong naka-register na voter
'countdown-tick':'',   // bawat segundo sa huling 10 segundo
'timer-end':'',        // 0:00 na ang timer
'voting-start':'',     // na-activate ang botohan
'vote-cast':'',        // may pumasok na boto
'voting-closed':'',    // na-close ang voting
'award-drumroll':'',   // bago ang award reveal (mga 2.2 segundo)
'award-reveal':'',     // lumabas ang Top 5
'raffle-spin':'',      // umiikot ang wheel (mga 6 segundo bawat wheel)
'raffle-suspense':'',  // "Ang mananalo ay..." (naka-loop)
'raffle-count':'',     // (hindi na ginagamit)
'wheel-stop':'',       // huminto ang wheel 1 o 2
'raffle-winner':'',    // huminto ang ikatlong wheel, lumabas ang nickname ng nanalo
'raffle-redraw':'',    // na-redraw ang nanalo
'bg-lobby':'',         // (hindi na ginagamit)
'bg-voting':'bg_ganda.mp3', // background music habang BOTOHAN (Tab 3, naka-loop, walang synthesized)
'winner-phone':''      // sa phone ng nanalo
};
const SFX=(()=>{let ac,on=false,vol=.8,mute=false;const A={},I={},W=new Set();
const C=()=>{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();return ac};
const T=()=>C().currentTime;
function o(type,f,t,d,g=.25,f2){const c=C(),os=c.createOscillator(),gn=c.createGain();os.type=type;os.frequency.setValueAtTime(f,t);if(f2)os.frequency.exponentialRampToValueAtTime(f2,t+d);gn.gain.setValueAtTime(Math.max(g*vol,.0002),t);gn.gain.exponentialRampToValueAtTime(.0001,t+d);os.connect(gn).connect(c.destination);os.start(t);os.stop(t+d+.02)}
function nz(t,d,g=.2,hz=1000){const c=C(),n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const fl=c.createBiquadFilter();fl.type='bandpass';fl.frequency.value=hz;const gn=c.createGain();gn.gain.setValueAtTime(Math.max(g*vol,.0002),t);gn.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl).connect(gn).connect(c.destination);s.start(t)}
const arp=(ns,st,ty,g,d)=>ns.forEach((f,i)=>o(ty,f,T()+i*st,d,g));
const roll=d=>{for(let t=0;t<d;t+=.07)nz(T()+t,.06,.12+.25*t/d,220)};
const SYN={
'reg-start':()=>arp([523,659,784,1047],.09,'triangle',.25,.3),
'voter-join':()=>o('sine',660,T(),.15,.12,990),
'countdown-tick':()=>o('square',880,T(),.12,.15),
'timer-end':()=>{o('sawtooth',220,T(),.9,.3);o('sawtooth',233,T(),.9,.3)},
'voting-start':()=>{arp([523,523,523,784],.14,'square',.2,.35);o('sawtooth',392,T()+.6,.9,.25)},
'vote-cast':()=>o('sine',520,T(),.1,.1,780),
'voting-closed':()=>{o('sine',110,T(),1.6,.45);nz(T(),.6,.2,300)},
'award-drumroll':()=>roll(2.2),
'award-reveal':()=>{arp([523,659,784,1047],.1,'square',.2,.4);o('square',1047,T()+.4,.8,.2)},
'raffle-spin':()=>{let t=0,g=.06;while(t<6){nz(T()+t,.04,.3,2500);o('square',1200,T()+t,.03,.08);g*=1.055;t+=g}},
'raffle-suspense':()=>{o('sine',60,T(),.25,.6);o('sine',60,T()+.25,.25,.5)},
'raffle-count':()=>o('square',660,T(),.25,.25),
'wheel-stop':()=>{o('triangle',880,T(),.6,.3);o('sine',1320,T()+.05,.5,.2)},
'raffle-winner':()=>{arp([523,659,784,1047,1319],.1,'square',.22,.5);nz(T()+.6,1.4,.3,4000)},
'raffle-redraw':()=>{o('sawtooth',300,T(),.4,.25,200);o('sawtooth',250,T()+.4,.7,.25,120)},
'winner-phone':()=>arp([659,784,988,1319,988,1319],.12,'triangle',.3,.4)};
const LOOP={'raffle-suspense':1000};
const start=n=>{const f=SFX_FILES[n];if(f){const a=A[n]=new Audio(f);a.loop=true;a.volume=vol;a.play().catch(()=>{})}else if(LOOP[n]&&SYN[n]){SYN[n]();I[n]=setInterval(SYN[n],LOOP[n])}};
const halt=n=>{if(A[n]){A[n].pause();delete A[n]}if(I[n]){clearInterval(I[n]);delete I[n]}};
return{enable(){on=true;C();if(!mute)W.forEach(n=>{if(!A[n]&&!I[n])start(n)})},
play(n){if(!on||mute)return;const f=SFX_FILES[n];if(f){const a=new Audio(f);a.volume=vol;a.play().catch(()=>SYN[n]&&SYN[n]())}else if(SYN[n])SYN[n]()},
loop(n){W.add(n);if(on&&!mute&&!A[n]&&!I[n])start(n)},stop(n){W.delete(n);halt(n)},
setVol(v){vol=v;Object.values(A).forEach(a=>a.volume=v)},
setMute(m){if(m===mute)return;mute=m;if(m)[...W].forEach(halt);else if(on)W.forEach(start)}}})();
