const DIVINE_FEATURES={
  dailyPuja:{icon:'🪔',title:'Daily Puja',description:'View worship timings and book your preferred puja easily.',link:'puja.html',linkText:'View Schedule →'},
  events:{icon:'📅',title:'Temple Events',description:'Discover festivals, special pujas and upcoming community programs.',link:'events.html',linkText:'View Events →'},
  community:{icon:'❤️',title:'Community Service',description:'Support temple activities and contribute to meaningful service.',link:'donation.html',linkText:'Support Us →'},
  booking:{icon:'🙏',title:'Puja Booking',description:'Choose a puja service and submit your booking request online.',link:'booking.html',linkText:'Book Now →'},
  gallery:{icon:'🖼️',title:'Temple Gallery',description:'Explore memorable moments, celebrations and temple photos.',link:'gallery.html',linkText:'View Gallery →'},
  contact:{icon:'📍',title:'Visit the Temple',description:'Find our address, contact details and map location.',link:'contact.html',linkText:'Contact Us →'},
  about:{icon:'🛕',title:'About Our Temple',description:'Learn about the temple, its story, values and devotional activities.',link:'about.html',linkText:'Know More →'},
  donation:{icon:'💛',title:'Make a Donation',description:'Help support worship, festivals and community service activities.',link:'donation.html',linkText:'Donate Now →'}
};

document.addEventListener('DOMContentLoaded',()=>{
 const d={eyebrow:'🙏 WELCOME TO DIVINE TEMPLE',heading:'A Place of',highlight:'Faith, Peace & Devotion',description:'Experience daily worship, sacred celebrations and community service — all in one place.',heroImage:'',primaryText:'🪔 Book a Puja',primaryLink:'',secondaryText:'Explore Temple',secondaryLink:'',welcomeTitle:'Everything for Your Spiritual Journey',welcomeDescription:'Stay connected with the temple, manage bookings and participate in sacred events.',selectedFeatures:['dailyPuja','events','community'],ctaTitle:'Support Temple Activities',ctaDescription:'Your contribution helps us continue worship, festivals and community programs.'};
 const h=Object.assign({},d,getData('homeSettings')[0]||{});
 const clearHero=document.getElementById('clearHeroImage');
 if(clearHero) clearHero.onclick=()=>{document.getElementById('heroImage').value='';document.getElementById('heroFile').value='';const current=Object.assign({},getData('homeSettings')[0]||h,{heroImage:''});saveData('homeSettings',[current]);document.getElementById('imageStatus').textContent='Hero image removed. Add a new URL or upload a new image, then click Save Home Page.';};
 Object.keys(d).forEach(k=>{const el=document.getElementById(k);if(el&&k!=='selectedFeatures')el.value=h[k]??'';});
 const featureChoices=document.getElementById('featureChoices');
 const selectedFeatures=Array.isArray(h.selectedFeatures)?h.selectedFeatures:d.selectedFeatures;
 if(featureChoices){featureChoices.innerHTML=Object.entries(DIVINE_FEATURES).map(([key,f])=>`<button type="button" class="feature-choice ${selectedFeatures.includes(key)?'selected':''}" data-feature="${key}"><span class="feature-choice-icon">${f.icon}</span><span class="feature-choice-text"><strong>${f.title}</strong><small>${f.description}</small></span><span class="feature-choice-check">${selectedFeatures.includes(key)?'✅':''}</span></button>`).join('');featureChoices.querySelectorAll('.feature-choice').forEach(btn=>btn.onclick=()=>{btn.classList.toggle('selected');btn.querySelector('.feature-choice-check').textContent=btn.classList.contains('selected')?'✅':'';});}
 document.getElementById('homeForm').onsubmit=async e=>{
   e.preventDefault();
   let image=document.getElementById('heroImage').value.trim();
   const f=document.getElementById('heroFile').files[0];
   if(f){image=await resizeImage(f);document.getElementById('imageStatus').textContent='Image loaded from your device.';}
   if(!image) document.getElementById('imageStatus').textContent='No hero image selected. The hero will use the default background.';
   const out={eyebrow:document.getElementById('eyebrow').value.trim(),heading:document.getElementById('heading').value.trim(),highlight:document.getElementById('highlight').value.trim(),description:document.getElementById('description').value.trim(),heroImage:image,primaryText:document.getElementById('primaryText').value.trim(),primaryLink:'',secondaryText:document.getElementById('secondaryText').value.trim(),secondaryLink:'',welcomeTitle:document.getElementById('welcomeTitle').value.trim(),welcomeDescription:document.getElementById('welcomeDescription').value.trim(),selectedFeatures:Array.from(document.querySelectorAll('#featureChoices .feature-choice.selected')).map(o=>o.dataset.feature),ctaTitle:document.getElementById('ctaTitle').value.trim(),ctaDescription:document.getElementById('ctaDescription').value.trim()};
   saveData('homeSettings',[out]);document.getElementById('imageStatus').textContent=image?'Hero image saved successfully.':'Hero image cleared.';document.getElementById('homeMsg').innerHTML='<span class="alert alert-success" style="display:inline-block;margin-left:10px">Home page saved.</span>';
 };
 function resizeImage(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,1600/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.width*scale));c.height=Math.max(1,Math.round(img.height*scale));c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',.82));};img.onerror=reject;img.src=r.result;};r.onerror=reject;r.readAsDataURL(file);});}
});
