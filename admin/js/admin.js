function hasAdminAccess(){
    return sessionStorage.getItem("tms_admin")==="yes" || sessionStorage.getItem("tms_developer")==="yes";
}

function isDeveloper(){
    return sessionStorage.getItem("tms_developer")==="yes";
}

function requireAdmin(){
    if(!hasAdminAccess()){
        window.location.replace("login.html");
        return false;
    }
    return true;
}

function shell(){
    const root=document.getElementById("adminShell");
    if(!root) return;

    const developerLink=isDeveloper()
        ? `<a href="../developer/panel.html">🧑‍💻 Developer Panel</a>`
        : "";

    root.innerHTML=`
    <aside class="sidebar">
      <h2>🛕 TMS Admin</h2>
      <a href="dashboard.html">📊 Dashboard</a>
      <a href="home.html">🏠 Home Page Editor</a>
      <a href="about.html">📖 About Page Editor</a>
      <a href="puja.html">🪔 Puja Management</a>
      <a href="bookings.html">📅 Bookings</a>
      <a href="donations.html">💰 Donations</a>
      <a href="events.html">🎉 Events</a>
      <a href="gallery.html">🖼️ Gallery</a>
      <a href="users.html">👥 Users</a>
      <a href="messages.html">✉️ Messages</a>
      <a href="contact.html">📍 Contact Settings</a>
      <a href="social-notice.html">📱 Social & Notice</a><a href="security.html">🔐 Password & OTP</a>
      ${developerLink}
      ${isDeveloper() ? `<a href="../developer/panel.html">↩️ Back to Developer Panel</a>` : ""}
      <hr>
      <a href="../index.html">🌐 View Website</a>
      <a href="#" id="logoutLink">🚪 Logout</a>
    </aside>`;

    const logout=document.getElementById("logoutLink");
    if(logout) logout.onclick=function(e){
        e.preventDefault();
        const wasDeveloper=isDeveloper();
        sessionStorage.removeItem("tms_admin");
        sessionStorage.removeItem("tms_developer");
        window.location.replace(wasDeveloper ? "../developer/login.html" : "login.html");
    };
}

document.addEventListener("DOMContentLoaded",function(){
    if(document.getElementById("adminShell")){
        if(requireAdmin()) shell();
    }
});
