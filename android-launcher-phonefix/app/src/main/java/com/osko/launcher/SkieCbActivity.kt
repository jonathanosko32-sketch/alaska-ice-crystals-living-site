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
                        if (request.resources.contains(PermissionRequest.RESOURCE_AUDIO_CAPTURE)) request.grant(arrayOf(PermissionRequest.RESOURCE_AUDIO_CAPTURE)) else request.deny()
                    }
                }
            }
            addJavascriptInterface(Bridge(), "Android")
            loadDataWithBaseURL("https://osko.local/", html(), "text/html", "UTF-8", null)
        }
        setContentView(webView)
    }

    override fun onBackPressed() { finish() }

    inner class Bridge {
        @JavascriptInterface fun closeRadio() = runOnUiThread { finish() }
        @JavascriptInterface fun getEndpoint(): String = getSharedPreferences("osko_launcher", MODE_PRIVATE)
            .getString("skie_token_endpoint", "https://alaska-ice-crystals-living-site.vercel.app/api/skie-session-ptt")
            ?: "https://alaska-ice-crystals-living-site.vercel.app/api/skie-session-ptt"
        @JavascriptInterface fun saveEndpoint(value: String) {
            getSharedPreferences("osko_launcher", MODE_PRIVATE).edit().putString("skie_token_endpoint", value.trim()).apply()
        }
    }

    private fun html(): String = """
<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 50% 10%,#12354d 0,#07111d 35%,#02070c 100%);color:#eefaff;font-family:Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:14px}.radio{width:100%;max-width:520px;border:2px solid #53e3ff;border-radius:26px;background:linear-gradient(180deg,#101a24,#071019 58%,#05090d);box-shadow:0 0 30px #1fa4c455,inset 0 0 28px #000;padding:18px}.brand{text-align:center;color:#53e3ff;font-size:13px;letter-spacing:3px}.title{text-align:center;font-weight:800;font-size:28px;margin:5px 0 16px}.plate{border:1px solid #47ffd0;border-radius:13px;background:#012b25;display:flex;align-items:center;padding:12px 14px}.ch{font:700 29px monospace;color:#53ffc5;flex:1}.meter{font:700 16px monospace;color:#53ffc5;text-align:right;flex:1.25}.lamps{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0 11px}.lamp{padding:13px;border-radius:14px;text-align:center;font-weight:800;transition:.12s}.rx{background:#164d2b}.tx{background:#431c1c}.rx.on{background:#20bd61;box-shadow:0 0 22px #35ff7b}.tx.on{background:#ff4438;box-shadow:0 0 22px #ff5c4f}.status{text-align:center;min-height:42px;color:#bfd1da;font-size:14px;line-height:1.35;margin:8px 4px}.ptt{width:100%;height:72px;border:2px solid #53e3ff;border-radius:20px;background:linear-gradient(#245b80,#12364f);color:#fff;font-size:19px;font-weight:800;box-shadow:0 7px 0 #071925;touch-action:none}.ptt:active{transform:translateY(4px);box-shadow:0 3px 0 #071925}.ptt:disabled{opacity:.45}.row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.btn{border:1px solid #53e3ff;border-radius:15px;background:#092233;color:#dff8ff;padding:13px;font-weight:700}.connect{background:#073d34;border-color:#47ffd0}.connected{background:#0c6b54}.foot{text-align:center;margin-top:12px;font-size:11px;color:#6f8b98}.modal{position:fixed;inset:0;background:#000d;display:none;align-items:center;justify-content:center;padding:18px}.box{width:100%;max-width:470px;background:#0b1721;border:2px solid #53e3ff;border-radius:20px;padding:18px}.box p{font-size:13px;color:#bcd0da}.box input{width:100%;padding:13px;border-radius:11px;border:1px solid #4b869c;background:#061018;color:#fff;font-size:14px}audio{display:none}
</style></head><body>
<div class="radio"><div class="brand">ALASKA ICE CRYSTALS</div><div class="title">SKIE CB RADIO</div><div class="plate"><div class="ch">CH 27</div><div class="meter">S ▂ ▃ ▅ ▆ █</div></div><div class="lamps"><div id="rx" class="lamp rx">RX • READY</div><div id="tx" class="lamp tx">TX</div></div><div id="status" class="status">SKIE is on Channel 27. Tap CONNECT SKIE, then hold the mic while you talk.</div><button id="ptt" class="ptt" disabled>🎙 HOLD TO TALK TO SKIE</button><div class="row"><button id="connect" class="btn connect">CONNECT SKIE</button><button class="btn" onclick="openSetup()">RADIO SETUP</button></div><div class="row"><button class="btn" onclick="Android.closeRadio()">BACK TO HOME</button><button class="btn" onclick="disconnectRadio()">DISCONNECT</button></div><div class="foot">OSKO PRIVATE RADIO • REALTIME VOICE ENGINE</div></div>
<audio id="remoteAudio" autoplay></audio>
<div id="modal" class="modal"><div class="box"><h3>SKIE secure connection</h3><p>The API key stays on the secure server. This screen stores only the session endpoint.</p><input id="endpoint" placeholder="https://alaska-ice-crystals-living-site.vercel.app/api/skie-session-ptt"><div class="row"><button class="btn connect" onclick="saveSetup()">SAVE</button><button class="btn" onclick="closeSetup()">CANCEL</button></div></div></div>
<script>
let pc=null,dc=null,stream=null,connected=false,pressed=false,responseActive=false;
const statusEl=document.getElementById('status'),rx=document.getElementById('rx'),tx=document.getElementById('tx'),ptt=document.getElementById('ptt'),connectBtn=document.getElementById('connect');
function status(t){statusEl.textContent=t}function send(o){if(dc&&dc.readyState==='open')dc.send(JSON.stringify(o))}function setTX(v){tx.classList.toggle('on',v);tx.textContent=v?'TX • TRANSMIT':'TX'}function setRX(v){rx.classList.toggle('on',v);rx.textContent=v?'RX • SKIE TALKING':'RX • READY'}
function openSetup(){document.getElementById('endpoint').value=Android.getEndpoint();document.getElementById('modal').style.display='flex'}function closeSetup(){document.getElementById('modal').style.display='none'}function saveSetup(){const v=document.getElementById('endpoint').value.trim();Android.saveEndpoint(v);closeSetup();status(v?'Secure endpoint saved. Tap CONNECT SKIE.':'Endpoint cleared.')}
async function getSecret(){const ep=Android.getEndpoint();if(!ep){openSetup();throw new Error('Set the secure endpoint first.')}const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({purpose:'osko-skie-cb',model:'gpt-realtime-2.1'})});if(!r.ok)throw new Error('Secure session endpoint returned '+r.status);const j=await r.json();return j.value||j.client_secret?.value||j.client_secret||j.secret||j.token}
async function connectSkie(){if(connected)return;try{status('Connecting SKIE…');connectBtn.textContent='CONNECTING…';const secret=await getSecret();if(!secret)throw new Error('No realtime client secret returned.');pc=new RTCPeerConnection();const audio=document.getElementById('remoteAudio');pc.ontrack=e=>{audio.srcObject=e.streams[0]};stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});stream.getAudioTracks().forEach(t=>{t.enabled=false;pc.addTrack(t,stream)});dc=pc.createDataChannel('oai-events');dc.onopen=()=>{connected=true;ptt.disabled=false;connectBtn.textContent='SKIE CONNECTED';connectBtn.classList.add('connected');status('SKIE Channel 27 connected. Hold the mic to talk.');send({type:'session.update',session:{audio:{input:{turn_detection:null}}}})};dc.onmessage=e=>{try{const m=JSON.parse(e.data),type=m.type||'';if(type==='response.created'){responseActive=true;setRX(true)}if(type.includes('response.output_audio'))setRX(true);if(type==='response.done'){responseActive=false;setRX(false);status('SKIE is listening. Hold the mic to talk.')}if(type==='error'){responseActive=false;setRX(false);status('Radio error: '+(m.error?.message||'unknown error'))}}catch(_){}};const offer=await pc.createOffer();await pc.setLocalDescription(offer);const resp=await fetch('https://api.openai.com/v1/realtime/calls',{method:'POST',headers:{Authorization:'Bearer '+secret,'Content-Type':'application/sdp'},body:offer.sdp});if(!resp.ok)throw new Error('OpenAI realtime connection returned '+resp.status);const answer=await resp.text();await pc.setRemoteDescription({type:'answer',sdp:answer})}catch(e){ptt.disabled=true;connectBtn.textContent='CONNECT SKIE';status(e.message||String(e));disconnectRadio(false)}}
function pttDown(){if(!connected||pressed)return;pressed=true;if(responseActive){send({type:'response.cancel'});send({type:'output_audio_buffer.clear'});responseActive=false;setRX(false)}send({type:'input_audio_buffer.clear'});stream?.getAudioTracks().forEach(t=>t.enabled=true);setTX(true);status('Transmitting to SKIE…')}
function pttUp(){if(!connected||!pressed)return;pressed=false;stream?.getAudioTracks().forEach(t=>t.enabled=false);setTX(false);send({type:'input_audio_buffer.commit'});send({type:'response.create'});status('Transmission sent. Waiting for SKIE…')}
function disconnectRadio(show=true){try{if(pressed)pttUp();stream?.getTracks().forEach(t=>t.stop());pc?.close()}catch(_){}pc=null;dc=null;stream=null;connected=false;pressed=false;responseActive=false;ptt.disabled=true;setTX(false);setRX(false);connectBtn.textContent='CONNECT SKIE';connectBtn.classList.remove('connected');if(show)status('Radio disconnected.')}
ptt.addEventListener('pointerdown',e=>{e.preventDefault();try{ptt.setPointerCapture(e.pointerId)}catch(_){}pttDown()});ptt.addEventListener('pointerup',e=>{e.preventDefault();pttUp()});ptt.addEventListener('pointercancel',pttUp);ptt.addEventListener('lostpointercapture',pttUp);connectBtn.addEventListener('click',connectSkie);window.addEventListener('pagehide',()=>disconnectRadio(false));
</script></body></html>
""".trimIndent()
}
