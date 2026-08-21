const $=id=>document.getElementById(id);
const examples={
restaurant:"Create a modern restaurant website with menu, gallery and contact section.",
portfolio:"Create a professional designer portfolio website.",
bike:"Create a premium bike showroom website with products, prices and WhatsApp contact.",
store:"Create a modern online clothing store with product cards and categories."
};
function page(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("active",x.dataset.page===id))}
document.querySelectorAll("nav button").forEach(x=>x.onclick=()=>page(x.dataset.page));
document.querySelectorAll("[data-example]").forEach(x=>x.onclick=()=>{$("prompt").value=examples[x.dataset.example]});
function toast(x){$("toast").textContent=x;$("toast").style.display="block";setTimeout(()=>$("toast").style.display="none",2200)}
$("upgrade").onclick=()=>toast("Upgrade module coming soon.");
$("hostingBtn").onclick=()=>toast("Hosting payment module coming soon.");
$("supportBtn").onclick=()=>{if(!$("supportSubject").value.trim()||!$("supportMessage").value.trim())return toast("Fill both fields.");toast("Support message submitted.");};

$("generate").onclick=async()=>{
  let p=$("prompt").value.trim();
  if(!p)return toast("Describe your website first.");
  $("generate").disabled=true;
  $("status").textContent="Рюд AI is creating your website...";
  try{
    let base=window.ULTRONAI_BACKEND||"";
    if(!base)throw new Error("backend-not-configured");
    let r=await fetch(base+"/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:p})});
    if(!r.ok)throw new Error("server-error");
    let d=await r.json();
    localStorage.setItem("generatedWebsite",JSON.stringify(d.website));
    location.href="preview.html";
  }catch(e){
    $("status").textContent="Connect your backend to generate.";
    toast("Backend URL is not configured.");
  }finally{$("generate").disabled=false}
};
                          
