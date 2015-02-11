

		var $=function(s){ return document.getElementById(s)},$$=function(s){ return document.getElementsByClassName(s);};
		


var voronoi,vertices,vertices2,width=1,height=1,diagram,bbox,svg;


function redraw() {
  var ar=[];
  for(var i=0;i!=vertices.length;i++){
    ar.push({x:vertices[i].x,y:vertices[i].y})
  }
  while(svg.firstChild) svg.removeChild(svg.firstChild)
  diagram = voronoi.compute(ar, bbox);
  console.log(diagram)
  for(var i=0;i!=diagram.cells.length;i++){
    var a = diagram.cells[i];
    var path = document.createElementNS ("http://www.w3.org/2000/svg","path");
    path.setAttribute("d", polygon(a.halfedges))
    path.style.stroke = "#fff";
    path.style.strokeWidth = "5px";;
    svg.appendChild(path);
  }
  //voronoi.recycle(diagram);
}
var count = 1;
var vmax = 32;
function update(){
    for(var i=0;i!=vertices.length;i++){
        
        vertices[i].x=(7*vertices[i].x+vertices2[i].x)/8;
        vertices[i].y=(7*vertices[i].y+vertices2[i].y)/8;
    }
    if(!(count % vmax)){
        for(var i=0;i!=vertices.length;i++){
          vertices2[i] = {x:Math.random() * width, y:Math.random() * height}
          
        }
        
    }
    redraw();
}
interval = window.setInterval(update,5000);

function prefill(){
  var ret=[];
  for(i=0;i<vmax;i++){
    ret.push({x:Math.random() * width, y:Math.random() * height})
  }
  return ret;
}

bbox = {xl:0,xr:width,yt:0,yb:height};
vertices = prefill();
vertices2 = prefill();
voronoi = new Voronoi();

			 document.querySelectorAll(".sidebar")[1].onmousemove =  function(ev) {
			       vertices2[Math.floor(Math.random()*vertices2.length)]= {x:ev.clientX,y:ev.clientY};
			       count++;
			   };

			
function polygon(d) {
  var a = []
  for(var i=0;i<d.length;i++) a.push(d[i].edge.va.x+" "+d[i].edge.va.y);
  return "M " + a.join(" L ") + " Z";
}
		function set(){
		  document.querySelector(".sidebar-bg").innerHTML="<svg width='"+width+"' height='"+height+"' ></svg>";
		  svg=document.querySelector("svg");
			var b = document.querySelectorAll(".sidebar")[1].getBoundingClientRect();
            width=b.width;
            height=b.height;
      document.querySelector(".sidebar-bg").innerHTML="<svg width='"+width+"' height='"+height+"' ></svg>";
			bbox = {xl:0,xr:width,yt:0,yb:height};
		}
		window.onresize=set;
		document.body.onload = set;
		set();

