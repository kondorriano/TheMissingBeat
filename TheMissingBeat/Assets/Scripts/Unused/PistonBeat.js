#pragma strict

public var vel: float = 10;
public var lim : Vector3;

public var freq : int = 1;
public var offset : int = 0;

private var sentit : int = 1;
private var dist : float;
private var currDist : float = 0;

private var translate : boolean = false;

function Start() {
	dist = lim.magnitude;
	lim.Normalize();
	
}

function Update () {
	rigidbody.velocity = Vector3(0,0,0);
	if(Input.GetKeyDown(KeyCode.Space)) {
		translate = true;
	}
	
	if(translate) {
		transform.position = Vector3(Mathf.MoveTowards(transform.position.x,transform.position.x+sentit*lim.x,vel*Time.deltaTime),
		Mathf.MoveTowards(transform.position.y,transform.position.y+sentit*lim.y,vel*Time.deltaTime),
   		Mathf.MoveTowards(transform.position.z,transform.position.z+sentit*lim.z,vel*Time.deltaTime));
		//rigidbody.velocity = sentit*lim*vel;
		currDist += vel*Time.deltaTime;
		if (currDist >= dist) {
			//rigidbody.velocity = Vector3(0,0,0);
			currDist = 0;
			sentit = -sentit;
			translate = false;
		}
	}
}

function OnDrawGizmos() {
	Gizmos.color = Color.red;
}

function Beat(beat : int) {
	if((beat+offset)%freq == 0) translate = true;
}