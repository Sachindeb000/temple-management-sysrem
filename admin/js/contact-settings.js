const form=document.getElementById("contactSettingsForm");
const current=getData("contactSettings");
const c=Array.isArray(current)?(current[0]||{}):current;
const address=document.getElementById("address");
const phone=document.getElementById("phone");
const email=document.getElementById("email");
const saveMsg=document.getElementById("saveMsg");
const previewAddress=document.getElementById("previewAddress");
const previewPhone=document.getElementById("previewPhone");
const previewEmail=document.getElementById("previewEmail");
const previewMap=document.getElementById("previewMap");
address.value=c.address||"";
phone.value=c.phone||"";
email.value=c.email||"";
function updatePreview(){
  const a=address.value.trim(),p=phone.value.trim(),e=email.value.trim();
  previewAddress.textContent=a;
  previewPhone.textContent=p;
  previewPhone.href="tel:"+p.replace(/[^\d+]/g,"");
  previewEmail.textContent=e;
  previewEmail.href="mailto:"+e;
  if(a){
    const q=encodeURIComponent(a);
    previewMap.innerHTML='<iframe title="Location Preview" width="100%" height="380" style="border:0" loading="lazy" src="https://www.google.com/maps?q='+q+'&output=embed"></iframe>';
  }else previewMap.innerHTML="";
}
form.onsubmit=e=>{
  e.preventDefault();
  const a=address.value.trim();
  saveData("contactSettings",{address:a,phone:phone.value.trim(),email:email.value.trim(),location:a});
  saveMsg.innerHTML='<div class="alert alert-success">Contact details saved successfully. The map now uses the Admin address.</div>';
  updatePreview();
};
[address,phone,email].forEach(x=>x.addEventListener("input",updatePreview));
updatePreview();
