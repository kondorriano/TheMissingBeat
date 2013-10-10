#pragma strict

public var freq : int = 1;
public var offset : int = 0;

public var dientes : float = 4;
public var sentido : int = 1;
public var speed : float = 60;

private var rotate : boolean = false;
private var grados : float = 45;

private var initRotation : Quaternion;
private var nextRotation : Quaternion;

private var cont : int = 0;


function Start () {
	grados = 360.0/(dientes*2);
	initRotation = transform.rotation;
	nextRotation = initRotation;
}

function Update () {
	rigidbody.MoveRotation(Quaternion.Slerp(transform.rotation, nextRotation, Time.deltaTime*speed));
}

function Beat(beat : int) {
	if ((beat + offset)%freq == 0) {
		rotate = true;	
		++cont;
		if(cont == dientes*2) {
			nextRotation = initRotation;
			cont = 0;
		} else nextRotation = initRotation*Quaternion.Euler(0,0,sentido*cont*grados);
	}
}

function ChangeFrequency(frequency : float) {
	freq = frequency;
}