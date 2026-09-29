document.addEventListener("DOMContentLoaded",()=>{
  const s=getData("socialSettings")[0]||{facebook:"",youtube:"",instagram:""};
  document.getElementById("facebook").value=s.facebook||"";
  document.getElementById("youtube").value=s.youtube||"";
  document.getElementById("instagram").value=s.instagram||"";

  document.getElementById("socialForm").onsubmit=e=>{
    e.preventDefault();
    saveData("socialSettings",[{facebook:document.getElementById("facebook").value.trim(),youtube:document.getElementById("youtube").value.trim(),instagram:document.getElementById("instagram").value.trim()}]);
    document.getElementById("socialMsg").innerHTML='<div class="alert alert-success">Social media links saved successfully.</div>';
  };

  const normalize=arr=>(arr||[]).map(n=>({...n,id:n.id||uid()}));
  function notices(){
    const a=normalize(getData("noticeSettings"));
    saveData("noticeSettings",a);
    return a;
  }
  function render(){
    const a=notices();
    document.getElementById("noticeList").innerHTML=a.length?a.map((n,i)=>`<div class="notice-admin-row"><div><div class="notice-row-title">${esc(n.title||"Notice")}</div><div class="notice-row-msg">${esc(n.message||"")}</div><div class="notice-row-meta"><span class="badge ${n.active?'badge-success':'badge-warning'}">${n.active?'Active':'Hidden'}</span>${n.priority==='high'?'<span class="badge badge-danger">High Priority</span>':''}${n.highlight?'<span class="badge badge-info">Highlighted</span>':''}</div></div><div class="actions"><button class="btn-secondary edit-notice" data-id="${esc(n.id)}" type="button">✏️ Edit</button><button class="btn-danger delete-notice" data-id="${esc(n.id)}" type="button">🗑️ Delete</button></div></div>`).join(""):'<div class="empty-state">No notices yet. Click Add Notice.</div>';
    document.querySelectorAll('.edit-notice').forEach(b=>b.onclick=()=>editor(notices().find(x=>x.id===b.dataset.id)));
    document.querySelectorAll('.delete-notice').forEach(b=>b.onclick=()=>deleteNotice(b.dataset.id));
  }
  function editor(n){
    document.getElementById("noticeEditor").innerHTML=`<div class="notice-editor"><h3>${n?'✏️ Edit Notice':'➕ Add New Notice'}</h3><form id="noticeForm"><div class="form-grid"><div class="form-group"><label>Notice Title</label><input id="noticeTitle" required value="${esc(n?.title||"")}" placeholder="Important Notice"></div><div class="form-group"><label>Priority</label><select id="noticePriority"><option value="normal" ${(n?.priority||'normal')==='normal'?'selected':''}>Normal</option><option value="high" ${(n?.priority||'normal')==='high'?'selected':''}>High Priority</option></select></div></div><div class="form-group"><label>Notice Message</label><textarea id="noticeMessage" required placeholder="Write your notice here...">${esc(n?.message||"")}</textarea></div><div class="notice-checks"><label><input id="noticeActive" type="checkbox" ${n?.active!==false?'checked':''}> Show on Home page</label><label><input id="noticeHighlight" type="checkbox" ${n?.highlight!==false?'checked':''}> Highlight this notice</label></div><button type="submit">💾 ${n?'Update':'Save'} Notice</button> <button type="button" class="btn-secondary" id="cancelNotice">Cancel</button></form></div>`;
    document.getElementById("noticeForm").onsubmit=e=>{
      e.preventDefault();
      let a=notices();
      const item={id:n?.id||uid(),title:document.getElementById('noticeTitle').value.trim(),message:document.getElementById('noticeMessage').value.trim(),active:document.getElementById('noticeActive').checked,highlight:document.getElementById('noticeHighlight').checked,priority:document.getElementById('noticePriority').value,updatedAt:Date.now()};
      if(n) a=a.map(x=>x.id===n.id?item:x); else a.unshift(item);
      saveData("noticeSettings",a);
      document.getElementById("noticeEditor").innerHTML="";
      render();
    };
    document.getElementById("cancelNotice").onclick=()=>document.getElementById("noticeEditor").innerHTML="";
  }
  function deleteNotice(id){
    if(!id)return;
    if(confirm("Delete this notice?")){
      const a=notices().filter(x=>String(x.id)!==String(id));
      saveData("noticeSettings",a);
      render();
    }
  }
  document.getElementById("newNoticeBtn").onclick=()=>editor(null);
  render();
});
