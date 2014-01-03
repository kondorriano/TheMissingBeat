#pragma strict

//El script que hace rotar diferentes engranajes
//NewGamePlay
public var activated : boolean = true;
private var beatActivation : boolean;

//EndNewGameplay

public var freq : int = 1;
public var offset : int = 0;

public var dientes : float = 4;
public var sentido : int = 1;
public var speed : float = 60;

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
}
private var test : int = 0;

function Update () {
	if(Input.GetKeyDown(KeyCode.Space)) Beat(++test);
	transform.rotation = Quaternion.Slerp(transform.rotation, nextRotation, Time.deltaTime*speed);
	
	/*var nextStep : float  = transform.rotation.z + rigidbody2D.angularVelocity*Time.fixedDeltaTime;
    var totalRotation : float = nextAngle - nextStep;
  	while ( totalRotation < -180 * Mathf.Deg2Rad ) totalRotation += 360 * Mathf.Deg2Rad;
 	while ( totalRotation >  180 * Mathf.Deg2Rad ) totalRotation -= 360 * Mathf.Deg2Rad;
  	
  	var desiredAngularVelocity : float = totalRotation/Time.fixedDeltaTime;
  	var torque : float = desiredAngularVelocity /Time.fixedDeltaTime;
  	rigidbody2D.AddTorque(torque);*/
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