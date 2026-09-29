const c=document.getElementById("adminContent");
function render(){
 const a=getData("bookings"),users=getData("users");
 c.innerHTML=`<div class="admin-card table-wrap"><table class="admin-table"><tr><th>User Name</th><th>Email</th><th>Phone</th><th>Puja</th><th>Date</th><th>People</th><th>Status</th><th>Action</th></tr>${a.map(x=>{
  const u=users.find(u=>(x.userId&&u.id===x.userId)||(x.email&&u.email&&u.email.toLowerCase()===x.email.toLowerCase()));
  const displayName=x.name||x.userName||u?.name||"Guest User";
  const displayEmail=(x.email||x.userEmail||u?.email||"").trim()||"—";
  const displayPhone=x.phone||u?.phone||"—";
  return `<tr><td><strong>${esc(displayName)}</strong></td><td>${esc(displayEmail)}</td><td>${esc(displayPhone)}</td><td>${esc(x.puja||"")}</td><td>${esc(x.date||"")}</td><td>${esc(x.people||"")}</td><td><select onchange="statusB('${x.id}',this.value)"><option ${x.status==="Pending"?"selected":""}>Pending</option><option ${x.status==="Confirmed"?"selected":""}>Confirmed</option><option ${x.status==="Completed"?"selected":""}>Completed</option><option ${x.status==="Cancelled"?"selected":""}>Cancelled</option></select></td><td><button class="small-btn danger" onclick="delB('${x.id}')">Delete</button></td></tr>`;}).join("")}</table></div>`;
}
function statusB(id,v){let a=getData("bookings"),x=a.find(x=>x.id===id);if(x)x.status=v;saveData("bookings",a)}
function delB(id){if(confirm("Delete booking?")){saveData("bookings",getData("bookings").filter(x=>x.id!==id));render()}}
render();