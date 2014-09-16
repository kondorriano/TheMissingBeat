#pragma strict

//Mueve pistones verticalmente 

//NewGamePlay
public var activated : boolean = true;
private var beatActivation : boolean;
//EndNewGameplay

public var freq : int = 1;
public var offset : int = 0;

public var height : float = 5;
public var speed : float = 20;

private var originalHeight : float;
private var originalPos : Vector3;
private var wantedPos : Vector3;
private var down : boolean = true;

private var move : boolean = false;

private var activate : boolean = false; //Todo lo relacionado con etso es nuevo

public var Tex : Transform;



function Start () {
	originalHeight = transform.position.y;
	originalPos = transform.position;
	//NewGP
	beatActivation = activated;
	//if(beatActivation) renderer.material.color = Color.green;
	//else renderer.material.color = Color.red;
	if(Tex != null) {
		if(!beatActivation) Tex.renderer.material.color = Color.red;
		else  Tex.renderer.material.color = Color.green;
	}

}

function FixedUpdate () {
	if (move) {
		if ((wantedPos - transform.position).magnitude < 0.1) {
			transform.position = wantedPos;
			
			if (down) transform.position = originalPos;
			else transform.position = originalPos + Vector3(0,height,0);
			move = false;
		}
		else 
			rigidbody.MovePosition(transform.position + (wantedPos - transform.position)*speed*Time.deltaTime);
	}
}

function Beat (beat : int) {
	if(beatActivation){
		if ((beat + offset)%freq == 0) {
			move = true;
			
			if (down) wantedPos = originalPos + Vector3(0,height,0);
			else wantedPos = originalPos;
			
			down = !down;
			
			//NewGamePlay
		}
	}
	if((beatActivation != activated) && (beat + offset)%freq == 0) beatActivation = activated;
	if(Tex != null) {
		if(beatActivation) Tex.renderer.material.color = Color.green;
		else Tex.renderer.material.color = Color.red;;
	}
}

function OnDrawGizmos() {
	Gizmos.color = Color.green;
	Gizmos.DrawLine(transform.position + Vector3(transform.localScale.x/2, 0, 0), transform.position + Vector3(transform.localScale.x/2, height, 0));
	Gizmos.DrawLine(transform.position + Vector3(-transform.localScale.x/2, 0, 0), transform.position + Vector3(-transform.localScale.x/2, height, 0));
}


function ChangeFrequency(frequency : float) {
	freq = frequency;
}

function changeBeat(b : boolean){
	activate = b;
}

function changeActivation(){
	if(beatActivation == activated) beatActivation = !activated;
	if(Tex != null) {
		if(beatActivation) Tex.renderer.material.color = Color.green;
		else Tex.renderer.material.color = Color.red;;
	}
}

function getActivation() : boolean {
	return beatActivation;
}