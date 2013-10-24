#pragma strict

//Mueve pistones horizontalmente

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


function Start () {
	originalHeight = transform.position.x;
	originalPos = transform.position;
}

function FixedUpdate () {
	if (move) {
		if ((wantedPos - transform.position).magnitude < 0.1) {
			transform.position = wantedPos;
			
			if (down) transform.position = originalPos;
			else transform.position = originalPos + Vector3(height,0,0);
			move = false;
		}
		else 
			rigidbody.MovePosition(transform.position + (wantedPos - transform.position)*speed*Time.deltaTime);
	}
}

function Beat (beat : int) {
	if(activate){
		if ((beat + offset)%freq == 0) {
			move = true;
			
			if (down) wantedPos = originalPos + Vector3(height,0,0);
			else wantedPos = originalPos;
			
			down = !down;
		}
	}
}


function ChangeFrequency(frequency : float) {
	freq = frequency;
}

function changeBeat(b : boolean){
	activate = b;
}