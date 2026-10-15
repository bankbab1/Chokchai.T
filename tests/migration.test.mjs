import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const baseline=JSON.parse(await readFile(new URL('./baseline.json',import.meta.url),'utf8'));
let browser,server;
before(async()=>{server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--port','4173'],{stdio:'ignore'});for(let i=0;i<100;i++){try{if((await fetch('http://localhost:4173')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox']});});
after(async()=>{await browser?.close();server?.kill();});
async function setup(width=1365,height=900){const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const events=[],errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://script.google.com/**',async route=>{events.push(JSON.parse(route.request().postData()));await route.fulfill({status:200,body:'ok'});});await page.route('https://api.binance.com/**',route=>route.fulfill({json:route.request().url().includes('24hr')?{priceChangePercent:'2.50',priceChange:'2500'}:{symbol:'BTCUSDT',price:'102500'}}));return {context,page,events,errors};}
for(const name of ['index','profile'])test(`${name}: content, image URLs and responsive widths preserved`,async()=>{
 const {context,page,errors}=await setup();await page.goto(`http://localhost:4173/${name}.html`);await page.locator(name==='index'?'.landing-card':'#projects').waitFor();
 const text=await page.locator('body').evaluate(el=>{const clone=el.cloneNode(true);clone.querySelectorAll('#ageVal,#crypto-prices,script').forEach(n=>n.remove());return clone.textContent.replace(/\s+/g,' ').trim();});
 // Whitespace between inline JSX nodes may differ from HTML formatting; compare words.
 const compact=s=>s.replace(/\s+/g,'');assert.equal(compact(text),compact(baseline[name].text));
 assert.deepEqual(await page.locator('img').evaluateAll(imgs=>imgs.map(im=>im.getAttribute('src'))),baseline[name].images);
 for(const width of [320,375,768,1024,1440]){await page.setViewportSize({width,height:900});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${name} horizontal overflow at ${width}: ${JSON.stringify(await page.evaluate(()=>Array.from(document.querySelectorAll("body *")).filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,cls:el.className,right:el.getBoundingClientRect().right})).slice(0,12)))}`);}
 assert.deepEqual(errors,[]);await context.close();
});
test('all original image files remain byte-identical',async()=>{for(const [file,hash]of Object.entries(baseline.assets))assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),hash,file);});
test('welcome confirmation, theme persistence and Google Sheets payload',async()=>{const {context,page,events}=await setup();await page.goto('http://localhost:4173/');await page.locator('#viewProfileBtn').waitFor();await page.locator('#themeToggle').click();assert.equal(await page.evaluate(()=>localStorage.getItem('theme')),'light');await page.locator('#viewProfileBtn').click();await page.getByRole('button',{name:'Yes, View Profile'}).click();await page.waitForURL('**/profile.html');await page.locator('#projects').waitFor();await page.waitForTimeout(150);assert.equal(await page.locator('html').getAttribute('data-theme'),'light');assert.deepEqual(events.slice(0,3).map(e=>e.event),['Landing Page Viewed','View Profile Clicked','Profile Page Viewed']);assert.equal(events[2].page,'profile_v2.html');assert.ok(events[0].visitorId);assert.equal(events[0].visitorId,events[2].visitorId);for(const e of events)assert.deepEqual(Object.keys(e).sort(),['browser','event','os','page','visitorId']);await context.close();});
test('mobile menu, project gallery keyboard controls, ticker and one-time scroll events',async()=>{const {context,page,events,errors}=await setup(375);await page.goto('http://localhost:4173/profile.html');await page.locator('#menuBtn').click();assert.ok(await page.locator('#sidebar').evaluate(el=>el.classList.contains('open')));await page.locator('.sidebar a[href="#projects"]').click();await page.waitForTimeout(500);assert.equal(await page.locator('#sidebar').evaluate(el=>el.classList.contains('open')),false);await page.locator('#project5 .gallery img').first().click();assert.equal(await page.locator('#lbCounter').textContent(),'1 / 13');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#lbCounter').textContent(),'2 / 13');await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#lbCounter').textContent(),'1 / 13');await page.keyboard.press('Escape');assert.equal(await page.locator('#lightbox').evaluate(el=>el.classList.contains('open')),false);await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(300);await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(300);assert.equal(events.filter(e=>e.event==='Profile Page Scrolled').length,1);assert.equal(events.filter(e=>e.event==='Profile Page Bottom Reached').length,1);assert.match(await page.locator('#crypto-prices').textContent(),/102,500.00/);assert.deepEqual(errors,[]);await context.close();});
test('scroll-to-top clears deep anchors and keeps the entire portrait below the mobile header',async()=>{
 const {context,page,errors}=await setup(390,844);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('http://localhost:4173/profile.html#home');
 await page.locator('.avatar img').waitFor();
 assert.equal(await page.evaluate(()=>scrollY),0);
 const checkPortrait=async()=>{
  const avatar=await page.locator('.avatar').boundingBox(),bar=await page.locator('.mobile-bar').boundingBox();
  assert.ok(avatar.y>=bar.y+bar.height+24,'portrait needs breathing room below fixed header');
  assert.ok(avatar.y+avatar.height<844,'entire portrait visible');
 };
 await checkPortrait();
 await page.evaluate(()=>scrollTo({top:1800,behavior:'instant'}));
 const top=page.getByRole('button',{name:'Scroll to top',exact:true});await top.waitFor({state:'visible'});
 const box=await top.boundingBox();assert.equal(box.width,48);assert.equal(box.height,48);assert.ok(390-box.x-box.width>=18);assert.ok(844-box.y-box.height>=20);
 await top.click();await page.waitForFunction(()=>scrollY===0);await checkPortrait();assert.equal(new URL(page.url()).hash,'');
 await page.evaluate(()=>scrollTo({top:1800,behavior:'instant'}));await page.locator('#menuBtn').click();await page.locator('.sidebar .nav-link[href="#home"]').click();await page.waitForFunction(()=>scrollY===0);await checkPortrait();
 assert.deepEqual(errors,[]);await context.close();
});
test('every mobile menu destination stays visible and portrait thumbnails fill their cards',async()=>{
 const {context,page,errors}=await setup(390,844);
 await page.goto('http://localhost:4173/profile.html');
 for(const id of ['experience','skills','projects','personal','key-skills','education','contact','home']){
  await page.locator('#menuBtn').click();
  await page.locator(`.sidebar .nav-link[href="#${id}"]`).click();
  await page.waitForFunction(id=>location.hash==='#'+id,id);
  const result=await page.locator('#'+id).evaluate(el=>({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom,opacity:getComputedStyle(el.closest('.reveal')||el).opacity,locked:document.body.style.position==='fixed',overlay:document.querySelector('#sidebarBackdrop').classList.contains('show')}));
  assert.ok(result.top<844&&result.bottom>76,`${id} needs to be in view`);assert.equal(result.opacity,'1');assert.equal(result.locked,false);assert.equal(result.overlay,false);
 }
 for(const width of [320,390,600]){
  await page.setViewportSize({width,height:900});
  const widths=await page.locator('.proj').evaluateAll(cards=>cards.map(c=>({head:c.querySelector('.proj-head').getBoundingClientRect().width,thumb:c.querySelector('.proj-thumb').getBoundingClientRect().width})));
  for(const {head,thumb}of widths)assert.ok(Math.abs(head-thumb)<2,`thumbnail must fill card at ${width}`);
 }
 assert.match(await page.locator('#personal').textContent(),/Updated: 2026/);
 assert.deepEqual(errors,[]);await context.close();
});
test('both pages show a brief skeleton and the brand links return to top',async()=>{
 const {context,page}=await setup(390,844);
 for(const path of ['index.html','profile.html']){
  await page.goto('http://localhost:4173/'+path,{waitUntil:'commit'});
  const skeleton=page.getByRole('status',{name:'Loading page'});await skeleton.waitFor({state:'visible'});
  assert.equal(await skeleton.getAttribute('aria-busy'),'true');
  await skeleton.waitFor({state:'hidden'});
 }
 await page.evaluate(()=>scrollTo({top:1800,behavior:'instant'}));
 await page.locator('.mobile-bar .brand-home').click();await page.waitForFunction(()=>scrollY===0);
 await page.setViewportSize({width:1365,height:900});
 await page.evaluate(()=>scrollTo({top:1800,behavior:'instant'}));
 await page.locator('.sidebar .brand-home').click();await page.waitForFunction(()=>scrollY===0);
 assert.equal(await page.locator('#hobbies .card').count(),3);
 await context.close();
});
