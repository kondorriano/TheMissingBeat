#pragma strict

@script RequireComponent(Rigidbody2D)
@script RequireComponent(HingeJoint2D)

//El script que hace rotar diferentes engranajes
//NewGamePlay
public var activated : boolean = true;
private var beatActivation : boolean;

//EndNewGameplay

public var freq : int = 1;
public var offset : int = 0;

public var dientes : float = 4;
public var sentido : int = 1;
public var speed : float = 1;

private var rotate : boolean = false;
private var grados : float = 45;

private var initRotation : Quaternion;
private var nextRotation : Quaternion;

private var initAngle : float;
private var nextAngle : float;


private var cont : int = 0;

private var activate : boolean = false; //Todo lo relacionado con etso es nuevo


function Start () {
	grados = 360.0/(dientes*2);
	initRotation = transform.rotation;
	nextRotation = initRotation;
	//NewGP
	beatActivation = activated;

	initAngle = 0;
	
	// Init Hinge Joint
	var joint : GameObject = GameObject.Instantiate(Resources.Load("GearJoint"), transform.position, Quaternion());
	GetComponent(HingeJoint2D).connectedBody = joint.rigidbody2D;
}
private var test : int = 0;

function Update () {
	if(Input.GetKeyDown(KeyCode.Space)) Beat(++test);
	
}

function FixedUpdate() {
	// Old way
	//transform.rotation = Quaternion.Slerp(transform.rotation, nextRotation, Time.deltaTime*speed);

	// New Way
	var nextStep : float  = transform.eulerAngles.z + rigidbody2D.angularVelocity*Time.fixedDeltaTime;
    var nextRotation : float = nextAngle - nextStep;
  	if ( nextRotation  < -180 ) nextRotation += 360;
 	if ( nextRotation  >  180 ) nextRotation -= 360;
 	
 	if (nextRotation*sentido < 0) {
 		transform.eulerAngles = Vector3(0,0,nextAngle);
 		rigidbody2D.angularVelocity = 0;
 	}
 	else {
	  	var desiredAngularVelocity : float = nextRotation / Time.fixedDeltaTime;
	  	
	  	rigidbody2D.angularVelocity = Mathf.Lerp(rigidbody2D.angularVelocity, desiredAngularVelocity, Time.fixedDeltaTime*speed/10);
	  	//var torque : float = desiredAngularVelocity /Time.fixedDeltaTime;
	  	//rigidbody2D.AddTorque(torque);
	}
}

function Beat(beat : int) {
	if (beatActivation) {
		if ((beat + offset)%freq == 0) {
			rotate = true;	
			++cont;
			if(cont == dientes*2) {
				nextRotation = initRotation;
				nextAngle = initAngle;
				cont = 0;
			} else {
				nextRotation = initRotation*Quaternion.Euler(0,0,sentido*cont*grados);
				nextAngle = initAngle + sentido*cont*grados;
			}
			//NewGamePlay
		}
	}
	
	beatActivation = activated;
}

function ChangeFrequency(frequency : float) {
	freq = frequency;
}

function changeBeat(b : boolean){
	activate = b;
}

function OnMouseDown(){
	if(beatActivation == activated) beatActivation = !activated;
}