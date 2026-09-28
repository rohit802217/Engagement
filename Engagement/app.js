// split text into letter spans
function splitLetters(el){
  const words=el.textContent.split(' ');
  el.textContent='';
  words.forEach((w,wi)=>{
    const wordWrap=document.createElement('span');
    wordWrap.style.display='inline-block';
    wordWrap.style.whiteSpace='nowrap';
    [...w].forEach(ch=>{
      const s=document.createElement('span');s.className='ch';s.textContent=ch;wordWrap.appendChild(s);
    });
    el.appendChild(wordWrap);
    if(wi<words.length-1) el.appendChild(document.createTextNode(' '));
  });
}
try{
splitLetters(document.getElementById('titleText'));
document.querySelectorAll('#namesText .line1, #namesText .line2').forEach(splitLetters);
}catch(e){ console.error('letter split failed', e); }

// decorative effects (gold dust, petals, diya flicker) — wrapped so a failure here can't block anything else
try{
// gold dust particles
const dust=document.getElementById('goldDust');
for(let i=0;i<28;i++){
  const d=document.createElement('i');
  d.style.left=Math.random()*100+'%';
  d.style.top=Math.random()*100+'%';
  dust.appendChild(d);
  gsap.to(d,{y:'-=' + (40+Math.random()*60),x:'+=' + (Math.random()*30-15),opacity:Math.random()*.7+.2,duration:3+Math.random()*3,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*3});
}

// falling petals
const petalSVG='<svg viewBox="0 0 20 20"><path d="M10 1c4 3 8 6 8 10a8 8 0 11-16 0c0-4 4-7 8-10z" fill="#d88a98"/></svg>';
const petalsWrap=document.getElementById('petals');
for(let i=0;i<10;i++){
  const p=document.createElement('div');p.className='petal';p.innerHTML=petalSVG;
  p.style.left=Math.random()*100+'%';
  petalsWrap.appendChild(p);
  gsap.to(p,{y:window.innerHeight+60,x:'+=' + (Math.random()*80-40),rotation:Math.random()*360,opacity:.75,duration:10+Math.random()*8,repeat:-1,delay:Math.random()*10,ease:'none',
    onRepeat(){gsap.set(p,{y:-30,opacity:0});}
  });
  gsap.set(p,{opacity:0});
}

// diya flicker
gsap.to('.flame',{scaleY:1.15,scaleX:.92,transformOrigin:'50% 100%',duration:.5,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:.3});
gsap.to('.diva',{y:-3,duration:1.6,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:.4});
}catch(e){ console.error('decorative effects failed', e); }

