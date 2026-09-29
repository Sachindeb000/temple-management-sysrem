const c = document.getElementById("adminContent");

function render(){
  const a = getData("gallery");
  c.innerHTML = `
    <div class="admin-card">
      <h2>Add Gallery Image</h2>
      <p style="margin:0 0 14px;color:#666;">Upload an image from your device or paste an image URL.</p>
      <form id="galleryForm" class="admin-form">
        <input id="galleryTitle" placeholder="Image title" required>
        <label style="font-weight:600;">Upload Image</label>
        <input id="galleryFile" type="file" accept="image/*">
        <div style="text-align:center;margin:6px 0;color:#888;">OR</div>
        <input id="galleryUrl" type="url" placeholder="Image URL (optional)">
        <small id="galleryStatus" style="color:#777;"></small>
        <button id="addGalleryBtn" type="submit" class="btn">Add Image</button>
      </form>
    </div>
    <div class="gallery-grid">
      ${a.map(x=>`
        <div class="gallery-item">
          <img src="${esc(x.image)}" alt="${esc(x.title)}" onerror="this.style.opacity='.35';">
          <h3>${esc(x.title)}</h3>
          <button class="small-btn danger" onclick="delG('${esc(x.id)}')">Delete</button>
        </div>`).join("")}
    </div>`;

  document.getElementById("galleryForm").addEventListener("submit", addGalleryImage);
}

function resizeImage(file, maxSize=1200, quality=.82){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image file."));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function addGalleryImage(e){
  e.preventDefault();
  const title = document.getElementById("galleryTitle").value.trim();
  const file = document.getElementById("galleryFile").files[0];
  const url = document.getElementById("galleryUrl").value.trim();
  const status = document.getElementById("galleryStatus");
  const btn = document.getElementById("addGalleryBtn");

  if(!file && !url){
    status.textContent = "Please select an image file or enter an image URL.";
    status.style.color = "#c0392b";
    return;
  }

  btn.disabled = true;
  status.style.color = "#777";
  status.textContent = file ? "Processing image..." : "Adding image...";

  try{
    const image = file ? await resizeImage(file) : url;
    const a = getData("gallery");
    a.push({id:uid(), title, image});
    saveData("gallery", a);
    render();
  }catch(err){
    status.textContent = err.message || "Unable to add image.";
    status.style.color = "#c0392b";
    btn.disabled = false;
  }
}

function delG(id){
  if(!confirm("Delete this gallery image?")) return;
  saveData("gallery", getData("gallery").filter(x=>x.id!==id));
  render();
}

render();
