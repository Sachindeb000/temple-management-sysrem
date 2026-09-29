const s=document.getElementById("puja"),f=document.getElementById("bookingForm");
if(s)s.innerHTML='<option value="">Select Puja</option>'+getData("pujas").map(x=>`<option value="${esc(x.name)}">${esc(x.name)} - ${esc(x.time)}</option>`).join("");
const currentUser=localStorage.getItem("tms_current_user");
const loggedUser=currentUser?JSON.parse(currentUser):null;
if(loggedUser){document.getElementById("name").value=loggedUser.name||"";document.getElementById("phone").value=loggedUser.phone||"";document.getElementById("email").value=loggedUser.email||"";}
if(f)f.onsubmit=e=>{e.preventDefault();let a=getData("bookings"),n=document.getElementById("name").value.trim(),ph=document.getElementById("phone").value.trim(),em=document.getElementById("email").value.trim();
if(!em && loggedUser?.email) em=loggedUser.email;
if(loggedUser?.id){const u=getData("users").find(z=>z.id===loggedUser.id);if(u?.email) em=u.email;}
a.push({id:uid(),userId:loggedUser?.id||"",name:n,phone:ph,email:em,userEmail:em,userName:n,puja:document.getElementById("puja").value,date:document.getElementById("date").value,people:document.getElementById("people").value,status:"Pending",createdAt:new Date().toLocaleString()});
saveData("bookings",a);alert("Booking submitted successfully.");f.reset();if(loggedUser){document.getElementById("name").value=loggedUser.name||"";document.getElementById("phone").value=loggedUser.phone||"";document.getElementById("email").value=loggedUser.email||"";}};