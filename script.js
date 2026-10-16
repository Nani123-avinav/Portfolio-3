(function(){
try{
var cv=document.getElementById('bg');
var r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
r.setPixelRatio(Math.min(devicePixelRatio,2));
var s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);cam.position.z=7;
var g=new THREE.Group();s.add(g);
var ico=new THREE.Mesh(new THREE.IcosahedronGeometry(2,1),new THREE.MeshBasicMaterial({color:0x915EFF,wireframe:true,transparent:true,opacity:.55}));
var knot=new THREE.Mesh(new THREE.TorusKnotGeometry(.9,.28,120,12),new THREE.MeshBasicMaterial({color:0x00E0C6,wireframe:true,transparent:true,opacity:.5}));
g.add(ico,knot);
var n=700,p=new Float32Array(n*3);
for(var i=0;i<n*3;i++)p[i]=(Math.random()-.5)*26;
var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(p,3));
var pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x9AA8FF,size:.04,transparent:true,opacity:.7}));
s.add(pts);
var mx=0,my=0,still=matchMedia('(prefers-reduced-motion: reduce)').matches;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function size(){var w=innerWidth,h=innerHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();g.position.x=w>800?3:0;g.position.y=w>800?0:1.6;g.scale.setScalar(w>800?1:.7)}
addEventListener('resize',size);size();
function tick(t){
var sc=Math.min(scrollY/innerHeight,3);
if(!still){ico.rotation.x=t*.0002;ico.rotation.y=t*.0003;knot.rotation.x=-t*.0004;knot.rotation.y=t*.0003;pts.rotation.y=t*.00005}
g.rotation.y+=((mx*.8)-g.rotation.y)*.05;g.rotation.x+=((my*.6)-g.rotation.x)*.05;
cam.position.y=-sc*1.2;cam.position.z=7-sc*.6;
r.render(s,cam);requestAnimationFrame(tick)}
requestAnimationFrame(tick);
}catch(e){document.getElementById('bg').style.display='none'}
})();
