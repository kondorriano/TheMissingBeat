#pragma strict
//@script ExecuteInEditMode()


private var rangeWave : GameObject;
private var radius : float = 0;
private var position : Vector3 = Vector3.zero;



function Start() {
	rangeWave = GameObject.FindGameObjectWithTag("waveTrigger");
    var script : beatWaveTrigger = rangeWave.GetComponent("beatWaveTrigger");
	radius = script.getRadius();
	position = Vector3(rangeWave.transform.position.x,rangeWave.transform.position.y,rangeWave.transform.position.z);

}

function Update () {
	
	radius -= Time.deltaTime*3;
	if(radius <= 0) radius = 0;
	
	if(rangeWave != null) {
	    var script : beatWaveTrigger = rangeWave.GetComponent("beatWaveTrigger");
	    var newRadius : float = script.getRadius();
	    if(newRadius != 0) {
		    var dir : Vector3 = position - rangeWave.transform.position;
		    var pos1 : Vector3 = position+dir.normalized*radius;
		    var pos2 : Vector3 = rangeWave.transform.position-dir.normalized*newRadius;
		    
		    if((pos2-position).magnitude < radius) {
		    	//nothing
		    } else if((pos1-rangeWave.transform.position).magnitude < newRadius) {
		    	radius = newRadius;
	    		position = Vector3(rangeWave.transform.position.x,rangeWave.transform.position.y,rangeWave.transform.position.z);
		    } else if(dir.magnitude > radius+newRadius){
		    	radius = newRadius;
	    		position = Vector3(rangeWave.transform.position.x,rangeWave.transform.position.y,rangeWave.transform.position.z);
		    } else {
		    	position = pos2+(pos1-pos2)/2;	    
		    	radius =((pos1-pos2)/2).magnitude;
		    }
	    }


		//Other testings
	    /*var dir : Vector3 = transform.position - position;
	    var newDir : Vector3 = transform.position - rangeWave.transform.position;

   	    if(dir.magnitude <= radius && newDir.magnitude <= newRadius) {
			dir = position+dir.normalized*radius;
   	   		newDir = rangeWave.transform.position+newDir.normalized*newRadius;   	   		
   	   		dir -= transform.position;
  	   		newDir -= transform.position;
  	   		if(dir.magnitude < newDir.magnitude) radius = newRadius;
  	   		   		
    	} else if(dir.magnitude <= radius){
    		//nothing
    	} else if(newDir.magnitude <= newRadius) radius = newRadius;
    	else {
    		dir = position+dir.normalized*radius;
   	   		newDir = rangeWave.transform.position+newDir.normalized*newRadius;   	   		
   	   		dir = transform.position - dir;
  	   		newDir = transform.position - newDir;
  	   		if(dir.magnitude > newDir.magnitude) radius = newRadius;
    	}
		
	    if(radius == newRadius) {
			position = Vector3(rangeWave.transform.position.x,rangeWave.transform.position.y,rangeWave.transform.position.z);
		}*/
		
		//Other test
		/*if(radius < newRadius) {
			radius = newRadius;
			position = Vector3(rangeWave.transform.position.x,rangeWave.transform.position.y,rangeWave.transform.position.z);
		}*/
	}

	var p : Vector4 = new Vector4(position.x, position.y, position.z, 0.0);;

	renderer.sharedMaterial.SetFloat("radius", radius);
	renderer.sharedMaterial.SetVector("position", p);
	

	
}


