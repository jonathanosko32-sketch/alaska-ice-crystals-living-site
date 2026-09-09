package com.osko.launcher

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient

class SkieCbActivity : Activity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (android.os.Build.VERSION.SDK_INT >= 23 && checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO), 4401)
        }

        webView = WebView(this).apply {
            setBackgroundColor(android.graphics.Color.BLACK)
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.mediaPlaybackRequiresUserGesture = false
            webViewClient = WebViewClient()
            webChromeClient = object : WebChromeClient() {
                override fun onPermissionRequest(request: PermissionRequest) {
                    runOnUiThread {
                        if (request.resources.contains(PermissionRequest.RESOURCE_AUDIO_CAPTURE)) {
                            request.grant(arrayOf(PermissionRequest.RESOURCE_AUDIO_CAPTURE))
                        } else {
                            request.deny()
                        }
                    }
                }
            }
            addJavascriptInterface(Bridge(), "Android")
            loadDataWithBaseURL("https://osko.local/", html(), "text/html", "UTF-8", null)
        }
        setContentView(webView)
    }

    override fun onBackPressed() {
        finish()
    }

    inner class Bridge {
        @JavascriptInterface fun closeRadio() = runOnUiThread { finish() }
        @JavascriptInterface fun getEndpoint(): String = getSharedPreferences("osko_launcher", MODE_PRIVATE).getString("skie_token_endpoint", "") ?: ""
        @JavascriptInterface fun saveEndpoint(value: String) {
            getSharedPreferences("osko_launcher", MODE_PRIVATE).edit().putString("skie_token_endpoint", value.trim()).apply()
        }
    }

    private fun html(): String = """
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{box-sizing:border-box} body{margin:0;background:radial-gradient(circle at 50% 10%,#12354d 0,#07111d 35%,#02070c 100%);color:#eefaff;font-family:Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:14px}
.radio{width:100%;max-width:520px;border:2px solid #53e3ff;border-radius:26px;background:linear-gradient(180deg,#101a24,#071019 58%,#05090d);box-shadow:0 0 30px #1fa4c455,inset 0 0 28px #000;padding:18px}
.brand{text-align:center;color:#53e3ff;font-size:13px;letter-spacing:3px}.title{text-align:center;font-weight:800;font-size:28px;margin:5px 0 16px;text-shadow:0 0 12px #53e3ff88}.plate{border:1px solid #47ffd0;border-radius:13px;background:#012b25;display:flex;align-items:center;padding:12px 14px;box-shadow:inset 0 0 18px #000}.ch{font:700 29px monospace;color:#53ffc5;flex:1}.meter{font:700 16px monospace;color:#53ffc5;text-align:right;flex:1.25}.lamps{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0 11px}.lamp{padding:13px;border-radius:14px;text-align:center;font-weight:800;transition:.12s}.rx{background:#164d2b}.tx{background:#431c1c}.rx.on{background:#20bd61;box-shadow:0 0 22px #35ff7b}.tx.on{background:#ff4438;box-shadow:0 0 22px #ff5c4f}.status{text-align:center;min-height:42px;color:#bfd1da;font-size:14px;line-height:1.35;margin:8px 4px}.ptt{width:100%;height:72px;border:2px solid #53e3ff;border-radius:20px;background:linear-gradient(#245b80,#12364f);color:#fff;font-size:19px;font-weight:800;box-shadow:0 7px 0 #071925;touch-action:none}.ptt:active{transform:translateY(4px);box-shadow:0 3px 0 #071925}.row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.btn{border:1px solid #53e3ff;border-radius:15px;background:#092233;color:#dff8ff;padding:13px;font-weight:700}.connect{background:#073d34;border-color:#47ffd0}.connected{background:#0c6b54}.foot{text-align:center;margin-top:12px;font-size:11px;color:#6f8b98}.modal{position:fixed;inset:0;background:#000d;display:none;align-items:center;justify-content:center;padding:18px}.box{width:100%;max-width:470px;background:#0b1721;border:2px solid #53e3ff;border-radius:20px;padding:18px}.box h3{margin:0 0 8px}.box p{font-size:13px;color:#bcd0da}.box input{width:100%;padding:13px;border-radius:11px;border:1px solid #4b869c;background:#061018;color:#fff;font-size:14px}.box .row{margin-top:12px} audio{display:none}
</style>
</head>
<body>
<div class="radio">
  <div class="brand">ALASKA ICE CRYSTALS</div>
  <div class="title">SKIE CB RADIO</div>
  <div class="plate"><div class="ch">CH 19</div><div id="meter" class="meter">S ▂ ▃ ▅ ▆ █</div></div>
  <div class="lamps"><div id="rx" class="lamp rx">RX • READY</div><div id="tx" class="lamp tx">TX</div></div>
  <div id="status" class="status">CB is inside the launcher. Connect Skie, then hold the mic while you talk.</div>
  <button id="ptt" class="ptt">🎙 HOLD TO TALK TO SKIE</button>
  <div class="row"><button id="connect" class="btn connect">CONNECT SKIE</button><button class="btn" onclick="openSetup()">RADIO SETUP</button></div>
  <div class="row"><button class="btn" onclick="Android.closeRadio()">BACK TO HOME</button><button class="btn" onclick="disconnect()">DISCONNECT</button></div>
  <div class="foot">OSKO PRIVATE RADIO • REALTIME VOICE ENGINE</div>
</div>
<audio id="remoteAudio" autoplay></audio>
<div id="modal" class="modal"><div class="box"><h3>Skie secure connection</h3><p>The CB needs a small secure session endpoint. The launcher stores only this endpoint address, not your OpenAI secret key.</p><input id="endpoint" placeholder="https://your-secure-site.example/skiesession"><div class="row"><button class="btn connect" onclick="saveSetup()">SAVE</button><button class="btn" onclick="closeSetup()">CANCEL</button></div></div></div>
<script>
let pc=null,dc=null,stream=null,connected=false;
const statusEl=document.getElementById('status'), rx=document.getElementById('rx'), tx=document.getElementById('tx'), ptt=document.getElementById('ptt'), connectBtn=document.getElementById('connect');
function status(t){statusEl.textContent=t}
function setTX(on){tx.classList.toggle('on',on);tx.textContent=on?'TX • TRANSMIT':'TX'}
function setRX(on){rx.classList.toggle('on',on);rx.textContent=on?'RX • SKIE TALKING':'RX • READY'}
function openSetup(){document.getElementById('endpoint').value=Android.getEndpoint();document.getElementById('modal').style.display='flex'}
function closeSetup(){document.getElementById('modal').style.display='none'}
function saveSetup(){const v=document.getElementById('endpoint').value.trim();Android.saveEndpoint(v);closeSetup();status(v?'Secure endpoint saved. Tap CONNECT SKIE.':'Endpoint cleared.')}
async function getSecret(){
 const endpoint=Android.getEndpoint(); if(!endpoint){openSetup();throw new Error('Set the secure endpoint first.');}
 const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({purpose:'osko-skie-cb',model:'gpt-realtime'})});
 if(!r.ok) throw new Error('Secure session endpoint returned '+r.status);
 const j=await r.json(); return j.value || j.client_secret?.value || j.client_secret || j.secret || j.token;
}
async function connectSkie(){
 if(connected)return;
 try{
  status('Connecting Skie…'); connectBtn.textContent='CONNECTING…';
  const secret=await getSecret(); if(!secret)throw new Error('No realtime client secret was returned.');
  pc=new RTCPeerConnection();
  const audio=document.getElementById('remoteAudio'); pc.ontrack=e=>{audio.srcObject=e.streams[0]};
  stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
  stream.getAudioTracks().forEach(t=>{t.enabled=false;pc.addTrack(t,stream)});
  dc=pc.createDataChannel('oai-events');
  dc.onopen=()=>{
    const instructions='You are Skie, the voice assistant inside the OSKO Alaska Ice Crystals CB radio. Speak naturally, clearly, and practically. Keep responses concise unless Osko asks for detail. You are helping build and operate the Alaska Ice Crystals ecosystem. Do not claim access to this ChatGPT chat history unless context was actually supplied to you.';
    dc.send(JSON.stringify({type:'session.update',session:{type:'realtime',instructions:instructions,output_modalities:['audio'],audio:{output:{voice:'marin'}},turn_detection:{type:'server_vad',create_response:true,interrupt_response:true}}}));
  };
  dc.onmessage=e=>{
    try{const m=JSON.parse(e.data);const t=m.type||'';
      if(t.includes('response.output_audio')||t==='response.created')setRX(true);
      if(t==='response.done'){setRX(false);status('Skie is listening. Hold the mic to talk.');}
      if(t==='error'){setRX(false);status('Radio error: '+(m.error?.message||'unknown error'));}
    }catch(_){ }
  };
  const offer=await pc.createOffer(); await pc.setLocalDescription(offer);
  const fd=new FormData(); fd.append('sdp',new Blob([offer.sdp],{type:'application/sdp'}),'offer.sdp'); fd.append('session',new Blob([JSON.stringify({type:'realtime',model:'gpt-realtime'})],{type:'application/json'}),'session.json');
  const resp=await fetch('https://api.openai.com/v1/realtime/calls',{method:'POST',headers:{Authorization:'Bearer '+secret},body:fd});
  if(!resp.ok)throw new Error('OpenAI realtime connection returned '+resp.status);
  const answer=await resp.text(); await pc.setRemoteDescription({type:'answer',sdp:answer});
  connected=true;connectBtn.textContent='SKIE CONNECTED';connectBtn.classList.add('connected');status('Skie is inside the CB. Hold the mic to talk.');
 }catch(e){connectBtn.textContent='CONNECT SKIE';status(e.message||String(e));}
}
function talk(on){if(!connected){if(on)connectSkie();return;} if(!stream)return;stream.getAudioTracks().forEach(t=>t.enabled=on);setTX(on);if(on){setRX(false);status('Transmitting to Skie…')}else{status('Transmission sent. Waiting for Skie…')}}
function disconnect(){try{stream?.getTracks().forEach(t=>t.stop());pc?.close()}catch(_){ } pc=null;dc=null;stream=null;connected=false;setTX(false);setRX(false);connectBtn.textContent='CONNECT SKIE';connectBtn.classList.remove('connected');status('Radio disconnected.')}
ptt.addEventListener('pointerdown',e=>{e.preventDefault();talk(true)});ptt.addEventListener('pointerup',e=>{e.preventDefault();talk(false)});ptt.addEventListener('pointercancel',()=>talk(false));ptt.addEventListener('pointerleave',e=>{if(e.buttons)talk(false)});connectBtn.onclick=connectSkie;
window.addEventListener('beforeunload',disconnect);
</script>
</body>
</html>
""".trimIndent()
}