// main entrance timeline
try{
const tl=gsap.timeline({defaults:{ease:'power2.out'}});
tl.to('#card',{opacity:1,y:0,duration:.9,ease:'power2.out'},0)
  .fromTo('#card',{y:25,scale:.97},{y:0,scale:1,duration:.9},0)
  .to('#aiLight',{opacity:1,duration:.6},0.1)
  .to('#halo',{opacity:1,scale:1.05,duration:.9},0.2)
  .to('#ganeshaArt',{opacity:1,scale:1,duration:1,ease:'back.out(1.4)'},0.3)
  .to('.spark',{opacity:1,scale:1.2,duration:.5,stagger:.08,ease:'sine.inOut'},0.6)
  .to('.diva',{opacity:1,duration:.5},0.4)
  .to('.blessing',{opacity:1,duration:.5},0.9)
  .to('.eyebrow',{opacity:1,duration:.5},1.05)
  .to('.guest',{opacity:1,duration:.5},1.2)
  .to('#titleText .ch',{opacity:1,y:0,duration:.5,stagger:.045},1.35)
  .to('#flourish',{opacity:1,duration:.6},1.85)
  .to('.subtitle',{opacity:1,duration:.5},1.9)
  .to('#namesText .ch',{opacity:1,y:0,duration:.4,stagger:.025},2.05)
  .to('#namesText span',{opacity:1,duration:.4},2.4)
  .to('.ornament',{opacity:1,duration:.4},2.6)
  .to('.details',{opacity:1,duration:.5},2.75)
  .to('.personalize',{opacity:1,duration:.5},2.95)
  .to('.location',{opacity:1,duration:.5},3.1)
  .to('.ring.a',{opacity:1,x:0,rotation:0,duration:.8,ease:'back.out(1.6)'},3.3)
  .to('.ring.b',{opacity:1,x:0,rotation:0,duration:.8,ease:'back.out(1.6)'},3.3)
  .add(()=>{
    const wrap=document.getElementById('ringsWrap');
    for(let i=0;i<10;i++){
      const s=document.createElement('div');s.className='sparkle-burst';
      const ang=(i/10)*Math.PI*2, dist=22+Math.random()*10;
      s.style.left='50%';s.style.top='50%';
      wrap.appendChild(s);
      gsap.fromTo(s,{opacity:1,x:0,y:0,scale:1},{opacity:0,x:Math.cos(ang)*dist,y:Math.sin(ang)*dist,scale:.2,duration:.7,ease:'power2.out',onComplete:()=>s.remove()});
    }
  },4.05)
  .to('.footer',{opacity:1,duration:.5},3.9)
  .to('.share-btn',{opacity:1,duration:.5},4.05);

// halo & ai-light continuous loops after entrance
gsap.to('#halo',{scale:1.1,opacity:.85,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut',delay:1.1});
gsap.to('#aiLight',{rotation:360,duration:12,repeat:-1,ease:'none',delay:0.7,transformOrigin:'50% 50%'});
gsap.to('#ganeshaArt',{y:-8,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut',delay:1.2});
gsap.to('.spark',{opacity:.25,duration:1.1,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:{each:.4,repeat:-1,yoyo:true}});
gsap.to('.ring',{y:-3,duration:1.8,repeat:-1,yoyo:true,ease:'sine.inOut',delay:4});
}catch(e){ console.error('animation setup failed, safety net will reveal content', e); }

// tap Ganesha for a blessing pulse
document.getElementById('ganeshaArt')?.addEventListener('click',()=>{
  try{
    gsap.fromTo('#ganeshaArt',{scale:1},{scale:1.08,duration:.25,yoyo:true,repeat:1,ease:'power1.inOut'});
    gsap.fromTo('#halo',{scale:1},{scale:1.3,opacity:1,duration:.5,yoyo:true,repeat:1,ease:'power1.out'});
  }catch(e){}
});

// This block is independent of GSAP/CDN so the core invite features always work,
// even if the animation library above failed to load or a tween errored out.

// safety net: guarantee everything is visible no matter what
setTimeout(()=>{
  document.querySelectorAll('.invite-card,.blessing,.eyebrow,.guest,#titleText .ch,#flourish,.subtitle,#namesText .ch,#namesText span,.ornament,.details,.personalize,.location,.share-btn,.footer,.ganesha,.halo,.ai-light,.spark,.diva,.ring')
    .forEach(el=>{ el.style.opacity='1'; el.style.transform='none'; });
},2500);

// Guest name + sharing
const input = document.getElementById('guestName');
const preview = document.getElementById('guestPreview');
const applyName = document.getElementById('applyName');
const shareBtn = document.getElementById('shareBtn');

function getGuestName() {
  return (input?.value || '').trim() || 'Guest';
}

function buildShareUrl(name) {
  // A real shareable URL exists only when this invitation is hosted on HTTP/HTTPS.
  // A local file:// URL cannot be opened by another person's phone.
  try {
    const current = new URL(window.location.href);
    if (current.protocol !== 'http:' && current.protocol !== 'https:') return '';
    current.search = '';
    current.hash = '';
    current.searchParams.set('guest', name);
    return current.toString();
  } catch (e) {
    return '';
  }
}

function getShareMessage(name) {
  return `💌 You are invited to Rahul & Manisha's Engagement Ceremony!\nDear ${name}, please open the invitation card below.`;
}

function showGuest(name) {
  if (input) input.value = name;
  if (preview) preview.textContent = name;
}

applyName?.addEventListener('click', () => {
  showGuest(getGuestName());
});

input?.addEventListener('keydown', e => {
  if (e.key === 'Enter') applyName?.click();
});

// Read guest name from shared URL.
const params = new URLSearchParams(window.location.search);
const guestFromUrl = params.get('guest');

if (guestFromUrl) {
  const safeGuest = guestFromUrl.trim() || 'Guest';
  showGuest(safeGuest);
  document.body.classList.add('shared-invite');

  // A shared invitation must always open at the beginning of the complete card,
  // never at the sender's previous scroll position.
  const openSharedInviteAtTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  openSharedInviteAtTop();
  window.addEventListener('load', openSharedInviteAtTop, { once: true });
  setTimeout(openSharedInviteAtTop, 50);
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {}

  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.focus();
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) {}
  area.remove();
  return ok;
}

function showShareMessage(message) {
  let toast = document.getElementById('shareToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shareToast';
    toast.className = 'share-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

shareBtn?.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = getGuestName();
  const shareUrl = buildShareUrl(name);
  const message = getShareMessage(name);

  // On phones, use the native share sheet first. The URL is passed as the
  // actual link, not written into the visible invitation text. This lets
  // WhatsApp generate its rich invitation-card preview from og:image.
  if (typeof navigator.share === 'function' && shareUrl) {
    try {
      const shareData = {
        title: 'Rahul & Manisha — Engagement Ceremony',
        text: message,
        url: shareUrl
      };

      if (!navigator.canShare || navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      // Continue to WhatsApp/copy fallback for other browser share errors.
    }
  }

  // WhatsApp fallback. A URL is required here so WhatsApp can make the
  // invitation preview clickable. The normal mobile share path above keeps
  // the URL out of the visible invitation text.
  const fallbackMessage = shareUrl ? `${message}\n\n${shareUrl}` : message;
  const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(fallbackMessage);
  let opened = false;
  try {
    const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    opened = !!popup;
  } catch (e) {}

  if (opened) return;

  const copied = await copyText(fallbackMessage);
  if (copied) {
    showShareMessage(
      shareUrl
        ? 'Invitation card link copied. Paste it in WhatsApp.'
        : 'Invitation message copied. Paste it in WhatsApp.'
    );
  } else {
    showShareMessage('WhatsApp could not be opened. Please copy and share the invitation.');
  }
});
